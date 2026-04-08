import type { Request, Response, NextFunction } from 'express'
import {
  getRandomEncounter,
  getRandomEvent,
  getRandomTreasure,
} from '../services/generators.service.ts'

function getGeneratorContext(req: Request) {
  const location =
    typeof req.query.location === 'string' ? req.query.location : undefined

  const npcQuery =
    typeof req.query.npcs === 'string' ? req.query.npcs : undefined

  const npcs = npcQuery
    ? npcQuery
        .split(',')
        .map((npc) => npc.trim())
        .filter(Boolean)
    : undefined

  return {
    location,
    npcs,
  }
}

export function handleGetRandomEvent(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = getRandomEvent(getGeneratorContext(req))

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}

export function handleGetRandomEncounter(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = getRandomEncounter(getGeneratorContext(req))

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}

export function handleGetRandomTreasure(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const data = getRandomTreasure(getGeneratorContext(req))

    res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}