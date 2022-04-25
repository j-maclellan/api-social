const router = require('express').Router();
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require('../../controllers/user-controller');
// Get all and Post at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
// Get one, Put, Delete at /api/users/:id
router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);
    
module.exports = router;