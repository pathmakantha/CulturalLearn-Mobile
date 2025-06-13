import { Tabs } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import {
  Home,
  MessageCircle,
  Book,
  Users,
  User,
  Flag,
} from 'lucide-react-native';
import { useSelector } from 'react-redux';

export default function TabLayout() {
  const { user } = useSelector((state: any) => state.auth);
  const isTeacher = user?.role === 'teacher';

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E1742F',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 86,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F0F0F0',
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Regular',
          fontSize: 12,
        },
        headerShown: false,
      }}
    >
      {/* Hidden screens - accessible but not shown in tab bar */}
      <Tabs.Screen
        name="quiz"
        options={{
          href: null, // This hides it from the tab bar but keeps it accessible
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: 'Chat',
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
          href: null,
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, size }) => <Book size={size} color={color} />,
          href: null,
        }}
      />

      <Tabs.Screen
        name="missions"
        options={{
          title: 'Missions',
          tabBarIcon: ({ color, size }) => <Flag size={size} color={color} />,
          href: null,
        }}
      />

      <Tabs.Screen
        name="feedback"
        options={{
          title: 'Missions',
          tabBarIcon: ({ color, size }) => <Flag size={size} color={color} />,
          href: null,
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: 'Community',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
});
