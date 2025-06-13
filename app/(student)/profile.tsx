import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';
import {
  Settings,
  Bell,
  Globe,
  Award,
  Star,
  LogOut,
  ChevronRight,
  Users,
  BarChart2,
  BookOpen,
  Video,
  LayoutDashboard,
  Search,
  MessageCircle,
  Phone,
  Calendar,
  ArrowUpRight,
  PieChart,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, switchRole } from '@/store/slices/authSlice';
import { router } from 'expo-router';
import type { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';

export default function ProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);
  const isTeacher = user?.role === 'teacher';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

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

  const handleLogout = async () => {
    await dispatch(logout());
    router.replace('/auth');
  };

  const renderSearchAndMessaging = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search teachers by name or subject..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <Text style={styles.sectionTitle}>Recent Messages</Text>

      <View style={styles.messagesList}>
        {recentMessages.map((message, index) => (
          <TouchableOpacity
            key={index}
            style={styles.messageItem}
            // onPress={() => router.push(`/messages/${message.id}`)}
          >
            <Image
              source={{ uri: message.avatar }}
              style={styles.messageAvatar}
            />
            <View style={styles.messageContent}>
              <View style={styles.messageHeader}>
                <Text style={styles.messageName}>{message.name}</Text>
                <Text style={styles.messageTime}>{message.time}</Text>
              </View>
              <Text
                style={[
                  styles.messageText,
                  message.unread && styles.unreadMessage,
                ]}
                numberOfLines={1}
              >
                {message.text}
              </Text>
            </View>
            {message.unread && <View style={styles.unreadIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.viewAllMessagesButton}
        onPress={() => router.push('/messages')}
      >
        <Text style={styles.viewAllMessagesText}>View All Messages</Text>
        <ArrowUpRight size={16} color="#E1742F" />
      </TouchableOpacity>
    </View>
  );

  const renderVideoConferencing = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Upcoming Sessions</Text>

      <View style={styles.sessionsList}>
        {upcomingSessions.map((session, index) => (
          <View key={index} style={styles.sessionCard}>
            <View style={styles.sessionHeader}>
              <View style={styles.sessionDateContainer}>
                <Calendar size={16} color="#666" />
                <Text style={styles.sessionDate}>{session.date}</Text>
              </View>
              <View
                style={[
                  styles.sessionBadge,
                  session.status === 'scheduled'
                    ? styles.scheduledBadge
                    : styles.liveBadge,
                ]}
              >
                <Text style={styles.sessionBadgeText}>
                  {session.status === 'scheduled' ? 'Scheduled' : 'Live Now'}
                </Text>
              </View>
            </View>

            <View style={styles.sessionTeacherInfo}>
              <Image
                source={{ uri: session.teacherAvatar }}
                style={styles.sessionTeacherAvatar}
              />
              <View>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionTeacherName}>
                  {session.teacherName}
                </Text>
              </View>
            </View>

            <View style={styles.sessionActions}>
              <TouchableOpacity
                style={[
                  styles.sessionButton,
                  session.status === 'live'
                    ? styles.joinLiveButton
                    : styles.viewDetailsButton,
                ]}
                // onPress={() =>
                //   session.status === 'live'
                //     ? router.push(`/video/${session.id}`)
                //     : router.push(`/session/${session.id}`)
                // }
              >
                <Text
                  style={[
                    styles.sessionButtonText,
                    session.status === 'live'
                      ? styles.joinLiveButtonText
                      : styles.viewDetailsButtonText,
                  ]}
                >
                  {session.status === 'live' ? 'Join Now' : 'View Details'}
                </Text>
                {session.status === 'live' ? (
                  <Video size={16} color="#FFF" />
                ) : (
                  <ChevronRight size={16} color="#E1742F" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.scheduleButton}
        // onPress={() => router.push('/schedule')}
      >
        <Text style={styles.scheduleButtonText}>Schedule New Session</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAcademicPerformance = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>English Results</Text>

      <View style={styles.resultsOverviewCard}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Overall Performance</Text>
          <View style={styles.overallGradeContainer}>
            <Text style={styles.overallGrade}>B+</Text>
          </View>
        </View>

        <View style={styles.skillsContainer}>
          {englishSkills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <View style={styles.skillHeader}>
                <Text style={styles.skillName}>{skill.name}</Text>
                <Text style={styles.skillGrade}>{skill.grade}</Text>
              </View>
              <View style={styles.skillProgressBar}>
                <View
                  style={[
                    styles.skillProgressFill,
                    {
                      width: `${skill.progress}%`,
                      backgroundColor: skill.color,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.feedbackSection}>
        <Text style={styles.feedbackTitle}>Teacher Feedback</Text>
        <View style={styles.feedbackCard}>
          <View style={styles.feedbackHeader}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
              }}
              style={styles.feedbackTeacherAvatar}
            />
            <View>
              <Text style={styles.feedbackTeacherName}>Mr. Perera</Text>
              <Text style={styles.feedbackDate}>June 10, 2025</Text>
            </View>
          </View>
          <Text style={styles.feedbackText}>
            Sewwandi has shown significant improvement in her speaking skills.
            Her vocabulary has expanded, and she's more confident in
            conversations. She should focus more on grammar structures and
            reading comprehension to achieve better overall results.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.detailedReportButton}
        // onPress={() => router.push('/academic/report')}
      >
        <Text style={styles.detailedReportText}>View Detailed Report</Text>
        <PieChart size={16} color="#E1742F" />
      </TouchableOpacity>
    </View>
  );

  // Mock data for the new sections
  const recentMessages = [
    {
      id: '1',
      name: 'Mr. Perera',
      avatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      text: 'Hi Sewwandi, your speaking assignment is due tomorrow. Let me know if you need help!',
      time: '10:30 AM',
      unread: true,
    },
    {
      id: '2',
      name: 'Ms. Jayawardena',
      avatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      text: 'Great job on your recent writing task! I`ve provided feedback in the comments.',
      time: 'Yesterday',
      unread: false,
    },
    {
      id: '3',
      name: 'Mr. Fernando',
      avatar:
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg',
      text: 'The next group conversation practice will be on Friday at 4 PM.',
      time: 'Jun 10',
      unread: false,
    },
  ];

  const upcomingSessions = [
    {
      id: '1',
      title: 'Business English Conversation',
      teacherName: 'Mr. Perera',
      teacherAvatar:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      date: 'Today, 4:00 PM',
      status: 'live',
    },
    {
      id: '2',
      title: 'Grammar Workshop: Past Perfect',
      teacherName: 'Ms. Jayawardena',
      teacherAvatar:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      date: 'Tomorrow, 10:00 AM',
      status: 'scheduled',
    },
  ];

  const englishSkills = [
    {
      name: 'Speaking',
      grade: 'A-',
      progress: 85,
      color: '#4CAF50',
    },
    {
      name: 'Writing',
      grade: 'B+',
      progress: 78,
      color: '#2196F3',
    },
    {
      name: 'Reading',
      grade: 'B',
      progress: 75,
      color: '#9C27B0',
    },
    {
      name: 'Listening',
      grade: 'A',
      progress: 90,
      color: '#E1742F',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          // onPress={() => router.push('/settings')}
        >
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Profile Header Section */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg',
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.name ? user?.name : 'Sewwandi Alles'}
          </Text>
          <Text style={styles.profileEmail}>
            {user?.email ? user?.email : 'sewwandi@gmail.com'}
          </Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Intermediate Learner</Text>
          </View>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
          onPress={() => setActiveTab('profile')}
        >
          <Users
            size={20}
            color={activeTab === 'profile' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'profile' && styles.activeTabText,
            ]}
          >
            Profile
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'messages' && styles.activeTab]}
          onPress={() => setActiveTab('messages')}
        >
          <MessageCircle
            size={20}
            color={activeTab === 'messages' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'messages' && styles.activeTabText,
            ]}
          >
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'video' && styles.activeTab]}
          onPress={() => setActiveTab('video')}
        >
          <Video size={20} color={activeTab === 'video' ? '#E1742F' : '#666'} />
          <Text
            style={[
              styles.tabText,
              activeTab === 'video' && styles.activeTabText,
            ]}
          >
            Sessions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'academic' && styles.activeTab]}
          onPress={() => setActiveTab('academic')}
        >
          <BarChart2
            size={20}
            color={activeTab === 'academic' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'academic' && styles.activeTabText,
            ]}
          >
            Results
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {activeTab === 'profile' && (
          <>
            {/* Student stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>7</Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>14</Text>
                <Text style={styles.statLabel}>Hours Spent</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>210</Text>
                <Text style={styles.statLabel}>Points</Text>
              </View>
            </View>

            <View style={styles.achievementsSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Achievements</Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <Text style={styles.viewAllText}>View all</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.achievementsContainer}>
                <View style={styles.achievementItem}>
                  <View
                    style={[styles.achievementIcon, styles.achievementUnlocked]}
                  >
                    <Award size={24} color="#FFF" />
                  </View>
                  <Text style={styles.achievementName}>First Conversation</Text>
                </View>

                <View style={styles.achievementItem}>
                  <View
                    style={[styles.achievementIcon, styles.achievementUnlocked]}
                  >
                    <Star size={24} color="#FFF" />
                  </View>
                  <Text style={styles.achievementName}>7-Day Streak</Text>
                </View>

                <View style={styles.achievementItem}>
                  <View style={styles.achievementIcon}>
                    <Globe size={24} color="#CCC" />
                  </View>
                  <Text
                    style={[styles.achievementName, styles.achievementLocked]}
                  >
                    Global Chatter
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>Settings</Text>

              <View style={styles.settingItem}>
                <View style={styles.settingLabelContainer}>
                  <Bell size={20} color="#666" />
                  <Text style={styles.settingLabel}>Notifications</Text>
                </View>
                <Switch
                  trackColor={{ false: '#E5E5E5', true: '#FBE9D7' }}
                  thumbColor="#E1742F"
                  ios_backgroundColor="#E5E5E5"
                  value={true}
                />
              </View>

              <TouchableOpacity style={styles.settingItem}>
                <View style={styles.settingLabelContainer}>
                  <Globe size={20} color="#666" />
                  <Text style={styles.settingLabel}>Language Settings</Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.settingItem, styles.settingItemBorderless]}
                onPress={handleLogout}
              >
                <View style={styles.settingLabelContainer}>
                  <LogOut size={20} color="#E53935" />
                  <Text style={[styles.settingLabel, styles.logoutText]}>
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

        {activeTab === 'messages' && renderSearchAndMessaging()}
        {activeTab === 'video' && renderVideoConferencing()}
        {activeTab === 'academic' && renderAcademicPerformance()}
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  screenTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 32,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#333',
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#FEF3DD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#E1742F',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    flexDirection: 'column',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E1742F',
  },
  tabText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeTabText: {
    color: '#E1742F',
    fontFamily: 'Poppins-SemiBold',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEEEEE',
  },
  achievementsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  viewAllButton: {},
  viewAllText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#E1742F',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementItem: {
    alignItems: 'center',
    width: '30%',
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementUnlocked: {
    backgroundColor: '#E1742F',
  },
  achievementName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  achievementLocked: {
    color: '#999',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItemBorderless: {
    borderBottomWidth: 0,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logoutText: {
    color: '#E53935',
  },
  // New styles for Search and Messaging
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    paddingVertical: 10,
  },
  messagesList: {
    marginBottom: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  messageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
  },
  messageTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
  messageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 13,
    color: '#666',
  },
  unreadMessage: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E1742F',
    marginLeft: 8,
  },
  viewAllMessagesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  viewAllMessagesText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E1742F',
    marginRight: 4,
  },
  // Video Conferencing styles
  sessionsList: {
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sessionDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  sessionBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scheduledBadge: {
    backgroundColor: '#E6F7FF',
  },
  liveBadge: {
    backgroundColor: '#FFF1F0',
  },
  sessionBadgeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: '#1890FF',
  },
  sessionTeacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sessionTeacherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  sessionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  sessionTeacherName: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  sessionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sessionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  joinLiveButton: {
    backgroundColor: '#E1742F',
  },
  viewDetailsButton: {
    backgroundColor: '#FBE9D7',
  },
  sessionButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginRight: 6,
  },
  joinLiveButtonText: {
    color: '#FFFFFF',
  },
  viewDetailsButtonText: {
    color: '#E1742F',
  },
  scheduleButton: {
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  scheduleButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  // Academic Performance styles
  resultsOverviewCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultsTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  overallGradeContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1742F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overallGrade: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  skillsContainer: {
    marginBottom: 8,
  },
  skillItem: {
    marginBottom: 12,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  skillName: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#333',
  },
  skillGrade: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
  },
  skillProgressBar: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 4,
  },
  skillProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  feedbackSection: {
    marginBottom: 20,
  },
  feedbackTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  feedbackCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackTeacherAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  feedbackTeacherName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  feedbackDate: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#999',
  },
  feedbackText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  detailedReportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FBE9D7',
    borderRadius: 8,
    paddingVertical: 12,
  },
  detailedReportText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#E1742F',
    marginRight: 8,
  },
});
