import React from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const Logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`shadow ${
        location === "/" || location === "/tentang" || location === "/kontak"
          ? ""
          : "mb-10"
      } ${location === "/login" || location === "/register" ? "hidden" : ""}`}
    >
      <div className="container">
        <div className="navbar bg-base-100 p-0">
          <div className="navbar-start">
            <Link
              to="/"
              className="btn btn-ghost normal-case text-xl italic text-primary"
            >
              NR
            </Link>
          </div>
          <div className="navbar-center hidden md:block lg:block">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link
                  to="/tentang"
                  className={`${
                    location === "/tentang" ? "font-semibold" : ""
                  }`}
                >
                  Tentang
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className={`${location === `/blog` ? "font-semibold" : ""}`}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/kontak"
                  className={`${location === "/kontak" ? "font-semibold" : ""}`}
                >
                  Kontak
                </Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <Link
              to="/posts"
              className={`${
                location === "/posts"
                  ? "btn btn-primary btn-circle"
                  : "btn btn-ghost btn-circle"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </Link>
            <button className="btn text-white capitalize ml-4" onClick={Logout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="btm-nav z-10 md:hidden lg:hidden">
        <Link
          to="/"
          className={`${
            location === "/"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>
        <Link
          to="/tentang"
          className={`${
            location === "/tentang"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
            />
          </svg>
        </Link>
        <Link
          to="/blog"
          className={`${
            location === "/blog"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
        </Link>
        <Link
          to="/kontak"
          className={`${
            location === "/kontak"
              ? "text-primary active"
              : "text-primary border-t-2 border-gray-300"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
