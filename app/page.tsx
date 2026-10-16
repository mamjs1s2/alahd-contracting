import { createClient } from "@/lib/supabase/server";
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

// إعادة إلغاء الكاش لضمان ظهور المشروع فور إضافته من لوحة التحكم
export const revalidate = 0;

export default async function Home() {
  const supabase = await createClient();

  // جلب كافة المشاريع من Supabase مرتبة بحسب الأحدث
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

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
        <Projects initialProjects={projects || []} />
        <Team />
        <Clients />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}