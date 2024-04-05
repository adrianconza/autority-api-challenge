import db from '@/database';

const validate = ({
  name, description, author, isComplete = true,
}) => {
  if (!name) {
    return { success: false, message: 'Name is required' };
  }
  if (!description) {
    return { success: false, message: 'Description is required' };
  }
  if (!author) {
    return { success: false, message: 'Author is required' };
  }
  if (name.length > 50) {
    return { success: false, message: 'Name cannot be greater 50 characters' };
  }
  if (author.length > 50) {
    return { success: false, message: 'Author cannot be greater 50 characters' };
  }
  if (!isComplete) {
    return { success: false, message: 'IsComplete cannot be false' };
  }
  return null;
};

const ensureExistTask = async (id) => {
  const task = await db.models.task.findByPk(id);
  if (!task) {
    return { success: false, message: `Task with id: ${id} doesn't exist` };
  }
  return null;
};

/**
 * GET /tasks
 */
export const findAll = async (req, res) => {
  const tasks = await db.models.task.findAll();
  return res.json({ data: tasks });
};

/**
 * GET /task/:id
 */
export const findOne = async (req, res) => {
  const { id } = req.params;
  const task = await db.models.task.findByPk(id);
  return res.json({ data: task });
};

/**
 * POST /task
 */
export const create = async (req, res) => {
  const { name, description, author } = req.body;
  const error = validate({ name, description, author });
  if (error) {
    return res.status(500).json(error);
  }

  await db.models.task.create({
    name, description, author, isComplete: false,
  });
  return res.json({ success: true });
};

/**
 * PUT /task/:id
 */
export const update = async (req, res) => {
  const { id } = req.params;
  const {
    name, description, author, isComplete,
  } = req.body;

  const existTaskError = await ensureExistTask(id);
  if (existTaskError) {
    return res.status(404).json(existTaskError);
  }
  const error = validate({
    name, description, author, isComplete,
  });
  if (error) {
    return res.status(500).json(error);
  }

  await db.models.task.update({
    name, description, author, isComplete,
  }, { where: { id } });
  return res.json({ success: true });
};

/**
 * DELETE /task/:id
 */
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const existTaskError = await ensureExistTask(id);
  if (existTaskError) {
    return res.status(404).json(existTaskError);
  }

  await db.models.task.destroy({ where: { id } });
  return res.json({ success: true });
};
