import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <Header locale={locale} />
      <Hero />
      <Featured />
      <About />
      <Footer />
    </main>
  );
}
