const dotenv = require("dotenv").config();
const express = require("express");
const connection = require("./config/db");
const userRoute = require("./routes/user.route");
const taskRoute = require("./routes/task.route");
const Auth = require("./middlewares/Auth.middleware");
const cors=require('cors')
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({origin:'*'}))

app.use(express.json());
app.use("/user",userRoute);
app.use('/task',Auth,taskRoute)

app.get("/", (req, res) => {
  res.status(200).send("Server is working fine....");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`Server is working on PORT ${PORT} and database is also connected....`);

  } catch (error) {
    console.log(`Error connecting to database or server  : ${error}`);
  }
});