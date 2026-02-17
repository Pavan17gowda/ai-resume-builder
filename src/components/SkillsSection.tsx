import { useState } from 'react'
import TagInput from './TagInput'
import { SkillCategories } from '../types/resume'
import './SkillsSection.css'

interface SkillsSectionProps {
  skills: SkillCategories
  onSkillsChange: (skills: SkillCategories) => void
}

function SkillsSection({ skills, onSkillsChange }: SkillsSectionProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleCategoryChange = (category: keyof SkillCategories, tags: string[]) => {
    onSkillsChange({
      ...skills,
      [category]: tags
    })
  }

  const handleSuggestSkills = () => {
    setIsLoading(true)
    setTimeout(() => {
      const suggestedSkills: SkillCategories = {
        technical: [...new Set([...skills.technical, 'TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'])],
        soft: [...new Set([...skills.soft, 'Team Leadership', 'Problem Solving'])],
        tools: [...new Set([...skills.tools, 'Git', 'Docker', 'AWS'])]
      }
      onSkillsChange(suggestedSkills)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="skills-section">
      <div className="skills-header">
        <h3>Skills</h3>
        <button 
          className="suggest-btn" 
          onClick={handleSuggestSkills}
          disabled={isLoading}
        >
          {isLoading ? '⏳ Loading...' : '✨ Suggest Skills'}
        </button>
      </div>

      <div className="skill-category">
        <label className="category-label">
          Technical Skills ({skills.technical.length})
        </label>
        <TagInput
          tags={skills.technical}
          onTagsChange={(tags) => handleCategoryChange('technical', tags)}
          placeholder="e.g., JavaScript, Python, React"
        />
      </div>

      <div className="skill-category">
        <label className="category-label">
          Soft Skills ({skills.soft.length})
        </label>
        <TagInput
          tags={skills.soft}
          onTagsChange={(tags) => handleCategoryChange('soft', tags)}
          placeholder="e.g., Leadership, Communication"
        />
      </div>

      <div className="skill-category">
        <label className="category-label">
          Tools & Technologies ({skills.tools.length})
        </label>
        <TagInput
          tags={skills.tools}
          onTagsChange={(tags) => handleCategoryChange('tools', tags)}
          placeholder="e.g., Git, Docker, VS Code"
        />
      </div>
    </div>
  )
}

export default SkillsSection
