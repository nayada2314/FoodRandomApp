import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem('user_account');
      
      if (!storedUser) {
        Alert.alert('ไม่พบบัญชีผู้ใช้', 'คุณยังไม่ได้ลงทะเบียน กรุณาลงทะเบียนก่อนใช้งาน', [
          { text: 'ไปหน้าลงทะเบียน', onPress: () => navigation.navigate('Register') }
        ]);
        return;
      }

      const userData = JSON.parse(storedUser);

      if (userData.username === username && userData.password === password) {
        // เปลี่ยนจาก 'Home' เป็น 'MainApp' เพื่อเข้าสู่ระบบ Tab Bar ด้านล่าง
        navigation.replace('MainApp', { username: userData.username });
      } else {
        Alert.alert('เข้าสู่ระบบไม่สำเร็จ', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถเข้าสู่ระบบได้');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🍱 FOOD RANDOM</Text>
      <Text style={styles.title}>เข้าสู่ระบบ</Text>

      <View style={styles.form}>
        <Text style={styles.label}>ชื่อผู้ใช้งาน</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกชื่อผู้ใช้งาน"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>รหัสผ่าน</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกรหัสผ่าน"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>ยังไม่มีบัญชี? ลงทะเบียนที่นี่</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5EC', justifyContent: 'center', padding: 24 },
  logo: { fontSize: 32, fontWeight: '900', color: '#FF6F3C', textAlign: 'center', marginBottom: 4 },
  title: { fontSize: 20, fontWeight: '600', color: '#555', textAlign: 'center', marginBottom: 28 },
  form: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 6 },
  input: { backgroundColor: '#F9F9F9', borderWidth: 1, borderColor: '#DDD', borderRadius: 10, padding: 12, fontSize: 16, marginBottom: 16 },
  button: { backgroundColor: '#FF6F3C', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  linkButton: { marginTop: 16, alignItems: 'center' },
  linkText: { color: '#FF6F3C', fontSize: 14, fontWeight: '600' },
});