import { useNavigate } from 'react-router-dom';
import './HomePage.css';
export default function HomePage() {
  const navigate = useNavigate();

  function goToCategory(category) {
    navigate(`/items${category ? `?category=${category}` : ''}`);
  }
const categories = [
    { key: 'top',        label: 'Tops',        img: "../images/tops/top_gucci.png" },
    { key: 'outerwear',  label: 'Outerwear',   img: '../images/outerwear/outerwear_canadagoose.png' },
    { key: 'skirt',      label: 'Skirts',      img: '../images/skirts/skirt_cd.png' },
    { key: 'dress',      label: 'Dresses',     img: '../images/dresses/dress_prada.png' },
    { key: 'accessory',  label: 'Accessories', img: '../images/accessories/accessory_hermes.png' },
  ];
  return (
    <main className="home">
      <section className="title">
        <h1 className="title">Factory Fashion</h1>
        <p className="subtitle">
          Premium designer items made affordable and sustainable.
        </p>
        <button className="primary" onClick={() => goToCategory()}>
          View All Items
        </button>
      </section>
      <section className="about">
        <h2>About Us</h2>
        <p>
          We source premium second-hand designer clothing from across the globe and
          match them with a new owner. Every item is authenticated,
          quality-checked, and given a new lease of life when needed.
        </p>
      </section>
      <section className="categories">
        {categories.map(({ key, label, img }) => (
          <div
            key={key}
            className="category-card"
            onClick={() => goToCategory(key)}>
            <img src={img} alt={label} />
            <span>{label}</span>
          </div>
        ))}
      </section>
    </main>
  );
}