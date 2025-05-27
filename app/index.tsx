import { useEffect } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '@/assets/images/logo';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

SplashScreen.preventAutoHideAsync();

export default function SplashIndex() {
  const [fontsLoaded] = useFonts({
    'Poppins-Bold': Poppins_700Bold,
    'Poppins-SemiBold': Poppins_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#E1742F', '#D16628']}
        style={styles.background}
      />
      <Animated.View 
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(500)}
        style={styles.logoContainer}
      >
        <Logo size={120} />
        <Text style={styles.title}>CULTURAL</Text>
        <Text style={styles.subtitle}>LEARN</Text>
      </Animated.View>
      
      <Redirect href="/auth" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: 'white',
    marginTop: 20,
    letterSpacing: 1,
  },
  subtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 56,
    color: 'white',
    letterSpacing: 2,
    marginTop: -10,
  },
});