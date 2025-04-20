import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from './assets/logo.png';

function App() {
  const [studentData, setStudentData] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    education: '',
    skills: '',
    projects: [{ name: '', url: '' }],
    experience: '',
    github: '',
    linkedin: '',
    image: null,
  });

  const resumeRef = useRef(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('studentData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setStudentData(parsedData);
    }
  }, []);

  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem('studentData', JSON.stringify(studentData));
  }, [studentData]);

  // Handle input change for simple fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle education change (dropdown)
  const handleEducationChange = (e) => {
    setStudentData((prev) => ({
      ...prev,
      education: e.target.value,
    }));
  };

  // Handle project change
  const handleProjectChange = (index, field, value) => {
    const newProjects = [...studentData.projects];
    newProjects[index][field] = value;
    setStudentData((prev) => ({
      ...prev,
      projects: newProjects,
    }));
  };

  // Add new project
  const addProject = () => {
    setStudentData((prev) => ({
      ...prev,
      projects: [...prev.projects, { name: '', url: '' }],
    }));
  };

  // Remove project
  const removeProject = (index) => {
    const newProjects = studentData.projects.filter((_, i) => i !== index);
    setStudentData((prev) => ({
      ...prev,
      projects: newProjects,
    }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudentData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Download resume as PDF
  const downloadResume = () => {
    const input = resumeRef.current;
    if (!input) return;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${studentData.name || 'resume'}.pdf`);
    });
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h2>Student Information</h2>
        <form>
          <label>
            Profile Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-upload"
            />
            {studentData.image ? (
              <img
                src={studentData.image}
                alt="Profile"
                className="image-preview"
              />
            ) : (
              <img src={logo} alt="Default Logo" className="image-preview" />
            )}
          </label>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </label>
          <label>
            Date of Birth:
            <input
              type="date"
              name="dob"
              value={studentData.dob}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={studentData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={studentData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />
          </label>
          <label>
            Education:
            <select
              name="education"
              value={studentData.education}
              onChange={handleEducationChange}
            >
              <option value="">Select your education</option>
              <option value="High School">High School</option>
              <option value="Associate Degree">Associate Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="PhD">PhD</option>
            </select>
          </label>
          <label>
            Skills:
            <textarea
              name="skills"
              value={studentData.skills}
              onChange={handleChange}
              placeholder="Enter your skills"
            />
          </label>
          <label>
            Projects:
            {studentData.projects.map((project, index) => (
              <div key={index} className="project-group">
                <input
                  type="text"
                  placeholder="Project name"
                  value={project.name}
                  onChange={(e) =>
                    handleProjectChange(index, 'name', e.target.value)
                  }
                />
                <input
                  type="url"
                  placeholder="Project URL"
                  value={project.url}
                  onChange={(e) =>
                    handleProjectChange(index, 'url', e.target.value)
                  }
                />
                {studentData.projects.length > 1 && (
                  <button
                    type="button"
                    className="remove-project"
                    onClick={() => removeProject(index)}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="add-project-button"
              onClick={addProject}
            >
              Add Project
            </button>
          </label>
          <label>
            Experience (years):
            <input
              type="number"
              name="experience"
              min="0"
              value={studentData.experience}
              onChange={handleChange}
              placeholder="Enter your experience in years"
            />
          </label>
          <label>
            GitHub ID:
            <input
              type="text"
              name="github"
              value={studentData.github}
              onChange={handleChange}
              placeholder="Enter your GitHub username"
            />
          </label>
          <label>
            LinkedIn ID:
            <input
              type="text"
              name="linkedin"
              value={studentData.linkedin}
              onChange={handleChange}
              placeholder="Enter your LinkedIn username"
            />
          </label>
        </form>
        <button onClick={downloadResume} className="download-button">
          Download Resume as PDF
        </button>
      </div>
      <div className="resume-container">
        <h2>Live Resume Preview</h2>
        <div className="resume-content" ref={resumeRef}>
          <img
            src={studentData.image || logo}
            alt="Profile"
            className="image-preview"
          />
          <h3>{studentData.name || 'Your Name'}</h3>
          <p>Date of Birth: {studentData.dob || 'Your DOB here'}</p>
          <p>Email: {studentData.email || 'your.email@example.com'}</p>
          <p>Phone: {studentData.phone || '123-456-7890'}</p>
          <h4>Education</h4>
          <p>{studentData.education || 'Your education details here'}</p>
          <h4>Skills</h4>
          <p>{studentData.skills || 'Your skills here'}</p>
          <h4>Projects</h4>
          <ul className="projects-list">
            {studentData.projects.map((project, index) => (
              <li key={index}>
                {project.name}{' '}
                {project.url && (
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.url}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <h4>Experience</h4>
          <p>{studentData.experience ? `${studentData.experience} years` : 'Your experience here'}</p>
          <h4>Social Links</h4>
          <div className="social-links">
            {studentData.github && (
              <a
                href={`https://github.com/${studentData.github}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://github.com/${studentData.github}`}
              </a>
            )}
            {studentData.linkedin && (
              <a
                href={`https://linkedin.com/in/${studentData.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {`https://linkedin.com/in/${studentData.linkedin}`}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
