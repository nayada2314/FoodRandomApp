import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function NoteListScreen() {
  const [selectedNotes, setSelectedNotes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadChosenFoodNotes();
    }
  }, [isFocused]);

  // โหลดเฉพาะรายการที่ผู้ใช้กด "ฉันเลือกอาหารจานนี้" (selected: true)
  const loadChosenFoodNotes = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('food_history');
      if (storedHistory) {
        const history = JSON.parse(storedHistory);
        const chosenOnly = history.filter(item => item.selected === true);
        setSelectedNotes(chosenOnly);
      }
    } catch (error) {
      console.log('Error loading notes', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 โน้ตประวัติอาหารที่ฉันเลือก</Text>
      <Text style={styles.subtitle}>รายการอาหารที่คุณเคยตัดสินใจกินจริง ๆ</Text>

      {selectedNotes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🍽️</Text>
          <Text style={styles.emptyText}>ยังไม่มีรายการที่เลือก</Text>
          <Text style={styles.emptySubText}>ไปสุ่มอาหารแล้วกด "ฉันเลือกอาหารจานนี้" กันเถอะ!</Text>
        </View>
      ) : (
        <FlatList
          data={selectedNotes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.foodName}>{item.name}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>✅ เลือกแล้ว</Text>
                </View>
              </View>
              <Text style={styles.category}>หมวดหมู่: {item.category} | ราคา: {item.price}</Text>
              <Text style={styles.timeText}>🕒 บันทึกเมื่อ: {item.timestamp}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5EC', padding: 20, paddingTop: 60 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FF6F3C', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyEmoji: { fontSize: 50, marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#666', fontWeight: 'bold' },
  emptySubText: { fontSize: 14, color: '#999', marginTop: 4, textAlign: 'center' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  category: { fontSize: 14, color: '#666', marginBottom: 6 },
  timeText: { fontSize: 12, color: '#999' },
  badge: { backgroundColor: '#34C759', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});