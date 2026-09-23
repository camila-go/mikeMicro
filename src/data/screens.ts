/* The Figma section holds ~25 frames, but several of those are states of one
   screen rather than separate destinations: Join has an empty and a filled
   frame, "What can we help with?" has empty / selected / keyboard-open /
   filled. Those collapse into component state here, so the route list is
   shorter than the frame count.

   Section node ids in Figma:
     58:8318  Sign In        (9 frames)
     58:8319  Profile Setup  (6 frames)
     58:8320  App Experience (8 frames)
     58:8323  subcomponents  (buttons, logo, colours) */
export type Section = 'Onboarding' | 'Goals' | 'App'

export type Screen = {
  path: string
  name: string
  section: Section
  /* Frames in Figma that this route covers, for traceability back to design. */
  frames: string[]
  /* Figma node id, set once the frame has been identified in the file. */
  nodeId?: string
}

export const screens: Screen[] = [
  {
    path: '/splash',
    name: 'Splash',
    section: 'Onboarding',
    frames: ['Sign In/0'],
    nodeId: '29:1149',
  },
  {
    path: '/sign-in',
    name: 'Sign in',
    section: 'Onboarding',
    frames: ['Sign In/1'],
    nodeId: '3:2010',
  },
  {
    path: '/join',
    name: 'Join Mike',
    section: 'Onboarding',
    frames: ['Join Mike (empty)', 'Join Mike (filled)'],
  },
  {
    path: '/import',
    name: 'Import profile',
    section: 'Onboarding',
    frames: ['LinkedIn profile'],
    nodeId: '3:3213',
  },
  {
    path: '/importing',
    name: 'Importing',
    section: 'Onboarding',
    frames: ['Importing your profile'],
  },
  {
    path: '/profile-review',
    name: 'Profile review',
    section: 'Onboarding',
    frames: ['Does this look okay?'],
  },
  {
    path: '/resume',
    name: 'Digitize resume',
    section: 'Onboarding',
    frames: ['Digitize your resume with AI (empty)', '(filled)'],
  },
  {
    path: '/goals',
    name: 'What can we help with?',
    section: 'Goals',
    frames: ['empty', 'selected', 'keyboard', 'filled'],
  },
  {
    path: '/goals/timeline',
    name: 'Time commitment',
    section: 'Goals',
    frames: ['empty', 'selected'],
  },
  {
    path: '/on-your-way',
    name: 'On your way',
    section: 'Goals',
    frames: ["Your on your way!"],
  },
  {
    path: '/learning-path',
    name: 'Learning path',
    section: 'App',
    frames: ['This micro certificate was made for you'],
  },
  {
    path: '/learning-path/courses',
    name: 'Course list',
    section: 'App',
    frames: ['Course list modal'],
  },
  { path: '/home', name: 'Home feed', section: 'App', frames: ['Feed'] },
  {
    path: '/home/progress',
    name: 'Progress',
    section: 'App',
    frames: ['Hi David'],
  },
  {
    path: '/profile',
    name: 'Profile',
    section: 'App',
    frames: ['Profile', 'Badges earned'],
  },
  {
    path: '/network',
    name: 'Network',
    section: 'App',
    frames: ['Manage my network'],
  },
]
