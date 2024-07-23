import Footer from './components/Footer';
import About from './components/parts/About';
import Event from './components/parts/Event';
import Home from './components/parts/Home';
import Organization from './components/parts/Organization';

export default function page() {
  return (
    <>
      <main className="flex flex-col gap-y-10 overflow-hidden bg-primary">
        <Home />
        <About />
        <Organization />
        <Event />
      </main>
      <Footer />
    </>
  );
}
