import { ragas, type Raga } from '@/data/ragas';

export interface QuizAnswer {
  timeOfDay: 'dawn' | 'midday' | 'twilight' | 'midnight' | 'monsoon';
  atmosphere: 'meditative' | 'energetic' | 'romantic' | 'regal' | 'earthy';
  fragranceFamily: 'woody' | 'fresh' | 'floral' | 'oriental' | 'green';
  mood: 'calm' | 'vibrant' | 'passionate' | 'powerful' | 'refreshed';
}

const ragaScores: Record<string, Record<string, number>> = {
  bhairav: {
    dawn: 3, meditative: 3, woody: 3, calm: 3,
    midday: 0, energetic: 0, fresh: 1, vibrant: 0,
    twilight: 1, romantic: 0, floral: 0, passionate: 0,
    midnight: 1, regal: 1, oriental: 1, powerful: 1,
    monsoon: 0, earthy: 2, green: 0, refreshed: 0,
  },
  sarang: {
    dawn: 0, meditative: 0, woody: 0, calm: 0,
    midday: 3, energetic: 3, fresh: 3, vibrant: 3,
    twilight: 1, romantic: 0, floral: 1, passionate: 0,
    midnight: 0, regal: 0, oriental: 0, powerful: 0,
    monsoon: 1, earthy: 0, green: 2, refreshed: 2,
  },
  yaman: {
    dawn: 0, meditative: 0, woody: 0, calm: 1,
    midday: 0, energetic: 0, fresh: 0, vibrant: 0,
    twilight: 3, romantic: 3, floral: 3, passionate: 3,
    midnight: 1, regal: 1, oriental: 2, powerful: 0,
    monsoon: 0, earthy: 0, green: 0, refreshed: 0,
  },
  darbari: {
    dawn: 0, meditative: 1, woody: 2, calm: 0,
    midday: 0, energetic: 0, fresh: 0, vibrant: 0,
    twilight: 1, romantic: 1, floral: 0, passionate: 1,
    midnight: 3, regal: 3, oriental: 3, powerful: 3,
    monsoon: 0, earthy: 1, green: 0, refreshed: 0,
  },
  malhar: {
    dawn: 1, meditative: 1, woody: 0, calm: 1,
    midday: 0, energetic: 1, fresh: 2, vibrant: 0,
    twilight: 0, romantic: 0, floral: 0, passionate: 0,
    midnight: 0, regal: 0, oriental: 0, powerful: 0,
    monsoon: 3, earthy: 3, green: 3, refreshed: 3,
  },
};

export function getRecommendation(answers: QuizAnswer): Raga {
  const scores: Record<string, number> = {};

  for (const raga of ragas) {
    const ragaScore = ragaScores[raga.id];
    if (!ragaScore) continue;

    let score = 0;
    score += ragaScore[answers.timeOfDay] || 0;
    score += ragaScore[answers.atmosphere] || 0;
    score += ragaScore[answers.fragranceFamily] || 0;
    score += ragaScore[answers.mood] || 0;

    scores[raga.id] = score;
  }

  let bestId = 'yaman';
  let bestScore = 0;

  for (const [id, score] of Object.entries(scores)) {
    if (score > bestScore) {
      bestScore = score;
      bestId = id;
    }
  }

  return ragas.find((r) => r.id === bestId) || ragas[2];
}

export const quizQuestions = [
  {
    id: 'timeOfDay',
    question: 'What time of day do you feel most like yourself?',
    options: [
      { value: 'dawn', label: 'The quiet stillness of early morning', icon: '🌅' },
      { value: 'midday', label: 'The bright energy of noon', icon: '☀️' },
      { value: 'twilight', label: 'The golden warmth of evening', icon: '🌇' },
      { value: 'midnight', label: 'The deep mystery of night', icon: '🌙' },
      { value: 'monsoon', label: 'The fresh renewal of rain', icon: '🌧️' },
    ],
  },
  {
    id: 'atmosphere',
    question: 'What kind of atmosphere attracts you?',
    options: [
      { value: 'meditative', label: 'Peaceful and contemplative', icon: '🧘' },
      { value: 'energetic', label: 'Vibrant and alive', icon: '⚡' },
      { value: 'romantic', label: 'Warm and intimate', icon: '🕯️' },
      { value: 'regal', label: 'Grand and commanding', icon: '👑' },
      { value: 'earthy', label: 'Natural and grounding', icon: '🌿' },
    ],
  },
  {
    id: 'fragranceFamily',
    question: 'Which fragrance family do you prefer?',
    options: [
      { value: 'woody', label: 'Sandalwood, vetiver and cedarwood', icon: '🪵' },
      { value: 'fresh', label: 'Citrus, neroli and green tea', icon: '🍋' },
      { value: 'floral', label: 'Rose, jasmine and tuberose', icon: '🌹' },
      { value: 'oriental', label: 'Oud, saffron and amber', icon: '✨' },
      { value: 'green', label: 'Petrichor, leaves and earth', icon: '🌱' },
    ],
  },
  {
    id: 'mood',
    question: 'What mood do you want your fragrance to evoke?',
    options: [
      { value: 'calm', label: 'Inner peace and tranquillity', icon: '🕊️' },
      { value: 'vibrant', label: 'Joy and confidence', icon: '🌟' },
      { value: 'passionate', label: 'Romance and desire', icon: '🔥' },
      { value: 'powerful', label: 'Strength and authority', icon: '⚔️' },
      { value: 'refreshed', label: 'Clarity and renewal', icon: '💧' },
    ],
  },
];
