const Task = require('../model/Taskmodel');

exports.createTask = async (req, res) => {
    console.log("body",req.body)
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const tasks = await Task.find()
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const totalTasks = await Task.countDocuments();
    res.send({ tasks, totalPages: Math.ceil(totalTasks / limit) });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send(task);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send({ error: 'Task not found' });
    }
    task.status = req.body.status;
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
