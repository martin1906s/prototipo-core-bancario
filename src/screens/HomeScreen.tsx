import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { AccountCard } from '../components/AccountCard';
import { QuickActionButton } from '../components/QuickActionButton';
import { TransactionItem } from '../components/TransactionItem';
import { formatCurrency } from '../utils/format';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, accounts, transactions } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);
  const recentTransactions = transactions.slice(0, 5);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>¡Hola!</Text>
            <Text style={styles.userName}>{user?.name?.split(' ')[0] || 'Usuario'}</Text>
          </View>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Ionicons name="notifications-outline" size={24} color="#fff" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={Boolean(refreshing)} onRefresh={onRefresh} />
        }
      >
        {/* Balance Total */}
        <View style={styles.totalBalanceContainer}>
          <Text style={styles.totalBalanceLabel}>Balance Total</Text>
          <Text style={styles.totalBalance}>{formatCurrency(totalBalance)}</Text>
          <View style={styles.balanceBadge}>
            <Ionicons name="trending-up" size={16} color="#4CAF50" />
            <Text style={styles.balanceBadgeText}>Disponible</Text>
          </View>
        </View>

        {/* Cuentas */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Mis Cuentas</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AllAccounts')}>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {accounts.map((account) => (
              <AccountCard
                key={account.id}
                account={account}
                onPress={() => navigation.navigate('AllAccounts')}
              />
            ))}
          </ScrollView>
        </View>

        {/* Acciones Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActions}
          >
            <QuickActionButton
              icon="swap-horizontal"
              label="Transferir"
              onPress={() => navigation.navigate('Transfer')}
              gradientColors={['#667eea', '#764ba2']}
            />
            <QuickActionButton
              icon="card"
              label="Pagar"
              onPress={() => navigation.navigate('PayServices')}
              gradientColors={['#f093fb', '#f5576c']}
            />
            <QuickActionButton
              icon="qr-code"
              label="QR"
              onPress={() => navigation.navigate('QRCode')}
              gradientColors={['#4facfe', '#00f2fe']}
            />
            <QuickActionButton
              icon="cash"
              label="Retiro"
              onPress={() => navigation.navigate('Withdraw')}
              gradientColors={['#43e97b', '#38f9d7']}
            />
            <QuickActionButton
              icon="download"
              label="Depósito"
              onPress={() => navigation.navigate('Deposit')}
              gradientColors={['#fa709a', '#fee140']}
            />
          </ScrollView>
        </View>

        {/* Transacciones Recientes */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Transacciones Recientes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('TransactionHistory')}>
              <Text style={styles.seeAll}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          {recentTransactions.map((transaction) => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction}
              onPress={() => navigation.navigate('TransactionDetails', { transaction })}
            />
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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
  notificationButton: {
    position: 'relative',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B6B',
    borderWidth: 2,
    borderColor: '#764ba2',
  },
  totalBalanceContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: -15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  totalBalanceLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  totalBalance: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#E8F5E9',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  balanceBadgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
    marginLeft: 6,
  },
  section: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  seeAll: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  quickActions: {
    paddingHorizontal: 20,
    gap: 16,
  },
});

