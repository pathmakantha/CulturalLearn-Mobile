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
import {
  ArrowLeft,
  CheckCircle,
  Flag,
  Map,
  Award,
  Clock,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

const missions = [
  {
    id: 1,
    title: 'Japanese Greetings',
    description:
      'Master 5 different Japanese greetings and their cultural contexts',
    progress: 60,
    image:
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop',
    tasks: [
      { id: 1, title: "Learn formal greeting 'Konnichiwa'", completed: true },
      { id: 2, title: "Practice casual greeting 'Yō'", completed: true },
      { id: 3, title: 'Master business greeting with bow', completed: true },
      { id: 4, title: "Learn evening greeting 'Konbanwa'", completed: false },
      {
        id: 5,
        title: "Practice phone greeting 'Moshi moshi'",
        completed: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Latin American Customs',
    description:
      'Explore social customs and etiquette in Latin American cultures',
    progress: 20,
    image:
      'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=2071&auto=format&fit=crop',
    tasks: [
      {
        id: 1,
        title: 'Learn about personal space differences',
        completed: true,
      },
      {
        id: 2,
        title: 'Practice greeting with kiss on cheek',
        completed: false,
      },
      {
        id: 3,
        title: 'Understand family gathering etiquette',
        completed: false,
      },
      {
        id: 4,
        title: 'Learn dining customs and expectations',
        completed: false,
      },
      { id: 5, title: 'Master gift-giving traditions', completed: false },
    ],
  },
  {
    id: 3,
    title: 'Indian Business Etiquette',
    description: 'Learn professional customs for business in India',
    progress: 0,
    image:
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop',
    tasks: [
      { id: 1, title: 'Master the Namaste greeting', completed: false },
      { id: 2, title: 'Learn appropriate business attire', completed: false },
      { id: 3, title: 'Understand meeting protocols', completed: false },
      {
        id: 4,
        title: 'Practice business card exchange customs',
        completed: false,
      },
      {
        id: 5,
        title: 'Learn negotiation styles and expectations',
        completed: false,
      },
    ],
  },
];

export default function CulturalMissionsScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Inter_500Medium,
  });

  const [selectedMission, setSelectedMission] = useState<number | null>(null);

  if (!fontsLoaded) {
    return null;
  }

  if (selectedMission) {
    const mission = missions.find((m) => m.id === selectedMission);
    const completedTasks = mission?.tasks.filter(
      (task) => task.completed
    ).length;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setSelectedMission(null)}
            style={styles.backButton}
          >
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mission Details</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.missionImageContainer}>
            <Image
              source={{ uri: mission?.image }}
              style={styles.missionImage}
            />
            <LinearGradient
              colors={['rgba(0,0,0,0.7)', 'transparent']}
              style={styles.missionImageOverlay}
            />
            <View style={styles.missionBadge}>
              <Map color="#FFFFFF" size={18} />
            </View>
          </View>

          <View style={styles.missionDetails}>
            <Text style={styles.missionTitle}>{mission?.title}</Text>
            <Text style={styles.missionDescription}>
              {mission?.description}
            </Text>

            <View style={styles.missionProgress}>
              <View style={styles.progressBarContainer}>
                <View
                  style={[
                    styles.progressBar,
                    { width: `${mission?.progress ?? 0}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>
                {mission?.progress}% Complete
              </Text>
            </View>

            <View style={styles.missionStats}>
              <View style={styles.statItem}>
                <Clock color="#E1742F" size={20} />
                <Text style={styles.statText}>Est. 2 hours</Text>
              </View>
              <View style={styles.statItem}>
                <Award color="#E1742F" size={20} />
                <Text style={styles.statText}>100 XP</Text>
              </View>
            </View>

            <Text style={styles.tasksTitle}>Mission Tasks</Text>

            {mission?.tasks.map((task) => (
              <View key={task.id} style={styles.taskItem}>
                <View
                  style={[
                    styles.taskCheckbox,
                    task.completed && styles.taskCompleted,
                  ]}
                >
                  {task.completed && <CheckCircle color="#FFFFFF" size={16} />}
                </View>
                <Text
                  style={[
                    styles.taskText,
                    task.completed && styles.taskTextCompleted,
                  ]}
                >
                  {task.title}
                </Text>
              </View>
            ))}

            <TouchableOpacity
              style={[
                styles.startButton,
                completedTasks === mission?.tasks.length
                  ? styles.completedButton
                  : {},
              ]}
            >
              <LinearGradient
                colors={['#E1742F', '#F2994A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.startButtonText}>
                  {completedTasks === 0
                    ? 'Start Mission'
                    : completedTasks === mission?.tasks.length
                    ? 'Mission Complete'
                    : 'Continue Mission'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(student)')}
          style={styles.backButton}
        >
          <ArrowLeft color="#333" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cultural Missions</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Complete missions to improve your cultural understanding
        </Text>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Active Missions</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>350</Text>
            <Text style={styles.statLabel}>XP Earned</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Your Missions</Text>

        {missions.map((mission, index) => (
          <Animated.View
            key={mission.id}
            entering={FadeInUp.delay(index * 100)}
          >
            <TouchableOpacity
              style={styles.missionCard}
              onPress={() => setSelectedMission(mission.id)}
            >
              <Image
                source={{ uri: mission.image }}
                style={styles.missionCardImage}
              />
              <View style={styles.missionCardContent}>
                <Text style={styles.missionCardTitle}>{mission.title}</Text>
                <Text style={styles.missionCardDescription} numberOfLines={2}>
                  {mission.description}
                </Text>
                <View style={styles.missionCardProgress}>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${mission.progress}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {mission.progress}% Complete
                  </Text>
                </View>
              </View>
              {mission.progress === 100 && (
                <View style={styles.completedBadge}>
                  <CheckCircle color="#FFFFFF" size={16} />
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
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
    justifyContent: 'space-between',
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
  },
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#666', // Updated to match app theme
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#E1742F', // Updated to match app theme
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666', // Updated to match app theme
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333', // Updated to match app theme
    marginBottom: 16,
  },
  missionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  missionCardImage: {
    width: '100%',
    height: 120,
  },
  missionCardContent: {
    padding: 16,
  },
  missionCardTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333', // Updated to match app theme
    marginBottom: 4,
  },
  missionCardDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666', // Updated to match app theme
    marginBottom: 12,
  },
  missionCardProgress: {
    marginTop: 8,
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0', // Updated to match app theme
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E1742F', // Updated to match app theme
    borderRadius: 3,
  },
  progressText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#666', // Updated to match app theme
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#E1742F', // Updated to match app theme
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Mission details styles
  missionImageContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
  },
  missionImage: {
    width: '100%',
    height: '100%',
  },
  missionImageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80,
  },
  missionBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#E1742F', // Updated to match app theme
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionDetails: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  missionTitle: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#333', // Updated to match app theme
    marginBottom: 8,
  },
  missionDescription: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#666', // Updated to match app theme
    marginBottom: 20,
    lineHeight: 24,
  },
  missionProgress: {
    marginBottom: 20,
  },
  missionStats: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#666', // Updated to match app theme
    marginLeft: 8,
  },
  tasksTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#333', // Updated to match app theme
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCompleted: {
    backgroundColor: '#E1742F', // Updated to match app theme
    borderColor: '#E1742F', // Updated to match app theme
  },
  taskText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#333', // Updated to match app theme
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999', // Updated to match app theme
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
  },
  buttonGradient: {
    padding: 16,
    alignItems: 'center',
  },
  completedButton: {
    backgroundColor: '#E1742F', // Updated to match app theme
  },
  startButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
