import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Send,
  MessageSquare,
  Download,
  Image as ImageIcon,
  File,
  User,
  Clock,
  CheckCircle2,
} from 'lucide-react-native';
import { goBack } from 'expo-router/build/global-state/routing';

// Define TypeScript interfaces
interface Participant {
  id: string;
  name: string;
  avatar: string | null;
  role: 'student' | 'parent' | 'teacher' | 'admin';
  online?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'other';
  size: string;
  url: string;
}

interface Message {
  id: string;
  sender: Participant;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: Attachment[];
}

interface Question {
  id: string;
  student: Participant;
  question: string;
  timestamp: string;
  lesson: string;
  attachments?: Attachment[];
  replies: Message[];
}

// Mock data for the conversation detail
const MOCK_QUESTIONS: Question[] = [
  {
    id: '1',
    student: {
      id: '101',
      name: 'Amara Perera',
      avatar: null,
      role: 'student',
      online: false,
    },
    question:
      "I'm confused about the cultural mission activity. Are we supposed to create a presentation or write a report? The instructions mention both.",
    timestamp: 'Today, 10:15 AM',
    lesson: 'Cultural Missions',
    attachments: [
      {
        id: 'a1',
        name: 'assignment_instructions.pdf',
        type: 'document',
        size: '1.2 MB',
        url: 'https://example.com/assignment_instructions.pdf',
      },
    ],
    replies: [],
  },
  {
    id: '2',
    student: {
      id: '102',
      name: 'Dinesh Kumar',
      avatar: null,
      role: 'student',
      online: true,
    },
    question:
      "For the cultural research part, can we focus on modern culture or should we include historical aspects as well? I'm interested in contemporary music and arts.",
    timestamp: 'Today, 9:45 AM',
    lesson: 'Cultural Missions',
    replies: [
      {
        id: 'r1',
        sender: {
          id: '201',
          name: 'You',
          avatar: null,
          role: 'teacher',
          online: true,
        },
        text: "Great question, Dinesh! You can focus on either modern culture or include historical aspects - both approaches are valid. If you're particularly interested in contemporary music and arts, that's perfectly fine. Just make sure to explain how they represent the culture you're studying.",
        timestamp: 'Today, 10:30 AM',
        status: 'read',
      },
    ],
  },
  {
    id: '3',
    student: {
      id: '103',
      name: 'Lakshmi Bandara',
      avatar: null,
      role: 'student',
      online: false,
    },
    question:
      "Is it okay if my presentation is a bit longer than 5 minutes? I have a lot of material I'd like to cover about the cultural traditions I researched.",
    timestamp: 'Yesterday, 4:20 PM',
    lesson: 'Cultural Missions',
    attachments: [
      {
        id: 'a2',
        name: 'presentation_draft.pptx',
        type: 'document',
        size: '3.5 MB',
        url: 'https://example.com/presentation_draft.pptx',
      },
      {
        id: 'a3',
        name: 'cultural_photos.zip',
        type: 'other',
        size: '8.2 MB',
        url: 'https://example.com/cultural_photos.zip',
      },
    ],
    replies: [
      {
        id: 'r2',
        sender: {
          id: '201',
          name: 'You',
          avatar: null,
          role: 'teacher',
          online: true,
        },
        text: "Hi Lakshmi, I appreciate your enthusiasm! While I'd like everyone to stay close to the 5-minute guideline, you can have an extra minute or two if necessary. The key is to be concise and focus on the most important aspects. Maybe you could share some of the additional material as a handout?",
        timestamp: 'Yesterday, 5:15 PM',
        status: 'read',
      },
      {
        id: 'r3',
        sender: {
          id: '103',
          name: 'Lakshmi Bandara',
          avatar: null,
          role: 'student',
          online: false,
        },
        text: "That's a great idea! I'll prepare a handout with the additional information. Thank you for the suggestion.",
        timestamp: 'Yesterday, 5:30 PM',
        status: 'read',
      },
    ],
  },
];

export default function MessageDetailScreen(): React.ReactElement {
  const [replyText, setReplyText] = useState<string>('');
  const [expandedQuestion, setExpandedQuestion] = useState<string>('1'); // Default to first question
  const scrollViewRef = useRef<ScrollView>(null);

  // Function to render avatar with fallback
  const renderAvatar = (participant: Participant): React.ReactElement => {
    if (participant.avatar) {
      return (
        <View style={styles.avatarContainer}>
          <Image source={{ uri: participant.avatar }} style={styles.avatar} />
          {participant.online && <View style={styles.onlineIndicator} />}
        </View>
      );
    } else {
      // Render a fallback avatar with user's initials
      const initials = participant.name
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      // Choose background color based on role
      let bgColor = '#E1742F';
      if (participant.role === 'student') bgColor = '#10B981';
      if (participant.role === 'parent') bgColor = '#6366F1';
      if (participant.role === 'admin') bgColor = '#8B5CF6';

      return (
        <View style={styles.avatarContainer}>
          <View
            style={[
              styles.avatar,
              styles.fallbackAvatar,
              { backgroundColor: bgColor },
            ]}
          >
            <Text style={styles.avatarInitials}>{initials}</Text>
          </View>
          {participant.online && <View style={styles.onlineIndicator} />}
        </View>
      );
    }
  };

  // Function to render attachment icon based on type
  const renderAttachmentIcon = (type: string): React.ReactElement => {
    switch (type) {
      case 'image':
        return <ImageIcon size={16} color="#666" />;
      case 'document':
        return <File size={16} color="#666" />;
      default:
        return <Paperclip size={16} color="#666" />;
    }
  };

  // Function to handle sending a reply
  const handleSendReply = () => {
    if (replyText.trim() === '') return;

    // In a real app, you would send the reply to the backend
    console.log(`Sending reply: ${replyText}`);

    // Clear the input field
    setReplyText('');
  };

  // Function to toggle question expansion
  const toggleQuestionExpansion = (questionId: string) => {
    if (expandedQuestion === questionId) {
      setExpandedQuestion('');
    } else {
      setExpandedQuestion(questionId);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9EC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => goBack()}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Questions</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreVertical size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Lesson Info */}
      <View style={styles.lessonInfoContainer}>
        <View style={styles.lessonInfo}>
          <Text style={styles.lessonTitle}>Cultural Missions</Text>
          <Text style={styles.lessonSubtitle}>
            Advanced English • 3 questions
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Questions List */}
          {MOCK_QUESTIONS.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              {/* Question Header */}
              <TouchableOpacity
                style={styles.questionHeader}
                onPress={() => toggleQuestionExpansion(question.id)}
              >
                {renderAvatar(question.student)}
                <View style={styles.questionInfo}>
                  <Text style={styles.studentName}>
                    {question.student.name}
                  </Text>
                  <Text
                    style={styles.questionText}
                    numberOfLines={
                      expandedQuestion === question.id ? undefined : 2
                    }
                  >
                    {question.question}
                  </Text>

                  {/* Attachments Preview */}
                  {question.attachments && question.attachments.length > 0 && (
                    <View style={styles.attachmentsPreview}>
                      {question.attachments.map((attachment) => (
                        <TouchableOpacity
                          key={attachment.id}
                          style={styles.attachmentItem}
                        >
                          {renderAttachmentIcon(attachment.type)}
                          <Text style={styles.attachmentName}>
                            {attachment.name}
                          </Text>
                          <Text style={styles.attachmentSize}>
                            {attachment.size}
                          </Text>
                          <Download size={14} color="#666" />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  <View style={styles.questionMeta}>
                    <Text style={styles.timestamp}>{question.timestamp}</Text>
                    <View style={styles.replyCount}>
                      <MessageSquare size={12} color="#666" />
                      <Text style={styles.replyCountText}>
                        {question.replies.length}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              {/* Replies Section */}
              {expandedQuestion === question.id &&
                question.replies.length > 0 && (
                  <View style={styles.repliesContainer}>
                    {question.replies.map((reply) => (
                      <View
                        key={reply.id}
                        style={[
                          styles.replyItem,
                          reply.sender.role === 'teacher'
                            ? styles.teacherReply
                            : styles.studentReply,
                        ]}
                      >
                        {reply.sender.role !== 'teacher' &&
                          renderAvatar(reply.sender)}

                        <View
                          style={[
                            styles.replyContent,
                            reply.sender.role === 'teacher'
                              ? styles.teacherReplyContent
                              : styles.studentReplyContent,
                          ]}
                        >
                          <View style={styles.replyHeader}>
                            <Text style={styles.replySenderName}>
                              {reply.sender.name}
                            </Text>
                            <Text style={styles.replyTimestamp}>
                              {reply.timestamp}
                            </Text>
                          </View>

                          <Text style={styles.replyText}>{reply.text}</Text>

                          {reply.attachments &&
                            reply.attachments.length > 0 && (
                              <View style={styles.replyAttachments}>
                                {reply.attachments.map((attachment) => (
                                  <TouchableOpacity
                                    key={attachment.id}
                                    style={styles.attachmentItem}
                                  >
                                    {renderAttachmentIcon(attachment.type)}
                                    <Text style={styles.attachmentName}>
                                      {attachment.name}
                                    </Text>
                                    <Text style={styles.attachmentSize}>
                                      {attachment.size}
                                    </Text>
                                    <Download size={14} color="#666" />
                                  </TouchableOpacity>
                                ))}
                              </View>
                            )}

                          {reply.sender.role === 'teacher' && (
                            <View style={styles.replyStatus}>
                              <Clock
                                size={12}
                                color={
                                  reply.status === 'sent'
                                    ? '#999'
                                    : reply.status === 'delivered'
                                    ? '#3B82F6'
                                    : '#10B981'
                                }
                              />
                              <Text
                                style={[
                                  styles.replyStatusText,
                                  {
                                    color:
                                      reply.status === 'sent'
                                        ? '#999'
                                        : reply.status === 'delivered'
                                        ? '#3B82F6'
                                        : '#10B981',
                                  },
                                ]}
                              >
                                {reply.status === 'sent'
                                  ? 'Sent'
                                  : reply.status === 'delivered'
                                  ? 'Delivered'
                                  : 'Read'}
                              </Text>
                            </View>
                          )}
                        </View>

                        {reply.sender.role === 'teacher' &&
                          renderAvatar(reply.sender)}
                      </View>
                    ))}
                  </View>
                )}

              {/* Reply Input */}
              {expandedQuestion === question.id && (
                <View style={styles.replyInputContainer}>
                  <TextInput
                    style={styles.replyInput}
                    placeholder="Type your reply..."
                    placeholderTextColor="#999"
                    multiline
                    value={replyText}
                    onChangeText={setReplyText}
                  />
                  <View style={styles.replyInputActions}>
                    <TouchableOpacity style={styles.attachButton}>
                      <Paperclip size={20} color="#666" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.sendButton,
                        replyText.trim() === ''
                          ? styles.sendButtonDisabled
                          : {},
                      ]}
                      onPress={handleSendReply}
                      disabled={replyText.trim() === ''}
                    >
                      <Send
                        size={20}
                        color={replyText.trim() === '' ? '#999' : '#FFFFFF'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9EC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  moreButton: {
    padding: 8,
  },
  lessonInfoContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lessonInfo: {
    flexDirection: 'column',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  lessonSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  contentContainer: {
    padding: 16,
  },
  questionContainer: {
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  questionHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  fallbackAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  questionInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  questionText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 22,
  },
  attachmentsPreview: {
    marginTop: 8,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginBottom: 6,
  },
  attachmentName: {
    flex: 1,
    fontSize: 13,
    color: '#333',
    marginLeft: 8,
  },
  attachmentSize: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  questionMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginRight: 12,
  },
  replyCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyCountText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  repliesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  replyItem: {
    flexDirection: 'row',
    marginTop: 16,
  },
  teacherReply: {
    justifyContent: 'flex-end',
  },
  studentReply: {
    justifyContent: 'flex-start',
  },
  replyContent: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 12,
  },
  teacherReplyContent: {
    backgroundColor: '#FEF3DD',
    borderBottomRightRadius: 4,
    marginRight: 12,
  },
  studentReplyContent: {
    backgroundColor: '#F3F4F6',
    borderBottomLeftRadius: 4,
  },
  replyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  replySenderName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  replyTimestamp: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  replyText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  replyAttachments: {
    marginTop: 8,
  },
  replyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 4,
  },
  replyStatusText: {
    fontSize: 12,
    marginLeft: 4,
  },
  replyInputContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  replyInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 100,
    fontSize: 14,
    color: '#333',
    minHeight: 40,
    maxHeight: 120,
  },
  replyInputActions: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  attachButton: {
    padding: 8,
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#E1742F',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#F3F4F6',
  },
  bottomSpacing: {
    height: 40,
  },
});
