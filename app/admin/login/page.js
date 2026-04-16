'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Login failed');
      }
      router.push('/admin');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <form onSubmit={submit} className="admin-login__card">
        <div className="admin-login__brand">
          <span className="nav__brand-mark">E</span>
          <div>
            <strong>Elite-Path</strong>
            <span>Admin Panel</span>
          </div>
        </div>
        <h1>Sign in to edit your site</h1>
        <p>Enter the admin password to manage content, contacts, and design.</p>
        <label>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </label>
        {error && <div className="admin-login__error">{error}</div>}
        <button type="submit" className="btn btn--primary btn--lg btn--full" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
        <a href="/" className="admin-login__back">← Back to site</a>
      </form>
    </div>
  );
}
