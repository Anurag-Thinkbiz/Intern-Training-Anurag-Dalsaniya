import express from "express";
import DBconnection from "../../config/config";
import router from "../../../Interface/routes/User.route";
import { AppDataSource } from "../../orm/typeorm/config/orm.config";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../../../swagger/swagger.json";
const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/user", router);

export const db = DBconnection;

AppDataSource.initialize()
  .then(() => {
    console.log("database successfully connected");
    app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(port, () => {
      console.log(`Server is running on  http://localhost:${port}`);
    });
  })
  .catch(() => {
    console.log("Error in initializing database");
  });