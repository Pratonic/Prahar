import CampaignSection from '@/components/CampaignSection';
import TechnologySection from '@/components/TechnologySection';
import HowItWorks from '@/components/HowItWorks';

export const metadata = {
  title: 'Discover — #ListenToTheScent | PRAHAR',
  description:
    'India hears it before it smells it. Explore the groundbreaking cultural launch and connected technological ecosystem of PRAHAR.',
};

export default function DiscoverPage() {
  return (
    <div className="pt-24 bg-[#F5EBDD] min-h-screen">
      <CampaignSection />
      <HowItWorks />
      <TechnologySection />
    </div>
  );
}
