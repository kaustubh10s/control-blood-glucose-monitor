import { Router } from "express";

import { getUser } from "../../controllers/users/usersController.js"

const router = Router();

router.route('/:user_id')
    .get(getUser);

export default router;