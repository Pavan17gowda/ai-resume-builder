import { useState, useEffect } from 'react'
import ResumeNav from '../../components/ResumeNav'
import ResumePreview from '../../components/ResumePreview'
import { resumeStore } from '../../store/resumeStore'
import { ResumeData } from '../../types/resume'
import './Preview.css'

function Preview() {
  const [resumeData, setResumeData] = useState<ResumeData>(resumeStore.getData())

  useEffect(() => {
    setResumeData(resumeStore.getData())
  }, [])

  return (
    <div className="preview-page">
      <ResumeNav />
      
      <div className="preview-container">
        <div className="preview-content">
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  )
}

export default Preview
