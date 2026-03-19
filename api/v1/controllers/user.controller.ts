import { Request,Response } from "express"
import bcrypt from "bcrypt"
import User from "../models/user.model";
import { generateRandomString } from "../../../helpers/generate";
const saltRounds = 10;
export const register =async (req: Request, res: Response)=>{
  interface IUserbody{
    fullName: string,
    email: string,
    password: string
  }
  let {fullName, email, password} = req.body as IUserbody
  const emailExist = await User.findOne({
    email: email
  })
  if(emailExist){
    return res.status(400).json({
      message: "Email đã tồn tại"
    })
  }else{
    const hashedPassword = await  bcrypt.hash(password,saltRounds)
    const token  = generateRandomString(20)
    const data = {
      fullName,
      email,
      password: hashedPassword,
      token
    }
    const user = new User(data)
    await user.save();
    res.status(200).json({
      message: "Tạo tài khoản thành công"
    })
  }

}

export const login =async (req: Request, res: Response)=>{
  interface ILogin{
    email: string,
    password: string
  }
  const {email, password} = req.body as ILogin

  const user = await User.findOne({
    email: email,
    deleted: false
  })
  if(!user){
    return res.status(400).json({
      message: "Email không tồn tại"
    })
  }
  const isMatch = await bcrypt.compare(password, user.password!)
  if(!isMatch){
    return res.status(400).json({
      message: "Sai mật khẩu"
    })
    
  }
  const token = user.token
  res.status(200).json({
      message: "Đăng nhập thành công",
      token: token
    })
}