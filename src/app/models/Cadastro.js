import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
const schemaCadastro = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },

    password_hash: {
      type: String
    },

    favorites: [{ type: Schema.Types.ObjectId, ref: "Food", ref: "Servicos" }]
    // favorites: [{ type: Schema.Types.ObjectId, ref: "Food" }]
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

schemaCadastro.virtual("password");
schemaCadastro.virtual("url").get(function() {
  const url = process.env.URL || "http://localhost:3333";
  return `${url}/files/${encodeURIComponent(this.avatar)}`;
});
try {
  schemaCadastro.pre("save", async function() {
    try {
      if (this.password) {
        this.password_hash = await bcrypt.hash(this.password, 8);
      }
    } catch (error) {
      console.log(error);
    }
  });
} catch (error) {
  console.log("error");
}

export default model("Cadastro", schemaCadastro);
