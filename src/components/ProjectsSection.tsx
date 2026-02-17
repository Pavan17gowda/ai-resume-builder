import { useState } from 'react'
import TagInput from './TagInput'
import { Project } from '../types/resume'
import './ProjectsSection.css'

interface ProjectsSectionProps {
  projects: Project[]
  onProjectsChange: (projects: Project[]) => void
}

function ProjectsSection({ projects, onProjectsChange }: ProjectsSectionProps) {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set())

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: ''
    }
    onProjectsChange([...projects, newProject])
    setExpandedProjects(new Set([...expandedProjects, newProject.id]))
  }

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onProjectsChange(
      projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    )
  }

  const removeProject = (id: string) => {
    onProjectsChange(projects.filter(proj => proj.id !== id))
    const newExpanded = new Set(expandedProjects)
    newExpanded.delete(id)
    setExpandedProjects(newExpanded)
  }

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedProjects)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedProjects(newExpanded)
  }

  return (
    <div className="projects-section">
      <div className="section-header">
        <h3>Projects</h3>
        <button className="add-btn" onClick={addProject}>+ Add Project</button>
      </div>

      {projects.map((project) => (
        <div key={project.id} className="project-accordion">
          <div 
            className="project-header" 
            onClick={() => toggleExpanded(project.id)}
          >
            <span className="project-title-display">
              {project.name || 'Untitled Project'}
            </span>
            <div className="project-header-actions">
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  removeProject(project.id)
                }}
              >
                ×
              </button>
              <span className="expand-icon">
                {expandedProjects.has(project.id) ? '▼' : '▶'}
              </span>
            </div>
          </div>

          {expandedProjects.has(project.id) && (
            <div className="project-content">
              <input
                type="text"
                placeholder="Project Title"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
              />

              <div className="textarea-wrapper">
                <textarea
                  placeholder="Project Description (max 200 characters)"
                  value={project.description}
                  onChange={(e) => {
                    if (e.target.value.length <= 200) {
                      updateProject(project.id, 'description', e.target.value)
                    }
                  }}
                  rows={3}
                  maxLength={200}
                />
                <div className="char-counter">
                  {project.description.length}/200
                </div>
              </div>

              <div className="field-group">
                <label>Tech Stack</label>
                <TagInput
                  tags={project.technologies}
                  onTagsChange={(tags) => updateProject(project.id, 'technologies', tags)}
                  placeholder="e.g., React, Node.js, MongoDB"
                />
              </div>

              <input
                type="url"
                placeholder="Live URL (optional)"
                value={project.liveUrl || ''}
                onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
              />

              <input
                type="url"
                placeholder="GitHub URL (optional)"
                value={project.githubUrl || ''}
                onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default ProjectsSection
