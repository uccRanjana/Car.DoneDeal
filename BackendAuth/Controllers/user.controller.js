import User from "../Modals/User.js";
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";

export const getAllUsers = async(res, req, next) => {
   try {
    const users = await User.find();
    return next(CreateSuccess(200, "All Users", users));
   } catch (error) {
     return next(CreateError(500, "Internal server error"));
   }
}

export const getById = async(req, res, next) => {
 try {
    const user = await User.findById({_id: req.params.id});
    if(!user)
    {return next(CreateError(404, "User not Found"));}
  return next(CreateSuccess(200, "User is ", user))
 } catch (error) {
    return next(CreateError(500, "Internal server error"));
 }   
}