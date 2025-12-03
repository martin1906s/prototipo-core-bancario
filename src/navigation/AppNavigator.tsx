import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { useAuth } from '../context/AuthContext';
import { RootStackParamList, MainTabParamList } from '../types';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { CardsScreen } from '../screens/CardsScreen';
import { LoansScreen } from '../screens/LoansScreen';
import { MoreScreen } from '../screens/MoreScreen';
import { TransferScreen } from '../screens/TransferScreen';
import { PayServicesScreen } from '../screens/PayServicesScreen';
import { TransactionHistoryScreen } from '../screens/TransactionHistoryScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { QRCodeScreen } from '../screens/QRCodeScreen';
import { WithdrawScreen } from '../screens/WithdrawScreen';
import { DepositScreen } from '../screens/DepositScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen';
import { CertificatesScreen } from '../screens/CertificatesScreen';
import { InvestmentsScreen } from '../screens/InvestmentsScreen';
import { InsuranceScreen } from '../screens/InsuranceScreen';
import { LocationsScreen } from '../screens/LocationsScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { HelpScreen } from '../screens/HelpScreen';
import { CardDetailsScreen } from '../screens/CardDetailsScreen';
import { BlockCardScreen } from '../screens/BlockCardScreen';
import { CardStatementScreen } from '../screens/CardStatementScreen';
import { IncreaseLimitScreen } from '../screens/IncreaseLimitScreen';
import { DeferPurchasesScreen } from '../screens/DeferPurchasesScreen';
import { PayLoanScreen } from '../screens/PayLoanScreen';
import { RequestLoanScreen } from '../screens/RequestLoanScreen';
import { LoanSimulatorScreen } from '../screens/LoanSimulatorScreen';
import { AmortizationTableScreen } from '../screens/AmortizationTableScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ChangePasswordScreen } from '../screens/ChangePasswordScreen';
import { SecurityScreen } from '../screens/SecurityScreen';
import { BiometryScreen } from '../screens/BiometryScreen';
import { ContactSupportScreen } from '../screens/ContactSupportScreen';
import { TermsScreen } from '../screens/TermsScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen';
import { AllAccountsScreen } from '../screens/AllAccountsScreen';
import { LoanDetailsScreen } from '../screens/LoanDetailsScreen';
import { RequestCardScreen } from '../screens/RequestCardScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { DevicesScreen } from '../screens/DevicesScreen';
import { TransactionDetailsScreen } from '../screens/TransactionDetailsScreen';
import { RequestCertificateScreen } from '../screens/RequestCertificateScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  const screenOptions = React.useMemo(() => ({
    headerShown: false,
    tabBarStyle: styles.tabBar,
    tabBarActiveTintColor: '#667eea',
    tabBarInactiveTintColor: '#999',
    tabBarShowLabel: true,
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: '600' as const,
      marginBottom: 4,
    },
  }), []);

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size, focused }) => {
            const isFocused = Boolean(focused);
            return (
              <View style={isFocused ? styles.activeIconContainer : undefined}>
                <Ionicons
                  name={isFocused ? 'home' : 'home-outline'}
                  size={size}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Cards"
        component={CardsScreen}
        options={{
          tabBarLabel: 'Tarjetas',
          tabBarIcon: ({ color, size, focused }) => {
            const isFocused = Boolean(focused);
            return (
              <View style={isFocused ? styles.activeIconContainer : undefined}>
                <Ionicons
                  name={isFocused ? 'card' : 'card-outline'}
                  size={size}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Loans"
        component={LoansScreen}
        options={{
          tabBarLabel: 'Préstamos',
          tabBarIcon: ({ color, size, focused }) => {
            const isFocused = Boolean(focused);
            return (
              <View style={isFocused ? styles.activeIconContainer : undefined}>
                <Ionicons
                  name={isFocused ? 'cash' : 'cash-outline'}
                  size={size}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="More"
        component={MoreScreen}
        options={{
          tabBarLabel: 'Más',
          tabBarIcon: ({ color, size, focused }) => {
            const isFocused = Boolean(focused);
            return (
              <View style={isFocused ? styles.activeIconContainer : undefined}>
                <Ionicons
                  name={isFocused ? 'grid' : 'grid-outline'}
                  size={size}
                  color={color}
                />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  const { user } = useAuth();

  const stackScreenOptions = React.useMemo(() => ({
    headerShown: false,
    animation: 'slide_from_right' as const,
  }), []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={stackScreenOptions}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Transfer" component={TransferScreen} />
            <Stack.Screen name="PayServices" component={PayServicesScreen} />
            <Stack.Screen name="TransactionHistory" component={TransactionHistoryScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="QRCode" component={QRCodeScreen} />
            <Stack.Screen name="Withdraw" component={WithdrawScreen} />
            <Stack.Screen name="Deposit" component={DepositScreen} />
            <Stack.Screen name="Notifications" component={NotificationsScreen} />
            <Stack.Screen name="Certificates" component={CertificatesScreen} />
            <Stack.Screen name="Investments" component={InvestmentsScreen} />
            <Stack.Screen name="Insurance" component={InsuranceScreen} />
            <Stack.Screen name="Locations" component={LocationsScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
            <Stack.Screen name="Help" component={HelpScreen} />
            <Stack.Screen name="CardDetails" component={CardDetailsScreen} />
            <Stack.Screen name="BlockCard" component={BlockCardScreen} />
            <Stack.Screen name="CardStatement" component={CardStatementScreen} />
            <Stack.Screen name="IncreaseLimit" component={IncreaseLimitScreen} />
            <Stack.Screen name="DeferPurchases" component={DeferPurchasesScreen} />
            <Stack.Screen name="PayLoan" component={PayLoanScreen} />
            <Stack.Screen name="RequestLoan" component={RequestLoanScreen} />
            <Stack.Screen name="LoanSimulator" component={LoanSimulatorScreen} />
            <Stack.Screen name="AmortizationTable" component={AmortizationTableScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
            <Stack.Screen name="Security" component={SecurityScreen} />
            <Stack.Screen name="Biometry" component={BiometryScreen} />
            <Stack.Screen name="ContactSupport" component={ContactSupportScreen} />
            <Stack.Screen name="Terms" component={TermsScreen} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} />
            <Stack.Screen name="AllAccounts" component={AllAccountsScreen} />
            <Stack.Screen name="LoanDetails" component={LoanDetailsScreen} />
            <Stack.Screen name="RequestCard" component={RequestCardScreen} />
            <Stack.Screen name="Contacts" component={ContactsScreen} />
            <Stack.Screen name="Devices" component={DevicesScreen} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
            <Stack.Screen name="RequestCertificate" component={RequestCertificateScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  activeIconContainer: {
    backgroundColor: '#667eea20',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
});

