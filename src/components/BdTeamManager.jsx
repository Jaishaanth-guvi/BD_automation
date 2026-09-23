import React, { useState } from 'react';
import { UserPlus, Users, Trophy, DollarSign, Target, Mail, Briefcase } from 'lucide-react';

export default function BdTeamManager({ bds, leads, onAddBd }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('BD Executive');
  const [email, setEmail] = useState('');
  const [target, setTarget] = useState(50000);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;

    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const colors = ['#059669', '#0d9488', '#16a34a', '#0284c7', '#8b5cf6', '#d97706'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const newBd = {
      id: `bd-${Date.now()}`,
      name,
      role,
      email,
      avatar: initials || 'BD',
      color: randomColor,
      target: Number(target)
    };

    onAddBd(newBd);
    setName('');
    setEmail('');
    setShowAddForm(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Top Header Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: '#ecfdf5', color: '#047857', padding: '0.6rem', borderRadius: '0.6rem' }}>
            <Users size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
              BD Team Roster & Lead Distribution
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Manage team members, view individual targets, and assign/reassign leads.
            </p>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setShowAddForm(!showAddForm)}>
          <UserPlus size={16} />
          <span>Add New BD</span>
        </button>
      </div>

      {/* Add BD Form Modal / Inline Card */}
      {showAddForm && (
        <form onSubmit={handleAddSubmit} style={{
          background: '#f0fdf4',
          border: '1px solid #a7f3d0',
          borderRadius: '0.75rem',
          padding: '1.25rem'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#064e3b', marginBottom: '0.75rem' }}>
            Register New Business Development Manager
          </h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="e.g. Rachel Green" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input 
                className="form-input" 
                type="email" 
                placeholder="rachel@company.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Role Title</label>
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="Senior BD Manager">Senior BD Manager</option>
                <option value="Enterprise BD Lead">Enterprise BD Lead</option>
                <option value="Regional BD Executive">Regional BD Executive</option>
                <option value="Tech BD Specialist">Tech BD Specialist</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Monthly Target ($)</label>
              <input 
                className="form-input" 
                type="number" 
                step="5000"
                value={target} 
                onChange={(e) => setTarget(e.target.value)} 
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button className="btn btn-secondary btn-sm" type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" type="submit">
              Save BD Member
            </button>
          </div>
        </form>
      )}

      {/* BD Team Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {bds.map(bd => {
          const bdLeads = leads.filter(l => l.assignedBdId === bd.id);
          const activeLeads = bdLeads.filter(l => l.stage !== 'Closed Won' && l.stage !== 'Closed Lost');
          const pipelineVal = bdLeads.filter(l => l.stage !== 'Closed Won' && l.stage !== 'Closed Lost').reduce((sum, l) => sum + (l.value || 0), 0);
          const wonVal = bdLeads.filter(l => l.stage === 'Closed Won').reduce((sum, l) => sum + (l.value || 0), 0);
          const targetPct = Math.round((wonVal / (bd.target || 50000)) * 100);

          return (
            <div 
              key={bd.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              {/* BD Info Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: bd.color || '#059669',
                  color: '#ffffff',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem'
                }}>
                  {bd.avatar}
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>{bd.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{bd.role}</div>
                </div>
              </div>

              {/* Metrics Box */}
              <div style={{
                background: '#f8fafc',
                borderRadius: '0.5rem',
                padding: '0.75rem',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.5rem',
                fontSize: '0.8rem'
              }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.7rem' }}>Active Leads</span>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '1rem' }}>{activeLeads.length}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.7rem' }}>Pipeline Value</span>
                  <div style={{ fontWeight: '800', color: '#059669', fontSize: '1rem' }}>${pipelineVal.toLocaleString()}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.7rem' }}>Closed Won</span>
                  <div style={{ fontWeight: '800', color: '#047857' }}>${wonVal.toLocaleString()}</div>
                </div>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.7rem' }}>Monthly Target</span>
                  <div style={{ fontWeight: '700', color: '#334155' }}>${bd.target?.toLocaleString()}</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: '700', color: '#475569', marginBottom: '0.2rem' }}>
                  <span>Quota Achievement</span>
                  <span style={{ color: '#059669' }}>{targetPct}%</span>
                </div>
                <div className="progress-bar-bg" style={{ width: '100%', background: '#e2e8f0', height: '6px' }}>
                  <div className="progress-bar-fill" style={{ width: `${Math.min(targetPct, 100)}%`, background: '#059669' }}></div>
                </div>
              </div>

              {/* Assigned Leads Pill List */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.6rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>Assigned Accounts ({bdLeads.length}):</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.35rem' }}>
                  {bdLeads.length === 0 ? (
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>No leads assigned yet</span>
                  ) : (
                    bdLeads.map(l => (
                      <span key={l.id} style={{
                        fontSize: '0.7rem',
                        fontWeight: '600',
                        background: '#ecfdf5',
                        color: '#064e3b',
                        padding: '0.15rem 0.45rem',
                        borderRadius: '0.25rem',
                        border: '1px solid #a7f3d0'
                      }}>
                        {l.company}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
