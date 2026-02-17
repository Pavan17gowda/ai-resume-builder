import { ColorTheme, COLOR_THEMES } from '../types'
import './ColorPicker.css'

interface ColorPickerProps {
  selected: ColorTheme
  onChange: (color: ColorTheme) => void
}

const colorOptions: { id: ColorTheme; name: string }[] = [
  { id: 'teal', name: 'Teal' },
  { id: 'navy', name: 'Navy' },
  { id: 'burgundy', name: 'Burgundy' },
  { id: 'forest', name: 'Forest' },
  { id: 'charcoal', name: 'Charcoal' }
]

function ColorPicker({ selected, onChange }: ColorPickerProps) {
  return (
    <div className="color-picker">
      <h4 className="picker-title">Color Theme</h4>
      <div className="color-circles">
        {colorOptions.map((color) => (
          <div
            key={color.id}
            className={`color-circle ${selected === color.id ? 'active' : ''}`}
            style={{ backgroundColor: COLOR_THEMES[color.id] }}
            onClick={() => onChange(color.id)}
            title={color.name}
          >
            {selected === color.id && (
              <div className="color-checkmark">✓</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ColorPicker
