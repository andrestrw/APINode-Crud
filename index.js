import mongoose from "mongoose";
import UserModel from "./user.js";
import express from "express";

import cors from "cors";
import "dotenv/config";

// -----
const app = express();
const URL_CONNECT = process.env.URL_CONNECT;
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

mongoose
  .connect(URL_CONNECT)

  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  UserModel.find()

    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

app.post("/create", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    }
  )
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.delete("/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
