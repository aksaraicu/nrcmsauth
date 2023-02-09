import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PostSingle = () => {
  const params = useParams();
  const id = params?.id;
  const navigate = useNavigate();

  const [post, setPost] = useState({});

  const getPostById = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts/${id}`);
      setPost(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getPostById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <article className="container">
        <button className="btn btn-primary my-2" onClick={() => navigate(-1)}>Kembali</button>

        <div className="content grid place-items-center">
          <div className="entry-content max-w-[800px] grid place-items-center">
            <h1 className="text-3xl font-bold text-center my-5">
              {post.judul}
            </h1>

            <div className="badge badge-secondary text-xl p-4 mb-5 ">
              {post.kategori}
            </div>

            <img src={post.url} alt={post.judul} className="w-full" />

            <p className="my-10">{post.isi}</p>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostSingle;
