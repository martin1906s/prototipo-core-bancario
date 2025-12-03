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

type RequestCertificateScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: RequestCertificateScreenNavigationProp;
}

const certificateTypes = [
  { id: 'balance', name: 'Certificado de Saldos', icon: 'wallet' },
  { id: 'movements', name: 'Certificado de Movimientos', icon: 'document-text' },
  { id: 'tax', name: 'Certificado de Retención', icon: 'receipt' },
  { id: 'income', name: 'Certificado de Ingresos', icon: 'trending-up' },
];

export const RequestCertificateScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleRequest = () => {
    if (!selectedType) {
      Alert.alert('Error', 'Por favor selecciona un tipo de certificado');
      return;
    }

    const selectedCert = certificateTypes.find((c) => c.id === selectedType);

    Alert.alert(
      'Solicitud Enviada',
      `Tu solicitud de ${selectedCert?.name} ha sido enviada. Recibirás una notificación cuando esté listo.`,
      [
        {
          text: 'OK',
          onPress: () => {
            setSelectedType(null);
            setStartDate('');
            setEndDate('');
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
        <Text style={styles.headerTitle}>Solicitar Certificado</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.label}>Tipo de certificado</Text>
          {certificateTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.certificateTypeButton,
                selectedType === type.id && styles.certificateTypeButtonActive,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Ionicons
                name={type.icon as any}
                size={24}
                color={selectedType === type.id ? '#fff' : '#667eea'}
              />
              <Text
                style={[
                  styles.certificateTypeText,
                  selectedType === type.id && styles.certificateTypeTextActive,
                ]}
              >
                {type.name}
              </Text>
              {selectedType === type.id && (
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Período (opcional)</Text>
          <View style={styles.dateRow}>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateLabel}>Desde</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
                value={startDate}
                onChangeText={setStartDate}
              />
            </View>
            <View style={styles.dateInputContainer}>
              <Text style={styles.dateLabel}>Hasta</Text>
              <TextInput
                style={styles.dateInput}
                placeholder="DD/MM/YYYY"
                value={endDate}
                onChangeText={setEndDate}
              />
            </View>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#667eea" />
          <Text style={styles.infoText}>
            El certificado será generado y estará disponible para descarga en un plazo de 24-48 horas.
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
  certificateTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  certificateTypeButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  certificateTypeText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 12,
  },
  certificateTypeTextActive: {
    color: '#fff',
  },
  dateRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInputContainer: {
    flex: 1,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  dateInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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

