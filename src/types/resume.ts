export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface SkillCategories {
  technical: string[]
  soft: string[]
  tools: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: string
  skillCategories: SkillCategories
  github: string
  linkedin: string
}
