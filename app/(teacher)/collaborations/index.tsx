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
  FlatList,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  Plus,
  FileText,
  MoreVertical,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react-native';
import { router } from 'expo-router';

// Mock data for teacher collaborations
const MOCK_COLLABORATIONS = [
  {
    id: '1',
    title: 'Advanced English Curriculum Development',
    description:
      'Collaborative effort to develop a comprehensive curriculum for advanced English learners.',
    members: [
      { id: '1', name: 'Amara Perera', avatar: null },
      { id: '2', name: 'Dinesh Kumar', avatar: null },
      { id: '3', name: 'You', avatar: null, isCurrentUser: true },
    ],
    lastActive: '2 hours ago',
    status: 'active',
    progress: 65,
    nextMeeting: 'Tomorrow, 10:00 AM',
    sharedResources: 12,
    unreadMessages: 3,
  },
  {
    id: '2',
    title: 'Beginner Level Assessment Framework',
    description:
      'Creating standardized assessment tools for beginner language learners.',
    members: [
      { id: '4', name: 'Lakshmi Bandara', avatar: null },
      { id: '3', name: 'You', avatar: null, isCurrentUser: true },
      { id: '5', name: 'Raj Patel', avatar: null },
    ],
    lastActive: 'Yesterday',
    status: 'pending',
    progress: 40,
    nextMeeting: 'Friday, 2:00 PM',
    sharedResources: 8,
    unreadMessages: 0,
  },
  {
    id: '3',
    title: 'Interactive Learning Materials',
    description:
      'Developing interactive digital materials for immersive language learning experiences.',
    members: [
      { id: '3', name: 'You', avatar: null, isCurrentUser: true },
      { id: '6', name: 'Sarah Johnson', avatar: null },
      { id: '7', name: 'Michael Chen', avatar: null },
      { id: '8', name: 'Priya Singh', avatar: null },
    ],
    lastActive: '3 days ago',
    status: 'completed',
    progress: 100,
    nextMeeting: 'None scheduled',
    sharedResources: 24,
    unreadMessages: 0,
  },
  {
    id: '4',
    title: 'Cultural Context in Language Teaching',
    description:
      'Research and development of teaching methods that incorporate cultural contexts.',
    members: [
      { id: '9', name: 'David Williams', avatar: null },
      { id: '3', name: 'You', avatar: null, isCurrentUser: true },
      { id: '10', name: 'Fatima Al-Farsi', avatar: null },
    ],
    lastActive: 'Just now',
    status: 'active',
    progress: 25,
    nextMeeting: 'Today, 4:30 PM',
    sharedResources: 6,
    unreadMessages: 7,
  },
];

// Filter options for collaborations
const FILTER_OPTIONS = [
  { id: 'all', label: 'All' },
  { id: 'active', label: 'Active' },
  { id: 'pending', label: 'Pending' },
  { id: 'completed', label: 'Completed' },
];

export default function TeacherCollaborationsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [filteredCollaborations, setFilteredCollaborations] =
    useState(MOCK_COLLABORATIONS);
  type Collaboration = (typeof MOCK_COLLABORATIONS)[number];
  const [selectedCollaboration, setSelectedCollaboration] =
    useState<Collaboration | null>(null);

  useEffect(() => {
    // Filter collaborations based on search query and active filter
    let filtered = MOCK_COLLABORATIONS;

    if (searchQuery) {
      filtered = filtered.filter(
        (collab) =>
          collab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          collab.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeFilter !== 'all') {
      filtered = filtered.filter((collab) => collab.status === activeFilter);
    }

    setFilteredCollaborations(filtered);
  }, [searchQuery, activeFilter]);

  // Function to render avatar with fallback
  const renderAvatar = (member: any, size = 'small') => {
    if (member.avatar) {
      return (
        <Image
          source={{ uri: member.avatar }}
          style={[
            styles.memberAvatar,
            size === 'small' && { width: 32, height: 32, borderRadius: 16 },
          ]}
        />
      );
    } else {
      // Render a fallback avatar with user's initials
      const initials = member.name
        .split(' ')
        .map((name: any) => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      const avatarSize = size === 'small' ? 32 : 40;
      const fontSize = size === 'small' ? 12 : 16;

      return (
        <View
          style={[
            styles.memberAvatar,
            styles.fallbackAvatar,
            member.isCurrentUser && styles.currentUserAvatar,
            {
              width: avatarSize,
              height: avatarSize,
              borderRadius: avatarSize / 2,
            },
          ]}
        >
          <Text style={[styles.avatarInitials, { fontSize }]}>{initials}</Text>
        </View>
      );
    }
  };

  // Function to render status badge
  const renderStatusBadge = (status: any) => {
    let badgeStyle, textStyle, label;

    switch (status) {
      case 'active':
        badgeStyle = styles.activeBadge;
        textStyle = styles.activeBadgeText;
        label = 'Active';
        break;
      case 'pending':
        badgeStyle = styles.pendingBadge;
        textStyle = styles.pendingBadgeText;
        label = 'Pending';
        break;
      case 'completed':
        badgeStyle = styles.completedBadge;
        textStyle = styles.completedBadgeText;
        label = 'Completed';
        break;
      default:
        badgeStyle = styles.defaultBadge;
        textStyle = styles.defaultBadgeText;
        label = status;
    }

    return (
      <View style={[styles.statusBadge, badgeStyle]}>
        <Text style={[styles.statusBadgeText, textStyle]}>{label}</Text>
      </View>
    );
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
        <Text style={styles.headerTitle}>Peer Collaborations</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Plus size={24} color="#E1742F" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search collaborations..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.tabsScrollView}>
        <View style={styles.tabsContainer}>
          {FILTER_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.tab,
                activeFilter === option.id && styles.activeTab,
              ]}
              onPress={() => setActiveFilter(option.id)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeFilter === option.id && styles.activeTabText,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Collaborations List */}
        <View style={styles.collaborationsSection}>
          {filteredCollaborations.length === 0 ? (
            <View style={styles.emptyState}>
              <Users size={48} color="#CCC" />
              <Text style={styles.emptyStateTitle}>
                No collaborations found
              </Text>
              <Text style={styles.emptyStateText}>
                Try adjusting your search or filter, or create a new
                collaboration.
              </Text>
              <TouchableOpacity style={styles.createButton}>
                <Text style={styles.createButtonText}>Create New</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredCollaborations.map((collab) => (
              <TouchableOpacity
                key={collab.id}
                style={[
                  styles.collaborationCard,
                  selectedCollaboration?.id === collab.id &&
                    styles.selectedCollaborationCard,
                ]}
                onPress={() =>
                  setSelectedCollaboration(
                    selectedCollaboration?.id === collab.id ? null : collab
                  )
                }
              >
                <View style={styles.collaborationHeader}>
                  <View style={styles.titleContainer}>
                    <Text style={styles.collaborationTitle}>
                      {collab.title}
                    </Text>
                    {renderStatusBadge(collab.status)}
                  </View>
                  <TouchableOpacity style={styles.moreButton}>
                    <MoreVertical size={20} color="#666" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.collaborationDescription} numberOfLines={2}>
                  {collab.description}
                </Text>

                <View style={styles.progressSection}>
                  <Text style={styles.progressLabel}>Progress</Text>
                  <View style={styles.progressBarContainer}>
                    <View
                      style={[
                        styles.progressBar,
                        { width: `${collab.progress}%` },
                        collab.status === 'completed'
                          ? styles.completedProgressBar
                          : styles.activeProgressBar,
                      ]}
                    />
                  </View>
                  <Text style={styles.progressText}>{collab.progress}%</Text>
                </View>

                <View style={styles.collaborationMeta}>
                  <View style={styles.metaItem}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.metaText}>{collab.lastActive}</Text>
                  </View>

                  {collab.unreadMessages > 0 && (
                    <View style={styles.metaItem}>
                      <MessageSquare size={16} color="#E1742F" />
                      <Text style={styles.metaTextHighlight}>
                        {collab.unreadMessages} new
                      </Text>
                    </View>
                  )}
                </View>

                <View style={styles.membersRow}>
                  <View style={styles.avatarGroup}>
                    {collab.members.slice(0, 3).map((member, index) => (
                      <View
                        key={member.id}
                        style={[
                          styles.avatarWrapper,
                          {
                            marginLeft: index > 0 ? -10 : 0,
                            zIndex: 3 - index,
                          },
                        ]}
                      >
                        {renderAvatar(member)}
                      </View>
                    ))}
                    {collab.members.length > 3 && (
                      <View
                        style={[
                          styles.avatarWrapper,
                          styles.avatarMore,
                          { marginLeft: -10, zIndex: 0 },
                        ]}
                      >
                        <Text style={styles.avatarMoreText}>
                          +{collab.members.length - 3}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Expanded details when selected */}
                {selectedCollaboration?.id === collab.id && (
                  <View style={styles.expandedDetails}>
                    <View style={styles.separator} />

                    <View style={styles.detailRow}>
                      <View style={styles.detailItem}>
                        <Calendar size={16} color="#666" />
                        <Text style={styles.detailLabel}>Next Meeting</Text>
                        <Text style={styles.detailValue}>
                          {collab.nextMeeting}
                        </Text>
                      </View>

                      <View style={styles.detailItem}>
                        <FileText size={16} color="#666" />
                        <Text style={styles.detailLabel}>Shared Resources</Text>
                        <Text style={styles.detailValue}>
                          {collab.sharedResources}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.actionButtonsRow}>
                      <TouchableOpacity
                        style={[styles.actionButtonSmall, styles.primaryButton]}
                      >
                        <MessageSquare size={16} color="#FFF" />
                        <Text style={styles.primaryButtonText}>Message</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[
                          styles.actionButtonSmall,
                          styles.secondaryButton,
                        ]}
                      >
                        <BookOpen size={16} color="#E1742F" />
                        <Text style={styles.secondaryButtonText}>
                          Resources
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            ))
          )}
        </View>

        {/* Bottom spacing */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Plus size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
  actionButton: {
    padding: 8,
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
  tabsScrollView: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 20,
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
  collaborationsSection: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  collaborationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedCollaborationCard: {
    borderWidth: 2,
    borderColor: '#E1742F',
  },
  collaborationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  collaborationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
    flex: 1,
  },
  moreButton: {
    padding: 4,
  },
  collaborationDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabel: {
    fontSize: 12,
    color: '#666',
    width: 60,
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginRight: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  activeProgressBar: {
    backgroundColor: '#E1742F',
  },
  completedProgressBar: {
    backgroundColor: '#10B981',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    width: 40,
    textAlign: 'right',
  },
  collaborationMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  metaTextHighlight: {
    fontSize: 12,
    color: '#E1742F',
    fontWeight: '500',
    marginLeft: 4,
  },
  membersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 18,
  },
  memberAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  fallbackAvatar: {
    backgroundColor: '#E1742F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentUserAvatar: {
    backgroundColor: '#10B981',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  avatarMore: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarMoreText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  activeBadge: {
    backgroundColor: '#E6F7FF',
  },
  activeBadgeText: {
    color: '#0284C7',
  },
  pendingBadge: {
    backgroundColor: '#FEF3DD',
  },
  pendingBadgeText: {
    color: '#F59E0B',
  },
  completedBadge: {
    backgroundColor: '#DCFCE7',
  },
  completedBadgeText: {
    color: '#10B981',
  },
  defaultBadge: {
    backgroundColor: '#F0F0F0',
  },
  defaultBadgeText: {
    color: '#666',
  },
  expandedDetails: {
    marginTop: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButtonSmall: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  primaryButton: {
    backgroundColor: '#E1742F',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
  secondaryButton: {
    backgroundColor: '#FFF3E8',
  },
  secondaryButtonText: {
    color: '#E1742F',
    fontWeight: '600',
    marginLeft: 6,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E1742F',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 32,
  },
  createButton: {
    backgroundColor: '#E1742F',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  bottomPadding: {
    height: 80,
  },
});
