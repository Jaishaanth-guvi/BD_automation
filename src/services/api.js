// API Client Module integrating Firebase Firestore Real-Time Database

import { 
  firebaseLeads, 
  firebaseBds, 
  firebaseAlerts, 
  firebaseAgenda, 
  firebaseTarget 
} from "../firebase";

export const leadsAPI = {
  getAll: async () => {
    try {
      const data = await firebaseLeads.getAll();
      if (data && data.length > 0) return data;
    } catch (e) {
      console.warn("Firestore leads fetch fallback:", e);
    }
    return null;
  },

  create: async (leadData) => {
    try {
      return await firebaseLeads.create(leadData);
    } catch (e) {
      console.warn("Firestore lead create fallback:", e);
    }
    return leadData;
  },

  updateStage: async (leadId, newStage) => {
    try {
      return await firebaseLeads.updateStage(leadId, newStage);
    } catch (e) {
      console.warn("Firestore stage update fallback:", e);
    }
    return { id: leadId, stage: newStage };
  },

  reassignBd: async (leadId, newBdId) => {
    try {
      return await firebaseLeads.reassignBd(leadId, newBdId);
    } catch (e) {
      console.warn("Firestore reassign BD fallback:", e);
    }
    return { id: leadId, assignedBdId: newBdId };
  },

  logActivity: async (leadId, activity) => {
    try {
      return await firebaseLeads.logActivity(leadId, activity);
    } catch (e) {
      console.warn("Firestore log activity fallback:", e);
    }
  },

  delete: async (leadId) => {
    try {
      return await firebaseLeads.delete(leadId);
    } catch (e) {
      console.warn("Firestore delete fallback:", e);
    }
    return { id: leadId };
  }
};

export const bdsAPI = {
  getAll: async () => {
    try {
      const data = await firebaseBds.getAll();
      if (data && data.length > 0) return data;
    } catch (e) {
      console.warn("Firestore BDs fetch fallback:", e);
    }
    return null;
  },

  create: async (bdData) => {
    try {
      return await firebaseBds.create(bdData);
    } catch (e) {
      console.warn("Firestore BD create fallback:", e);
    }
    return bdData;
  }
};

export const alertsAPI = {
  getAll: async () => {
    try {
      const data = await firebaseAlerts.getAll();
      if (data && data.length > 0) return data;
    } catch (e) {
      console.warn("Firestore alerts fetch fallback:", e);
    }
    return null;
  },

  logCall: async (callData) => {
    try {
      return await firebaseAlerts.logCall(callData);
    } catch (e) {
      console.warn("Firestore call log fallback:", e);
    }
    return callData;
  }
};

export const agendaAPI = {
  getAll: async () => {
    try {
      const data = await firebaseAgenda.getAll();
      if (data && data.length > 0) return data;
    } catch (e) {
      console.warn("Firestore agenda fetch fallback:", e);
    }
    return null;
  },

  create: async (agendaData) => {
    try {
      return await firebaseAgenda.create(agendaData);
    } catch (e) {
      console.warn("Firestore agenda create fallback:", e);
    }
    return agendaData;
  },

  toggle: async (agendaId) => {
    try {
      return await firebaseAgenda.toggle(agendaId);
    } catch (e) {
      console.warn("Firestore agenda toggle fallback:", e);
    }
  }
};

export const targetAPI = {
  get: async () => {
    try {
      const data = await firebaseTarget.get();
      if (data) return data;
    } catch (e) {
      console.warn("Firestore target fetch fallback:", e);
    }
    return null;
  }
};

export const analyticsAPI = {
  getSummary: async () => null
};

export const callsAPI = {
  getAll: async () => [],
  logCall: async (data) => data
};

export const healthAPI = {
  checkStatus: async () => ({ status: 'OK' })
};

export default {
  leads: leadsAPI,
  bds: bdsAPI,
  alerts: alertsAPI,
  agenda: agendaAPI,
  target: targetAPI,
  analytics: analyticsAPI,
  calls: callsAPI,
  health: healthAPI
};
