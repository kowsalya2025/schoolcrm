import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/auth';
import { colors } from './src/theme';

import Landing from './src/screens/Landing';
import Login from './src/screens/Login';
import AdminDashboard from './src/screens/AdminDashboard';
import ParentDashboard from './src/screens/ParentDashboard';
import StudentDirectory from './src/screens/StudentDirectory';
import CreateStudent from './src/screens/CreateStudent';
import CourseManagement from './src/screens/CourseManagement';
import CreateCourse from './src/screens/CreateCourse';
import ClassManagement from './src/screens/ClassManagement';
import AcademicSchedules from './src/screens/AcademicSchedules';
import CalendarScreen from './src/screens/CalendarScreen';
import InboxScreen from './src/screens/InboxScreen';
import PaymentsScreen from './src/screens/PaymentsScreen';
import SystemSettings from './src/screens/SystemSettings';
import HelpSupport from './src/screens/HelpSupport';
import ProfileScreen from './src/screens/ProfileScreen';
import LogoutConfirmation from './src/screens/LogoutConfirmation';

const Stack = createNativeStackNavigator();

function Routes() {
  const { user, loading } = useAuth();
  if (loading) {
    return <View style={styles.center}><ActivityIndicator color={colors.primary} size="large" /></View>;
  }
  const staff = user && (user.role === 'admin' || user.role === 'teacher');
  const initial = !user ? 'Landing' : staff ? 'AdminDashboard' : 'ParentDashboard';
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initial}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="ParentDashboard" component={ParentDashboard} />
      <Stack.Screen name="StudentDirectory" component={StudentDirectory} />
      <Stack.Screen name="CreateStudent" component={CreateStudent} />
      <Stack.Screen name="CourseManagement" component={CourseManagement} />
      <Stack.Screen name="CreateCourse" component={CreateCourse} />
      <Stack.Screen name="ClassManagement" component={ClassManagement} />
      <Stack.Screen name="AcademicSchedules" component={AcademicSchedules} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
      <Stack.Screen name="PaymentsScreen" component={PaymentsScreen} />
      <Stack.Screen name="SystemSettings" component={SystemSettings} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="LogoutConfirmation" component={LogoutConfirmation} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar style="dark" backgroundColor="#FFFFFF" />
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ center: { flex: 1, justifyContent: 'center', alignItems: 'center' } });
