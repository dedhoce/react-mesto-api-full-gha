const JWT_SECRET = process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "dev-secret";
const MONGOOSE_CONNECT = "mongodb://localhost:27017/mestodb";
const PORT3000 = 3000;

module.exports = {
  JWT_SECRET,
  MONGOOSE_CONNECT,
  PORT3000
};
