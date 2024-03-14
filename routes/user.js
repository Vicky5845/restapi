import express from 'express';
import { getAllUser, getAllUserById } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utilis/verifytoken.js';


const router = express.Router();

router.get('/',verifyAdmin,getAllUser);
router.get('/:id',verifyUser,getAllUserById);

export default router