import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Output.css";

const Output = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    // Retrieve the data from localStorage
    const storedData = localStorage.getItem("studentInfo");

    if (storedData) {
      // Parse the data if it exists and update state
      const parsedData = JSON.parse(storedData);
      setData(parsedData);

      // Log the data to the console
      console.log("Stored Data:", parsedData);
    } else {
      console.log("No data found in localStorage.");
    }
  }, []);

  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <div className="resume">
      <button className="back-button" onClick={()=>navigate("/")}>
        Back
      </button>

      <div className="header">
        {data.image && (
          <img src={data.image} alt="Profile" className="profile-pic" />
        )}
        <h1>{data.name}</h1>
        <p>{data.email}</p>
        <p>{data.dob}</p>
      </div>

      <div className="section">
        <h2>Education</h2>
        <p>{data.education}</p>
      </div>

      <div className="section">
        <h2>Experience</h2>
        <p>{data.experience} years</p>
      </div>

      <div className="section">
        <h2>Skills</h2>
        <p>{data.skills}</p>
      </div>

      <div className="section">
        <h2>Hobbies</h2>
        <p>{data.hobbies}</p>
      </div>

      <div className="section">
        <h2>Projects</h2>
        {data.projects &&
          data.projects.map((project, index) => (
            <div key={index}>
              <p>{project.name}</p>
              <p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.link}
                </a>
              </p>
            </div>
          ))}
      </div>

      <div className="section">
        <h2>Links</h2>
        <p>
          GitHub:{" "}
          <a href={data.githubId} target="_blank" rel="noopener noreferrer">
            {data.githubId}
          </a>
        </p>
        <p>
          LinkedIn:{" "}
          <a href={data.linkedinId} target="_blank" rel="noopener noreferrer">
            {data.linkedinId}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Output;
