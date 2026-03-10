'use client';

import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'next/navigation';

// Mock data for the user's transaction history
const TRANSACTIONS = [
  { id: 'TXN-98237', date: 'Feb 15, 2026', title: 'Medical Assistance Fund', amount: '2,400 php', method: 'Gcash', status: 'Completed' },
  { id: 'TXN-87122', date: 'Jan 30, 2026', title: 'Feed the Hungry', amount: '1,000 php', method: 'Credit Card', status: 'Completed' },
  { id: 'TXN-76499', date: 'Dec 08, 2025', title: 'Support Families in Need', amount: '500 php', method: 'Paymaya', status: 'Completed' },
  { id: 'TXN-65912', date: 'Nov 22, 2025', title: 'Environmental Conservation', amount: '800 php', method: 'Gcash', status: 'Completed' },
  { id: 'TXN-54331', date: 'Oct 05, 2025', title: 'Education for all', amount: '750 php', method: 'Credit Card', status: 'Completed' },
];

export default function TransactionsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All');

  // Calculate total donated for the sidebar stat
  const totalDonated = TRANSACTIONS.reduce((sum, txn) => {
    return sum + parseInt(txn.amount.replace(/,/g, '').replace(' php', ''), 10);
  }, 0).toLocaleString();

  return (
    <View style={styles.container}>
      
      {/* ========================================= */}
      {/* LEFT SIDEBAR (Navigation & Stats)         */}
      {/* ========================================= */}
      <View style={styles.sidebar}>
        <Text style={styles.sidebarTitle}>Transactions</Text>

        {/* Quick Impact Stat */}
        <View style={styles.impactCard}>
          <Text style={styles.impactLabel}>Total Impact</Text>
          <Text style={styles.impactValue}>{totalDonated} php</Text>
          <Text style={styles.impactSubtext}>Across {TRANSACTIONS.length} donations</Text>
        </View>

        {/* Action Buttons (Home, Profile, Logout) */}
        <View style={styles.actionButtonsContainer}>
          <Pressable style={styles.actionButton} onPress={() => router.push('/home')}>
            <Text style={styles.actionIcon}>🏠</Text>
            <Text style={styles.actionText}>Dashboard</Text>
          </Pressable>
          
          <Pressable style={styles.actionButton} onPress={() => router.push('/profile')}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text style={styles.actionText}>Donor Profile</Text>
          </Pressable>

          <View style={styles.line} />

          <Pressable style={styles.actionButton} onPress={() => router.push('/login')}>
            <Text style={styles.actionIcon}>🚪</Text>
            <Text style={styles.actionText}>Logout</Text>
          </Pressable>
        </View>
      </View>

      {/* ========================================= */}
      {/* RIGHT CONTENT (Transaction History)       */}
      {/* ========================================= */}
      <View style={styles.mainContent}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Donation History</Text>
          
          {/* Simple Tabs to filter views */}
          <View style={styles.tabsContainer}>
            {['All', 'Completed', 'Pending'].map((tab) => (
              <Pressable 
                key={tab} 
                style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingBottom: 50 }}>
          {TRANSACTIONS.map((txn, index) => (
            <View key={index} style={styles.transactionCard}>
              
              <View style={styles.iconContainer}>
                <Text style={styles.receiptIcon}>🧾</Text>
              </View>

              <View style={styles.txnDetails}>
                <Text style={styles.txnTitle}>{txn.title}</Text>
                <View style={styles.txnMetaRow}>
                  <Text style={styles.txnMetaText}>{txn.date}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.txnMetaText}>ID: {txn.id}</Text>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.txnMetaText}>Paid via {txn.method}</Text>
                </View>
              </View>

              <View style={styles.txnRight}>
                <Text style={styles.txnAmount}>{txn.amount}</Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>{txn.status}</Text>
                </View>
              </View>

            </View>
          ))}
        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', backgroundColor: '#F5F6F8', height: '100vh' as any },
  
  // =========================================
  // SIDEBAR STYLES
  // =========================================
  sidebar: {
    width: 320,
    height: '100%',
    backgroundImage: 'linear-gradient(to bottom, #E8A8A8, #A33A3A)', // Matches Profile gradient
    padding: 40,
  } as any,
  sidebarTitle: { fontSize: 28, fontWeight: 'bold', color: '#6A1B1B', marginBottom: 40 },
  
  impactCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 25,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  impactLabel: { fontSize: 14, color: '#6A1B1B', fontWeight: '600', marginBottom: 10 },
  impactValue: { fontSize: 32, fontWeight: 'bold', color: '#6A1B1B', marginBottom: 5 },
  impactSubtext: { fontSize: 12, color: '#6A1B1B', opacity: 0.8 },

  actionButtonsContainer: { flex: 1 },
  actionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.2)', padding: 15, borderRadius: 12, marginBottom: 15, cursor: 'pointer' } as any,
  actionIcon: { fontSize: 20, marginRight: 15, color: '#6A1B1B' },
  actionText: { fontSize: 16, fontWeight: '600', color: '#6A1B1B' },
  line: { width: '100%', height: 1, backgroundColor: 'rgba(106, 27, 27, 0.2)', marginVertical: 20 },

  // =========================================
  // MAIN CONTENT STYLES
  // =========================================
  mainContent: { flex: 1, padding: 50 },
  
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  sectionTitle: { fontSize: 28, fontWeight: 'bold', color: '#333' },
  
  tabsContainer: { flexDirection: 'row', backgroundColor: '#EBEBEB', borderRadius: 20, padding: 5 },
  tabButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 15, cursor: 'pointer' } as any,
  activeTabButton: { backgroundColor: '#FFFFFF', boxShadow: '0px 2px 5px rgba(0,0,0,0.05)' } as any,
  tabText: { fontSize: 14, color: '#888', fontWeight: '600' },
  activeTabText: { color: '#6A1B1B' },

  listContainer: { flex: 1 },
  
  // =========================================
  // TRANSACTION CARD STYLES
  // =========================================
  transactionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    marginBottom: 15,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.03)',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    transition: 'transform 0.2s ease',
  } as any,
  
  iconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF4F4', justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  receiptIcon: { fontSize: 20, color: '#8A1515' },
  
  txnDetails: { flex: 1 },
  txnTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  txnMetaRow: { flexDirection: 'row', alignItems: 'center' },
  txnMetaText: { fontSize: 13, color: '#888' },
  dot: { marginHorizontal: 8, color: '#CCC', fontSize: 10 },
  
  txnRight: { alignItems: 'flex-end' },
  txnAmount: { fontSize: 18, fontWeight: 'bold', color: '#8A1515', marginBottom: 8 },
  statusPill: { backgroundColor: '#E8F5E9', paddingVertical: 5, paddingHorizontal: 12, borderRadius: 10 },
  statusText: { color: '#2E7D32', fontSize: 12, fontWeight: 'bold' },
});