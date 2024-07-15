const http = require('http');
const socketIo = require('socket.io');
const eventEmitter = require('./events');
require('./scheduler/promotions');

const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(morgan('combined', {stream:accessLogStream}));

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket)=>{
    console.log('a user connected');

});

eventEmitter.on('orderPlaced', (orderDetails)=>{
    io.emit('orderPlaced', orderDetails);

} );

eventEmitter.on('OrderPlaced', (orderDetails)=>{
    io.emit('OrderPlaced', orderDetails);
});

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}.`);
});
