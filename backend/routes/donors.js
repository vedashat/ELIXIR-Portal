import { Router } from 'express'
import { pool } from '../db/db.js'

const router = Router()
const VALID_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

// GET /api/donors?blood_group=O+&city=Noida
router.get('/', async (req, res) => {
  const { blood_group, city } = req.query
  const conditions = ['is_available = TRUE']
  const values = []

  if (blood_group) {
    values.push(blood_group)
    conditions.push(`blood_group = $${values.length}`)
  }
  if (city) {
    values.push(`%${city.toLowerCase()}%`)
    conditions.push(`LOWER(city) LIKE $${values.length}`)
  }

  try {
    const query = `
      SELECT id, name, age, blood_group, city, phone, last_donation_date
      FROM donors
      WHERE ${conditions.join(' AND ')}
      ORDER BY created_at DESC
      LIMIT 100
    `
    const { rows } = await pool.query(query, values)
    res.json({ donors: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not fetch donors.' })
  }
})

// POST /api/donors
router.post('/', async (req, res) => {
  const { name, age, blood_group, city, phone, email, last_donation_date } = req.body

  if (!name || !age || !blood_group || !city || !phone) {
    return res.status(400).json({ error: 'Name, age, blood group, city and phone are required.' })
  }
  if (!VALID_GROUPS.includes(blood_group)) {
    return res.status(400).json({ error: 'Invalid blood group.' })
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO donors (name, age, blood_group, city, phone, email, last_donation_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, name, blood_group, city`,
      [name, age, blood_group, city, phone, email || null, last_donation_date || null]
    )
    res.status(201).json({ donor: rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not register donor.' })
  }
})

export default router
