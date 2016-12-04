const express = require('express');
const router = express.Router();
// 注销 /user/logout
router.get('/', (req, res) => {
	req.session.destroy();
	res.redirect('/user/login');
})
module.exports = router;
