import { Sequelize } from "sequelize";
import User from "./UserModel.js";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Post = db.define(
  "nb_posts",
  {
    judul: DataTypes.STRING,
    isi: DataTypes.TEXT,
    gambar: DataTypes.STRING,
    kategori: DataTypes.STRING,
    url: DataTypes.STRING,
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: User,
    //     key: "id",
    //   },
    // },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Post);
Post.belongsTo(User);

export default Post;

(async () => {
  await db.sync();
})();
