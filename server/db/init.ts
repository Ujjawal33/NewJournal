import User from "./models/User";

const isDev = process.env.NODE_ENV === "development";

async function init() {
  await User.sync({ alter: isDev });
}
const dbInit = () => {
  init();
};

export default dbInit;
