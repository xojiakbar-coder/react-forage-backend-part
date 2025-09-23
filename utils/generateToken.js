import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "5d",
  });
  return token;
};

export default generateToken;
