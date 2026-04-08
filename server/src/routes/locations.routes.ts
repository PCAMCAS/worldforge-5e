import { Router } from 'express'
import {
  handleCreateLocation,
  handleDeleteLocation,
  handleGetLocations,
  handleUpdateLocation,
} from '../controllers/locations.controller.ts'

const router = Router()

router.get('/', handleGetLocations)
router.post('/', handleCreateLocation)
router.patch('/:id', handleUpdateLocation)
router.delete('/:id', handleDeleteLocation)

export default router