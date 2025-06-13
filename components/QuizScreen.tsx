import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { ArrowLeft, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInRight,
} from 'react-native-reanimated';
import { router } from 'expo-router';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the appropriate greeting in Japan?',
    options: ['A handshake', 'A bow', 'A high five', 'A hug'],
    correctAnswer: 1,
    explanation:
      "In Japan, bowing is the traditional greeting. The depth and duration of the bow depends on the situation and the person you're greeting.",
  },
  {
    id: 2,
    question: 'In which culture is it polite to leave food on your plate?',
    options: ['Chinese', 'American', 'Italian', 'Mexican'],
    correctAnswer: 0,
    explanation:
      'In Chinese culture, leaving a small amount of food indicates that the host provided more than enough food and you are satisfied.',
  },
  {
    id: 3,
    question: "What does the 'thumbs up' gesture mean in Australia?",
    options: [
      "It's offensive",
      "It means 'good job'",
      "It means 'I need a ride'",
      "It's a casual greeting",
    ],
    correctAnswer: 1,
    explanation:
      "In Australia, like in many Western countries, the thumbs up gesture generally means 'good job' or 'I approve'.",
  },
];

export default function QuizScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Inter_500Medium,
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    if (optionIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(student)')}
          style={styles.backButton}
        >
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gamified Quizzes</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {currentQuestionIndex + 1}/{quizQuestions.length}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!quizCompleted ? (
          <Animated.View
            key={currentQuestion.id}
            entering={SlideInRight}
            style={styles.questionContainer}
          >
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.optionsContainer}>
              {currentQuestion.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionCard,
                    selectedOption !== null &&
                      (index === currentQuestion.correctAnswer
                        ? styles.correctOption
                        : selectedOption === index
                        ? styles.incorrectOption
                        : {}),
                  ]}
                  onPress={() => handleOptionSelect(index)}
                  disabled={selectedOption !== null}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedOption !== null &&
                        (index === currentQuestion.correctAnswer
                          ? styles.correctOptionText
                          : selectedOption === index
                          ? styles.incorrectOptionText
                          : {}),
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {showExplanation && (
              <Animated.View
                entering={FadeIn}
                style={styles.explanationContainer}
              >
                <Text style={styles.explanationTitle}>Explanation:</Text>
                <Text style={styles.explanationText}>
                  {currentQuestion.explanation}
                </Text>

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={handleNextQuestion}
                >
                  <LinearGradient
                    colors={['#E1742F', '#F2994A']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.nextButtonText}>
                      {currentQuestionIndex < quizQuestions.length - 1
                        ? 'Next Question'
                        : 'See Results'}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            )}
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn} style={styles.resultsContainer}>
            <LinearGradient
              colors={['#E1742F', '#F2994A']}
              style={styles.resultsBadge}
            >
              <Award color="#FFFFFF" size={48} />
            </LinearGradient>

            <Text style={styles.resultsTitle}>Quiz Completed!</Text>
            <Text style={styles.resultsScore}>
              Your score: {score}/{quizQuestions.length}
            </Text>

            <View style={styles.resultsFeedback}>
              <Text style={styles.feedbackText}>
                {score === quizQuestions.length
                  ? "Perfect! You've mastered these cultural concepts."
                  : score >= quizQuestions.length / 2
                  ? "Good job! You're making progress in understanding different cultures."
                  : 'Keep learning! Cultural understanding takes practice.'}
              </Text>
            </View>

            <TouchableOpacity style={styles.restartButton} onPress={resetQuiz}>
              <LinearGradient
                colors={['#E1742F', '#F2994A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.restartButtonText}>Try Again</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={() => router.push('/(student)')}
            >
              <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9EC', // Updated to match app theme
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0', // Lighter border color
  },
  backButton: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333', // Updated to match app theme
    flex: 1,
    textAlign: 'center',
  },
  progressContainer: {
    backgroundColor: '#FEF3DD', // Updated to match app theme
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  progressText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#E1742F', // Updated to match app theme
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 20,
    color: '#333', // Updated to match app theme
    marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F0F0F0', // Lighter border color
  },
  optionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333', // Updated to match app theme
  },
  correctOption: {
    backgroundColor: '#F8F9EA', // Softer green to match theme
    borderColor: '#8BAB52', // Softer green to match theme
  },
  incorrectOption: {
    backgroundColor: '#FEF2F2',
    borderColor: '#E57373', // Softer red to match theme
  },
  correctOptionText: {
    color: '#8BAB52', // Softer green to match theme
  },
  incorrectOptionText: {
    color: '#E57373', // Softer red to match theme
  },
  explanationContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0', // Lighter border color
  },
  explanationTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333', // Updated to match app theme
    marginBottom: 8,
  },
  explanationText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#666', // Updated to match app theme
    marginBottom: 20,
    lineHeight: 24,
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 12,
  },
  nextButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  resultsContainer: {
    alignItems: 'center',
    padding: 20,
  },
  resultsBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resultsTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#333', // Updated to match app theme
    marginBottom: 8,
  },
  resultsScore: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#E1742F', // Updated to match app theme
    marginBottom: 24,
  },
  resultsFeedback: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    width: '100%',
    borderWidth: 1,
    borderColor: '#F0F0F0', // Lighter border color
  },
  feedbackText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#666', // Updated to match app theme
    lineHeight: 24,
    textAlign: 'center',
  },
  restartButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    marginBottom: 12,
  },
  restartButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  homeButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#F0F0F0', // Lighter border color
  },
  homeButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#666', // Updated to match app theme
  },
});
