import { useState } from 'react'
import { ResumeData } from '../types/resume'
import { generatePlainText, copyToClipboard, validateResumeForExport } from '../utils/exportUtils'
import './ExportButtons.css'

interface ExportButtonsProps {
  data: ResumeData
  onDownloadPDF?: () => void
}

function ExportButtons({ data, onDownloadPDF }: ExportButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [showWarning, setShowWarning] = useState(false)

  const handlePrint = () => {
    const validation = validateResumeForExport(data)
    if (!validation.isValid) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
    }
    window.print()
  }

  const handleDownloadPDF = () => {
    const validation = validateResumeForExport(data)
    if (!validation.isValid) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
    }
    if (onDownloadPDF) {
      onDownloadPDF()
    }
  }

  const handleCopyText = async () => {
    const validation = validateResumeForExport(data)
    if (!validation.isValid) {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
    }

    const plainText = generatePlainText(data)
    const success = await copyToClipboard(plainText)
    
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="export-buttons">
      <button className="export-btn print-btn" onClick={handlePrint}>
        Print / Save as PDF
      </button>
      {onDownloadPDF && (
        <button className="export-btn download-btn" onClick={handleDownloadPDF}>
          Download PDF
        </button>
      )}
      <button className="export-btn copy-btn" onClick={handleCopyText}>
        {copied ? '✓ Copied!' : 'Copy Resume as Text'}
      </button>
      {showWarning && (
        <div className="export-warning">
          Your resume may look incomplete.
        </div>
      )}
    </div>
  )
}

export default ExportButtons
