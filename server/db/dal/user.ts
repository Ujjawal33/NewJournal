import { Op } from "sequelize";
import User, { UserInput, UserOutput } from "../models/User";
import { GetAllUserFilters } from "./types";
import sequelizeConnection from "../config";

/* create user while sign up */
export const create = async (payload: UserInput): Promise<UserOutput> => {
  const user = await User.create(payload);
  return user;
};
export const update = async (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    // @todo throw custom error
    throw new Error("not found");
  }
  const updatedUser = await (user as User).update(payload);
  return updatedUser;
};

export const getById = async (id: number): Promise<UserOutput> => {
  const user = await User.findByPk(id);
  if (!user) {
    // @todo throw custom error
    throw new Error("User not registered");
  }
  return user;
};
export const getByEmail = async (email: string): Promise<UserOutput | any> => {
  const user = await User.findAll({
    where: { email: email },
  });
  return user;
};

export const getByPhoneNo = async (
  phone_no: string
): Promise<UserOutput | any> => {
  const user = await User.findAll({
    where: { phone_no: phone_no },
  });
  return user;
};

export const deleteById = async (id: number): Promise<boolean> => {
  const deletedUserCount = await User.destroy({
    where: { id },
  });
  return !!deletedUserCount;
};

export const getAll = async (
  filters?: GetAllUserFilters
): Promise<UserOutput[]> => {
  return User.findAll({
    where: {
      ...(filters?.isDeleted && {
        deletedAt: { [Op.not]: null },
      }),
    },
    ...((filters?.isDeleted || filters?.includeDeleted) && {
      paranoid: true,
    }),
  });
};
