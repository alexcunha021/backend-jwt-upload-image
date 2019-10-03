import { Router } from "express";
import multer from "multer";
import configMulter from "./config/multer";
import authMiddleware from "./middlewares/auth";
import ControllerCadastro from "./app/controllers/controllerCadastro";
import ControllerSession from "./app/controllers/controllerSession";
import ControllerUser from "./app/controllers/controllerUser";
const route = new Router();

route.post(
  "/cadastro",
  multer(configMulter).single("file"),
  ControllerCadastro.store
);

route.post("/session", ControllerSession.store);

//
route.use(authMiddleware);

route.post("/users", ControllerUser.index);

export default route;
