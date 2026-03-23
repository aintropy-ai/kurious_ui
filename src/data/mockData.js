export const MOCK_QA = [
  {
    id: 'q1',
    question: 'Which NJ townships have the most employees with terminal leave benefits?',
    answer: 'Bergen County leads with 12,400 employees on terminal leave, representing 31.4% of eligible staff — significantly above the state average of 18.2%. Essex County follows at 9,200 (29.5%), and Hudson County at 8,100 (27.1%).',
    deeperAnswer: 'Bergen County leads with 12,400 employees on terminal leave, representing 31.4% of eligible staff — significantly above the state average of 18.2%. Essex County follows at 9,200 (29.5%), and Hudson County at 8,100 (27.1%). This pattern correlates strongly with union density: Bergen, Essex, and Hudson all have unionization rates above 62%, compared to a statewide average of 41%. Historical data shows this gap has widened 18% over the past decade, driven by an aging workforce and legacy benefit structures negotiated in the 1990s.',
    time: '0.18s',
    deeperTime: '3.2s',
    modalities: { documents: 3, data: 1 },
    modalityText: 'documents & data tables',
    sources: {
      primary: [
        { icon: '📄', name: 'NJ Civil Service Commission Report 2024', usedFor: 'county headcount data' },
        { icon: '📊', name: 'NJ Benefits Registry · Table 3', usedFor: 'terminal leave figures' },
      ],
      supporting: [
        { icon: '📄', name: 'State HR Policy Manual v6', usedFor: 'eligibility criteria' },
      ],
      additional: [
        { icon: '📄', name: 'Department of Human Services Annual Summary', usedFor: 'cross-reference validation' },
      ],
    },
    suggestions: [
      'How does Bergen compare to the state average?',
      'What benefits do terminal leave employees receive?',
    ],
  },
  {
    id: 'q2',
    question: 'How does Bergen compare to the state average?',
    answer: 'Bergen County is 74% above the NJ state average of 7,100 terminal leave employees. This gap has widened 12% over the past 3 years, driven by an aging workforce and stronger union representation in the county.',
    deeperAnswer: 'Bergen County is 74% above the NJ state average of 7,100 terminal leave employees. This gap has widened 12% over the past 3 years. Key drivers include: Bergen\'s median employee age of 51.3 years (vs 47.1 statewide), a unionization rate of 68% (vs 41% statewide), and benefit packages negotiated prior to 2005 that included uncapped terminal leave accrual. Three municipalities — Hackensack, Fort Lee, and Paramus — account for 34% of Bergen\'s total terminal leave liability.',
    time: '0.21s',
    deeperTime: '4.1s',
    modalities: { documents: 2, data: 2 },
    modalityText: 'documents & data tables',
    sources: {
      primary: [
        { icon: '📊', name: 'NJ Benefits Registry · Historical Data', usedFor: 'year-over-year comparison' },
        { icon: '📄', name: 'NJ Labor Statistics Report 2024', usedFor: 'state average figures' },
      ],
      supporting: [
        { icon: '📊', name: 'County Workforce Demographics Survey', usedFor: 'workforce age distribution' },
      ],
      additional: [],
    },
    suggestions: [
      'Which county is closest to the state average?',
      'What drove Bergen\'s growth over the last 5 years?',
    ],
  },
  {
    id: 'q3',
    question: 'How many migrant students are enrolled per school district?',
    answer: 'Newark Public Schools has the highest migrant student enrollment at 4,280 students (8.3% of total enrollment), followed by Paterson at 3,190 (9.1%) and Trenton at 2,840 (7.8%). Northern NJ districts show consistently higher enrollment rates.',
    deeperAnswer: 'Newark Public Schools leads with 4,280 migrant students (8.3%), followed by Paterson 3,190 (9.1%), Trenton 2,840 (7.8%), New Brunswick 2,100 (11.2%), and Elizabeth 1,980 (6.4%). New Brunswick has the highest percentage despite not being the largest district, primarily due to its proximity to agricultural employment corridors in Middlesex County. Year-over-year, total migrant enrollment across NJ grew 7.2% from 2023 to 2024, with the largest increases in Passaic and Union counties.',
    time: '0.22s',
    deeperTime: '5.6s',
    modalities: { documents: 2, data: 1, images: 1 },
    modalityText: 'documents, data & images',
    sources: {
      primary: [
        { icon: '📄', name: 'NJ DOE Enrollment Report 2024', usedFor: 'district enrollment figures' },
        { icon: '📊', name: 'Migrant Education Data Registry', usedFor: 'migrant student counts' },
      ],
      supporting: [
        { icon: '🖼️', name: 'District Enrollment Map · 2024', usedFor: 'geographic distribution' },
      ],
      additional: [],
    },
    suggestions: [
      'Which districts had the highest migrant enrollment growth in 2024?',
      'What support programs exist for migrant students in NJ?',
    ],
  },
  {
    id: 'q4',
    question: 'What are the top 10 industries by registered businesses in NJ?',
    answer: 'Professional Services leads with 127,400 registered businesses (18.2%), followed by Retail Trade at 89,200 (12.7%), and Healthcare at 76,100 (10.9%). The top 10 industries account for 78% of all registered businesses in New Jersey.',
    deeperAnswer: 'Professional Services leads with 127,400 businesses (18.2%), followed by Retail Trade 89,200 (12.7%), Healthcare 76,100 (10.9%), Construction 68,400 (9.8%), Food Services 54,200 (7.7%), Finance & Insurance 48,900 (7.0%), Real Estate 41,300 (5.9%), Transportation 36,800 (5.3%), Education 29,400 (4.2%), and Manufacturing 26,700 (3.8%). Notable trend: Technology-adjacent businesses (software, IT services) within Professional Services grew 23% YoY — the fastest-growing subsector in 2024.',
    time: '0.19s',
    deeperTime: '4.8s',
    modalities: { documents: 2, data: 2 },
    modalityText: 'documents & data tables',
    sources: {
      primary: [
        { icon: '📊', name: 'NJ Business Registry 2024', usedFor: 'industry classification data' },
        { icon: '📄', name: 'Department of Treasury Annual Report', usedFor: 'registration statistics' },
      ],
      supporting: [
        { icon: '📊', name: 'Economic Development Dashboard', usedFor: 'industry growth trends' },
      ],
      additional: [
        { icon: '📄', name: 'NJ Commerce Report Q4 2024', usedFor: 'sector comparison context' },
      ],
    },
    suggestions: [
      'Which industry saw the fastest growth in 2024?',
      'How does NJ compare to neighboring states by industry?',
    ],
  },
  {
    id: 'q5',
    question: 'How does impervious surface area compare across land use types?',
    answer: 'Commercial zones have the highest impervious surface coverage at 78.4%, followed by Industrial at 71.2% and High-Density Residential at 52.6%. Agricultural land has the lowest at 4.1%, while open space and parks average 8.3%.',
    deeperAnswer: 'Commercial zones lead at 78.4% impervious coverage, followed by Industrial 71.2%, High-Density Residential 52.6%, Transportation corridors 89.1% (highest of all), Mixed-Use 61.3%, Low-Density Residential 38.7%, Institutional 44.2%, Agricultural 4.1%, and Open Space/Parks 8.3%. Impervious surface coverage has increased 6.8% statewide since 2015, with the largest increases in Bergen, Middlesex, and Union counties. EPA stormwater compliance thresholds are exceeded in 34 of 121 NJ municipalities.',
    time: '0.24s',
    deeperTime: '6.1s',
    modalities: { documents: 1, data: 1, images: 2 },
    modalityText: 'documents, data & images',
    sources: {
      primary: [
        { icon: '🖼️', name: 'NJ Land Use / Land Cover Map 2020', usedFor: 'impervious surface measurements' },
        { icon: '📊', name: 'DEP Environmental Data Registry', usedFor: 'land use classification data' },
      ],
      supporting: [
        { icon: '📄', name: 'NJ Stormwater Management Report', usedFor: 'compliance thresholds' },
        { icon: '🖼️', name: 'County Impervious Surface Overlay · 2020', usedFor: 'geographic comparison' },
      ],
      additional: [],
    },
    suggestions: [
      'Which NJ counties exceed EPA stormwater thresholds?',
      'How has impervious coverage changed since 2015?',
    ],
  },
]

export const INITIAL_SUGGESTIONS = [
  'Which NJ townships have the most employees with terminal leave benefits?',
  'How many migrant students are enrolled per school district?',
  'What are the top 10 industries by registered businesses in NJ?',
  'How does impervious surface area compare across land use types?',
]

export const getAnswerForQuestion = (question) => {
  const q = question.toLowerCase().trim()
  return MOCK_QA.find(item =>
    item.question.toLowerCase() === q ||
    item.suggestions.some(s => s.toLowerCase() === q) ||
    item.question.toLowerCase().includes(q.slice(0, 20))
  ) || MOCK_QA[Math.floor(Math.random() * MOCK_QA.length)]
}
