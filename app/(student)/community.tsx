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
import { Inter_500Medium, Inter_400Regular } from '@expo-google-fonts/inter';
import {
  Search,
  Users,
  Globe,
  MessageSquare,
  ThumbsUp,
  Calendar,
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const projects = [
  {
    id: '1',
    title: 'Virtual Cultural Exchange',
    description:
      'Join students from Japan to practice conversational English and learn about cultural differences',
    participants: 12,
    countries: ['Sri Lanka', 'Japan'],
    commentsCount: 28,
    likesCount: 45,
    date: 'Oct 15, 2025',
    image: 'https://images.pexels.com/photos/935949/pexels-photo-935949.jpeg',
  },
  {
    id: '2',
    title: 'Business English Workshop',
    description:
      'Collaborate with students from India on a business presentation project',
    participants: 8,
    countries: ['Sri Lanka', 'India'],
    commentsCount: 16,
    likesCount: 34,
    date: 'Oct 20, 2025',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
  },
  {
    id: '3',
    title: 'Tourism Vocabulary Challenge',
    description: 'Create a travel guide with students from the United Kingdom',
    participants: 10,
    countries: ['Sri Lanka', 'UK'],
    commentsCount: 22,
    likesCount: 38,
    date: 'Nov 5, 2025',
    image: 'https://images.pexels.com/photos/1462935/pexels-photo-1462935.jpeg',
  },
];

export default function CommunityScreen() {
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.screenTitle}>Community</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.categoriesContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContent}
          >
            <TouchableOpacity
              style={[styles.categoryButton, styles.categoryButtonActive]}
            >
              <Text style={[styles.categoryText, styles.categoryTextActive]}>
                All Projects
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>My Projects</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Popular</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Text style={styles.categoryText}>Upcoming</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.projectsContainer}>
          {projects.map((project, index) => (
            <Animated.View
              key={project.id}
              entering={FadeInUp.delay(index * 100).duration(300)}
            >
              <TouchableOpacity style={styles.projectCard}>
                <Image
                  source={{ uri: project.image }}
                  style={styles.projectImage}
                />
                <View style={styles.projectContent}>
                  <Text style={styles.projectTitle}>{project.title}</Text>
                  <Text style={styles.projectDescription}>
                    {project.description}
                  </Text>

                  <View style={styles.projectStats}>
                    <View style={styles.projectStat}>
                      <Users size={16} color="#666" />
                      <Text style={styles.projectStatText}>
                        {project.participants}
                      </Text>
                    </View>
                    <View style={styles.projectStat}>
                      <Globe size={16} color="#666" />
                      <Text style={styles.projectStatText}>
                        {project.countries.length}
                      </Text>
                    </View>
                    <View style={styles.projectStat}>
                      <MessageSquare size={16} color="#666" />
                      <Text style={styles.projectStatText}>
                        {project.commentsCount}
                      </Text>
                    </View>
                    <View style={styles.projectStat}>
                      <ThumbsUp size={16} color="#666" />
                      <Text style={styles.projectStatText}>
                        {project.likesCount}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.projectFooter}>
                    <View style={styles.dateContainer}>
                      <Calendar size={16} color="#E1742F" />
                      <Text style={styles.projectDate}>{project.date}</Text>
                    </View>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>Join</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        <TouchableOpacity style={styles.createProjectButton}>
          <Text style={styles.createProjectText}>Create New Project</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  screenTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333',
  },
  searchButton: {
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
  categoriesContainer: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingRight: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#FFF',
  },
  categoryButtonActive: {
    backgroundColor: '#E1742F',
  },
  categoryText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#666',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  projectsContainer: {
    marginBottom: 24,
  },
  projectCard: {
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
  projectImage: {
    width: '100%',
    height: 160,
  },
  projectContent: {
    padding: 16,
  },
  projectTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  projectDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 22,
  },
  projectStats: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  projectStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  projectStatText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  projectFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  projectDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#E1742F',
    marginLeft: 8,
  },
  joinButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#FEF3DD',
    borderRadius: 20,
  },
  joinButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#E1742F',
  },
  createProjectButton: {
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  createProjectText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#FFF',
  },
});
