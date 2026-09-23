import React from 'react';
import { 
  TrendingUp, 
  Search, 
  Bell, 
  Kanban, 
  Table, 
  BarChart3, 
  CalendarCheck,
  Users,
  BellRing,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  targetData, 
  searchTerm, 
  setSearchTerm,
  pendingAgendaCount,
  urgentAlertCount,
  bdCount,
  user,
  onLogout
}) {
  const percentAchieved = Math.round((targetData.achieved / targetData.target) * 100);

  return (
    <header className="header-wrapper">
      {/* Top Main Green Header */}
      <div className="top-header">
        <div className="header-brand">
          <div className="brand-icon">
            <TrendingUp size={24} color="#ffffff" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span className="brand-title">STRATIS BD</span>
              <span className="brand-badge">PRO</span>
            </div>
            <span style={{ fontSize: '0.7rem', color: '#a7f3d0' }}>Lead & Pipeline Intelligence</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="header-search">
          <Search size={16} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search leads, companies, contacts..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Target & User Profile */}
        <div className="header-actions">
          {/* Target Widget */}
          <div className="target-widget">
            <div>
              <div className="target-text">{targetData.month} Goal</div>
              <div className="target-val">${targetData.achieved.toLocaleString()} / ${targetData.target.toLocaleString()}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#34d399' }}>{percentAchieved}%</span>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${Math.min(percentAchieved, 100)}%` }}></div>
              </div>
            </div>
          </div>

          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setActiveTab('alerts')}>
            <Bell size={20} color="#ffffff" />
            {urgentAlertCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: '700',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {urgentAlertCount}
              </span>
            )}
          </div>

          <div className="user-profile">
            <div className="avatar">AR</div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'Alex Rivers'}</span>
              <span className="user-role">{user?.role || 'Sr. BD Manager'}</span>
            </div>

            <button 
              onClick={onLogout}
              title="Logout"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#ffffff',
                padding: '0.35rem',
                borderRadius: '0.4rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: '0.5rem'
              }}
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Bar */}
      <nav className="nav-bar">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'kanban' ? 'active' : ''}`}
            onClick={() => setActiveTab('kanban')}
          >
            <Kanban size={18} />
            <span>Pipeline Kanban</span>
          </button>

          <button 
            className={`nav-tab ${activeTab === 'table' ? 'active' : ''}`}
            onClick={() => setActiveTab('table')}
          >
            <Table size={18} />
            <span>All Leads List</span>
          </button>

          <button 
            className={`nav-tab ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            <BellRing size={18} />
            <span>BD Alerts & Calls</span>
            {urgentAlertCount > 0 && (
              <span style={{ 
                background: '#ef4444', 
                color: '#fff', 
                fontSize: '0.7rem', 
                padding: '0.1rem 0.45rem', 
                borderRadius: '1rem',
                marginLeft: '0.2rem' 
              }}>
                {urgentAlertCount} Alert
              </span>
            )}
          </button>

          <button 
            className={`nav-tab ${activeTab === 'bds' ? 'active' : ''}`}
            onClick={() => setActiveTab('bds')}
          >
            <Users size={18} />
            <span>BD Team & Assignments</span>
            <span style={{ 
              background: '#059669', 
              color: '#fff', 
              fontSize: '0.7rem', 
              padding: '0.1rem 0.45rem', 
              borderRadius: '1rem',
              marginLeft: '0.2rem' 
            }}>
              {bdCount}
            </span>
          </button>

          <button 
            className={`nav-tab ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={18} />
            <span>Revenue Analytics</span>
          </button>

          <button 
            className={`nav-tab ${activeTab === 'agenda' ? 'active' : ''}`}
            onClick={() => setActiveTab('agenda')}
          >
            <CalendarCheck size={18} />
            <span>Today's Follow-ups</span>
            {pendingAgendaCount > 0 && (
              <span style={{ 
                background: '#059669', 
                color: '#fff', 
                fontSize: '0.7rem', 
                padding: '0.1rem 0.45rem', 
                borderRadius: '1rem',
                marginLeft: '0.2rem' 
              }}>
                {pendingAgendaCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
