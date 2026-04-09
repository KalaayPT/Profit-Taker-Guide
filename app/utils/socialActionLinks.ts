export type SocialActionLink = {
  icon: string
  to: string
  target: '_blank'
  rel: 'noopener noreferrer'
  'aria-label': string
}

const discordUrl = 'https://discord.profit-taker.com'
const kofiUrl = 'https://www.ko-fi.com/kalaay'

export function getSocialActionLinks(githubUrl?: string): SocialActionLink[] {
  return [
    {
      icon: 'i-simple-icons-discord',
      to: discordUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': 'Discord',
    },
    ...(githubUrl
      ? [{
          icon: 'i-simple-icons-github',
          to: githubUrl,
          target: '_blank' as const,
          rel: 'noopener noreferrer' as const,
          'aria-label': 'GitHub',
        }]
      : []),
    {
      icon: 'i-simple-icons-kofi',
      to: kofiUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
      'aria-label': 'Support the site on Ko-fi',
    },
  ]
}
