import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreateWorkoutScreen({ navigation }) {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedExercises, setSelectedExercises] = useState([]);

  const suggestedExercises = [
    {
      id: 1,
      name: 'Supino Reto',
      icon: 'barbell',
      iconColor: '#4A9FFF',
      iconBg: '#E3F2FF',
      muscles: ['Peito', '4x12'],
      level: 'Intermediário',
    },
    {
      id: 2,
      name: 'Agachamento Livre',
      icon: 'flash',
      iconColor: '#FF6B35',
      iconBg: '#FFE8E0',
      muscles: ['Pernas', '4x10'],
      level: 'Avançado',
    },
    {
      id: 3,
      name: 'Rosca Direta',
      icon: 'fitness',
      iconColor: '#00D4AA',
      iconBg: '#D4FFF4',
      muscles: ['Bíceps', '3x12'],
      level: 'Iniciante',
    },
  ];

  const toggleExercise = (id) => {
    if (selectedExercises.includes(id)) {
      setSelectedExercises(selectedExercises.filter(item => item !== id));
    } else {
      setSelectedExercises([...selectedExercises, id]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Criar Novo Treino</Text>
          <Text style={styles.headerSubtitle}>Monte seu treino personalizado</Text>
        </View>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar treino</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Input Nome do Treino */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Nome do Treino</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Treino de Peito e Tríceps"
            placeholderTextColor="#999"
            value={workoutName}
            onChangeText={setWorkoutName}
          />
        </View>

        {/* Exercícios Sugeridos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercícios Sugeridos</Text>
          
          {suggestedExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => toggleExercise(exercise.id)}
            >
              <View style={styles.exerciseLeft}>
                <View style={[styles.exerciseIcon, { backgroundColor: exercise.iconBg }]}>
                  <Ionicons name={exercise.icon} size={24} color={exercise.iconColor} />
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseTags}>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{exercise.muscles[0]}</Text>
                    </View>
                    <View style={styles.tag}>
                      <Text style={styles.tagText}>{exercise.muscles[1]}</Text>
                    </View>
                  </View>
                  <Text style={styles.exerciseLevel}>{exercise.level}</Text>
                </View>
              </View>
              <View style={[
                styles.checkbox,
                selectedExercises.includes(exercise.id) && styles.checkboxSelected
              ]}>
                {selectedExercises.includes(exercise.id) && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('MyWorkouts')}
        >
          <Ionicons name="barbell-outline" size={24} color="#999" />
          <Text style={styles.navLabel}>Treinos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.navItemActive}>
            <Ionicons name="add" size={32} color="#fff" />
          </View>
          <Text style={styles.navLabelActive}>Criar</Text>
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
  header: {
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerCenter: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  saveButton: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E8E8E8',
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  exerciseTags: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tag: {
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
  },
  tagText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  exerciseLevel: {
    fontSize: 12,
    color: '#999',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  bottomNav: {
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
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C5CE7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
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