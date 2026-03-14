import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Reviews from './components/Reviews';
import Reservation from './components/Reservation';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section id="inicio"><Hero /></section>
        <section id="carta"><Menu /></section>
        <section id="opiniones"><Reviews /></section>
        <section id="reservas"><Reservation /></section>
      </main>
      <Footer />
    </div>
  );
}
