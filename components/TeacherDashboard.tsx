import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  Users,
  BookOpen,
  BarChart2,
  FolderPlus,
  Video,
  ArrowLeft,
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function TeacherDashboard() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.push('/(teacher)')}
            style={styles.backButton}
          >
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>Teacher Dashboard</Text>
          <Text style={styles.subtitle}>Manage your classes and resources</Text>
        </View>

        <View style={styles.statsContainer}>
          <Animated.View entering={FadeInUp.delay(100)} style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#FEF3DD' }]}
            >
              <Users color="#E1742F" size={24} />
            </View>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Active Students</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200)} style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#FEF3DD' }]}
            >
              <BookOpen color="#E1742F" size={24} />
            </View>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </Animated.View>
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(teacher)/resources')}
          >
            <LinearGradient
              colors={['#E1742F', '#F2994A']}
              style={styles.actionIconContainer}
            >
              <FolderPlus color="#FFFFFF" size={24} />
            </LinearGradient>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Create Lesson</Text>
              <Text style={styles.actionDescription}>
                Plan new cultural lessons
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(teacher)/analytics')}
          >
            <LinearGradient
              colors={['#E1742F', '#F2994A']}
              style={styles.actionIconContainer}
            >
              <BarChart2 color="#FFFFFF" size={24} />
            </LinearGradient>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Analytics</Text>
              <Text style={styles.actionDescription}>
                View student progress
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push('/(teacher)/conference')}
          >
            <LinearGradient
              colors={['#E1742F', '#F2994A']}
              style={styles.actionIconContainer}
            >
              <Video color="#FFFFFF" size={24} />
            </LinearGradient>
            <View style={styles.actionTextContainer}>
              <Text style={styles.actionTitle}>Conference</Text>
              <Text style={styles.actionDescription}>Start video session</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Student Progress</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.progressContainer}
          contentContainerStyle={styles.progressContent}
        >
          {/* Student progress cards */}
          {['Amara Silva', 'Raj Patel', 'Min-Ji Kim', 'Carlos Vega'].map(
            (name, index) => (
              <Animated.View
                key={index}
                entering={FadeInUp.delay(100 * index)}
                style={styles.studentCard}
              >
                <View style={styles.studentHeader}>
                  <View style={styles.studentAvatar}>
                    <Text style={styles.studentInitial}>{name.charAt(0)}</Text>
                  </View>
                  <Text style={styles.studentName}>{name}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${Math.floor(Math.random() * 80) + 20}%` },
                    ]}
                  />
                </View>
                <View style={styles.studentStats}>
                  <View>
                    <Text style={styles.statNumber}>
                      {Math.floor(Math.random() * 15) + 5}
                    </Text>
                    <Text style={styles.statType}>Lessons</Text>
                  </View>
                  <View>
                    <Text style={styles.statNumber}>
                      {Math.floor(Math.random() * 20) + 10}
                    </Text>
                    <Text style={styles.statType}>Quizzes</Text>
                  </View>
                  <View>
                    <Text style={styles.statNumber}>
                      {Math.floor(Math.random() * 10) + 1}
                    </Text>
                    <Text style={styles.statType}>Missions</Text>
                  </View>
                </View>
              </Animated.View>
            )
          )}
        </ScrollView>
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
    padding: 20,
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
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    color: '#333', // Updated to match app theme
    marginTop: 16,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#666', // Updated to match app theme
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#E1742F', // Updated to match app theme
  },
  statLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666', // Updated to match app theme
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333', // Updated to match app theme
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionTextContainer: {
    flex: 1,
  },
  actionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#333', // Updated to match app theme
  },
  actionDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666', // Updated to match app theme
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressContent: {
    paddingHorizontal: 20,
    paddingRight: 5,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  studentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E1742F', // Updated to match app theme
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInitial: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  studentName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#333', // Updated to match app theme
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0', // Updated to match app theme
    borderRadius: 4,
    marginBottom: 16,
  },
  progressFill: {
    height: 8,
    backgroundColor: '#E1742F', // Updated to match app theme
    borderRadius: 4,
  },
  studentStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statNumber: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#333', // Updated to match app theme
    textAlign: 'center',
  },
  statType: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#666', // Updated to match app theme
    textAlign: 'center',
  },
});
