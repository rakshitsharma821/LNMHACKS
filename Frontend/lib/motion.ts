// MindScoreAI Motion System - Single Source of Truth
// Motion intent: calming, predictable, non-stimulating

export const motionTiming = {
  press: 0.12, // 120ms
  transition: 0.26, // 260ms
  reveal: 0.7, // 700ms
} as const

export const motionVariants = {
  // Fade animation
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: motionTiming.transition },
  },

  // Subtle vertical slide (max 8px)
  slideUp: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: motionTiming.transition, ease: 'easeOut' },
  },

  // Gentle scale (0.98 → 1)
  scaleIn: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: motionTiming.transition, ease: 'easeOut' },
  },

  // Button press animation
  press: {
    whileTap: { scale: 0.98 },
    transition: { duration: motionTiming.press },
  },

  // Stagger children animation
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  // Breathing animation for CTAs
  breathing: {
    animate: {
      scale: [1, 1.02, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  // Chart draw animation
  chartDraw: {
    initial: { pathLength: 0 },
    animate: { pathLength: 1 },
    transition: { duration: motionTiming.reveal, ease: 'easeOut' },
  },
} as const

// Easing functions - only calm, smooth easings
export const easings = {
  default: [0.4, 0, 0.2, 1] as const,
  easeOut: [0, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
} as const
