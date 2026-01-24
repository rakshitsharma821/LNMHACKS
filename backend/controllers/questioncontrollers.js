const Question = require('../models/question');
const Answer = require('../models/result');
const Result = require('../models/result');

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({}).select('-createdAt');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const submitAnswers = async (req, res) => {
  const { answers } = req.body; 
  const userId = req.user._id;

  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ message: 'Please submit an array of answers.' });
  }

  let totalScore = 0;
  const newAnswers = [];

  for (const ans of answers) {
    const { questionId, selectedOptionScore } = ans;


    if (selectedOptionScore < 1 || selectedOptionScore > 5) {
      return res.status(400).json({ message: `Invalid score for question ${questionId}. Scores must be between 1 and 5.` });
    }

    totalScore += selectedOptionScore;
    newAnswers.push({
      user: userId,
      question: questionId,
      selectedOptionScore: selectedOptionScore
    });
  }

  try {
   
    await Answer.insertMany(newAnswers);

    let riskCategory;
    let recommendations;

  
    const NUMBER_OF_QUESTIONS = answers.length; 
    const MAX_POSSIBLE_SCORE = NUMBER_OF_QUESTIONS * 5; 

    
    const LOW_RISK_THRESHOLD = MAX_POSSIBLE_SCORE * 0.4;    
    const MODERATE_RISK_THRESHOLD = MAX_POSSIBLE_SCORE * 0.7; 

    if (totalScore <= LOW_RISK_THRESHOLD) {
      riskCategory = 'Low Risk';
      recommendations = 'Focus on self-care tips: ensure adequate sleep, maintain a balanced diet, engage in regular physical activity, and practice mindfulness. Spend time with loved ones and pursue hobbies.';
    } else if (totalScore <= MODERATE_RISK_THRESHOLD) {
      riskCategory = 'Moderate Risk';
      recommendations = 'Explore resources such as mental health apps (e.g., Calm, Headspace), online support groups, and educational materials on stress management. Consider talking to a trusted friend or family member.';
    } else { 
      riskCategory = 'High Risk';
      recommendations = 'It is highly recommended to seek professional support. We suggest a 1-on-1 counseling referral. Please reach out to a mental health professional for personalized guidance and support.';
    }
  
    const result = await Result.findOneAndUpdate(
      { user: userId },
      {
        totalScore,
        riskCategory,
        recommendations,
        createdAt: Date.now() 
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(201).json({
      totalScore: result.totalScore,
      riskCategory: result.riskCategory,
      recommendations: result.recommendations
    });

  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ message: error.message });
  }
};


const seedQuestions = async (req, res) => {
  try {
    await Question.deleteMany({});
    const questionsData = [
      {
        text: "How often do you feel overwhelmed or stressed?",
        options: [
          { text: "Never", score: 1 },
          { text: "Rarely", score: 2 },
          { text: "Sometimes", score: 3 },
          { text: "Often", score: 4 },
          { text: "Always", score: 5 }
        ]
      },
      {
        text: "How would you rate your sleep quality recently?",
        options: [
          { text: "Excellent", score: 1 },
          { text: "Good", score: 2 },
          { text: "Fair", score: 3 },
          { text: "Poor", score: 4 },
          { text: "Very Poor", score: 5 }
        ]
      },
      {
        text: "How often do you find yourself feeling sad or down?",
        options: [
          { text: "Never", score: 1 },
          { text: "Rarely", score: 2 },
          { text: "Sometimes", score: 3 },
          { text: "Often", score: 4 },
          { text: "Always", score: 5 }
        ]
      },
      {
        text: "How much interest do you have in activities you used to enjoy?",
        options: [
          { text: "A lot", score: 1 },
          { text: "Some", score: 2 },
          { text: "A little", score: 3 },
          { text: "Very little", score: 4 },
          { text: "None at all", score: 5 }
        ]
      },
      {
        text: "How often do you feel anxious or restless?",
        options: [
          { text: "Never", score: 1 },
          { text: "Rarely", score: 2 },
          { text: "Sometimes", score: 3 },
          { text: "Often", score: 4 },
          { text: "Always", score: 5 }
        ]
      },
      {
        text: "How well do you manage daily tasks and responsibilities?",
        options: [
          { text: "Very well", score: 1 },
          { text: "Well", score: 2 },
          { text: "Moderately well", score: 3 },
          { text: "Not very well", score: 4 },
          { text: "Not at all", score: 5 }
        ]
      },
      {
        text: "How often do you feel isolated or lonely?",
        options: [
          { text: "Never", score: 1 },
          { text: "Rarely", score: 2 },
          { text: "Sometimes", score: 3 },
          { text: "Often", score: 4 },
          { text: "Always", score: 5 }
        ]
      },
      {
        text: "How easily do you get irritated or angry?",
        options: [
          { text: "Not at all easily", score: 1 },
          { text: "Rarely easily", score: 2 },
          { text: "Moderately easily", score: 3 },
          { text: "Quite easily", score: 4 },
          { text: "Very easily", score: 5 }
        ]
      },
      {
        text: "How would you describe your current appetite?",
        options: [
          { text: "Normal", score: 1 },
          { text: "Slightly reduced/increased", score: 2 },
          { text: "Moderately reduced/increased", score: 3 },
          { text: "Significantly reduced/increased", score: 4 },
          { text: "No appetite/constant hunger", score: 5 }
        ]
      },
      {
        text: "How confident do you feel about your ability to handle personal problems?",
        options: [
          { text: "Very confident", score: 1 },
          { text: "Confident", score: 2 },
          { text: "Moderately confident", score: 3 },
          { text: "Not very confident", score: 4 },
          { text: "Not confident at all", score: 5 }
        ]
      }
    ];

    await Question.insertMany(questionsData);
    res.status(201).json({ message: 'Questions seeded successfully!' });
  } catch (error) {
    console.error("Error seeding questions:", error);
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getQuestions,
  submitAnswers,
  seedQuestions,
};
