import type { Request, Response, NextFunction } from 'express'
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  updateLocation,
} from '../services/locations.service.ts'

const validLocationTypes = ['kingdom', 'city', 'village', 'forest', 'lake', 'sea']

export function handleGetLocations(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
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

export function handleCreateLocation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, type, description, climate, dangerLevel } = req.body

    if (
      typeof name !== 'string' ||
      typeof type !== 'string' ||
      typeof description !== 'string' ||
      typeof climate !== 'string' ||
      typeof dangerLevel !== 'number'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Datos de localización no válidos.',
      })
    }

    if (!validLocationTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'El tipo de localización no es válido.',
      })
    }

    if (
      name.trim().length < 3 ||
      description.trim().length < 10 ||
      climate.trim().length < 3
    ) {
      return res.status(400).json({
        success: false,
        message: 'Los datos no cumplen los requisitos mínimos.',
      })
    }

    if (dangerLevel < 1 || dangerLevel > 10) {
      return res.status(400).json({
        success: false,
        message: 'El nivel de peligro debe estar entre 1 y 10.',
      })
    }

    const data = createLocation({
      name: name.trim(),
      type,
      description: description.trim(),
      climate: climate.trim(),
      dangerLevel,
    })

    return res.status(201).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}

export function handleUpdateLocation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const { name, type, description, climate, dangerLevel } = req.body

    if (
      typeof name !== 'string' ||
      typeof type !== 'string' ||
      typeof description !== 'string' ||
      typeof climate !== 'string' ||
      typeof dangerLevel !== 'number'
    ) {
      return res.status(400).json({
        success: false,
        message: 'Datos de localización no válidos.',
      })
    }

    if (!validLocationTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'El tipo de localización no es válido.',
      })
    }

    if (
      name.trim().length < 3 ||
      description.trim().length < 10 ||
      climate.trim().length < 3
    ) {
      return res.status(400).json({
        success: false,
        message: 'Los datos no cumplen los requisitos mínimos.',
      })
    }

    if (dangerLevel < 1 || dangerLevel > 10) {
      return res.status(400).json({
        success: false,
        message: 'El nivel de peligro debe estar entre 1 y 10.',
      })
    }

    const data = updateLocation(id, {
      name: name.trim(),
      type,
      description: description.trim(),
      climate: climate.trim(),
      dangerLevel,
    })

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'La localización no existe.',
      })
    }

    return res.status(200).json({
      success: true,
      data,
    })
  } catch (error) {
    next(error)
  }
}

export function handleDeleteLocation(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params
    const wasDeleted = deleteLocation(id)

    if (!wasDeleted) {
      return res.status(404).json({
        success: false,
        message: 'La localización no existe.',
      })
    }

    return res.status(200).json({
      success: true,
      data: null,
    })
  } catch (error) {
    next(error)
  }
}