import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Configuration, OpenAIApi } from "openai";

const TambahPost = () => {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [kategori, setKategori] = useState("");
  const [gambar, setGambar] = useState("");
  const [preview, setPreview] = useState("");

  const [ide, setIde] = useState("");
  const [hasilIdeGambar, setHasilIdeGambar] = useState("");
  const [hasilIde, setHasilIde] = useState("");
  const [muatan, setMuatan] = useState(false);

  const navigate = useNavigate();

  const configuration = new Configuration({
    apiKey: "",
  });
  const openai = new OpenAIApi(configuration);

  const cariIde = async (e) => {
    e.preventDefault();
    setMuatan(true);
    const tulisanAi = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: ide,
      temperature: 0.5,
      max_tokens: 1000,
    });

    const gambarAi = await openai.createImage({
      prompt: ide,
      n: 1,
      size: "512x512",
    });
    const image_url = gambarAi.data.data[0].url;

    setHasilIdeGambar(image_url);
    setHasilIde(tulisanAi.data.choices[0].text);
    setMuatan(false);
  };

  const loadImage = (e) => {
    const gambar = e.target.files[0];
    setGambar(gambar);
    setPreview(URL.createObjectURL(gambar));
  };

  const tambahPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("kategori", kategori);
    formData.append("isi", isi);
    formData.append("gambar", gambar);

    try {
      await axios.post("http://localhost:5000/posts", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="container">
        <Link to="/posts" className="btn">
          Kembali
        </Link>

        <form onSubmit={cariIde} className="my-10 p-8 shadow rounded">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Butuh ide? Beri pernyataan!</span>
            </label>
            <input
              placeholder="Buat cerita fiksi tentang nelayan yang pemalas"
              className="w-full input input-bordered"
              value={ide}
              onChange={(e) => setIde(e.target.value)}
            />
          </div>

          <button type="submit" className="btn my-4">
            Kirim pernyataan
          </button>

          <label className="label label-text">Hasil:</label>

          {muatan ? (
            <p className="my-4">Sedang memuat...</p>
          ) : (
            <>
              <section className="hero p-0 h-fit input input-bordered">
                <div className="hero-content p-0 max-w-full flex-col lg:flex-row gap-10">
                  <img
                    className="w-full rounded-lg shadow-2xl"
                    src={hasilIdeGambar}
                    alt=""
                  />
                  <div className="p-6">
                    <p>{hasilIde}</p>
                  </div>
                </div>
              </section>
            </>
          )}
        </form>

        <form onSubmit={tambahPost}>
          <h1 className="font-bold text-3xl">Form Post</h1>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Judul</span>
            </label>
            <input
              type="text"
              placeholder="Judul post"
              className="w-full input input-bordered"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Kategori</span>
            </label>
            <input
              type="text"
              placeholder="Nama kategori"
              className="w-full input input-bordered"
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Isi</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="Isi post"
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
            ></textarea>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Pilih gambar</span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              onChange={loadImage}
            />
          </div>

          {preview ? (
            <div className="mockup-window border border-base-300 mt-4 w-full max-w-xs">
              <figure className="flex justify-center border-t border-base-300">
                <img src={preview} alt="Gambar preview" />
              </figure>
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="btn my-4">
            Simpan
          </button>
        </form>
      </div>
    </>
  );
};

export default TambahPost;
