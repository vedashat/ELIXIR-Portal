import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import donorsRouter from './routes/donors.js'
import requestsRouter from './routes/requests.js'
import helplinesRouter from './routes/helplines.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))
app.use('/api/donors', donorsRouter)
app.use('/api/requests', requestsRouter)
app.use('/api/helplines', helplinesRouter)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))

const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Elixir API running on port ${PORT}`))
