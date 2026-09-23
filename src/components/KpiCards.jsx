import React from 'react';
import { 
  Users, 
  DollarSign, 
  Trophy, 
  Target, 
  CalendarClock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export default function KpiCards({ leads, targetData, pendingAgendaCount }) {
  const activeLeadsCount = leads.filter(l => l.stage !== 'Closed Won' && l.stage !== 'Closed Lost').length;
  
  const totalPipelineValue = leads
    .filter(l => l.stage !== 'Closed Won' && l.stage !== 'Closed Lost')
    .reduce((sum, l) => sum + (l.value || 0), 0);

  const wonDealsValue = leads
    .filter(l => l.stage === 'Closed Won')
    .reduce((sum, l) => sum + (l.value || 0), 0);

  const wonCount = leads.filter(l => l.stage === 'Closed Won').length;
  const lostCount = leads.filter(l => l.stage === 'Closed Lost').length;
  const closedTotal = wonCount + lostCount;
  const computedWinRate = closedTotal > 0 ? Math.round((wonCount / closedTotal) * 100) : 0;

  return (
    <div className="kpi-grid">
      {/* Active Leads */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Active Leads</span>
          <div className="kpi-icon-wrapper">
            <Users size={20} />
          </div>
        </div>
        <div className="kpi-value">{activeLeadsCount}</div>
        <div className="kpi-footer">
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> +14%
          </span>
          <span>vs last month</span>
        </div>
      </div>

      {/* Total Pipeline Value */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Pipeline Value</span>
          <div className="kpi-icon-wrapper">
            <DollarSign size={20} />
          </div>
        </div>
        <div className="kpi-value">${totalPipelineValue.toLocaleString()}</div>
        <div className="kpi-footer">
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> +22%
          </span>
          <span>active opportunities</span>
        </div>
      </div>

      {/* Revenue Won */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Closed Revenue</span>
          <div className="kpi-icon-wrapper">
            <Trophy size={20} />
          </div>
        </div>
        <div className="kpi-value">${(wonDealsValue + targetData.achieved).toLocaleString()}</div>
        <div className="kpi-footer">
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> 74%
          </span>
          <span>of monthly target</span>
        </div>
      </div>

      {/* Win Rate */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Deal Win Rate</span>
          <div className="kpi-icon-wrapper">
            <Target size={20} />
          </div>
        </div>
        <div className="kpi-value">{computedWinRate}%</div>
        <div className="kpi-footer">
          <span className="kpi-trend positive">
            <ArrowUpRight size={14} /> +4.2%
          </span>
          <span>benchmark standard</span>
        </div>
      </div>

      {/* Pending Follow-ups Today */}
      <div className="kpi-card">
        <div className="kpi-header">
          <span className="kpi-title">Pending Today</span>
          <div className="kpi-icon-wrapper">
            <CalendarClock size={20} />
          </div>
        </div>
        <div className="kpi-value" style={{ color: pendingAgendaCount > 0 ? '#059669' : '#64748b' }}>
          {pendingAgendaCount}
        </div>
        <div className="kpi-footer">
          <span className="kpi-trend positive" style={{ backgroundColor: '#ecfdf5', color: '#047857' }}>
            Actionable
          </span>
          <span>scheduled follow-ups</span>
        </div>
      </div>
    </div>
  );
}
