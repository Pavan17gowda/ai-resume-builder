# AI Resume Builder - Quick Reference Card

## 🚀 Development Server

```bash
npm run dev
```

**URL:** http://localhost:5173

---

## 📍 Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page with CTA |
| `/builder` | Main resume builder (form + live preview) |
| `/preview` | Preview page with export options |
| `/proof` | Proof/artifacts page |

---

## 🎯 ATS Scoring Rules (Max 100)

| Rule | Points | Check |
|------|--------|-------|
| Name | +10 | `personalInfo.name` exists |
| Email | +10 | `personalInfo.email` exists |
| Summary | +10 | `summary.length > 50` |
| Experience | +15 | `experience.length > 0` with description |
| Education | +10 | `education.length > 0` |
| Skills | +10 | Total skills ≥ 5 |
| Projects | +10 | `projects.length > 0` |
| Phone | +5 | `personalInfo.phone` exists |
| LinkedIn | +5 | `linkedin` exists |
| GitHub | +5 | `github` exists |
| Action Verbs | +10 | Summary contains action verbs |

**Score Levels:**
- 0-40: 🔴 Red "Needs Work"
- 41-70: 🟡 Amber "Getting There"
- 71-100: 🟢 Green "Strong Resume"

---

## 💾 localStorage Keys

```javascript
// Resume data
localStorage.getItem('resumeBuilderData')

// Template choice
localStorage.getItem('resumeTemplate')

// Color theme
localStorage.getItem('resumeColorTheme')
```

---

## 🎨 Templates

1. **Classic** - Traditional single-column, serif headings
2. **Modern** - Two-column with colored sidebar
3. **Minimal** - Clean single-column, sans-serif

---

## 🎨 Color Themes

1. **Teal** - hsl(168, 60%, 40%) - Default
2. **Navy** - hsl(220, 60%, 35%)
3. **Burgundy** - hsl(345, 60%, 35%)
4. **Forest** - hsl(150, 50%, 30%)
5. **Charcoal** - hsl(0, 0%, 25%)

---

## 📤 Export Options

1. **Print / Save as PDF** - Opens browser print dialog
2. **Download PDF** - Shows toast notification
3. **Copy Resume as Text** - Copies plain text to clipboard

---

## 🧪 Quick Test Commands

### View Resume Data:
```javascript
JSON.parse(localStorage.getItem('resumeBuilderData'))
```

### Clear All Data:
```javascript
localStorage.clear()
location.reload()
```

### Check Score:
- Visible in circular progress on /builder and /preview

---

## 📋 Data Structure

```typescript
interface ResumeData {
  personalInfo: {
    name: string
    email: string
    phone: string
    location: string
  }
  summary: string
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: string
  skillCategories: {
    technical: string[]
    soft: string[]
    tools: string[]
  }
  github: string
  linkedin: string
}
```

---

## 🔍 Key Files

### Core Logic:
- `src/utils/atsScoreCalculator.ts` - Scoring algorithm
- `src/store/resumeStore.ts` - Data persistence
- `src/store/templateStore.ts` - Template/color storage

### Components:
- `src/components/ATSScoreCircle.tsx` - Score display
- `src/components/SkillsSection.tsx` - Skills with tags
- `src/components/ProjectsSection.tsx` - Projects accordion
- `src/components/ExportButtons.tsx` - Export functionality

### Pages:
- `src/pages/resume/Builder.tsx` - Main builder
- `src/pages/resume/Preview.tsx` - Preview + export
- `src/pages/resume/Home.tsx` - Landing page

### Styles:
- `src/styles/print.css` - Print/PDF styling
- `src/components/ATSScoreCircle.css` - Score circle

---

## ✅ Feature Checklist

- ✅ Personal info form
- ✅ Professional summary
- ✅ Education (add/edit/remove)
- ✅ Experience (add/edit/remove)
- ✅ Projects with accordion
- ✅ Skills with 3 categories
- ✅ Links (GitHub, LinkedIn)
- ✅ Template picker (3 templates)
- ✅ Color picker (5 colors)
- ✅ ATS score calculator
- ✅ Circular progress indicator
- ✅ Live score updates
- ✅ Improvement suggestions
- ✅ Export to PDF
- ✅ Copy as text
- ✅ localStorage persistence
- ✅ Auto-save on change
- ✅ Live preview
- ✅ Mobile responsive

---

## 🐛 Debugging

### Check Console:
```
F12 → Console tab
```

### Check localStorage:
```
F12 → Application → Local Storage → http://localhost:5173
```

### Check Network:
```
F12 → Network tab
```

### Mobile View:
```
F12 → Toggle device toolbar (Ctrl+Shift+M)
```

---

## 📊 Test Scenarios

### Scenario 1: Empty Resume
- Score: 0
- Color: Red
- Label: "Needs Work"

### Scenario 2: Basic Info Only
- Name + Email = 20 points
- Color: Red
- Label: "Needs Work"

### Scenario 3: Partial Resume
- Name, Email, Summary, Experience, Education = 65 points
- Color: Amber
- Label: "Getting There"

### Scenario 4: Complete Resume
- All fields filled = 100 points
- Color: Green
- Label: "Strong Resume"

---

## 🎯 Action Verbs

built, led, designed, improved, created, developed, managed, implemented, launched, achieved, increased, reduced, optimized, established, coordinated, delivered

---

## 📱 Responsive Breakpoints

- Mobile: < 768px (single column)
- Tablet: 768px - 1024px (adjusted layout)
- Desktop: > 1024px (two-column layout)

---

## 🎨 Design System

**KodNest Premium:**
- Background: #F7F6F3 (off-white)
- Font: Georgia (serif)
- Accent: #8B0000 (deep red)
- Spacing: 8/16/24/40/64px scale

---

## 🚀 Build Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📚 Documentation

- `COMPREHENSIVE_TEST_CHECKLIST.md` - 10-point test guide
- `TESTING_GUIDE.md` - Detailed testing instructions
- `ATS_SCORING_IMPLEMENTATION_SUMMARY.md` - Implementation details
- `QUICK_REFERENCE.md` - This file

---

## ✅ Ready to Test!

**Start here:** http://localhost:5173/builder

**Follow:** TESTING_GUIDE.md for step-by-step instructions

**Verify:** All 10 tests in COMPREHENSIVE_TEST_CHECKLIST.md
