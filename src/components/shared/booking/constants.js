import {
    User,
    Briefcase,
    Scales,
    FolderOpen,
    InstagramLogo,
    LinkedinLogo,
    GoogleLogo,
    Megaphone,
    Question,
} from '@phosphor-icons/react';

export const SERVICE_OPTIONS = [
    {
        id: 'graphic',
        label: 'Graphic Design',
        desc: 'Branding, Marketing & Visual Identity',
        bg: '/images/simulatedsanctuarythumb.webp',
        step: '01',
    },
    {
        id: 'uiux',
        label: 'UI/UX Design',
        desc: 'Interface Design & User Experience',
        bg: '/images/laco.webp',
        step: '02',
    },
    {
        id: 'mockups',
        label: 'Mockups',
        desc: 'Product Design & Brand Presentations',
        bg: '/images/artifythumb.webp',
        step: '03',
    },
    {
        id: 'webdev',
        label: 'Web Dev',
        desc: 'Full-Stack Applications & Code',
        bg: '/images/drjas.webp',
        step: '04',
    },
    {
        id: 'branding',
        label: 'Branding Package',
        desc: 'Full Brand Identity System',
        bg: null,
        step: '05',
    },
    {
        id: 'other',
        label: 'Other / Not Sure',
        desc: "Let's talk it out",
        bg: null,
        step: '06',
    },
];

export const BUDGET_OPTIONS = [
    { id: 'under10k', label: 'Under ₱10K' },
    { id: '10-30k', label: '₱10K – 30K' },
    { id: '30-50k', label: '₱30K – 50K' },
    { id: '50k+', label: '₱50K+' },
    { id: 'notsure', label: 'Not Sure Yet' },
];

export const TIMELINE_OPTIONS = [
    { id: 'asap', label: 'ASAP' },
    { id: '2weeks', label: 'Within 2 Weeks' },
    { id: 'month', label: 'Within a Month' },
    { id: 'flexible', label: 'Flexible' },
];

export const HOW_FOUND_OPTIONS = ['Referral', , 'LinkedIn', 'Instagram', 'Google', 'Other'];

export const HOW_FOUND_ICONS = {
    Referral: Megaphone,
    Instagram: InstagramLogo,
    LinkedIn: LinkedinLogo,
    Google: GoogleLogo,
    Other: Question,
};

export const COMM_OPTIONS = ['Email', 'Messenger', 'WhatsApp'];

export const PERSONALITY_TAGS = [
    'Bold',
    'Minimal',
    'Playful',
    'Elegant',
    'Corporate',
    'Edgy',
    'Warm',
    'Futuristic',
];

export const REBRAND_OPTIONS = ['New Brand', 'Rebrand', 'Not Sure'];

export const STEPS = [
    { id: 1, label: 'About You', icon: User },
    { id: 2, label: 'Details', icon: Briefcase },
    { id: 3, label: 'Scope & Budget', icon: Scales },
    { id: 4, label: 'References', icon: FolderOpen },
];

export const SERVICE_PARAM_MAP = {
    graphic: 'graphic',
    graphics: 'graphic',
    uiux: 'uiux',
    mockups: 'mockups',
    webdev: 'webdev',
};

// Per-service follow-up questions shown on Step 2, right after the project
// description. Each service asks only what's actually useful for scoping
// that kind of work — a logo client and a webdev client have nothing in
// common here. `type` drives the control: 'single' (one chip), 'multi'
// (many chips), or 'text' (input).
export const SERVICE_QUESTIONS = {
    webdev: {
        intro: 'A few questions about your website so I can scope this accurately.',
        fields: [
            { key: 'pages', label: 'Pages', type: 'single', options: ['Landing Page', 'Multi-page', 'E-commerce'] },
            { key: 'existingBrand', label: 'Existing Brand?', type: 'single', options: ['Yes', 'No'] },
            { key: 'contentReady', label: 'Content Ready?', type: 'single', options: ['Yes', 'Need Help'] },
            { key: 'inspiration', label: 'Sites You Like', type: 'text', placeholder: 'e.g. stripe.com, apple.com/airpods' },
        ],
    },
    uiux: {
        intro: 'A few questions about your product so I can scope this accurately.',
        fields: [
            { key: 'platform', label: 'Platform', type: 'single', options: ['Web', 'Mobile', 'Desktop'] },
            { key: 'designSystem', label: 'Existing Design System?', type: 'single', options: ['Yes', 'No'] },
            { key: 'figmaHandoff', label: 'Figma Handoff Needed?', type: 'single', options: ['Yes', 'No'] },
        ],
    },
    graphic: {
        intro: 'A few questions about your graphic design project.',
        fields: [
            { key: 'designType', label: 'Design Type', type: 'single', options: ['Poster', 'Social Media', 'Flyer', 'Billboard', 'Packaging'] },
            { key: 'intendedUse', label: 'Intended Use', type: 'single', options: ['Print', 'Digital', 'Both'] },
            { key: 'existingAssets', label: 'Existing Brand Assets', type: 'multi', options: ['Logo', 'Fonts', 'Colors'] },
            { key: 'deliverables', label: 'Deliverables', type: 'multi', options: ['PNG', 'PDF', 'AI', 'PSD'] },
        ],
    },
    mockups: {
        intro: 'A few questions about your mockups.',
        fields: [
            { key: 'intendedUse', label: 'Intended Use', type: 'single', options: ['Print', 'Digital', 'Both'] },
            { key: 'existingAssets', label: 'Existing Brand Assets', type: 'multi', options: ['Logo', 'Fonts', 'Colors'] },
        ],
    },
    branding: {
        intro: 'A few questions to build out your brand identity.',
        fields: [
            { key: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Acme Co.' },
            { key: 'industry', label: 'Industry', type: 'text', placeholder: 'e.g. Coffee, Fashion, Tech' },
            { key: 'existingLogo', label: 'Existing Logo?', type: 'single', options: ['Yes', 'No'] },
            { key: 'logoPersonality', label: 'Logo Personality', type: 'multi', options: ['Minimal', 'Luxury', 'Playful', 'Corporate'] },
        ],
    },
    other: {
        intro: '',
        fields: [],
    },
};

export const COUNTRY_CODES = {
    PH: { dial: '+63', maxDigits: 10, placeholder: '900 000 0000', label: 'Philippines' },
    UK: { dial: '+44', maxDigits: 10, placeholder: '7911 123456', label: 'United Kingdom' },
};

export const DRIVE_PATTERNS = [
    /drive\.google\.com/,
    /docs\.google\.com/,
    /figma\.com/,
    /notion\.so/,
    /dropbox\.com/,
];