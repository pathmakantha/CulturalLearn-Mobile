import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Filter,
  Award,
  CheckCircle2,
  Star,
  AlertCircle,
} from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { router } from 'expo-router';

// Mock data for student progress (using the data visible in the screenshot)
const MOCK_STUDENTS = [
  {
    id: '1',
    name: 'Amara Perera',
    avatar:
      'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg',
    level: 'Intermediate',
    completedLessons: 18,
    totalLessons: 25,
    avgScore: 85,
    lastActive: '2 days ago',
    progress: 72,
    streak: 14,
    needsAttention: false,
    weeklyProgress: [65, 70, 75, 72, 80, 82, 85],
    skillScores: {
      speaking: 80,
      listening: 85,
      reading: 90,
      writing: 75,
      cultural: 88,
    },
  },
  {
    id: '2',
    name: 'Dinesh Kumar',
    avatar:
      'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    level: 'Advanced',
    completedLessons: 22,
    totalLessons: 25,
    avgScore: 92,
    lastActive: 'Today',
    progress: 88,
    streak: 21,
    needsAttention: false,
    weeklyProgress: [82, 85, 88, 90, 92, 92, 92],
    skillScores: {
      speaking: 95,
      listening: 90,
      reading: 92,
      writing: 88,
      cultural: 94,
    },
  },
  {
    id: '3',
    name: 'Lakshmi Bandara',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    level: 'Beginner',
    completedLessons: 8,
    totalLessons: 25,
    avgScore: 62,
    lastActive: '5 days ago',
    progress: 32,
    streak: 0,
    needsAttention: true,
    weeklyProgress: [60, 62, 65, 65, 62, 62, 62],
    skillScores: {
      speaking: 55,
      listening: 65,
      reading: 70,
      writing: 60,
      cultural: 60,
    },
  },
  // {
  //   id: '4',
  //   name: 'Rajiv Mendis',
  //   avatar:
  //     'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
  //   level: 'Intermediate',
  //   completedLessons: 15,
  //   totalLessons: 25,
  //   avgScore: 78,
  //   lastActive: 'Yesterday',
  //   progress: 60,
  //   streak: 5,
  //   needsAttention: false,
  //   weeklyProgress: [70, 72, 75, 75, 78, 78, 78],
  //   skillScores: {
  //     speaking: 75,
  //     listening: 80,
  //     reading: 85,
  //     writing: 70,
  //     cultural: 80,
  //   },
  // },
  // {
  //   id: '5',
  //   name: 'Priya Sharma',
  //   avatar:
  //     'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg',
  //   level: 'Beginner',
  //   completedLessons: 5,
  //   totalLessons: 25,
  //   avgScore: 55,
  //   lastActive: '1 week ago',
  //   progress: 20,
  //   streak: 0,
  //   needsAttention: true,
  //   weeklyProgress: [50, 52, 55, 55, 55, 55, 55],
  //   skillScores: {
  //     speaking: 50,
  //     listening: 55,
  //     reading: 60,
  //     writing: 50,
  //     cultural: 60,
  //   },
  // },
];

export default function StudentProgressScreen() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(MOCK_STUDENTS[1]); // Default to Dinesh Kumar as in screenshot
  const [filteredStudents, setFilteredStudents] = useState(MOCK_STUDENTS);

  const screenWidth = Dimensions.get('window').width - 40;

  useEffect(() => {
    // Filter students based on search query and active tab
    let filtered = MOCK_STUDENTS;

    if (searchQuery) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeTab === 'attention') {
      filtered = filtered.filter((student) => student.needsAttention);
    } else if (activeTab === 'active') {
      filtered = filtered.filter(
        (student) =>
          student.lastActive === 'Today' || student.lastActive === 'Yesterday'
      );
    } else if (activeTab === 'inactive') {
      filtered = filtered.filter(
        (student) =>
          student.lastActive !== 'Today' && student.lastActive !== 'Yesterday'
      );
    }

    setFilteredStudents(filtered);
  }, [searchQuery, activeTab]);

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(225, 116, 47, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9EC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/(teacher)')}
        >
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Student Progress</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search students..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'attention' && styles.activeTab]}
          onPress={() => setActiveTab('attention')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'attention' && styles.activeTabText,
            ]}
          >
            Needs Attention
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'inactive' && styles.activeTab]}
          onPress={() => setActiveTab('inactive')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'inactive' && styles.activeTabText,
            ]}
          >
            Inactive
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Student List */}
        <View style={styles.studentListSection}>
          {filteredStudents.map((student) => (
            <TouchableOpacity
              key={student.id}
              style={[
                styles.studentCard,
                selectedStudent?.id === student.id &&
                  styles.selectedStudentCard,
              ]}
              onPress={() => setSelectedStudent(student)}
            >
              <Image
                source={{ uri: student.avatar }}
                style={styles.studentAvatar}
              />
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <View style={styles.studentMetaRow}>
                  <Text style={styles.studentLevel}>{student.level}</Text>
                  <Text style={styles.studentLastActive}>
                    {student.lastActive}
                  </Text>
                </View>
                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      { width: `${student.progress}%` },
                      student.progress < 50
                        ? styles.lowProgressBar
                        : styles.goodProgressBar,
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {student.progress}% complete • {student.completedLessons}/
                  {student.totalLessons} lessons
                </Text>
              </View>
              {student.needsAttention && (
                <View style={styles.attentionBadge}>
                  <AlertCircle size={16} color="#FFFFFF" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
        {/* Student Details */}
        {selectedStudent && (
          <View style={styles.studentDetailsSection}>
            <View style={styles.detailsHeader}>
              <Image
                source={{ uri: selectedStudent.avatar }}
                style={styles.detailsAvatar}
              />
              <View style={styles.detailsHeaderInfo}>
                <Text style={styles.detailsName}>{selectedStudent.name}</Text>
                <View style={styles.detailsMeta}>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelBadgeText}>
                      {selectedStudent.level}
                    </Text>
                  </View>
                  <Text style={styles.lastActiveText}>
                    Last active: {selectedStudent.lastActive}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Award size={24} color="#E1742F" />
                <Text style={styles.statValue}>
                  {selectedStudent.avgScore}%
                </Text>
                <Text style={styles.statLabel}>Average Score</Text>
              </View>

              <View style={styles.statItem}>
                <CheckCircle2 size={24} color="#10B981" />
                <Text style={styles.statValue}>
                  {selectedStudent.completedLessons}
                </Text>
                <Text style={styles.statLabel}>Lessons Done</Text>
              </View>

              <View style={styles.statItem}>
                <Star size={24} color="#F59E0B" />
                <Text style={styles.statValue}>
                  {selectedStudent.streak || 0}
                </Text>
                <Text style={styles.statLabel}>Day Streak</Text>
              </View>
            </View>

            {/* Weekly Progress Chart */}
            <View style={styles.chartSection}>
              <Text style={styles.chartTitle}>Weekly Progress</Text>
              <LineChart
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [
                    {
                      data: selectedStudent.weeklyProgress || [
                        60, 65, 70, 75, 80, 85, 90,
                      ],
                      color: (opacity = 1) => `rgba(225, 116, 47, ${opacity})`,
                      strokeWidth: 2,
                    },
                  ],
                  legend: ['Score'],
                }}
                width={screenWidth}
                height={180}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withDots={true}
                withShadow={false}
                withInnerLines={false}
                withOuterLines={true}
                fromZero={true}
                yAxisInterval={1}
              />
            </View>
          </View>
        )}
        {/* Bottom spacing */}
        <View style={styles.bottomPadding} />
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF9EC',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    justifyContent: 'space-evenly',
  },
  tab: {
    paddingVertical: 12,
    marginRight: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#E1742F',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeTabText: {
    color: '#E1742F',
    fontWeight: '600',
  },
  studentListSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  studentCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedStudentCard: {
    borderWidth: 2,
    borderColor: '#E1742F',
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  studentMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  studentLevel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  studentLastActive: {
    fontSize: 14,
    color: '#999',
  },
  progressBarContainer: {
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  goodProgressBar: {
    backgroundColor: '#E1742F',
  },
  lowProgressBar: {
    backgroundColor: '#F87171',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  attentionBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentDetailsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailsAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  detailsHeaderInfo: {
    flex: 1,
  },
  detailsName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  detailsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelBadge: {
    backgroundColor: '#FEF3DD',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  levelBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#E1742F',
  },
  lastActiveText: {
    fontSize: 12,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginVertical: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  chartSection: {
    marginTop: 8,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  chart: {
    borderRadius: 8,
    paddingRight: 16,
  },
  bottomPadding: {
    height: 80,
  },
});
