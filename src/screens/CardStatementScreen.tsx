import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { TransactionItem } from '../components/TransactionItem';
import { formatCurrency } from '../utils/format';

type CardStatementScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CardStatement'
>;
type CardStatementScreenRouteProp = RouteProp<RootStackParamList, 'CardStatement'>;

interface Props {
  navigation: CardStatementScreenNavigationProp;
  route: CardStatementScreenRouteProp;
}

export const CardStatementScreen: React.FC<Props> = ({ navigation, route }) => {
  const { cards, transactions } = useAuth();
  const card = cards.find((c) => c.id === route.params.cardId);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Tarjeta no encontrada</Text>
      </View>
    );
  }

  // Filtrar transacciones relacionadas con tarjetas (simulado)
  const cardTransactions = transactions.filter((t) => t.type === 'Pago').slice(0, 10);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Estado de Cuenta</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Límite de Crédito</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(card.creditLimit)}</Text>
          <Text style={styles.summaryLabel}>Crédito Disponible</Text>
          <Text style={[styles.summaryAmount, { color: '#4CAF50' }]}>
            {formatCurrency(card.availableCredit)}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Movimientos Recientes</Text>
          {cardTransactions.length > 0 ? (
            cardTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="document-outline" size={64} color="#ccc" />
              <Text style={styles.emptyText}>No hay movimientos</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  summaryCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
  },
  summaryAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 4,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 16,
  },
});

