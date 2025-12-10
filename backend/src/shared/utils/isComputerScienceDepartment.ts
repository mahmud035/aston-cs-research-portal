export function isComputerScienceDepartment(name: string): boolean {
  const lower = name.toLowerCase();

  // Strong CS indicators
  if (lower.includes('computer science')) return true;
  if (lower.includes('software engineering')) return true;
  if (lower.includes('cybersecurity')) return true;
  if (lower.includes('cyber security')) return true;
  if (lower.includes('artificial intelligence')) return true;
  if (lower.includes('applied ai')) return true;
  if (lower.includes('ai & robotics') || lower.includes('ai and robotics'))
    return true;
  if (lower.includes('data science')) return true;
  if (lower.includes('computer science research group')) return true;

  // Very generic / non-CS indicators
  if (lower.includes('business school')) return false;
  if (lower.includes('college of business')) return false;
  if (lower.includes('forensic linguistics')) return false;
  if (lower.includes('engineering for sustainable development')) return false;
  if (lower === 'aston university') return false;
  if (lower.includes('college of engineering and physical sciences'))
    return false;
  if (lower.includes('aston business school')) return false;

  // Default: be conservative → non-CS
  return false;
}
