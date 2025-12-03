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
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/format';

type LoanDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LoanDetails'
>;
type LoanDetailsScreenRouteProp = RouteProp<RootStackParamList, 'LoanDetails'>;

interface Props {
  navigation: LoanDetailsScreenNavigationProp;
  route: LoanDetailsScreenRouteProp;
}

export const LoanDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { loans } = useAuth();
  const loan = loans.find((l) => l.id === route.params.loanId);

  if (!loan) {
    return (
      <View style={styles.container}>
        <Text>Préstamo no encontrado</Text>
      </View>
    );
  }

  const progress = ((loan.amount - loan.remainingBalance) / loan.amount) * 100;

  const getLoanIcon = (type: string) => {
    switch (type) {
      case 'Hipotecario':
        return 'home';
      case 'Vehicular':
        return 'car';
      case 'Personal':
        return 'person';
      case 'Microcrédito':
        return 'briefcase';
      default:
        return 'cash';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles del Préstamo</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.loanCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.loanGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.loanHeader}>
              <View style={styles.loanIconContainer}>
                <Ionicons
                  name={getLoanIcon(loan.type) as any}
                  size={32}
                  color="#fff"
                />
              </View>
              <View style={styles.loanHeaderText}>
                <Text style={styles.loanType}>{loan.type}</Text>
                <Text style={styles.loanAmount}>{formatCurrency(loan.amount)}</Text>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>{progress.toFixed(1)}% pagado</Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información del Préstamo</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Monto original:</Text>
              <Text style={styles.infoValue}>{formatCurrency(loan.amount)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Saldo pendiente:</Text>
              <Text style={styles.infoValue}>
                {formatCurrency(loan.remainingBalance)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Cuota mensual:</Text>
              <Text style={styles.infoValue}>
                {formatCurrency(loan.monthlyPayment)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tasa de interés:</Text>
              <Text style={styles.infoValue}>{loan.interestRate}%</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Próximo pago:</Text>
              <Text style={styles.infoValue}>
                {formatDate(loan.nextPaymentDate)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('PayLoan', { loanId: loan.id })}
          >
            <Ionicons name="cash" size={24} color="#667eea" />
            <Text style={styles.actionText}>Pagar Cuota</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('AmortizationTable', { loanId: loan.id })}
          >
            <Ionicons name="document-text" size={24} color="#667eea" />
            <Text style={styles.actionText}>Tabla de Amortización</Text>
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
  content: {
    flex: 1,
  },
  loanCard: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loanGradient: {
    padding: 20,
  },
  loanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  loanIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  loanHeaderText: {
    flex: 1,
  },
  loanType: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  loanAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressContainer: {
    marginTop: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
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
  infoCard: {
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
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  actionButton: {
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
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 16,
  },
});

