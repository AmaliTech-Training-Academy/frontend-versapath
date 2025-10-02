import { FAQSection } from "./components/faq-section";
import { Footer } from "./components/footer";
import CategorySection from "./components/hero-image-card";
import { HeroSection } from "./components/hero-section";
import { Navbar } from "./components/navbar";
import { StatsSection } from "./components/start-section";
import { TestimonialsSection } from "./components/testimonials-section";
import { TrendingCourses } from "./components/trending-courses";

export default function Home() {
  return (
    <div className="min-h-screen w-full ">
      <Navbar />
      <main className="w-full">
        <HeroSection />
        <CategorySection />
        <StatsSection />
        <TrendingCourses />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
