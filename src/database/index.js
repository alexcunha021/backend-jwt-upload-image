import mongoose from "mongoose";
require("dotenv").config;

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      "mongodb://localhost:27017/belemtour",
      { useNewUrlParser: true }
    );
  }
}

export default new Database();
