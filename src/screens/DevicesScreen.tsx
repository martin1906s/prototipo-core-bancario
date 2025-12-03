import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type DevicesScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: DevicesScreenNavigationProp;
}

interface Device {
  id: string;
  name: string;
  type: 'phone' | 'tablet' | 'desktop';
  lastActive: string;
  isCurrent: boolean;
}

const devices: Device[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    type: 'phone',
    lastActive: 'Hace 2 horas',
    isCurrent: true,
  },
  {
    id: '2',
    name: 'iPad Air',
    type: 'tablet',
    lastActive: 'Hace 3 días',
    isCurrent: false,
  },
  {
    id: '3',
    name: 'Samsung Galaxy S23',
    type: 'phone',
    lastActive: 'Hace 1 semana',
    isCurrent: false,
  },
];

export const DevicesScreen: React.FC<Props> = ({ navigation }) => {
  const [deviceList, setDeviceList] = useState(devices);

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'phone':
        return 'phone-portrait';
      case 'tablet':
        return 'tablet-portrait';
      case 'desktop':
        return 'desktop';
      default:
        return 'phone-portrait';
    }
  };

  const handleRemoveDevice = (deviceId: string) => {
    Alert.alert(
      'Eliminar Dispositivo',
      '¿Estás seguro que deseas eliminar este dispositivo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            setDeviceList(deviceList.filter((d) => d.id !== deviceId));
            Alert.alert('Éxito', 'Dispositivo eliminado correctamente');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dispositivos Conectados</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.infoCard}>
          <Ionicons name="information-circle" size={24} color="#667eea" />
          <Text style={styles.infoText}>
            Gestiona los dispositivos que tienen acceso a tu cuenta. Puedes eliminar dispositivos que ya no uses.
          </Text>
        </View>

        {deviceList.map((device) => (
          <View key={device.id} style={styles.deviceCard}>
            <View style={styles.deviceHeader}>
              <View style={styles.deviceIconContainer}>
                <Ionicons name={getDeviceIcon(device.type) as any} size={28} color="#667eea" />
              </View>
              <View style={styles.deviceInfo}>
                <View style={styles.deviceTitleRow}>
                  <Text style={styles.deviceName}>{device.name}</Text>
                  {device.isCurrent && (
                    <View style={styles.currentBadge}>
                      <Text style={styles.currentBadgeText}>Actual</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.deviceLastActive}>Última actividad: {device.lastActive}</Text>
              </View>
            </View>
            {!device.isCurrent && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveDevice(device.id)}
              >
                <Ionicons name="trash-outline" size={18} color="#FF6B6B" />
                <Text style={styles.removeButtonText}>Eliminar</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
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
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#1976D2',
    marginLeft: 12,
    lineHeight: 18,
  },
  deviceCard: {
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
  deviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  deviceName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  currentBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  currentBadgeText: {
    fontSize: 10,
    color: '#4CAF50',
    fontWeight: '600',
  },
  deviceLastActive: {
    fontSize: 13,
    color: '#999',
  },
  removeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  removeButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '600',
    marginLeft: 4,
  },
});

