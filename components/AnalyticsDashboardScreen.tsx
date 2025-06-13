import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
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
  ArrowLeft,
  TrendingUp,
  Users,
  Clock,
  Award,
  Calendar,
  ChevronDown,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';
import { LineChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const timeRanges = ['This Week', 'This Month', 'This Quarter', 'This Year'];

export default function AnalyticsDashboardScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Inter_500Medium,
  });

  const [selectedTimeRange, setSelectedTimeRange] = useState(timeRanges[1]);
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);

  if (!fontsLoaded) {
    return null;
  }

  // Mock data for charts
  const engagementData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 70],
        color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
        strokeWidth: 2,
      },
    ],
    legend: ['Student Engagement'],
  };

  const progressData = {
    labels: ['Reading', 'Writing', 'Speaking', 'Listening', 'Culture'],
    datasets: [
      {
        data: [80, 65, 70, 85, 75],
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.push('/(teacher)')}
          style={styles.backButton}
        >
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analytics Dashboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.timeRangeContainer}>
        <TouchableOpacity
          style={styles.timeRangeSelector}
          onPress={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
        >
          <Text style={styles.timeRangeText}>{selectedTimeRange}</Text>
          <ChevronDown color="#111827" size={20} />
        </TouchableOpacity>

        {showTimeRangeDropdown && (
          <View style={styles.timeRangeDropdown}>
            {timeRanges.map((range) => (
              <TouchableOpacity
                key={range}
                style={styles.timeRangeOption}
                onPress={() => {
                  setSelectedTimeRange(range);
                  setShowTimeRangeDropdown(false);
                }}
              >
                <Text
                  style={[
                    styles.timeRangeOptionText,
                    selectedTimeRange === range &&
                      styles.timeRangeOptionTextSelected,
                  ]}
                >
                  {range}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsContainer}>
          <Animated.View entering={FadeInUp.delay(100)} style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#EEF2FF' }]}
            >
              <Users color="#4F46E5" size={24} />
            </View>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Active Students</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(200)} style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#FEF3C7' }]}
            >
              <Clock color="#F59E0B" size={24} />
            </View>
            <Text style={styles.statValue}>48h</Text>
            <Text style={styles.statLabel}>Learning Time</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(300)} style={styles.statCard}>
            <View
              style={[styles.statIconContainer, { backgroundColor: '#DCFCE7' }]}
            >
              <Award color="#10B981" size={24} />
            </View>
            <Text style={styles.statValue}>85%</Text>
            <Text style={styles.statLabel}>Completion Rate</Text>
          </Animated.View>
        </View>

        <Text style={styles.sectionTitle}>Student Engagement</Text>
        <View style={styles.chartCard}>
          <LineChart
            data={engagementData}
            width={screenWidth - 48}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#4F46E5',
              },
            }}
            bezier
            style={styles.chart}
          />
        </View>

        <Text style={styles.sectionTitle}>Skill Progress</Text>
        <View style={styles.chartCard}>
          <BarChart
            data={progressData}
            width={screenWidth - 48}
            height={220}
            yAxisLabel=""
            yAxisSuffix="%"
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#FFFFFF',
              backgroundGradientTo: '#FFFFFF',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(124, 58, 237, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              barPercentage: 0.7,
            }}
            style={styles.chart}
          />
        </View>

        <Text style={styles.sectionTitle}>Top Performing Students</Text>
        <View style={styles.studentsContainer}>
          {[
            'Amara Silva',
            'Raj Patel',
            'Min-Ji Kim',
            'Carlos Vega',
            'Elena Petrova',
          ].map((name, index) => (
            <View key={index} style={styles.studentRow}>
              <View style={styles.studentRank}>
                <Text style={styles.studentRankText}>{index + 1}</Text>
              </View>
              <View style={styles.studentAvatar}>
                <Text style={styles.studentInitial}>{name.charAt(0)}</Text>
              </View>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{name}</Text>
                <Text style={styles.studentScore}>
                  {90 - index * 5}% Completion
                </Text>
              </View>
              <View
                style={[
                  styles.studentBadge,
                  { backgroundColor: index < 3 ? '#DCFCE7' : '#F3F4F6' },
                ]}
              >
                <Text
                  style={[
                    styles.studentBadgeText,
                    { color: index < 3 ? '#10B981' : '#6B7280' },
                  ]}
                >
                  {index < 3 ? 'Top Performer' : 'Active'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  timeRangeContainer: {
    padding: 16,
    position: 'relative',
    zIndex: 10,
  },
  timeRangeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  timeRangeText: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#111827',
  },
  timeRangeDropdown: {
    position: 'absolute',
    top: 64,
    left: 16,
    right: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 20,
  },
  timeRangeOption: {
    padding: 12,
    borderRadius: 8,
  },
  timeRangeOptionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 16,
    color: '#6B7280',
  },
  timeRangeOptionTextSelected: {
    color: '#4F46E5',
    fontFamily: 'Poppins_600SemiBold',
  },
  content: {
    flex: 1,
    padding: 16,
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
    padding: 12,
    marginHorizontal: 4,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 20,
    color: '#111827',
    marginBottom: 2,
  },
  statLabel: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  sectionTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#111827',
    marginBottom: 16,
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  studentsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  studentRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentRankText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 12,
    color: '#6B7280',
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  studentInitial: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    color: '#111827',
  },
  studentScore: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  studentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  studentBadgeText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
  },
});
