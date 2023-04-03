import * as dotenv from "dotenv";
dotenv.config();

export default {
  app: {
    name: "Warehouse Branch",
    apiURL: `${process.env.BASE_API_URL}`,
    serverURL: process.env.BASE_SERVER_URL,
    clientURL: process.env.BASE_CLIENT_URL,
  },
};
