import { MapPin, Phone, Settings, ChevronRight } from 'lucide-react';

export const ProfileView = () => {
  
  return (
    <div className="bg-transparent flex flex-col min-h-screen pt-2">
      <div className="px-5 pt-2 pb-32">
        <h2 className="text-[24px] font-bold text-gray-900 leading-tight mb-6">Hồ sơ cá nhân</h2>
        
        {/* Profile Card */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm mb-6 flex items-center gap-4 border border-gray-50">
          <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#daf0eb]">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150&h=150" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-[18px] font-bold text-gray-900">Khách hàng</h3>
            <p className="text-[13px] text-gray-500 font-medium mt-0.5">Thành viên thân thiết</p>
          </div>
        </div>
        
        {/* Contact Info */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm mb-6 border border-gray-50 space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <MapPin size={20} />
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-[12px] text-gray-500 font-medium mb-0.5">Địa chỉ</p>
              <p className="text-[14px] text-gray-900 font-bold leading-snug">123 Đường Số 1, Phường An Phú, Quận 2, TP.HCM</p>
            </div>
          </div>
          
          <div className="h-[1px] bg-gray-50 w-full ml-14"></div>
          
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] text-gray-500 font-medium mb-0.5">Số điện thoại</p>
              <p className="text-[14px] text-gray-900 font-bold">090 123 4567</p>
            </div>
          </div>
        </div>
        
        {/* Admin Link */}
        <div 
          onClick={() => {
             // Mock action cho nút Admin
             alert('Chuyển đến Trang Quản lý Admin');
          }}
          className="bg-white rounded-[24px] p-4 shadow-sm border border-gray-50 flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Settings size={20} />
            </div>
            <p className="text-[15px] text-gray-900 font-bold">Trang Quản lý admin</p>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>
        
      </div>
    </div>
  );
};
