import { useState, useEffect } from 'react'
import ResumeNav from '../../components/ResumeNav'
import ResumePreview from '../../components/ResumePreview'
import ATSScore from '../../components/ATSScore'
import TemplatePicker from '../../components/TemplatePicker'
import ColorPicker from '../../components/ColorPicker'
import ImprovementPanel from '../../components/ImprovementPanel'
import SkillsSection from '../../components/SkillsSection'
import ProjectsSection from '../../components/ProjectsSection'
import { resumeStore } from '../../store/resumeStore'
import { templateStore } from '../../store/templateStore'
import { calculateATSScore } from '../../utils/atsScoring'
import { getTopImprovements } from '../../utils/improvementGuidance'
import { getBulletSuggestions } from '../../utils/bulletGuidance'
import { ResumeData, Education, Experience, SkillCategories } from '../../types/resume'
import { ResumeTemplate, ColorTheme } from '../../types'
import './Builder.css'

function Builder() {
  const [resumeData, setResumeData] = useState<ResumeData>(resumeStore.getData())
  const [template, setTemplate] = useState<ResumeTemplate>(templateStore.getTemplate())
  const [colorTheme, setColorTheme] = useState<ColorTheme>(templateStore.getColorTheme())
  const atsScore = calculateATSScore(resumeData)
  const improvements = getTopImprovements(resumeData)

  useEffect(() => {
    resumeStore.saveData(resumeData)
  }, [resumeData])

  const handleTemplateChange = (newTemplate: ResumeTemplate) => {
    setTemplate(newTemplate)
    templateStore.saveTemplate(newTemplate)
  }

  const handleColorChange = (newColor: ColorTheme) => {
    setColorTheme(newColor)
    templateStore.saveColorTheme(newColor)
  }

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
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: ''
    }
    setResumeData({ ...resumeData, projects: [...resumeData.projects, newProject] })
  }

  const updateProject = (id: string, field: string, value: any) => {
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

          <TemplatePicker selected={template} onChange={handleTemplateChange} />
          <ColorPicker selected={colorTheme} onChange={handleColorChange} />

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
                {exp.description && getBulletSuggestions(exp.description).length > 0 && (
                  <div className="bullet-guidance">
                    {getBulletSuggestions(exp.description).map((suggestion, idx) => (
                      <span key={idx} className="guidance-hint">{suggestion}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </section>

          <section className="form-section">
            <ProjectsSection 
              projects={resumeData.projects}
              onProjectsChange={(projects) => setResumeData({ ...resumeData, projects })}
            />
          </section>

          <section className="form-section">
            <SkillsSection
              skills={resumeData.skillCategories}
              onSkillsChange={(skillCategories) => setResumeData({ ...resumeData, skillCategories })}
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
          <TemplatePicker selected={template} onChange={handleTemplateChange} />
          <ColorPicker selected={colorTheme} onChange={handleColorChange} />
          <ATSScore score={atsScore} />
          <ImprovementPanel improvements={improvements} />
          <ResumePreview data={resumeData} template={template} colorTheme={colorTheme} />
        </div>
      </div>
    </div>
  )
}

export default Builder
