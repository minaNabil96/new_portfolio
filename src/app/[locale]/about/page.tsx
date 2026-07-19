import Header from "@/components/Header";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <Header locale={locale} />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </main>
  );
}
