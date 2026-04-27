import express from 'express'
import cors from 'cors'

import locationsRouter from './routes/locations.routes'
import npcsRouter from './routes/npcs.routes'
import eventsRouter from './routes/events.routes'
import generatorsRouter from './routes/generators.routes'

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://worldforge-5e.vercel.app',
]

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app')
      ) {
        callback(null, true)
        return
      }

      callback(new Error(`Not allowed by CORS: ${origin}`))
    },
  }),
)

app.use(express.json())

app.get('/', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'WorldForge 5e API running',
  })
})

app.use('/api/v1/locations', locationsRouter)
app.use('/api/v1/npcs', npcsRouter)
app.use('/api/v1/events', eventsRouter)
app.use('/api/v1/generators', generatorsRouter)

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  })
})

app.use(
  (
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  },
)

export default app