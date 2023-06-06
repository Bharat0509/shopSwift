import express from 'express';
import {
    setCookie,
    deleteUser,
    forgotPassword,
    getAllUser,
    getUserDetailAdmin,
    getUserDetails,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    updateUserPassword,
    updateUserProfile,
    updateUserRole,
    getCookie
} from '../controllers/userController.js';
import { authorizeRoles, isAuthenticatedUser } from '../middlewares/auth.js';

const router = express.Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/logout').get(logoutUser);

router.route('/me').post(isAuthenticatedUser, getUserDetails);

router.route('/password/update').put(isAuthenticatedUser, updateUserPassword);

router.route('/me/update').put(isAuthenticatedUser, updateUserProfile);

router
    .route('/admin/users')
    .post(isAuthenticatedUser, authorizeRoles('admin'), getAllUser);

router
    .route('/admin/user/:id')
    .post(isAuthenticatedUser, authorizeRoles('admin'), getUserDetailAdmin);

router
    .route('/admin/user/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateUserRole);

router
    .route('/admin/user/delete/:id')
    .post(isAuthenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
