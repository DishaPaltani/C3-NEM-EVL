const {createObjectsCsvWriter} = require('csv-writer');
const Order = require('../models/order.model');
const io = require('../server').io;

exports.notifyNewOrder = (orderDetails)=>{
    io.emit('newOrder', orderDetails);
}

exports.exportOrder = (req, res) =>{
    const csvWriter = createObjectCsvWriter({
        path: 'orders.csv',
        header : [
            {id: 'id', title : 'ID'},
            {id: 'userId', title: 'User ID'},
            {id: 'bookIds', title: 'Book IDs'},
            {id: 'status', title: 'Status'},
        ],
    });

    Order.findAll()
    .then(orders=>{
        return csvWriter.writeRecords(orders);
    })
    .then(()=>{
        res.download('orders.csv');

    })
    .catch(err=>{
        res.status(500).send({message: err.message});
    })
}
