const username = process.env.username;
const password = process.env.password;
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET,
  MOGOURI: `mongodb+srv://${username}:${password}@cluster0.cj6w8iy.mongodb.net/?retryWrites=true&w=majority`,
};
