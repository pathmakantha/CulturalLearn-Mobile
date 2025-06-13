import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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
  Mic,
  MicOff,
  Video,
  VideoOff,
  Users,
  MessageSquare,
  Phone,
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

export default function VideoConferenceScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_700Bold,
    Poppins_600SemiBold,
    Poppins_400Regular,
    Inter_500Medium,
  });

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft color="#FFFFFF" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cultural Exchange Session</Text>
        <View style={styles.participantsContainer}>
          <Users color="#FFFFFF" size={20} />
          <Text style={styles.participantsText}>5</Text>
        </View>
      </View>

      <View style={styles.mainVideoContainer}>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop',
          }}
          style={styles.mainVideo}
        />
        <View style={styles.speakerName}>
          <Text style={styles.speakerNameText}>Sarah Johnson</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.participantsRow}
      >
        <View style={[styles.participantVideo, styles.activeParticipant]}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
            }}
            style={styles.participantVideoFeed}
          />
          <Text style={styles.participantName}>You</Text>
        </View>

        <View style={styles.participantVideo}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
            }}
            style={styles.participantVideoFeed}
          />
          <Text style={styles.participantName}>Emma</Text>
        </View>

        <View style={styles.participantVideo}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
            }}
            style={styles.participantVideoFeed}
          />
          <Text style={styles.participantName}>Michael</Text>
        </View>

        <View style={styles.participantVideo}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
            }}
            style={styles.participantVideoFeed}
          />
          <Text style={styles.participantName}>Priya</Text>
        </View>
      </ScrollView>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setMicOn(!micOn)}
        >
          {micOn ? (
            <Mic color="#FFFFFF" size={24} />
          ) : (
            <MicOff color="#FFFFFF" size={24} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setVideoOn(!videoOn)}
        >
          {videoOn ? (
            <Video color="#FFFFFF" size={24} />
          ) : (
            <VideoOff color="#FFFFFF" size={24} />
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton}>
          <MessageSquare color="#FFFFFF" size={24} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.endCallButton}
          onPress={() => router.back()}
        >
          <Phone
            color="#FFFFFF"
            size={24}
            style={{ transform: [{ rotate: '135deg' }] }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Today's Topic</Text>
        <Text style={styles.infoText}>Cultural Greetings Around the World</Text>

        <View style={styles.agendaContainer}>
          <Text style={styles.agendaTitle}>Agenda:</Text>
          <Text style={styles.agendaItem}>
            • Introduction to cultural greetings
          </Text>
          <Text style={styles.agendaItem}>• Practice common greetings</Text>
          <Text style={styles.agendaItem}>• Cultural context discussion</Text>
          <Text style={styles.agendaItem}>• Q&A session</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#374151',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  participantsText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
  },
  mainVideoContainer: {
    height: 300,
    margin: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  mainVideo: {
    width: '100%',
    height: '100%',
  },
  speakerName: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  speakerNameText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#FFFFFF',
  },
  participantsRow: {
    padding: 16,
    maxHeight: 100,
  },
  participantVideo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  activeParticipant: {
    borderWidth: 2,
    borderColor: '#4F46E5',
  },
  participantVideoFeed: {
    width: '100%',
    height: '100%',
  },
  participantName: {
    position: 'absolute',
    bottom: 4,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 10,
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 2,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  endCallButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  infoContainer: {
    backgroundColor: '#1F2937',
    borderRadius: 16,
    padding: 16,
    margin: 16,
  },
  infoTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  infoText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 12,
  },
  agendaContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 8,
    padding: 12,
  },
  agendaTitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  agendaItem: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: '#D1D5DB',
    marginBottom: 4,
  },
});
