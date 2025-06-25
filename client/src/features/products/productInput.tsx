import React, { useState, useCallback } from 'react';

type ProductInputProps = {
  onAdd: (name: string, qty: number) => void;
};

const ProductInput: React.FC<ProductInputProps> = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);

  return (
    <div className="product-input">
      <input
        type="text"
        placeholder="שם המוצר"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="number"
        min="1"
        value={qty}
        onChange={e => setQty(Number(e.target.value))}
      />
      <button onClick={() => { onAdd(name, qty); setName(''); setQty(1); }}>
        הוסף מוצר לסל
      </button>
    </div>
  );
};

export default ProductInput;