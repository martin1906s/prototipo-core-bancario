import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type HelpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Help'>;

interface Props {
  navigation: HelpScreenNavigationProp;
}

const faqs = [
  {
    id: '1',
    question: '¿Cómo realizo una transferencia?',
    answer:
      'Ve a la sección de Transferencias, selecciona tu cuenta origen, ingresa la cuenta destino y el monto. Confirma la operación.',
  },
  {
    id: '2',
    question: '¿Cómo pago servicios?',
    answer:
      'Ve a Pagar Servicios, selecciona el servicio que deseas pagar, ingresa el número de referencia y el monto. Confirma el pago.',
  },
  {
    id: '3',
    question: '¿Cómo bloqueo mi tarjeta?',
    answer:
      'Ve a la sección de Tarjetas, selecciona tu tarjeta y elige la opción Bloquear Tarjeta. Puedes desbloquearla cuando lo necesites.',
  },
  {
    id: '4',
    question: '¿Cómo solicito un préstamo?',
    answer:
      'Ve a la sección de Préstamos y selecciona Solicitar Préstamo. Completa el formulario y espera la aprobación.',
  },
];

export const HelpScreen: React.FC<Props> = ({ navigation }) => {
  const [expandedFaq, setExpandedFaq] = React.useState<string | null>(null);

  const handleCall = () => {
    Linking.openURL('tel:+593991234567');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:soporte@bancoecuador.com');
  };

  const handleChat = () => {
    // Simular chat
    alert('El chat estará disponible próximamente');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ayuda y Soporte</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.contactSection}>
          <Text style={styles.sectionTitle}>Contáctanos</Text>
          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleCall}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.contactButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="call" size={24} color="#fff" />
                <Text style={styles.contactButtonText}>Llamar</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleEmail}
            >
              <LinearGradient
                colors={['#f093fb', '#f5576c']}
                style={styles.contactButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="mail" size={24} color="#fff" />
                <Text style={styles.contactButtonText}>Email</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.contactButton}
              onPress={handleChat}
            >
              <LinearGradient
                colors={['#4facfe', '#00f2fe']}
                style={styles.contactButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="chatbubbles" size={24} color="#fff" />
                <Text style={styles.contactButtonText}>Chat</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preguntas Frecuentes</Text>
          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              onPress={() =>
                setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
              }
              activeOpacity={0.7}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Ionicons
                  name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'}
                  size={20}
                  color="#667eea"
                />
              </View>
              {expandedFaq === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Contacto</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color="#667eea" />
              <Text style={styles.infoText}>+593 99 123 4567</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color="#667eea" />
              <Text style={styles.infoText}>soporte@bancoecuador.com</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color="#667eea" />
              <Text style={styles.infoText}>Lun-Vie: 8:00 - 20:00</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={20} color="#667eea" />
              <Text style={styles.infoText}>Sáb: 9:00 - 14:00</Text>
            </View>
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
  contactSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
  },
  contactButtonGradient: {
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
  contactButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  faqCard: {
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
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginRight: 12,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
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
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },
});

