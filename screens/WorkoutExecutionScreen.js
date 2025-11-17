import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function WorkoutExecutionScreen({ navigation, route }) {
  const { workout } = route.params || {};
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [restTime, setRestTime] = useState(0);
  const [completedSets, setCompletedSets] = useState([]);

  // Validação de dados
  if (!workout || !workout.exercises || !Array.isArray(workout.exercises)) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#1A1A1A', marginTop: 16, textAlign: 'center' }}>
          Erro ao carregar treino
        </Text>
        <Text style={{ fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' }}>
          Os dados do treino estão inválidos ou não foram carregados.
        </Text>
        <TouchableOpacity 
          style={styles.errorButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.errorButtonText}>Voltar para o Início</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentExercise = workout.exercises[currentExerciseIndex];
  const progress = ((currentExerciseIndex + 1) / workout.exercises.length) * 100;

  useEffect(() => {
    let interval;
    if (isResting && restTime > 0) {
      interval = setInterval(() => {
        setRestTime(prev => {
          if (prev <= 1) {
            setIsResting(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isResting, restTime]);

  const handleCompleteSet = () => {
    const exerciseKey = `${currentExerciseIndex}-${completedSets.length}`;
    setCompletedSets([...completedSets, exerciseKey]);
    
    // Inicia descanso
    const restSeconds = parseInt(currentExercise.rest, 10);
    if (!isNaN(restSeconds) && restSeconds > 0) {
      setRestTime(restSeconds);
      setIsResting(true);
    }
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCompletedSets([]);
      setIsResting(false);
      setRestTime(0);
    } else {
      // Treino completo
      Alert.alert(
        'Parabéns! 🎉',
        'Você completou o treino!',
        [
          {
            text: 'Finalizar',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    }
  };

  const handlePreviousExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setCompletedSets([]);
      setIsResting(false);
      setRestTime(0);
    }
  };

  const handleSkipRest = () => {
    setIsResting(false);
    setRestTime(0);
  };

  const handleQuit = () => {
    Alert.alert(
      'Sair do treino?',
      'Você perderá o progresso do treino atual.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6C5CE7" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.headerButton}
          onPress={handleQuit}
        >
          <Ionicons name="close" size={28} color="#fff" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{workout.title}</Text>
          <Text style={styles.headerSubtitle}>
            Exercício {currentExerciseIndex + 1} de {workout.exercises.length}
          </Text>
        </View>
        
        <View style={styles.headerButton} />
      </View>

      {/* Barra de Progresso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Card do Exercício Atual */}
        <View style={styles.exerciseCard}>
          <View style={[styles.exerciseIcon, { backgroundColor: currentExercise.iconBg || '#E3F2FF' }]}>
            <Ionicons 
              name={currentExercise.icon || 'fitness'} 
              size={48} 
              color={currentExercise.iconColor || '#6C5CE7'} 
            />
          </View>
          
          <Text style={styles.exerciseName}>{currentExercise.name}</Text>
          
          <View style={styles.exerciseMetrics}>
            <View style={styles.metricBox}>
              <Ionicons name="repeat" size={24} color="#6C5CE7" />
              <Text style={styles.metricLabel}>Séries</Text>
              <Text style={styles.metricValue}>{currentExercise.sets}</Text>
            </View>
            
            <View style={styles.metricDivider} />
            
            <View style={styles.metricBox}>
              <Ionicons name="timer" size={24} color="#FF6B35" />
              <Text style={styles.metricLabel}>Descanso</Text>
              <Text style={styles.metricValue}>{currentExercise.rest}s</Text>
            </View>
          </View>

          {/* Instruções */}
          <View style={styles.instructionsBox}>
            <View style={styles.instructionsHeader}>
              <Ionicons name="information-circle" size={20} color="#6C5CE7" />
              <Text style={styles.instructionsTitle}>Como fazer</Text>
            </View>
            <Text style={styles.instructionsText}>
              {currentExercise.instructions || 'Execute o exercício conforme orientação.'}
            </Text>
          </View>
        </View>

        {/* Timer de Descanso */}
        {isResting && (
          <View style={styles.restCard}>
            <Ionicons name="timer-outline" size={48} color="#FF6B35" />
            <Text style={styles.restTitle}>Descansando</Text>
            <Text style={styles.restTimer}>{restTime}s</Text>
            <TouchableOpacity 
              style={styles.skipRestButton}
              onPress={handleSkipRest}
            >
              <Text style={styles.skipRestText}>Pular descanso</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sets Completados */}
        <View style={styles.setsContainer}>
          <Text style={styles.setsTitle}>Séries completadas: {completedSets.length}</Text>
          <View style={styles.setsGrid}>
            {[...Array(4)].map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.setCircle,
                  completedSets.length > index && styles.setCircleCompleted
                ]}
              >
                {completedSets.length > index && (
                  <Ionicons name="checkmark" size={20} color="#fff" />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Botões de Ação */}
      <View style={styles.actionContainer}>
        {/* Botão Série Completada */}
        {!isResting && (
          <TouchableOpacity 
            style={styles.completeSetButton}
            onPress={handleCompleteSet}
          >
            <Ionicons name="checkmark-circle" size={28} color="#fff" />
            <Text style={styles.completeSetText}>Série Completada</Text>
          </TouchableOpacity>
        )}

        {/* Navegação entre Exercícios */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity 
            style={[styles.navButton, currentExerciseIndex === 0 && styles.navButtonDisabled]}
            onPress={handlePreviousExercise}
            disabled={currentExerciseIndex === 0}
          >
            <Ionicons 
              name="chevron-back" 
              size={24} 
              color={currentExerciseIndex === 0 ? '#CCC' : '#6C5CE7'} 
            />
            <Text style={[styles.navButtonText, currentExerciseIndex === 0 && styles.navButtonTextDisabled]}>
              Anterior
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navButton}
            onPress={handleNextExercise}
          >
            <Text style={styles.navButtonText}>
              {currentExerciseIndex === workout.exercises.length - 1 ? 'Finalizar' : 'Próximo'}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#6C5CE7" />
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#6C5CE7',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#E8E3FF',
    marginTop: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E8E3FF',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00D4AA',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 200,
  },
  exerciseCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 20,
  },
  exerciseIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },
  exerciseMetrics: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 24,
  },
  metricBox: {
    flex: 1,
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  metricDivider: {
    width: 1,
    backgroundColor: '#E8E8E8',
    marginHorizontal: 20,
  },
  instructionsBox: {
    width: '100%',
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    padding: 16,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  restCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  restTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginTop: 16,
    marginBottom: 8,
  },
  restTimer: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 16,
  },
  skipRestButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipRestText: {
    fontSize: 14,
    color: '#6C5CE7',
    fontWeight: '600',
  },
  setsContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  setsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 16,
  },
  setsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  setCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  setCircleCompleted: {
    backgroundColor: '#00D4AA',
    borderColor: '#00D4AA',
  },
  actionContainer: {
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
  completeSetButton: {
    backgroundColor: '#6C5CE7',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  completeSetText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F7FA',
    borderRadius: 12,
    padding: 14,
    marginHorizontal: 6,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#6C5CE7',
    marginHorizontal: 4,
  },
  navButtonTextDisabled: {
    color: '#999',
  },
  errorButton: {
    backgroundColor: '#6C5CE7',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
  },
  errorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});