import { Pencil, Trash2, Plus, Minus, Check } from 'lucide-react';
import { useState } from 'react';
import { useOrderStore } from '../../store/useOrderStore';
import type { Order, OrderItem } from '../../store/useOrderStore';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

interface OrderItemEditorProps {
  order: Order;
  item: OrderItem;
  itemIdx: number;
}

export const OrderItemEditor = ({ order, item, itemIdx }: OrderItemEditorProps) => {
  const { updateItemQtyAndNote, deleteOrderItem } = useOrderStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ qty: item.qty, note: item.note });

  const startEdit = () => {
    setEditForm({ qty: item.qty, note: item.note });
    setIsEditing(true);
  };

  const saveEdit = () => {
    updateItemQtyAndNote(order.id, itemIdx, editForm.qty, editForm.note);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const isConfirmed = order.status === 'confirmed';

  return (
    <div className="flex flex-col gap-2">
      {!isEditing ? (
        <div className="flex justify-between items-start group">
          <div className="flex gap-3">
            <span className="font-bold text-slate-900 mt-0.5">{item.qty}x</span>
            <div>
              <p className="font-medium text-slate-700">{item.name}</p>
              <p className="text-xs text-slate-500 mt-0.5">{formatCurrency(item.price)}</p>
              {item.note && <p className="text-xs text-slate-500 mt-1 italic text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md w-max">Ghi chú: {item.note}</p>}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-bold text-slate-800">{formatCurrency(item.price * item.qty)}</span>
            {!isConfirmed && (
              <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={startEdit}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Pencil size={14} />
                </button>
                <button 
                  onClick={() => deleteOrderItem(order.id, itemIdx)}
                  className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-slate-700">{item.name}</p>
            <p className="text-sm font-semibold text-slate-600">{formatCurrency(item.price)}</p>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
              <button 
                onClick={() => setEditForm(prev => ({ ...prev, qty: Math.max(1, prev.qty - 1) }))}
                className="p-1.5 text-slate-500 hover:text-slate-700 active:bg-slate-200 rounded-l-lg transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center font-bold text-sm">{editForm.qty}</span>
              <button 
                onClick={() => setEditForm(prev => ({ ...prev, qty: prev.qty + 1 }))}
                className="p-1.5 text-slate-500 hover:text-slate-700 active:bg-slate-200 rounded-r-lg transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
            <input 
              type="text" 
              value={editForm.note}
              onChange={e => setEditForm(prev => ({ ...prev, note: e.target.value }))}
              placeholder="Ghi chú (tuỳ chọn)" 
              className="flex-1 min-w-0 text-sm border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button 
              onClick={cancelEdit}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button 
              onClick={saveEdit}
              className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Check size={14} /> Lưu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
