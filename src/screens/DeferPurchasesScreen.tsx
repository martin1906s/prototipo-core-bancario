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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/format';

type DeferPurchasesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'DeferPurchases'
>;
type DeferPurchasesScreenRouteProp = RouteProp<RootStackParamList, 'DeferPurchases'>;

interface Props {
  navigation: DeferPurchasesScreenNavigationProp;
  route: DeferPurchasesScreenRouteProp;
}

const installments = [3, 6, 12, 18, 24];

export const DeferPurchasesScreen: React.FC<Props> = ({ navigation, route }) => {
  const { cards } = useAuth();
  const card = cards.find((c) => c.id === route.params.cardId);
  const [amount, setAmount] = useState('');
  const [selectedInstallments, setSelectedInstallments] = useState(3);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Tarjeta no encontrada</Text>
      </View>
    );
  }

  const calculateMonthlyPayment = () => {
    if (!amount || parseFloat(amount) <= 0) return 0;
    const total = parseFloat(amount);
    const interest = total * 0.02; // 2% interés mensual
    return (total + interest) / selectedInstallments;
  };

  const handleDefer = () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }

    Alert.alert(
      'Solicitud Enviada',
      `Tu solicitud para diferir ${formatCurrency(parseFloat(amount))} en ${selectedInstallments} cuotas ha sido enviada.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setAmount('');
            setSelectedInstallments(3);
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
        <Text style={styles.headerTitle}>Diferir Compras</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Monto a diferir</Text>
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
          <Text style={styles.label}>Número de cuotas</Text>
          <View style={styles.installmentsContainer}>
            {installments.map((inst) => (
              <TouchableOpacity
                key={inst}
                style={[
                  styles.installmentButton,
                  selectedInstallments === inst && styles.installmentButtonActive,
                ]}
                onPress={() => setSelectedInstallments(inst)}
              >
                <Text
                  style={[
                    styles.installmentText,
                    selectedInstallments === inst && styles.installmentTextActive,
                  ]}
                >
                  {inst} meses
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {amount && parseFloat(amount) > 0 && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Resumen</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Monto total:</Text>
              <Text style={styles.summaryValue}>
                {formatCurrency(parseFloat(amount))}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Cuotas:</Text>
              <Text style={styles.summaryValue}>{selectedInstallments}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Cuota mensual:</Text>
              <Text style={[styles.summaryValue, { color: '#667eea' }]}>
                {formatCurrency(calculateMonthlyPayment())}
              </Text>
            </View>
          </View>
        )}

        <TouchableOpacity 
          style={styles.deferButton} 
          onPress={handleDefer}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.deferButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.deferButtonText}>Diferir Compra</Text>
            <Ionicons name="calendar" size={20} color="#fff" />
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
  installmentsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  installmentButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  installmentButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  installmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  installmentTextActive: {
    color: '#fff',
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
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
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
    fontWeight: '600',
    color: '#333',
  },
  deferButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  deferButtonGradient: {
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
  deferButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

