import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from 'react-native';
import {
  ArrowLeft,
  Search,
  X,
  Paperclip,
  Send,
  ChevronDown,
  Users,
  MessageSquare,
  Bell,
} from 'lucide-react-native';

// Define TypeScript interfaces
interface Recipient {
  id: string;
  name: string;
  avatar: string | null;
  role: 'student' | 'parent' | 'teacher' | 'admin' | 'class';
  email?: string;
  memberCount?: number;
}

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'document' | 'other';
  size: string;
  url: string;
}

// Mock data for recipient suggestions
const RECIPIENT_SUGGESTIONS: Recipient[] = [
  { id: 'c1', name: 'Advanced English Class', role: 'class', memberCount: 15 },
  {
    id: 'c2',
    name: 'Intermediate English Class',
    role: 'class',
    memberCount: 18,
  },
  { id: 'c3', name: 'Beginner English Class', role: 'class', memberCount: 12 },
  {
    id: '1',
    name: 'Amara Perera',
    role: 'student',
    email: 'amara.p@example.com',
  },
  {
    id: '2',
    name: 'Dinesh Kumar',
    role: 'student',
    email: 'dinesh.k@example.com',
  },
  {
    id: '3',
    name: 'Lakshmi Bandara',
    role: 'student',
    email: 'lakshmi.b@example.com',
  },
  { id: '4', name: 'Raj Patel', role: 'parent', email: 'raj.p@example.com' },
  {
    id: '5',
    name: 'Sarah Johnson',
    role: 'teacher',
    email: 'sarah.j@example.com',
  },
  {
    id: '6',
    name: 'Michael Chen',
    role: 'admin',
    email: 'michael.c@example.com',
  },
];

export default function ComposeMessageScreen(): React.ReactElement {
  const [messageType, setMessageType] = useState<'direct' | 'announcement'>(
    'direct'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [messageSubject, setMessageSubject] = useState<string>('');
  const [messageBody, setMessageBody] = useState<string>('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [showRecipientSuggestions, setShowRecipientSuggestions] =
    useState<boolean>(false);
  const [filteredRecipients, setFilteredRecipients] = useState<Recipient[]>([]);

  // Filter recipients based on search query
  React.useEffect(() => {
    if (searchQuery) {
      const filtered = RECIPIENT_SUGGESTIONS.filter(
        (recipient) =>
          recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (recipient.email &&
            recipient.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredRecipients(filtered);
      setShowRecipientSuggestions(true);
    } else {
      setShowRecipientSuggestions(false);
    }
  }, [searchQuery]);

  // Function to render avatar with fallback
  const renderAvatar = (recipient: Recipient): React.ReactElement => {
    if (recipient.role === 'class') {
      return (
        <View style={[styles.avatar, { backgroundColor: '#3B82F6' }]}>
          <Users size={16} color="#FFFFFF" />
        </View>
      );
    }

    if (recipient.avatar) {
      return <Image source={{ uri: recipient.avatar }} style={styles.avatar} />;
    } else {
      // Render a fallback avatar with recipient's initials
      const initials = recipient.name
        .split(' ')
        .map((name) => name[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);

      // Choose background color based on role
      let bgColor = '#E1742F';
      if (recipient.role === 'student') bgColor = '#10B981';
      if (recipient.role === 'parent') bgColor = '#6366F1';
      if (recipient.role === 'admin') bgColor = '#8B5CF6';

      return (
        <View
          style={[
            styles.avatar,
            styles.fallbackAvatar,
            { backgroundColor: bgColor },
          ]}
        >
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
      );
    }
  };

  // Add recipient
  const addRecipient = (recipient: Recipient) => {
    if (!selectedRecipients.some((r) => r.id === recipient.id)) {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
    setSearchQuery('');
    setShowRecipientSuggestions(false);
  };

  // Remove recipient
  const removeRecipient = (recipientId: string) => {
    setSelectedRecipients(
      selectedRecipients.filter((r) => r.id !== recipientId)
    );
  };

  // Add attachment
  const addAttachment = () => {
    // In a real app, you would use a file picker here
    // For now, we'll just add a mock attachment
    const newAttachment: Attachment = {
      id: `a${attachments.length + 1}`,
      name: 'document.pdf',
      type: 'document',
      size: '2.4 MB',
      url: 'https://example.com/document.pdf',
    };

    setAttachments([...attachments, newAttachment]);
  };

  // Remove attachment
  const removeAttachment = (attachmentId: string) => {
    setAttachments(attachments.filter((a) => a.id !== attachmentId));
  };

  // Send message
  const sendMessage = () => {
    // In a real app, you would send the message to the backend
    console.log('Sending message:', {
      type: messageType,
      recipients: selectedRecipients,
      subject: messageSubject,
      body: messageBody,
      attachments,
    });

    // Navigate back or show success message
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF9EC" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <ArrowLeft size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {messageType === 'direct' ? 'New Message' : 'New Announcement'}
        </Text>
        <TouchableOpacity
          style={[
            styles.sendHeaderButton,
            (!messageBody || selectedRecipients.length === 0) &&
              styles.disabledButton,
          ]}
          disabled={!messageBody || selectedRecipients.length === 0}
          onPress={sendMessage}
        >
          <Send
            size={20}
            color={
              !messageBody || selectedRecipients.length === 0
                ? '#999'
                : '#FFFFFF'
            }
          />
        </TouchableOpacity>
      </View>

      {/* Message Type Toggle */}
      <View style={styles.messageTypeContainer}>
        <TouchableOpacity
          style={[
            styles.messageTypeButton,
            messageType === 'direct' && styles.activeMessageTypeButton,
          ]}
          onPress={() => setMessageType('direct')}
        >
          <MessageSquare
            size={16}
            color={messageType === 'direct' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.messageTypeText,
              messageType === 'direct' && styles.activeMessageTypeText,
            ]}
          >
            Direct Message
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.messageTypeButton,
            messageType === 'announcement' && styles.activeMessageTypeButton,
          ]}
          onPress={() => setMessageType('announcement')}
        >
          <Bell
            size={16}
            color={messageType === 'announcement' ? '#E1742F' : '#666'}
          />
          <Text
            style={[
              styles.messageTypeText,
              messageType === 'announcement' && styles.activeMessageTypeText,
            ]}
          >
            Announcement
          </Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Recipients */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>To:</Text>
            <View style={styles.recipientsContainer}>
              {selectedRecipients.map((recipient) => (
                <View key={recipient.id} style={styles.recipientChip}>
                  {renderAvatar(recipient)}
                  <Text style={styles.recipientName}>{recipient.name}</Text>
                  <TouchableOpacity
                    style={styles.removeRecipientButton}
                    onPress={() => removeRecipient(recipient.id)}
                  >
                    <X size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}

              <TextInput
                style={styles.recipientInput}
                placeholder={
                  selectedRecipients.length > 0 ? '' : 'Search recipients...'
                }
                placeholderTextColor="#999"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Recipient Suggestions */}
            {showRecipientSuggestions && filteredRecipients.length > 0 && (
              <View style={styles.suggestionsContainer}>
                {filteredRecipients.map((recipient) => (
                  <TouchableOpacity
                    key={recipient.id}
                    style={styles.suggestionItem}
                    onPress={() => addRecipient(recipient)}
                  >
                    {renderAvatar(recipient)}
                    <View style={styles.suggestionInfo}>
                      <Text style={styles.suggestionName}>
                        {recipient.name}
                      </Text>
                      {recipient.role === 'class' ? (
                        <Text style={styles.suggestionMeta}>
                          {recipient.memberCount} members
                        </Text>
                      ) : (
                        <Text style={styles.suggestionMeta}>
                          {recipient.email}
                        </Text>
                      )}
                    </View>
                    <View
                      style={[
                        styles.roleBadge,
                        {
                          backgroundColor:
                            recipient.role === 'student'
                              ? '#ECFDF5'
                              : recipient.role === 'parent'
                              ? '#EEF2FF'
                              : recipient.role === 'teacher'
                              ? '#FEF3DD'
                              : recipient.role === 'admin'
                              ? '#F5F3FF'
                              : '#EFF6FF',
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.roleBadgeText,
                          {
                            color:
                              recipient.role === 'student'
                                ? '#10B981'
                                : recipient.role === 'parent'
                                ? '#6366F1'
                                : recipient.role === 'teacher'
                                ? '#E1742F'
                                : recipient.role === 'admin'
                                ? '#8B5CF6'
                                : '#3B82F6',
                          },
                        ]}
                      >
                        {recipient.role === 'class'
                          ? 'Class'
                          : recipient.role.charAt(0).toUpperCase() +
                            recipient.role.slice(1)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Subject */}
          <View style={styles.formSection}>
            <Text style={styles.formLabel}>Subject:</Text>
            <TextInput
              style={styles.subjectInput}
              placeholder="Enter subject"
              placeholderTextColor="#999"
              value={messageSubject}
              onChangeText={setMessageSubject}
            />
          </View>

          {/* Message Body */}
          <View style={styles.messageBodySection}>
            <TextInput
              style={styles.messageBodyInput}
              placeholder="Type your message here..."
              placeholderTextColor="#999"
              multiline
              textAlignVertical="top"
              value={messageBody}
              onChangeText={setMessageBody}
            />
          </View>

          {/* Attachments */}
          {attachments.length > 0 && (
            <View style={styles.attachmentsSection}>
              <Text style={styles.attachmentsTitle}>Attachments</Text>

              {attachments.map((attachment) => (
                <View key={attachment.id} style={styles.attachmentItem}>
                  <View style={styles.attachmentInfo}>
                    <View style={styles.attachmentIconContainer}>
                      {attachment.type === 'document' ? (
                        <View
                          style={[
                            styles.attachmentIcon,
                            { backgroundColor: '#EFF6FF' },
                          ]}
                        >
                          <Text style={{ fontSize: 18 }}>📄</Text>
                        </View>
                      ) : attachment.type === 'image' ? (
                        <View
                          style={[
                            styles.attachmentIcon,
                            { backgroundColor: '#ECFDF5' },
                          ]}
                        >
                          <Text style={{ fontSize: 18 }}>🖼️</Text>
                        </View>
                      ) : (
                        <View
                          style={[
                            styles.attachmentIcon,
                            { backgroundColor: '#FEF3DD' },
                          ]}
                        >
                          <Text style={{ fontSize: 18 }}>📎</Text>
                        </View>
                      )}
                    </View>
                    <View>
                      <Text style={styles.attachmentName}>
                        {attachment.name}
                      </Text>
                      <Text style={styles.attachmentSize}>
                        {attachment.size}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.removeAttachmentButton}
                    onPress={() => removeAttachment(attachment.id)}
                  >
                    <X size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </ScrollView>

        {/* Bottom Action Bar */}
        <View style={styles.bottomActionBar}>
          <TouchableOpacity style={styles.attachButton} onPress={addAttachment}>
            <Paperclip size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sendButton,
              (!messageBody || selectedRecipients.length === 0) &&
                styles.disabledButton,
            ]}
            disabled={!messageBody || selectedRecipients.length === 0}
            onPress={sendMessage}
          >
            <Text
              style={[
                styles.sendButtonText,
                (!messageBody || selectedRecipients.length === 0) &&
                  styles.disabledButtonText,
              ]}
            >
              Send
            </Text>
            <Send
              size={16}
              color={
                !messageBody || selectedRecipients.length === 0
                  ? '#999'
                  : '#FFFFFF'
              }
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  sendHeaderButton: {
    backgroundColor: '#E1742F',
    padding: 8,
    borderRadius: 8,
  },
  messageTypeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  messageTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 12,
  },
  activeMessageTypeButton: {
    backgroundColor: '#FEF3DD',
  },
  messageTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginLeft: 6,
  },
  activeMessageTypeText: {
    color: '#E1742F',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  formSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  recipientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  recipientChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  recipientName: {
    fontSize: 14,
    color: '#333',
    marginLeft: 6,
    marginRight: 4,
  },
  removeRecipientButton: {
    padding: 2,
  },
  recipientInput: {
    flex: 1,
    minHeight: 40,
    fontSize: 16,
    color: '#333',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  fallbackAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
  suggestionsContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    maxHeight: 200,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  suggestionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  suggestionMeta: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  roleBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  subjectInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  messageBodySection: {
    padding: 16,
    flex: 1,
  },
  messageBodyInput: {
    fontSize: 16,
    color: '#333',
    minHeight: 200,
    textAlignVertical: 'top',
  },
  attachmentsSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  attachmentsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 12,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  attachmentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  attachmentIconContainer: {
    marginRight: 12,
  },
  attachmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachmentName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  attachmentSize: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  removeAttachmentButton: {
    padding: 8,
  },
  bottomSpacing: {
    height: 80,
  },
  bottomActionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  attachButton: {
    padding: 8,
  },
  sendButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E1742F',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  disabledButton: {
    backgroundColor: '#F3F4F6',
  },
  disabledButtonText: {
    color: '#999',
  },
});
