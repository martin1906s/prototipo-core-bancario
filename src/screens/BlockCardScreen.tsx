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
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useAuth } from '../context/AuthContext';

type BlockCardScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'BlockCard'
>;
type BlockCardScreenRouteProp = RouteProp<RootStackParamList, 'BlockCard'>;

interface Props {
  navigation: BlockCardScreenNavigationProp;
  route: BlockCardScreenRouteProp;
}

export const BlockCardScreen: React.FC<Props> = ({ navigation, route }) => {
  const { cards } = useAuth();
  const card = cards.find((c) => c.id === route.params.cardId);
  const [isBlocked, setIsBlocked] = useState(false);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Tarjeta no encontrada</Text>
      </View>
    );
  }

  const handleBlock = () => {
    Alert.alert(
      'Bloquear Tarjeta',
      '¿Estás seguro que deseas bloquear esta tarjeta? No podrás realizar compras hasta desbloquearla.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Bloquear',
          style: 'destructive',
          onPress: () => {
            setIsBlocked(true);
            Alert.alert('Éxito', 'Tu tarjeta ha sido bloqueada exitosamente');
          },
        },
      ]
    );
  };

  const handleUnblock = () => {
    Alert.alert(
      'Desbloquear Tarjeta',
      '¿Deseas desbloquear esta tarjeta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Desbloquear',
          onPress: () => {
            setIsBlocked(false);
            Alert.alert('Éxito', 'Tu tarjeta ha sido desbloqueada exitosamente');
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
        <Text style={styles.headerTitle}>Bloquear Tarjeta</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusIcon,
              { backgroundColor: isBlocked ? '#FF6B6B20' : '#4CAF5020' },
            ]}
          >
            <Ionicons
              name={isBlocked ? 'lock-closed' : 'lock-open'}
              size={48}
              color={isBlocked ? '#FF6B6B' : '#4CAF50'}
            />
          </View>
          <Text style={styles.statusTitle}>
            {isBlocked ? 'Tarjeta Bloqueada' : 'Tarjeta Activa'}
          </Text>
          <Text style={styles.statusSubtitle}>
            {isBlocked
              ? 'Tu tarjeta está bloqueada y no puede ser usada para compras'
              : 'Tu tarjeta está activa y lista para usar'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Número de tarjeta</Text>
              <Text style={styles.infoValue}>{card.cardNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo</Text>
              <Text style={styles.infoValue}>{card.cardType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>¿Por qué bloquear mi tarjeta?</Text>
          <View style={styles.reasonsList}>
            <View style={styles.reasonItem}>
              <Ionicons name="shield-checkmark" size={20} color="#667eea" />
              <Text style={styles.reasonText}>
                Si perdiste o te robaron tu tarjeta
              </Text>
            </View>
            <View style={styles.reasonItem}>
              <Ionicons name="warning" size={20} color="#FF9800" />
              <Text style={styles.reasonText}>
                Si sospechas de actividad fraudulenta
              </Text>
            </View>
            <View style={styles.reasonItem}>
              <Ionicons name="lock-closed" size={20} color="#4CAF50" />
              <Text style={styles.reasonText}>
                Para prevenir compras no autorizadas
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={isBlocked ? handleUnblock : handleBlock}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={isBlocked ? ['#4CAF50', '#45a049'] : ['#FF6B6B', '#e55a5a']}
            style={styles.actionButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons
              name={isBlocked ? 'lock-open' : 'lock-closed'}
              size={20}
              color="#fff"
            />
            <Text style={styles.actionButtonText}>
              {isBlocked ? 'Desbloquear Tarjeta' : 'Bloquear Tarjeta'}
            </Text>
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
  statusContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  statusIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
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
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  reasonsList: {
    paddingHorizontal: 20,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  reasonText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  actionButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    marginBottom: 40,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

