import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import About from "@/components/About";
import Flow from "@/components/Flow";
import Vibe from "@/components/Vibe";
import Transition from "@/components/Transition";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Manifesto />
      <About />
      <Flow />
      <Vibe />
      <Transition />
      <CTA />
      <Footer />
    </main>
  );
}
