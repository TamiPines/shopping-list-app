import React, { useState, useCallback } from 'react';
import { useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';

type OrderForm = {
  fullName: string;
  address: string;
  email: string;
};

function Summary() {
  const cart = useAppSelector(state => state.cart.items);
  const [form, setForm] = useState<OrderForm>({ fullName: '', address: '', email: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm(prev => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!form.fullName || !form.address || !form.email) {
        setError('יש למלא את כל השדות');
        setSuccess('');
        return;
      }
      setError('');
      setSuccess('');
      try {
        const flatCart = Object.entries(cart).flatMap(([cat, items]) =>
          items.map(item => ({
            ...item,
            category: cat
          }))
        );
        const response = await fetch(process.env.REACT_APP_ORDERS_API as string, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form, cart: flatCart }),
        });
        if (response.ok) {
          setSuccess('ההזמנה התקבלה בהצלחה!');
          setTimeout(() => navigate('/success'), 1000);
        } else {
          setError('אירעה שגיאה בשליחת ההזמנה');
        }
      } catch {
        setError('אירעה שגיאה בשליחת ההזמנה');
      }
    },
    [form, cart, navigate]
  );

  return (
    <div className="summary-container">
      <h2 className="summary-title">סיכום הזמנה</h2>
      <form className="summary-form" onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="שם פרטי ומשפחה"
          value={form.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="כתובת מלאה"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="מייל"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <h4 style={{ margin: '16px 0 8px 0' }}>מוצרים בהזמנה:</h4>
        {Object.entries(cart).length === 0 ? (
          <div>העגלה ריקה</div>
        ) : (
          <ul className="summary-products-list">
            {Object.entries(cart).map(([cat, items]) =>
              items.map(item => (
                <li className="summary-product-item" key={item.id}>
                  {item.name} ({cat}) - {item.qty}
                </li>
              ))
            )}
          </ul>
        )}
        {error && <div className="summary-error">{error}</div>}
        {success && <div className="summary-success">{success}</div>}
        <button type="submit" className="summary-submit-button">אשר הזמנה</button>
      </form>
    </div>
  );
};

export default Summary;