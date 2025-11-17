import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutDetailScreen({ navigation, route }) {
  const { workoutId } = route.params || {};

  const workoutData = {
    1: {
      id: 1,
      title: 'Treino de Peito e Tríceps',
      category: 'Força',
      duration: '45 min',
      calories: '320 kcal',
      level: 'Intermediário',
      description: 'Treino focado em desenvolvimento de força e hipertrofia do peitoral e tríceps.',
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800',
      exercises: [
        {
          id: 1,
          name: 'Supino Reto',
          sets: '4x12',
          rest: '90',
          icon: 'barbell',
          iconColor: '#4A9FFF',
          iconBg: '#E3F2FF',
          instructions: 'Deite-se no banco, segure a barra e abaixe até o peito.',
        },
        {
          id: 2,
          name: 'Supino Inclinado',
          sets: '4x10',
          rest: '90',
          icon: 'barbell',
          iconColor: '#4A9FFF',
          iconBg: '#E3F2FF',
          instructions: 'Banco inclinado 30-45°, mesma execução do supino reto.',
        },
        {
          id: 3,
          name: 'Crucifixo',
          sets: '3x15',
          rest: '60',
          icon: 'fitness',
          iconColor: '#00D4AA',
          iconBg: '#D4FFF4',
          instructions: 'Com halteres, abra os braços e contraia no centro.',
        },
        {
          id: 4,
          name: 'Tríceps Testa',
          sets: '4x12',
          rest: '60',
          icon: 'barbell',
          iconColor: '#FF6B35',
          iconBg: '#FFE8E0',
          instructions: 'Deite-se e abaixe a barra até próximo da testa.',
        },
        {
          id: 5,
          name: 'Tríceps Pulley',
          sets: '3x15',
          rest: '45',
          icon: 'flash',
          iconColor: '#FF6B35',
          iconBg: '#FFE8E0',
          instructions: 'Na polia, empurre a barra para baixo mantendo cotovelos fixos.',
        },
      ],
    },
    2: {
      id: 2,
      title: 'Yoga Flow Completo',
      category: 'Flexibilidade',
      duration: '30 min',
      calories: '180 kcal',
      level: 'Iniciante',
      description: 'Sequência relaxante de yoga para flexibilidade e bem-estar.',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
      exercises: [
        {
          id: 1,
          name: 'Saudação ao Sol',
          sets: '5x',
          rest: '30',
          icon: 'sunny',
          iconColor: '#FF6B35',
          iconBg: '#FFE8E0',
          instructions: 'Sequência fluida de 12 posições.',
        },
        {
          id: 2,
          name: 'Postura do Guerreiro',
          sets: '3x30s',
          rest: '20',
          icon: 'body',
          iconColor: '#00D4AA',
          iconBg: '#D4FFF4',
          instructions: 'Mantenha a posição com força e equilíbrio.',
        },
      ],
    },
    3: {
      id: 3,
      title: 'HIIT Cardio Intenso',
      category: 'Cardio',
      duration: '25 min',
      calories: '400 kcal',
      level: 'Avançado',
      description: 'Treino de alta intensidade para queima máxima de calorias.',
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
      exercises: [
        {
          id: 1,
          name: 'Burpees',
          sets: '4x20',
          rest: '45',
          icon: 'fitness',
          iconColor: '#FF6B35',
          iconBg: '#FFE8E0',
          instructions: 'Movimento completo: agachar, prancha, pular.',
        },
        {
          id: 2,
          name: 'Mountain Climbers',
          sets: '4x30s',
          rest: '30',
          icon: 'flash',
          iconColor: '#4A9FFF',
          iconBg: '#E3F2FF',
          instructions: 'Posição de prancha, alterne joelhos ao peito rapidamente.',
        },
      ],
    },
  };

  const workout = workoutData[workoutId] || workoutData[1];

  const startWorkout = () => {
    navigation.navigate('WorkoutExecution', {
      workout: workout,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header com Imagem */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: workout.image }}
          style={styles.headerImage}
        />
        <View style={styles.imageOverlay} />
        
        {/* Botões do Header */}
        <View style={styles.headerButtons}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Info sobre a imagem */}
        <View style={styles.headerInfo}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{workout.category}</Text>
          </View>
          <Text style={styles.headerTitle}>{workout.title}</Text>
          <Text style={styles.headerDescription}>{workout.description}</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={24} color="#6C5CE7" />
            <Text style={styles.statValue}>{workout.duration}</Text>
            <Text style={styles.statLabel}>Duração</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statBox}>
            <Ionicons name="flame-outline" size={24} color="#FF6B35" />
            <Text style={styles.statValue}>{workout.calories}</Text>
            <Text style={styles.statLabel}>Calorias</Text>
          </View>
          
          <View style={styles.statDivider} />
          
          <View style={styles.statBox}>
            <Ionicons name="barbell-outline" size={24} color="#00D4AA" />
            <Text style={styles.statValue}>{workout.exercises.length}</Text>
            <Text style={styles.statLabel}>Exercícios</Text>
          </View>
        </View>

        {/* Lista de Exercícios */}
        <View style={styles.exercisesSection}>
          <Text style={styles.sectionTitle}>Exercícios</Text>
          
          {workout.exercises.map((exercise, index) => (
            <View key={exercise.id} style={styles.exerciseCard}>
              <View style={styles.exerciseNumber}>
                <Text style={styles.exerciseNumberText}>{index + 1}</Text>
              </View>
              
              <View style={[styles.exerciseIcon, { backgroundColor: exercise.iconBg }]}>
                <Ionicons name={exercise.icon} size={24} color={exercise.iconColor} />
              </View>
              
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{exercise.name}</Text>
                <View style={styles.exerciseMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="repeat-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{exercise.sets}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="timer-outline" size={14} color="#666" />
                    <Text style={styles.metaText}>{exercise.rest}s</Text>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity style={styles.infoButton}>
                <Ionicons name="information-circle-outline" size={24} color="#999" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Botão Fixo Iniciar Treino */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={styles.startButton}
          onPress={startWorkout}
        >
          <Ionicons name="play" size={24} color="#fff" />
          <Text style={styles.startButtonText}>Iniciar Treino</Text>
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
  imageContainer: {
    height: 320,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerButtons: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfo: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
  },
  categoryBadge: {
    backgroundColor: 'rgba(108,92,231,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    color: '#E8E8E8',
    lineHeight: 20,
  },
  content: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: -40,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 16,
  },
  exercisesSection: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  exerciseNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
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
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  exerciseMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  infoButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomPadding: {
    height: 100,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  startButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 8,
  },
});