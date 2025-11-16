import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { getUser, removeUser } from '../storage';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('Carregando...');

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      if (user && user.name) {
        setUsername(user.name);
      } else {
        setUsername("Usuário");
      }
    }
    loadUser();
  }, []);

  async function handleLogout() {
    await removeUser();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.avatar}>
              <Ionicons name="barbell" size={24} color="#fff" />
            </View>
            <View>
              <Text style={styles.greeting}>Olá, {username}!</Text>
              <Text style={styles.subGreeting}>Pronto para treinar hoje?</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={24} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        {/* Card Total de Treinos */}
        <View style={styles.statsCard}>
          <View style={styles.statsLeft}>
            <Text style={styles.statsLabel}>Total de Treinos</Text>
            <Text style={styles.statsNumber}>12</Text>
            <Text style={styles.statsSubtext}>essa semana</Text>
          </View>
          <View style={styles.statsIcon}>
            <Ionicons name="barbell" size={40} color="#fff" />
          </View>
        </View>

        {/* Criar Novo Treino */}
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('CreateWorkout')}
        >
          <View style={styles.createButtonContent}>
            <View>
              <Text style={styles.createButtonTitle}>Criar Novo Treino</Text>
              <Text style={styles.createButtonSubtitle}>
                Monte seu treino personalizado
              </Text>
            </View>
            <View style={styles.createButtonIcon}>
              <Ionicons name="add" size={32} color="#fff" />
            </View>
          </View>
        </TouchableOpacity>

        {/* Meus Treinos */}
        <TouchableOpacity
          style={styles.myWorkoutsButton}
          onPress={() => navigation.navigate('MyWorkouts')}
        >
          <View style={styles.myWorkoutsContent}>
            <Ionicons name="list-outline" size={24} color="#999" />
            <View style={styles.myWorkoutsTextContainer}>
              <Text style={styles.myWorkoutsTitle}>Meus Treinos</Text>
              <Text style={styles.myWorkoutsSubtitle}>
                Ver todos os treinos salvos
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#999" />
          </View>
        </TouchableOpacity>

        {/* Treinos Recentes */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Treinos Recentes</Text>
          <TouchableOpacity
            style={styles.recentCard}
            onPress={() =>
              navigation.navigate('WorkoutDetail', {
                workoutId: 1,
                workoutName: 'Treino de Peito e Tríceps',
              })
            }
          >
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400',
              }}
              style={styles.recentImage}
            />
            <View style={styles.recentOverlay}>
              <Text style={styles.recentTitle}>Treino de Peito</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navItemActive}>
            <Ionicons name="home" size={24} color="#6C5CE7" />
          </View>
          <Text style={styles.navLabelActive}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('MyWorkouts')}
        >
          <Ionicons name="barbell-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Treinos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('CreateWorkout')}
        >
          <Ionicons name="add-circle-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subGreeting: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 20,
  },
  statsLeft: {
    flex: 1,
  },
  statsLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  statsNumber: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statsSubtext: {
    fontSize: 13,
    color: '#666',
  },
  statsIcon: {
    width: 70,
    height: 70,
    borderRadius: 18,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    backgroundColor: '#6C5CE7',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  createButtonContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createButtonTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  createButtonSubtitle: {
    fontSize: 13,
    color: '#E8E3FF',
  },
  createButtonIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  myWorkoutsButton: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  myWorkoutsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  myWorkoutsTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  myWorkoutsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  myWorkoutsSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  recentSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  recentCard: {
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  recentImage: {
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  recentOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  recentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EDFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  navLabelActive: {
    fontSize: 12,
    color: '#6C5CE7',
    fontWeight: '600',
  },
});