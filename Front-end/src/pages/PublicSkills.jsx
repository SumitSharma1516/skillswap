// src/components/PublicSkills.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/api";  // Your axios instance

const PublicSkills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get("/skills/all");
        // console.log("API response data:", res.data);
        setSkills(res.data.skills || []);
      } catch (error) {
        console.error("Error fetching public skills", error);
      }
    };
    fetchSkills();
  }, []);

  if (skills.length === 0) {
    return <p className="mt-6 text-center text-gray-500">No skills found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
      {skills.map((skill) => (
        <div key={skill._id} className="p-4 border rounded-xl shadow-md bg-white">
          <h3 className="text-lg font-semibold">{skill.title}</h3>
          <p className="text-sm text-gray-600">{skill.description}</p>
          <div className="mt-2">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full mr-2">
              {skill.college}
            </span>
            <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full mr-2">
              {skill.course}
            </span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
              Sem {skill.semester}
            </span>
          </div>
          <div className="mt-3">
            <a
              href={skill.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
            >
              View Skill File
            </a>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Uploaded by: {skill.uploadedBy?.username || "Unknown"}
          </p>
        </div>
      ))}
    </div>
  );
};

export default PublicSkills;
