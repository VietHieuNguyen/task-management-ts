import dotenv from "dotenv"
dotenv.config()

import express, {Express} from "express"
import * as database from "./config/database"
import Task from "./api/v1/models/task.model"
import mainV1Routes from "./api/v1/routes/index.route"
import cors from "cors"

database.connect()
const app: Express = express()
const port: number | string = process.env.PORT || 3000 ;

// const corsOptions = {
//   origin: '',
//   optionSuccessStatus: 200
// }//Husky

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mainV1Routes(app)

app.listen(port, ()=>{
  console.log(`App listening on port: ${port}`)
})