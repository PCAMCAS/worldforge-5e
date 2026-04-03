import { Router } from 'express'
import { handleGetNpcs } from '../controllers/npcs.controller.ts'

const router = Router()

router.get('/', handleGetNpcs)

export default router