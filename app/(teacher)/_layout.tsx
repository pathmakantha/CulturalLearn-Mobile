import { Tabs } from 'expo-router';
import { View, StyleSheet, Platform } from 'react-native';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { Home, MessageSquare, User } from 'lucide-react-native';

export default function TeacherLayout() {
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
      <Tabs.Screen
        name="messages/index"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color }) => <MessageSquare size={24} color={color} />,
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
        name="teacherProfile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />

      <Tabs.Screen
        name="students/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="resources/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="analytics/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="messages/1"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="messages/add"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="conference/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="conference/create/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="collaborations/index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="lessons/create/index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
