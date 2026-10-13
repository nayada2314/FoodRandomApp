import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user_account');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUsername(userData.username);
      }
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถโหลดข้อมูลโปรไฟล์ได้');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.avatar}>👤</Text>
        <Text style={styles.label}>ชื่อผู้ใช้งาน (Username)</Text>
        <Text style={styles.username}>{username || 'ไม่พบข้อมูล'}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>📱 สถานะ: เข้าสู่ระบบอยู่</Text>
          <Text style={styles.infoText}>✨ แอปพลิเคชัน: สุ่มเมนูอาหาร</Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>กลับหน้าสุ่มอาหาร</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5EC', justifyContent: 'center', padding: 24 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 28, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  avatar: { fontSize: 60, marginBottom: 16 },
  label: { fontSize: 14, color: '#888', marginBottom: 4 },
  username: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 24 },
  infoBox: { width: '100%', backgroundColor: '#F9F9F9', padding: 16, borderRadius: 12, marginBottom: 24, gap: 8 },
  infoText: { fontSize: 14, color: '#555' },
  backButton: { backgroundColor: '#FF6F3C', width: '100%', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  backButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});