import { ResumeTemplate } from '../types'
import './TemplateSelector.css'

interface TemplateSelectorProps {
  selected: ResumeTemplate
  onChange: (template: ResumeTemplate) => void
}

function TemplateSelector({ selected, onChange }: TemplateSelectorProps) {
  const templates: ResumeTemplate[] = ['classic', 'modern', 'minimal']

  return (
    <div className="template-selector">
      <label className="template-label">Template</label>
      <div className="template-tabs">
        {templates.map(template => (
          <button
            key={template}
            className={`template-tab ${selected === template ? 'active' : ''}`}
            onClick={() => onChange(template)}
          >
            {template.charAt(0).toUpperCase() + template.slice(1)}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TemplateSelector
