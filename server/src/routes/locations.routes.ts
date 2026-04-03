import { Router } from 'express'
import { handleGetLocations } from '../controllers/locations.controller.ts'

const router = Router()

router.get('/', handleGetLocations)

export default router