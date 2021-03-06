import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { name, AppError, catchAsync } from 'src/utils';

type HandlerKey = 'getAll' | 'getOne' | 'deleteOne' | 'updateOne' | 'createOne';
const plural = (singular: string) =>
  singular.endsWith('y') ? singular.slice(0, -1) + 'ies' : singular + 's';
export const generateHandlers = ({
  model
}: {
  model: mongoose.Model<any>;
}): Record<HandlerKey, RequestHandler> => ({
  getAll: catchAsync(async (req, res, next) => {
    const elements = await model.find();
    return res.status(500).json({
      count: elements.length,
      role: `get all ${plural(name(model))}`,
      ready: false,
      elements
    });
  }),
  createOne: catchAsync(async (req, res, next) => {
    const newElement = await model.create({ ...req.body });
    return res.status(200).json({
      role: `create one ${name(model)}`,
      ready: false,
      newElement
    });
  }),
  getOne: catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const one = await model.findById(id);
    if (one === null) {
      return next(new AppError(`Could not find a/an ${name(model)}`, 404));
    }
    return res
      .status(200)
      .json({ role: 'get single item', ready: false, id, one });
  }),
  updateOne: catchAsync(async (req, res, next) => {
    const { params, body } = req;
    const { id } = params;
    await model.findByIdAndUpdate(id, { ...req.body });

    return res.status(200).json({
      message: `updating single ${name(model)} NOT IMPLEMENTED YET!!`,
      body
    });
  }),
  deleteOne: catchAsync(async (req, res, next) => {
    const { params } = req;
    const { id } = params;
    await model.findByIdAndDelete(id);
    return res.status(200).json({
      message: `deleting single ${name(
        model
      )} with id ${id} NOT IMPLEMENTED YET!!`,
      params
    });
  })
});
