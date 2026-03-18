import paginationHelper from "../../../helpers/pagination"
import searchHelper from "../../../helpers/search"
import Task from "../models/task.model"
import { Request, Response } from "express"
export const index = async (req: Request, res: Response) => {
  interface Find {
    deleted: boolean,
    status?: string,
    title?: RegExp
  }

  let find: Find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status.toString()
  }
  //Search
  let objectSearch = searchHelper(req.query);

  if (req.query.keyword) {
    find.title = objectSearch.regex;
  }
  //End Search
  //Sort
  const sort: Record<string, any> = {}; // Đổi dòng này  
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey.toString()
    sort[sortKey] = req.query.sortValue.toString();
  }


  //Pagination
  const initPagination = {
    currentPage: 1,
    limitItems: 2,
  };
  const countTasks = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    initPagination,
    req.query,
    countTasks,
  );
  const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItems).skip(objectPagination.skip)

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

export const changeStatus = async (req: Request, res: Response)=>{
  
  try {
  const id = req.params.id as string;  
      const status = req.body.status;
      await Task.updateOne(
        {
          _id: id,
        },
        {
          status: status,
        },
      );
      res.json({
        code: 200,
        message: "Cập nhật trạng thái thành công",
      });
    } catch {
      res.json({
        code: 400,
        message: "Không tồn tại",
      });
    }
}
export const changeMulti = async (req: Request, res:Response)=>{
  try {
      const { ids, key, value } = req.body;
  
      switch (key) {
        case "status":
          await Task.updateMany(
            {
              _id: { $in: ids },
            },
            { status: value },
          );
          res.json({
            code: 200,
            message: "Cập nhật trạng thái thành công",
          });
          break;
        case "delete": //Đã làm trước đó
          await Task.updateMany(
            {
              _id: { $in: ids },
            },
            { deleted: true,
              deletedAt: new Date()
             },
          );
          res.json({
            code: 200,
            message: "Xóa thành công",
          });
          break;
        default:
          res.json({
            code: 400,
            message: "Không tồn tại",
          });
          break;
      }
    } catch {
      res.json({
        code: 400,
        message: "Không tồn tại",
      });
    }
}

export const create = async (req: Request, res:Response)=>{
  try {
      const task = new Task(req.body);
      const data = await task.save();
      res.json({
        code: 200,
        message: "Tạo thành công",
        data: data,
      });
    } catch {
      res.json({
        code: 400,
        message: "Không tồn tại",
      });
    }
}

export const edit = async (req: Request, res:Response)=>{
  try {
      const id = req.params.id;
  
      await Task.updateOne(
        {
          _id: id,
        },
        req.body,
      );
      res.json({
        code: 200,
        message: "Chỉnh sửa thành công",
      });
    } catch {
      res.json({
        code: 400,
        message: "Không tồn tại",
      });
    }
}

export const deleteTask = async (req: Request, res:Response)=>{
  try {
    const id = req.params.id;
    await Task.updateOne({
      _id: id
    },{
      deleted: true
    })
    res.status(200).json({
      message: "Đã xóa thành công"
    })
  } catch (error) {
    res.status(500).json({
      message: "Lỗi Server"
    })
  }
}