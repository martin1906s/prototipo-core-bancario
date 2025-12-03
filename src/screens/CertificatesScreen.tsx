import React from 'react';
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
import { RootStackParamList } from '../types';
import { formatDate } from '../utils/format';

type CertificatesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Certificates'
>;

interface Props {
  navigation: CertificatesScreenNavigationProp;
}

interface Certificate {
  id: string;
  title: string;
  type: 'balance' | 'movements' | 'tax' | 'income';
  date: Date;
  status: 'available' | 'pending';
}

const mockCertificates: Certificate[] = [
  {
    id: '1',
    title: 'Certificado de Saldos',
    type: 'balance',
    date: new Date('2025-12-01'),
    status: 'available',
  },
  {
    id: '2',
    title: 'Certificado de Movimientos',
    type: 'movements',
    date: new Date('2025-11-15'),
    status: 'available',
  },
  {
    id: '3',
    title: 'Certificado de Retención',
    type: 'tax',
    date: new Date('2025-10-30'),
    status: 'available',
  },
  {
    id: '4',
    title: 'Certificado de Ingresos',
    type: 'income',
    date: new Date('2025-09-20'),
    status: 'available',
  },
];

export const CertificatesScreen: React.FC<Props> = ({ navigation }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'balance':
        return 'wallet';
      case 'movements':
        return 'document-text';
      case 'tax':
        return 'receipt';
      case 'income':
        return 'trending-up';
      default:
        return 'document';
    }
  };

  const handleDownload = (certificate: Certificate) => {
    Alert.alert(
      'Descargar Certificado',
      `¿Deseas descargar ${certificate.title}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Descargar',
          onPress: () => {
            Alert.alert('Éxito', 'El certificado se está descargando...');
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
        <Text style={styles.headerTitle}>Certificados</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificados Disponibles</Text>
          {mockCertificates.map((certificate) => (
            <TouchableOpacity
              key={certificate.id}
              style={styles.certificateCard}
              onPress={() => handleDownload(certificate)}
              activeOpacity={0.7}
            >
              <View style={styles.certificateIcon}>
                <Ionicons
                  name={getIcon(certificate.type) as any}
                  size={28}
                  color="#667eea"
                />
              </View>
              <View style={styles.certificateContent}>
                <Text style={styles.certificateTitle}>{certificate.title}</Text>
                <Text style={styles.certificateDate}>
                  Generado el {formatDate(certificate.date)}
                </Text>
                <View style={styles.statusContainer}>
                  <View
                    style={[
                      styles.statusBadge,
                      certificate.status === 'available'
                        ? styles.statusAvailable
                        : styles.statusPending,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        certificate.status === 'available'
                          ? styles.statusTextAvailable
                          : styles.statusTextPending,
                      ]}
                    >
                      {certificate.status === 'available' ? 'Disponible' : 'Pendiente'}
                    </Text>
                  </View>
                </View>
              </View>
              <Ionicons name="download-outline" size={24} color="#667eea" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Solicitar Nuevo Certificado</Text>
          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => navigation.navigate('RequestCertificate')}
          >
            <LinearGradient
              colors={['#667eea', '#764ba2']}
              style={styles.requestButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.requestButtonText}>Solicitar Certificado</Text>
            </LinearGradient>
          </TouchableOpacity>
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
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  certificateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  certificateIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  certificateContent: {
    flex: 1,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  certificateDate: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusAvailable: {
    backgroundColor: '#E8F5E9',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusTextAvailable: {
    color: '#4CAF50',
  },
  statusTextPending: {
    color: '#FF9800',
  },
  requestButton: {
    marginHorizontal: 20,
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
    marginLeft: 8,
  },
});

