import express from 'express';
import { createRole, deleteRole, getAll, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

router.post('/create',createRole);
router.put('/update/:id',updateRole);
router.delete('/delete/:id',deleteRole);
router.get('/all',getAll);

export default router