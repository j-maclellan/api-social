const router = require('express').Router();
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/user-controller');
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

// Add new Friend to User's friend list, remove Friend from friend list at /api/users/:userId/friends/:friendId
router 
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;