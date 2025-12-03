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

type InvestmentsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Investments'
>;

interface Props {
  navigation: InvestmentsScreenNavigationProp;
}

interface Investment {
  id: string;
  name: string;
  type: 'fixed' | 'variable' | 'savings';
  amount: number;
  returnRate: number;
  maturityDate: Date;
}

const mockInvestments: Investment[] = [
  {
    id: '1',
    name: 'Depósito a Plazo Fijo',
    type: 'fixed',
    amount: 5000,
    returnRate: 6.5,
    maturityDate: new Date('2026-06-15'),
  },
  {
    id: '2',
    name: 'Fondo de Inversión',
    type: 'variable',
    amount: 3000,
    returnRate: 8.2,
    maturityDate: new Date('2026-12-20'),
  },
];

export const InvestmentsScreen: React.FC<Props> = ({ navigation }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'fixed':
        return 'lock-closed';
      case 'variable':
        return 'trending-up';
      case 'savings':
        return 'wallet';
      default:
        return 'cash';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'fixed':
        return '#4CAF50';
      case 'variable':
        return '#2196F3';
      case 'savings':
        return '#FF9800';
      default:
        return '#666';
    }
  };

  const totalInvested = mockInvestments.reduce((sum, inv) => sum + inv.amount, 0);
  const estimatedReturn = mockInvestments.reduce(
    (sum, inv) => sum + (inv.amount * inv.returnRate) / 100,
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inversiones</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={28} color="#667eea" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Ionicons name="wallet-outline" size={32} color="#667eea" />
            <Text style={styles.summaryLabel}>Total Invertido</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(totalInvested)}</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="trending-up-outline" size={32} color="#4CAF50" />
            <Text style={styles.summaryLabel}>Rendimiento Estimado</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(estimatedReturn)}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mis Inversiones</Text>
          {mockInvestments.map((investment) => (
            <TouchableOpacity
              key={investment.id}
              style={styles.investmentCard}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[getColor(investment.type), getColor(investment.type) + '80']}
                style={styles.investmentGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.investmentHeader}>
                  <View style={styles.investmentIconContainer}>
                    <Ionicons
                      name={getIcon(investment.type) as any}
                      size={28}
                      color="#fff"
                    />
                  </View>
                  <View style={styles.investmentHeaderText}>
                    <Text style={styles.investmentName}>{investment.name}</Text>
                    <Text style={styles.investmentType}>
                      {investment.type === 'fixed'
                        ? 'Plazo Fijo'
                        : investment.type === 'variable'
                        ? 'Variable'
                        : 'Ahorro'}
                    </Text>
                  </View>
                </View>

                <View style={styles.investmentDetails}>
                  <View style={styles.investmentDetailRow}>
                    <Text style={styles.investmentDetailLabel}>Monto:</Text>
                    <Text style={styles.investmentDetailValue}>
                      {formatCurrency(investment.amount)}
                    </Text>
                  </View>
                  <View style={styles.investmentDetailRow}>
                    <Text style={styles.investmentDetailLabel}>Tasa de retorno:</Text>
                    <Text style={styles.investmentDetailValue}>
                      {investment.returnRate}%
                    </Text>
                  </View>
                  <View style={styles.investmentDetailRow}>
                    <Text style={styles.investmentDetailLabel}>Vencimiento:</Text>
                    <Text style={styles.investmentDetailValue}>
                      {investment.maturityDate.toLocaleDateString('es-EC')}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones de Inversión</Text>
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.optionIconContainer}>
              <Ionicons name="add-circle" size={24} color="#667eea" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Nueva Inversión</Text>
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
  investmentCard: {
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
  investmentGradient: {
    padding: 20,
  },
  investmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  investmentIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  investmentHeaderText: {
    flex: 1,
  },
  investmentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  investmentType: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  investmentDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
  },
  investmentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  investmentDetailLabel: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  investmentDetailValue: {
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

