import jwt from "jsonwebtoken";
import Cadastro from "../models/Cadastro";
import configAuth from "../../config/config";
import bcript from "bcryptjs";
class ControllerSession {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await Cadastro.findOne({ email });

    if (!user) {
      return res.json({ error: "Usuario Não existe" });
    }

    const hash = await bcript.compare(password, user.password_hash);
    if (!hash) {
      return res.status(400).json({ error: "Password Invalido" });
    }

    const { _id, name } = user;
    return res.json({
      user: {
        _id,
        name,
        email
      },
      token: jwt.sign({ _id }, configAuth.secret, {
        expiresIn: configAuth.expiresIn
      })
    });
  }
}

export default new ControllerSession();
