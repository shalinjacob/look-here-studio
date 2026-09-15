import Hero from "@/components/sections/Hero";
import WhyLookHere from "@/components/sections/WhyLookHere";
import ObjectsPreview from "@/components/sections/ObjectsPreview";
import MadeHere from "@/components/sections/MadeHere";
import AtHome from "@/components/sections/AtHome";
import CurrentDrop from "@/components/sections/CurrentDrop";
import NewsletterSection from "@/components/sections/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyLookHere />
      <ObjectsPreview />
      <MadeHere />
      <AtHome />
      <CurrentDrop />
      <NewsletterSection />
    </>
  );
}
