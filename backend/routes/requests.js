import { Router } from 'express'
import { pool } from '../db/db.js'

const router = Router()
const VALID_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

// GET /api/requests?status=open
router.get('/', async (req, res) => {
  const { status } = req.query
  try {
    const { rows } = status
      ? (await pool.query('SELECT * FROM blood_requests WHERE status = $1 ORDER BY created_at DESC', [status]))
      : (await pool.query('SELECT * FROM blood_requests ORDER BY created_at DESC LIMIT 100'))
    res.json({ requests: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not fetch requests.' })
  }
})

// POST /api/requests
router.post('/', async (req, res) => {
  const { patient_name, blood_group, city, units_needed, hospital, contact_phone } = req.body

  if (!patient_name || !blood_group || !city || !contact_phone) {
    return res.status(400).json({ error: 'Patient name, blood group, city and contact phone are required.' })
  }
  if (!VALID_GROUPS.includes(blood_group)) {
    return res.status(400).json({ error: 'Invalid blood group.' })
  }

  try {
    const { rows } = await pool.query(
      `INSERT INTO blood_requests (patient_name, blood_group, city, units_needed, hospital, contact_phone)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, patient_name, blood_group, city, status`,
      [patient_name, blood_group, city, units_needed || 1, hospital || null, contact_phone]
    )
    res.status(201).json({ request: rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not create blood request.' })
  }
})

export default router
