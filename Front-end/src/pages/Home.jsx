import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import Footer from "./Footer"
import GetStarted from "../components/GetStarted"
import PublicSkills from "./PublicSkills";
const Home = () => {
  return <>
    <div className="bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 md:px-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to SkillSwap
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Connect. Learn. Grow. A peer-to-peer skill exchange platform.
          </motion.p>
          <Link
            to="/login"
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-200"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* How People Use Section */}
      <section className="bg-blue-800 text-white py-16 px-6 md:px-20">
        <motion.h3
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          How People Use SkillSwap
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-4xl font-bold mb-2">
              <CountUp end={12000} duration={2} separator="," />+
            </h4>
            <p className="text-lg">Registered Users</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-4xl font-bold mb-2">
              <CountUp end={8000} duration={2} separator="," />+
            </h4>
            <p className="text-lg">Skill Swaps Completed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h4 className="text-4xl font-bold mb-2">
              <CountUp end={2022} duration={1} />–
            </h4>
            <p className="text-lg">Empowering Knowledge Sharing</p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-20">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-4">About SkillSwap</h3>
          <p className="text-lg text-gray-700">
            SkillSwap is a platform that allows users to connect and exchange skills with one another. Whether you're a beginner looking to learn or an expert wanting to teach, SkillSwap bridges the gap.
          </p>
        </motion.div>
      </section>

      {/* Blog Section */}
      <section className="bg-white py-16 px-6 md:px-20">
        <motion.h3
          className="text-3xl font-bold text-center mb-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          From Our Blog
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="bg-gray-100 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-2">Top 5 Skills to Learn in 2025</h4>
            <p className="text-gray-700">Discover the most in-demand skills that can boost your career this year.</p>
          </motion.div>

          <motion.div
            className="bg-gray-100 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-2">How to Offer Skills Effectively</h4>
            <p className="text-gray-700">Learn how to teach and share your skills with others in an engaging way.</p>
          </motion.div>

          <motion.div
            className="bg-gray-100 p-6 rounded-xl shadow-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-semibold mb-2">Building Your Personal Brand</h4>
            <p className="text-gray-700">Why showcasing your knowledge and profile helps you grow faster.</p>
          </motion.div>
        </div>
      </section>
    </div>
       <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold text-center mb-4">Welcome to SkillSwap 🚀</h1>
      <p className="text-center text-gray-600 mb-6">
        Explore skill notes uploaded by peers across colleges
      </p>

      {/* Show public skills */}
      <PublicSkills />
    </div>
    <GetStarted />
    <Footer/>
    </>;
};

export default Home;
