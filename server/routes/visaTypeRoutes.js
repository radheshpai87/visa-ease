import express from 'express';
import { getVisaTypes } from '../controllers/visaTypeController.js';

const router = express.Router();

router.route('/')
  .get(getVisaTypes);

export default router;
