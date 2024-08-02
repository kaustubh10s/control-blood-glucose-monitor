import { Router } from "express";

import handleRegister from "../../controllers/auth/registerController.js";
import handleLogin from "../../controllers/auth/loginController.js";
import handleLogout from "../../controllers/auth/logoutController.js"
import handleRefreshToken from "../../controllers/auth/refreshTokenController.js";

const router = Router();

router.post('/register', handleRegister);
router.post('/login', handleLogin);
router.get('/logout', handleLogout);
router.post('/refreshToken', handleRefreshToken);

export default router;