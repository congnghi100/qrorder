import { useState } from 'react';
import { User, Lock, LogOut, Users, Plus, Key, Edit, Trash2 } from 'lucide-react';

export const AdminProfileView = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'accounts'>('profile');

  const mockAdminAccounts = [
    { id: 1, username: 'admin', name: 'Quản trị viên', role: 'Super Admin', active: true },
    { id: 2, username: 'manager1', name: 'Quản lý Ca 1', role: 'Manager', active: true },
    { id: 3, username: 'cashier_vip', name: 'Thu ngân VIP', role: 'Cashier', active: false },
  ];

  return (
    <div className="pt-6 px-5 pb-24 h-full flex flex-col bg-slate-50">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Cài đặt & Tài khoản</h2>

      {/* Tabs */}
      <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'profile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          Cá nhân
        </button>
        <button 
          onClick={() => setActiveTab('accounts')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'accounts' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          Quản lý NV
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {activeTab === 'profile' ? (
          <div className="space-y-6">
            {/* Profile Info */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <User size={32} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Nguyen Van Admin</h3>
                <p className="text-slate-500 text-sm">Super Admin • #EMP001</p>
                <div className="inline-block mt-2 bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                  Đang hoạt động
                </div>
              </div>
            </div>

            {/* Change Password Form */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
              <div className="flex items-center gap-2 mb-4 text-slate-900">
                <Lock size={18} />
                <h3 className="font-bold">Đổi mật khẩu</h3>
              </div>
              <div className="space-y-3">
                <input 
                  type="password" 
                  placeholder="Mật khẩu hiện tại" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <input 
                  type="password" 
                  placeholder="Mật khẩu mới" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <input 
                  type="password" 
                  placeholder="Nhập lại mật khẩu mới" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
                <button className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl mt-2 active:bg-slate-800 transition-colors">
                  Cập nhật mật khẩu
                </button>
              </div>
            </div>

            {/* Logout */}
            <button className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 font-bold py-4 rounded-xl border border-rose-100 active:bg-rose-100 transition-colors">
              <LogOut size={20} />
              Đăng xuất
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-200 active:bg-blue-700 transition-colors mb-2">
              <Plus size={20} />
              Tạo tài khoản mới
            </button>

            {mockAdminAccounts.map(account => (
              <div key={account.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <Users size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{account.name}</h4>
                      <p className="text-xs text-slate-500">@{account.username} • {account.role}</p>
                    </div>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full ${account.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                </div>
                
                <div className="flex gap-2 pt-3 border-t border-slate-100">
                  <button className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-semibold text-slate-600 bg-slate-50 rounded-lg active:bg-slate-100 transition-colors">
                    <Edit size={14} />
                    Sửa
                  </button>
                  <button className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 rounded-lg active:bg-amber-100 transition-colors">
                    <Key size={14} />
                    Reset MK
                  </button>
                  <button className="w-10 flex flex-shrink-0 items-center justify-center text-rose-500 bg-rose-50 rounded-lg active:bg-rose-100 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
