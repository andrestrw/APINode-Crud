import mongoose from "mongoose";
import UserModel from "./user.js";
import express from "express";

import "dotenv/config";

// -----
const app = express();
const URL_CONNECT = process.env.URL_CONNECT;
const PORT = process.env.PORT;

app.use(express.json());

app.use(express.static("dist"));

mongoose
  .connect(URL_CONNECT)

  .then((db) => console.log("DB is connected"))
  .catch((err) => console.log(err));

app.get("/api", (req, res) => {
  UserModel.find()

    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.get("/api/get/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findById({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => console.log(err));
});

app.post("/api/create", (req, res) => {
  UserModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});
app.put("/api/update/:id", (req, res) => {
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
app.delete("/api/deleteuser/:id", (req, res) => {
  const id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
