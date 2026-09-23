import React, { useState } from 'react';
import { 
  BellRing, 
  PhoneCall, 
  MessageSquareText, 
  User, 
  Building2, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  Filter, 
  Send,
  Sparkles,
  Calendar
} from 'lucide-react';

export default function BdAlertsView({ alerts, bds, leads, onLogCall }) {
  const [showLogForm, setShowLogForm] = useState(false);
  const [selectedBdId, setSelectedBdId] = useState('ALL');
  const [outcomeFilter, setOutcomeFilter] = useState('ALL');
  
  // Log form state
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [bdId, setBdId] = useState(bds[0]?.id || 'bd-1');
  const [callType, setCallType] = useState('Discovery Call');
  const [duration, setDuration] = useState('15 mins');
  const [conversationData, setConversationData] = useState('');
  const [callOutcome, setCallOutcome] = useState('Proposal Requested');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !conversationData) return;

    const selectedBd = bds.find(b => b.id === bdId) || { name: 'Alex Rivers' };
    const matchedLead = leads.find(l => l.company.toLowerCase() === company.toLowerCase());

    const newCall = {
      id: `CALL-${Math.floor(500 + Math.random() * 500)}`,
      leadId: matchedLead ? matchedLead.id : '',
      company,
      contactName: contactName || (matchedLead ? matchedLead.contactName : 'Decision Maker'),
      bdId,
      bdName: selectedBd.name,
      callType,
      date: new Date().toISOString().replace('T', ' ').slice(0, 16),
      duration,
      conversationData,
      callOutcome,
      followUpStatus: 'Scheduled',
      nextFollowUpDate,
      isUrgent: false
    };

    onLogCall(newCall);
    setCompany('');
    setContactName('');
    setConversationData('');
    setShowLogForm(false);
  };

  const filteredAlerts = alerts.filter(a => {
    const matchBd = selectedBdId === 'ALL' || a.bdId === selectedBdId;
    const matchOutcome = outcomeFilter === 'ALL' || a.callOutcome.toLowerCase().includes(outcomeFilter.toLowerCase());
    return matchBd && matchOutcome;
  });

  const urgentCount = alerts.filter(a => a.isUrgent).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
        color: '#ffffff',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 14px rgba(5, 150, 105, 0.2)',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.65rem', borderRadius: '0.65rem' }}>
            <BellRing size={26} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800' }}>
              BD Call & Follow-up Conversation Alerts
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#a7f3d0', marginTop: '0.15rem' }}>
              Track conversation transcripts, call notes, BD activity logs, and follow-up alerts.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.12)', padding: '0.5rem 0.85rem', borderRadius: '0.5rem', textAlign: 'right' }}>
            <span style={{ fontSize: '0.7rem', color: '#d1fae5', display: 'block' }}>Actionable Urgent Alerts</span>
            <span style={{ fontSize: '1.1rem', fontWeight: '800', color: urgentCount > 0 ? '#fca5a5' : '#34d399' }}>
              {urgentCount} Overdue
            </span>
          </div>

          <button className="btn btn-primary" onClick={() => setShowLogForm(!showLogForm)} style={{ backgroundColor: '#10b981', borderColor: '#34d399' }}>
            <Plus size={16} />
            <span>Log Call & Conversation</span>
          </button>
        </div>
      </div>

      {/* Log Call Inline Form */}
      {showLogForm && (
        <form onSubmit={handleSubmit} style={{
          background: '#ffffff',
          border: '1px solid #a7f3d0',
          borderRadius: '0.75rem',
          padding: '1.25rem',
          boxShadow: '0 4px 14px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#064e3b', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MessageSquareText size={18} color="#059669" />
            Log BD Call & Client Conversation
          </h3>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Company Account *</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="e.g. Acme Enterprises" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Contact Person</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="e.g. Sarah Jenkins" 
                value={contactName}
                onChange={(e) => setContactName(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assigned BD Representative</label>
              <select className="form-select" value={bdId} onChange={(e) => setBdId(e.target.value)}>
                {bds.map(b => (
                  <option key={b.id} value={b.id}>{b.name} ({b.role})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Call Type</label>
              <select className="form-select" value={callType} onChange={(e) => setCallType(e.target.value)}>
                <option value="Discovery Call">Discovery Call</option>
                <option value="Technical Review">Technical Architecture Review</option>
                <option value="Contract Negotiation">Contract Negotiation</option>
                <option value="Executive Briefing">Executive Briefing</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Call Duration</label>
              <input 
                className="form-input" 
                type="text" 
                value={duration} 
                onChange={(e) => setDuration(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Next Scheduled Follow-up</label>
              <input 
                className="form-input" 
                type="date" 
                value={nextFollowUpDate} 
                onChange={(e) => setNextFollowUpDate(e.target.value)} 
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Conversation Log & Key Takeaways *</label>
              <textarea 
                className="form-textarea" 
                rows="3"
                placeholder="Record detailed notes of client discussion, agreed terms, pain points, or next steps..."
                value={conversationData}
                onChange={(e) => setConversationData(e.target.value)}
                required
              ></textarea>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button className="btn btn-secondary btn-sm" type="button" onClick={() => setShowLogForm(false)}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" type="submit">
              <Send size={14} />
              <span>Save Conversation Record</span>
            </button>
          </div>
        </form>
      )}

      {/* Filter Controls Bar */}
      <div className="kanban-controls">
        <div className="filter-group">
          <Filter size={16} color="#059669" />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a' }}>Filter Alerts:</span>

          <select 
            className="filter-select"
            value={selectedBdId}
            onChange={(e) => setSelectedBdId(e.target.value)}
            style={{ fontWeight: '700', color: '#047857', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}
          >
            <option value="ALL">All BD Representatives</option>
            {bds.map(b => (
              <option key={b.id} value={b.id}>BD: {b.name}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
          Showing <strong>{filteredAlerts.length}</strong> logged conversation alerts
        </div>
      </div>

      {/* Call Conversation Feed */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredAlerts.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: '#ffffff', borderRadius: '0.75rem', border: '1px solid #e2e8f0', color: '#94a3b8' }}>
            No call alerts or conversation logs found.
          </div>
        ) : (
          filteredAlerts.map(item => {
            const bd = bds.find(b => b.id === item.bdId) || { name: item.bdName, avatar: 'BD', color: '#059669' };

            return (
              <div 
                key={item.id}
                style={{
                  background: '#ffffff',
                  border: item.isUrgent ? '1px solid #fca5a5' : '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  padding: '1.25rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                {/* Alert Top Strip */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: '#ecfdf5', color: '#047857', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #a7f3d0' }}>
                      <Building2 size={20} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>{item.company}</h3>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <User size={13} color="#94a3b8" />
                        <span>{item.contactName}</span>
                        <span>•</span>
                        <PhoneCall size={13} color="#059669" />
                        <span style={{ fontWeight: '600', color: '#059669' }}>{item.callType}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    {item.isUrgent ? (
                      <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '0.75rem', fontWeight: '800', padding: '0.2rem 0.65rem', borderRadius: '1rem', border: '1px solid #fca5a5', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <AlertTriangle size={14} /> Overdue Alert
                      </span>
                    ) : (
                      <span style={{ background: '#ecfdf5', color: '#047857', fontSize: '0.75rem', fontWeight: '800', padding: '0.2rem 0.65rem', borderRadius: '1rem', border: '1px solid #a7f3d0' }}>
                        {item.followUpStatus}
                      </span>
                    )}

                    <div style={{ fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#f8fafc', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', border: '1px solid #e2e8f0' }}>
                      <Clock size={13} /> {item.duration}
                    </div>
                  </div>
                </div>

                {/* Conversation Box */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  padding: '0.9rem',
                  fontSize: '0.85rem',
                  color: '#334155',
                  lineHeight: '1.5'
                }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MessageSquareText size={14} />
                    <span>BD Conversation & Discussion Notes</span>
                  </div>
                  <p>{item.conversationData}</p>
                </div>

                {/* Alert Footer: BD & Next Follow-up */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '0.6rem', fontSize: '0.78rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: bd.color,
                      color: '#ffffff',
                      fontSize: '0.65rem',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {bd.avatar}
                    </div>
                    <span style={{ fontWeight: '700', color: '#0f172a' }}>Logged by BD: {bd.name}</span>
                    <span style={{ color: '#94a3b8' }}>• {item.date}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#047857', fontWeight: '700' }}>
                    <Calendar size={14} />
                    <span>Next Action Date: {item.nextFollowUpDate || 'TBD'}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
