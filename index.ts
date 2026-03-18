import dotenv from "dotenv"

dotenv.config()

import express, {Express, Request, Response} from "express"
import * as database from "./config/database"
import Task from "./models/task.model"
const app: Express = express()


const port: number | string = process.env.PORT || 3000 ;
database.connect()
app.get("/tasks",async (req: Request, res: Response)=>{
  const tasks = await Task.find({
    deleted: false
  })
  res.json({
    tasks: tasks
  })

})
app.get("/tasks/detail/:id",async (req: Request, res: Response)=>{
  const id: string = req.params.id;

  const tasks = await Task.findOne({
    deleted: false,
    _id: id
  })
  res.json({
    tasks: tasks
  })

})

app.listen(port, ()=>{
  console.log(`App listening on port: ${port}`)
})