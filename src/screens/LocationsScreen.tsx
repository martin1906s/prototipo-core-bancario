import React, { useState } from 'react';
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

type LocationsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Locations'
>;

interface Props {
  navigation: LocationsScreenNavigationProp;
}

interface Location {
  id: string;
  name: string;
  type: 'branch' | 'atm';
  address: string;
  distance: number;
  hours: string;
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Sucursal Centro',
    type: 'branch',
    address: 'Av. Amazonas N12-123 y Colón',
    distance: 0.5,
    hours: 'Lun-Vie: 9:00 - 18:00',
  },
  {
    id: '2',
    name: 'Cajero Automático - Quicentro',
    type: 'atm',
    address: 'Av. Naciones Unidas y 6 de Diciembre',
    distance: 1.2,
    hours: '24/7',
  },
  {
    id: '3',
    name: 'Sucursal Norte',
    type: 'branch',
    address: 'Av. de la Prensa N52-200',
    distance: 3.5,
    hours: 'Lun-Vie: 9:00 - 18:00',
  },
  {
    id: '4',
    name: 'Cajero Automático - CCI',
    type: 'atm',
    address: 'Av. 6 de Diciembre y Naciones Unidas',
    distance: 2.1,
    hours: '24/7',
  },
];

export const LocationsScreen: React.FC<Props> = ({ navigation }) => {
  const [selectedType, setSelectedType] = useState<'all' | 'branch' | 'atm'>('all');

  const filteredLocations =
    selectedType === 'all'
      ? mockLocations
      : mockLocations.filter((loc) => loc.type === selectedType);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ubicaciones</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedType === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedType('all')}
          >
            <Text
              style={[
                styles.filterText,
                selectedType === 'all' && styles.filterTextActive,
              ]}
            >
              Todas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedType === 'branch' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedType('branch')}
          >
            <Ionicons
              name="business"
              size={16}
              color={selectedType === 'branch' ? '#fff' : '#667eea'}
            />
            <Text
              style={[
                styles.filterText,
                selectedType === 'branch' && styles.filterTextActive,
              ]}
            >
              Sucursales
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedType === 'atm' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedType('atm')}
          >
            <Ionicons
              name="card"
              size={16}
              color={selectedType === 'atm' ? '#fff' : '#667eea'}
            />
            <Text
              style={[
                styles.filterText,
                selectedType === 'atm' && styles.filterTextActive,
              ]}
            >
              Cajeros
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          {filteredLocations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={styles.locationCard}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.locationIcon,
                  {
                    backgroundColor:
                      location.type === 'branch' ? '#667eea20' : '#4CAF5020',
                  },
                ]}
              >
                <Ionicons
                  name={location.type === 'branch' ? 'business' : 'card'}
                  size={24}
                  color={location.type === 'branch' ? '#667eea' : '#4CAF50'}
                />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationName}>{location.name}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color="#999" />
                  <Text style={styles.locationAddress}>{location.address}</Text>
                </View>
                <View style={styles.locationRow}>
                  <Ionicons name="time-outline" size={14} color="#999" />
                  <Text style={styles.locationHours}>{location.hours}</Text>
                </View>
                <View style={styles.locationRow}>
                  <Ionicons name="navigate-outline" size={14} color="#999" />
                  <Text style={styles.locationDistance}>
                    {location.distance} km de distancia
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.directionsButton}>
                <Ionicons name="navigate" size={20} color="#667eea" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    gap: 6,
  },
  filterButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
  },
  filterTextActive: {
    color: '#fff',
  },
  section: {
    paddingHorizontal: 20,
  },
  locationCard: {
    flexDirection: 'row',
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
  locationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  locationContent: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
    flex: 1,
  },
  locationHours: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
  },
  locationDistance: {
    fontSize: 13,
    color: '#667eea',
    fontWeight: '600',
    marginLeft: 6,
  },
  directionsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

