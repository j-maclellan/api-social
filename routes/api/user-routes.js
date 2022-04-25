const router = require('express').Router();
const { getAllUsers } = require('../../controllers/user-controller');
// Get all and Post at /api/users
router
    .route('/')
    .get(getAllUsers)
    .get(getOneUser)
    .post(createUser);

module.exports = router;