import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../lib/api';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/login', form);
      localStorage.setItem('apollo_admin_token', res.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Đăng nhập thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/">
            <span className="font-playfair text-4xl font-bold text-white">
              <span className="text-gold">APOLLO</span> SPA
            </span>
          </Link>
          <p className="text-dark-500 text-xs mt-2 tracking-[0.3em] uppercase">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-dark-900 border border-dark-700 p-8 space-y-5">
          <h2 className="font-playfair text-xl text-white mb-2">Đăng nhập quản trị</h2>
          <div className="w-8 h-px bg-gold mb-6" />

          {error && (
            <div className="bg-red-950/50 border border-red-800 text-red-300 text-sm px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label className="block text-dark-400 text-xs uppercase tracking-wider mb-2">
              Tên đăng nhập
            </label>
            <input
              type="text"
              value={form.username}
              onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
              className="w-full bg-dark-800 border border-dark-600 text-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-dark-400 text-xs uppercase tracking-wider mb-2">
              Mật khẩu
            </label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              className="w-full bg-dark-800 border border-dark-600 text-white px-4 py-3 text-sm focus:border-gold focus:outline-none transition-colors"
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-dark-500 hover:text-gold text-xs transition-colors">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
