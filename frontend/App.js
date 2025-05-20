import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './context/UserContext'
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import  Startup from './screens/Startup';
import Home from './screens/Home';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ProfileScreen from './screens/LoginScreen';
import EditProfile from './screens/EditProfile';
import ChangePassword from './screens/ChangePassword';
import ProductDetails from './screens/ProductDetails';
import Products from './screens/Products';
import SofaARView from './screens/SofaARView';
import Favorites from './screens/Favorites';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import ContactUsScreen from './screens/ContactUsScreen';
import HelpSupportScreen from './screens/HelpSupportScreen';
import resetPasswordScreen from './screens/ResetPasswordScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <LanguageProvider>
    <UserProvider>
      <ThemeProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Startup" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Startup" component={Startup} /> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen name="SofaARView" component={SofaARView} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="HelpSupport" component={HelpSupportScreen} />
<Stack.Screen name="ContactUs" component={ContactUsScreen} />
<Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
<Stack.Screen name="ResetPassword" component={resetPasswordScreen} />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
    </ThemeProvider>
    </UserProvider>
    </LanguageProvider>
  // <LanguageProvider>
  );
}