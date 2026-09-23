import React, { useState } from 'react';
import { TrendingUp, User, KeyRound, LogIn, CheckCircle, AlertCircle } from 'lucide-react';

export default function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:8001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        onLoginSuccess(data.user);
      } else {
        setError(data.detail || 'Invalid username or password');
      }
    } catch (err) {
      // Local fallback validation
      const u = username.trim().toLowerCase();
      if ((u === 'admin' || u === 'admoin') && password === 'admin') {
        onLoginSuccess({
          username: 'admin',
          name: 'Alex Rivers',
          role: 'Senior BD Manager',
          email: 'alex.r@company.com'
        });
      } else {
        setError('Invalid credentials. Use Username: admin and Password: admin');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 30%, #ecfdf5 0%, #064e3b 100%)',
      padding: '1.5rem',
      fontFamily: "'Plus Jakarta Sans', sans-serif"
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '1rem',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
        border: '1px solid #a7f3d0'
      }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
            width: '56px',
            height: '56px',
            borderRadius: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            boxShadow: '0 8px 16px rgba(5, 150, 105, 0.3)'
          }}>
            <TrendingUp size={30} color="#ffffff" />
          </div>

          <h1 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#064e3b', letterSpacing: '-0.02em' }}>
            STRATIS BD PRO
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
            Sign in to access your BD Lead & Pipeline Intelligence
          </p>
        </div>

        {/* Demo Helper Badge */}
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #a7f3d0',
          borderRadius: '0.6rem',
          padding: '0.75rem 1rem',
          marginBottom: '1.5rem',
          fontSize: '0.8rem',
          color: '#047857',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle size={18} color="#059669" />
          <div>
            <strong>Authorized Login Credentials:</strong>
            <div style={{ marginTop: '0.1rem', fontSize: '0.78rem' }}>
              Username: <code style={{ background: '#d1fae5', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontWeight: '700' }}>admin</code> (or <code style={{ background: '#d1fae5', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontWeight: '700' }}>admoin</code>) | Password: <code style={{ background: '#d1fae5', padding: '0.1rem 0.3rem', borderRadius: '0.2rem', fontWeight: '700' }}>admin</code>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: '0.5rem',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            fontSize: '0.82rem',
            color: '#991b1b',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={18} color="#dc2626" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.4rem', width: '100%', fontSize: '0.9rem' }}
                placeholder="Enter username (admin)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <KeyRound size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="password"
                className="form-input"
                style={{ paddingLeft: '2.4rem', width: '100%', fontSize: '0.9rem' }}
                placeholder="Enter password (admin)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
            style={{ 
              padding: '0.75rem', 
              fontSize: '0.95rem', 
              marginTop: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <LogIn size={18} />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
