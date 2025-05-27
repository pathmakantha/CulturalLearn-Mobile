import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Link, router } from 'expo-router';
import { TextInput } from '@/components/TextInput';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_700Bold, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
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
      await dispatch(login({ email, password })).unwrap();
      router.replace('/(tabs)');
    } catch (err) {
      // Error is handled by the reducer
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logoTitle}>CULTURAL</Text>
        <Text style={styles.logoSubtitle}>LEARN</Text>
      </View>

      <View style={styles.formContainer}>
        {error && (
          <Text style={styles.errorText}>{error}</Text>
        )}
        
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
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={toggleShowPassword}
          >
            {showPassword ? 
              <EyeOff size={24} color="#E1742F" /> : 
              <Eye size={24} color="#E1742F" />
            }
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={handleLogin} 
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          disabled={isLoading}
        >
          <LinearGradient
            colors={['#E1742F', '#D16628']}
            style={styles.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Signing in...' : 'Sign in'}
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
  errorText: {
    fontFamily: 'Poppins-Regular',
    color: '#DC2626',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 24,
  },
  forgotPassword: {
    fontFamily: 'Poppins-Regular',
    color: '#E1742F',
    fontSize: 14,
  },
  loginButton: {
    height: 56,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 24,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: 'white',
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
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
});