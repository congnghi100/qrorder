import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, QrCode, X, Search, ChevronRight, Copy, Link2, Receipt, Clock, Clock3, CheckCircle2, ChevronUp, ChevronDown } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { OrderItemEditor } from '../../components/admin/OrderItemEditor';

const STATUS_CONFIG = {
  ready: { label: 'Sẵn sàng', bgColor: 'bg-emerald-100', textColor: 'text-emerald-700', activeClass: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
  serving: { label: 'Đang phục vụ', bgColor: 'bg-orange-100', textColor: 'text-orange-700', activeClass: 'bg-orange-100 text-orange-700 border border-orange-200' },
  cleaning: { label: 'Chờ dọn', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800', activeClass: 'bg-yellow-100 text-yellow-800 border border-yellow-300' },
  reserved: { label: 'Đã đặt trước', bgColor: 'bg-purple-100', textColor: 'text-purple-700', activeClass: 'bg-purple-100 text-purple-700 border border-purple-200' },
  inactive: { label: 'Tạm ngưng', bgColor: 'bg-rose-100', textColor: 'text-rose-700', activeClass: 'bg-rose-100 text-rose-700 border border-rose-200' },
} as const;

type TableStatus = keyof typeof STATUS_CONFIG;

const initialMockTables = [
  { id: 'TBL01', name: 'Bàn 01', location: 'Tầng 1', status: 'ready' as TableStatus, notes: '' },
  { id: 'TBL02', name: 'Bàn 02', location: 'Tầng 1', status: 'serving' as TableStatus, notes: 'Khách VIP' },
  { id: 'TBL03', name: 'Bàn 03', location: 'Tầng 1', status: 'cleaning' as TableStatus, notes: '' },
  { id: 'TBL04', name: 'Bàn 04', location: 'Tầng 1', status: 'ready' as TableStatus, notes: '' },
  { id: 'TBL05', name: 'Bàn 05', location: 'Tầng 1', status: 'reserved' as TableStatus, notes: '18:00 - 4 người' },
  { id: 'TBL06', name: 'Bàn 06', location: 'Tầng 1', status: 'inactive' as TableStatus, notes: 'Hỏng ghế' },
  { id: 'TBL07', name: 'Bàn 07', location: 'Tầng 1', status: 'serving' as TableStatus, notes: '' },
  { id: 'TBL08', name: 'Bàn 08', location: 'Tầng 1', status: 'ready' as TableStatus, notes: '' },
  { id: 'TBL09', name: 'Bàn 09', location: 'Tầng 1', status: 'cleaning' as TableStatus, notes: '' },
  { id: 'TBL10', name: 'Bàn 10', location: 'Tầng 1', status: 'ready' as TableStatus, notes: '' },
  { id: 'TBL11', name: 'Bàn 11', location: 'Tầng 2', status: 'reserved' as TableStatus, notes: 'Sinh nhật' },
  { id: 'TBL12', name: 'Bàn 12', location: 'Tầng 2', status: 'serving' as TableStatus, notes: '' },
  { id: 'TBL13', name: 'Bàn 13', location: 'Tầng 2', status: 'ready' as TableStatus, notes: '' },
  { id: 'TBL14', name: 'Bàn 14', location: 'Tầng 2', status: 'cleaning' as TableStatus, notes: '' },
  { id: 'TBL15', name: 'Bàn 15', location: 'Tầng 2', status: 'ready' as TableStatus, notes: '' },
  { id: 'TBL16', name: 'Bàn 16', location: 'Tầng 2', status: 'inactive' as TableStatus, notes: 'Bảo trì quạt' },
  { id: 'TBL17', name: 'Bàn 17', location: 'Tầng 2', status: 'serving' as TableStatus, notes: '' },
  { id: 'TBL18', name: 'Bàn 18', location: 'Tầng 2', status: 'ready' as TableStatus, notes: '' },
  { id: 'TBL19', name: 'Bàn 19', location: 'Tầng 2', status: 'reserved' as TableStatus, notes: '19:30 - 2 người' },
  { id: 'TBL20', name: 'Bàn 20', location: 'Tầng 2', status: 'ready' as TableStatus, notes: '' },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const AdminTablesView = () => {
  const { orders, updateOrderStatus } = useOrderStore();
  const [tables, setTables] = useState(initialMockTables);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState<typeof initialMockTables[0] | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [expandedTableOrders, setExpandedTableOrders] = useState<string[]>([]);

  const [statusFilter, setStatusFilter] = useState<TableStatus | 'all'>('all');

  const toggleTableOrder = (id: string) => {
    setExpandedTableOrders(prev => 
      prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    if (selectedTable) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedTable]);

  const filteredTables = tables.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       t.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 1500);
  };

  return (
    <div className="pt-6 px-5 pb-24 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Quản lý bàn</h2>
        <button 
          onClick={handleSync}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg text-sm font-semibold active:bg-blue-100 transition-colors"
        >
          <RefreshCw size={16} className={isSyncing ? "animate-spin" : ""} />
          Đồng bộ POS
        </button>
      </div>

      {/* Search & Filters */}
      <div className="mb-6">
        <div className="relative mb-4">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
            placeholder="Tìm kiếm bàn, khu vực..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Status Filters - Wrap Layout */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${
              statusFilter === 'all' 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'bg-white text-slate-600 border border-slate-200 active:bg-slate-50'
            }`}
          >
            Tất cả
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${statusFilter === 'all' ? 'bg-white/20' : 'bg-slate-100'}`}>
              {tables.length}
            </span>
          </button>
          {(Object.entries(STATUS_CONFIG) as [TableStatus, typeof STATUS_CONFIG[TableStatus]][]).map(([status, config]) => {
            const count = tables.filter(t => t.status === status).length;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                  statusFilter === status 
                    ? config.activeClass 
                    : 'bg-white text-slate-600 border border-slate-200 active:bg-slate-50'
                }`}
              >
                {config.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  statusFilter === status 
                    ? 'bg-white/30 text-current' 
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tables List */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="space-y-3">
          {filteredTables.map(table => (
            <div 
              key={table.id}
              onClick={() => setSelectedTable(table)}
              className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm active:bg-slate-50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-slate-900">{table.name}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${STATUS_CONFIG[table.status].bgColor} ${STATUS_CONFIG[table.status].textColor}`}>
                    {STATUS_CONFIG[table.status].label}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{table.location}</p>
              </div>
              <ChevronRight className="text-slate-400" size={20} />
            </div>
          ))}
          
          {filteredTables.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500">Không tìm thấy bàn nào.</p>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTable && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTable(null)}
              className="fixed inset-0 bg-slate-900/40 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 max-w-2xl mx-auto bg-white rounded-t-3xl z-[60] px-6 pb-8 max-h-[85vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white z-20 pt-6 pb-4 flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedTable.name}</h3>
                  <p className="text-slate-500 mt-1">{selectedTable.id} • {selectedTable.location}</p>
                </div>
                <button 
                  onClick={() => setSelectedTable(null)}
                  className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Status Update */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-700">Cập nhật trạng thái</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(STATUS_CONFIG) as [TableStatus, typeof STATUS_CONFIG[TableStatus]][]).map(([status, config]) => (
                    <button
                      key={status}
                      onClick={() => {
                        const updatedTable = { ...selectedTable, status };
                        setSelectedTable(updatedTable);
                        setTables(tables.map(t => t.id === updatedTable.id ? updatedTable : t));
                      }}
                      className={`px-3 py-2 rounded-xl text-sm font-medium border transition-colors flex-1 min-w-[30%] ${
                        selectedTable.status === status 
                          ? config.activeClass 
                          : 'bg-white border-slate-200 text-slate-600 active:bg-slate-50'
                      }`}
                    >
                      {config.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* QR Code & Link */}
              <div className="mb-6 bg-slate-50 rounded-xl border border-slate-100 p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Link2 size={16} className="text-slate-400" /> 
                    Truy cập Order
                  </p>
                  <button className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:text-blue-700 active:text-blue-800 transition-colors">
                    <RefreshCw size={14} /> Tạo mới
                  </button>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <QrCode className="text-slate-600 w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 mb-1.5 font-medium">Link đặt món (dành cho khách)</p>
                    <div className="flex items-center gap-2">
                      <div className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-sm text-slate-600 truncate flex-1 font-mono text-[13px] shadow-sm">
                        miniappos.com/t/{selectedTable.id.toLowerCase()}
                      </div>
                      <button className="p-2 text-slate-400 hover:text-blue-600 bg-white border border-slate-200 rounded-lg shadow-sm transition-colors active:bg-slate-50">
                        <Copy size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders History / Serving Orders */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                    <Receipt size={16} className="text-slate-400" />
                    Lệnh Order tại bàn
                  </p>
                  <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-bold">
                    {orders.filter(o => o.table === selectedTable.name).length} đơn
                  </span>
                </div>
                <div className="space-y-3">
                  <AnimatePresence>
                    {orders.filter(o => o.table === selectedTable.name).map(order => {
                      const isExpanded = expandedTableOrders.includes(order.id);
                      return (
                        <motion.div 
                          key={order.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                        >
                          {/* Order Header */}
                          <div 
                            onClick={() => toggleTableOrder(order.id)}
                            className="p-4 flex items-center justify-between cursor-pointer active:bg-slate-50 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                order.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                              }`}>
                                {order.status === 'pending' ? <Clock3 size={20} /> : <CheckCircle2 size={20} />}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-slate-900">#{order.id}</h3>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-slate-500 mt-0.5">
                                  <Clock size={12} />
                                  <span>{order.time}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <p className="font-bold text-blue-600">
                                {formatCurrency(order.items.reduce((sum, item) => sum + item.price * item.qty, 0))}
                              </p>
                              <div className="text-slate-400">
                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </div>
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-slate-100 bg-slate-50/50"
                              >
                                <div className="p-4 space-y-3">
                                  {order.items.map((item, idx) => (
                                    <OrderItemEditor key={idx} order={order} item={item} itemIdx={idx} />
                                  ))}
                                  
                                  {order.status === 'pending' && (
                                    <div className="pt-3 flex gap-3">
                                      <button className="flex-1 py-2.5 border border-rose-200 text-rose-600 font-semibold rounded-xl text-sm active:bg-rose-50 transition-colors">
                                        Từ chối
                                      </button>
                                      <button 
                                        onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                        className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-xl text-sm active:bg-blue-700 transition-colors shadow-md shadow-blue-200"
                                      >
                                        Xác nhận
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  
                  {orders.filter(o => o.table === selectedTable.name).length === 0 && (
                    <div className="text-center py-6">
                      <p className="text-slate-500 text-sm">Không có lệnh order nào.</p>
                    </div>
                  )}
                </div>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
