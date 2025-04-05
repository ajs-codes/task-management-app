const { Op } = require("sequelize");
const { Task } = require("../models");

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, name } = req.query;
    const offset = (page - 1) * limit;

    let whereClause = {
      userId: req.user.id,
    };
    if (status) {
      whereClause.status = status;
    }

    if (name) {
      whereClause.name = { [Op.iLike]: `%${name.trim()}%` };
    }

    const tasks = await Task.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [["createdAt", "ASC"]],
    });

    res.status(200).json({
      success: true,
      data: tasks.rows,
      meta: {
        totalTasks: tasks.count,
        totalPages: Math.ceil(tasks.count / limit),
        currentPage: page,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { name, description, startDate, endDate, status } = req.body;

    const task = await Task.create({
      name,
      description,
      startDate,
      endDate,
      status,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description, startDate, endDate, status } = req.body;

    let task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }
    task = await task.update({
      name,
      description,
      startDate,
      endDate,
      status,
    });
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) {
      return res
        .status(404)
        .json({ success: false, message: "Task not found" });
    }

    await task.destroy();
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
