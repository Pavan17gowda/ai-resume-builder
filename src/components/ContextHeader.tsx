import './ContextHeader.css'

interface ContextHeaderProps {
  step: number
}

const stepTitles = [
  'Problem Definition',
  'Market Research',
  'Architecture Design',
  'High-Level Design',
  'Low-Level Design',
  'Build Implementation',
  'Testing & QA',
  'Ship & Deploy'
]

const stepDescriptions = [
  'Define the problem your AI Resume Builder will solve',
  'Research the market and identify your target users',
  'Design the overall system architecture',
  'Create high-level design documents',
  'Detail the low-level implementation design',
  'Build your application in Lovable',
  'Test your application thoroughly',
  'Deploy and ship your final product'
]

function ContextHeader({ step }: ContextHeaderProps) {
  return (
    <div className="context-header">
      <h1>{stepTitles[step - 1]}</h1>
      <p>{stepDescriptions[step - 1]}</p>
    </div>
  )
}

export default ContextHeader
