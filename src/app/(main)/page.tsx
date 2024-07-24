import Footer from './components/Footer';
import About from './components/parts/About';
import JoinUs from './components/parts/JoinUs';
import Event from './components/parts/Event';
import Home from './components/parts/Home';
import VisiMisi from './components/parts/VisiMisi';

export default function Page() {
  return (
    <>
      <main className="flex flex-col gap-y-10 overflow-hidden bg-primary">
        <Home />
        <About />
        <VisiMisi />
        <JoinUs />
        <Event />
      </main>
      <Footer />
    </>
  );
}
