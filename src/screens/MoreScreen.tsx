import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type MoreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Props {
  navigation: MoreScreenNavigationProp;
}

export const MoreScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();

  const menuItems = [
    {
      id: '1',
      title: 'Mi Perfil',
      subtitle: 'Ver y editar información',
      icon: 'person',
      color: '#667eea',
      onPress: () => navigation.navigate('Profile'),
    },
    {
      id: '2',
      title: 'Historial de Transacciones',
      subtitle: 'Ver todas tus transacciones',
      icon: 'time',
      color: '#f093fb',
      onPress: () => navigation.navigate('TransactionHistory'),
    },
    {
      id: '3',
      title: 'Certificados',
      subtitle: 'Descargar documentos',
      icon: 'document-text',
      color: '#4facfe',
      onPress: () => {},
    },
    {
      id: '4',
      title: 'Inversiones',
      subtitle: 'Gestiona tus inversiones',
      icon: 'trending-up',
      color: '#43e97b',
      onPress: () => {},
    },
    {
      id: '5',
      title: 'Seguros',
      subtitle: 'Tus pólizas y coberturas',
      icon: 'shield-checkmark',
      color: '#fa709a',
      onPress: () => {},
    },
    {
      id: '6',
      title: 'Ubicaciones',
      subtitle: 'Sucursales y cajeros',
      icon: 'location',
      color: '#667eea',
      onPress: () => {},
    },
    {
      id: '7',
      title: 'Configuración',
      subtitle: 'Ajustes de la aplicación',
      icon: 'settings',
      color: '#764ba2',
      onPress: () => {},
    },
    {
      id: '8',
      title: 'Ayuda y Soporte',
      subtitle: 'Contacta con nosotros',
      icon: 'help-circle',
      color: '#f5576c',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Más Opciones</Text>
        <Text style={styles.headerSubtitle}>Hola, {user?.name?.split(' ')[0]}</Text>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {/* Grid de opciones */}
        <View style={styles.menuGrid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuCard}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconContainer, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={32} color={item.color} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Información adicional */}
        <View style={styles.infoCard}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.infoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="information-circle" size={40} color="#fff" />
            <Text style={styles.infoTitle}>¿Necesitas ayuda?</Text>
            <Text style={styles.infoText}>
              Nuestro equipo está disponible 24/7 para asistirte
            </Text>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contactar Ahora</Text>
              <Ionicons name="arrow-forward" size={16} color="#667eea" />
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* Acceso rápido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acceso Rápido</Text>
          
          <TouchableOpacity style={styles.quickAccessButton}>
            <View style={styles.quickAccessIcon}>
              <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
            </View>
            <View style={styles.quickAccessContent}>
              <Text style={styles.quickAccessTitle}>Seguridad</Text>
              <Text style={styles.quickAccessSubtitle}>Tu cuenta está protegida</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Activa</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickAccessButton}>
            <View style={styles.quickAccessIcon}>
              <Ionicons name="notifications" size={20} color="#FF9800" />
            </View>
            <View style={styles.quickAccessContent}>
              <Text style={styles.quickAccessTitle}>Notificaciones</Text>
              <Text style={styles.quickAccessSubtitle}>3 notificaciones nuevas</Text>
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
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  menuCard: {
    width: '46%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: '2%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  infoCard: {
    marginHorizontal: 20,
    marginVertical: 24,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  infoGradient: {
    padding: 24,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 20,
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    marginRight: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  quickAccessButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickAccessContent: {
    flex: 1,
  },
  quickAccessTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  quickAccessSubtitle: {
    fontSize: 13,
    color: '#999',
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});

