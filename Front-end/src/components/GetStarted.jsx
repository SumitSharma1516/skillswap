import React, { useState } from 'react';

const GetStarted = () => {
  const [showSteps, setShowSteps] = useState(false);

  const steps = [
    {
      title: "Register an Account",
      desc: "Create your free account to start exchanging skills with others."
    },
    {
      title: "Create Your Profile",
      desc: "Tell us what skills you want to teach and what skills you want to learn."
    },
    {
      title: "Find Matches & Start Swapping",
      desc: "Browse matched users and connect with them to exchange your skills."
    },
    {
      title: "Schedule Your Sessions",
      desc: "Set up convenient times to teach or learn skills with your matches."
    },
    {
      title: "Exchange Feedback",
      desc: "Provide and receive ratings to build a trusted community."
    },
    {
      title: "Keep Learning & Growing",
      desc: "Discover new skills and keep expanding your knowledge over time."
    },
  ];

  return (
    <section className="bg-white py-16 px-6 md:px-20 text-center max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">Your SkillSwap Journey</h2>
      <p className="text-gray-600 mb-10 max-w-3xl mx-auto">
        Join our community to learn new skills and share your own expertise with others. It's easy to start!
      </p>

      <button 
        onClick={() => setShowSteps(!showSteps)} 
        className="mb-10 px-8 py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg hover:bg-yellow-300 transition"
      >
        {showSteps ? "Hide Details" : "Learn More"}
      </button>

      {showSteps && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-lg shadow-lg text-white
                ${index % 2 === 0 ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-gradient-to-r from-purple-600 to-blue-600"}
              `}
            >
              <h3 className="text-2xl font-semibold mb-4">{index + 1}. {step.title}</h3>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default GetStarted;
