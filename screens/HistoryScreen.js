import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryScreen() {
  const [historyList, setHistoryList] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      loadHistory();
    }
  }, [isFocused]);

  const loadHistory = async () => {
    try {
      const storedHistory = await AsyncStorage.getItem('food_history');
      if (storedHistory) {
        setHistoryList(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.log('Error loading history', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('food_history');
      setHistoryList([]);
    } catch (error) {
      console.log('Error clearing history', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>📜 ประวัติการสุ่มอาหาร</Text>
        {historyList.length > 0 && (
          <TouchableOpacity onPress={clearHistory} style={styles.clearBtn}>
            <Text style={styles.clearText}>ล้างประวัติ</Text>
          </TouchableOpacity>
        )}
      </View>

      {historyList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="fast-food-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>ยังไม่มีประวัติการสุ่มอาหาร</Text>
          <Text style={styles.emptySubText}>ลองไปกดสุ่มที่หน้าแรกดูสิ!</Text>
        </View>
      ) : (
        <FlatList
          data={historyList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.foodName}>{item.name}</Text>
                {item.selected && (
                  <View style={styles.badge}>
                    <Ionicons name="checkmark-circle" size={14} color="#fff" />
                    <Text style={styles.badgeText}>เลือกเมนูนี้</Text>
                  </View>
                )}
              </View>
              <Text style={styles.category}>หมวดหมู่: {item.category} | ราคา: {item.price}</Text>
              <Text style={styles.timeText}>🕒 สุ่มเมื่อ: {item.timestamp}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5EC', padding: 20, paddingTop: 50 },
  headerContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FF6F3C' },
  clearBtn: { backgroundColor: '#FFE2E2', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
  clearText: { color: '#FF3B30', fontSize: 12, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666', marginTop: 10, fontWeight: 'bold' },
  emptySubText: { fontSize: 14, color: '#999', marginTop: 4 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  foodName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  category: { fontSize: 14, color: '#666', marginBottom: 6 },
  timeText: { fontSize: 12, color: '#999' },
  badge: { flexDirection: 'row', backgroundColor: '#34C759', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, alignItems: 'center', gap: 4 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
});