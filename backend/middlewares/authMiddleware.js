//This is gonna validate the token

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

//This is a middleware function
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //index 0 will have 'Bearer' and index 1 will have token
      token = req.headers.authorization.split(" ")[1];

      //decoded has {id:*******,iat:**,exp:**}
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //store info of user except password
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized,Token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("User not authorized,no token");
  }
});
export default protect;
