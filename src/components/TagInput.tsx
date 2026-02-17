import { useState, KeyboardEvent } from 'react'
import './TagInput.css'

interface TagInputProps {
  tags: string[]
  onTagsChange: (tags: string[]) => void
  placeholder?: string
}

function TagInput({ tags, onTagsChange, placeholder = 'Type and press Enter' }: TagInputProps) {
  const [inputValue, setInputValue] = useState('')

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault()
      if (!tags.includes(inputValue.trim())) {
        onTagsChange([...tags, inputValue.trim()])
      }
      setInputValue('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="tag-input-container">
      <div className="tags-list">
        {tags.map((tag, index) => (
          <span key={index} className="tag-chip">
            {tag}
            <button
              type="button"
              className="tag-remove"
              onClick={() => removeTag(tag)}
              aria-label={`Remove ${tag}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="tag-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={tags.length === 0 ? placeholder : ''}
      />
    </div>
  )
}

export default TagInput
