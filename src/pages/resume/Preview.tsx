import { useState, useEffect } from 'react'
import ResumeNav from '../../components/ResumeNav'
import ResumePreview from '../../components/ResumePreview'
import TemplateSelector from '../../components/TemplateSelector'
import { resumeStore } from '../../store/resumeStore'
import { templateStore } from '../../store/templateStore'
import { ResumeData } from '../../types/resume'
import { ResumeTemplate } from '../../types'
import './Preview.css'

function Preview() {
  const [resumeData, setResumeData] = useState<ResumeData>(resumeStore.getData())
  const [template, setTemplate] = useState<ResumeTemplate>(templateStore.getTemplate())

  useEffect(() => {
    setResumeData(resumeStore.getData())
  }, [])

  const handleTemplateChange = (newTemplate: ResumeTemplate) => {
    setTemplate(newTemplate)
    templateStore.saveTemplate(newTemplate)
  }

  return (
    <div className="preview-page">
      <ResumeNav />
      
      <div className="preview-container">
        <div className="preview-controls">
          <TemplateSelector selected={template} onChange={handleTemplateChange} />
        </div>
        <div className="preview-content">
          <ResumePreview data={resumeData} template={template} />
        </div>
      </div>
    </div>
  )
}

export default Preview
