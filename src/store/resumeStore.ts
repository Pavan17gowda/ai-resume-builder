import { ResumeData } from '../types/resume'

const STORAGE_KEY = 'resumeBuilderData'

const initialData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: ''
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: '',
  github: '',
  linkedin: ''
}

const sampleData: ResumeData = {
  personalInfo: {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  },
  summary: 'Experienced software engineer with 5+ years building scalable web applications. Passionate about clean code and user experience.',
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015',
      endDate: '2019'
    }
  ],
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      startDate: '2021',
      endDate: 'Present',
      description: 'Led development of microservices architecture serving 1M+ users. Improved system performance by 40%.'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Software Engineer',
      startDate: '2019',
      endDate: '2021',
      description: 'Built full-stack features using React and Node.js. Collaborated with design team on UI/UX improvements.'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with payment integration and real-time inventory management.',
      technologies: 'React, Node.js, PostgreSQL, Stripe'
    }
  ],
  skills: 'JavaScript, TypeScript, React, Node.js, Python, PostgreSQL, AWS, Docker',
  github: 'github.com/johndoe',
  linkedin: 'linkedin.com/in/johndoe'
}

export const resumeStore = {
  getData(): ResumeData {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : initialData
  },

  saveData(data: ResumeData): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  },

  loadSampleData(): ResumeData {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData))
    return sampleData
  },

  clearData(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData))
  }
}
