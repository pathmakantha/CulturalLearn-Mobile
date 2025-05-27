import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  useFonts,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import {
  MessageCircle,
  Globe,
  Gamepad2,
  Headset as VrHeadset,
  ChevronRight,
} from 'lucide-react-native';

type FeatureCardProps = {
  title: string;
  description: string;
  icon: string;
  route: string;
  backgroundColor?: string;
};

export default function FeatureCard({
  title,
  description,
  icon,
  route,
  backgroundColor = '#FFF',
}: FeatureCardProps) {
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const getIcon = () => {
    switch (icon) {
      case 'message-circle':
        return <MessageCircle size={24} color="#E1742F" />;
      case 'globe':
        return <Globe size={24} color="#E1742F" />;
      case 'gamepad-2':
        return <Gamepad2 size={24} color="#E1742F" />;
      case 'vr-headset':
        return <VrHeadset size={24} color="#E1742F" />;
      default:
        return <Globe size={24} color="#E1742F" />;
    }
  };

  const handlePress = () => {
    router.push(route as any);
  };

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={handlePress}
    >
      <View style={styles.iconContainer}>{getIcon()}</View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.arrowContainer}>
        <ChevronRight size={16} color="#E1742F" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    minHeight: 180,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
