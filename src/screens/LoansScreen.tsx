import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatDate } from '../utils/format';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type LoansScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: LoansScreenNavigationProp;
}

export const LoansScreen: React.FC<Props> = ({ navigation }) => {
  const { loans } = useAuth();

  const totalDebt = loans.reduce((sum, loan) => sum + loan.remainingBalance, 0);
  const monthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);

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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Préstamos</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('RequestLoan')}
        >
          <Ionicons name="add-circle-outline" size={28} color="#667eea" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Resumen */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Ionicons name="trending-down-outline" size={32} color="#FF6B6B" />
            <Text style={styles.summaryLabel}>Deuda Total</Text>
            <Text style={[styles.summaryAmount, { color: '#FF6B6B' }]}>
              {formatCurrency(totalDebt)}
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="calendar-outline" size={32} color="#667eea" />
            <Text style={styles.summaryLabel}>Pago Mensual</Text>
            <Text style={styles.summaryAmount}>{formatCurrency(monthlyPayment)}</Text>
          </View>
        </View>

        {/* Préstamos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus Préstamos Activos</Text>
          {loans.map((loan) => {
            const progress = ((loan.amount - loan.remainingBalance) / loan.amount) * 100;
            return (
              <TouchableOpacity
                key={loan.id}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('LoanDetails', { loanId: loan.id })}
              >
                <LinearGradient
                  colors={['#667eea', '#764ba2']}
                  style={styles.loanCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <View style={styles.loanHeader}>
                    <View style={styles.loanIconContainer}>
                      <Ionicons
                        name={getLoanIcon(loan.type) as any}
                        size={28}
                        color="#fff"
                      />
                    </View>
                    <View style={styles.loanHeaderText}>
                      <Text style={styles.loanType}>{loan.type}</Text>
                      <Text style={styles.loanAmount}>
                        {formatCurrency(loan.amount)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.loanDetails}>
                    <View style={styles.loanDetailRow}>
                      <Text style={styles.loanDetailLabel}>Saldo pendiente</Text>
                      <Text style={styles.loanDetailValue}>
                        {formatCurrency(loan.remainingBalance)}
                      </Text>
                    </View>
                    <View style={styles.loanDetailRow}>
                      <Text style={styles.loanDetailLabel}>Cuota mensual</Text>
                      <Text style={styles.loanDetailValue}>
                        {formatCurrency(loan.monthlyPayment)}
                      </Text>
                    </View>
                    <View style={styles.loanDetailRow}>
                      <Text style={styles.loanDetailLabel}>Tasa de interés</Text>
                      <Text style={styles.loanDetailValue}>{loan.interestRate}%</Text>
                    </View>
                    <View style={styles.loanDetailRow}>
                      <Text style={styles.loanDetailLabel}>Próximo pago</Text>
                      <Text style={styles.loanDetailValue}>
                        {formatDate(loan.nextPaymentDate)}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View style={[styles.progressFill, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{progress.toFixed(1)}% pagado</Text>
                  </View>

                  <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => navigation.navigate('PayLoan', { loanId: loan.id })}
                  >
                    <Text style={styles.payButtonText}>Pagar Cuota</Text>
                    <Ionicons name="arrow-forward" size={16} color="#667eea" />
                  </TouchableOpacity>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Opciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Más Opciones</Text>
          
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('RequestLoan')}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="add-circle" size={24} color="#667eea" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Solicitar Préstamo</Text>
              <Text style={styles.optionSubtitle}>Aplica a un nuevo crédito</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('LoanSimulator')}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="calculator" size={24} color="#667eea" />
            </View>
            <View style={styles.optionContent}>
              <Text style={styles.optionTitle}>Simulador</Text>
              <Text style={styles.optionSubtitle}>Calcula tu préstamo</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          {loans.length > 0 && (
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => navigation.navigate('AmortizationTable', { loanId: loans[0].id })}
            >
              <View style={styles.optionIconContainer}>
                <Ionicons name="document-text" size={24} color="#667eea" />
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Tabla de Amortización</Text>
                <Text style={styles.optionSubtitle}>Ver plan de pagos</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </TouchableOpacity>
          )}
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    padding: 4,
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
  loanCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  loanIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  loanHeaderText: {
    flex: 1,
  },
  loanType: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  loanAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  loanDetails: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  loanDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  loanDetailLabel: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.8,
  },
  loanDetailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#fff',
  },
  progressContainer: {
    marginBottom: 16,
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
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  payButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#667eea',
    marginRight: 8,
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

