import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../utils/api';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productAPI.getList({ offset: 0, size: 12, sort: 'DESC' });
      setProducts(response.data.products || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>반려동물 용품 중고거래</h1>
        <p>Puppit에서 믿을 수 있는 거래를 시작하세요</p>
        <Link to="/products" className="cta-button">
          상품 둘러보기
        </Link>
      </section>

      <section className="product-section">
        <h2>최근 등록된 상품</h2>
        {loading ? (
          <p>로딩 중...</p>
        ) : products.length > 0 ? (
          <div className="product-grid">
            {products.map((product) => (
              <Link
                key={product.productId}
                to={`/products/${product.productId}`}
                className="product-card"
              >
                <div className="product-image">
                  {product.thumbnailUrl ? (
                    <img src={product.thumbnailUrl} alt={product.productName} />
                  ) : (
                    <div className="no-image">이미지 없음</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.productName}</h3>
                  <p className="price">{product.productPrice?.toLocaleString()}원</p>
                  <p className="location">{product.userLocation}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p>등록된 상품이 없습니다.</p>
        )}
      </section>
    </div>
  );
}

export default Home;

