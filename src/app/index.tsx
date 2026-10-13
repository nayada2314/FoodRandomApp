import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import HomeScreen from '../../screens/HomeScreen';
import HistoryScreen from '../../screens/HistoryScreen';
import NoteListScreen from '../../screens/NoteListScreen'; // 1. นำเข้าหน้าโน้ตอาหาร
import ProfileScreen from '../../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator({ route }) {
  const username = route?.params?.username || '';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon = '🎲';
          if (route.name === 'RandomTab') icon = '🎲';
          else if (route.name === 'HistoryTab') icon = '📜';
          else if (route.name === 'NoteTab') icon = '📝';
          else if (route.name === 'ProfileTab') icon = '👤';

          return <Text style={{ fontSize: 20 }}>{icon}</Text>;
        },
        tabBarActiveTintColor: '#FF6F3C',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="RandomTab" 
        component={HomeScreen} 
        initialParams={{ username }}
        options={{ title: 'สุ่มอาหาร' }} 
      />
      <Tab.Screen 
        name="HistoryTab" 
        component={HistoryScreen} 
        options={{ title: 'ประวัติทั้งหมด' }} 
      />
      <Tab.Screen 
        name="NoteTab" 
        component={NoteListScreen} 
        options={{ title: 'โน้ตที่เลือก' }} 
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        initialParams={{ username }}
        options={{ title: 'โปรไฟล์' }} 
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'ลงทะเบียน' }} 
        />
        <Stack.Screen 
          name="MainApp" 
          component={MainTabNavigator} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
  <Stack.Screen 
  name="MainApp" 
  component={MainTabNavigator} 
  options={{ headerShown: false }} // ปิดแถบหัวข้อด้านบนตรงนี้
/>
}