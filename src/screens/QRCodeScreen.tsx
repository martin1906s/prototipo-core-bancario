import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { formatCurrency } from '../utils/format';

type QRCodeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'QRCode'>;

interface Props {
  navigation: QRCodeScreenNavigationProp;
}

export const QRCodeScreen: React.FC<Props> = ({ navigation }) => {
  const { user, accounts } = useAuth();
  const [selectedAccountId, setSelectedAccountId] = useState(accounts[0]?.id);
  const [amount, setAmount] = useState('');

  const selectedAccount = accounts.find((acc) => acc.id === selectedAccountId);

  const generateQR = () => {
    // El monto es opcional, así que no validamos si está vacío
    const qrAmount = amount && parseFloat(amount) > 0 ? parseFloat(amount) : null;
    
    Alert.alert(
      'Código QR Generado',
      qrAmount
        ? `Tu código QR está listo para recibir ${formatCurrency(qrAmount)}`
        : 'Tu código QR está listo para recibir pagos',
      [
        {
          text: 'Compartir',
          onPress: () => {
            // Aquí se podría implementar la funcionalidad de compartir
            Alert.alert('Éxito', 'Código QR compartido');
          },
        },
        { text: 'OK' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Código QR</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.qrContainer}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.qrGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.qrCode}>
              <Ionicons name="qr-code" size={120} color="#fff" />
            </View>
            <Text style={styles.qrText}>Código QR de Pago</Text>
            <Text style={styles.qrSubtext}>
              Escanea este código para recibir pagos
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cuenta para recibir</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {accounts.map((account) => (
              <TouchableOpacity
                key={account.id}
                onPress={() => setSelectedAccountId(account.id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={
                    selectedAccountId === account.id
                      ? ['#667eea', '#764ba2']
                      : ['#e0e0e0', '#bdbdbd']
                  }
                  style={styles.accountCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.accountType}>{account.accountType}</Text>
                  <Text style={styles.accountBalance}>
                    {formatCurrency(account.balance)}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Monto a recibir (opcional)</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={generateQR}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.shareButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="share-outline" size={20} color="#fff" />
            <Text style={styles.shareButtonText}>Compartir Código QR</Text>
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
  qrContainer: {
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  qrGradient: {
    padding: 40,
    alignItems: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  qrText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  qrSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
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
  accountCard: {
    width: 150,
    height: 100,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  accountType: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  accountBalance: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  amountContainer: {
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
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  shareButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  shareButtonGradient: {
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
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

