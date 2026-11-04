import DiscoveryQuiz from '@/components/DiscoveryQuiz';

export const metadata = {
  title: 'Find Your Raga — Interactive Fragrance Discovery | PRAHAR',
  description:
    'Discover which Indian classical raga matches your biorhythm, mood, and olfactory preferences. Experience custom fragrance recommendations.',
};

export default function QuizPage() {
  return (
    <div className="pt-24 pb-28 bg-[#17131D] min-h-screen">
      <DiscoveryQuiz />
    </div>
  );
}
