import * as userDal from "../dal/user";
import { GetAllUserFilters } from "../dal/types";
import { UserInput, UserOutput } from "../models/User";

export const create = (paylod: UserInput): Promise<UserOutput> => {
  return userDal.create(paylod);
};

export const update = (
  id: number,
  payload: Partial<UserInput>
): Promise<UserOutput> => {
  return userDal.update(id, payload);
};

export const getById = (id: number): Promise<UserOutput> => {
  return userDal.getById(id);
};

export const deleteById = (id: number): Promise<boolean> => {
  return userDal.deleteById(id);
};

export const getAll = (filters: GetAllUserFilters): Promise<UserOutput[]> => {
  return userDal.getAll(filters);
};

export const findByEmail = (email: string): Promise<UserOutput> => {
  return userDal.getByEmail(email);
};

export const findByPhoneNo = (phone_no: string): Promise<UserOutput> => {
  return userDal.getByPhoneNo(phone_no);
};

export const checkUserExist = async (
  email: string,
  phone_no: string
): Promise<Boolean> => {
  const userEmail: any = await findByEmail(email);
  const userPhoneNo: any = await findByPhoneNo(phone_no);
  if (userEmail.length === 0 && userPhoneNo.length === 0) {
    return false;
  } else {
    return true;
  }
};
