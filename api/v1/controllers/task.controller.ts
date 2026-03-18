import Task from "../models/task.model"
import { Request, Response } from "express"
export const index = async (req: Request, res: Response) => {
  interface Find {
    deleted: boolean,
    status?:string
  }
  let find: Find ={
    deleted:false
  }
  if(req.query.status){
    find.status = req.query.status.toString()
  }
  const status = req.query.status;
  const tasks = await Task.find({
    status: status,
    deleted: false
  })
  if(!tasks){

  }
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
