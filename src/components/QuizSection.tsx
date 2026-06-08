import React, { useState } from 'react';
import { QuizQuestion, Service } from '../types';
import { CONSULTATION_QUIZ, SERVICES } from '../data/salonData';
import { ArrowRight, RotateCcw, CheckCircle, HelpCircle, CalendarDays, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizSectionProps {
  onSuggestAndBook: (serviceId: string) => void;
}

export default function QuizSection({ onSuggestAndBook }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion = CONSULTATION_QUIZ[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < CONSULTATION_QUIZ.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
  };

  // Compile recommended service based on serviceTag votes
  const getRecommendedService = (): Service => {
    const tags: string[] = [];
    CONSULTATION_QUIZ.forEach(q => {
      const selectedOptionId = selectedAnswers[q.id];
      const option = q.options.find(o => o.id === selectedOptionId);
      if (option) {
        tags.push(option.serviceTag);
      }
    });

    // Count occurrences
    const counts: Record<string, number> = {};
    let topTag = 'haircut-precision'; // default fallback
    let maxCount = 0;

    tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
      if (counts[tag] > maxCount) {
        maxCount = counts[tag];
        topTag = tag;
      }
    });

    // Find the actual service
    return SERVICES.find(s => s.id === topTag) || SERVICES[0];
  };

  const recommendedService = quizFinished ? getRecommendedService() : null;

  return (
    <div className="w-full bg-peach-light/30 rounded-3xl p-6 md:p-10 border border-peach-dark/40 shadow-sm relative overflow-hidden">


      <AnimatePresence mode="wait">
        {!quizFinished ? (
          <motion.div
            key="quiz-body"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full"
          >
            {/* Quiz Indicator */}
            <div className="flex items-center justify-between mb-6">
              <span className="flex items-center gap-1.5 text-xs font-bold text-salon-accent uppercase tracking-widest font-sans">
                <HelpCircle className="w-3.5 h-3.5 text-salon-accent" />
                Virtual Advisor
              </span>
              <span className="text-xs font-semibold text-charcoal-light font-mono bg-peach-dark/30 px-3 py-1 rounded-full">
                Step {currentQuestionIndex + 1} of {CONSULTATION_QUIZ.length}
              </span>
            </div>

            {/* Title / Question */}
            <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight text-charcoal-deep leading-snug mb-8">
              {currentQuestion.text}
            </h3>

            {/* Answer Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    className={`text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col gap-1 cursor-pointer group ${
                      isSelected
                        ? 'border-salon-accent bg-white shadow-md shadow-salon-accent/5 ring-1 ring-salon-accent'
                        : 'border-peach-dark/60 bg-cream-white/50 hover:bg-white hover:border-peach-dark hover:shadow-sm'
                    }`}
                  >
                    <p className={`text-sm font-semibold transition-colors duration-300 ${
                      isSelected ? 'text-salon-accent' : 'text-charcoal-deep group-hover:text-salon-accent'
                    }`}>
                      {option.text}
                    </p>
                    <p className="text-xs text-charcoal-light leading-snug">
                      {option.description}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Actions Controls Row */}
            <div className="flex items-center justify-between mt-auto pt-4 border-t border-peach-dark/30">
              <button
                onClick={handleBack}
                disabled={currentQuestionIndex === 0}
                className={`flex items-center gap-1 text-xs font-bold font-sans transition-colors ${
                  currentQuestionIndex === 0
                    ? 'text-charcoal-light/35 cursor-not-allowed'
                    : 'text-charcoal-light hover:text-salon-accent cursor-pointer'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!selectedAnswers[currentQuestion.id]}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full font-semibold text-xs transition-all ${
                  selectedAnswers[currentQuestion.id]
                    ? 'bg-charcoal-deep text-white hover:bg-salon-accent shadow-sm cursor-pointer'
                    : 'bg-charcoal-deep/10 text-charcoal-light/45 cursor-not-allowed'
                }`}
              >
                {currentQuestionIndex === CONSULTATION_QUIZ.length - 1 ? 'Get Results' : 'Continue'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center p-2"
          >
            <div className="p-3 bg-green-100 rounded-full text-green-600 mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8" />
            </div>

            <span className="text-[10px] bg-green-50 text-green-700 font-bold px-3 py-1 rounded-full uppercase tracking-widest font-sans border border-green-200/50">
              Analysis Completed
            </span>

            <h3 className="font-serif text-2xl md:text-3.5xl font-medium text-charcoal-deep mt-4">
              Your Ideal Hair Formula
            </h3>
            
            <p className="text-xs text-charcoal-light max-w-md font-sans mt-2">
              Based on Sri Lankan humidity metrics, current styling stresses, and low touch-up patterns, we recommend booking the following solution:
            </p>

            {/* Recommended Service Core Card */}
            {recommendedService && (
              <div className="w-full max-w-md bg-white border border-peach-dark rounded-2xl p-5 my-6 shadow-sm flex flex-col sm:flex-row gap-4 text-left group">
                {recommendedService.imageUrl && (
                  <img
                    src={recommendedService.imageUrl}
                    alt={recommendedService.name}
                    className="w-full sm:w-24 h-24 object-cover rounded-xl border border-peach-light"
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <span className="text-[10px] text-salon-accent font-bold uppercase tracking-wider font-sans">
                      {recommendedService.tagline}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-charcoal-deep leading-tight mt-0.5">
                      {recommendedService.name}
                    </h4>
                    <p className="text-xs text-charcoal-light leading-snug font-sans mt-1">
                      {recommendedService.description.slice(0, 85)}...
                    </p>
                  </div>
                  
                  <div className="flex items-end justify-between mt-3">
                    <span className="font-sans text-sm font-extrabold text-salon-accent">
                      Rs. {recommendedService.priceLKR.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-charcoal-light font-mono bg-peach-light px-2.5 py-0.5 rounded">
                      {recommendedService.durationMinutes} Mins
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* CTA controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm mt-2">
              <button
                onClick={() => recommendedService && onSuggestAndBook(recommendedService.id)}
                className="w-full py-3 bg-salon-accent hover:bg-salon-accent-hover text-white rounded-full text-xs font-bold font-sans shadow-md shadow-salon-accent/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-white" />
                Select & Book This Solution
              </button>
              
              <button
                onClick={handleReset}
                className="w-full sm:w-auto py-3 px-5 bg-white hover:bg-peach-light/20 border border-peach-dark rounded-full text-xs font-bold text-charcoal-light cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
