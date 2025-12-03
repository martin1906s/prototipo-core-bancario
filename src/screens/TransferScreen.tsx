import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Transaction } from '../types';
import { formatCurrency } from '../utils/format';

type TransferScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Transfer'>;

interface Props {
  navigation: TransferScreenNavigationProp;
}

export const TransferScreen: React.FC<Props> = ({ navigation }) => {
  const { accounts, addTransaction } = useAuth();
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id);
  const [destinationAccount, setDestinationAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  const handleTransfer = () => {
    if (!destinationAccount || !amount || !description) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }

    if (selectedAccount && transferAmount > selectedAccount.balance) {
      Alert.alert('Error', 'Saldo insuficiente');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'Transferencia',
      amount: -transferAmount,
      date: new Date(),
      description: description,
      status: 'Completada',
      from: selectedAccount?.accountNumber,
      to: destinationAccount,
    };

    addTransaction(newTransaction);

    Alert.alert(
      'Transferencia Exitosa',
      `Has transferido ${formatCurrency(transferAmount)} exitosamente`,
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Transferir</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Seleccionar Cuenta Origen */}
        <View style={styles.section}>
          <Text style={styles.label}>Desde mi cuenta</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
                  <Text style={styles.accountNumber}>{account.accountNumber}</Text>
                  <Text style={styles.accountBalance}>
                    {formatCurrency(account.balance)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Cuenta Destino */}
        <View style={styles.section}>
          <Text style={styles.label}>Cuenta destino</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#667eea" />
            <TextInput
              style={styles.input}
              placeholder="Número de cuenta"
              value={destinationAccount}
              onChangeText={setDestinationAccount}
              keyboardType="numeric"
              maxLength={10}
            />
          </View>
          <TouchableOpacity style={styles.contactsButton}>
            <Ionicons name="people-outline" size={20} color="#667eea" />
            <Text style={styles.contactsButtonText}>Seleccionar de contactos</Text>
          </TouchableOpacity>
        </View>

        {/* Monto */}
        <View style={styles.section}>
          <Text style={styles.label}>Monto a transferir</Text>
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

        {/* Descripción */}
        <View style={styles.section}>
          <Text style={styles.label}>Descripción</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="document-text-outline" size={20} color="#667eea" />
            <TextInput
              style={styles.input}
              placeholder="Ej: Pago de renta"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        {/* Resumen */}
        {amount && parseFloat(amount) > 0 && (
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Monto a transferir:</Text>
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

        {/* Botón Transferir */}
        <TouchableOpacity style={styles.transferButton} onPress={handleTransfer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.transferButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.transferButtonText}>Realizar Transferencia</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
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
    width: 180,
    height: 120,
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
  accountNumber: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
  },
  accountBalance: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  contactsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 12,
  },
  contactsButtonText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 8,
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
  transferButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  transferButtonGradient: {
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
  transferButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

