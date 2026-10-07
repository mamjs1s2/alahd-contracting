import Grain from "@/components/Grain";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Team from "@/components/Team";
import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

export default function Home() {
  return (
    <>
      <Grain />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Stats />
        <About />
        <Services />
        <Process />
        <Projects />
        <Team />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
