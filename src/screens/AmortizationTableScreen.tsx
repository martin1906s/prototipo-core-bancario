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
import { formatCurrency } from '../utils/format';

type AmortizationTableScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AmortizationTable'
>;
type AmortizationTableScreenRouteProp = RouteProp<
  RootStackParamList,
  'AmortizationTable'
>;

interface Props {
  navigation: AmortizationTableScreenNavigationProp;
  route: AmortizationTableScreenRouteProp;
}

export const AmortizationTableScreen: React.FC<Props> = ({ navigation, route }) => {
  const { loans } = useAuth();
  const loan = loans.find((l) => l.id === route.params.loanId);

  if (!loan) {
    return (
      <View style={styles.container}>
        <Text>Préstamo no encontrado</Text>
      </View>
    );
  }

  // Generar tabla de amortización simulada
  const generateAmortizationTable = () => {
    const table = [];
    const monthlyRate = loan.interestRate / 100 / 12;
    const numMonths = Math.ceil(loan.remainingBalance / loan.monthlyPayment);
    let remainingBalance = loan.remainingBalance;

    for (let i = 1; i <= Math.min(numMonths, 12); i++) {
      const interest = remainingBalance * monthlyRate;
      const principal = loan.monthlyPayment - interest;
      remainingBalance -= principal;

      table.push({
        month: i,
        payment: loan.monthlyPayment,
        principal,
        interest,
        balance: remainingBalance,
      });
    }

    return table;
  };

  const amortizationTable = generateAmortizationTable();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tabla de Amortización</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>{loan.type}</Text>
          <Text style={styles.summaryAmount}>{formatCurrency(loan.amount)}</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Cuota mensual:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(loan.monthlyPayment)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tasa de interés:</Text>
            <Text style={styles.summaryValue}>{loan.interestRate}%</Text>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Mes</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Cuota</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Capital</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Interés</Text>
            <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Saldo</Text>
          </View>
          {amortizationTable.map((row) => (
            <View key={row.month} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1 }]}>{row.month}</Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {formatCurrency(row.payment)}
              </Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {formatCurrency(row.principal)}
              </Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {formatCurrency(row.interest)}
              </Text>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>
                {formatCurrency(row.balance)}
              </Text>
            </View>
          ))}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#667eea',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  tableContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#667eea',
    padding: 12,
  },
  tableHeaderText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

