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
  Calendar,
  ArrowUpRight,
  FileText,
  Check,
  Clock,
  RefreshCw,
  PlusCircle,
  Edit3,
  Mail,
} from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout, switchRole } from '@/store/slices/authSlice';
import { router } from 'expo-router';
import type { AppDispatch, RootState } from '@/store/store';
import { useState } from 'react';

export default function TeacherProfileScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: any) => state.auth);
  const isTeacher = user?.role === 'teacher';

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [communicationView, setCommunicationView] = useState('students'); // 'students' or 'messages'

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

  const handleSwitchRole = () => {
    dispatch(switchRole());
  };

  const renderStudentsAndMessages = () => (
    <View style={styles.sectionContainer}>
      <View style={styles.searchContainer}>
        <Search size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={
            communicationView === 'students'
              ? 'Search students by name...'
              : 'Search conversations...'
          }
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.communicationTabs}>
        <TouchableOpacity
          style={[
            styles.communicationTab,
            communicationView === 'students' && styles.activeCommunicationTab,
          ]}
          onPress={() => setCommunicationView('students')}
        >
          <Users
            size={18}
            color={communicationView === 'students' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.communicationTabText,
              communicationView === 'students' &&
                styles.activeCommunicationTabText,
            ]}
          >
            Students
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.communicationTab,
            communicationView === 'messages' && styles.activeCommunicationTab,
          ]}
          onPress={() => setCommunicationView('messages')}
        >
          <MessageCircle
            size={18}
            color={communicationView === 'messages' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.communicationTabText,
              communicationView === 'messages' &&
                styles.activeCommunicationTabText,
            ]}
          >
            Messages
          </Text>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {communicationView === 'students' ? (
        <>
          <Text style={styles.sectionTitle}>My Students</Text>

          <View style={styles.studentsList}>
            {myStudents.map((student, index) => (
              <TouchableOpacity
                key={index}
                style={styles.studentItem}
                // onPress={() => router.push(`/students/${student.id}`)}
              >
                <Image
                  source={{ uri: student.avatar }}
                  style={styles.studentAvatar}
                />
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.studentLevel}>{student.level}</Text>
                </View>
                <View style={styles.studentProgress}>
                  <Text style={styles.studentProgressText}>
                    {student.progress}%
                  </Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${student.progress}%` },
                      ]}
                    />
                  </View>
                </View>
                <View style={styles.studentActions}>
                  <TouchableOpacity
                    style={styles.studentActionButton}
                    onPress={() => router.push(`/messages/1`)}
                  >
                    <MessageCircle size={16} color="#666" />
                  </TouchableOpacity>
                  <ChevronRight size={20} color="#999" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.viewAllButton}
            onPress={() => router.push('/students')}
          >
            <Text style={styles.viewAllButtonText}>View All Students</Text>
            <ArrowUpRight size={16} color="#E1742F" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            // onPress={() => router.push('/students/add')}
          >
            <PlusCircle size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add New Student</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.sectionTitle}>Recent Messages</Text>

          <View style={styles.messagesList}>
            {recentMessages.map((message, index) => (
              <TouchableOpacity
                key={index}
                style={styles.messageItem}
                onPress={() => router.push(`/messages/1`)}
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
        </>
      )}
    </View>
  );

  const renderVideoSessions = () => (
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
                <Text
                  style={[
                    styles.sessionBadgeText,
                    session.status === 'scheduled'
                      ? { color: '#1890FF' }
                      : { color: '#F5222D' },
                  ]}
                >
                  {session.status === 'scheduled' ? 'Scheduled' : 'Live Now'}
                </Text>
              </View>
            </View>

            <Text style={styles.sessionTitle}>{session.title}</Text>

            <View style={styles.sessionDetails}>
              <View style={styles.sessionDetail}>
                <Users size={16} color="#666" />
                <Text style={styles.sessionDetailText}>
                  {session.students} Students
                </Text>
              </View>
              <View style={styles.sessionDetail}>
                <Clock size={16} color="#666" />
                <Text style={styles.sessionDetailText}>{session.duration}</Text>
              </View>
            </View>

            <View style={styles.sessionActions}>
              {session.status === 'live' ? (
                <TouchableOpacity
                  style={[styles.sessionButton, styles.joinLiveButton]}
                  // onPress={() => router.push(`/video/${session.id}`)}
                >
                  <Text style={styles.joinLiveButtonText}>Start Session</Text>
                  <Video size={16} color="#FFF" />
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={[styles.sessionButton, styles.editButton]}
                    // onPress={() => router.push(`/session/edit/${session.id}`)}
                  >
                    <Edit3 size={16} color="#666" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.sessionButton, styles.viewDetailsButton]}
                    // onPress={() => router.push(`/session/${session.id}`)}
                  >
                    <Text style={styles.viewDetailsButtonText}>
                      View Details
                    </Text>
                    <ChevronRight size={16} color="#E1742F" />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.scheduleButton}
        // onPress={() => router.push('/schedule')}
      >
        <Calendar size={20} color="#FFFFFF" />
        <Text style={styles.scheduleButtonText}>Schedule New Session</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAssessments = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Student Assessments</Text>

      <View style={styles.assessmentTabs}>
        <TouchableOpacity
          style={[styles.assessmentTab, styles.activeAssessmentTab]}
        >
          <Text
            style={[styles.assessmentTabText, styles.activeAssessmentTabText]}
          >
            Pending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.assessmentTab}>
          <Text style={styles.assessmentTabText}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.assessmentsList}>
        {pendingAssessments.map((assessment, index) => (
          <TouchableOpacity
            key={index}
            style={styles.assessmentItem}
            // onPress={() => router.push(`/assessments/${assessment.id}`)}
          >
            <View style={styles.assessmentHeader}>
              <View style={styles.assessmentType}>
                {assessment.type === 'writing' ? (
                  <FileText size={16} color="#2196F3" />
                ) : assessment.type === 'speaking' ? (
                  <MessageCircle size={16} color="#4CAF50" />
                ) : (
                  <BookOpen size={16} color="#9C27B0" />
                )}
                <Text style={styles.assessmentTypeText}>
                  {assessment.type.charAt(0).toUpperCase() +
                    assessment.type.slice(1)}
                </Text>
              </View>
              <Text style={styles.assessmentDueDate}>
                Due {assessment.dueDate}
              </Text>
            </View>

            <View style={styles.assessmentContent}>
              <Image
                source={{ uri: assessment.studentAvatar }}
                style={styles.assessmentStudentAvatar}
              />
              <View style={styles.assessmentInfo}>
                <Text style={styles.assessmentStudentName}>
                  {assessment.studentName}
                </Text>
                <Text style={styles.assessmentTitle} numberOfLines={1}>
                  {assessment.title}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.reviewButton}
              // onPress={() => router.push(`/assessments/${assessment.id}`)}
            >
              <Text style={styles.reviewButtonText}>Review Now</Text>
              <ArrowUpRight size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.viewAllAssessmentsButton}
        // onPress={() => router.push('/assessments')}
      >
        <Text style={styles.viewAllAssessmentsText}>View All Assessments</Text>
        <ArrowUpRight size={16} color="#E1742F" />
      </TouchableOpacity>
    </View>
  );

  // Mock data for the teacher sections
  const myStudents = [
    {
      id: '1',
      name: 'Sewwandi Alles',
      avatar:
        'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg',
      level: 'Intermediate',
      progress: 78,
    },
    {
      id: '2',
      name: 'Amal Perera',
      avatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      level: 'Beginner',
      progress: 45,
    },
    {
      id: '3',
      name: 'Nimal Fernando',
      avatar:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      level: 'Advanced',
      progress: 92,
    },
  ];

  const recentMessages = [
    {
      id: '1',
      name: 'Sewwandi Alles',
      avatar:
        'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg',
      text: 'Thank you for the feedback on my assignment, sir. I`ll work on improving my grammar.',
      time: '10:30 AM',
      unread: true,
    },
    {
      id: '2',
      name: 'Amal Perera',
      avatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      text: 'Sir, I might be late for tomorrow`s session. Can I join 15 minutes late?',
      time: 'Yesterday',
      unread: true,
    },
    {
      id: '3',
      name: 'Nimal Fernando',
      avatar:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      text: 'I`ve submitted my writing assignment. Looking forward to your feedback.',
      time: 'Jun 10',
      unread: false,
    },
  ];

  const upcomingSessions = [
    {
      id: '1',
      title: 'Business English Conversation',
      date: 'Today, 4:00 PM',
      students: 5,
      duration: '45 minutes',
      status: 'live',
    },
    {
      id: '2',
      title: 'Grammar Workshop: Past Perfect',
      date: 'Tomorrow, 10:00 AM',
      students: 8,
      duration: '60 minutes',
      status: 'scheduled',
    },
    {
      id: '3',
      title: 'IELTS Speaking Practice',
      date: 'Jun 15, 2:00 PM',
      students: 4,
      duration: '90 minutes',
      status: 'scheduled',
    },
  ];

  const pendingAssessments = [
    {
      id: '1',
      type: 'writing',
      title: 'Essay: The Impact of Technology on Education',
      studentName: 'Sewwandi Alles',
      studentAvatar:
        'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg',
      dueDate: 'Today',
    },
    {
      id: '2',
      type: 'speaking',
      title: 'IELTS Speaking Task 2 Recording',
      studentName: 'Amal Perera',
      studentAvatar:
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg',
      dueDate: 'Tomorrow',
    },
    {
      id: '3',
      type: 'reading',
      title: 'Reading Comprehension: Business Articles',
      studentName: 'Nimal Fernando',
      studentAvatar:
        'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
      dueDate: 'Jun 16',
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
            uri: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>
            {user?.name ? user?.name : 'Mr. Perera'}
          </Text>
          <Text style={styles.profileEmail}>
            {user?.email ? user?.email : 'perera@gmail.com'}
          </Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>English Teacher</Text>
          </View>
        </View>
      </View>

      {/* For testing purposes - Role switcher */}
      {/* <TouchableOpacity style={styles.roleSwitcher} onPress={handleSwitchRole}>
        <RefreshCw size={16} color="#E1742F" />
        <Text style={styles.roleSwitcherText}>Switch to Student Mode</Text>
      </TouchableOpacity> */}

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
          style={[
            styles.tab,
            activeTab === 'communication' && styles.activeTab,
          ]}
          onPress={() => setActiveTab('communication')}
        >
          <Mail
            size={20}
            color={activeTab === 'communication' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'communication' && styles.activeTabText,
            ]}
          >
            Communication
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'sessions' && styles.activeTab]}
          onPress={() => setActiveTab('sessions')}
        >
          <Video
            size={20}
            color={activeTab === 'sessions' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'sessions' && styles.activeTabText,
            ]}
          >
            Sessions
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'assessments' && styles.activeTab]}
          onPress={() => setActiveTab('assessments')}
        >
          <FileText
            size={20}
            color={activeTab === 'assessments' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'assessments' && styles.activeTabText,
            ]}
          >
            Assessments
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
            {/* Teacher stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>12</Text>
                <Text style={styles.statLabel}>Students</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Courses</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24</Text>
                <Text style={styles.statLabel}>Hours Taught</Text>
              </View>
            </View>

            {/* Teacher Tools Section */}
            {/* <View style={styles.teacherToolsSection}>
              <Text style={styles.sectionTitle}>Teacher Tools</Text>

              <TouchableOpacity
                style={styles.toolItem}
                onPress={() => router.push('/(teacher)/dashboard')}
              >
                <View style={[styles.toolIcon, { backgroundColor: '#EEF2FF' }]}>
                  <LayoutDashboard size={24} color="#4F46E5" />
                </View>
                <View style={styles.toolInfo}>
                  <Text style={styles.toolTitle}>Teacher Dashboard</Text>
                  <Text style={styles.toolDescription}>
                    Manage your classes and students
                  </Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.toolItem}
                onPress={() => router.push('/(teacher)/analytics')}
              >
                <View style={[styles.toolIcon, { backgroundColor: '#FEF3DD' }]}>
                  <BarChart2 size={24} color="#E1742F" />
                </View>
                <View style={styles.toolInfo}>
                  <Text style={styles.toolTitle}>Analytics Dashboard</Text>
                  <Text style={styles.toolDescription}>
                    Track student progress and performance
                  </Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.toolItem}
                onPress={() => router.push('/(teacher)/resources')}
              >
                <View style={[styles.toolIcon, { backgroundColor: '#DCFCE7' }]}>
                  <BookOpen size={24} color="#10B981" />
                </View>
                <View style={styles.toolInfo}>
                  <Text style={styles.toolTitle}>Resource Library</Text>
                  <Text style={styles.toolDescription}>
                    Manage learning materials
                  </Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.toolItem, styles.toolItemBorderless]}
                onPress={() => router.push('/(teacher)/conference')}
              >
                <View style={[styles.toolIcon, { backgroundColor: '#FEE2E2' }]}>
                  <Video size={24} color="#EF4444" />
                </View>
                <View style={styles.toolInfo}>
                  <Text style={styles.toolTitle}>Video Conference</Text>
                  <Text style={styles.toolDescription}>
                    Host virtual cultural exchanges
                  </Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </TouchableOpacity>
            </View> */}

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

        {activeTab === 'communication' && renderStudentsAndMessages()}
        {activeTab === 'sessions' && renderVideoSessions()}
        {activeTab === 'assessments' && renderAssessments()}
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
  roleSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF3DD',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  roleSwitcherText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E1742F',
    marginLeft: 8,
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
    fontSize: 10,
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
  teacherToolsSection: {
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
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  toolItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  toolItemBorderless: {
    borderBottomWidth: 0,
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  toolDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
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
  // Combined Students & Messages styles
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
    marginBottom: 16,
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
  communicationTabs: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
  },
  communicationTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  activeCommunicationTab: {
    backgroundColor: '#FBE9D7',
    borderRadius: 8,
  },
  communicationTabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  activeCommunicationTabText: {
    color: '#E1742F',
  },
  badgeContainer: {
    position: 'absolute',
    top: 10,
    right: 12,
    backgroundColor: '#E1742F',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
  },
  studentsList: {
    marginBottom: 16,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  studentAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 2,
  },
  studentLevel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  studentProgress: {
    width: 80,
    marginRight: 8,
  },
  studentProgressText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#E1742F',
    textAlign: 'right',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#E1742F',
    borderRadius: 2,
  },
  studentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentActionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    marginBottom: 16,
  },
  viewAllButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E1742F',
    marginRight: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 12,
  },
  addButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  // Message list styles
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
  // Video Sessions styles
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
  },
  sessionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  sessionDetails: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  sessionDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  sessionDetailText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    marginLeft: 6,
  },
  sessionActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sessionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginLeft: 8,
  },
  joinLiveButton: {
    backgroundColor: '#E1742F',
  },
  editButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
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
    marginRight: 6,
  },
  viewDetailsButtonText: {
    color: '#E1742F',
    marginRight: 6,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 12,
  },
  scheduleButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  // Assessment styles
  assessmentTabs: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
  },
  assessmentTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeAssessmentTab: {
    backgroundColor: '#FBE9D7',
    borderRadius: 8,
  },
  assessmentTabText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeAssessmentTabText: {
    color: '#E1742F',
  },
  assessmentsList: {
    marginBottom: 16,
  },
  assessmentItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  assessmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  assessmentType: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  assessmentTypeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#333',
    marginLeft: 4,
  },
  assessmentDueDate: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#E53935',
  },
  assessmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  assessmentStudentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  assessmentInfo: {
    flex: 1,
  },
  assessmentStudentName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  assessmentTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
  },
  reviewButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#FFFFFF',
    marginRight: 4,
  },
  viewAllAssessmentsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  viewAllAssessmentsText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#E1742F',
    marginRight: 4,
  },
});
