import React, { useState } from 'react';
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
  FlatList,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Filter,
  MessageSquare,
  Users,
  Bell,
  User,
  ChevronRight,
  MoreVertical,
  CheckCircle2,
  Clock,
} from 'lucide-react-native';
import { router } from 'expo-router';

// Define TypeScript interfaces
interface Message {
  id: string;
  type:
    | 'student-question'
    | 'parent-message'
    | 'announcement'
    | 'direct-message';
  title: string;
  preview: string;
  sender?: {
    id: string;
    name: string;
    avatar: string | null;
    role: 'student' | 'parent' | 'teacher' | 'admin';
  };
  recipients?: number;
  timestamp: string;
  unread: boolean;
  hasAttachments: boolean;
  relatedClass?: string;
  relatedLesson?: string;
}

// Mock data for messages
const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    type: 'student-question',
    title: '3 new student questions',
    preview: 'Questions about the Cultural Missions',
    timestamp: '10:30 AM',
    unread: true,
    hasAttachments: false,
    relatedClass: 'Advanced English',
    relatedLesson: 'Cultural Missions',
  },
  {
    id: '2',
    type: 'direct-message',
    title: 'Amara Perera',
    preview:
      'I completed the additional exercises you sent. Could you review them when you have time?',
    sender: {
      id: '101',
      name: 'Amara Perera',
      avatar: null,
      role: 'student',
    },
    timestamp: 'Yesterday',
    unread: true,
    hasAttachments: true,
  },
  {
    id: '3',
    type: 'parent-message',
    title: 'Raj Patel (Parent)',
    preview:
      'Thank you for the update on Priya`s progress. We`ve been practicing at home as well.',
    sender: {
      id: '102',
      name: 'Raj Patel',
      avatar: null,
      role: 'parent',
    },
    timestamp: 'Yesterday',
    unread: false,
    hasAttachments: false,
  },
  {
    id: '4',
    type: 'announcement',
    title: 'Beginner Class Announcement',
    preview:
      'Reminder: Vocabulary quiz scheduled for next Monday. Study materials attached.',
    recipients: 15,
    timestamp: 'Jun 10',
    unread: false,
    hasAttachments: true,
    relatedClass: 'Beginner English',
  },
  {
    id: '5',
    type: 'direct-message',
    title: 'Sarah Johnson',
    preview:
      'Can we discuss the curriculum changes during tomorrow`s staff meeting?',
    sender: {
      id: '103',
      name: 'Sarah Johnson',
      avatar: null,
      role: 'teacher',
    },
    timestamp: 'Jun 9',
    unread: false,
    hasAttachments: false,
  },
  {
    id: '6',
    type: 'student-question',
    title: 'Question from Dinesh Kumar',
    preview:
      'I`m having trouble with the past perfect continuous tense. Could you explain when to use it?',
    sender: {
      id: '104',
      name: 'Dinesh Kumar',
      avatar: null,
      role: 'student',
    },
    timestamp: 'Jun 8',
    unread: false,
    hasAttachments: false,
    relatedClass: 'Intermediate English',
    relatedLesson: 'Advanced Tenses',
  },
  {
    id: '7',
    type: 'announcement',
    title: 'Staff Announcement',
    preview:
      'New teaching resources available in the shared drive. Please review before next week.',
    recipients: 8,
    timestamp: 'Jun 5',
    unread: false,
    hasAttachments: true,
  },
];

export default function MessagesListScreen(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [filteredMessages, setFilteredMessages] =
    useState<Message[]>(MOCK_MESSAGES);

  // Filter messages based on search and active tab
  React.useEffect(() => {
    let filtered = MOCK_MESSAGES;

    if (searchQuery) {
      filtered = filtered.filter(
        (message) =>
          message.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
          message.sender?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab === 'unread') {
      filtered = filtered.filter((message) => message.unread);
    } else if (activeTab === 'students') {
      filtered = filtered.filter(
        (message) =>
          message.type === 'student-question' ||
          message.sender?.role === 'student'
      );
    } else if (activeTab === 'parents') {
      filtered = filtered.filter(
        (message) =>
          message.type === 'parent-message' || message.sender?.role === 'parent'
      );
    } else if (activeTab === 'announcements') {
      filtered = filtered.filter((message) => message.type === 'announcement');
    }

    setFilteredMessages(filtered);
  }, [searchQuery, activeTab]);

  // Function to render avatar with fallback
  const renderAvatar = (sender?: {
    name: string;
    avatar: string | null;
    role: string;
  }): React.ReactElement => {
    if (!sender) {
      // Default icon for non-direct messages
      return (
        <View style={[styles.avatarContainer, { backgroundColor: '#FEF3DD' }]}>
          <MessageSquare size={20} color="#E1742F" />
        </View>
      );
    }

    if (sender.avatar) {
      return <Image source={{ uri: sender.avatar }} style={styles.avatar} />;
    } else {
      // Render a fallback avatar with user's initials
      const initials = sender.name
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      // Choose background color based on role
      let bgColor = '#E1742F';
      if (sender.role === 'student') bgColor = '#10B981';
      if (sender.role === 'parent') bgColor = '#6366F1';
      if (sender.role === 'admin') bgColor = '#8B5CF6';

      return (
        <View
          style={[
            styles.avatar,
            styles.fallbackAvatar,
            { backgroundColor: bgColor },
          ]}
        >
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
      );
    }
  };

  // Function to render message icon based on type
  const renderMessageTypeIcon = (message: Message): React.ReactElement => {
    if (message.type === 'announcement') {
      return (
        <View style={[styles.messageTypeIcon, { backgroundColor: '#EFF6FF' }]}>
          <Bell size={14} color="#3B82F6" />
        </View>
      );
    } else if (message.type === 'student-question') {
      return (
        <View style={[styles.messageTypeIcon, { backgroundColor: '#ECFDF5' }]}>
          <MessageSquare size={14} color="#10B981" />
        </View>
      );
    } else if (message.type === 'parent-message') {
      return (
        <View style={[styles.messageTypeIcon, { backgroundColor: '#EEF2FF' }]}>
          <User size={14} color="#6366F1" />
        </View>
      );
    } else {
      return <></>;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9EC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(teacher)')}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity
          style={styles.composeButton}
          onPress={() => router.push(`/(teacher)/messages/add`)}
        >
          <MessageSquare size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsScrollView}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'all' && styles.activeTabText,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'unread' && styles.activeTab]}
            onPress={() => setActiveTab('unread')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'unread' && styles.activeTabText,
              ]}
            >
              Unread
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'students' && styles.activeTab]}
            onPress={() => setActiveTab('students')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'students' && styles.activeTabText,
              ]}
            >
              Students
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'parents' && styles.activeTab]}
            onPress={() => setActiveTab('parents')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'parents' && styles.activeTabText,
              ]}
            >
              Parents
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'announcements' && styles.activeTab,
            ]}
            onPress={() => setActiveTab('announcements')}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === 'announcements' && styles.activeTabText,
              ]}
            >
              Announcements
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages List */}
      <FlatList
        data={filteredMessages}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.messageItem, item.unread && styles.unreadMessage]}
            // onPress={() => router.push(`/(teacher)/messages/${item.id}`)}
            onPress={() => router.push(`/(teacher)/messages/1`)}
          >
            {renderAvatar(item.sender)}

            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text
                  style={[
                    styles.messageTitle,
                    item.unread && styles.unreadText,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.messageTime}>{item.timestamp}</Text>
              </View>

              <Text
                style={styles.messagePreview}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item.preview}
              </Text>

              <View style={styles.messageFooter}>
                {item.relatedClass && (
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{item.relatedClass}</Text>
                  </View>
                )}

                {item.relatedLesson && (
                  <View style={styles.tagContainer}>
                    <Text style={styles.tagText}>{item.relatedLesson}</Text>
                  </View>
                )}

                {item.recipients && (
                  <View style={styles.recipientsContainer}>
                    <Users size={12} color="#666" />
                    <Text style={styles.recipientsText}>{item.recipients}</Text>
                  </View>
                )}

                {item.hasAttachments && (
                  <View style={styles.attachmentIndicator}>
                    <Text style={styles.attachmentText}>📎</Text>
                  </View>
                )}

                {renderMessageTypeIcon(item)}
              </View>
            </View>

            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>
        )}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push(`/(teacher)/messages/add`)}
      >
        <MessageSquare size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  composeButton: {
    backgroundColor: '#E1742F',
    padding: 8,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF9EC',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabsScrollView: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E1742F',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#E1742F',
    fontWeight: '600',
  },
  messagesList: {
    flex: 1,
    backgroundColor: '#FFF9EC',
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  unreadMessage: {
    backgroundColor: '#FEF9F0',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  messageContent: {
    flex: 1,
    marginRight: 8,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  unreadText: {
    fontWeight: '700',
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 8,
  },
  messagePreview: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  tagContainer: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  recipientsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  recipientsText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  attachmentIndicator: {
    marginRight: 8,
  },
  attachmentText: {
    fontSize: 12,
  },
  messageTypeIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E1742F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
