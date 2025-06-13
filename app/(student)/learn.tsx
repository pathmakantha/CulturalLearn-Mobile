import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
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
  Play,
  Globe,
  Gamepad2,
  Headset as VrHeadset,
  ArrowLeft,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { router } from 'expo-router';

const scenarios = [
  {
    id: '1',
    title: 'Tourist Guide',
    description: 'Learn how to guide tourists through Sri Lanka',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
    duration: '15 min',
  },
  {
    id: '2',
    title: 'Business Meeting',
    description: 'Practice international business conversations',
    level: 'Intermediate',
    image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg',
    duration: '20 min',
  },
  {
    id: '3',
    title: 'Airport Navigation',
    description: 'Essential phrases for international travel',
    level: 'Beginner',
    image: 'https://images.pexels.com/photos/2008177/pexels-photo-2008177.jpeg',
    duration: '10 min',
  },
];

export default function LearnScreen() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Inter-Medium': Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.replace('/(student)')}
          style={styles.backButton}
        >
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cross Cultural Scenarios</Text>
        <View style={{ width: 40 }} />
      </View>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* <Text style={styles.screenTitle}>Learn</Text> */}

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Lessons Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>210</Text>
            <Text style={styles.statLabel}>XP Points</Text>
          </View>
        </View>

        <View style={styles.learningSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning Paths</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color="#E1742F" />
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.pathsContainer}
            contentContainerStyle={styles.pathsContent}
          >
            <TouchableOpacity style={styles.pathCard}>
              <LinearGradient
                colors={['#E1742F', '#D16628']}
                style={styles.pathGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Globe color="#FFF" size={24} />
                <Text style={styles.pathTitle}>Cultural Communication</Text>
                <Text style={styles.pathProgress}>2/8 completed</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pathCard}>
              <LinearGradient
                colors={['#6C63FF', '#5046E4']}
                style={styles.pathGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Gamepad2 color="#FFF" size={24} />
                <Text style={styles.pathTitle}>Grammar Games</Text>
                <Text style={styles.pathProgress}>1/6 completed</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.pathCard}>
              <LinearGradient
                colors={['#4CAF50', '#388E3C']}
                style={styles.pathGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <VrHeadset color="#FFF" size={24} />
                <Text style={styles.pathTitle}>Immersive Experience</Text>
                <Text style={styles.pathProgress}>0/4 completed</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.scenariosSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cultural Scenarios</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color="#E1742F" />
            </TouchableOpacity>
          </View>

          {scenarios.map((scenario, index) => (
            <Animated.View
              key={scenario.id}
              entering={FadeInRight.delay(index * 100).duration(300)}
            >
              <TouchableOpacity style={styles.scenarioCard}>
                <Image
                  source={{ uri: scenario.image }}
                  style={styles.scenarioImage}
                />
                <View style={styles.scenarioOverlay}>
                  <TouchableOpacity style={styles.playButton}>
                    <Play size={24} color="#FFF" />
                  </TouchableOpacity>
                </View>
                <View style={styles.scenarioContent}>
                  <Text style={styles.scenarioTitle}>{scenario.title}</Text>
                  <Text style={styles.scenarioDescription}>
                    {scenario.description}
                  </Text>
                  <View style={styles.scenarioMeta}>
                    <Text style={styles.scenarioDuration}>
                      {scenario.duration}
                    </Text>
                    <Text style={styles.scenarioLevel}>{scenario.level}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9EC',
    paddingBottom: -32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  screenTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '31%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#E1742F',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  learningSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
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
  pathsContainer: {
    marginBottom: 8,
  },
  pathsContent: {
    paddingRight: 16,
  },
  pathCard: {
    width: 200,
    height: 120,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  pathGradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  pathTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFF',
    marginTop: 16,
  },
  pathProgress: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scenariosSection: {
    marginBottom: 16,
  },
  scenarioCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scenarioImage: {
    width: '100%',
    height: 160,
  },
  scenarioOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(225, 116, 47, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scenarioContent: {
    padding: 16,
  },
  scenarioTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  scenarioDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  scenarioMeta: {
    flexDirection: 'row',
  },
  scenarioDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#E1742F',
    backgroundColor: '#FEF3DD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  scenarioLevel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#555',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});
