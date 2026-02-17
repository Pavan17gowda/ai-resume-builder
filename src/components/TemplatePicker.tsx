import { ResumeTemplate } from '../types'
import './TemplatePicker.css'

interface TemplatePickerProps {
  selected: ResumeTemplate
  onChange: (template: ResumeTemplate) => void
}

const templates: { id: ResumeTemplate; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Traditional single-column' },
  { id: 'modern', name: 'Modern', description: 'Two-column with sidebar' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and spacious' }
]

function TemplatePicker({ selected, onChange }: TemplatePickerProps) {
  return (
    <div className="template-picker">
      <h4 className="picker-title">Choose Template</h4>
      <div className="template-thumbnails">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`template-thumbnail ${selected === template.id ? 'active' : ''}`}
            onClick={() => onChange(template.id)}
          >
            <div className="thumbnail-preview">
              {template.id === 'classic' && (
                <div className="preview-classic">
                  <div className="preview-header"></div>
                  <div className="preview-line"></div>
                  <div className="preview-section"></div>
                  <div className="preview-line"></div>
                  <div className="preview-section"></div>
                </div>
              )}
              {template.id === 'modern' && (
                <div className="preview-modern">
                  <div className="preview-sidebar"></div>
                  <div className="preview-main">
                    <div className="preview-header-small"></div>
                    <div className="preview-section-small"></div>
                    <div className="preview-section-small"></div>
                  </div>
                </div>
              )}
              {template.id === 'minimal' && (
                <div className="preview-minimal">
                  <div className="preview-header-minimal"></div>
                  <div className="preview-section-minimal"></div>
                  <div className="preview-section-minimal"></div>
                  <div className="preview-section-minimal"></div>
                </div>
              )}
            </div>
            {selected === template.id && (
              <div className="checkmark">✓</div>
            )}
            <div className="template-info">
              <div className="template-name">{template.name}</div>
              <div className="template-desc">{template.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TemplatePicker
