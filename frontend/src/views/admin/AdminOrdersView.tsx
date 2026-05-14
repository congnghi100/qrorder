import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Filter, ChevronDown, ChevronUp, CheckCircle2, Clock3 } from 'lucide-react';
import { useOrderStore } from '../../store/useOrderStore';
import { OrderItemEditor } from '../../components/admin/OrderItemEditor';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export const AdminOrdersView = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending'>('all');
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);
  const { orders, updateOrderStatus } = useOrderStore();

  const toggleOrder = (id: string) => {
    setExpandedOrders(prev => 
      prev.includes(id) ? prev.filter(orderId => orderId !== id) : [...prev, id]
    );
  };

  const filteredOrders = activeTab === 'all' 
    ? orders 
    : orders.filter(o => o.status === 'pending');

  return (
    <div className="pt-6 px-5 pb-24 h-full flex flex-col bg-slate-50">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Đơn hàng</h2>
          <p className="text-sm text-slate-500 mt-1">Cập nhật theo thời gian thực</p>
        </div>
        <button className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-sm text-slate-600">
          <Filter size={18} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-200/50 p-1 rounded-xl mb-6">
        <button 
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
            activeTab === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
          }`}
        >
          Tất cả
        </button>
        <button 
          onClick={() => setActiveTab('pending')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
            activeTab === 'pending' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
          }`}
        >
          Chờ xác nhận
          {orders.filter(o => o.status === 'pending').length > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px]">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          )}
        </button>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="space-y-4">
          <AnimatePresence>
            {filteredOrders.map(order => {
              const isExpanded = expandedOrders.includes(order.id);
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
                    onClick={() => toggleOrder(order.id)}
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
                          <h3 className="font-bold text-slate-900">{order.table}</h3>
                          <span className="text-xs font-semibold text-slate-400">#{order.id}</span>
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
                            <OrderItemEditor
                              key={`${item.productId}-${idx}`}
                              order={order}
                              item={item}
                              itemIdx={idx}
                            />
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
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-10">
              <p className="text-slate-500">Không có đơn hàng nào.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
