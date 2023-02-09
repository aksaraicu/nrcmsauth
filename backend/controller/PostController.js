import Post from "../models/PostModel.js";
import { Op } from "sequelize";
import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";
import sharp from "sharp";

export const getPosts = async (req, res) => {
  const halaman = parseInt(req.query.halaman) || 0;
  const limit = parseInt(req.query.limit) || 5;
  const cari = req.query.cari || "";
  const offset = limit * halaman;
  const totalBaris = await Post.count({
    where: {
      [Op.or]: [
        {
          judul: {
            [Op.like]: "%" + cari + "%",
          },
        },
        {
          kategori: {
            [Op.like]: "%" + cari + "%",
          },
        },
      ],
    },
  });
  //Pembulatan ke atas buat totalHalaman
  const totalHalaman = Math.ceil(totalBaris / limit);
  const hasil = await Post.findAll({
    // attributes: {
    //   exclude: ["nbUserId"],
    // },
    include: {
      model: User,
      attributes: {
        exclude: ["password", "refresh_token", "id"],
      },
    },
    where: {
      [Op.or]: [
        {
          judul: {
            [Op.like]: "%" + cari + "%",
          },
        },
        {
          kategori: {
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

export const getPostByID = async (req, res) => {
  try {
    const response = await Post.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.error(error.message);
  }
};

export const createPost = async (req, res) => {
  if (!req.userId) return res.status(401).json({ msg: "Unauthorized" });

  if (req.files === null)
    return res.status(400).json({ msg: "No files were uploaded" });

  const judul = req.body.judul;
  const isi = req.body.isi;
  const kategori = req.body.kategori;
  const gambar = req.files.gambar;
  const ext = path.extname(gambar.name);
  const fileName = gambar.md5;
  const data = req.files.gambar.data;
  const allowwedType = [".png", ".jpg", ".jpeg", ".webp"];

  if (!allowwedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Wrong image extension" });

  let format;
  await sharp(data)
    .resize(400)
    .toFile(`./public/gambar/${fileName}.webp`)
    .then((data) => {
      format = data.format;
    });

  const url = `${req.protocol}://${req.get(
    "host"
  )}/gambar/${fileName}.${format}`;

  try {
    await Post.create({
      judul: judul,
      isi: isi,
      kategori: kategori,
      gambar: `${fileName}.${format}`,
      url: url,
      nbUserId: req.userId,
    });

    res.status(201).json({ msg: "Post added successfully" });
  } catch (error) {
    console.error(error.message);
  }
};

export const updatePost = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) return res.status(404).json({ msg: "Data tidak ditemukan" });
  let fileName;
  let format;
  let data;
  const judul = req.body.judul;
  const isi = req.body.isi;
  const kategori = req.body.kategori;
  if (req.files === null) {
    fileName = post.gambar;
    format = null;
    data = `./public/gambar/${fileName}.webp`;
  } else {
    const gambar = req.files.gambar;
    const ext = path.extname(gambar.name);
    const allowwedType = [".png", ".jpg", ".jpeg", ".webp"];
    if (!allowwedType.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Ekstensi gambar salah" });
    fileName = gambar.md5;
    data = req.files.gambar.data;
    fs.unlinkSync(`./public/gambar/${post.gambar}`);
    await sharp(data)
      .resize(400)
      .toFile(`./public/gambar/${fileName}.webp`)
      .then((data) => {
        format = data.format;
      });
  }
  const url = `${req.protocol}://${req.get("host")}/gambar/${fileName}${
    format ? "." + format : ""
  }`;
  try {
    await Post.update(
      {
        judul: judul,
        isi: isi,
        kategori: kategori,
        gambar: `${fileName}${format ? "." + format : ""}`,
        url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).json({ msg: "Post sukses ditambahkan" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletePost = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) return res.status(404).json({ msg: "Data tidak ditemukan" });
  try {
    const filePath = `./public/gambar/${post.gambar}`;
    fs.unlinkSync(filePath);
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Data telah dihapus" });
  } catch (error) {
    console.error(error.message);
  }
};
