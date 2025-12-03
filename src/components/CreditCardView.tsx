import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { CreditCard } from '../types';
import { formatCurrency } from '../utils/format';

interface CreditCardViewProps {
  card: CreditCard;
  onPress?: () => void;
}

export const CreditCardView: React.FC<CreditCardViewProps> = ({ card, onPress }) => {
  const gradientColors =
    card.cardType === 'Visa'
      ? ['#1a1a2e', '#16213e']
      : ['#c94b4b', '#4b134f'];

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <LinearGradient colors={gradientColors} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.header}>
          <Ionicons name="card" size={32} color="#FFD700" />
          <Text style={styles.cardType}>{card.cardType}</Text>
        </View>
        
        <Text style={styles.cardNumber}>{card.cardNumber}</Text>
        
        <View style={styles.footer}>
          <View>
            <Text style={styles.label}>Válida hasta</Text>
            <Text style={styles.expiryDate}>{card.expiryDate}</Text>
          </View>
          <View style={styles.creditInfo}>
            <Text style={styles.label}>Disponible</Text>
            <Text style={styles.availableCredit}>
              {formatCurrency(card.availableCredit)}
            </Text>
          </View>
        </View>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(card.availableCredit / card.creditLimit) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.limitText}>
            de {formatCurrency(card.creditLimit)}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    minHeight: 200,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardNumber: {
    fontSize: 20,
    color: '#fff',
    letterSpacing: 2,
    fontWeight: '600',
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 4,
  },
  expiryDate: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  creditInfo: {
    alignItems: 'flex-end',
  },
  availableCredit: {
    fontSize: 16,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  limitText: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7,
  },
});

