import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Front.css";

function Front() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([{ name: "", link: "" }]);

  const [studentInfo, setStudentInfo] = useState({
    image: "",
    name: "",
    dob: "",
    email: "",
    education: "",
    experience: "",
    hobbies: "",
    skills: "",
    githubId: "",
    linkedinId: "",
  });

  useEffect(() => {
    // Load data from localStorage if it exists
    const storedData = localStorage.getItem("studentInfo");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setStudentInfo({
        image: parsedData.image || "",
        name: parsedData.name || "",
        dob: parsedData.dob || "",
        email: parsedData.email || "",
        education: parsedData.education || "",
        experience: parsedData.experience || "",
        hobbies: parsedData.hobbies || "",
        skills: parsedData.skills || "",
        githubId: parsedData.githubId || "",
        linkedinId: parsedData.linkedinId || "",
      });
      setProjects(parsedData.projects || [{ name: "", link: "" }]);
    }
  }, []);

  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  const addProject = () => {
    setProjects([...projects, { name: "", link: "" }]);
  };

  const deleteProject = (index) => {
    const updatedProjects = projects.filter((_, i) => i !== index);
    setProjects(updatedProjects);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentInfo((prevInfo) => ({
          ...prevInfo,
          image: reader.result, // Store the Base64 string
        }));
      };
      reader.readAsDataURL(file); // Convert file to Base64
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setStudentInfo((prevInfo) => ({
      ...prevInfo,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Combine studentInfo with projects
    const dataToStore = { ...studentInfo, projects };
    // Store the data in localStorage
    localStorage.setItem("studentInfo", JSON.stringify(dataToStore));
    // Navigate to another page if needed
    navigate("/output");
  };

  return (
    <div className="resume-form">
      <h2>Student Resume Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Image */}
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            required
            onChange={handleFileChange} // Add this line
          />
        </div>

        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            value={studentInfo.name} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {/* Date of Birth */}
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
            value={studentInfo.dob} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            value={studentInfo.email} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {/* Education */}
        <div className="form-group">
          <label htmlFor="education">Education: </label>
          <select
            id="education"
            name="education"
            required
            value={studentInfo.education} // Add this line
            onChange={handleInputChange} // Add this line
          >
            <option value="">Select your education level</option>
            <option value="high-school">High School</option>
            <option value="associate">Associate Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">Ph.D.</option>
          </select>
        </div>

        {/* Experience */}
        <div className="form-group">
          <label htmlFor="experience">Experience:</label>
          <input
            type="number"
            min="0"
            max="5"
            id="experience"
            name="experience"
            placeholder="Enter your experience"
            required
            value={studentInfo.experience} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {/* Hobbies */}
        <div className="form-group">
          <label htmlFor="hobbies">Hobbies:</label>
          <input
            type="text"
            id="hobbies"
            name="hobbies"
            placeholder="Enter your hobbies"
            required
            value={studentInfo.hobbies} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {/* Skills */}
        <div className="form-group">
          <label htmlFor="skills">Skills:</label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="Enter your skills"
            required
            value={studentInfo.skills} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {/* GitHub ID */}
        <div className="form-group">
          <label htmlFor="githubId">GitHub ID:</label>
          <input
            type="text"
            id="githubId"
            name="githubId"
            placeholder="Enter your GitHub ID"
            required
            value={studentInfo.githubId} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {/* LinkedIn ID */}
        <div className="form-group">
          <label htmlFor="linkedinId">LinkedIn ID:</label>
          <input
            type="text"
            id="linkedinId"
            name="linkedinId"
            placeholder="Enter your LinkedIn ID"
            required
            value={studentInfo.linkedinId} // Add this line
            onChange={handleInputChange} // Add this line
          />
        </div>

        {projects.map((project, index) => (
          <div className="project-group" key={index}>
            <div className="form-group">
              <label htmlFor={`project-name-${index}`}>Project Name:</label>
              <input
                type="text"
                id={`project-name-${index}`}
                value={project.name}
                onChange={(e) =>
                  handleProjectChange(index, "name", e.target.value)
                }
                placeholder="Enter project name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor={`project-link-${index}`}>Project Link:</label>
              <input
                type="url"
                id={`project-link-${index}`}
                value={project.link}
                onChange={(e) =>
                  handleProjectChange(index, "link", e.target.value)
                }
                placeholder="Enter project link"
                required
              />
            </div>
            <div className="button-group">
              {projects.length > 1 && (
                <button type="button" onClick={() => deleteProject(index)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
        <button className="addmore" type="button" onClick={addProject}>
          Add More
        </button>
        <br />
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Front;
