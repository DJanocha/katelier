import express from 'express';
import {
  register,
  login,
  resetPassword,
  forgotPassword,
  me,
  requireLogin,
  updatePassword,
  updateMe,
  deleteMe
} from 'src/controllers/auth';

const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/reset_password/:token').post(resetPassword);
router.route('/forgot_password').post(forgotPassword);

router.use(requireLogin); // from now on require login
router.route('/me').get(me);
router.route('/updateMe').get(updateMe);
router.route('/update_password').post(updatePassword);
router.route('/deleteMe').delete(deleteMe);

export default router;
