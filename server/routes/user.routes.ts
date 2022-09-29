import { Router, Request, Response } from "express";
import * as userController from "../controller/user.controller";
import { FilterUserDTO, CreateUserDTO, UpdateUserDTO } from "../db/models/User";

const userRouter = Router();

// get all users
userRouter.get("/", async (req: Request, res: Response) => {
  const filters: FilterUserDTO = req.query;
  const results = await userController.getAllUsers(filters);
  return res.status(200).send(results);
});

//get user by id
userRouter.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userController.getUserById(id);
  return res.status(200).send(result);
});

//create new user
userRouter.post("/", async (req: Request, res: Response) => {
  const payload: CreateUserDTO = req.body;
  const result = await userController.createUser(payload);
  return res.status(200).send(result);
});

//update user
userRouter.put("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const payload: UpdateUserDTO = req.body;

  const result = await userController.updateUser(id, payload);
  return res.status(201).send(result);
});

//delete user by id
userRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = await userController.deleteUserById(id);
  return res.status(204).send({
    success: result,
  });
});

export default userRouter;
