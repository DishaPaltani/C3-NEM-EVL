const eventEmitter = require('./index');

eventEmitter.on('orderPlaced', (orderDetails)=>{
    console.log('Order placed:', orderDetails);
})