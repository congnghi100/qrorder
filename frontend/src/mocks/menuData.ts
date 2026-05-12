export const mockMenu = [
  // Cơm
  { id: '1', name: 'Cơm Gà Xối Mỡ', description: 'Gà xối mỡ giòn rụm, ăn kèm cơm chiên và đồ chua', price: 45000, category: 'Cơm', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '2', name: 'Cơm Tấm Sườn Bì', description: 'Sườn nướng than hoa thơm lừng, bì dai giòn', price: 55000, category: 'Cơm', image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '3', name: 'Cơm Chiên Hải Sản', description: 'Cơm chiên tôm mực tươi ngon, đậm đà', price: 60000, category: 'Cơm', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
  
  // Mì & Phở
  { id: '4', name: 'Phở Bò Đặc Biệt', description: 'Nước dùng đậm đà 8 tiếng, thịt bò tươi mềm', price: 50000, category: 'Mì & Phở', image: 'https://images.unsplash.com/photo-1594998893017-36147cbcae05?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '5', name: 'Mì Ý Sốt Bò Bằm', description: 'Spaghetti với sốt cà chua thịt bò bằm truyền thống', price: 65000, category: 'Mì & Phở', image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
  { id: '6', name: 'Bún Thịt Nướng', description: 'Thịt nướng sả ướp vị, kèm chả giò và nước mắm chua ngọt', price: 45000, category: 'Mì & Phở', image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=400&q=80', isBestSeller: false },

  // Khai vị & Ăn vặt
  { id: '7', name: 'Gà Rán Giòn', description: 'Gà rán tẩm gia vị đặc biệt, ngoài giòn trong mọng nước', price: 40000, category: 'Khai vị & Ăn vặt', image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '8', name: 'Khoai Tây Chiên Phô Mai', description: 'Khoai tây chiên giòn lắc phô mai thơm béo', price: 35000, category: 'Khai vị & Ăn vặt', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
  { id: '9', name: 'Chả Giò Trái Cây', description: 'Chả giò chiên giòn nhân trái cây thanh mát', price: 45000, category: 'Khai vị & Ăn vặt', image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?auto=format&fit=crop&w=400&q=80', isBestSeller: false },

  // Salad
  { id: '10', name: 'Salad Cá Hồi', description: 'Cá hồi tươi, rau xanh và sốt mè rang', price: 75000, category: 'Salad', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '11', name: 'Salad Ức Gà Nướng', description: 'Ức gà nướng mềm áp chảo ăn kèm salad tươi', price: 60000, category: 'Salad', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
  { id: '12', name: 'Salad Bơ Cà Chua', description: 'Bơ sáp, cà chua bi chua ngọt thanh mát', price: 55000, category: 'Salad', image: 'https://images.unsplash.com/photo-1529312266912-b33cfce2eefd?auto=format&fit=crop&w=400&q=80', isBestSeller: false },

  // Tráng miệng
  { id: '13', name: 'Bánh Flan Caramel', description: 'Bánh flan mềm mịn, ngọt ngào vị caramel', price: 25000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '14', name: 'Chè Khúc Bạch', description: 'Khúc bạch phô mai béo ngậy kèm trái cây tươi', price: 35000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
  { id: '15', name: 'Bánh Tiramisu', description: 'Bánh Tiramisu Ý truyền thống thơm hương cà phê', price: 45000, category: 'Tráng miệng', image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=400&q=80', isBestSeller: false },

  // Thức uống
  { id: '16', name: 'Trà Sữa Trân Châu', description: 'Hồng trà sữa truyền thống đậm vị trà, trân châu dai', price: 35000, category: 'Thức uống', image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '17', name: 'Trà Đào Cam Sả', description: 'Trà thanh mát, miếng đào giòn ngọt', price: 40000, category: 'Thức uống', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80', isBestSeller: true },
  { id: '18', name: 'Cà Phê Đen Đá', description: 'Cà phê rang xay đậm đà phong cách Việt Nam', price: 25000, category: 'Thức uống', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
  { id: '19', name: 'Nước Ép Dưa Hấu', description: 'Nước ép trái dưa hấu tươi mát lạnh', price: 30000, category: 'Thức uống', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
  { id: '20', name: 'Matcha Đá Xay', description: 'Đá xay trà xanh đậm vị Nhật Bản phủ kem tươi', price: 50000, category: 'Thức uống', image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=400&q=80', isBestSeller: false },
];

export const mockCategories = ['All', 'Cơm', 'Mì & Phở', 'Khai vị & Ăn vặt', 'Salad', 'Tráng miệng', 'Thức uống'];
