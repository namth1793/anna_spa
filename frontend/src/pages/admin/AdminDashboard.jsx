import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../lib/api';

const STATUS_COLORS = {
  pending:   'bg-yellow-900/40 text-yellow-400 border border-yellow-700',
  confirmed: 'bg-blue-900/40 text-blue-400 border border-blue-700',
  completed: 'bg-green-900/40 text-green-400 border border-green-700',
  cancelled: 'bg-red-900/40 text-red-400 border border-red-700',
};
const STATUS_LABELS = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  completed: 'Hoàn thành',
  cancelled: 'Huỷ',
};

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('apollo_admin_token')}` };
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('bookings');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newT, setNewT] = useState({ name: '', country: '', flag: '🌍', rating: 5, content: '' });
  const navigate = useNavigate();

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const headers = authHeaders();
      const [b, c, t] = await Promise.all([
        api.get('/api/bookings', { headers }),
        api.get('/api/contact', { headers }),
        api.get('/api/testimonials'),
      ]);
      setBookings(b.data);
      setContacts(c.data);
      setTestimonials(t.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('apollo_admin_token');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const logout = () => {
    localStorage.removeItem('apollo_admin_token');
    navigate('/admin/login');
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/api/bookings/${id}/status`, { status }, { headers: authHeaders() });
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  };

  const deleteBooking = async (id) => {
    if (!window.confirm('Xoá lịch hẹn này?')) return;
    await api.delete(`/api/bookings/${id}`, { headers: authHeaders() });
    setBookings(prev => prev.filter(b => b.id !== id));
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Xoá tin nhắn này?')) return;
    await api.delete(`/api/contact/${id}`, { headers: authHeaders() });
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm('Xoá đánh giá này?')) return;
    await api.delete(`/api/testimonials/${id}`, { headers: authHeaders() });
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const addTestimonial = async (e) => {
    e.preventDefault();
    const res = await api.post('/api/testimonials', newT, { headers: authHeaders() });
    setTestimonials(prev => [...prev, { ...newT, id: res.data.id, created_at: new Date().toISOString() }]);
    setNewT({ name: '', country: '', flag: '🌍', rating: 5, content: '' });
    setShowAddForm(false);
  };

  const fmtDate = (str) => new Date(str).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
  });
  const fmtDateTime = (str) => new Date(str).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  const TABS = [
    { key: 'bookings',     label: 'Đặt lịch',  count: bookings.length },
    { key: 'contacts',     label: 'Liên hệ',   count: contacts.length },
    { key: 'testimonials', label: 'Đánh giá',  count: testimonials.length },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-white font-inter">
      {/* Header */}
      <header className="bg-dark-900 border-b border-dark-700 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-playfair text-2xl font-bold">
            <span className="text-gold">APOLLO</span> SPA
          </Link>
          <span className="text-[10px] bg-gold/20 text-gold border border-gold/30 px-2 py-0.5 uppercase tracking-widest rounded-sm">
            Admin
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 text-dark-400 hover:text-gold text-sm transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
          </svg>
          Đăng xuất
        </button>
      </header>

      {/* Tabs */}
      <div className="bg-dark-900 border-b border-dark-700 px-6">
        <div className="flex">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                tab === t.key
                  ? 'border-gold text-gold'
                  : 'border-transparent text-dark-400 hover:text-white'
              }`}
            >
              {t.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                tab === t.key ? 'bg-gold/20 text-gold' : 'bg-dark-700 text-dark-400'
              }`}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <main className="p-6 max-w-7xl mx-auto">
        {loading && (
          <div className="text-center text-dark-400 py-32">Đang tải dữ liệu...</div>
        )}

        {/* ===== BOOKINGS ===== */}
        {!loading && tab === 'bookings' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-xl">Quản lý đặt lịch</h2>
              <span className="text-dark-400 text-sm">{bookings.length} lịch hẹn</span>
            </div>
            {bookings.length === 0 ? (
              <div className="text-center text-dark-500 py-32">Chưa có lịch đặt nào.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-dark-700 text-dark-400 text-xs uppercase tracking-wider">
                      <th className="text-left py-3 px-4 font-medium">ID</th>
                      <th className="text-left py-3 px-4 font-medium">Khách hàng</th>
                      <th className="text-left py-3 px-4 font-medium">Dịch vụ</th>
                      <th className="text-left py-3 px-4 font-medium">Ngày / Giờ</th>
                      <th className="text-left py-3 px-4 font-medium">Ngày đặt</th>
                      <th className="text-left py-3 px-4 font-medium">Trạng thái</th>
                      <th className="text-left py-3 px-4 font-medium">Ghi chú</th>
                      <th className="py-3 px-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr key={b.id} className="border-b border-dark-800 hover:bg-dark-900/60 transition-colors">
                        <td className="py-3 px-4 text-dark-500 text-xs">#{b.id}</td>
                        <td className="py-3 px-4">
                          <div className="text-white font-medium">{b.name}</div>
                          <div className="text-dark-400 text-xs mt-0.5">{b.phone}</div>
                          {b.email && <div className="text-dark-500 text-xs">{b.email}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white">{b.service}</div>
                          <div className="text-dark-400 text-xs mt-0.5">{b.duration}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-white">{b.date}</div>
                          <div className="text-dark-400 text-xs mt-0.5">{b.time}</div>
                        </td>
                        <td className="py-3 px-4 text-dark-400 text-xs">{fmtDate(b.created_at)}</td>
                        <td className="py-3 px-4">
                          <select
                            value={b.status || 'pending'}
                            onChange={e => updateStatus(b.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded bg-transparent cursor-pointer ${STATUS_COLORS[b.status] || STATUS_COLORS.pending}`}
                          >
                            {Object.entries(STATUS_LABELS).map(([v, l]) => (
                              <option key={v} value={v} className="bg-dark-900 text-white">{l}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-3 px-4 text-dark-400 text-xs max-w-[160px]">
                          <span className="line-clamp-2">{b.notes || '—'}</span>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="text-red-500 hover:text-red-400 text-xs transition-colors"
                          >
                            Xoá
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ===== CONTACTS ===== */}
        {!loading && tab === 'contacts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-xl">Tin nhắn liên hệ</h2>
              <span className="text-dark-400 text-sm">{contacts.length} tin nhắn</span>
            </div>
            {contacts.length === 0 ? (
              <div className="text-center text-dark-500 py-32">Chưa có tin nhắn nào.</div>
            ) : (
              <div className="space-y-4">
                {contacts.map(c => (
                  <div key={c.id} className="bg-dark-900 border border-dark-700 hover:border-dark-600 transition-colors p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <span className="text-white font-medium">{c.name}</span>
                          <span className="text-dark-600 text-xs">#{c.id}</span>
                          {c.subject && (
                            <span className="text-gold text-xs border border-gold/30 px-2 py-0.5">
                              {c.subject}
                            </span>
                          )}
                          <span className="text-dark-500 text-xs ml-auto">{fmtDateTime(c.created_at)}</span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-xs text-dark-400 mb-3">
                          <span>{c.email}</span>
                          {c.phone && <span>{c.phone}</span>}
                        </div>
                        <p className="text-dark-300 text-sm leading-relaxed">{c.message}</p>
                      </div>
                      <button
                        onClick={() => deleteContact(c.id)}
                        className="text-red-500 hover:text-red-400 text-xs transition-colors shrink-0 mt-1"
                      >
                        Xoá
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===== TESTIMONIALS ===== */}
        {!loading && tab === 'testimonials' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-playfair text-xl">Quản lý đánh giá</h2>
              <button
                onClick={() => setShowAddForm(v => !v)}
                className="btn-gold text-xs py-2 px-5"
              >
                {showAddForm ? 'Huỷ' : '+ Thêm đánh giá'}
              </button>
            </div>

            {showAddForm && (
              <form onSubmit={addTestimonial} className="bg-dark-900 border border-gold/30 p-6 mb-6 space-y-4">
                <h3 className="font-playfair text-gold text-lg">Thêm đánh giá mới</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-dark-400 text-xs uppercase tracking-wider mb-1.5">Tên khách *</label>
                    <input
                      value={newT.name}
                      onChange={e => setNewT(p => ({ ...p, name: e.target.value }))}
                      className="w-full bg-dark-800 border border-dark-600 text-white px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-dark-400 text-xs uppercase tracking-wider mb-1.5">Quốc gia</label>
                    <input
                      value={newT.country}
                      onChange={e => setNewT(p => ({ ...p, country: e.target.value }))}
                      className="w-full bg-dark-800 border border-dark-600 text-white px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      placeholder="VD: Vietnam"
                    />
                  </div>
                  <div>
                    <label className="block text-dark-400 text-xs uppercase tracking-wider mb-1.5">Emoji cờ</label>
                    <input
                      value={newT.flag}
                      onChange={e => setNewT(p => ({ ...p, flag: e.target.value }))}
                      className="w-full bg-dark-800 border border-dark-600 text-white px-3 py-2 text-sm focus:border-gold focus:outline-none"
                      placeholder="🇻🇳"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-dark-400 text-xs uppercase tracking-wider mb-1.5">Nội dung *</label>
                  <textarea
                    value={newT.content}
                    onChange={e => setNewT(p => ({ ...p, content: e.target.value }))}
                    rows={3}
                    className="w-full bg-dark-800 border border-dark-600 text-white px-3 py-2 text-sm focus:border-gold focus:outline-none resize-none"
                    required
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-dark-400 text-xs uppercase tracking-wider">Số sao:</label>
                  <select
                    value={newT.rating}
                    onChange={e => setNewT(p => ({ ...p, rating: Number(e.target.value) }))}
                    className="bg-dark-800 border border-dark-600 text-white px-3 py-2 text-sm focus:border-gold focus:outline-none"
                  >
                    {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} sao</option>)}
                  </select>
                  <button type="submit" className="btn-gold text-xs py-2 px-6 ml-auto">Lưu đánh giá</button>
                </div>
              </form>
            )}

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-dark-700 text-dark-400 text-xs uppercase tracking-wider">
                    <th className="text-left py-3 px-4 font-medium">ID</th>
                    <th className="text-left py-3 px-4 font-medium">Khách hàng</th>
                    <th className="text-left py-3 px-4 font-medium">Sao</th>
                    <th className="text-left py-3 px-4 font-medium">Nội dung</th>
                    <th className="text-left py-3 px-4 font-medium">Ngày</th>
                    <th className="py-3 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map(t => (
                    <tr key={t.id} className="border-b border-dark-800 hover:bg-dark-900/60 transition-colors">
                      <td className="py-3 px-4 text-dark-500 text-xs">#{t.id}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{t.flag}</span>
                          <div>
                            <div className="text-white font-medium">{t.name}</div>
                            <div className="text-dark-400 text-xs">{t.country}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-gold">{'★'.repeat(t.rating)}</span>
                        <span className="text-dark-700">{'★'.repeat(5 - t.rating)}</span>
                      </td>
                      <td className="py-3 px-4 text-dark-300 max-w-xs">
                        <p className="truncate">{t.content}</p>
                      </td>
                      <td className="py-3 px-4 text-dark-400 text-xs">{fmtDate(t.created_at)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteTestimonial(t.id)}
                          className="text-red-500 hover:text-red-400 text-xs transition-colors"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
