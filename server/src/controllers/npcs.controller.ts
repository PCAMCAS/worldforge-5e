import type { Request, Response, NextFunction } from 'express'
import { getAllNpcs } from '../services/npcs.service.ts'

export function handleGetNpcs(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getAllNpcs()

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}