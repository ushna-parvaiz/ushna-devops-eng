import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  topImage: {
    position: 'absolute',
    top: -20,
    left: -2,
    width: width, // Use width of screen to ensure it adjusts properly
    height: 140,
    resizeMode: 'contain',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 40,
    left: -150,
    width: width, // Use width of screen to ensure it adjusts properly
    height: 300,
    resizeMode: 'contain',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? -100 : -90, // Platform-specific margin-top for better fit
  },
  logo: {
    width: width * 0.8, // 80% of the screen width to ensure it fits well
    height: width * 0.8, // Maintain aspect ratio for logo
    marginTop: -150,
    left: -50,
    resizeMode: 'contain',
  },
  subtitle: {
    marginTop: -50,
    fontSize: 16,
    color: '#333',
  },
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginTop: 45,
    width: '100%',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: '#aaa',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: '#aaa',
  },
  signInBtn: {
    flexDirection: 'row',
    backgroundColor: '#4B8F77',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
    marginTop: 80,
    right: Platform.OS === 'ios' ? -55 : -45, // Adjust for platform differences
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  footer: {
    marginTop: 20,
    color: '#333',
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  googleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 30,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: '#444',
  },
});