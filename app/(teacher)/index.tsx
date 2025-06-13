import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import {
  ChevronRight,
  BookOpen,
  BarChart2,
  Calendar,
  MessageSquare,
  Users,
  FileText,
  Library,
  TrendingUp,
  UsersRound,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector } from 'react-redux';
import { router } from 'expo-router';

export default function TeacherDashboardScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Inter-Medium': Inter_500Medium,
  });

  const { user } = useSelector((state: any) => state.auth);
  const username = user?.name || 'Teacher';

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {username}!</Text>
          <TouchableOpacity
            onPress={() => router.push('/(teacher)/teacherProfile')}
          >
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Resources</Text>
          </View>
        </View>

        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.quickActionsGrid}>
            {/* 1. Custom Lessons Planning */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(teacher)/lessons/create')}
            >
              <View
                style={[styles.quickActionIcon, { backgroundColor: '#FEF3DD' }]}
              >
                <FileText color="#E1742F" size={24} />
              </View>
              <Text style={styles.quickActionTitle}>
                Custom Lessons Planning
              </Text>
            </TouchableOpacity>

            {/* 2. Student Progress Track */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(teacher)/students')}
            >
              <View
                style={[styles.quickActionIcon, { backgroundColor: '#EEF2FF' }]}
              >
                <TrendingUp color="#4F46E5" size={24} />
              </View>
              <Text style={styles.quickActionTitle}>
                Student Progress Track
              </Text>
            </TouchableOpacity>

            {/* 3. Resource Library */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(teacher)/resources')}
            >
              <View
                style={[styles.quickActionIcon, { backgroundColor: '#DCFCE7' }]}
              >
                <Library color="#10B981" size={24} />
              </View>
              <Text style={styles.quickActionTitle}>Resource Library</Text>
            </TouchableOpacity>

            {/* 4. Analytics Dashboard */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(teacher)/analytics')}
            >
              <View
                style={[styles.quickActionIcon, { backgroundColor: '#FEE2E2' }]}
              >
                <BarChart2 color="#EF4444" size={24} />
              </View>
              <Text style={styles.quickActionTitle}>Analytics Dashboard</Text>
            </TouchableOpacity>

            {/* 5. Peer Collaborations */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(teacher)/collaborations')}
            >
              <View
                style={[styles.quickActionIcon, { backgroundColor: '#E0F2FE' }]}
              >
                <UsersRound color="#0EA5E9" size={24} />
              </View>
              <Text style={styles.quickActionTitle}>Peer Collaborations</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.upcomingClassesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Classes</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              // onPress={() => router.push('/(teacher)/schedule')}
            >
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color="#E1742F" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.classCard}
            // onPress={() => router.push('/(teacher)/classes/1')}
          >
            <View style={styles.classTimeContainer}>
              <Text style={styles.classDay}>MON</Text>
              <Text style={styles.classTime}>10:00</Text>
            </View>
            <View style={styles.classInfo}>
              <Text style={styles.className}>Business English</Text>
              <Text style={styles.classDetails}>Intermediate • 8 students</Text>
            </View>
            <View style={styles.classStatus}>
              <Text style={styles.statusText}>Today</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.classCard}
            // onPress={() => router.push('/(teacher)/classes/2')}
          >
            <View style={styles.classTimeContainer}>
              <Text style={styles.classDay}>WED</Text>
              <Text style={styles.classTime}>14:30</Text>
            </View>
            <View style={styles.classInfo}>
              <Text style={styles.className}>Cultural Etiquette</Text>
              <Text style={styles.classDetails}>Beginner • 12 students</Text>
            </View>
            <View style={styles.classStatus}>
              <Text style={[styles.statusText, styles.upcomingStatus]}>
                In 2 days
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.studentProgressSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Student Progress</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => router.push('/(teacher)/students')}
            >
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color="#E1742F" />
            </TouchableOpacity>
          </View>

          <View style={styles.progressCard}>
            <Text style={styles.progressCardTitle}>Recent Achievements</Text>

            <View style={styles.achievementItem}>
              <View style={styles.achievementIconContainer}>
                <LinearGradient
                  colors={['#E1742F', '#F2994A']}
                  style={styles.achievementIcon}
                >
                  <Users color="#FFFFFF" size={16} />
                </LinearGradient>
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>
                  5 students completed Cultural Quiz
                </Text>
                <Text style={styles.achievementTime}>2 hours ago</Text>
              </View>
            </View>

            <View style={styles.achievementItem}>
              <View style={styles.achievementIconContainer}>
                <LinearGradient
                  colors={['#4F46E5', '#7C3AED']}
                  style={styles.achievementIcon}
                >
                  <BookOpen color="#FFFFFF" size={16} />
                </LinearGradient>
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementTitle}>
                  New resource "Japanese Business Etiquette" added
                </Text>
                <Text style={styles.achievementTime}>Yesterday</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.communicationSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Communication</Text>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => router.push('/(teacher)/messages')}
            >
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color="#E1742F" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.messageCard}
            onPress={() => router.push('/(teacher)/messages/1')}
          >
            <View style={styles.messageIconContainer}>
              <MessageSquare color="#E1742F" size={24} />
            </View>
            <View style={styles.messageInfo}>
              <Text style={styles.messageTitle}>3 new student questions</Text>
              <Text style={styles.messageDescription}>
                Questions about the Cultural Missions
              </Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.scheduleCallCard}
            onPress={() => router.push('/(teacher)/conference/create')}
          >
            <LinearGradient
              colors={['#E1742F', '#F2994A']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.scheduleCallGradient}
            >
              <View style={styles.scheduleCallContent}>
                <View>
                  <Text style={styles.scheduleCallTitle}>
                    Schedule Video Conference
                  </Text>
                  <Text style={styles.scheduleCallDescription}>
                    Create a new video call with your students
                  </Text>
                </View>
                <Calendar size={24} color="#FFFFFF" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9EC',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '31%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#E1742F',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  quickActionsSection: {
    marginBottom: 24,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  upcomingClassesSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#E1742F',
    marginRight: 4,
  },
  classCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  classTimeContainer: {
    alignItems: 'center',
    marginRight: 16,
    width: 50,
  },
  classDay: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#666',
  },
  classTime: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#333',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  classDetails: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  classStatus: {
    backgroundColor: '#FEF3DD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#E1742F',
  },
  upcomingStatus: {
    backgroundColor: '#F0F0F0',
    color: '#666',
  },
  studentProgressSection: {
    marginBottom: 24,
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  progressCardTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  achievementIconContainer: {
    marginRight: 12,
  },
  achievementIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  achievementTime: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  communicationSection: {
    marginBottom: 32,
  },
  messageCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  messageIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3DD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  messageInfo: {
    flex: 1,
  },
  messageTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  messageDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
  scheduleCallCard: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      },
    }),
  },
  scheduleCallGradient: {
    borderRadius: 16,
    padding: 20,
  },
  scheduleCallContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scheduleCallTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  scheduleCallDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
});
