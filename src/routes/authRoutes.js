const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/profile', verifyToken, (req, res) => {
    res.json({ 
        ok: true, 
        message: "Bienvenido al área segura",
        userId: req.user.id 
    });
});

module.exports = router;