import * as UserService from "../db/services/user.service"
import {UserOutput,UserInput} from "../db/models/User"



export const createUser = async(userData:any): Promise<UserInput> => {
    const user: UserInput = await UserService.create(userData)
    return user;
}


export const updateUser = async(id:number, userData:any): Promise<UserInput> => {
    const user: UserInput = await UserService.update(id, userData)
    return user;
}


export const getUserById = async (id: number): Promise<UserOutput> =>{
    const user:UserOutput = await UserService.getById(id)
    return user;
}


export const deleteUserById = async (id: number): Promise<Boolean> =>{
    const isDeleted = await UserService.deleteById(id)
    return isDeleted
}

export const getAllUsers = async (reqFilters: any): Promise<UserOutput[]> => {
	const user: UserOutput[] = await UserService.getAll(reqFilters);
	return user;
};
    
