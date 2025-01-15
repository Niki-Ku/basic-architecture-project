export const links = [
  { name: 'home', path: '/' },
  { name: 'search', path: '/search' },
  { name: 'user', path: '/user' },
];

export const unauthorizedLinks = [
  { name: 'home', path: '/' },
  { name: 'search', path: '/search' },
  { name: 'login', path: '/login' },
  { name: 'register', path: '/sign-up'}
];

export const footerLinks = [
  {
    name: 'phone',
    path: 'tel:+3809309433',
  },
  {
    name: 'email',
    path: 'mailto:niki.kuzk013@gmail.com',
  },
  // {
  //   name: 'aboutUs',
  //   path: '/',
  // },
  // {
  //   name: 'contact',
  //   path: '/',
  // },
  // {
  //   name: 'support',
  //   path: '/',
  // },
  {
    name: 'faq',
    path: '/faq',
  },
  {
    name: 'privacy',
    path: '/privacy',
  },
  {
    name: 'systemStatus',
    path: 'https://nclone.instatus.com/'
  }
];

export const sidebarDropdownLinks = [
  {
    title: 'contactingUs',
    id: 'contacting-us',
  },
  {
    title: 'sectionA',
    id: 'section-a',
    subLinks: [
      {
        title: "theCategoriesOfPersonalInformationWeCollect",
        id: "the-categories-of-personal-information-we-collect",
      },
      {
        title: "whereWeCollectPersonalInformationFrom",
        id: "where-we-collect-personal-information-from",
      },
      {
        title: "howWeUseYourPersonalInformation",
        id: "how-we-use-your-personal-information",
      },
    ]
  },
  {
    title: 'sectionB',
    id: 'section-b',
    subLinks: [
      {
        title: "yourPrivacyRights",
        id: "your-privacy-rights",
      },
      {
        title: "communicationAndMarketingPreferences",
        id: "communication-and-marketing-preferences",
      },
      {
        title: "advertisingChoices",
        id: "advertising-choices",
      },
    ]
  },
]