import React, { useState } from 'react';
import { 
  Mail, 
  Sparkles, 
  ArrowUpDown, 
  Eye, 
  Trash2, 
  Calendar
} from 'lucide-react';
import { PIPELINE_STAGES } from '../data/mockData';

export default function LeadsTable({ 
  leads, 
  bds,
  onSelectLead, 
  onMoveStage, 
  onReassignBd,
  onDeleteLead,
  priorityFilter,
  setPriorityFilter,
  sourceFilter,
  setSourceFilter,
  bdFilter,
  setBdFilter
}) {
  const [sortField, setSortField] = useState('value');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredLeads = leads.filter(l => {
    const matchPriority = priorityFilter === 'ALL' || l.priority === priorityFilter;
    const matchSource = sourceFilter === 'ALL' || l.source === sourceFilter;
    const matchBd = bdFilter === 'ALL' || l.assignedBdId === bdFilter;
    return matchPriority && matchSource && matchBd;
  });

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const getStageConfig = (stageId) => {
    return PIPELINE_STAGES.find(s => s.id === stageId) || { color: '#64748b', badgeBg: '#f1f5f9' };
  };

  const getBd = (bdId) => {
    return bds.find(b => b.id === bdId) || { name: 'Unassigned', avatar: '?', color: '#94a3b8' };
  };

  return (
    <div className="table-container">
      {/* Table Header Bar */}
      <div className="table-header-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0f172a' }}>
            Lead Directory ({sortedLeads.length})
          </h3>
          
          <select 
            className="filter-select"
            value={bdFilter}
            onChange={(e) => setBdFilter(e.target.value)}
            style={{ fontWeight: '700', color: '#047857', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}
          >
            <option value="ALL">All BD Reps</option>
            {bds.map(bd => (
              <option key={bd.id} value={bd.id}>Assigned: {bd.name}</option>
            ))}
          </select>

          <select 
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          <select 
            className="filter-select"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="ALL">All Sources</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Website Lead">Website Lead</option>
            <option value="Referral">Referral</option>
            <option value="Industry Event">Industry Event</option>
            <option value="Cold Email Outreach">Cold Email</option>
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
          Click row to view details & activity timeline
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('company')}>
                Company & Contact <ArrowUpDown size={12} />
              </th>
              <th>Assigned BD</th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('stage')}>
                Pipeline Stage <ArrowUpDown size={12} />
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('value')}>
                Est. Deal Value <ArrowUpDown size={12} />
              </th>
              <th style={{ cursor: 'pointer' }} onClick={() => handleSort('leadScore')}>
                Score <ArrowUpDown size={12} />
              </th>
              <th>Priority</th>
              <th>Source</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedLeads.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#94a3b8' }}>
                  No matching leads found.
                </td>
              </tr>
            ) : (
              sortedLeads.map(lead => {
                const stageConfig = getStageConfig(lead.stage);
                const assignedBd = getBd(lead.assignedBdId);

                return (
                  <tr key={lead.id} onClick={() => onSelectLead(lead)} style={{ cursor: 'pointer' }}>
                    <td>
                      <div style={{ fontWeight: '700', color: '#0f172a', fontSize: '0.9rem' }}>
                        {lead.company}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '2px' }}>
                        <span>{lead.contactName}</span>
                        <span>•</span>
                        <Mail size={12} color="#94a3b8" />
                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{lead.email}</span>
                      </div>
                    </td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: assignedBd.color,
                          color: '#ffffff',
                          fontSize: '0.65rem',
                          fontWeight: '800',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {assignedBd.avatar}
                        </div>

                        <select 
                          value={lead.assignedBdId || ''}
                          onChange={(e) => onReassignBd(lead.id, e.target.value)}
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            padding: '0.2rem 0.4rem',
                            borderRadius: '0.35rem',
                            border: '1px solid #cbd5e1',
                            backgroundColor: '#ffffff',
                            color: '#0f172a'
                          }}
                        >
                          {bds.map(b => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                          ))}
                        </select>
                      </div>
                    </td>

                    <td onClick={(e) => e.stopPropagation()}>
                      <select 
                        className="quick-move-select"
                        value={lead.stage}
                        onChange={(e) => onMoveStage(lead.id, e.target.value)}
                        style={{ 
                          fontWeight: '700', 
                          color: stageConfig.color,
                          backgroundColor: stageConfig.badgeBg,
                          borderColor: stageConfig.color,
                          padding: '0.3rem 0.5rem'
                        }}
                      >
                        {PIPELINE_STAGES.map(s => (
                          <option key={s.id} value={s.id}>{s.title}</option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <span style={{ fontWeight: '800', color: '#047857', fontSize: '0.95rem' }}>
                        ${lead.value?.toLocaleString()}
                      </span>
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '700', color: '#059669' }}>
                        <Sparkles size={14} />
                        <span>{lead.leadScore}</span>
                      </div>
                    </td>

                    <td>
                      <span className={`badge badge-priority-${lead.priority}`}>
                        {lead.priority}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-source">
                        {lead.source}
                      </span>
                    </td>

                    <td style={{ textAlign: 'right' }} onClick={(e) => e.stopPropagation()}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => onSelectLead(lead)}
                          title="View Details"
                        >
                          <Eye size={14} color="#059669" />
                        </button>

                        <button 
                          className="btn btn-secondary btn-sm"
                          onClick={() => onDeleteLead(lead.id)}
                          title="Delete Lead"
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
