import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { Button } from '../components/Button';
import logo from '../assets/naviworld-logo.png';

export const WelcomeView = () => {
  const navigate = useNavigate();
  const setSession = useCartStore(state => state.setSession);

  const handleStart = () => {
    // Giả lập quét QR được bàn số 5
    setSession('session-123', '05');
    navigate('/menu');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 text-center">
      <div className="w-full max-w-[240px] flex items-center justify-center mb-8">
        <img src={logo} alt="NaviWorld Logo" className="w-full object-contain" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Chào mừng bạn!</h1>
      <p className="text-text-secondary mb-8">Vui lòng xác nhận bàn để bắt đầu gọi món</p>
      <div className="bg-gray-50 p-4 rounded-xl w-full mb-8">
        <p className="text-sm text-gray-500">Bàn của bạn</p>
        <p className="text-3xl font-bold text-mint-500">Số 05</p>
      </div>
      <Button className="w-full" size="lg" onClick={handleStart}>Bắt đầu gọi món</Button>
    </div>
  );
};
