import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KpiCards from './components/KpiCards';
import KanbanBoard from './components/KanbanBoard';
import LeadsTable from './components/LeadsTable';
import BdTeamManager from './components/BdTeamManager';
import BdAlertsView from './components/BdAlertsView';
import AnalyticsView from './components/AnalyticsView';
import FollowUpAgenda from './components/FollowUpAgenda';
import LeadDetailModal from './components/LeadDetailModal';
import LoginPage from './components/LoginPage';
import { 
  leadsAPI, 
  bdsAPI, 
  targetAPI, 
  agendaAPI,
  alertsAPI
} from './services/api';
import { 
  INITIAL_LEADS, 
  INITIAL_BDS, 
  MONTHLY_TARGET, 
  BD_ACTIVITIES_TODAY 
} from './data/mockData';

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

export default function App() {
  // Authentication State
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('bd_dashboard_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [leads, setLeads] = useState(INITIAL_LEADS);
  const [bds, setBds] = useState(INITIAL_BDS);
  const [targetData, setTargetData] = useState(MONTHLY_TARGET);
  const [agendaList, setAgendaList] = useState(BD_ACTIVITIES_TODAY);
  const [alerts, setAlerts] = useState(INITIAL_CALL_ALERTS);
  
  const [activeTab, setActiveTab] = useState('kanban');
  const [selectedLead, setSelectedLead] = useState(null);
  
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [sourceFilter, setSourceFilter] = useState('ALL');
  const [bdFilter, setBdFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Initial Load from MongoDB API when authenticated
  useEffect(() => {
    if (!user) return;

    async function loadData() {
      try {
        const [fetchedLeads, fetchedBds, fetchedTarget, fetchedAgenda, fetchedAlerts] = await Promise.all([
          leadsAPI.getAll(),
          bdsAPI.getAll(),
          targetAPI.get(),
          agendaAPI.getAll(),
          alertsAPI.getAll()
        ]);

        if (fetchedLeads && fetchedLeads.length > 0) setLeads(fetchedLeads);
        if (fetchedBds && fetchedBds.length > 0) setBds(fetchedBds);
        if (fetchedTarget) setTargetData(fetchedTarget);
        if (fetchedAgenda && fetchedAgenda.length > 0) setAgendaList(fetchedAgenda);
        if (fetchedAlerts && fetchedAlerts.length > 0) setAlerts(fetchedAlerts);
      } catch (err) {
        console.warn("Using fallback local dataset:", err);
      }
    }
    loadData();
  }, [user]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    sessionStorage.setItem('bd_dashboard_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('bd_dashboard_user');
  };

  // If not logged in, render Login Page
  if (!user) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  // Handle lead stage movement with API sync
  const handleMoveStage = async (leadId, newStage) => {
    setLeads(prevLeads => prevLeads.map(l => {
      if (l.id === leadId) {
        return { 
          ...l, 
          stage: newStage,
          lastContactDate: new Date().toISOString().split('T')[0]
        };
      }
      return l;
    }));

    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({ ...prev, stage: newStage }));
    }

    try {
      await leadsAPI.updateStage(leadId, newStage);
    } catch (e) {
      console.warn("Could not sync stage change to API");
    }
  };

  // Handle lead BD reassignment with API sync
  const handleReassignBd = async (leadId, newBdId) => {
    setLeads(prevLeads => prevLeads.map(l => {
      if (l.id === leadId) {
        return { 
          ...l, 
          assignedBdId: newBdId
        };
      }
      return l;
    }));

    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead(prev => ({ ...prev, assignedBdId: newBdId }));
    }

    try {
      await leadsAPI.reassignBd(leadId, newBdId);
    } catch (e) {
      console.warn("Could not sync BD reassignment to API");
    }
  };

  // Handle lead update (activity log or field change)
  const handleUpdateLead = async (updatedLead) => {
    setLeads(prevLeads => prevLeads.map(l => l.id === updatedLead.id ? updatedLead : l));
    setSelectedLead(updatedLead);

    try {
      if (updatedLead.activities && updatedLead.activities.length > 0) {
        await leadsAPI.logActivity(updatedLead.id, updatedLead.activities[0]);
      }
    } catch (e) {
      console.warn("Could not sync activity to API");
    }
  };

  // Handle adding new BD team member with API sync
  const handleAddBd = async (newBd) => {
    setBds(prev => [...prev, newBd]);
    try {
      await bdsAPI.create(newBd);
    } catch (e) {
      console.warn("Could not save new BD to API");
    }
  };

  // Handle logging call conversation alert with API sync
  const handleLogCall = async (newCall) => {
    setAlerts(prev => [newCall, ...prev]);
    try {
      await alertsAPI.logCall(newCall);
    } catch (e) {
      console.warn("Could not log call alert to API");
    }
  };

  // Handle delete lead with API sync
  const handleDeleteLead = async (leadId) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      setLeads(prev => prev.filter(l => l.id !== leadId));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
      try {
        await leadsAPI.delete(leadId);
      } catch (e) {
        console.warn("Could not delete lead on API");
      }
    }
  };

  // Agenda Actions with API sync
  const handleToggleAgenda = async (agendaId) => {
    setAgendaList(prev => prev.map(item => {
      if (item.id === agendaId) {
        return { ...item, done: !item.done };
      }
      return item;
    }));

    try {
      await agendaAPI.toggle(agendaId);
    } catch (e) {
      console.warn("Could not sync agenda toggle to API");
    }
  };

  const handleAddAgenda = async (newItem) => {
    setAgendaList(prev => [newItem, ...prev]);
    try {
      await agendaAPI.create(newItem);
    } catch (e) {
      console.warn("Could not save agenda task to API");
    }
  };

  // Global Search Filter
  const searchedLeads = leads.filter(l => {
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      l.company.toLowerCase().includes(query) ||
      l.contactName.toLowerCase().includes(query) ||
      l.email.toLowerCase().includes(query) ||
      (l.notes && l.notes.toLowerCase().includes(query))
    );
  });

  const pendingAgendaCount = agendaList.filter(item => !item.done).length;
  const urgentAlertCount = alerts.filter(item => item.isUrgent).length;

  return (
    <div className="app-container">
      {/* Top Green Navbar */}
      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        targetData={targetData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        pendingAgendaCount={pendingAgendaCount}
        urgentAlertCount={urgentAlertCount}
        bdCount={bds.length}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Page Area */}
      <main className="content-area">
        {/* Top KPI Cards */}
        <KpiCards 
          leads={searchedLeads}
          targetData={targetData}
          pendingAgendaCount={pendingAgendaCount}
        />

        {/* Dynamic Tab Content */}
        {activeTab === 'kanban' && (
          <KanbanBoard 
            leads={searchedLeads}
            bds={bds}
            onSelectLead={(lead) => setSelectedLead(lead)}
            onMoveStage={handleMoveStage}
            onReassignBd={handleReassignBd}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            bdFilter={bdFilter}
            setBdFilter={setBdFilter}
          />
        )}

        {activeTab === 'table' && (
          <LeadsTable 
            leads={searchedLeads}
            bds={bds}
            onSelectLead={(lead) => setSelectedLead(lead)}
            onMoveStage={handleMoveStage}
            onReassignBd={handleReassignBd}
            onDeleteLead={handleDeleteLead}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            sourceFilter={sourceFilter}
            setSourceFilter={setSourceFilter}
            bdFilter={bdFilter}
            setBdFilter={setBdFilter}
          />
        )}

        {activeTab === 'alerts' && (
          <BdAlertsView 
            alerts={alerts}
            bds={bds}
            leads={leads}
            onLogCall={handleLogCall}
          />
        )}

        {activeTab === 'bds' && (
          <BdTeamManager 
            bds={bds}
            leads={leads}
            onAddBd={handleAddBd}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView leads={searchedLeads} />
        )}

        {activeTab === 'agenda' && (
          <FollowUpAgenda 
            agendaList={agendaList}
            onToggleAgenda={handleToggleAgenda}
            onAddAgenda={handleAddAgenda}
          />
        )}
      </main>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <LeadDetailModal 
          lead={selectedLead}
          bds={bds}
          onClose={() => setSelectedLead(null)}
          onUpdateLead={handleUpdateLead}
        />
      )}
    </div>
  );
}
