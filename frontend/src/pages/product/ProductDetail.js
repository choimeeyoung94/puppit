import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
  const { id } = useParams();

  return (
    <div>
      <h2>Product Detail - {id}</h2>
      <p>Product detail page - To be implemented</p>
    </div>
  );
}

export default ProductDetail;

