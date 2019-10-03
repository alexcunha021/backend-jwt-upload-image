import Cadastro from "../models/Cadastro";

class ControllerCadastro {
  async store(req, res) {
    const { email, name, password } = req.body;

    const image = req.file.key;

    console.log(req.file.key);
    const UserExist = await Cadastro.findOne({ email });

    if (UserExist) {
      return res.status(401).json({ Error: "E-mail já existe" });
    }

    const { avatar, url } = await Cadastro.create({
      name,
      avatar: image,
      email,
      password
    });
    return res.json({ name, avatar, email, url });

    return res.send("ok");
  }
  async update(req, res) {
    return res.json({ ok: true });
  }
  async index(req, res) {
    const user = await Cadastro.findById(req.userId);
    return res.json(user);
  }
}

export default new ControllerCadastro();
