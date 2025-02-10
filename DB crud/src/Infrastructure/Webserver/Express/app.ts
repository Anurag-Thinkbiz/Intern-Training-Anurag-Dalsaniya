import express from "express";
import DBconnection from "../../config/config";
import router from "../../../Interface/routes/User.route";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use("/user", router);

export const db = DBconnection;

db.connect()
  .then(() => console.log("connect successfully"))
  .catch((err) => {
    console.log("error in DB connection");
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on  http://localhost:${port}`);
});
