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

type IncreaseLimitScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'IncreaseLimit'
>;
type IncreaseLimitScreenRouteProp = RouteProp<RootStackParamList, 'IncreaseLimit'>;

interface Props {
  navigation: IncreaseLimitScreenNavigationProp;
  route: IncreaseLimitScreenRouteProp;
}

export const IncreaseLimitScreen: React.FC<Props> = ({ navigation, route }) => {
  const { cards } = useAuth();
  const card = cards.find((c) => c.id === route.params.cardId);
  const [requestedAmount, setRequestedAmount] = useState('');

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Tarjeta no encontrada</Text>
      </View>
    );
  }

  const handleRequest = () => {
    if (!requestedAmount || parseFloat(requestedAmount) <= 0) {
      Alert.alert('Error', 'Ingresa un monto válido');
      return;
    }

    Alert.alert(
      'Solicitud Enviada',
      'Tu solicitud de aumento de límite ha sido enviada. Te notificaremos el resultado en 24-48 horas.',
      [
        {
          text: 'OK',
          onPress: () => {
            setRequestedAmount('');
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
        <Text style={styles.headerTitle}>Aumentar Límite</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Límite Actual</Text>
          <Text style={styles.infoAmount}>{formatCurrency(card.creditLimit)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Nuevo límite solicitado</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={requestedAmount}
              onChangeText={setRequestedAmount}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requisitos</Text>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.requirementText}>
              Historial de pagos puntuales
            </Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.requirementText}>
              Ingresos verificables
            </Text>
          </View>
          <View style={styles.requirementItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.requirementText}>
              Antigüedad mínima de 6 meses
            </Text>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.requestButton} 
          onPress={handleRequest}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.requestButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.requestButtonText}>Solicitar Aumento</Text>
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
  infoCard: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  infoAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#667eea',
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requirementText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  requestButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  requestButtonGradient: {
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
  requestButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
});

