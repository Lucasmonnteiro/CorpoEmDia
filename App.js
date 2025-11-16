// App.js - Arquivo principal com navegação

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe suas telas
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import CreateWorkoutScreen from './screens/CreateWorkoutScreen';
import MyWorkoutsScreen from './screens/MyWorkoutsScreen';
import WorkoutDetailScreen from './screens/WorkoutDetailScreen';
import WorkoutExecutionScreen from './screens/WorkoutExecutionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{
            animation: 'fade',
          }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen}
          options={{
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
        />
        <Stack.Screen 
          name="CreateWorkout" 
          component={CreateWorkoutScreen}
        />
        <Stack.Screen 
          name="MyWorkouts" 
          component={MyWorkoutsScreen}
        />
        <Stack.Screen 
          name="WorkoutDetail" 
          component={WorkoutDetailScreen}
        />
        <Stack.Screen 
          name="WorkoutExecution" 
          component={WorkoutExecutionScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
