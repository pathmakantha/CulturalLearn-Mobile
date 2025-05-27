import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
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
  Settings,
  Bell,
  Globe,
  Award,
  Star,
  LogOut,
  ChevronRight,
} from 'lucide-react-native';

export default function ProfileScreen() {
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
        <Text style={styles.screenTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/5386754/pexels-photo-5386754.jpeg',
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Sewwandi Alles</Text>
            <Text style={styles.profileEmail}>sewwandi@gmail.com</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>Intermediate Learner</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Hours Spent</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>210</Text>
            <Text style={styles.statLabel}>XP Points</Text>
          </View>
        </View>

        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.achievementsContainer}>
            <View style={styles.achievementItem}>
              <View
                style={[styles.achievementIcon, styles.achievementUnlocked]}
              >
                <Award size={24} color="#FFF" />
              </View>
              <Text style={styles.achievementName}>First Conversation</Text>
            </View>

            <View style={styles.achievementItem}>
              <View
                style={[styles.achievementIcon, styles.achievementUnlocked]}
              >
                <Star size={24} color="#FFF" />
              </View>
              <Text style={styles.achievementName}>7-Day Streak</Text>
            </View>

            <View style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Globe size={24} color="#CCC" />
              </View>
              <Text style={[styles.achievementName, styles.achievementLocked]}>
                Global Chatter
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <View style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Bell size={20} color="#666" />
              <Text style={styles.settingLabel}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: '#E5E5E5', true: '#FBE9D7' }}
              thumbColor="#E1742F"
              ios_backgroundColor="#E5E5E5"
              value={true}
            />
          </View>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLabelContainer}>
              <Globe size={20} color="#666" />
              <Text style={styles.settingLabel}>Language Settings</Text>
            </View>
            <ChevronRight size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.settingItem, styles.settingItemBorderless]}
          >
            <View style={styles.settingLabelContainer}>
              <LogOut size={20} color="#E53935" />
              <Text style={[styles.settingLabel, styles.logoutText]}>
                Logout
              </Text>
            </View>
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
  settingsButton: {
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
    paddingBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#333',
    marginBottom: 2,
  },
  profileEmail: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  levelBadge: {
    backgroundColor: '#FEF3DD',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  levelText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#E1742F',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#F0F0F0',
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
  achievementsSection: {
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
    padding: 4,
  },
  viewAllText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#E1742F',
  },
  achievementsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  achievementItem: {
    alignItems: 'center',
    width: '31%',
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementUnlocked: {
    backgroundColor: '#E1742F',
  },
  achievementName: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  achievementLocked: {
    color: '#999',
  },
  settingsSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  settingItemBorderless: {
    borderBottomWidth: 0,
  },
  settingLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: '#333',
    marginLeft: 16,
  },
  logoutText: {
    color: '#E53935',
  },
});
