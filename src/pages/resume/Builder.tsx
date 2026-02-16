import { useState, useEffect } from 'react'
import ResumeNav from '../../components/ResumeNav'
import ResumePreview from '../../components/ResumePreview'
import ATSScore from '../../components/ATSScore'
import { resumeStore } from '../../store/resumeStore'
import { calculateATSScore } from '../../utils/atsScoring'
import { ResumeData, Education, Experience, Project } from '../../types/resume'
import './Builder.css'

function Builder() {
  const [resumeData, setResumeData] = useState<ResumeData>(resumeStore.getData())
  const atsScore = calculateATSScore(resumeData)

  useEffect(() => {
    resumeStore.saveData(resumeData)
  }, [resumeData])

  const handlePersonalInfoChange = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    })
  }

  const handleSummaryChange = (value: string) => {
    setResumeData({ ...resumeData, summary: value })
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: ''
    }
    setResumeData({ ...resumeData, education: [...resumeData.education, newEducation] })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    })
  }

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    })
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      description: ''
    }
    setResumeData({ ...resumeData, experience: [...resumeData.experience, newExperience] })
  }

  const updateExperience = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    })
  }

  const removeExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    })
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: ''
    }
    setResumeData({ ...resumeData, projects: [...resumeData.projects, newProject] })
  }

  const updateProject = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    })
  }

  const removeProject = (id: string) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    })
  }

  const loadSample = () => {
    const sample = resumeStore.loadSampleData()
    setResumeData(sample)
  }

  return (
    <div className="builder-page">
      <ResumeNav />
      
      <div className="builder-container">
        <div className="builder-form">
          <div className="form-header">
            <h2>Resume Builder</h2>
            <button className="sample-btn" onClick={loadSample}>
              Load Sample Data
            </button>
          </div>

          <section className="form-section">
            <h3>Personal Information</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={resumeData.personalInfo.name}
              onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={resumeData.personalInfo.email}
              onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={resumeData.personalInfo.phone}
              onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={resumeData.personalInfo.location}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
            />
          </section>

          <section className="form-section">
            <h3>Professional Summary</h3>
            <textarea
              placeholder="Brief summary of your professional background..."
              value={resumeData.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              rows={4}
            />
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Education</h3>
              <button className="add-btn" onClick={addEducation}>+ Add</button>
            </div>
            {resumeData.education.map((edu) => (
              <div key={edu.id} className="entry-card">
                <button className="remove-btn" onClick={() => removeEducation(edu.id)}>×</button>
                <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={edu.field}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                />
                <div className="date-row">
                  <input
                    type="text"
                    placeholder="Start Year"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="End Year"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Experience</h3>
              <button className="add-btn" onClick={addExperience}>+ Add</button>
            </div>
            {resumeData.experience.map((exp) => (
              <div key={exp.id} className="entry-card">
                <button className="remove-btn" onClick={() => removeExperience(exp.id)}>×</button>
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={exp.position}
                  onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                />
                <div className="date-row">
                  <input
                    type="text"
                    placeholder="Start Year"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="End Year"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  />
                </div>
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  rows={3}
                />
              </div>
            ))}
          </section>

          <section className="form-section">
            <div className="section-header">
              <h3>Projects</h3>
              <button className="add-btn" onClick={addProject}>+ Add</button>
            </div>
            {resumeData.projects.map((proj) => (
              <div key={proj.id} className="entry-card">
                <button className="remove-btn" onClick={() => removeProject(proj.id)}>×</button>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  rows={2}
                />
                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                />
              </div>
            ))}
          </section>

          <section className="form-section">
            <h3>Skills</h3>
            <input
              type="text"
              placeholder="Comma-separated skills (e.g., JavaScript, React, Node.js)"
              value={resumeData.skills}
              onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
            />
          </section>

          <section className="form-section">
            <h3>Links</h3>
            <input
              type="text"
              placeholder="GitHub URL"
              value={resumeData.github}
              onChange={(e) => setResumeData({ ...resumeData, github: e.target.value })}
            />
            <input
              type="text"
              placeholder="LinkedIn URL"
              value={resumeData.linkedin}
              onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })}
            />
          </section>
        </div>

        <div className="builder-preview">
          <ATSScore score={atsScore} />
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  )
}

export default Builder
