import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import {
  Mic,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  RefreshCcw,
  Volume2,
  MessageSquare,
  Edit,
} from 'lucide-react-native';
import { router } from 'expo-router';

export default function FeedbackScreen() {
  const [activeTab, setActiveTab] = useState('pronunciation');
  const [recording, setRecording] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [feedbackProvided, setFeedbackProvided] = useState(false);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-Medium': Poppins_500Medium,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleStartRecording = () => {
    setRecording(true);
    // In a real app, you would start the actual recording here

    // Simulate recording ending after 3 seconds
    setTimeout(() => {
      setRecording(false);
      setFeedbackProvided(true);
    }, 3000);
  };

  const handleSubmitText = () => {
    if (textInput.trim().length > 0) {
      setFeedbackProvided(true);
    }
  };

  const handleReset = () => {
    setTextInput('');
    setFeedbackProvided(false);
  };

  const renderPronunciationTab = () => (
    <View style={styles.tabContent}>
      {!feedbackProvided ? (
        <>
          <View style={styles.instructionCard}>
            <Text style={styles.instructionTitle}>Pronunciation Practice</Text>
            <Text style={styles.instructionText}>
              Tap the microphone button and read the following sentence:
            </Text>
            <View style={styles.sentenceCard}>
              <Text style={styles.sentenceText}>
                "The cultural differences between Eastern and Western business
                meetings are significant."
              </Text>
              <TouchableOpacity style={styles.playButton}>
                <Volume2 size={20} color="#E1742F" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.recordButton, recording && styles.recordingButton]}
            onPress={handleStartRecording}
          >
            <Mic size={32} color={recording ? '#FF4D4F' : '#FFFFFF'} />
            <Text style={styles.recordButtonText}>
              {recording ? 'Recording...' : 'Tap to Record'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.feedbackContainer}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackTitle}>
              Your Pronunciation Feedback
            </Text>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <RefreshCcw size={16} color="#666" />
              <Text style={styles.resetText}>Try Again</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.recordingPlayback}>
            <TouchableOpacity style={styles.playbackButton}>
              <Volume2 size={20} color="#E1742F" />
              <Text style={styles.playbackText}>Play Your Recording</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreTitle}>Overall Score</Text>
            <Text style={styles.scoreValue}>85%</Text>
            <Text style={styles.scoreDescription}>
              Great job! Your pronunciation is clear.
            </Text>
          </View>

          <View style={styles.detailedFeedback}>
            <Text style={styles.detailedTitle}>Word-by-Word Analysis</Text>

            <View style={styles.wordFeedbackRow}>
              <View style={styles.wordContainer}>
                <Text style={styles.wordText}>cultural</Text>
                <CheckCircle2 size={16} color="#10B981" />
              </View>
              <Text style={styles.wordFeedback}>Perfect pronunciation</Text>
            </View>

            <View style={styles.wordFeedbackRow}>
              <View style={styles.wordContainer}>
                <Text style={styles.wordText}>differences</Text>
                <XCircle size={16} color="#FF4D4F" />
              </View>
              <Text style={styles.wordFeedback}>
                Try emphasizing the first syllable: "DIF-fer-ences"
              </Text>
            </View>

            <View style={styles.wordFeedbackRow}>
              <View style={styles.wordContainer}>
                <Text style={styles.wordText}>significant</Text>
                <CheckCircle2 size={16} color="#10B981" />
              </View>
              <Text style={styles.wordFeedback}>Good pronunciation</Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Improvement Tip</Text>
            <Text style={styles.tipText}>
              Practice the "th" sound in "the" by placing your tongue between
              your teeth and gently blowing air out.
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderGrammarTab = () => (
    <View style={styles.tabContent}>
      {!feedbackProvided ? (
        <>
          <View style={styles.instructionCard}>
            <Text style={styles.instructionTitle}>Grammar Check</Text>
            <Text style={styles.instructionText}>
              Write a sentence about cultural differences in business
              communication:
            </Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              multiline
              placeholder="Type your sentence here..."
              value={textInput}
              onChangeText={setTextInput}
            />
            <TouchableOpacity
              style={[
                styles.submitButton,
                !textInput.trim() && styles.disabledButton,
              ]}
              onPress={handleSubmitText}
              disabled={!textInput.trim()}
            >
              <Text style={styles.submitButtonText}>Check Grammar</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.feedbackContainer}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackTitle}>Grammar Feedback</Text>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <RefreshCcw size={16} color="#666" />
              <Text style={styles.resetText}>Try Again</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.originalTextCard}>
            <Text style={styles.originalTextLabel}>Your text:</Text>
            <Text style={styles.originalText}>
              {textInput ||
                'In Asian countries, people usually bow instead of shake hands when they meeting someone.'}
            </Text>
          </View>

          <View style={styles.correctionCard}>
            <Text style={styles.correctionLabel}>Corrected version:</Text>
            <Text style={styles.correctionText}>
              In Asian countries, people usually bow instead of{' '}
              <Text style={styles.highlightedCorrection}>shaking</Text> hands
              when they <Text style={styles.highlightedCorrection}>meet</Text>{' '}
              someone.
            </Text>
          </View>

          <View style={styles.grammarFeedbackList}>
            <Text style={styles.grammarFeedbackTitle}>Grammar Issues:</Text>

            <View style={styles.grammarFeedbackItem}>
              <View style={styles.grammarIssueHeader}>
                <XCircle size={16} color="#FF4D4F" />
                <Text style={styles.grammarIssueTitle}>Verb Form Error</Text>
              </View>
              <Text style={styles.grammarIssueDescription}>
                "shake" should be "shaking" (gerund form after "instead of")
              </Text>
            </View>

            <View style={styles.grammarFeedbackItem}>
              <View style={styles.grammarIssueHeader}>
                <XCircle size={16} color="#FF4D4F" />
                <Text style={styles.grammarIssueTitle}>Verb Tense Error</Text>
              </View>
              <Text style={styles.grammarIssueDescription}>
                "meeting" should be "meet" (present tense after "they")
              </Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Grammar Tip</Text>
            <Text style={styles.tipText}>
              After "instead of," use the -ing form (gerund) of the verb.
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderToneTab = () => (
    <View style={styles.tabContent}>
      {!feedbackProvided ? (
        <>
          <View style={styles.instructionCard}>
            <Text style={styles.instructionTitle}>Tone Analysis</Text>
            <Text style={styles.instructionText}>
              Write a business email requesting a meeting with a potential
              client:
            </Text>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, styles.toneTextInput]}
              multiline
              placeholder="Type your business email here..."
              value={textInput}
              onChangeText={setTextInput}
            />
            <TouchableOpacity
              style={[
                styles.submitButton,
                !textInput.trim() && styles.disabledButton,
              ]}
              onPress={handleSubmitText}
              disabled={!textInput.trim()}
            >
              <Text style={styles.submitButtonText}>Analyze Tone</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.feedbackContainer}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.feedbackTitle}>Tone Analysis</Text>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <RefreshCcw size={16} color="#666" />
              <Text style={styles.resetText}>Try Again</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.originalTextCard}>
            <Text style={styles.originalTextLabel}>Your email:</Text>
            <Text style={styles.originalText}>
              {textInput ||
                "Hey there! I want to meet with you ASAP to discuss our business. Let me know when you're free. Thanks!"}
            </Text>
          </View>

          <View style={styles.toneAnalysisCard}>
            <Text style={styles.toneAnalysisTitle}>Tone Analysis:</Text>
            <View style={styles.toneScores}>
              <View style={styles.toneScoreItem}>
                <Text style={styles.toneScoreLabel}>Formality</Text>
                <View style={styles.toneScoreBar}>
                  <View
                    style={[
                      styles.toneScoreFill,
                      { width: '30%', backgroundColor: '#FF4D4F' },
                    ]}
                  />
                </View>
                <Text style={styles.toneScoreValue}>Too Casual</Text>
              </View>

              <View style={styles.toneScoreItem}>
                <Text style={styles.toneScoreLabel}>Politeness</Text>
                <View style={styles.toneScoreBar}>
                  <View
                    style={[
                      styles.toneScoreFill,
                      { width: '50%', backgroundColor: '#FAAD14' },
                    ]}
                  />
                </View>
                <Text style={styles.toneScoreValue}>Moderately Polite</Text>
              </View>

              <View style={styles.toneScoreItem}>
                <Text style={styles.toneScoreLabel}>Clarity</Text>
                <View style={styles.toneScoreBar}>
                  <View
                    style={[
                      styles.toneScoreFill,
                      { width: '60%', backgroundColor: '#52C41A' },
                    ]}
                  />
                </View>
                <Text style={styles.toneScoreValue}>Clear</Text>
              </View>
            </View>
          </View>

          <View style={styles.toneSuggestionCard}>
            <Text style={styles.toneSuggestionTitle}>
              Suggested Improvements:
            </Text>
            <View style={styles.toneSuggestionItem}>
              <Edit size={16} color="#E1742F" />
              <Text style={styles.toneSuggestionText}>
                Use a more formal greeting like "Dear [Name]" instead of "Hey
                there!"
              </Text>
            </View>
            <View style={styles.toneSuggestionItem}>
              <Edit size={16} color="#E1742F" />
              <Text style={styles.toneSuggestionText}>
                Avoid abbreviations like "ASAP" in formal business communication
              </Text>
            </View>
            <View style={styles.toneSuggestionItem}>
              <Edit size={16} color="#E1742F" />
              <Text style={styles.toneSuggestionText}>
                Add more context about the purpose of the meeting
              </Text>
            </View>
          </View>

          <View style={styles.improvedVersionCard}>
            <Text style={styles.improvedVersionTitle}>Improved Version:</Text>
            <Text style={styles.improvedVersionText}>
              "Dear [Name], I hope this email finds you well. I would like to
              schedule a meeting with you at your earliest convenience to
              discuss potential business opportunities between our companies.
              Please let me know your availability for the coming week. Thank
              you for your consideration. Best regards, [Your Name]"
            </Text>
          </View>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ChevronLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Personalized Feedback</Text>
        <View style={styles.headerRight} />
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'pronunciation' && styles.activeTab,
          ]}
          onPress={() => {
            setActiveTab('pronunciation');
            setFeedbackProvided(false);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'pronunciation' && styles.activeTabText,
            ]}
          >
            Pronunciation
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'grammar' && styles.activeTab]}
          onPress={() => {
            setActiveTab('grammar');
            setFeedbackProvided(false);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'grammar' && styles.activeTabText,
            ]}
          >
            Grammar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'tone' && styles.activeTab]}
          onPress={() => {
            setActiveTab('tone');
            setFeedbackProvided(false);
          }}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'tone' && styles.activeTabText,
            ]}
          >
            Tone
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {activeTab === 'pronunciation' && renderPronunciationTab()}
        {activeTab === 'grammar' && renderGrammarTab()}
        {activeTab === 'tone' && renderToneTab()}

        <View style={styles.chatHelpContainer}>
          <TouchableOpacity
            style={styles.chatHelpButton}
            onPress={() => router.push('/chat')}
          >
            <MessageSquare size={20} color="#FFFFFF" />
            <Text style={styles.chatHelpText}>Get help from AI tutor</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  headerRight: {
    width: 32,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFFFFF',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E1742F',
  },
  tabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#E1742F',
    fontFamily: 'Poppins-SemiBold',
  },
  tabContent: {
    paddingVertical: 16,
  },
  instructionCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  instructionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  instructionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  sentenceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  sentenceText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  playButton: {
    padding: 8,
  },
  recordButton: {
    backgroundColor: '#E1742F',
    borderRadius: 50,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    width: '80%',
  },
  recordingButton: {
    backgroundColor: '#FFE8E8',
    borderWidth: 1,
    borderColor: '#FF4D4F',
  },
  recordButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  textInputContainer: {
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    padding: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    backgroundColor: '#FFFFFF',
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  toneTextInput: {
    minHeight: 150,
  },
  submitButton: {
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  feedbackContainer: {
    backgroundColor: '#FFFFFF',
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  feedbackTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  resetButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  resetText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  scoreCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  scoreTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  scoreValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#E1742F',
    marginBottom: 8,
  },
  scoreDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  recordingPlayback: {
    alignItems: 'center',
    marginBottom: 16,
  },
  playbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FBE9D7',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  playbackText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E1742F',
    marginLeft: 8,
  },
  detailedFeedback: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  detailedTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  wordFeedbackRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  wordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
    marginRight: 8,
  },
  wordText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  wordFeedback: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  tipCard: {
    backgroundColor: '#FBE9D7',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  tipTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#E1742F',
    marginBottom: 8,
  },
  tipText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  originalTextCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  originalTextLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  originalText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  correctionCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  correctionLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  correctionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  highlightedCorrection: {
    backgroundColor: '#E6F7FF',
    color: '#1890FF',
    fontFamily: 'Poppins-Medium',
  },
  grammarFeedbackList: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  grammarFeedbackTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  grammarFeedbackItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  grammarIssueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  grammarIssueTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  grammarIssueDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    paddingLeft: 24,
  },
  toneAnalysisCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  toneAnalysisTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  toneScores: {
    marginBottom: 8,
  },
  toneScoreItem: {
    marginBottom: 12,
  },
  toneScoreLabel: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  toneScoreBar: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
    marginBottom: 4,
  },
  toneScoreFill: {
    height: '100%',
    borderRadius: 4,
  },
  toneScoreValue: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  toneSuggestionCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  toneSuggestionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  toneSuggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  toneSuggestionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  improvedVersionCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  improvedVersionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  improvedVersionText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  chatHelpContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chatHelpButton: {
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatHelpText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
