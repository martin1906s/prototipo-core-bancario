import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Transaction } from '../types';
import { formatCurrency } from '../utils/format';

type DepositScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Deposit'>;

interface Props {
  navigation: DepositScreenNavigationProp;
}

export const DepositScreen: React.FC<Props> = ({ navigation }) => {
  const { accounts, addTransaction, updateAccountBalance } = useAuth();
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id);
  const [amount, setAmount] = useState('');
  const [depositMethod, setDepositMethod] = useState<'cash' | 'transfer' | 'check'>('cash');

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  const handleDeposit = () => {
    if (!amount) {
      Alert.alert('Error', 'Ingresa un monto');
      return;
    }

    const depositAmount = parseFloat(amount);
    if (isNaN(depositAmount) || depositAmount <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }

    if (!selectedAccount) {
      Alert.alert('Error', 'Por favor selecciona una cuenta');
      return;
    }

    const methodText = {
      cash: 'Depósito en efectivo',
      transfer: 'Depósito por transferencia',
      check: 'Depósito con cheque',
    };

    // Actualizar balance de la cuenta
    updateAccountBalance(selectedAccountId, depositAmount);

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'Depósito',
      amount: depositAmount,
      date: new Date(),
      description: methodText[depositMethod],
      status: 'Completada',
    };

    addTransaction(newTransaction);

    Alert.alert(
      'Depósito Exitoso',
      `Has depositado ${formatCurrency(depositAmount)} exitosamente`,
      [
        {
          text: 'OK',
          onPress: () => {
            setAmount('');
            setDepositMethod('cash');
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
        <Text style={styles.headerTitle}>Depósito</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>A mi cuenta</Text>
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

        <View style={styles.section}>
          <Text style={styles.label}>Método de depósito</Text>
          <View style={styles.methodContainer}>
            <TouchableOpacity
              style={[
                styles.methodButton,
                depositMethod === 'cash' && styles.methodButtonActive,
              ]}
              onPress={() => setDepositMethod('cash')}
            >
              <Ionicons
                name="cash"
                size={24}
                color={depositMethod === 'cash' ? '#fff' : '#667eea'}
              />
              <Text
                style={[
                  styles.methodText,
                  depositMethod === 'cash' && styles.methodTextActive,
                ]}
              >
                Efectivo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodButton,
                depositMethod === 'transfer' && styles.methodButtonActive,
              ]}
              onPress={() => setDepositMethod('transfer')}
            >
              <Ionicons
                name="swap-horizontal"
                size={24}
                color={depositMethod === 'transfer' ? '#fff' : '#667eea'}
              />
              <Text
                style={[
                  styles.methodText,
                  depositMethod === 'transfer' && styles.methodTextActive,
                ]}
              >
                Transferencia
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodButton,
                depositMethod === 'check' && styles.methodButtonActive,
              ]}
              onPress={() => setDepositMethod('check')}
            >
              <Ionicons
                name="document-text"
                size={24}
                color={depositMethod === 'check' ? '#fff' : '#667eea'}
              />
              <Text
                style={[
                  styles.methodText,
                  depositMethod === 'check' && styles.methodTextActive,
                ]}
              >
                Cheque
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Monto a depositar</Text>
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

        {amount && parseFloat(amount) > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Monto a depositar:</Text>
              <Text style={styles.summaryValue}>{formatCurrency(parseFloat(amount))}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Comisión:</Text>
              <Text style={styles.summaryValue}>$0.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalLabel}>Total:</Text>
              <Text style={styles.summaryTotalValue}>
                {formatCurrency(parseFloat(amount))}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={styles.depositButton} 
          onPress={handleDeposit}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.depositButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.depositButtonText}>Confirmar Depósito</Text>
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
  methodContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  methodButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  methodButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  methodText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginTop: 8,
  },
  methodTextActive: {
    color: '#fff',
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
  summaryContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 16,
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
  depositButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  depositButtonGradient: {
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
  depositButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

