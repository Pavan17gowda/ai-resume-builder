import { useState, useEffect } from 'react'
import ResumeNav from '../../components/ResumeNav'
import ResumePreview from '../../components/ResumePreview'
import TemplatePicker from '../../components/TemplatePicker'
import ColorPicker from '../../components/ColorPicker'
import ExportButtons from '../../components/ExportButtons'
import { resumeStore } from '../../store/resumeStore'
import { templateStore } from '../../store/templateStore'
import { ResumeData } from '../../types/resume'
import { ResumeTemplate, ColorTheme } from '../../types'
import './Preview.css'

function Preview() {
  const [resumeData, setResumeData] = useState<ResumeData>(resumeStore.getData())
  const [template, setTemplate] = useState<ResumeTemplate>(templateStore.getTemplate())
  const [colorTheme, setColorTheme] = useState<ColorTheme>(templateStore.getColorTheme())
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    setResumeData(resumeStore.getData())
  }, [])

  const handleTemplateChange = (newTemplate: ResumeTemplate) => {
    setTemplate(newTemplate)
    templateStore.saveTemplate(newTemplate)
  }

  const handleColorChange = (newColor: ColorTheme) => {
    setColorTheme(newColor)
    templateStore.saveColorTheme(newColor)
  }

  const handleDownloadPDF = () => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }

  return (
    <div className="preview-page">
      <ResumeNav />
      
      <div className="preview-container">
        <div className="preview-controls">
          <TemplatePicker selected={template} onChange={handleTemplateChange} />
          <ColorPicker selected={colorTheme} onChange={handleColorChange} />
          <ExportButtons data={resumeData} onDownloadPDF={handleDownloadPDF} />
        </div>
        <div className="preview-content">
          <ResumePreview data={resumeData} template={template} colorTheme={colorTheme} />
        </div>
      </div>

      {showToast && (
        <div className="toast-notification">
          PDF export ready! Check your downloads.
        </div>
      )}
    </div>
  )
}

export default Preview
