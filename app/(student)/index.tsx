import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
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
  MessageCircle,
  Globe,
  HelpCircle,
  Flag,
  Award,
  BarChart2,
} from 'lucide-react-native';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');
const tileSize = (width - 96) / 2; // 2 tiles per row with 16px padding on sides and 16px gap

export default function HomeScreen() {
  const [username, setUsername] = useState('Sewwandi');

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
    'Inter-Medium': Inter_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const tiles = [
    {
      title: 'AI Chatbot',
      description: 'Practice conversations',
      icon: <MessageCircle size={24} color="#E1742F" />,
      route: '/chat',
      color: '#FBE9D7',
    },
    {
      title: 'Cross Cultural Scenarios',
      description: 'Role-play exercises',
      icon: <Globe size={24} color="#4F46E5" />,
      route: '/learn',
      color: '#EEF2FF',
    },
    {
      title: 'Gamified Quizzes',
      description: 'Test your knowledge',
      icon: <HelpCircle size={24} color="#059669" />,
      route: '/(student)/quiz',
      color: '#ECFDF5',
    },
    {
      title: 'Personalized Feedback',
      description: 'Share your thoughts',
      icon: <Flag size={24} color="#7C3AED" />,
      route: '/(student)/feedback',
      color: '#F3E8FF',
    },
    {
      title: 'Cultural Missions',
      description: 'Complete challenges',
      icon: <Award size={24} color="#D97706" />,
      route: '/(student)/missions',
      color: '#FEF3C7',
    },
    // {
    //   title: 'Progress',
    //   description: 'Track your learning',
    //   icon: <BarChart2 size={24} color="#DB2777" />,
    //   route: '/(student)/progress',
    //   color: '#FCE7F3',
    // },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {username}!</Text>
          <TouchableOpacity onPress={() => router.push('/(student)/profile')}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg',
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.subtitle}>Learning Dashboard</Text> */}
        <View style={styles.progressSection}>
          {/* <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Progress</Text>
          </View> */}
          <View style={styles.progressCard}>
            <View style={styles.progressInfo}>
              <Text style={styles.progressTitle}>Daily Goal</Text>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
              <Text style={styles.progressText}>15/20 minutes today</Text>
            </View>
          </View>
        </View>
        <View style={styles.tilesContainer}>
          {tiles.map((tile, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tile, { backgroundColor: tile.color }]}
              onPress={() => router.push(tile.route as any)}
            >
              <View style={styles.tileIconContainer}>{tile.icon}</View>
              <Text style={styles.tileTitle}>{tile.title}</Text>
              <Text style={styles.tileDescription}>{tile.description}</Text>
            </TouchableOpacity>
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
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  subtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    marginBottom: 24,
  },
  tile: {
    width: tileSize,
    height: tileSize,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  tileIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  tileDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
  },
  progressSection: {
    marginBottom: 10,
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
  progressCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    padding: 16,
  },
  progressInfo: {
    width: '100%',
  },
  progressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#E1742F',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
  },
});
