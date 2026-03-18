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

  //Sort
const sort: Record<string, any> = {}; // Đổi dòng này  
  if(req.query.sortKey && req.query.sortValue){
    const sortKey = req.query.sortKey.toString()
    sort[sortKey] = req.query.sortValue.toString();
  }
  

 
  const tasks = await Task.find(find).sort(sort)
  if(!tasks){

  }
  res.json({
    tasks: tasks
  })

}
export const detail = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const tasks = await Task.findOne({
    deleted: false,
    _id: id
  })
  res.json({
    tasks: tasks
  })

}
