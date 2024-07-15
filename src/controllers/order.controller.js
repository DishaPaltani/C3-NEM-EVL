const db = require("../models");
const eventEmitter = require('../events');
const transport = require('../config/nodemailer.cofig');
const adminController = require('./admin.controller');


const Order = db.order;
const User = db.user;

eventEmitter.on('orderPlaced', (orderDetails)=>{
  adminController.notifyNewOrder(orderDetails);
})

exports.getOrdersByCustomer = (req, res) => {
  eventEmitter.emit('OrderPlaced', orderDetails);
  Order.findAll({
    where: { userId: req.params.userId },
    include: [User]
  })
    .then(orders => {
      res.status(200).send(orders);
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });


};

eventEmitter.on('OrderPlaced', (orderDetails)=>{
  const mailOptions = {
    from : process.env.EMAIL,
    to: orderDetails.customerEmail,
    subject : 'Order Confirmation',
    text : `Your order has been placed successfully ! Order ID : ${orderDetails.id}`,
  };

  transport.transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      return console.log(error);
    }
    console.log('Email sent: ' + info.response);
  })
})

