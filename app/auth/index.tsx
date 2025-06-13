import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
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
import { Eye, EyeOff } from 'lucide-react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '@/store/slices/authSlice';
import type { AppDispatch, RootState } from '@/store/store';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleLogin = async () => {
    try {
      // Determine role based on email for demo purposes
      const role = email.includes('teacher') ? 'teacher' : 'student';

      // Dispatch login action with email, password, and role
      await dispatch(login({ email, password, role })).unwrap();

      // Navigate based on role
      if (role === 'teacher') {
        router.replace('/(teacher)');
      } else {
        router.replace('/(student)');
      }
    } catch (err) {
      // Error is handled by the reducer
      console.log('Login error:', err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Add some demo account hints
  const setDemoAccount = (type: 'student' | 'teacher') => {
    if (type === 'student') {
      setEmail('sewwandi@gmail.com');
      setPassword('password');
    } else {
      setEmail('teacher1@gmail.com');
      setPassword('password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoTitle}>CULTURAL</Text>
        <Text style={styles.logoSubtitle}>LEARN</Text>
      </View>

      <View style={styles.formContainer}>
        {error && <Text style={styles.errorText}>{error}</Text>}

        <TextInput
          placeholder="Your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          containerStyle={styles.inputContainer}
          editable={!isLoading}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            containerStyle={styles.inputContainer}
            editable={!isLoading}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={toggleShowPassword}>
            {showPassword ? (
              <EyeOff size={24} color="#E1742F" />
            ) : (
              <Eye size={24} color="#E1742F" />
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#E1742F', '#F2994A']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <Link href="/auth/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Demo account buttons */}
        <View style={styles.demoContainer}>
          <Text style={styles.demoTitle}>Demo Accounts:</Text>
          <View style={styles.demoButtons}>
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => setDemoAccount('student')}
            >
              <Text style={styles.demoButtonText}>Student</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.demoButton}
              onPress={() => setDemoAccount('teacher')}
            >
              <Text style={styles.demoButtonText}>Teacher</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 60,
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
    marginBottom: 20,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgotPassword: {
    fontFamily: 'Poppins-Regular',
    color: '#E1742F',
    fontSize: 14,
  },
  loginButton: {
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 24,
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    borderRadius: 30,
  },
  loginButtonText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  signupText: {
    fontFamily: 'Poppins-Regular',
    color: '#666',
    fontSize: 14,
  },
  signupLink: {
    fontFamily: 'Poppins-SemiBold',
    color: '#E1742F',
    fontSize: 14,
  },
  errorText: {
    color: '#E53935',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  // Demo account styles
  demoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  demoTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  demoButton: {
    backgroundColor: '#FEF3DD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  demoButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#E1742F',
  },
});
