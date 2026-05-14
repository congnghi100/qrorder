import { Users, Armchair, CheckCircle2 } from 'lucide-react';

export const AdminDashboardView = () => {
  return (
    <div className="pt-6 px-5">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Tổng quan</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="col-span-2 bg-white rounded-xl p-5 shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users size={20} />
            </div>
            <p className="text-sm font-medium text-slate-500">Tổng số bàn</p>
          </div>
          <p className="text-3xl font-bold text-slate-900">30</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center">
              <Armchair size={16} />
            </div>
            <p className="text-xs font-medium text-slate-500">Đang dùng</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">12</p>
        </div>
        
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <p className="text-xs font-medium text-slate-500">Bàn trống</p>
          </div>
          <p className="text-2xl font-bold text-slate-900">18</p>
        </div>
      </div>
      
      {/* Top Tables */}
      <h3 className="text-lg font-bold text-slate-900 mb-4">Bàn gọi món nhiều nhất</h3>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {[
          { name: 'Bàn 01', orders: 5, total: '1,250,000đ' },
          { name: 'Bàn 15', orders: 4, total: '890,000đ' },
          { name: 'Bàn 08', orders: 3, total: '650,000đ' },
        ].map((item, idx) => (
          <div key={item.name} className={`flex items-center justify-between p-4 ${idx !== 2 ? 'border-b border-slate-100' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                {idx + 1}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{item.name}</p>
                <p className="text-xs text-slate-500">{item.orders} đơn hàng</p>
              </div>
            </div>
            <p className="font-bold text-blue-600 text-sm">{item.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
