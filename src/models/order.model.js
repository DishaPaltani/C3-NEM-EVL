module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
      userId: {
        type: Sequelize.INTEGER
      },
      bookIds: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      status: {
        type: Sequelize.STRING
      }
    });
  
    return Order;
  };
  