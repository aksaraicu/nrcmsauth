import User from "../models/UserModel.js";
// import path from "path";
import { Op } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  const halaman = parseInt(req.query.halaman) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const cari = req.query.cari || "";
  const offset = limit * halaman;
  const totalBaris = await User.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + cari + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + cari + "%",
          },
        },
      ],
    },
  });
  //Pembulatan ke atas buat totalHalaman
  const totalHalaman = Math.ceil(totalBaris / limit);
  const hasil = await User.findAll({
    attributes: ["id", "name", "email"],
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + cari + "%",
          },
        },
        {
          email: {
            [Op.like]: "%" + cari + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    // order: [["id", "DESC"]],
  });
  res.json({
    hasil: hasil,
    halaman: halaman,
    limit: limit,
    totalBaris: totalBaris,
    totalHalaman: totalHalaman,
  });
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Password dan confirm password tidak sesuai" });

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.json({ msg: "Register berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });

    console.log(user[0].id);

    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "20s",
      }
    );
    
    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    await User.update(
      { refresh_token: refreshToken },
      {
        where: {
          id: userId,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: auto
    });
    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);

  const user = await User.findAll({
    where: {
      refresh_token: refreshToken,
    },
  });

  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await User.update(
    { refreshToken: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
