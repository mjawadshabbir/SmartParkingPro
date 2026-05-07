import { View, Text } from 'react-native';
import AnimatedButton from '../components/AnimatedButton';

export default function SettingsScreen({ navigation }) {
  return (
    <View style={{ padding:20 }}>
      <AnimatedButton title="Privacy Policy" onPress={() => navigation.navigate('Privacy')} />
      <AnimatedButton title="Help & Support" onPress={() => navigation.navigate('Help')} />
    </View>
  );
}
