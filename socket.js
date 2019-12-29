let io;

/* istanbul ignore next */
module.exports = {
    init: httpServer => io = require('socket.io')(httpServer),
    getIO: () => io ? io : new Error('socket.io not initialize')
};
