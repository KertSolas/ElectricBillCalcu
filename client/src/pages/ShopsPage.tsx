import React, { useState, useEffect } from 'react';
import { getShops, deleteShop } from '../services/shopService';
import { Shop } from '../types/Shop';

const Shops: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShops = async () => {
      setLoading(true);
      const shopsData = await getShops();
      setShops(shopsData);
      setLoading(false);
    };
    fetchShops();
  }, []);

  const handleDeleteShop = async (shopId: string) => {
    try {
      await deleteShop(shopId);
      setShops(shops.filter((shop) => shop._id !== shopId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Shops</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {shops.map((shop) => (
            <li key={shop._id}>
              {shop.name}
              <button onClick={() => handleDeleteShop(shop._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Shops;