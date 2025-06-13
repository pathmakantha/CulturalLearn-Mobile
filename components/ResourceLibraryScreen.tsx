import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
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
  Search,
  FileText,
  Video,
  BookOpen,
  Headphones,
  Download,
  Plus,
  Filter,
} from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

const resourceCategories = [
  { id: 'all', name: 'All' },
  { id: 'documents', name: 'Documents' },
  { id: 'videos', name: 'Videos' },
  { id: 'audio', name: 'Audio' },
  { id: 'lessons', name: 'Lessons' },
];

const resources = [
  {
    id: 1,
    title: 'Japanese Business Etiquette Guide',
    type: 'document',
    format: 'PDF',
    size: '2.4 MB',
    date: 'June 10, 2025',
    thumbnail:
      'https://images.unsplash.com/photo-1526299652965-622b83a203fb?q=80&w=2071&auto=format&fit=crop',
    icon: <FileText color="#4F46E5" size={24} />,
  },
  {
    id: 2,
    title: 'Cultural Greetings Video Tutorial',
    type: 'video',
    format: 'MP4',
    size: '45.8 MB',
    date: 'June 5, 2025',
    thumbnail:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop',
    icon: <Video color="#EF4444" size={24} />,
  },
  {
    id: 3,
    title: 'Latin American Customs Handbook',
    type: 'document',
    format: 'PDF',
    size: '3.7 MB',
    date: 'May 28, 2025',
    thumbnail:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    icon: <FileText color="#4F46E5" size={24} />,
  },
  {
    id: 4,
    title: 'English Pronunciation Practice',
    type: 'audio',
    format: 'MP3',
    size: '18.2 MB',
    date: 'May 22, 2025',
    thumbnail:
      'https://images.unsplash.com/photo-1485579149621-3123dd979885?q=80&w=2069&auto=format&fit=crop',
    icon: <Headphones color="#F59E0B" size={24} />,
  },
  {
    id: 5,
    title: 'Cross-Cultural Communication Lesson',
    type: 'lesson',
    format: 'Interactive',
    size: 'N/A',
    date: 'June 12, 2025',
    thumbnail:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    icon: <BookOpen color="#10B981" size={24} />,
  },
];

export default function ResourceLibraryScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Inter_500Medium,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!fontsLoaded) {
    return null;
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'documents' && resource.type === 'document') ||
      (selectedCategory === 'videos' && resource.type === 'video') ||
      (selectedCategory === 'audio' && resource.type === 'audio') ||
      (selectedCategory === 'lessons' && resource.type === 'lesson');

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push('/(teacher)')}
          style={styles.backButton}
        >
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Resource Library</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus color="#111827" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color="#6B7280" size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter color="#111827" size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {resourceCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.categoryButtonActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryButtonText,
                selectedCategory === category.id &&
                  styles.categoryButtonTextActive,
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredResources.length > 0 ? (
          filteredResources.map((resource, index) => (
            <Animated.View
              key={resource.id}
              entering={FadeInUp.delay(index * 100)}
            >
              <TouchableOpacity style={styles.resourceCard}>
                <Image
                  source={{ uri: resource.thumbnail }}
                  style={styles.resourceThumbnail}
                />
                <View style={styles.resourceContent}>
                  <View style={styles.resourceIconContainer}>
                    {resource.icon}
                  </View>
                  <View style={styles.resourceInfo}>
                    <Text style={styles.resourceTitle}>{resource.title}</Text>
                    <View style={styles.resourceMeta}>
                      <Text style={styles.resourceFormat}>
                        {resource.format}
                      </Text>
                      <Text style={styles.resourceSize}>{resource.size}</Text>
                      <Text style={styles.resourceDate}>{resource.date}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.downloadButton}>
                    <Download color="#4F46E5" size={20} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No resources found</Text>
            <Text style={styles.emptyStateSubtext}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
// Continuing the styles for ResourceLibraryScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
    fontSize: 18,
    color: '#111827',
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#111827',
    marginLeft: 8,
    padding: 0,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoriesContainer: {
    maxHeight: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#4F46E5',
    borderColor: '#4F46E5',
  },
  categoryButtonText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  resourceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  resourceThumbnail: {
    width: '100%',
    height: 120,
  },
  resourceContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  resourceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 4,
  },
  resourceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resourceFormat: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#6B7280',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  resourceSize: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  resourceDate: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#6B7280',
  },
  downloadButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
