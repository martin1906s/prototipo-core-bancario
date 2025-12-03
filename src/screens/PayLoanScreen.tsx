import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Transaction } from '../types';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/format';

type PayLoanScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'PayLoan'
>;
type PayLoanScreenRouteProp = RouteProp<RootStackParamList, 'PayLoan'>;

interface Props {
  navigation: PayLoanScreenNavigationProp;
  route: PayLoanScreenRouteProp;
}

export const PayLoanScreen: React.FC<Props> = ({ navigation, route }) => {
  const { loans, accounts, addTransaction, updateAccountBalance } = useAuth();
  const loan = loans.find((l) => l.id === route.params.loanId);
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id);

  if (!loan) {
    return (
      <View style={styles.container}>
        <Text>Préstamo no encontrado</Text>
      </View>
    );
  }

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  const handlePayment = () => {
    if (!selectedAccount) {
      Alert.alert('Error', 'Por favor selecciona una cuenta');
      return;
    }

    if (loan.monthlyPayment > selectedAccount.balance) {
      Alert.alert('Error', 'Saldo insuficiente');
      return;
    }

    // Actualizar balance de la cuenta
    updateAccountBalance(selectedAccountId, -loan.monthlyPayment);

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'Pago',
      amount: -loan.monthlyPayment,
      date: new Date(),
      description: `Pago cuota préstamo ${loan.type}`,
      status: 'Completada',
    };

    addTransaction(newTransaction);

    Alert.alert(
      'Pago Exitoso',
      `Has pagado ${formatCurrency(loan.monthlyPayment)} exitosamente`,
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedAccountId(accounts[0]?.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagar Cuota</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.loanCard}>
          <Text style={styles.loanType}>{loan.type}</Text>
          <Text style={styles.loanAmount}>{formatCurrency(loan.amount)}</Text>
          <View style={styles.loanDetails}>
            <View style={styles.loanDetailRow}>
              <Text style={styles.loanDetailLabel}>Cuota mensual:</Text>
              <Text style={styles.loanDetailValue}>
                {formatCurrency(loan.monthlyPayment)}
              </Text>
            </View>
            <View style={styles.loanDetailRow}>
              <Text style={styles.loanDetailLabel}>Saldo pendiente:</Text>
              <Text style={styles.loanDetailValue}>
                {formatCurrency(loan.remainingBalance)}
              </Text>
            </View>
            <View style={styles.loanDetailRow}>
              <Text style={styles.loanDetailLabel}>Próximo pago:</Text>
              <Text style={styles.loanDetailValue}>
                {loan.nextPaymentDate.toLocaleDateString('es-EC')}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Pagar desde</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                onPress={() => setSelectedAccountId(account.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    selectedAccountId === account.id
                      ? ['#667eea', '#764ba2']
                      : ['#e0e0e0', '#bdbdbd']
                  }
                  style={styles.accountCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.accountType}>{account.accountType}</Text>
                  <Text style={styles.accountBalance}>
                    {formatCurrency(account.balance)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Monto a pagar:</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(loan.monthlyPayment)}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Comisión:</Text>
            <Text style={styles.summaryValue}>$0.00</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotal]}>
            <Text style={styles.summaryTotalLabel}>Total:</Text>
            <Text style={styles.summaryTotalValue}>
              {formatCurrency(loan.monthlyPayment)}
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.payButton} 
          onPress={handlePayment}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.payButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.payButtonText}>Confirmar Pago</Text>
            <Ionicons name="checkmark-circle" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
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
  loanCard: {
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
  loanType: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  loanAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  loanDetails: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 16,
  },
  loanDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  loanDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  loanDetailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
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
  accountCard: {
    width: 150,
    height: 100,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  accountType: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  accountBalance: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  summaryTotal: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 12,
    marginTop: 8,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#667eea',
  },
  payButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  payButtonGradient: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

