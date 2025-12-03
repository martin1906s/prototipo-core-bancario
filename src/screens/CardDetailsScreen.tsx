import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../context/AuthContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { CreditCardView } from '../components/CreditCardView';
import { formatCurrency } from '../utils/format';

type CardDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CardDetails'
>;
type CardDetailsScreenRouteProp = RouteProp<RootStackParamList, 'CardDetails'>;

interface Props {
  navigation: CardDetailsScreenNavigationProp;
  route: CardDetailsScreenRouteProp;
}

export const CardDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { cards } = useAuth();
  const card = cards.find((c) => c.id === route.params.cardId);

  if (!card) {
    return (
      <View style={styles.container}>
        <Text>Tarjeta no encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalles de Tarjeta</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.cardContainer}>
          <CreditCardView card={card} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de la Tarjeta</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Número de tarjeta</Text>
              <Text style={styles.infoValue}>{card.cardNumber}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Tipo</Text>
              <Text style={styles.infoValue}>{card.cardType}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Válida hasta</Text>
              <Text style={styles.infoValue}>{card.expiryDate}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Límite de crédito</Text>
              <Text style={styles.infoValue}>{formatCurrency(card.creditLimit)}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Crédito disponible</Text>
              <Text style={styles.infoValue}>
                {formatCurrency(card.availableCredit)}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Crédito utilizado</Text>
              <Text style={styles.infoValue}>
                {formatCurrency(card.creditLimit - card.availableCredit)}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones</Text>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('BlockCard', { cardId: card.id })}
          >
            <Ionicons name="lock-closed" size={24} color="#667eea" />
            <Text style={styles.actionText}>Bloquear Tarjeta</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('CardStatement', { cardId: card.id })}
          >
            <Ionicons name="document-text" size={24} color="#667eea" />
            <Text style={styles.actionText}>Estado de Cuenta</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('IncreaseLimit', { cardId: card.id })}
          >
            <Ionicons name="trending-up" size={24} color="#667eea" />
            <Text style={styles.actionText}>Aumentar Límite</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('DeferPurchases', { cardId: card.id })}
          >
            <Ionicons name="calendar" size={24} color="#667eea" />
            <Text style={styles.actionText}>Diferir Compras</Text>
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
  cardContainer: {
    marginVertical: 20,
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginLeft: 16,
  },
});

