import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  TrendingUp, 
  PieChart as PieIcon, 
  Layers, 
  Sparkles, 
  Zap 
} from 'lucide-react';
import { REVENUE_FORECAST_DATA, LEAD_SOURCE_DATA, PIPELINE_STAGES } from '../data/mockData';

export default function AnalyticsView({ leads }) {
  const stageCounts = PIPELINE_STAGES.map(stage => {
    const count = leads.filter(l => l.stage === stage.id).length;
    const value = leads.filter(l => l.stage === stage.id).reduce((sum, l) => sum + (l.value || 0), 0);
    return { name: stage.title, count, value, color: stage.color };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #064e3b 0%, #059669 100%)',
        color: '#ffffff',
        borderRadius: '0.75rem',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 12px rgba(5, 150, 105, 0.2)'
      }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800' }}>BD Sales Performance & Revenue Forecast</h2>
          <p style={{ fontSize: '0.85rem', color: '#a7f3d0', marginTop: '0.2rem' }}>
            Real-time analytics on lead sources, stage velocities, and monthly target trajectories.
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.6rem 1.1rem', borderRadius: '0.5rem', textAlign: 'right' }}>
          <span style={{ fontSize: '0.75rem', color: '#d1fae5', display: 'block' }}>Q3 Revenue Run Rate</span>
          <span style={{ fontSize: '1.2rem', fontWeight: '800' }}>$1,040,000 / yr</span>
        </div>
      </div>

      <div className="analytics-grid">
        {/* Revenue Forecast Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">
              <TrendingUp size={18} color="#059669" />
              <span>Revenue Target vs Actual ($)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Monthly Trend</span>
          </div>

          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_FORECAST_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPipeline" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a7f3d0" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#a7f3d0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
                <Legend />
                <Area type="monotone" dataKey="actual" name="Closed Revenue" stroke="#059669" fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="pipeline" name="Pipeline Created" stroke="#10b981" fillOpacity={1} fill="url(#colorPipeline)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Distribution Chart */}
        <div className="chart-card">
          <div className="chart-card-header">
            <div className="chart-card-title">
              <PieIcon size={18} color="#059669" />
              <span>Lead Source Breakdown (%)</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Channel Attribution</span>
          </div>

          <div style={{ width: '100%', height: 300, display: 'flex', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={LEAD_SOURCE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {LEAD_SOURCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => [`${val}%`, 'Lead Share']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Stage Breakdown & Funnel Velocity */}
      <div className="chart-card">
        <div className="chart-card-header">
          <div className="chart-card-title">
            <Layers size={18} color="#059669" />
            <span>Pipeline Stage Volume & Monetary Value</span>
          </div>
        </div>

        <div style={{ width: '100%', height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stageCounts} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis yAxisId="left" stroke="#059669" fontSize={12} orientation="left" name="Deal Count" />
              <YAxis yAxisId="right" stroke="#047857" fontSize={12} orientation="right" tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="count" name="Number of Deals" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="value" name="Total Stage Value ($)" fill="#064e3b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights & BD Recommendations */}
      <div style={{ 
        background: '#ecfdf5',
        border: '1px solid #a7f3d0',
        borderRadius: '0.75rem',
        padding: '1.25rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ background: '#059669', color: '#fff', padding: '0.5rem', borderRadius: '0.5rem', height: 'max-content' }}>
            <Sparkles size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#064e3b' }}>High Lead Conversion Source</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.25rem' }}>
              LinkedIn Outreach yields the highest lead quality score (84 avg) with a 42% proposal transition rate.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <div style={{ background: '#10b981', color: '#fff', padding: '0.5rem', borderRadius: '0.5rem', height: 'max-content' }}>
            <Zap size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#064e3b' }}>Deal Velocity Tip</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857', marginTop: '0.25rem' }}>
              Deals in "Proposal Sent" take an average of 4.2 days to convert to Negotiation when followed up within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
