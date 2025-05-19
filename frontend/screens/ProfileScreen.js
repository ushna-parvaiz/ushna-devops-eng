import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import styles from '../styles/ProfileStyles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';
import * as ImagePicker from 'expo-image-picker';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import config from '../config';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(UserContext);
  const { isDarkTheme, toggleTheme, colors } = useContext(ThemeContext);
  const [profileImage, setProfileImage] = useState(user?.profileImage || null);
  const sliderPosition = useSharedValue(0);

  const sliderAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sliderPosition.value * 60 }],
    };
  });

  const handleProfilePictureUpload = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access media library is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setProfileImage(pickerResult.assets[0].uri);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              if (!user || !user._id) {
                Alert.alert('❌', 'User ID is missing');
                return;
              }

              const response = await fetch($`{config.BASE_URL}/api/auth/${user._id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const contentType = response.headers.get('content-type');
              let data;

              if (contentType && contentType.includes('application/json')) {
                data = await response.json();
              } else {
                const text = await response.text();
                Alert.alert('❌', 'Unexpected server response');
                return;
              }

              if (response.ok) {
                Alert.alert('✅', 'Account deleted successfully');
                setUser(null);
                navigation.navigate('Startup');
              } else {
                Alert.alert('❌', data.message || 'Failed to delete account');
              }

            } catch (error) {
              Alert.alert('❌', 'Server error, please try again later');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100, flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../assets/avatar.jpeg')}
            style={styles.avatar}
          />
          <TouchableOpacity onPress={handleProfilePictureUpload} style={styles.editIcon}>
            <MaterialIcons name="edit" size={18} />
          </TouchableOpacity>
          <Text style={[styles.name, { color: colors.text }]}>{user ? user.username : 'Guest User'}</Text>
          <Text style={[styles.contact, { color: colors.text }]}>
            {user?.email || '-'} | {user?.mobile || '-'}
          </Text>
        </View>

        {user && (
          <>
            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <ProfileItem icon="person-outline" label="Edit Profile" onPress={() => navigation.navigate('EditProfile')} />
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <ProfileItem icon="lock-closed-outline" label="Change Password" onPress={() => navigation.navigate('ChangePassword')} />
              <ProfileItem icon="color-palette-outline" label="Dark Mode">
                <Switch value={isDarkTheme} style={styles.value2} onValueChange={toggleTheme} />
              </ProfileItem>
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <ProfileItem icon="help-circle-outline" label="Help & Support" onPress={() => navigation.navigate('HelpSupport')} />
              <ProfileItem icon="chatbox-ellipses-outline" label="Contact Us" onPress={() => navigation.navigate('ContactUs')} />
              <ProfileItem icon="document-text-outline" label="Privacy Policy" onPress={() => navigation.navigate('PrivacyPolicy')} />
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <ProfileItem icon="trash-outline" label="Delete Account" onPress={handleDeleteAccount} />
            </View>
          </>
        )}

        {!user && (
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Login / Sign Up</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        )}

        {user && (
          <TouchableOpacity
            onPress={() => {
              setUser(null);
              navigation.navigate('Startup');
            }}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Logout</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={[styles.bottomNav, { backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => {
          sliderPosition.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
          navigation.navigate('Home');
        }}>
          <Ionicons name="home-outline" size={24} color="#2c5f46" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          sliderPosition.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.exp) });
          navigation.navigate('Favorites');
        }}>
          <Ionicons name="heart-outline" size={24} color="#2c5f46" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          sliderPosition.value = withTiming(2, { duration: 300, easing: Easing.out(Easing.exp) });
          navigation.navigate('Camera');
        }}>
          <View style={styles.cameraButton}>
            <Ionicons name="camera-outline" size={28} color="#fff" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          sliderPosition.value = withTiming(3, { duration: 300, easing: Easing.out(Easing.exp) });
          navigation.navigate('Products');
        }}>
          <Ionicons name="list-outline" size={24} color="#2c5f46" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          sliderPosition.value = withTiming(4, { duration: 300, easing: Easing.out(Easing.exp) });
          navigation.navigate('Profile');
        }}>
          <Ionicons name="person-outline" size={24} color="#2c5f46" />
        </TouchableOpacity>
      </View>

      <Animated.View style={[styles.slider, sliderAnimatedStyle]} />
    </View>
  );
};

const ProfileItem = ({ icon, label, value, onPress, children }) => {
  const { colors } = useContext(ThemeContext);
  return (
    <View style={styles.item}>
      <Ionicons name={icon} size={20} color={colors.text} />
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}
      >
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
        {value && <Text style={[styles.value, { color: colors.text }]}>{value}</Text>}
        {children}
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;