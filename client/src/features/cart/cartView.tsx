import React from 'react';
import { useAppSelector } from '../../app/hooks';

type CartItem = {
  id: string;
  name: string;
  qty: number;
};

type Cart = {
  [category: string]: CartItem[];
};

const CartView: React.FC = () => {
  const cart = useAppSelector(state => state.cart.items) as Cart;

  if (Object.keys(cart).length === 0) {
    return <div className="empty-cart">העגלה ריקה</div>;
  }

  return (
    <div className="cart-list">
      {Object.entries(cart).map(([cat, items]) => (
        <div key={cat} className="cart-category">
          <h3 className="cart-category-title">{cat}</h3>
          <ul className="cart-items-list">
            {items.map(item => (
              <li key={item.id} className="cart-item">
                {item.name} – {item.qty}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CartView;