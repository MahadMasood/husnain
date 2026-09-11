const express = require('express');
const router = express.Router();
const { registerUser, authUser, logoutUser, getUsers, getUserProfile } = require('../controllers/authController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
router.route('/profile').get(protect, getUserProfile);

module.exports = router;
