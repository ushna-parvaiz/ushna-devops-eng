import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/LoginStyles';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';
import i18n from '../i18n/i18n';
import config from '../config';
const LoginScreen = () => {
  const navigation = useNavigation();
  const { setUser } = useContext(UserContext);
  const { colors } = useContext(ThemeContext);
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle state

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (!enteredUsername || !enteredPassword) {
      Alert.alert(i18n.t('formValidation')); // e.g. "Please fill all fields"
      return;
    }

    if (!validateEmail(enteredUsername)) {
      Alert.alert(i18n.t('invalidEmail')); // e.g. "Invalid email format"
      return;
    }
  
    try {
      console.log('Attempting login...');
      const response = await fetch(`${config.BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: enteredUsername,
          email: enteredUsername, // So backend can match either one
          password: enteredPassword,
        }),
      });

      const data = await response.json();
      console.log('Response:', data);

      if (response.ok && data.success) {
        const userData = data.user;
        setUser({
          _id: userData._id,
          username: userData.username,
          email: userData.email,
          mobile: userData.mobile,
        });
        navigation.navigate('Home');
      } else {
        Alert.alert(i18n.t('loginFailed'), data.message || i18n.t('invalidCredentials'));
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(i18n.t('error'), i18n.t('loginError'));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image source={require('../assets/top.png')} style={styles.topImage} />

      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <Text style={[styles.subtitle, { color: colors.text }]}>
        {i18n.t('signInToAccount')}
      </Text>

      <View style={[styles.inputWrapper, { backgroundColor: colors.card }]}>
        <Ionicons name="person-outline" size={18} style={styles.icon} />
        <TextInput
          placeholder={i18n.t('enterUsername')}
          placeholderTextColor="#aaa"
          style={[styles.input, { color: colors.text }]}
          value={enteredUsername}
          onChangeText={setEnteredUsername}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      <View style={[styles.inputWrapper, { backgroundColor: colors.card }]}>
        <Ionicons name="lock-closed-outline" size={18} style={styles.icon} />
        <TextInput
          placeholder={i18n.t('Password')}
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword}
          style={[styles.input, { color: colors.text }]}
          value={enteredPassword}
          onChangeText={setEnteredPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.forgot} onPress={() => navigation.navigate('Forgot')}>
        {i18n.t('forgotPassword')}
      </Text>

      <TouchableOpacity onPress={handleLogin} style={styles.signInBtn}>
        <Text style={styles.signInText}>{i18n.t('signIn')}</Text>
        <Ionicons name="arrow-forward" size={20} color={'white'} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.googleBtn, { backgroundColor: colors.card }]}>
              <Image source={require('../assets/googleicon.jpg')} style={styles.googleIcon} />
              <Text style={[styles.googleText, { color: colors.text }]}>
                {i18n.t('continueWithGmail')}
              </Text>
            </TouchableOpacity>

      <Text style={[styles.footer, { color: colors.text }]}>
        {i18n.t('noAccount')}{' '}
        <Text style={[styles.link, { color: colors.text }]} onPress={() => navigation.navigate('Signup')}>
          {i18n.t('createaccount')}
        </Text>
      </Text>

      <Image source={require('../assets/bottom.png')} style={styles.bottomImage} />
    </View>
  );
};

export default LoginScreen;