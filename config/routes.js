const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const itemsRouter = require('../items/items-router.js')

module.exports = server => {
    server.use('/auth', authRouter);
    server.use('/users', usersRouter);
    server.use('/items', itemsRouter);
};