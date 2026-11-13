export interface LgaData {
  name: string;
  facilities: string[];
  phcCount: number;
  targetUsers: number;
  chewWorkers: number;
  linkageTarget: string;
  terrain: string;
}

export const GOMBE_LGAS_DATA: Record<string, LgaData> = {
  Gombe: {
    name: "Gombe (Metropolitan)",
    facilities: [
      "State Specialist Hospital Gombe (Major ART Centre)",
      "Urban Maternity Centre Gombe",
      "Federal Teaching Hospital Gombe (FTHG)",
      "Pantami Primary Health Centre",
    ],
    phcCount: 18,
    targetUsers: 1450,
    chewWorkers: 42,
    linkageTarget: "94.5%",
    terrain: "Urban / High Density",
  },
  Akko: {
    name: "Akko LGA",
    facilities: [
      "Kumo General Hospital",
      "Pindiga Primary Health Centre",
      "Kashere Model Health Centre",
      "Tula Comprehensive Health Post",
    ],
    phcCount: 24,
    targetUsers: 680,
    chewWorkers: 28,
    linkageTarget: "91.8%",
    terrain: "Semi-Urban / Agricultural",
  },
  "Yamaltu/Deba": {
    name: "Yamaltu/Deba LGA",
    facilities: [
      "Deba Cottage Hospital",
      "Dadin Kowa Model PHC",
      "Zambuk Health Centre",
      "Kuri Primary Health Clinic",
    ],
    phcCount: 22,
    targetUsers: 550,
    chewWorkers: 24,
    linkageTarget: "90.4%",
    terrain: "Riverine / Agrarian",
  },
  Balanga: {
    name: "Balanga LGA",
    facilities: [
      "Talasse Cottage Hospital",
      "Gelengu Comprehensive Health Centre",
      "Cham Maternal Health Post",
    ],
    phcCount: 16,
    targetUsers: 380,
    chewWorkers: 18,
    linkageTarget: "89.2%",
    terrain: "Hilly / Dispersed Settlements",
  },
  Billiri: {
    name: "Billiri LGA",
    facilities: [
      "Billiri General Hospital (ART Hub)",
      "Todi PHC Clinic",
      "Tangale Health Outreach Post",
    ],
    phcCount: 14,
    targetUsers: 420,
    chewWorkers: 20,
    linkageTarget: "92.0%",
    terrain: "Semi-Urban Highlands",
  },
  Dukku: {
    name: "Dukku LGA",
    facilities: [
      "Dukku General Hospital",
      "Malala Primary Healthcare Centre",
      "Gombe Abba Rural Clinic",
    ],
    phcCount: 19,
    targetUsers: 410,
    chewWorkers: 22,
    linkageTarget: "88.5%",
    terrain: "Northern Arid / Low Connectivity",
  },
  Funakaye: {
    name: "Funakaye LGA",
    facilities: [
      "Bajoga General Hospital",
      "Ashaka Cement Health Centre",
      "Bogo Model PHC",
    ],
    phcCount: 15,
    targetUsers: 360,
    chewWorkers: 19,
    linkageTarget: "90.1%",
    terrain: "Industrial / Savannah Border",
  },
  Kaltungo: {
    name: "Kaltungo LGA",
    facilities: [
      "Kaltungo General Hospital (Major ART Hub)",
      "Awak Model Health Post",
      "Kamo Primary Care Centre",
    ],
    phcCount: 17,
    targetUsers: 450,
    chewWorkers: 22,
    linkageTarget: "93.1%",
    terrain: "Hilly / Cultural Corridor",
  },
  Kwami: {
    name: "Kwami LGA",
    facilities: [
      "Mallam Sidi Cottage Hospital",
      "Kwami Central Primary Healthcare Post",
      "Boise Rural Health Centre",
    ],
    phcCount: 13,
    targetUsers: 290,
    chewWorkers: 15,
    linkageTarget: "88.9%",
    terrain: "Rural Savannah",
  },
  Nafada: {
    name: "Nafada LGA",
    facilities: [
      "Nafada Comprehensive Health Centre",
      "Birin Bole Health Post",
      "Guduku Outreach Station",
    ],
    phcCount: 11,
    targetUsers: 260,
    chewWorkers: 14,
    linkageTarget: "87.5%",
    terrain: "River Basin / Arid Remote",
  },
  Shongom: {
    name: "Shongom LGA",
    facilities: [
      "Filiya Cottage Hospital",
      "Lala Model Primary Healthcare Centre",
      "Gundale Rural Post",
    ],
    phcCount: 12,
    targetUsers: 250,
    chewWorkers: 14,
    linkageTarget: "89.0%",
    terrain: "Southern Valley / Border Corridor",
  },
};

export const GOMBE_LGA_KEYS = Object.keys(GOMBE_LGAS_DATA);

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  lga: string;
  initials: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The USSD check-ins mean my patients no longer travel 40km just to confirm a dose. GoHIV quietly closed a gap we had accepted as normal in Dukku.",
    name: "Hajiya Aisha Mohammed",
    role: "Community Health Extension Worker",
    lga: "Dukku LGA",
    initials: "AM",
  },
  {
    quote:
      "I manage reminders for my two children with any phone. Even during market days, the Hausa voice note always reaches me on time.",
    name: "Yakubu Danladi",
    role: "Paediatric Caregiver",
    lga: "Billiri LGA",
    initials: "YD",
  },
  {
    quote:
      "Verified linkage within 48 hours used to be a dream in riverine Nafada. The anonymous voucher system finally makes it measurable.",
    name: "Dr. Grace Abubakar",
    role: "State Programme Officer",
    lga: "Nafada LGA",
    initials: "GA",
  },
  {
    quote:
      "Zero identifiable data on public cloud, salted phone hashing, NDPR alignment—this is the first grassroots platform our compliance team approved without revisions.",
    name: "Ibrahim Usman",
    role: "Implementation Partner Advisor",
    lga: "Gombe Metropolis",
    initials: "IU",
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Does GoHIV require a smartphone or internet access?",
    answer:
      "No. Every core journey—risk screening, clinic linkage, and daily adherence check-ins—runs over USSD (*384*44#) and SMS on any 2G GSM feature phone. Smartphones and internet are optional extras, never a requirement.",
  },
  {
    question: "How is patient privacy protected?",
    answer:
      "GoHIV is NDPR compliant by design. Servers never hold names, addresses, or unencrypted test outcomes. Phone numbers are transformed into salted SHA-256 pseudonymous tokens, and reminder SMS are masked as neutral wellness prompts so onlookers can never infer HIV status.",
  },
  {
    question: "What does the USSD short code cost patients?",
    answer:
      "Nothing. The *384*44# gateway is provisioned as a toll-free service, so patients spend zero airtime on enrolment, screening, or daily dose confirmation.",
  },
  {
    question: "Which areas does the 2027 pilot cover?",
    answer:
      "All 11 Local Government Areas of Gombe State—Akko, Balanga, Billiri, Dukku, Funakaye, Gombe, Kaltungo, Kwami, Nafada, Shongom, and Yamaltu/Deba—with 5,000 enrolled users across designated ART facilities and PHCs.",
  },
  {
    question: "How does Caregiver Mode work for children?",
    answer:
      "Guardians receive simplified multi-child schedules and can log paediatric doses by proxy via a single-digit reply or IVR voice note. Weight-adjusted dosage warnings and missed-dose escalations route directly to assigned Community Health Extension Workers (CHEWs).",
  },
  {
    question: "How can our organization join the pilot?",
    answer:
      "Request a stakeholder briefing through the demo form or contact Alpha Spark directly at alphaspark.ng@gmail.com / 09075444148. We will schedule a confidential walkthrough of the USSD engine, offline sync architecture, and caregiver module.",
  },
];

export const TRUST_MARQUEE_ITEMS = [
  "GOMSACA",
  "SASCP",
  "SFH Nigeria",
  "NDPR Compliant",
  "UNAIDS 95-95-95",
  "Offline-First",
  "USSD *384*44#",
  "Toll-Free Access",
  "2G GSM Ready",
  "Hausa & English",
  "Zero Airtime",
  "IVR Voice Support",
];
