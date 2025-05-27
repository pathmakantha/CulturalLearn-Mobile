import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Inter_500Medium } from '@expo-google-fonts/inter';
import { ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import FeatureCard from '@/components/FeatureCard';

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Hello, {username}!</Text>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg' }}
            style={styles.profileImage}
          />
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.featuresScroll}
          contentContainerStyle={styles.featuresContent}
        >
          <FeatureCard
            title="AI Chatbot"
            description="Simulate conversations with people from different cultures"
            icon="message-circle"
            route="/chat"
            backgroundColor="#FBE9D7"
          />
          <FeatureCard
            title="Cross-Cultural Scenarios"
            description="Practice English through role-plays"
            icon="globe"
            route="/learn"
            backgroundColor="#FBE9D7"
          />
          <FeatureCard
            title="Gamified Modules"
            description="Vocabulary and grammar games themed around world cultures"
            icon="gamepad-2"
            route="/learn"
            backgroundColor="#FBE9D7"
          />
          <FeatureCard
            title="Virtual Reality"
            description="Immersive interaction with global virtual environments"
            icon="vr-headset"
            route="/learn"
            backgroundColor="#FBE9D7"
          />
        </ScrollView>

        <View style={styles.progressSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Your Progress</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color="#E1742F" />
            </TouchableOpacity>
          </View>
          
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

        <View style={styles.recommendedSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
              <ChevronRight size={16} color="#E1742F" />
            </TouchableOpacity>
          </View>

          <View style={styles.lessonCard}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2162181/pexels-photo-2162181.jpeg' }}
              style={styles.lessonImage}
            />
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>Business English: Meeting Etiquette</Text>
              <Text style={styles.lessonDescription}>Learn how to conduct yourself in international business meetings</Text>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonDuration}>20 min</Text>
                <Text style={styles.lessonLevel}>Intermediate</Text>
              </View>
            </View>
          </View>

          <View style={styles.lessonCard}>
            <Image 
              source={{ uri: 'https://images.pexels.com/photos/2167673/pexels-photo-2167673.jpeg' }}
              style={styles.lessonImage}
            />
            <View style={styles.lessonInfo}>
              <Text style={styles.lessonTitle}>Tourism: Guiding Visitors</Text>
              <Text style={styles.lessonDescription}>Essential phrases for showing tourists around Sri Lanka</Text>
              <View style={styles.lessonMeta}>
                <Text style={styles.lessonDuration}>15 min</Text>
                <Text style={styles.lessonLevel}>Beginner</Text>
              </View>
            </View>
          </View>
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
  featuresScroll: {
    marginBottom: 24,
  },
  featuresContent: {
    paddingRight: 16,
  },
  progressSection: {
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
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressInfo: {
    width: '100%',
  },
  progressTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0F0F0',
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
  recommendedSection: {
    marginBottom: 24,
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonImage: {
    width: '100%',
    height: 160,
  },
  lessonInfo: {
    padding: 16,
  },
  lessonTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  lessonDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  lessonMeta: {
    flexDirection: 'row',
  },
  lessonDuration: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#E1742F',
    backgroundColor: '#FEF3DD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  lessonLevel: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#555',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});