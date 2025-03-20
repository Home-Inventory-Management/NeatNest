import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { motion } from "framer-motion";
import Blob from "../../assets/blob.svg";
import HeroImage from "../../assets/Hero.png";

const fadeInUp = (delay) => ({
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, duration: 0.5, delay }
  }
});

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-green-100 to-green-800 text-white overflow-hidden">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 items-center min-h-screen px-6 lg:px-16 relative">
        
        <div className="text-center md:text-left space-y-8 relative z-10">
          <motion.h1
            variants={fadeInUp(0.3)}
            initial="initial"
            animate="animate"
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            Effortless Organization, <br />
            <span className="text-yellow-300">Zero Waste, Stress-Free Living 😎</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp(0.5)}
            initial="initial"
            animate="animate"
            className="text-lg md:text-xl opacity-80"
          >
            Smart home inventory management designed to make life simpler and more efficient.
          </motion.p>
          <motion.div
            variants={fadeInUp(0.7)}
            initial="initial"
            animate="animate"
            className="flex justify-center md:justify-start"
          >
            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 font-semibold rounded-full flex items-center gap-2 transition-all duration-300">
              Get Started
              <IoIosArrowRoundForward className="text-2xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
            </button>
          </motion.div>
        </div>

        <div className=" flex justify-center">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            src={Blob}
            alt="Background Blob"
            className="absolute -bottom-12 w-380 h-380 opacity-60 -z-10"
          />

          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={HeroImage}
            alt="Hero"
            className="w-[350px] md:w-[500px] lg:w-[600px] drop-shadow-lg relative z-10"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
