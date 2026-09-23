import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  Send,
  PhoneCall,
  UserCheck
} from 'lucide-react';
import { PIPELINE_STAGES } from '../data/mockData';

export default function LeadDetailModal({ lead, bds, onClose, onUpdateLead }) {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [newActivityType, setNewActivityType] = useState('Call');
  const [newActivityTitle, setNewActivityTitle] = useState('');
  const [newActivityNote, setNewActivityNote] = useState('');

  if (!lead) return null;

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivityTitle) return;

    const newAct = {
      id: Date.now(),
      type: newActivityType,
      title: newActivityTitle,
      date: new Date().toISOString().split('T')[0],
      note: newActivityNote
    };

    const updatedActivities = [newAct, ...(lead.activities || [])];
    onUpdateLead({
      ...lead,
      lastContactDate: new Date().toISOString().split('T')[0],
      activities: updatedActivities
    });

    setNewActivityTitle('');
    setNewActivityNote('');
    setActiveSubTab('activity');
  };

  const handleStageChange = (newStage) => {
    onUpdateLead({
      ...lead,
      stage: newStage
    });
  };

  const handleBdReassign = (newBdId) => {
    onUpdateLead({
      ...lead,
      assignedBdId: newBdId
    });
  };

  const assignedBd = bds.find(b => b.id === lead.assignedBdId) || { name: 'Unassigned', avatar: '?', color: '#94a3b8' };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title">
            <Building2 size={20} color="#059669" />
            <span>{lead.company}</span>
            <span className={`badge badge-priority-${lead.priority}`} style={{ fontSize: '0.7rem' }}>
              {lead.priority}
            </span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Sub Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', padding: '0 1.5rem', background: '#f8fafc' }}>
          <button 
            style={{
              padding: '0.75rem 1rem',
              fontWeight: '700',
              fontSize: '0.85rem',
              color: activeSubTab === 'overview' ? '#059669' : '#64748b',
              borderBottom: activeSubTab === 'overview' ? '3px solid #059669' : 'none',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setActiveSubTab('overview')}
          >
            Lead Overview
          </button>
          <button 
            style={{
              padding: '0.75rem 1rem',
              fontWeight: '700',
              fontSize: '0.85rem',
              color: activeSubTab === 'activity' ? '#059669' : '#64748b',
              borderBottom: activeSubTab === 'activity' ? '3px solid #059669' : 'none',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setActiveSubTab('activity')}
          >
            Activity Timeline ({(lead.activities || []).length})
          </button>
          <button 
            style={{
              padding: '0.75rem 1rem',
              fontWeight: '700',
              fontSize: '0.85rem',
              color: activeSubTab === 'log' ? '#059669' : '#64748b',
              borderBottom: activeSubTab === 'log' ? '3px solid #059669' : 'none',
              background: 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer'
            }}
            onClick={() => setActiveSubTab('log')}
          >
            + Log New Activity
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {activeSubTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Top Summary Banner */}
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '0.6rem',
                padding: '1rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '600' }}>Estimated Value</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#064e3b' }}>
                    ${lead.value?.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '600' }}>Lead Quality Score</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: '800', color: '#064e3b', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Sparkles size={16} /> {lead.leadScore} / 100
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '600' }}>Current Stage</span>
                  <select 
                    value={lead.stage} 
                    onChange={(e) => handleStageChange(e.target.value)}
                    style={{
                      marginTop: '0.2rem',
                      padding: '0.25rem 0.5rem',
                      fontWeight: '700',
                      borderRadius: '0.35rem',
                      border: '1px solid #059669',
                      backgroundColor: '#ffffff',
                      color: '#064e3b',
                      fontSize: '0.85rem'
                    }}
                  >
                    {PIPELINE_STAGES.map(s => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Assigned BD Reassignment Box */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #a7f3d0',
                borderRadius: '0.5rem',
                padding: '0.85rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <UserCheck size={20} color="#059669" />
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Assigned BD Representative</span>
                    <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '0.95rem' }}>{assignedBd.name} ({assignedBd.role})</div>
                  </div>
                </div>

                <select 
                  value={lead.assignedBdId || ''} 
                  onChange={(e) => handleBdReassign(e.target.value)}
                  style={{
                    padding: '0.35rem 0.65rem',
                    borderRadius: '0.4rem',
                    border: '1px solid #059669',
                    backgroundColor: '#ecfdf5',
                    color: '#047857',
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}
                >
                  {bds.map(b => (
                    <option key={b.id} value={b.id}>Reassign to: {b.name}</option>
                  ))}
                </select>
              </div>

              {/* Detailed Grid */}
              <div className="form-grid">
                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Contact Name</div>
                  <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <User size={15} color="#059669" /> {lead.contactName} ({lead.title || 'Decision Maker'})
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Email Address</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <Mail size={15} color="#059669" /> {lead.email}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Phone Number</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.2rem' }}>
                    <Phone size={15} color="#059669" /> {lead.phone}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Lead Source</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#0f172a', marginTop: '0.2rem' }}>
                    {lead.source}
                  </div>
                </div>
              </div>

              {/* Notes & Context */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '1rem', borderRadius: '0.5rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '0.4rem' }}>
                  Strategic Context & Notes
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.5' }}>
                  {lead.notes || 'No custom notes provided for this lead yet.'}
                </p>
              </div>
            </div>
          )}

          {activeSubTab === 'activity' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {(lead.activities || []).length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>
                  No logged interactions yet.
                </div>
              ) : (
                lead.activities.map(act => (
                  <div className="timeline-item" key={act.id}>
                    <div className="timeline-icon">
                      {act.type === 'Call' && <PhoneCall size={16} />}
                      {act.type === 'Email' && <Mail size={16} />}
                      {act.type === 'Meeting' && <User size={16} />}
                    </div>
                    <div className="timeline-content">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' }}>{act.title}</span>
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{act.date}</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '0.3rem' }}>{act.note}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeSubTab === 'log' && (
            <form onSubmit={handleAddActivity} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Interaction Type</label>
                <select 
                  className="form-select"
                  value={newActivityType}
                  onChange={(e) => setNewActivityType(e.target.value)}
                >
                  <option value="Call">Phone Call</option>
                  <option value="Email">Email Sent / Received</option>
                  <option value="Meeting">Meeting / Demo</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Subject / Title *</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="e.g. Discussed pricing options"
                  value={newActivityTitle}
                  onChange={(e) => setNewActivityTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Meeting / Call Notes</label>
                <textarea 
                  className="form-textarea"
                  rows="4"
                  placeholder="Summarize key takeaways, action items, or client feedback..."
                  value={newActivityNote}
                  onChange={(e) => setNewActivityNote(e.target.value)}
                ></textarea>
              </div>

              <button className="btn btn-primary" type="submit" style={{ alignSelf: 'flex-end' }}>
                <Send size={16} />
                <span>Save Log Entry</span>
              </button>
            </form>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
