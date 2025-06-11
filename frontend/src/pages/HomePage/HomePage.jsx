import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  function goToCategory(category) {
    navigate(`/items${category ? `?category=${category}` : ''}`);
  }

  return (
    <div>
      <h2>Shop Categories</h2>
      <button onClick={() => goToCategory('')}>All Products</button>
            <button onClick={() => goToCategory('top')}>Tops</button>
      <button onClick={() => goToCategory('outerwear')}>Outerwear</button>
      <button onClick={() => goToCategory('skirt')}>Skirts</button>
      <button onClick={() => goToCategory('dress')}>Dresses</button>
      <button onClick={() => goToCategory('accessory')}>Accessories</button>
    </div>
  );
}