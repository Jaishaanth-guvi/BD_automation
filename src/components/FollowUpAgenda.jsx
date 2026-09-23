import React, { useState } from 'react';
import { 
  CalendarClock, 
  PhoneCall, 
  Mail, 
  Users, 
  Plus, 
  Check, 
  CheckCircle2, 
  Building2 
} from 'lucide-react';

export default function FollowUpAgenda({ agendaList, onToggleAgenda, onAddAgenda }) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Call');
  const [time, setTime] = useState('11:00 AM');
  const [priority, setPriority] = useState('High');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !title) return;
    onAddAgenda({
      id: Date.now(),
      company,
      contact,
      title,
      type,
      time,
      priority,
      done: false
    });
    setCompany('');
    setContact('');
    setTitle('');
    setShowAddForm(false);
  };

  const pendingItems = agendaList.filter(item => !item.done);
  const completedItems = agendaList.filter(item => item.done);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header bar */}
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
            <CalendarClock size={24} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0f172a' }}>
              Today's BD Follow-up Agenda
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              {pendingItems.length} pending tasks • {completedItems.length} completed
            </p>
          </div>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} />
          <span>Add Reminder</span>
        </button>
      </div>

      {/* Inline Quick Add Form */}
      {showAddForm && (
        <form onSubmit={handleSubmit} style={{
          background: '#f0fdf4',
          border: '1px solid #a7f3d0',
          borderRadius: '0.75rem',
          padding: '1.25rem'
        }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#064e3b', marginBottom: '0.75rem' }}>
            Schedule New Follow-up Task
          </h4>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Company Name *</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="e.g. Acme Corp" 
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
                placeholder="e.g. John Doe" 
                value={contact}
                onChange={(e) => setContact(e.target.value)} 
              />
            </div>
            <div className="form-group full-width">
              <label className="form-label">Action / Task Title *</label>
              <input 
                className="form-input" 
                type="text" 
                placeholder="e.g. Follow up on custom proposal feedback" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Activity Type</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Call">Phone Call</option>
                <option value="Email">Email Follow-up</option>
                <option value="Meeting">Demo / Meeting</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Scheduled Time</label>
              <input 
                className="form-input" 
                type="text" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
            <button className="btn btn-secondary btn-sm" type="button" onClick={() => setShowAddForm(false)}>
              Cancel
            </button>
            <button className="btn btn-primary btn-sm" type="submit">
              Save Follow-up Task
            </button>
          </div>
        </form>
      )}

      {/* Pending Items */}
      <div className="agenda-list">
        <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Pending Actions Today ({pendingItems.length})
        </h4>
        
        {pendingItems.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: '#ffffff', borderRadius: '0.6rem', border: '1px solid #e2e8f0', color: '#059669', fontWeight: '600' }}>
            🎉 All scheduled follow-ups completed for today!
          </div>
        ) : (
          pendingItems.map(item => (
            <div className="agenda-item" key={item.id}>
              <div className="agenda-left">
                <div 
                  className="checkbox-custom" 
                  onClick={() => onToggleAgenda(item.id)}
                  title="Mark as completed"
                ></div>
                <div>
                  <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.95rem' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span style={{ fontWeight: '600', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Building2 size={13} /> {item.company}
                    </span>
                    {item.contact && <span>({item.contact})</span>}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span className={`badge badge-priority-${item.priority}`}>
                  {item.priority}
                </span>

                <div style={{ fontSize: '0.8rem', fontWeight: '600', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#f8fafc', padding: '0.25rem 0.6rem', borderRadius: '0.4rem', border: '1px solid #e2e8f0' }}>
                  {item.type === 'Call' && <PhoneCall size={14} color="#059669" />}
                  {item.type === 'Email' && <Mail size={14} color="#059669" />}
                  {item.type === 'Meeting' && <Users size={14} color="#059669" />}
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Completed Items Section */}
        {completedItems.length > 0 && (
          <div style={{ marginTop: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '0.5rem' }}>
              Completed Today ({completedItems.length})
            </h4>
            {completedItems.map(item => (
              <div className="agenda-item completed" key={item.id}>
                <div className="agenda-left">
                  <div 
                    className="checkbox-custom checked" 
                    onClick={() => onToggleAgenda(item.id)}
                    title="Mark as pending"
                  >
                    <Check size={14} />
                  </div>
                  <div>
                    <div style={{ textDecoration: 'line-through', fontWeight: '600', color: '#64748b' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {item.company} • {item.contact}
                    </div>
                  </div>
                </div>
                <CheckCircle2 size={18} color="#059669" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
