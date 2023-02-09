import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const PostArchive = () => {
  const [posts, setPosts] = useState([]);
  const [halaman, setHalaman] = useState(0);
  const [limit] = useState(4);
  const [totalHalaman, setTotalHalaman] = useState(0);
  const [totalBaris, setTotalBaris] = useState(0);
  const [kataKunci, setKataKunci] = useState("");
  const [query, setQuery] = useState("");

  const getPosts = async () => {
    const response = await axios.get(
      `http://localhost:5000/posts?cari=${kataKunci}&halaman=${halaman}&limit=${limit}`
    );

    setPosts(response.data.hasil);
    setHalaman(response.data.halaman);
    setTotalHalaman(response.data.totalHalaman);
    setTotalBaris(response.data.totalBaris);
  };

  const gantiHalaman = ({ selected }) => {
    setHalaman(selected);
  };

  const cariData = (e) => {
    e.preventDefault();
    setHalaman(0);
    setKataKunci(query);
  };

  useEffect(() => {
    getPosts();
  }, [halaman, kataKunci]);

  return (
    <>
      <div className="container">
        <form className="my-3" onSubmit={cariData}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari judul/kategori"
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-[#570DF8] font-medium rounded-lg text-sm px-4 py-2"
            >
              Cari
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <div className="card w-full bg-base-100 shadow-xl" key={post.id}>
              <figure>
                <img src={post.url} alt={post.judul} />
              </figure>
              <div className="card-body">
                <div className="card-actions mb-2">
                  <div className="badge badge-secondary">{post.kategori}</div>
                </div>
                <h2 className="card-title">{post.judul}</h2>
                <p>{post.isi.substr(0,180)}...</p>
                <Link to={`/blog/${post.id}`} className="btn btn-primary my-2">Selanjutnya</Link>
              </div>
            </div>
          ))}
        </div>

        <nav key={totalBaris} className="my-8">
          <ReactPaginate
            previousLabel={"«"}
            nextLabel={"»"}
            pageCount={totalHalaman}
            onPageChange={gantiHalaman}
            containerClassName={"btn-group flex items-center justify-center"}
            pageLinkClassName={""}
            activeClassName={"btn-active"}
            pageClassName={"btn"}
            disabledLinkClassName={"btn-disabled"}
            previousClassName={"btn"}
            nextClassName={"btn"}
          />
        </nav>

      </div>
    </>
  );
};

export default PostArchive;
