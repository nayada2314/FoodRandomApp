import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        // ปิดแถบ Header ด้านบนทุกหน้าแบบถาวรตรงนี้
        headerShown: false,
        
        // ตั้งค่าไอคอนและสีแถบเมนูด้านล่าง
        tabBarIcon: ({ focused }) => {
          let icon = '🎲';
          if (route.name === 'index') icon = '🎲';
          else if (route.name === 'history') icon = '📜';
          else if (route.name === 'notes') icon = '📝';
          else if (route.name === 'profile') icon = '👤';

          return <Text style={{ fontSize: 20 }}>{icon}</Text>;
        },
        tabBarActiveTintColor: '#FF6F3C',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'สุ่มอาหาร' }} />
      <Tabs.Screen name="history" options={{ title: 'ประวัติทั้งหมด' }} />
      <Tabs.Screen name="notes" options={{ title: 'โน้ตที่เลือก' }} />
      <Tabs.Screen name="profile" options={{ title: 'โปรไฟล์' }} />
    </Tabs>
  );
}