import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <Header locale={locale} />
      <Hero />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
