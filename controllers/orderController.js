const db = require("../db/index");
const Order = db.orders;
const { Sequelize } = require("sequelize");
const testOrder = async (req, res) => {
  res.send("Order is working");
};
const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    console.log(err);
  }
};
const getOrder = async (req, res) => {
  try {
    const order = await Order.findAll({});
    res.status(200).json({
      status: "success",
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        orderId: req.params.id,
      },
    });
    if (!order) {
      return res.status(404).json({
        message: `order with id ${req.params.id} is not found`,
      });
    }
    res.status(200).json({
      status: "success id",
      data: order,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        orderId: req.params.id,
      },
    });
    if (!order) {
      return res.status(404).json({
        message: `order with id ${req.params.id} is not found`,
      });
    } else {
      await Order.destroy({
        where: {
          orderId: req.params.id,
        },
      });
    }

    res.status(200).json({
      message: "deleted Successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        orderId: req.params.id,
      },
    });
    if (!order) {
      return res.status(404).json({
        message: `order with id ${req.params.id} is not found`,
      });
    } else {
      await Order.update(req.body, {
        where: {
          orderId: req.params.id,
        },
      });
    }

    res.status(200).json({
      message: "updated successfully"
    //   data: order,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  testOrder,
  addOrder,
  getOrder,
  getOrderById,
  deleteOrder,
  updateOrder,
};