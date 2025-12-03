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

type BiometryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Biometry'
>;

interface Props {
  navigation: BiometryScreenNavigationProp;
}

export const BiometryScreen: React.FC<Props> = ({ navigation }) => {
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleToggle = (value: boolean) => {
    if (value) {
      Alert.alert(
        'Activar Biometría',
        '¿Deseas activar la autenticación biométrica?',
        [
          { text: 'Cancelar', onPress: () => {} },
          {
            text: 'Activar',
            onPress: () => setBiometricEnabled(true),
          },
        ]
      );
    } else {
      setBiometricEnabled(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Biometría</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="fingerprint" size={80} color="#667eea" />
        </View>

        <Text style={styles.title}>Autenticación Biométrica</Text>
        <Text style={styles.subtitle}>
          Usa tu huella dactilar o reconocimiento facial para iniciar sesión de forma rápida y segura
        </Text>

        <View style={styles.section}>
          <View style={styles.settingRow}>
            <View style={styles.settingContent}>
              <Ionicons name="fingerprint-outline" size={24} color="#667eea" />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>Activar Biometría</Text>
                <Text style={styles.settingSubtitle}>
                  Inicia sesión con tu huella o Face ID
                </Text>
              </View>
            </View>
            <Switch
              value={biometricEnabled}
              onValueChange={handleToggle}
              trackColor={{ false: '#e0e0e0', true: '#667eea' }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#667eea" />
          <Text style={styles.infoText}>
            La biometría es una forma segura y conveniente de acceder a tu cuenta. Tus datos biométricos se almacenan de forma segura en tu dispositivo.
          </Text>
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
  iconContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  section: {
    paddingHorizontal: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    lineHeight: 20,
  },
});

