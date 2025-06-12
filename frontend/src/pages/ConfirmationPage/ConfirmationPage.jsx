import { Link } from 'react-router-dom';
import './ConfirmationPage.css';

export default function ConfirmationPage() {
  return (
    <main className="confirmation">
      <h1>Thank&nbsp;you for your order!</h1>
      <p>You’ll receive a confirmation email shortly.</p>

      <Link className="home-btn" to="/">
        Continue Shopping
      </Link>
    </main>
  );
}