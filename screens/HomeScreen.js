import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ route, navigation }) {
  const username = route?.params?.username || 'ผู้ใช้งาน';

  const defaultFoods = [
    // หมวดอาหารจานเดียว
    { name: 'ข้าวกะเพราไก่ไข่ดาว', category: 'อาหารจานเดียว', price: '50 - 60 บาท' },
    { name: 'ข้าวมันไก่', category: 'อาหารจานเดียว', price: '45 - 55 บาท' },
    { name: 'ข้าวหมูทอดกระเทียม', category: 'อาหารจานเดียว', price: '50 - 60 บาท' },
    { name: 'ข้าวผัดปู', category: 'อาหารจานเดียว', price: '60 - 80 บาท' },
    { name: 'ข้าวคะน้าหมูกรอบ', category: 'อาหารจานเดียว', price: '55 - 65 บาท' },
    { name: 'ข้าวไข่เจียวหมูสับ', category: 'อาหารจานเดียว', price: '35 - 45 บาท' },
    { name: 'ข้าวหน้าเป็ด', category: 'อาหารจานเดียว', price: '60 - 75 บาท' },
    { name: 'ข้าวหมูแดงหมูกรอบ', category: 'อาหารจานเดียว', price: '60 - 70 บาท' },
    { name: 'ข้าวยำไก่แซ่บ', category: 'อาหารจานเดียว', price: '55 - 65 บาท' },
    { name: 'ข้าวผัดพริกแกงหมู', category: 'อาหารจานเดียว', price: '50 - 60 บาท' },
    
    // หมวดเมนูเส้น
    { name: 'ก๋วยเตี๋ยวต้มยำ', category: 'เมนูเส้น', price: '50 - 65 บาท' },
    { name: 'ผัดไทยกุ้งสด', category: 'เมนูเส้น', price: '60 - 80 บาท' },
    { name: 'ราดหน้าหมูหมัก', category: 'เมนูเส้น', price: '50 - 60 บาท' },
    { name: 'ก๋วยเตี๋ยวคั่วไก่', category: 'เมนูเส้น', price: '50 - 60 บาท' },
    { name: 'บะหมี่เกี๊ยวหมูแดง', category: 'เมนูเส้น', price: '50 - 60 บาท' },
    { name: 'สปาเก็ตตี้คาโบนาร่า', category: 'เมนูเส้น', price: '89 - 120 บาท' },
    { name: 'มาม่าผัดขี้เมาทะเล', category: 'เมนูเส้น', price: '60 - 80 บาท' },
    { name: 'ยากิโซบะ', category: 'เมนูเส้น', price: '60 - 75 บาท' },

    // หมวดอาหารอีสาน & แซ่บๆ
    { name: 'ส้มตำไทย + ไก่ย่าง', category: 'อาหารอีสาน', price: '80 - 120 บาท' },
    { name: 'ส้มตำปูปลาร้า + คอหมูย่าง', category: 'อาหารอีสาน', price: '90 - 130 บาท' },
    { name: 'ลาบหมู / น้ำตกหมู', category: 'อาหารอีสาน', price: '60 - 80 บาท' },
    { name: 'ต้มแซ่บกระดูกอ่อน', category: 'อาหารอีสาน', price: '80 - 100 บาท' },
    { name: 'ซุปหน่อไม้', category: 'อาหารอีสาน', price: '50 - 60 บาท' },

    // หมวดต้ม / แกง / ชาบู
    { name: 'ชาบู / สุกี้', category: 'ต้ม/ชาบู', price: '199 - 350 บาท' },
    { name: 'ต้มยำกุ้งน้ำใส/น้ำข้น', category: 'แกง/ต้มยำ', price: '120 - 180 บาท' },
    { name: 'แกงเขียวหวานไก่', category: 'แกง/ต้มยำ', price: '50 - 60 บาท' },
    { name: 'แกงจืดเต้าหู้หมูสับ', category: 'แกง/ต้มยำ', price: '45 - 60 บาท' },
    { name: 'ต้มจืดมะระยัดไส้', category: 'แกง/ต้มยำ', price: '50 - 60 บาท' },

    // หมวดจานด่วน / ของทานเล่น / ฟาสต์ฟู้ด
    { name: 'สเต็กหมู / สเต็กไก่', category: 'สเต็ก/ฟาสต์ฟู้ด', price: '79 - 120 บาท' },
    { name: 'พิซซ่าหน้าฮาวายเอี้ยน', category: 'สเต็ก/ฟาสต์ฟู้ด', price: '159 - 299 บาท' },
    { name: 'เบอร์เกอร์ไก่ชีส', category: 'สเต็ก/ฟาสต์ฟู้ด', price: '89 - 130 บาท' },
    { name: 'ข้าวหน้าเนื้อย่างซอสญี่ปุ่น', category: 'อาหารญี่ปุ่น', price: '99 - 149 บาท' },
    { name: 'ข้าวหน้าปลาแซลมอนย่างซีอิ๊ว', category: 'อาหารญี่ปุ่น', price: '120 - 180 บาท' },
  ];

  const [selectedFood, setSelectedFood] = useState(null);

  const handleRandom = async () => {
    const randomIndex = Math.floor(Math.random() * defaultFoods.length);
    const food = defaultFoods[randomIndex];
    
    const now = new Date();
    const timestamp = now.toLocaleString('th-TH', {
      dateStyle: 'short',
      timeStyle: 'medium',
    });

    const newEntry = { ...food, timestamp, selected: false };
    setSelectedFood(newEntry);

    try {
      const storedHistory = await AsyncStorage.getItem('food_history');
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      const updatedHistory = [newEntry, ...history];
      await AsyncStorage.setItem('food_history', JSON.stringify(updatedHistory));
    } catch (error) {
      console.log('Error saving history', error);
    }
  };

  const handleChooseFood = async () => {
    if (!selectedFood) return;

    try {
      const storedHistory = await AsyncStorage.getItem('food_history');
      if (storedHistory) {
        const history = JSON.parse(storedHistory);
        if (history.length > 0) {
          history[0].selected = true;
          await AsyncStorage.setItem('food_history', JSON.stringify(history));
        }
      }

      Alert.alert(
        'เลือกเมนูนี้สำเร็จ! 🎉', 
        `บันทึกรายการ "${selectedFood.name}" ลงในประวัติแอปเรียบร้อยแล้ว!`
      );
    } catch (error) {
      Alert.alert('แจ้งเตือน', 'บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  const handleLogout = () => {
    // กลับไปหน้า Login เดิมโดยใช้ navigation ของ React Navigation
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>👋 สวัสดี, {username}</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>🚪 ออกจากระบบ</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>🎲 สุ่มเมนูอาหารวันนี้</Text>

      <View style={styles.card}>
        {selectedFood ? (
          <>
            <Text style={styles.foodEmoji}>😋</Text>
            <Text style={styles.foodName}>{selectedFood.name}</Text>
            <View style={styles.tagContainer}>
              <Text style={styles.tag}>หมวดหมู่: {selectedFood.category}</Text>
              <Text style={styles.tag}>ราคาประมาณ: {selectedFood.price}</Text>
              <Text style={styles.timeText}>🕒 {selectedFood.timestamp}</Text>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.foodEmoji}>❓</Text>
            <Text style={styles.placeholderText}>กดปุ่มด้านล่างเพื่อเริ่มสุ่ม!</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.randomBtn} onPress={handleRandom}>
        <Text style={styles.randomBtnText}>🎲 สุ่มเมนูอาหาร</Text>
      </TouchableOpacity>

      {selectedFood && (
        <TouchableOpacity style={styles.chooseBtn} onPress={handleChooseFood}>
          <Text style={styles.chooseBtnText}>✅ ฉันเลือกอาหารจานนี้</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5EC', padding: 24, paddingTop: 60, justifyContent: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  welcomeText: { fontSize: 14, fontWeight: 'bold', color: '#666' },
  logoutBtn: { backgroundColor: '#FFE2E2', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8 },
  logoutText: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FF6F3C', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 24, alignItems: 'center', justifyContent: 'center', minHeight: 220, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, marginBottom: 20 },
  foodEmoji: { fontSize: 50, marginBottom: 12 },
  foodName: { fontSize: 22, fontWeight: 'bold', color: '#222', textAlign: 'center', marginBottom: 8 },
  placeholderText: { fontSize: 16, color: '#888' },
  tagContainer: { alignItems: 'center', gap: 4 },
  tag: { fontSize: 14, color: '#666' },
  timeText: { fontSize: 12, color: '#999', marginTop: 4 },
  randomBtn: { backgroundColor: '#FF6F3C', paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginBottom: 12, shadowColor: '#FF6F3C', shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  randomBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  chooseBtn: { backgroundColor: '#34C759', paddingVertical: 14, borderRadius: 25, alignItems: 'center', shadowColor: '#34C759', shadowOpacity: 0.3, shadowRadius: 6, elevation: 4 },
  chooseBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});