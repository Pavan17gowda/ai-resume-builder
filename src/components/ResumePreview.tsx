import { ResumeData } from '../types/resume'
import './ResumePreview.css'

interface ResumePreviewProps {
  data: ResumeData
}

function ResumePreview({ data }: ResumePreviewProps) {
  const hasContent = data.personalInfo.name || 
                     data.summary || 
                     data.experience.length > 0 || 
                     data.projects.length > 0 || 
                     data.education.length > 0 || 
                     data.skills

  return (
    <div className="resume-preview">
      <div className="resume-paper">
        {/* Personal Info */}
        <div className="resume-header">
          <h1 className="resume-name">{data.personalInfo.name || 'Your Name'}</h1>
          {(data.personalInfo.email || data.personalInfo.phone || data.personalInfo.location) && (
            <div className="resume-contact">
              {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
              {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
              {data.personalInfo.location && <span>{data.personalInfo.location}</span>}
            </div>
          )}
          {(data.github || data.linkedin) && (
            <div className="resume-links">
              {data.github && <span>{data.github}</span>}
              {data.linkedin && <span>{data.linkedin}</span>}
            </div>
          )}
        </div>

        {/* Summary */}
        {data.summary && (
          <div className="resume-section">
            <h2 className="resume-section-title">Summary</h2>
            <p className="resume-summary">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && data.experience.some(exp => exp.company || exp.position) && (
          <div className="resume-section">
            <h2 className="resume-section-title">Experience</h2>
            {data.experience.map((exp) => (
              (exp.company || exp.position) && (
                <div key={exp.id} className="resume-entry">
                  <div className="entry-header">
                    <div>
                      <h3 className="entry-title">{exp.position || 'Position'}</h3>
                      <p className="entry-subtitle">{exp.company || 'Company'}</p>
                    </div>
                    {(exp.startDate || exp.endDate) && (
                      <p className="entry-date">
                        {exp.startDate || 'Start'} - {exp.endDate || 'End'}
                      </p>
                    )}
                  </div>
                  {exp.description && <p className="entry-description">{exp.description}</p>}
                </div>
              )
            ))}
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && data.projects.some(proj => proj.name) && (
          <div className="resume-section">
            <h2 className="resume-section-title">Projects</h2>
            {data.projects.map((proj) => (
              proj.name && (
                <div key={proj.id} className="resume-entry">
                  <h3 className="entry-title">{proj.name}</h3>
                  {proj.description && <p className="entry-description">{proj.description}</p>}
                  {proj.technologies && (
                    <p className="entry-tech">Technologies: {proj.technologies}</p>
                  )}
                </div>
              )
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && data.education.some(edu => edu.school || edu.degree) && (
          <div className="resume-section">
            <h2 className="resume-section-title">Education</h2>
            {data.education.map((edu) => (
              (edu.school || edu.degree) && (
                <div key={edu.id} className="resume-entry">
                  <div className="entry-header">
                    <div>
                      <h3 className="entry-title">{edu.school || 'School'}</h3>
                      <p className="entry-subtitle">
                        {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                      </p>
                    </div>
                    {(edu.startDate || edu.endDate) && (
                      <p className="entry-date">
                        {edu.startDate || 'Start'} - {edu.endDate || 'End'}
                      </p>
                    )}
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills && (
          <div className="resume-section">
            <h2 className="resume-section-title">Skills</h2>
            <p className="resume-skills">{data.skills}</p>
          </div>
        )}

        {/* Links */}
        {(data.github || data.linkedin) && !data.personalInfo.name && (
          <div className="resume-section">
            <h2 className="resume-section-title">Links</h2>
            <div className="resume-links-section">
              {data.github && <p>GitHub: {data.github}</p>}
              {data.linkedin && <p>LinkedIn: {data.linkedin}</p>}
            </div>
          </div>
        )}

        {!hasContent && (
          <div className="resume-empty-state">
            <p>Start filling out the form to see your resume preview.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ResumePreview
