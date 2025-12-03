import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { formatCurrency } from '../utils/format';

type InsuranceScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Insurance'
>;

interface Props {
  navigation: InsuranceScreenNavigationProp;
}

interface Policy {
  id: string;
  type: 'life' | 'health' | 'vehicle' | 'home';
  name: string;
  premium: number;
  coverage: number;
  nextPayment: Date;
  status: 'active' | 'expired' | 'pending';
}

const mockPolicies: Policy[] = [
  {
    id: '1',
    type: 'life',
    name: 'Seguro de Vida',
    premium: 45.50,
    coverage: 50000,
    nextPayment: new Date('2025-12-20'),
    status: 'active',
  },
  {
    id: '2',
    type: 'vehicle',
    name: 'Seguro Vehicular',
    premium: 85.00,
    coverage: 25000,
    nextPayment: new Date('2026-01-15'),
    status: 'active',
  },
  {
    id: '3',
    type: 'health',
    name: 'Seguro de Salud',
    premium: 120.00,
    coverage: 100000,
    nextPayment: new Date('2025-12-10'),
    status: 'active',
  },
];

export const InsuranceScreen: React.FC<Props> = ({ navigation }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'life':
        return 'heart';
      case 'health':
        return 'medical';
      case 'vehicle':
        return 'car';
      case 'home':
        return 'home';
      default:
        return 'shield';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'life':
        return '#FF6B6B';
      case 'health':
        return '#4CAF50';
      case 'vehicle':
        return '#2196F3';
      case 'home':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  const totalCoverage = mockPolicies.reduce((sum, pol) => sum + pol.coverage, 0);
  const monthlyPremium = mockPolicies.reduce((sum, pol) => sum + pol.premium, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguros</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={28} color="#667eea" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Ionicons name="shield-checkmark-outline" size={32} color="#667eea" />
            <Text style={styles.summaryLabel}>Cobertura Total</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalCoverage)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="calendar-outline" size={32} color="#4CAF50" />
            <Text style={styles.summaryLabel}>Prima Mensual</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(monthlyPremium)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Pólizas</Text>
          {mockPolicies.map((policy) => (
            <TouchableOpacity
              key={policy.id}
              style={styles.policyCard}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[getColor(policy.type), getColor(policy.type) + '80']}
                style={styles.policyGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.policyHeader}>
                  <View style={styles.policyIconContainer}>
                    <Ionicons
                      name={getIcon(policy.type) as any}
                      size={28}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.policyHeaderText}>
                    <Text style={styles.policyName}>{policy.name}</Text>
                    <View style={styles.statusContainer}>
                      <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>
                          {policy.status === 'active' ? 'Activa' : 'Expirada'}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.policyDetails}>
                  <View style={styles.policyDetailRow}>
                    <Text style={styles.policyDetailLabel}>Cobertura:</Text>
                    <Text style={styles.policyDetailValue}>
                      {formatCurrency(policy.coverage)}
                    </Text>
                  </View>
                  <View style={styles.policyDetailRow}>
                    <Text style={styles.policyDetailLabel}>Prima mensual:</Text>
                    <Text style={styles.policyDetailValue}>
                      {formatCurrency(policy.premium)}
                    </Text>
                  </View>
                  <View style={styles.policyDetailRow}>
                    <Text style={styles.policyDetailLabel}>Próximo pago:</Text>
                    <Text style={styles.policyDetailValue}>
                      {policy.nextPayment.toLocaleDateString('es-EC')}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones</Text>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Ionicons name="add-circle" size={24} color="#667eea" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Contratar Seguro</Text>
              <Text style={styles.optionSubtitle}>Explora nuestras opciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
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
  addButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  policyCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  policyGradient: {
    padding: 20,
  },
  policyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  policyIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  policyHeaderText: {
    flex: 1,
  },
  policyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
  },
  statusBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  policyDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
  },
  policyDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  policyDetailLabel: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  policyDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 13,
    color: '#999',
  },
});

