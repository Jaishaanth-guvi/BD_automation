import React, { useState } from 'react';
import { 
  User, 
  Sparkles, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  Building2, 
  UserCheck, 
  ArrowRight,
  Eye,
  Layers,
  LayoutList
} from 'lucide-react';
import { PIPELINE_STAGES } from '../data/mockData';

export default function KanbanBoard({ 
  leads, 
  bds,
  onSelectLead, 
  onMoveStage, 
  onReassignBd,
  priorityFilter, 
  setPriorityFilter,
  sourceFilter,
  setSourceFilter,
  bdFilter,
  setBdFilter
}) {
  // Collapsed state for stage banners
  const [collapsedStages, setCollapsedStages] = useState({});

  const toggleStageCollapse = (stageId) => {
    setCollapsedStages(prev => ({
      ...prev,
      [stageId]: !prev[stageId]
    }));
  };

  // Filter leads based on current controls
  const filteredLeads = leads.filter(l => {
    const matchPriority = priorityFilter === 'ALL' || l.priority === priorityFilter;
    const matchSource = sourceFilter === 'ALL' || l.source === sourceFilter;
    const matchBd = bdFilter === 'ALL' || l.assignedBdId === bdFilter;
    return matchPriority && matchSource && matchBd;
  });

  const getBd = (bdId) => {
    return bds.find(b => b.id === bdId) || { name: 'Unassigned', avatar: '?', color: '#94a3b8' };
  };

  const totalPipelineValue = filteredLeads.reduce((sum, l) => sum + (l.value || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Pipeline Controls Bar */}
      <div className="kanban-controls">
        <div className="filter-group">
          <Filter size={16} color="#059669" />
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0f172a' }}>Pipeline Filters:</span>
          
          {/* BD Team Filter */}
          <select 
            className="filter-select"
            value={bdFilter}
            onChange={(e) => setBdFilter(e.target.value)}
            style={{ fontWeight: '700', color: '#047857', backgroundColor: '#ecfdf5', borderColor: '#a7f3d0' }}
          >
            <option value="ALL">All BD Reps</option>
            {bds.map(bd => (
              <option key={bd.id} value={bd.id}>Assigned BD: {bd.name}</option>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ background: '#ecfdf5', padding: '0.35rem 0.85rem', borderRadius: '0.5rem', border: '1px solid #a7f3d0' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#047857' }}>
              Total Active Pipeline: ${totalPipelineValue.toLocaleString()}
            </span>
          </div>

          <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
            Showing {filteredLeads.length} total deals
          </div>
        </div>
      </div>

      {/* PIPELINE BANNER LIST CONTAINER */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {PIPELINE_STAGES.map(stage => {
          const stageLeads = filteredLeads.filter(l => l.stage === stage.id);
          const stageTotalVal = stageLeads.reduce((sum, l) => sum + (l.value || 0), 0);
          const isCollapsed = collapsedStages[stage.id];

          return (
            <div 
              key={stage.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}
            >
              {/* STAGE BANNER STRIP HEADER */}
              <div 
                onClick={() => toggleStageCollapse(stage.id)}
                style={{
                  background: `linear-gradient(90deg, ${stage.color}15 0%, #ffffff 100%)`,
                  borderLeft: `6px solid ${stage.color}`,
                  padding: '0.9rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  borderBottom: isCollapsed ? 'none' : '1px solid #e2e8f0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: stage.color,
                    boxShadow: `0 0 8px ${stage.color}`
                  }}></span>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.01em' }}>
                      {stage.title}
                    </h3>
                  </div>
                  <span style={{
                    backgroundColor: stage.color,
                    color: '#ffffff',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    padding: '0.15rem 0.65rem',
                    borderRadius: '1rem'
                  }}>
                    {stageLeads.length} {stageLeads.length === 1 ? 'Deal' : 'Deals'}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Stage Volume</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#047857' }}>
                      ${stageTotalVal.toLocaleString()}
                    </div>
                  </div>

                  <div style={{ color: '#64748b', background: '#f1f5f9', padding: '0.25rem', borderRadius: '0.375rem' }}>
                    {isCollapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
                  </div>
                </div>
              </div>

              {/* STAGE BANNER LIST ITEMS */}
              {!isCollapsed && (
                <div style={{ padding: '0.75rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.65rem', background: '#f8fafc' }}>
                  {stageLeads.length === 0 ? (
                    <div style={{ 
                      padding: '1.25rem', 
                      textAlign: 'center', 
                      color: '#94a3b8', 
                      fontSize: '0.82rem',
                      background: '#ffffff',
                      border: '1px dashed #cbd5e1',
                      borderRadius: '0.5rem'
                    }}>
                      No active leads currently in <strong>{stage.title}</strong>
                    </div>
                  ) : (
                    stageLeads.map(lead => {
                      const assignedBd = getBd(lead.assignedBdId);

                      return (
                        <div 
                          key={lead.id}
                          onClick={() => onSelectLead(lead)}
                          style={{
                            background: '#ffffff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.6rem',
                            padding: '0.85rem 1.15rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer',
                            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                            flexWrap: 'wrap',
                            gap: '0.85rem'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = '#059669';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.08)';
                            e.currentTarget.style.transform = 'translateX(3px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = '#e2e8f0';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                            e.currentTarget.style.transform = 'translateX(0)';
                          }}
                        >
                          {/* Banner Item Left: Company & Contact */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '240px', flex: '1.2' }}>
                            <div style={{
                              background: '#ecfdf5',
                              color: '#047857',
                              padding: '0.6rem',
                              borderRadius: '0.5rem',
                              border: '1px solid #a7f3d0'
                            }}>
                              <Building2 size={20} />
                            </div>
                            <div>
                              <div style={{ fontWeight: '800', fontSize: '0.95rem', color: '#0f172a' }}>
                                {lead.company}
                              </div>
                              <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.15rem' }}>
                                <User size={13} color="#94a3b8" />
                                <span>{lead.contactName} ({lead.title || 'Decision Maker'})</span>
                              </div>
                            </div>
                          </div>

                          {/* Banner Item Middle: Assigned BD */}
                          <div 
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', minWidth: '180px' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div style={{
                              width: '26px',
                              height: '26px',
                              borderRadius: '50%',
                              background: assignedBd.color,
                              color: '#ffffff',
                              fontSize: '0.7rem',
                              fontWeight: '800',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {assignedBd.avatar}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>ASSIGNED BD</div>
                              <select 
                                value={lead.assignedBdId || ''}
                                onChange={(e) => onReassignBd(lead.id, e.target.value)}
                                style={{
                                  fontSize: '0.78rem',
                                  fontWeight: '700',
                                  padding: '0.15rem 0.35rem',
                                  borderRadius: '0.3rem',
                                  border: '1px solid #cbd5e1',
                                  background: '#ffffff',
                                  color: '#047857',
                                  outline: 'none'
                                }}
                              >
                                {bds.map(b => (
                                  <option key={b.id} value={b.id}>{b.name}</option>
                                ))}
                              </select>
                            </div>
                          </div>

                          {/* Banner Item Tags: Priority & Source & Score */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <span className={`badge badge-priority-${lead.priority}`}>
                              {lead.priority} Priority
                            </span>
                            <span className="badge badge-source">
                              {lead.source}
                            </span>
                            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#059669', display: 'flex', alignItems: 'center', gap: '0.2rem', background: '#ecfdf5', padding: '0.2rem 0.5rem', borderRadius: '0.3rem', border: '1px solid #a7f3d0' }}>
                              <Sparkles size={12} /> {lead.leadScore} Score
                            </span>
                          </div>

                          {/* Banner Item Right: Deal Value & Move Stage Selector */}
                          <div 
                            style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'flex-end', minWidth: '220px' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div style={{ textAlign: 'right' }}>
                              <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>DEAL VALUE</span>
                              <div style={{ fontWeight: '800', fontSize: '1rem', color: '#047857' }}>
                                ${lead.value?.toLocaleString()}
                              </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                              <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: '700' }}>STAGE ACTION</span>
                              <select 
                                className="quick-move-select"
                                value={lead.stage}
                                onChange={(e) => onMoveStage(lead.id, e.target.value)}
                                style={{
                                  fontWeight: '700',
                                  color: stage.color,
                                  borderColor: stage.color,
                                  backgroundColor: '#ffffff',
                                  padding: '0.3rem 0.5rem',
                                  borderRadius: '0.35rem'
                                }}
                              >
                                {PIPELINE_STAGES.map(s => (
                                  <option key={s.id} value={s.id}>Move to: {s.title}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
