import  flash  from "express-flash"; // Importação do flash
import User from "../models/User.js"; // Caminho corrigido com extensão .js

export class AuthController {
  static async login(req, res) {
    res.render("auth/login");
  }

  static async register(req, res) {
    res.render("auth/register");
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    console.log(name, email, password, confirmPassword);

    if (password !== confirmPassword) {
      req.flash("message", "As senhas digitadas não são iguais!...");
      res.render("auth/register");
      return;
    }

    try {
      const checkUserExists = await User.findOne({
        where: { email: email },
      });

      if (checkUserExists) {
        req.flash("message", "Usuário já cadastrado!...");
        res.render("auth/register");
        return;
      }

      await User.create({ name, email, password });
      req.flash("message", "Usuário cadastrado com sucesso!");
      res.redirect("/login");
    } catch (error) {
      req.flash("message", "Erro ao cadastrar usuário!...");
      res.render("auth/register");
    }
  }
}
