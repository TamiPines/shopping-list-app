import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import CategorySelect from './features/categories/categorySelect';
import ProductInput from './features/products/productInput';
import CartView from './features/cart/cartView';
import { useAppDispatch } from './app/hooks';
import { addToCart } from './features/cart/cartSlice';
import './styles/main.css';

function App() {
  const [category, setCategory] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
  }, []);

  const handleAdd = useCallback(
    (name: string, qty: number) => {
      if (!category || !name) return;
      dispatch(addToCart({ category, name, qty }));
    },
    [category, dispatch]
  );

  const handleNavigate = useCallback(() => {
    navigate('/summary');
  }, [navigate]);

  return (
    <div className="centered-container">
      <h1 className="main-title">רשימת קניות</h1>
      <div className="category-row">
        <CategorySelect value={category} onChange={handleCategoryChange} />
      </div>
      <ProductInput onAdd={handleAdd} />
      <CartView />
      <button className="order-btn" onClick={handleNavigate}>
        המשך להזמנה
      </button>
    </div>
  );
};

export default App;