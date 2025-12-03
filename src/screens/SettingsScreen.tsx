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

type SettingsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Settings'
>;

interface Props {
  navigation: SettingsScreenNavigationProp;
}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoLock, setAutoLock] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configuración</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="notifications-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Notificaciones Push</Text>
                <Text style={styles.settingSubtitle}>
                  Recibe alertas y actualizaciones
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('Biometry')}
          >
            <View style={styles.settingContent}>
              <Ionicons name="fingerprint-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Autenticación Biométrica</Text>
                <Text style={styles.settingSubtitle}>
                  Usa tu huella o Face ID
                </Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={setBiometricEnabled}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="lock-closed-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Bloqueo Automático</Text>
                <Text style={styles.settingSubtitle}>
                  Bloquea la app después de 5 min
                </Text>
              </View>
            </View>
            <Switch
              value={autoLock}
              onValueChange={setAutoLock}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apariencia</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="moon-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Modo Oscuro</Text>
                <Text style={styles.settingSubtitle}>
                  Cambia el tema de la aplicación
                </Text>
              </View>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cuenta</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <View style={styles.settingContent}>
              <Ionicons name="key-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Cambiar Contraseña</Text>
                <Text style={styles.settingSubtitle}>
                  Actualiza tu contraseña
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('Security')}
          >
            <View style={styles.settingContent}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Seguridad</Text>
                <Text style={styles.settingSubtitle}>
                  Configuración de seguridad
                </Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('Terms')}
          >
            <View style={styles.settingContent}>
              <Ionicons name="document-text-outline" size={24} color="#667eea" />
              <Text style={styles.settingTitle}>Términos y Condiciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingRow}
            onPress={() => navigation.navigate('Privacy')}
          >
            <View style={styles.settingContent}>
              <Ionicons name="shield-outline" size={24} color="#667eea" />
              <Text style={styles.settingTitle}>Política de Privacidad</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="information-circle-outline" size={24} color="#667eea" />
              <Text style={styles.settingTitle}>Versión</Text>
            </View>
            <Text style={styles.versionText}>1.0.0</Text>
          </View>
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
  versionText: {
    fontSize: 14,
    color: '#999',
  },
});

