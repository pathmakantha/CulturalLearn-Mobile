import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Video,
  Mic,
  Link,
  ChevronDown,
  Plus,
  X,
  Save,
} from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';

// Define TypeScript interfaces
interface Participant {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'parent' | 'teacher' | 'admin';
}

interface ConferenceFormData {
  title: string;
  description: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  recurringPattern?: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
  participants: Participant[];
  meetingLink?: string;
  roomCode?: string;
}

// Mock data for participant suggestions
const PARTICIPANT_SUGGESTIONS: Participant[] = [
  {
    id: '1',
    name: 'Amara Perera',
    email: 'amara.p@example.com',
    type: 'student',
  },
  {
    id: '2',
    name: 'Dinesh Kumar',
    email: 'dinesh.k@example.com',
    type: 'student',
  },
  {
    id: '3',
    name: 'Lakshmi Bandara',
    email: 'lakshmi.b@example.com',
    type: 'student',
  },
  { id: '4', name: 'Raj Patel', email: 'raj.p@example.com', type: 'parent' },
  {
    id: '5',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    type: 'teacher',
  },
  {
    id: '6',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    type: 'admin',
  },
];

// Recurring pattern options
const RECURRING_PATTERNS = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly'];

export default function CreateConferenceScreen(): React.ReactElement {
  // Form state
  const [formData, setFormData] = useState<ConferenceFormData>({
    title: '',
    description: '',
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 30 * 60000), // Default to 30 min later
    isRecurring: false,
    isVideoEnabled: true,
    isAudioEnabled: true,
    participants: [],
  });

  // UI state
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [showStartTimePicker, setShowStartTimePicker] =
    useState<boolean>(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState<boolean>(false);
  const [showRecurringOptions, setShowRecurringOptions] =
    useState<boolean>(false);
  const [participantSearch, setParticipantSearch] = useState<string>('');
  const [showParticipantSuggestions, setShowParticipantSuggestions] =
    useState<boolean>(false);
  const [filteredParticipants, setFilteredParticipants] = useState<
    Participant[]
  >([]);

  // Handle date and time changes
  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
  };

  const onStartTimeChange = (event: any, selectedTime?: Date) => {
    setShowStartTimePicker(false);
    if (selectedTime) {
      setFormData({ ...formData, startTime: selectedTime });
    }
  };

  const onEndTimeChange = (event: any, selectedTime?: Date) => {
    setShowEndTimePicker(false);
    if (selectedTime) {
      setFormData({ ...formData, endTime: selectedTime });
    }
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Format time for display
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Handle participant search
  const handleParticipantSearch = (text: string) => {
    setParticipantSearch(text);

    if (text.length > 0) {
      const filtered = PARTICIPANT_SUGGESTIONS.filter(
        (participant) =>
          participant.name.toLowerCase().includes(text.toLowerCase()) ||
          participant.email.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredParticipants(filtered);
      setShowParticipantSuggestions(true);
    } else {
      setShowParticipantSuggestions(false);
    }
  };

  // Add participant
  const addParticipant = (participant: Participant) => {
    // Check if participant is already added
    if (!formData.participants.some((p) => p.id === participant.id)) {
      setFormData({
        ...formData,
        participants: [...formData.participants, participant],
      });
    }
    setParticipantSearch('');
    setShowParticipantSuggestions(false);
  };

  // Remove participant
  const removeParticipant = (participantId: string) => {
    setFormData({
      ...formData,
      participants: formData.participants.filter((p) => p.id !== participantId),
    });
  };

  // Set recurring pattern
  const setRecurringPattern = (pattern: string) => {
    setFormData({
      ...formData,
      recurringPattern: pattern,
    });
    setShowRecurringOptions(false);
  };

  // Get participant type badge color
  const getParticipantTypeColor = (type: string): string => {
    switch (type) {
      case 'student':
        return '#10B981';
      case 'parent':
        return '#6366F1';
      case 'teacher':
        return '#E1742F';
      case 'admin':
        return '#8B5CF6';
      default:
        return '#9CA3AF';
    }
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
        <Text style={styles.headerTitle}>Create Conference</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Save size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          {/* Title */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Conference Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter conference title"
              placeholderTextColor="#999"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />
          </View>

          {/* Description */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter conference details"
              placeholderTextColor="#999"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
              value={formData.description}
              onChangeText={(text) =>
                setFormData({ ...formData, description: text })
              }
            />
          </View>

          {/* Date */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Calendar size={20} color="#666" />
              <Text style={styles.dateTimeText}>
                {formatDate(formData.date)}
              </Text>
              <ChevronDown size={16} color="#666" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={formData.date}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          {/* Time */}
          <View style={styles.timeRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Start Time</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowStartTimePicker(true)}
              >
                <Clock size={20} color="#666" />
                <Text style={styles.dateTimeText}>
                  {formatTime(formData.startTime)}
                </Text>
                <ChevronDown size={16} color="#666" />
              </TouchableOpacity>

              {showStartTimePicker && (
                <DateTimePicker
                  value={formData.startTime}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onStartTimeChange}
                />
              )}
            </View>

            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>End Time</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowEndTimePicker(true)}
              >
                <Clock size={20} color="#666" />
                <Text style={styles.dateTimeText}>
                  {formatTime(formData.endTime)}
                </Text>
                <ChevronDown size={16} color="#666" />
              </TouchableOpacity>

              {showEndTimePicker && (
                <DateTimePicker
                  value={formData.endTime}
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onEndTimeChange}
                />
              )}
            </View>
          </View>

          {/* Recurring Option */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <Text style={styles.switchLabel}>Recurring Conference</Text>
              <Text style={styles.switchDescription}>
                Schedule this conference to repeat
              </Text>
            </View>
            <Switch
              value={formData.isRecurring}
              onValueChange={(value) =>
                setFormData({ ...formData, isRecurring: value })
              }
              trackColor={{ false: '#E5E7EB', true: '#FDE68A' }}
              thumbColor={formData.isRecurring ? '#E1742F' : '#F9FAFB'}
            />
          </View>

          {/* Recurring Pattern */}
          {formData.isRecurring && (
            <View style={styles.formGroup}>
              <Text style={styles.label}>Recurring Pattern</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowRecurringOptions(!showRecurringOptions)}
              >
                <Text style={styles.dateTimeText}>
                  {formData.recurringPattern || 'Select pattern'}
                </Text>
                <ChevronDown size={16} color="#666" />
              </TouchableOpacity>

              {showRecurringOptions && (
                <View style={styles.dropdownMenu}>
                  {RECURRING_PATTERNS.map((pattern) => (
                    <TouchableOpacity
                      key={pattern}
                      style={styles.dropdownItem}
                      onPress={() => setRecurringPattern(pattern)}
                    >
                      <Text style={styles.dropdownItemText}>{pattern}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          )}

          {/* Conference Settings */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Conference Settings</Text>
          </View>

          {/* Video */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <View style={styles.switchLabelRow}>
                <Video size={20} color="#666" />
                <Text style={styles.switchLabel}>Enable Video</Text>
              </View>
              <Text style={styles.switchDescription}>
                Allow participants to use video
              </Text>
            </View>
            <Switch
              value={formData.isVideoEnabled}
              onValueChange={(value) =>
                setFormData({ ...formData, isVideoEnabled: value })
              }
              trackColor={{ false: '#E5E7EB', true: '#FDE68A' }}
              thumbColor={formData.isVideoEnabled ? '#E1742F' : '#F9FAFB'}
            />
          </View>

          {/* Audio */}
          <View style={styles.switchRow}>
            <View style={styles.switchLabelContainer}>
              <View style={styles.switchLabelRow}>
                <Mic size={20} color="#666" />
                <Text style={styles.switchLabel}>Enable Audio</Text>
              </View>
              <Text style={styles.switchDescription}>
                Allow participants to use microphone
              </Text>
            </View>
            <Switch
              value={formData.isAudioEnabled}
              onValueChange={(value) =>
                setFormData({ ...formData, isAudioEnabled: value })
              }
              trackColor={{ false: '#E5E7EB', true: '#FDE68A' }}
              thumbColor={formData.isAudioEnabled ? '#E1742F' : '#F9FAFB'}
            />
          </View>

          {/* Meeting Link */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Meeting Link (Optional)</Text>
            <View style={styles.inputWithIcon}>
              <Link size={20} color="#666" />
              <TextInput
                style={styles.inputWithIconField}
                placeholder="Enter or generate meeting link"
                placeholderTextColor="#999"
                value={formData.meetingLink}
                onChangeText={(text) =>
                  setFormData({ ...formData, meetingLink: text })
                }
              />
              <TouchableOpacity style={styles.generateButton}>
                <Text style={styles.generateButtonText}>Generate</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Participants */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Participants</Text>
            <Text style={styles.participantCount}>
              {formData.participants.length} selected
            </Text>
          </View>

          {/* Add Participants */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Add Participants</Text>
            <View style={styles.inputWithIcon}>
              <Users size={20} color="#666" />
              <TextInput
                style={styles.inputWithIconField}
                placeholder="Search by name or email"
                placeholderTextColor="#999"
                value={participantSearch}
                onChangeText={handleParticipantSearch}
              />
            </View>

            {/* Participant Suggestions */}
            {showParticipantSuggestions && filteredParticipants.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {filteredParticipants.map((participant) => (
                  <TouchableOpacity
                    key={participant.id}
                    style={styles.suggestionItem}
                    onPress={() => addParticipant(participant)}
                  >
                    <View style={styles.suggestionInfo}>
                      <Text style={styles.suggestionName}>
                        {participant.name}
                      </Text>
                      <Text style={styles.suggestionEmail}>
                        {participant.email}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.typeBadge,
                        {
                          backgroundColor:
                            getParticipantTypeColor(participant.type) + '20',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.typeBadgeText,
                          { color: getParticipantTypeColor(participant.type) },
                        ]}
                      >
                        {participant.type.charAt(0).toUpperCase() +
                          participant.type.slice(1)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Selected Participants */}
          {formData.participants.length > 0 && (
            <View style={styles.selectedParticipantsContainer}>
              {formData.participants.map((participant) => (
                <View key={participant.id} style={styles.participantChip}>
                  <Text style={styles.participantChipText}>
                    {participant.name}
                  </Text>
                  <TouchableOpacity
                    style={styles.removeParticipantButton}
                    onPress={() => removeParticipant(participant.id)}
                  >
                    <X size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Create Button */}
          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Conference</Text>
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
  saveButton: {
    backgroundColor: '#E1742F',
    padding: 8,
    borderRadius: 8,
  },
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  dateTimeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  dateTimeText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  timeRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  switchLabelContainer: {
    flex: 1,
  },
  switchLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  switchDescription: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  participantCount: {
    fontSize: 14,
    color: '#666',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  inputWithIconField: {
    flex: 1,
    paddingVertical: 12,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  generateButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  generateButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  suggestionsContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    marginTop: 4,
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  suggestionInfo: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  suggestionEmail: {
    fontSize: 14,
    color: '#666',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  selectedParticipantsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  participantChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  participantChipText: {
    fontSize: 14,
    color: '#333',
    marginRight: 4,
  },
  removeParticipantButton: {
    padding: 2,
  },
  createButton: {
    backgroundColor: '#E1742F',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
