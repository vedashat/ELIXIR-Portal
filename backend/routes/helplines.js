import { Router } from 'express'
import { pool } from '../db/db.js'

const router = Router()

// GET /api/helplines
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT name, number, note FROM helplines ORDER BY id')
    res.json({ helplines: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Could not fetch helplines.' })
  }
})

export default router
