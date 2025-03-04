const jwt = require("jsonwebtoken");
export const generateToken = (userId: any) => {
  try {
    var token = jwt.sign({ userId }, "my_secret_key", { expiresIn: "24h" });
    console.log(token)
    return token;
  } catch (error) {
    console.log(error);
  }
};
