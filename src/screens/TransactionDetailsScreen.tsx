import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp, RouteProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { formatCurrency, formatDate, getTransactionColor } from '../utils/format';

type TransactionDetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransactionDetails'>;
type TransactionDetailsScreenRouteProp = RouteProp<RootStackParamList, 'TransactionDetails'>;

interface Props {
  navigation: TransactionDetailsScreenNavigationProp;
  route: TransactionDetailsScreenRouteProp;
}

export const TransactionDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { transaction } = route.params;

  const getIcon = () => {
    switch (transaction.type) {
      case 'Transferencia':
        return 'swap-horizontal';
      case 'Pago':
        return 'card';
      case 'Depósito':
        return 'arrow-down-circle';
      case 'Retiro':
        return 'arrow-up-circle';
      default:
        return 'wallet';
    }
  };

  const color = getTransactionColor(transaction.type);
  const isNegative = transaction.amount < 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={[color, color + '80']}
            style={styles.iconGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name={getIcon()} size={48} color="#fff" />
          </LinearGradient>
        </View>

        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: isNegative ? '#FF6B6B' : '#4CAF50' }]}>
            {isNegative ? '' : '+'}{formatCurrency(transaction.amount)}
          </Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: transaction.status === 'Completada' ? '#4CAF50' : '#FFA500' }
          ]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="document-text-outline" size={20} color="#667eea" />
              <Text style={styles.detailLabel}>Descripción</Text>
            </View>
            <Text style={styles.detailValue}>{transaction.description}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="calendar-outline" size={20} color="#667eea" />
              <Text style={styles.detailLabel}>Fecha</Text>
            </View>
            <Text style={styles.detailValue}>{formatDate(transaction.date)}</Text>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="pricetag-outline" size={20} color="#667eea" />
              <Text style={styles.detailLabel}>Tipo</Text>
            </View>
            <Text style={styles.detailValue}>{transaction.type}</Text>
          </View>

          {transaction.from && (
            <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="arrow-forward-outline" size={20} color="#667eea" />
              <Text style={styles.detailLabel}>Desde</Text>
            </View>
            <Text style={styles.detailValue}>{transaction.from}</Text>
          </View>
          )}

          {transaction.to && (
            <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="arrow-back-outline" size={20} color="#667eea" />
              <Text style={styles.detailLabel}>Hacia</Text>
            </View>
            <Text style={styles.detailValue}>{transaction.to}</Text>
          </View>
          )}

          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Ionicons name="receipt-outline" size={20} color="#667eea" />
              <Text style={styles.detailLabel}>ID de Transacción</Text>
            </View>
            <Text style={styles.detailValue}>{transaction.id}</Text>
          </View>
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
  iconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  amount: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailRow: {
    marginBottom: 20,
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 13,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});

