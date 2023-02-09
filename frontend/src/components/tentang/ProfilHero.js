import React from 'react'
import { Link } from "react-router-dom";

const ProfilHero = () => {
  return (
    <section className="hero h-fit bg-base-200">
      <div className="container p-2 md:p-6 lg:p-10">
        <div className="hero-content max-w-full flex-col lg:flex-row gap-x-24 gap-y-24">
          <img
            src="https://media.licdn.com/dms/image/D5603AQHIXKgqZb7Nuw/profile-displayphoto-shrink_800_800/0/1673030371470?e=1680134400&v=beta&t=b-SqXeNem01MTMWcVc6S2eByCy87fWb6aAjBpizcAVE"
            className="max-w-[300px] rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Tentang Pencipta</h1>
            <p className="py-6">
                Author is an active freelancer at Arasa Corporation and Head of Digital at Muara. Even before his college years, he had always been eager to learn all things related to the development of intelligence using the science of computers. He always believes in that in the future, himself complimented with a thriving passion, proper intelligence, and computer science can make the world a better place for all mankind.
            </p>
            <Link to="/kontak" className="btn btn-primary">
              Kontak
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProfilHero