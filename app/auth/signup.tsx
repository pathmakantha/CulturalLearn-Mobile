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
import { useDispatch } from 'react-redux';
import { register } from '@/store/slices/authSlice';
import type { AppDispatch } from '@/store/store';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<'student' | 'teacher'>('student');

  const dispatch = useDispatch<AppDispatch>();

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      // Show error message
      return;
    }

    try {
      // Register the user with the selected role
      await dispatch(register({ name, email, password, role })).unwrap();

      // Navigate based on role
      if (role === 'teacher') {
        router.replace('/(teacher)/dashboard');
      } else {
        router.replace('/(student)');
      }
    } catch (error) {
      console.log('Registration error:', error);
    }
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

        {/* Role selection */}
        <View style={styles.roleContainer}>
          <Text style={styles.roleTitle}>I am a:</Text>
          <View style={styles.roleButtons}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'student' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('student')}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === 'student' && styles.roleButtonTextActive,
                ]}
              >
                Student
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === 'teacher' && styles.roleButtonActive,
              ]}
              onPress={() => setRole('teacher')}
            >
              <Text
                style={[
                  styles.roleButtonText,
                  role === 'teacher' && styles.roleButtonTextActive,
                ]}
              >
                Teacher
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
          <LinearGradient
            colors={['#E1742F', '#F2994A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/auth" asChild>
            <TouchableOpacity>
              <Text style={styles.loginLink}>Login</Text>
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
    backgroundColor: '#FFF9EC',
    paddingHorizontal: 24,
  },
  logoContainer: {
    marginTop: 80,
    alignItems: 'center',
    marginBottom: 40,
  },
  logoTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#E1742F',
    letterSpacing: 2,
  },
  logoSubtitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    letterSpacing: 8,
    marginTop: -8,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  // Role selection styles
  roleContainer: {
    marginBottom: 24,
  },
  roleTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E1742F',
    marginHorizontal: 8,
    borderRadius: 8,
  },
  roleButtonActive: {
    backgroundColor: '#E1742F',
  },
  roleButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#E1742F',
  },
  roleButtonTextActive: {
    color: '#FFF',
  },
  signupButton: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 24,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 30,
  },
  signupButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
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
