import type { Request, Response, NextFunction } from 'express'
import { getAllEvents } from '../services/events.service.ts'

export function handleGetEvents(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getAllEvents()

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}