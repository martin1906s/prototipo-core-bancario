import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type SecurityScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Security'
>;

interface Props {
  navigation: SecurityScreenNavigationProp;
}

export const SecurityScreen: React.FC<Props> = ({ navigation }) => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [transactionAlerts, setTransactionAlerts] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Seguridad</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Autenticación</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Autenticación de dos factores</Text>
                <Text style={styles.settingSubtitle}>
                  Añade una capa extra de seguridad
                </Text>
              </View>
            </View>
            <Switch
              value={twoFactorEnabled}
              onValueChange={setTwoFactorEnabled}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Alertas</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="notifications-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Alertas de inicio de sesión</Text>
                <Text style={styles.settingSubtitle}>
                  Recibe notificaciones cuando inicies sesión
                </Text>
              </View>
            </View>
            <Switch
              value={loginAlerts}
              onValueChange={setLoginAlerts}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </View>

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="card-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Alertas de transacciones</Text>
                <Text style={styles.settingSubtitle}>
                  Recibe notificaciones de tus transacciones
                </Text>
              </View>
            </View>
            <Switch
              value={transactionAlerts}
              onValueChange={setTransactionAlerts}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dispositivos</Text>
          <TouchableOpacity
            style={styles.deviceButton}
            onPress={() => navigation.navigate('Devices')}
          >
            <Ionicons name="phone-portrait-outline" size={24} color="#667eea" />
            <View style={styles.deviceContent}>
              <Text style={styles.deviceTitle}>Gestionar dispositivos</Text>
              <Text style={styles.deviceSubtitle}>Ver y eliminar dispositivos conectados</Text>
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
  content: {
    flex: 1,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  deviceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceContent: {
    flex: 1,
    marginLeft: 16,
  },
  deviceTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deviceSubtitle: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
});

