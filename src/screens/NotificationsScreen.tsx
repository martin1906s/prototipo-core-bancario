import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { formatShortDate } from '../utils/format';

type NotificationsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

interface Props {
  navigation: NotificationsScreenNavigationProp;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  type: 'transaction' | 'security' | 'promotion' | 'info';
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Transferencia recibida',
    message: 'Has recibido $250.00 de María López',
    date: new Date('2025-12-05'),
    type: 'transaction',
    read: false,
  },
  {
    id: '2',
    title: 'Pago realizado',
    message: 'Tu pago de $85.50 a CNT fue exitoso',
    date: new Date('2025-12-04'),
    type: 'transaction',
    read: false,
  },
  {
    id: '3',
    title: 'Nueva oferta disponible',
    message: 'Aprovecha nuestro préstamo personal con tasa preferencial',
    date: new Date('2025-12-03'),
    type: 'promotion',
    read: true,
  },
  {
    id: '4',
    title: 'Inicio de sesión',
    message: 'Se detectó un nuevo inicio de sesión desde un dispositivo',
    date: new Date('2025-12-02'),
    type: 'security',
    read: true,
  },
  {
    id: '5',
    title: 'Recordatorio de pago',
    message: 'Tu próxima cuota de préstamo vence el 15 de diciembre',
    date: new Date('2025-12-01'),
    type: 'info',
    read: true,
  },
];

export const NotificationsScreen: React.FC<Props> = ({ navigation }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'transaction':
        return 'swap-horizontal';
      case 'security':
        return 'shield-checkmark';
      case 'promotion':
        return 'gift';
      case 'info':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'transaction':
        return '#4CAF50';
      case 'security':
        return '#FF9800';
      case 'promotion':
        return '#667eea';
      case 'info':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <TouchableOpacity style={styles.markAllButton}>
          <Text style={styles.markAllText}>Marcar todas</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {mockNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={[
              styles.notificationCard,
              !notification.read && styles.notificationCardUnread,
            ]}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: getColor(notification.type) + '20' },
              ]}
            >
              <Ionicons
                name={getIcon(notification.type) as any}
                size={24}
                color={getColor(notification.type)}
              />
            </View>
            <View style={styles.notificationContent}>
              <View style={styles.notificationHeader}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                {!notification.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationDate}>
                {formatShortDate(notification.date)}
              </Text>
            </View>
          </TouchableOpacity>
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
  markAllButton: {
    padding: 4,
  },
  markAllText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationCardUnread: {
    borderLeftWidth: 4,
    borderLeftColor: '#667eea',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#667eea',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
});

