import React, { useState } from 'react';
import { X, Building2, Plus, Sparkles } from 'lucide-react';
import { PIPELINE_STAGES } from '../data/mockData';

export default function AddLeadModal({ isOpen, onClose, onAddLead }) {
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [value, setValue] = useState(50000);
  const [stage, setStage] = useState('New Lead');
  const [priority, setPriority] = useState('High');
  const [source, setSource] = useState('LinkedIn');
  const [leadScore, setLeadScore] = useState(75);
  const [nextFollowUp, setNextFollowUp] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !contactName || !email) return;

    const newLead = {
      id: `LD-${Math.floor(1000 + Math.random() * 9000)}`,
      company,
      contactName,
      title,
      email,
      phone,
      value: Number(value),
      stage,
      priority,
      source,
      leadScore: Number(leadScore),
      createdAt: new Date().toISOString().split('T')[0],
      lastContactDate: new Date().toISOString().split('T')[0],
      nextFollowUp,
      notes,
      activities: [
        {
          id: Date.now(),
          type: 'Call',
          title: 'Lead Created in CRM',
          date: new Date().toISOString().split('T')[0],
          note: `New lead added via BD Dashboard. Source: ${source}.`
        }
      ]
    };

    onAddLead(newLead);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <Building2 size={20} color="#059669" />
            <span>Add New BD Lead Opportunity</span>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Company / Account Name *</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="e.g. Nexus Software" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Primary Contact Person *</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="e.g. Alex Morgan" 
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Job Title / Role</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="e.g. VP of Sales" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  className="form-input" 
                  type="email" 
                  placeholder="alex@nexus.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="+1 (555) 019-2834" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Estimated Deal Value ($)</label>
                <input 
                  className="form-input" 
                  type="number" 
                  step="1000"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Initial Pipeline Stage</label>
                <select className="form-select" value={stage} onChange={(e) => setStage(e.target.value)}>
                  {PIPELINE_STAGES.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Priority Level</label>
                <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Lead Source</label>
                <select className="form-select" value={source} onChange={(e) => setSource(e.target.value)}>
                  <option value="LinkedIn">LinkedIn Outreach</option>
                  <option value="Website Lead">Website Lead</option>
                  <option value="Referral">Referral</option>
                  <option value="Industry Event">Industry Event</option>
                  <option value="Cold Email Outreach">Cold Email Outreach</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Calculated Lead Score (0 - 100)</label>
                <input 
                  className="form-input" 
                  type="number" 
                  min="0"
                  max="100"
                  value={leadScore}
                  onChange={(e) => setLeadScore(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">First Follow-up Date</label>
                <input 
                  className="form-input" 
                  type="date" 
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)} 
                />
              </div>

              <div className="form-group full-width">
                <label className="form-label">Initial Qualification Notes</label>
                <textarea 
                  className="form-textarea" 
                  rows="3"
                  placeholder="Key background info, deal requirements, or introductory context..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              <Plus size={16} />
              <span>Create Lead</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
