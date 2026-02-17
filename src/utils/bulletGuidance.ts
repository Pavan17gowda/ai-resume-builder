const ACTION_VERBS = [
  'built', 'developed', 'designed', 'implemented', 'led', 'improved',
  'created', 'optimized', 'automated', 'managed', 'launched', 'delivered',
  'established', 'architected', 'engineered', 'coordinated', 'executed',
  'achieved', 'increased', 'reduced', 'streamlined', 'spearheaded',
  'initiated', 'drove', 'facilitated', 'collaborated', 'analyzed'
]

export const hasActionVerb = (bullet: string): boolean => {
  const firstWord = bullet.trim().split(/\s+/)[0]?.toLowerCase()
  return ACTION_VERBS.includes(firstWord)
}

export const hasNumbers = (text: string): boolean => {
  return /\d+[%kKmM]?|\d+\.\d+/.test(text)
}

export const getBulletSuggestions = (bullet: string): string[] => {
  const suggestions: string[] = []
  
  if (!bullet.trim()) return suggestions
  
  if (!hasActionVerb(bullet)) {
    suggestions.push('Start with a strong action verb.')
  }
  
  if (!hasNumbers(bullet)) {
    suggestions.push('Add measurable impact (numbers).')
  }
  
  return suggestions
}
