const express = require('express');
const router = express.Router();
// 注销 /logout
router.get('/', (req, res) => {
	req.session.destroy();
	res.redirect('/login');
})
module.exports = router;
