import { Router } from "express";
import { getRecords, createRecord } from '../../controllers/records/recordsController.js'

const router = Router();

router.route('/')
    .get(getRecords)
    .post(createRecord);

export default router;