import React from "react";
import { Link } from "react-router-dom";

const Cta = () => {
  return (
    <section className="container">
      <div className="hero h-fit py-10 bg-base-200 mb-10 rounded">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold"><i>Yuk</i>, Kolaborasi!</h1>
            <p className="py-6">
              Kontak saya sekarang untuk melakukan kolaborasi, saya memiliki beberapa keahlian dalam berbagai bidang; IT, marketing, multimedia hingga growth!
            </p>
            <Link to="/kontak" className="btn btn-primary">Kontak</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
