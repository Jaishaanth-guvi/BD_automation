export const INITIAL_BDS = [
  { id: "bd-1", name: "Alex Rivers", role: "Senior BD Manager", email: "alex.r@company.com", avatar: "AR", color: "#059669", target: 80000 },
  { id: "bd-2", name: "Priya Sharma", role: "Enterprise BD Lead", email: "priya.s@company.com", avatar: "PS", color: "#0d9488", target: 75000 },
  { id: "bd-3", name: "Michael Scott", role: "Regional BD Executive", email: "michael.s@company.com", avatar: "MS", color: "#16a34a", target: 60000 },
  { id: "bd-4", name: "Sarah Connor", role: "Tech BD Specialist", email: "sarah.c@company.com", avatar: "SC", color: "#0284c7", target: 65000 }
];

export const INITIAL_LEADS = [
  {
    id: "LD-1001",
    company: "Acme Enterprises",
    contactName: "Sarah Jenkins",
    email: "s.jenkins@acmeent.com",
    phone: "+1 (555) 234-5678",
    title: "VP of Procurement",
    value: 45000,
    stage: "Proposal Sent",
    priority: "High",
    source: "LinkedIn",
    leadScore: 88,
    assignedBdId: "bd-1",
    createdAt: "2026-09-10",
    lastContactDate: "2026-09-21",
    nextFollowUp: "2026-09-24",
    notes: "Interested in the enterprise annual tier. Demo went exceptionally well.",
    activities: [
      { id: 1, type: "Meeting", title: "Product Demo & Q&A", date: "2026-09-21", note: "Demonstrated custom reporting API. Client requested custom quote." },
      { id: 2, type: "Email", title: "Sent Formal Proposal v1", date: "2026-09-18", note: "Sent $45k customized pricing proposal for 500 licenses." }
    ]
  },
  {
    id: "LD-1002",
    company: "Apex Global Solutions",
    contactName: "Michael Chang",
    email: "m.chang@apexglobal.io",
    phone: "+1 (555) 876-5432",
    title: "Head of Growth",
    value: 78000,
    stage: "Negotiation",
    priority: "High",
    source: "Website Lead",
    leadScore: 94,
    assignedBdId: "bd-2",
    createdAt: "2026-09-02",
    lastContactDate: "2026-09-22",
    nextFollowUp: "2026-09-23",
    notes: "Reviewing legal SLA compliance terms. High probability of closing this week.",
    activities: [
      { id: 1, type: "Call", title: "Contract Negotiation Call", date: "2026-09-22", note: "Agreed on 2-year commitment with 10% volume discount." }
    ]
  },
  {
    id: "LD-1003",
    company: "BioHealth Tech",
    contactName: "Dr. Elena Rostova",
    email: "elena@biohealthtech.org",
    phone: "+1 (555) 345-6789",
    title: "Chief Digital Officer",
    value: 28000,
    stage: "Contacted",
    priority: "Medium",
    source: "Industry Event",
    leadScore: 65,
    assignedBdId: "bd-3",
    createdAt: "2026-09-15",
    lastContactDate: "2026-09-19",
    nextFollowUp: "2026-09-25",
    notes: "Met at TechMed Expo. Needs security compliance confirmation.",
    activities: [
      { id: 1, type: "Email", title: "Intro & Security Whitepaper Sent", date: "2026-09-19", note: "Shared HIPAA compliance documentation." }
    ]
  },
  {
    id: "LD-1004",
    company: "CloudScale Systems",
    contactName: "David Miller",
    email: "dmiller@cloudscale.net",
    phone: "+1 (555) 901-2345",
    title: "Director of IT Operations",
    value: 120000,
    stage: "Closed Won",
    priority: "High",
    source: "Referral",
    leadScore: 98,
    assignedBdId: "bd-1",
    createdAt: "2026-08-20",
    lastContactDate: "2026-09-20",
    nextFollowUp: "-",
    notes: "3-Year agreement signed! Onboarding scheduled for Oct 1st.",
    activities: [
      { id: 1, type: "Meeting", title: "Contract Signed & Handover", date: "2026-09-20", note: "Signed contract received." }
    ]
  },
  {
    id: "LD-1005",
    company: "Delta Logistics Corp",
    contactName: "Rachel Adams",
    email: "rachel.a@deltalogistics.com",
    phone: "+1 (555) 456-7890",
    title: "VP Operations",
    value: 32000,
    stage: "New Lead",
    priority: "Medium",
    source: "Cold Email Outreach",
    leadScore: 50,
    assignedBdId: "bd-4",
    createdAt: "2026-09-22",
    lastContactDate: "2026-09-22",
    nextFollowUp: "2026-09-23",
    notes: "Responded to outbound sequence campaign requesting product deck.",
    activities: [
      { id: 1, type: "Email", title: "Outbound Lead Response", date: "2026-09-22", note: "Sent initial presentation." }
    ]
  },
  {
    id: "LD-1006",
    company: "EcoEnergy Tech",
    contactName: "Marcus Vance",
    email: "m.vance@ecoenergy.co",
    phone: "+1 (555) 678-9012",
    title: "Sustainability Officer",
    value: 55000,
    stage: "Proposal Sent",
    priority: "High",
    source: "LinkedIn",
    leadScore: 78,
    assignedBdId: "bd-2",
    createdAt: "2026-09-08",
    lastContactDate: "2026-09-20",
    nextFollowUp: "2026-09-24",
    notes: "Proposal under review by board of directors.",
    activities: [
      { id: 1, type: "Email", title: "Proposal Revisions Sent", date: "2026-09-20", note: "Updated SLA response times." }
    ]
  },
  {
    id: "LD-1007",
    company: "Frontier Capital",
    contactName: "Jameson Blake",
    email: "jblake@frontiercap.com",
    phone: "+1 (555) 123-9876",
    title: "Managing Director",
    value: 95000,
    stage: "Closed Lost",
    priority: "Low",
    source: "Inbound Webinar",
    leadScore: 40,
    assignedBdId: "bd-3",
    createdAt: "2026-08-15",
    lastContactDate: "2026-09-10",
    nextFollowUp: "-",
    notes: "Chose competitor due to existing legacy system integration.",
    activities: [
      { id: 1, type: "Call", title: "Post-Mortem Call", date: "2026-09-10", note: "Learned they stayed with legacy provider." }
    ]
  },
  {
    id: "LD-1008",
    company: "GigaByte Media",
    contactName: "Chloe Sterling",
    email: "chloe@gigabytemedia.com",
    phone: "+1 (555) 789-0123",
    title: "CMO",
    value: 62000,
    stage: "Contacted",
    priority: "High",
    source: "Website Lead",
    leadScore: 82,
    assignedBdId: "bd-4",
    createdAt: "2026-09-18",
    lastContactDate: "2026-09-21",
    nextFollowUp: "2026-09-24",
    notes: "Scheduled discovery meeting for Thursday 10 AM.",
    activities: [
      { id: 1, type: "Call", title: "Introductory Call", date: "2026-09-21", note: "Discussed multi-channel attribution." }
    ]
  }
];

export const PIPELINE_STAGES = [
  { id: "New Lead", title: "New Leads", color: "#3b82f6", badgeBg: "#eff6ff" },
  { id: "Contacted", title: "Contacted / Discovery", color: "#0ea5e9", badgeBg: "#f0f9ff" },
  { id: "Proposal Sent", title: "Proposal Sent", color: "#8b5cf6", badgeBg: "#f5f3ff" },
  { id: "Negotiation", title: "Negotiation", color: "#f59e0b", badgeBg: "#fffbeb" },
  { id: "Closed Won", title: "Closed Won", color: "#10b981", badgeBg: "#ecfdf5" },
  { id: "Closed Lost", title: "Closed Lost", color: "#ef4444", badgeBg: "#fef2f2" }
];

export const MONTHLY_TARGET = {
  target: 250000,
  achieved: 185000,
  month: "September 2026",
  wonCount: 14,
  winRate: "38.5%"
};

export const REVENUE_FORECAST_DATA = [
  { month: "May", target: 180000, actual: 195000, pipeline: 240000 },
  { month: "Jun", target: 200000, actual: 210000, pipeline: 270000 },
  { month: "Jul", target: 220000, actual: 205000, pipeline: 290000 },
  { month: "Aug", target: 230000, actual: 245000, pipeline: 310000 },
  { month: "Sep", target: 250000, actual: 185000, pipeline: 360000 },
  { month: "Oct (Est)", target: 270000, actual: 0, pipeline: 410000 }
];

export const LEAD_SOURCE_DATA = [
  { name: "LinkedIn Outreach", value: 35, color: "#059669" },
  { name: "Website Inbound", value: 28, color: "#10b981" },
  { name: "Referrals", value: 18, color: "#34d399" },
  { name: "Industry Events", value: 12, color: "#6ee7b7" },
  { name: "Cold Email", value: 7, color: "#a7f3d0" }
];

export const BD_ACTIVITIES_TODAY = [
  { id: 101, leadId: "LD-1002", company: "Apex Global Solutions", contact: "Michael Chang", type: "Call", time: "10:30 AM", title: "Follow-up on legal clause #4", priority: "High", done: false },
  { id: 102, leadId: "LD-1001", company: "Acme Enterprises", contact: "Sarah Jenkins", type: "Email", time: "02:00 PM", title: "Send customized ROI calculator sheet", priority: "High", done: false },
  { id: 103, leadId: "LD-1008", company: "GigaByte Media", contact: "Chloe Sterling", type: "Meeting", time: "04:15 PM", title: "Discovery Call & Tech Architecture Review", priority: "Medium", done: false },
  { id: 104, leadId: "LD-1003", company: "BioHealth Tech", contact: "Dr. Elena Rostova", type: "Email", time: "05:00 PM", title: "Check compliance doc status", priority: "Low", done: true }
];
