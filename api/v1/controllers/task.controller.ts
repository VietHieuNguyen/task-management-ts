import Task from "../models/task.model"
import { Request, Response } from "express"
export const index = async (req: Request, res: Response) => {
  const tasks = await Task.find({
    deleted: false
  })
  res.json({
    tasks: tasks
  })

}
export const detail = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  const tasks = await Task.findOne({
    deleted: false,
    _id: id
  })
  res.json({
    tasks: tasks
  })

}