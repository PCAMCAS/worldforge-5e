import { Router } from 'express'
import {
  handleGetRandomEncounter,
  handleGetRandomEvent,
  handleGetRandomTreasure,
} from '../controllers/generators.controller.ts'

const router = Router()

router.get('/random-event', handleGetRandomEvent)
router.get('/random-encounter', handleGetRandomEncounter)
router.get('/random-treasure', handleGetRandomTreasure)

export default router