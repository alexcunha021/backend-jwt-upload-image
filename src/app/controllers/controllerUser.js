import User from "../models/Cadastro";

class ControllerUser {
  async index(req, res) {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Usuário não existe" });
    }
    const { name, avatar } = user;
    return res.json({
      name,
      avatar
    });
  }
}

export default new ControllerUser();
