import { Clock, Trash2, PackageSearch, ClipboardList, Utensils } from 'lucide-react';
import { useState } from 'react';
import { useOrderStore } from '../store/useOrderStore';
import type { OrderStatus, OrderedItem } from '../store/useOrderStore';
import { motion, useAnimation } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

// Helper function to format timestamp
const formatTimeAgo = (timestamp: number) => {
  const diffInMinutes = Math.floor((Date.now() - timestamp) / 60000);
  if (diffInMinutes < 1) return 'vừa xong';
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  return `${Math.floor(diffInHours / 24)} ngày trước`;
};

const SwipeableOrderItem = ({ item, index, onDelete }: { item: OrderedItem, index: number, onDelete: () => void }) => {
  const controls = useAnimation();
  const [isOpen, setIsOpen] = useState(false);
  const OPEN_X = -90;
  
  const handleDragEnd = async (_event: any, info: PanInfo) => {
    if (isOpen) {
      if (info.offset.x < -30) {
        // Swiped further left while open -> delete
        await controls.start({ x: -window.innerWidth, transition: { duration: 0.2 } });
        onDelete();
      } else if (info.offset.x > 20) {
        // Swiped right -> close
        setIsOpen(false);
        controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      } else {
        // Snap back to open state
        controls.start({ x: OPEN_X, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      }
    } else {
      if (info.offset.x < -40) {
        // Swiped far enough left -> open
        setIsOpen(true);
        controls.start({ x: OPEN_X, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      } else {
        // Snap back to close
        controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
      }
    }
  };

  const handleDeleteClick = async () => {
    await controls.start({ x: -window.innerWidth, transition: { duration: 0.2 } });
    onDelete();
  };

  return (
    <div className="relative mb-4 overflow-hidden rounded-[24px]">
      {/* Background delete layer */}
      <div 
        className="absolute inset-0 bg-red-500 rounded-[24px] flex items-center justify-end shadow-sm cursor-pointer"
        onClick={handleDeleteClick}
      >
        <div className="flex flex-col items-center justify-center text-white w-[90px] h-full">
          <Trash2 size={24} strokeWidth={2.5} />
          <span className="text-[12px] font-bold mt-1">Xóa</span>
        </div>
      </div>
      
      {/* Foreground card */}
      <motion.div
        drag="x"
        dragConstraints={{ left: isOpen ? -window.innerWidth : OPEN_X, right: 0 }}
        dragElastic={{ left: isOpen ? 0.2 : 0.05, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
            controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
          }
        }}
        className="relative bg-white rounded-[24px] p-4 shadow-sm border border-transparent hover:border-mint-200 hover:shadow-md transition-shadow z-10 touch-pan-y"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-[16px] ${item.status === 'Đang xử lý' ? 'bg-[#daf0eb] text-[#154e3d]' : 'bg-gray-100 text-gray-500'}`}>
              #{index + 1}
            </div>
            <div>
              <p className="font-bold text-gray-900 text-[15px]">{item.orderId}</p>
              <div className="flex items-center gap-1.5 text-[12px] text-gray-500 font-medium mt-0.5">
                <Clock size={12} />
                <span>{formatTimeAgo(item.timestamp)}</span>
              </div>
            </div>
          </div>
          <div className={`px-3 py-1.5 rounded-full text-[12px] font-bold ${item.status === 'Đang xử lý' ? 'bg-[#154e3d] text-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
            {item.status}
          </div>
        </div>
        
        <div className="flex gap-4 mb-4 bg-[#f8faf9] p-3 rounded-[16px] border border-gray-50">
          <div className="w-16 h-16 rounded-[12px] overflow-hidden bg-gray-100 shrink-0">
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Utensils size={20} />
              </div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <h3 className="text-gray-900 font-bold text-[15px] mb-1">{item.name}</h3>
            {item.note && (
              <p className="text-gray-500 text-[13px] mb-1 italic">Note: {item.note}</p>
            )}
            <p className="text-gray-600 text-[13px] font-medium">Số lượng: <span className="text-gray-900 font-bold">{item.quantity}</span></p>
          </div>
        </div>
        
        <div className="flex justify-between items-center px-2">
          <span className="text-[13px] text-gray-500 font-medium">Thành tiền</span>
          <p className="text-[#154e3d] font-extrabold text-[16px]">
            {(item.price * item.quantity).toLocaleString('vi-VN')}
            <span className="text-[13px] ml-0.5">đ</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const OrdersView = () => {
  const [activeTab, setActiveTab] = useState<OrderStatus>('Đang xử lý');
  const { orderedItems, deleteOrderedItem } = useOrderStore();

  const filteredItems = orderedItems.filter(item => item.status === activeTab);

  return (
    <div className="bg-transparent flex flex-col min-h-screen pt-2">
      <div className="px-5 pt-2 pb-2">
        {/* Header Area */}
        <div className="mb-6 flex items-center gap-3">
          <div className="w-12 h-12 bg-[#e6f2ef] rounded-full flex items-center justify-center text-[#599a8d] shadow-sm shrink-0">
            <ClipboardList size={24} strokeWidth={2.5} />
          </div>
          <div className="flex-1">
            <h2 className="text-[20px] font-bold text-gray-900 leading-tight">Đơn hàng của tôi</h2>
            <p className="text-[13px] text-gray-500 mt-0.5">Quản lý và theo dõi món ăn đã đặt</p>
          </div>
        </div>
        
        {/* Segmented Control */}
        <div className="bg-[#eff1f0] p-1.5 rounded-full flex mb-2">
          <button 
            onClick={() => setActiveTab('Đang xử lý')}
            className={`flex-1 py-2.5 rounded-full text-[14px] font-bold transition-all ${activeTab === 'Đang xử lý' ? 'bg-[#154e3d] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Đang xử lý
          </button>
          <button 
            onClick={() => setActiveTab('Đã đặt')}
            className={`flex-1 py-2.5 rounded-full text-[14px] font-bold transition-all ${activeTab === 'Đã đặt' ? 'bg-[#154e3d] text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Đã đặt
          </button>
        </div>
      </div>

      <div className="bg-[#daf0eb] flex-1 rounded-t-[32px] px-5 pt-6 pb-32 overflow-hidden">
        <div className="space-y-4">
          {filteredItems.length > 0 ? filteredItems.map((item, index) => (
            <SwipeableOrderItem
              key={`${item.orderId}-${item.productId}-${item.timestamp}`}
              item={item}
              index={index}
              onDelete={() => deleteOrderedItem(item.orderId, item.productId, item.timestamp)}
            />
          )) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 bg-white/50 rounded-full flex items-center justify-center mb-4">
                <PackageSearch size={32} className="text-[#599a8d]" />
              </div>
              <h3 className="text-[16px] font-bold text-gray-900 mb-2">Chưa có món ăn nào</h3>
              <p className="text-[14px] text-gray-600 max-w-[200px]">Bạn chưa có món ăn nào trong danh sách này.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
