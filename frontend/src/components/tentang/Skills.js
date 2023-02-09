import React from "react";

const Skills = () => {
  return (
    <section className="container py-10">
        <h2 className="text-3xl font-bold pb-10 text-center">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center px-10">
            <h2 className="card-title">Rina Ciputra</h2>
            <p>Partnership dan wawancara eksklusif bersama Ibu Rina Ciputra; Founder Ciputra Group.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center px-10">
            <h2 className="card-title">KEMENDIKBUD RI</h2>
            <p>Partnership dan wawancara eksklusif bersama Dr. Harry Widianto; KEMENDIKBUD RI.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center px-10">
            <h2 className="card-title">Radio Sonora</h2>
            <p>Memberikan konten edukatif mengenai barang seni Asia pada Radio Sonora secara live.</p>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body items-center px-10">
            <h2 className="card-title">Eksibisi</h2>
            <p>Melakukan dan memimpin beberapa eksibisi nasional dan internasional</p>
          </div>
        </div>


      </div>
    </section>
  );
};

export default Skills;
