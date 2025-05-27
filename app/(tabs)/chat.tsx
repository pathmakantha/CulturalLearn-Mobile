import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';
import { Send, ArrowLeft } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { router } from 'expo-router';

type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi CulturaLearn! Ready to boost your English skills today?',
      isUser: false,
      timestamp: new Date(Date.now() - 60000),
    },
  ]);
  const [input, setInput] = useState('');

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSend = () => {
    if (input.trim() === '') return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      let botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: '',
        isUser: false,
        timestamp: new Date(),
      };

      // Simple responses based on user input
      if (
        input.toLowerCase().includes('hello') ||
        input.toLowerCase().includes('hi')
      ) {
        botResponse.text = 'Hello! How can I help you practice English today?';
      } else if (input.toLowerCase().includes('break the ice')) {
        botResponse.text =
          "That's a great phrase! 'Breaking the ice' means to start a conversation in a social setting. For example, you might break the ice by asking someone about their interests.";
      } else if (input.toLowerCase().includes('sentence')) {
        botResponse.text =
          "Sure! Here's an example: 'I broke the ice at the international conference by asking about local cuisine.'";
      } else {
        botResponse.text =
          'Would you like to practice conversation about a specific topic? I can help with business English, travel situations, or everyday conversations.';
      }

      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.replace('/(tabs)')}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>AI Chatbot</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View style={styles.chatContainer}>
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.dailyTipContainer}>
              <Text style={styles.dailyTipTitle}>Here's your daily tip:</Text>
              <Text style={styles.phrase}>"Break the ice"</Text>
              <Text style={styles.meaning}>
                Meaning: To start a conversation in a social setting.
              </Text>
              <Text style={styles.example}>
                Example: "To break the ice, I told a funny story at the party"
              </Text>
            </View>

            {messages.map((message) => (
              <Animated.View
                key={message.id}
                entering={FadeIn.duration(300)}
                style={[
                  styles.messageBubble,
                  message.isUser ? styles.userMessage : styles.botMessage,
                ]}
              >
                {!message.isUser && (
                  <View style={styles.botAvatarContainer}>
                    <View style={styles.botAvatar}>
                      <Text style={styles.botAvatarText}>AI</Text>
                    </View>
                  </View>
                )}
                <View
                  style={[
                    styles.messageContent,
                    message.isUser
                      ? styles.userMessageContent
                      : styles.botMessageContent,
                  ]}
                >
                  <Text style={styles.messageText}>{message.text}</Text>
                </View>
              </Animated.View>
            ))}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              placeholderTextColor="#999"
              multiline
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                input.trim() ? styles.sendButtonActive : null,
              ]}
              onPress={handleSend}
              disabled={!input.trim()}
            >
              <Send size={20} color={input.trim() ? '#FFF' : '#999'} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9EC',
    paddingBottom: -32,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -40, // Adjust to center title accounting for the back button
  },
  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  chatContainer: {
    flex: 1,
    padding: 16,
  },
  dailyTipContainer: {
    backgroundColor: '#FEF3DD',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  dailyTipTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  phrase: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#E1742F',
    marginBottom: 4,
  },
  meaning: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  example: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageBubble: {
    marginBottom: 16,
    maxWidth: '80%',
    flexDirection: 'row',
  },
  userMessage: {
    alignSelf: 'flex-end',
  },
  botMessage: {
    alignSelf: 'flex-start',
  },
  botAvatarContainer: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E1742F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botAvatarText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFF',
  },
  messageContent: {
    borderRadius: 16,
    padding: 12,
  },
  userMessageContent: {
    backgroundColor: '#E1742F',
    borderBottomRightRadius: 4,
  },
  botMessageContent: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#E1742F',
  },
});
