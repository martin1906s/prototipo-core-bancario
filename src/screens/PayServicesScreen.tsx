import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Service, Transaction } from '../types';
import { formatCurrency } from '../utils/format';

type PayServicesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PayServices'>;

interface Props {
  navigation: PayServicesScreenNavigationProp;
}

const services: Service[] = [
  { id: '1', name: 'CNT', category: 'Teléfono', icon: 'call' },
  { id: '2', name: 'Empresa Eléctrica', category: 'Luz', icon: 'flash' },
  { id: '3', name: 'EMAPA', category: 'Agua', icon: 'water' },
  { id: '4', name: 'Netlife', category: 'Internet', icon: 'wifi' },
  { id: '5', name: 'DirecTV', category: 'TV', icon: 'tv' },
  { id: '6', name: 'Claro', category: 'Teléfono', icon: 'phone-portrait' },
  { id: '7', name: 'Movistar', category: 'Teléfono', icon: 'phone-portrait' },
  { id: '8', name: 'Otros Servicios', category: 'Otros', icon: 'grid' },
];

export const PayServicesScreen: React.FC<Props> = ({ navigation }) => {
  const { accounts, addTransaction } = useAuth();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [referenceNumber, setReferenceNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id);

  const handlePayment = () => {
    if (!selectedService || !referenceNumber || !amount) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const paymentAmount = parseFloat(amount);
    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }

    const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);
    if (selectedAccount && paymentAmount > selectedAccount.balance) {
      Alert.alert('Error', 'Saldo insuficiente');
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: 'Pago',
      amount: -paymentAmount,
      date: new Date(),
      description: `Pago ${selectedService.name}`,
      status: 'Completada',
    };

    addTransaction(newTransaction);

    Alert.alert(
      'Pago Exitoso',
      `Has pagado ${formatCurrency(paymentAmount)} a ${selectedService.name}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedService(null);
            setReferenceNumber('');
            setAmount('');
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (selectedService) {
    const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => setSelectedService(null)}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Pagar {selectedService.name}</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
          {/* Icono del servicio */}
          <View style={styles.serviceIconContainer}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.serviceIconGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name={selectedService.icon as any} size={48} color="#fff" />
            </LinearGradient>
          </View>

          {/* Seleccionar cuenta */}
          <View style={styles.section}>
            <Text style={styles.label}>Pagar desde</Text>
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
                    <Text style={styles.accountBalance}>
                      {formatCurrency(account.balance)}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Número de referencia */}
          <View style={styles.section}>
            <Text style={styles.label}>Número de referencia / Contrato</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="document-text-outline" size={20} color="#667eea" />
              <TextInput
                style={styles.input}
                placeholder="Ingresa el número"
                value={referenceNumber}
                onChangeText={setReferenceNumber}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Monto */}
          <View style={styles.section}>
            <Text style={styles.label}>Monto a pagar</Text>
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

          {/* Resumen */}
          {amount && parseFloat(amount) > 0 && (
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Servicio:</Text>
                <Text style={styles.summaryValue}>{selectedService.name}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Monto:</Text>
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

          {/* Botón Pagar */}
          <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.payButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.payButtonText}>Realizar Pago</Text>
              <Ionicons name="checkmark-circle" size={20} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pagar Servicios</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Text style={styles.selectServiceText}>Selecciona un servicio para pagar</Text>
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => setSelectedService(service)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.serviceIconSmall}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name={service.icon as any} size={32} color="#fff" />
              </LinearGradient>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.serviceCategory}>{service.category}</Text>
            </TouchableOpacity>
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
  selectServiceText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  serviceCard: {
    width: '46%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: '2%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIconSmall: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  serviceCategory: {
    fontSize: 12,
    color: '#999',
  },
  serviceIconContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  serviceIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
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

