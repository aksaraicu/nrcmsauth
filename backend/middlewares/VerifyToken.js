import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log(req);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(' ')[1];
  
  if(token == null) return res.status(401).json({ msg: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if(error) return res.status(403).json({ msg: "Forbidden" });
    req.userId = decoded.userId;

    next();
  });
};
