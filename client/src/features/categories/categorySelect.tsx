import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories } from './categorySlice';

type Category = {
  id: string;
  name: string;
};

const CategorySelect: React.FC<{ value: string; onChange: (val: string) => void }> = ({ value, onChange }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.list) as Category[];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <select
      className="category-select"
      value={value}
      onChange={e => onChange(e.target.value)}
    >
      <option value="">בחר קטגוריה</option>
      {categories.map(cat => (
        <option key={cat.id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;