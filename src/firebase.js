import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  setDoc,
  updateDoc, 
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { 
  INITIAL_LEADS, 
  INITIAL_BDS, 
  MONTHLY_TARGET, 
  BD_ACTIVITIES_TODAY 
} from "./data/mockData";

const INITIAL_CALL_ALERTS = [
  {
    id: "CALL-501",
    leadId: "LD-1002",
    company: "Apex Global Solutions",
    contactName: "Michael Chang",
    bdId: "bd-2",
    bdName: "Priya Sharma",
    callType: "Contract Negotiation Call",
    date: "2026-09-22 14:30",
    duration: "24 mins",
    conversationData: "Client agreed on 2-year enterprise commitment with 10% volume discount. Michael requested updated legal SLA clause #4 regarding uptime guarantees.",
    callOutcome: "Proposal Accepted / Pending Legal",
    followUpStatus: "Action Required Today",
    nextFollowUpDate: "2026-09-23",
    isUrgent: true
  },
  {
    id: "CALL-502",
    leadId: "LD-1001",
    company: "Acme Enterprises",
    contactName: "Sarah Jenkins",
    bdId: "bd-1",
    bdName: "Alex Rivers",
    callType: "Product Architecture Review",
    date: "2026-09-21 11:00",
    duration: "35 mins",
    conversationData: "Reviewed custom reporting API endpoints and multi-user RBAC controls. Sarah requested customized ROI calculation spreadsheet for 500 seat license rollout.",
    callOutcome: "Scheduled ROI Review",
    followUpStatus: "Follow-up Tomorrow",
    nextFollowUpDate: "2026-09-24",
    isUrgent: false
  },
  {
    id: "CALL-503",
    leadId: "LD-1008",
    company: "GigaByte Media",
    contactName: "Chloe Sterling",
    bdId: "bd-4",
    bdName: "Sarah Connor",
    callType: "Initial Discovery Call",
    date: "2026-09-21 16:15",
    duration: "18 mins",
    conversationData: "Discussed current pain points with attribution models. Chloe wants to see live demo of campaign ROI analytics dashboard.",
    callOutcome: "Demo Meeting Scheduled",
    followUpStatus: "Scheduled for Sep 24",
    nextFollowUpDate: "2026-09-24",
    isUrgent: false
  },
  {
    id: "CALL-504",
    leadId: "LD-1003",
    company: "BioHealth Tech",
    contactName: "Dr. Elena Rostova",
    bdId: "bd-3",
    bdName: "Michael Scott",
    callType: "Compliance & Security Call",
    date: "2026-09-19 15:00",
    duration: "15 mins",
    conversationData: "Sent HIPAA compliance whitepaper. Dr. Elena requested SOC2 Type II audit report before moving to formal demo stage.",
    callOutcome: "Documentation Sent",
    followUpStatus: "Overdue Follow-up Alert",
    nextFollowUpDate: "2026-09-22",
    isUrgent: true
  }
];

// Firebase Configuration from User Console
const firebaseConfig = {
  apiKey: "AIzaSyDSzWCLTho9w2f-OlO_tgfo0ExxcYKVy_E",
  authDomain: "stratis-bd-app.firebaseapp.com",
  projectId: "stratis-bd-app",
  storageBucket: "stratis-bd-app.firebasestorage.app",
  messagingSenderId: "124275757309",
  appId: "1:124275757309:web:5d7f4eb75331e1e546ae94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Seed Firestore Database with Mock Data if Collections are Empty
export async function seedFirestoreIfEmpty() {
  try {
    // Seed Leads
    const leadsSnap = await getDocs(collection(db, "leads"));
    if (leadsSnap.empty) {
      for (const lead of INITIAL_LEADS) {
        await setDoc(doc(db, "leads", lead.id), lead);
      }
      console.log("✓ Seeded Firestore 'leads' collection");
    }

    // Seed BDs
    const bdsSnap = await getDocs(collection(db, "bds"));
    if (bdsSnap.empty) {
      for (const bdItem of INITIAL_BDS) {
        await setDoc(doc(db, "bds", bdItem.id), bdItem);
      }
      console.log("✓ Seeded Firestore 'bds' collection");
    }

    // Seed Calls
    const callsSnap = await getDocs(collection(db, "calls"));
    if (callsSnap.empty) {
      for (const callItem of INITIAL_CALL_ALERTS) {
        await setDoc(doc(db, "calls", callItem.id), callItem);
      }
      console.log("✓ Seeded Firestore 'calls' collection");
    }

    // Seed Agenda
    const agendaSnap = await getDocs(collection(db, "agenda"));
    if (agendaSnap.empty) {
      for (const agendaItem of BD_ACTIVITIES_TODAY) {
        await setDoc(doc(db, "agenda", String(agendaItem.id)), agendaItem);
      }
      console.log("✓ Seeded Firestore 'agenda' collection");
    }

    // Seed Target
    const targetSnap = await getDocs(collection(db, "target"));
    if (targetSnap.empty) {
      await setDoc(doc(db, "target", "monthly_target"), MONTHLY_TARGET);
      console.log("✓ Seeded Firestore 'target' document");
    }
  } catch (err) {
    console.warn("Firestore seeding check:", err);
  }
}

// Firebase Firestore Operations API
export const firebaseLeads = {
  getAll: async () => {
    await seedFirestoreIfEmpty();
    const querySnapshot = await getDocs(collection(db, "leads"));
    return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  create: async (leadData) => {
    await setDoc(doc(db, "leads", leadData.id), leadData);
    return leadData;
  },

  updateStage: async (leadId, stage) => {
    const leadRef = doc(db, "leads", leadId);
    await updateDoc(leadRef, { stage, lastContactDate: new Date().toISOString().split('T')[0] });
    return { id: leadId, stage };
  },

  reassignBd: async (leadId, assignedBdId) => {
    const leadRef = doc(db, "leads", leadId);
    await updateDoc(leadRef, { assignedBdId });
    return { id: leadId, assignedBdId };
  },

  logActivity: async (leadId, activity) => {
    const leadRef = doc(db, "leads", leadId);
    const snap = await getDocs(query(collection(db, "leads"), where("id", "==", leadId)));
    if (!snap.empty) {
      const currentData = snap.docs[0].data();
      const currentActivities = currentData.activities || [];
      const updatedActivities = [activity, ...currentActivities];
      await updateDoc(leadRef, { activities: updatedActivities, lastContactDate: new Date().toISOString().split('T')[0] });
      return { id: leadId, activities: updatedActivities };
    }
  },

  delete: async (leadId) => {
    await deleteDoc(doc(db, "leads", leadId));
    return { id: leadId };
  }
};

export const firebaseBds = {
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, "bds"));
    return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  create: async (bdData) => {
    await setDoc(doc(db, "bds", bdData.id), bdData);
    return bdData;
  }
};

export const firebaseAlerts = {
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, "calls"));
    return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  logCall: async (callData) => {
    await setDoc(doc(db, "calls", callData.id), callData);
    return callData;
  }
};

export const firebaseAgenda = {
  getAll: async () => {
    const querySnapshot = await getDocs(collection(db, "agenda"));
    return querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  create: async (agendaData) => {
    await setDoc(doc(db, "agenda", String(agendaData.id)), agendaData);
    return agendaData;
  },

  toggle: async (agendaId) => {
    const itemRef = doc(db, "agenda", String(agendaId));
    const snap = await getDocs(query(collection(db, "agenda"), where("id", "==", Number(agendaId))));
    if (!snap.empty) {
      const currentDone = snap.docs[0].data().done || false;
      await updateDoc(itemRef, { done: !currentDone });
    }
  }
};

export const firebaseTarget = {
  get: async () => {
    const querySnapshot = await getDocs(collection(db, "target"));
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data();
    }
    return MONTHLY_TARGET;
  }
};
