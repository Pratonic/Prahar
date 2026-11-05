import Hero3DExperience from '@/components/Hero3DExperience';
import StorySection from '@/components/StorySection';
import RagaExplorer from '@/components/RagaExplorer';
import MusicPlayer from '@/components/MusicPlayer';
import HowItWorks from '@/components/HowItWorks';
import ProductGrid from '@/components/ProductGrid';
import DiscoveryQuiz from '@/components/DiscoveryQuiz';
import CampaignSection from '@/components/CampaignSection';
import BrandPhilosophy from '@/components/BrandPhilosophy';

export default function HomePage() {
  return (
    <>
      {/* 01. The 3D Interactive Perfume Bottle Experience & Hero */}
      <Hero3DExperience />

      {/* 02. Editorial Storytelling */}
      <StorySection />

      {/* 03. The Five Ragas Interactive Explorer */}
      <RagaExplorer />

      {/* 04. Digital Music Experience with Real Classical Raga Playback */}
      <MusicPlayer />

      {/* 05. How It Works: Four Step Ritual */}
      <HowItWorks />

      {/* 06. The Collection D2C Showcase */}
      <ProductGrid />

      {/* 07. Interactive Personalized Raga Quiz */}
      <DiscoveryQuiz />

      {/* 08. Cultural Launch Campaign #ListenToTheScent */}
      <CampaignSection />

      {/* 09. Brand Philosophy, Three Pillars & Future Horizon */}
      <BrandPhilosophy />
    </>
  );
}
