import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: Platform.OS === 'ios' ? 60 : 40, // Adjust top margin for iOS and Android
    marginBottom: 10,
    // marginLeft: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editIcon: {
    position: 'absolute',
    right: 135,
    top: 70,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 5,
  },
  name: {
    marginTop: 10,
    fontSize: width < 350 ? 18 : 20, // Adjust font size for smaller screens
    fontWeight: 'bold',
  },
  contact: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    alignSelf: 'center',
  },
  value: {
    color: '#3B82F6',
    fontSize: 14,
    marginRight: 26,
  },
  value2: {
    color: '#3B82F6',
    fontSize: 14,
    marginRight: 18,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#2E7D62',
    borderRadius: 25,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  label2: {
    fontSize: 16,
    marginBottom: 6,
  },
  input2: {
    borderWidth: 2,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cameraButton: {
    backgroundColor: '#2c5f46',
    padding: 12,
    borderRadius: 50,
    marginTop: -60,
  },
  slider: {
    position: 'absolute',
    bottom: 19,
    left: width * 0.87, // Dynamic positioning of the slider based on screen width
    height: 3,
    width: 30,
    backgroundColor: '#2c5f46',
    borderRadius: 1.5,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    position: 'relative',
  },
  
  inputField: {
    flex: 1,
    height: 60,
    fontSize: 16,
    borderColor: '#000000',
    borderWidth: 3,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  
  eyeIcon: {
    position: 'absolute',
    right: 20,
    paddingBottom: 10,
  }
  
});