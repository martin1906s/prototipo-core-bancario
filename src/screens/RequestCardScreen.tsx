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
import { RootStackParamList } from '../types';

type RequestCardScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: RequestCardScreenNavigationProp;
}

const cardTypes = [
  { id: 'visa', name: 'Visa', icon: 'card' },
  { id: 'mastercard', name: 'Mastercard', icon: 'card' },
];

export const RequestCardScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedCardType, setSelectedCardType] = useState<string | null>(null);
  const [requestedLimit, setRequestedLimit] = useState('');

  const handleRequest = () => {
    if (!selectedCardType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de tarjeta');
      return;
    }

    if (!requestedLimit || parseFloat(requestedLimit) <= 0) {
      Alert.alert('Error', 'Ingresa un límite de crédito válido');
      return;
    }

    Alert.alert(
      'Solicitud Enviada',
      'Tu solicitud de tarjeta de crédito ha sido enviada. Te notificaremos cuando sea aprobada.',
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedCardType(null);
            setRequestedLimit('');
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
        <Text style={styles.headerTitle}>Solicitar Tarjeta</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Tipo de tarjeta</Text>
          <View style={styles.cardTypesContainer}>
            {cardTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.cardTypeButton,
                  selectedCardType === type.id && styles.cardTypeButtonActive,
                ]}
                onPress={() => setSelectedCardType(type.id)}
              >
                <Ionicons
                  name={type.icon as any}
                  size={32}
                  color={selectedCardType === type.id ? '#fff' : '#667eea'}
                />
                <Text
                  style={[
                    styles.cardTypeText,
                    selectedCardType === type.id && styles.cardTypeTextActive,
                  ]}
                >
                  {type.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Límite de crédito solicitado</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              value={requestedLimit}
              onChangeText={setRequestedLimit}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#667eea" />
          <Text style={styles.infoText}>
            Tu solicitud será revisada y te notificaremos el resultado en un plazo de 3-5 días hábiles.
          </Text>
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
            <Text style={styles.requestButtonText}>Enviar Solicitud</Text>
            <Ionicons name="send" size={20} color="#fff" />
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
  cardTypesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  cardTypeButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  cardTypeButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  cardTypeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginTop: 8,
  },
  cardTypeTextActive: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 20,
    height: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#667eea',
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    marginLeft: 12,
    lineHeight: 18,
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

