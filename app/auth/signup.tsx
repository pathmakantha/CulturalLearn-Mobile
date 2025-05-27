import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { TextInput } from '@/components/TextInput';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Poppins_700Bold,
  Poppins_600SemiBold,
  Poppins_400Regular,
} from '@expo-google-fonts/poppins';
import { ChevronRight, Eye, EyeOff } from 'lucide-react-native';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSignup = () => {
    // In a real app, implement proper registration
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoTitle}>CULTURAL</Text>
        <Text style={styles.logoSubtitle}>LEARN</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput
          placeholder="Your name"
          value={name}
          onChangeText={setName}
          containerStyle={styles.inputContainer}
        />

        <TextInput
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.inputContainer}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            containerStyle={styles.inputContainer}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff size={24} color="#E1742F" />
            ) : (
              <Eye size={24} color="#E1742F" />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            containerStyle={styles.inputContainer}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <EyeOff size={24} color="#E1742F" />
            ) : (
              <Eye size={24} color="#E1742F" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <LinearGradient
            colors={['#E1742F', '#D16628']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.signupButtonText}>Sign up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/auth" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#E1742F',
  },
  logoSubtitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 44,
    color: '#E1742F',
    marginTop: -12,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  signupButton: {
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
    marginBottom: 24,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
    fontSize: 14,
  },
  loginLink: {
    fontFamily: 'Poppins-SemiBold',
    color: '#E1742F',
    fontSize: 14,
  },
});
