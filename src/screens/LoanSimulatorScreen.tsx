import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { formatCurrency } from '../utils/format';

type LoanSimulatorScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoanSimulator'
>;

interface Props {
  navigation: LoanSimulatorScreenNavigationProp;
}

export const LoanSimulatorScreen: React.FC<Props> = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('12');
  const [interestRate, setInterestRate] = useState('10');

  const calculateLoan = () => {
    if (!amount || parseFloat(amount) <= 0) return null;

    const principal = parseFloat(amount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const numMonths = parseInt(months);

    if (rate === 0) {
      return {
        monthlyPayment: principal / numMonths,
        totalPayment: principal,
        totalInterest: 0,
      };
    }

    const monthlyPayment =
      (principal * rate * Math.pow(1 + rate, numMonths)) /
      (Math.pow(1 + rate, numMonths) - 1);
    const totalPayment = monthlyPayment * numMonths;
    const totalInterest = totalPayment - principal;

    return {
      monthlyPayment,
      totalPayment,
      totalInterest,
    };
  };

  const result = calculateLoan();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Simulador de Préstamo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Monto del préstamo</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Plazo (meses)</Text>
          <View style={styles.monthsContainer}>
            {[6, 12, 18, 24, 36, 48].map((m) => (
              <TouchableOpacity
                key={m}
                style={[
                  styles.monthButton,
                  months === m.toString() && styles.monthButtonActive,
                ]}
                onPress={() => setMonths(m.toString())}
              >
                <Text
                  style={[
                    styles.monthText,
                    months === m.toString() && styles.monthTextActive,
                  ]}
                >
                  {m}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tasa de interés anual (%)</Text>
          <View style={styles.rateContainer}>
            <TextInput
              style={styles.rateInput}
              placeholder="10"
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="decimal-pad"
            />
            <Text style={styles.rateSymbol}>%</Text>
          </View>
        </View>

        {result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Resultado de la Simulación</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Cuota mensual:</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(result.monthlyPayment)}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Total a pagar:</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(result.totalPayment)}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Intereses totales:</Text>
              <Text style={[styles.resultValue, { color: '#FF6B6B' }]}>
                {formatCurrency(result.totalInterest)}
              </Text>
            </View>
          </View>
        )}
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
  section: {
    marginVertical: 16,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  monthsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  monthButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  monthButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  monthText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  monthTextActive: {
    color: '#fff',
  },
  rateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rateInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  rateSymbol: {
    fontSize: 18,
    color: '#667eea',
    marginLeft: 8,
  },
  resultCard: {
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
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

