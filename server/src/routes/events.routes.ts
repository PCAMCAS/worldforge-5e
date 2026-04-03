import { Router } from 'express'
import { handleGetEvents } from '../controllers/events.controller'

const router = Router()

router.get('/', handleGetEvents)

export default router