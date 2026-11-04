'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Check, ShoppingBag, Volume2, Compass } from 'lucide-react';
import { quizQuestions, getRecommendation, type QuizAnswer } from '@/lib/recommendations';
import { products, formatPrice } from '@/data/products';
import { useCartStore } from '@/lib/cart';

export default function DiscoveryQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswer>>({});
  const [resultRaga, setResultRaga] = useState<ReturnType<typeof getRecommendation> | null>(null);
  const [isAdded, setIsAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const currentQuestion = quizQuestions[currentStep];

  const handleSelectOption = (value: string) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };
    setAnswers(updatedAnswers);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate recommendation
      const rec = getRecommendation(updatedAnswers as QuizAnswer);
      setResultRaga(rec);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentStep(0);
    setResultRaga(null);
  };

  // Find matching EDP product for the recommended raga
  const recommendedProduct = resultRaga
    ? products.find((p) => p.ragaId === resultRaga.id && p.category === 'perfume')
    : null;

  const handleAddToCart = () => {
    if (recommendedProduct) {
      addItem({
        productId: recommendedProduct.id,
        name: recommendedProduct.name,
        price: recommendedProduct.price,
        size: recommendedProduct.size,
        ragaId: recommendedProduct.ragaId,
        category: recommendedProduct.category,
      });
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2500);
    }
  };

  return (
    <section id="quiz" className="relative bg-[#17131D] py-24 md:py-32 overflow-hidden text-white border-t border-[#B38A45]/30">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[550px] w-[550px] rounded-full blur-[160px] opacity-20 bg-[#B38A45]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[400px] w-[400px] rounded-full blur-[140px] opacity-15 bg-[#B96A2D]" />

      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#B38A45]/40 bg-white/5 mb-4 backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-[#D6B77C]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D6B77C] font-mono">
              Personalized Olfactory Consultation
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
            Find your <span className="italic font-normal text-[#D6B77C]">raga.</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 font-sans max-w-2xl mx-auto leading-relaxed">
            Answer four questions to harmonize your biological clock, emotional state, and fragrance preference 
            with your designated classical Indian raga.
          </p>
        </div>

        {/* Quiz Container Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!resultRaga ? (
              /* Questions Stage */
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col"
              >
                {/* Progress bar */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D6B77C]">
                    Question {currentStep + 1} of {quizQuestions.length}
                  </span>
                  <div className="flex gap-1.5">
                    {quizQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentStep
                            ? 'w-8 bg-[#D6B77C]'
                            : idx < currentStep
                            ? 'w-4 bg-[#B38A45]'
                            : 'w-4 bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-8">
                  {currentQuestion.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3.5">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSelectOption(option.value)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#D6B77C]/60 transition-all duration-200 flex items-center justify-between group cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                          {option.icon}
                        </span>
                        <span className="font-sans text-sm sm:text-base text-white/90 group-hover:text-white">
                          {option.label}
                        </span>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#D6B77C] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Results Stage */
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                {/* Result Tag */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D6B77C]" />
                    <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D6B77C]">
                      Your Harmonized Raga Match
                    </span>
                  </div>
                  <button
                    onClick={handleRestart}
                    className="text-xs font-mono uppercase tracking-wider text-white/60 hover:text-white flex items-center gap-1.5 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Quiz</span>
                  </button>
                </div>

                {/* Main Result Showcase */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  {/* Left: Atmospheric Match Vessel Visual */}
                  <div className="md:col-span-5 relative flex flex-col items-center justify-center p-8 rounded-2xl bg-[#0F0C13] border border-white/10 overflow-hidden min-h-[320px]">
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${resultRaga.colors.gradient} opacity-80`}
                    />
                    <div className="relative z-10 text-5xl mb-4">{resultRaga.icon}</div>
                    <div className="relative z-10 text-center">
                      <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#D6B77C] block mb-1">
                        PRAHAR • {resultRaga.number}
                      </span>
                      <h4 className="font-serif text-3xl text-white">
                        {resultRaga.name}
                      </h4>
                      <span className="text-xs text-white/70 block mt-0.5">
                        {resultRaga.nameDevanagari}
                      </span>
                      <span className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-black/40 border border-white/20 text-[#D6B77C]">
                        {resultRaga.time}
                      </span>
                    </div>
                  </div>

                  {/* Right: Raga Story & Purchase */}
                  <div className="md:col-span-7 flex flex-col justify-center">
                    <div className="text-xs uppercase font-mono tracking-widest text-[#D6B77C]">
                      Mood: {resultRaga.mood} • Atmosphere: {resultRaga.timeRange}
                    </div>

                    <h3 className="font-serif text-3xl sm:text-4xl text-white mt-1">
                      {resultRaga.name} — Eau de Parfum
                    </h3>

                    <p className="font-serif italic text-lg text-[#D6B77C] mt-2">
                      "{resultRaga.character}"
                    </p>

                    <p className="mt-3 text-sm text-white/70 leading-relaxed font-sans">
                      {resultRaga.longDescription}
                    </p>

                    {/* Fragrance Notes pills */}
                    <div className="mt-5 pt-4 border-t border-white/10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-2">
                        Fragrance Profile
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          ...resultRaga.fragranceNotes.top,
                          ...resultRaga.fragranceNotes.heart,
                          ...resultRaga.fragranceNotes.base,
                        ].map((note) => (
                          <span
                            key={note}
                            className="text-xs text-white/80 bg-white/5 px-2.5 py-1 rounded-md border border-white/10"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 py-3 px-6 rounded-full bg-[#B38A45] hover:bg-[#8B6914] text-white text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4 text-white" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-white" />
                            <span>Add to Bag — {recommendedProduct ? formatPrice(recommendedProduct.price) : '₹2,799'}</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/experience/${resultRaga.id}`}
                        className="py-3 px-5 rounded-full border border-white/20 hover:border-[#D6B77C] hover:text-[#D6B77C] text-white text-xs uppercase tracking-[0.15em] font-semibold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Volume2 className="w-4 h-4 text-[#D6B77C]" />
                        <span>Hear Soundtrack</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
