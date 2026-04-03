import type { Request, Response, NextFunction } from 'express'
import {
  getRandomEncounter,
  getRandomEvent,
  getRandomTreasure,
} from '../services/generators.service.ts'

export function handleGetRandomEvent(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getRandomEvent()

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}

export function handleGetRandomEncounter(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getRandomEncounter()

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}

export function handleGetRandomTreasure(_req: Request, res: Response, next: NextFunction) {
  try {
    const data = getRandomTreasure()

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}