import React from "react";
import { Link } from "react-router-dom";
import logo from '../../public/NR.png'

const Hero = () => {
  return (
    <section className="hero h-fit bg-base-200">
      <div className="container p-2 md:p-6 lg:p-10">
        <div className="hero-content max-w-full flex-col lg:flex-row gap-x-24 gap-y-24">
          <img
            src={logo}
            className="max-w-[300px] rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Tentang <i>NRCMS</i></h1>
            <p className="py-6">
                NR CMS adalah sistem manajemen konten yang mudah digunakan yang dibuat untuk pengembangan web modern. Dengan alat canggih ini, Anda akan dapat mengelola situs web Anda dengan mudah dan fleksibel. Dibangun di atas Node Framework dan React JS, NR CMS menawarkan waktu kinerja secepat kilat dengan navigasi intuitif yang menghilangkan pekerjaan menebak-nebak dari pengembangan web. Anda akan memiliki akses ke banyak fitur termasuk editor yang disederhanakan untuk membuat konten dinamis, tema yang dapat disesuaikan, dan integrasi sempurna dengan layanan pihak ketiga yang populer.
            </p>
            <Link to="/tambah-post" className="btn btn-primary">
              Buat Tulisan
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
