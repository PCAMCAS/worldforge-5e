import type { Request, Response, NextFunction } from 'express'
import { getAllLocations } from '../services/locations.service.ts'

export function handleGetLocations(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getAllLocations()

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}