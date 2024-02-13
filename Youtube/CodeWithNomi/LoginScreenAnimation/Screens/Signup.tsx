import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

export default function Signup() {
  const navigation = useNavigation();
  return (
    <View className="flex h-full w-full">
      <Image
        className="w-full h-full absolute"
        source={require('../assets/images/background.png')}
      />
      <View className="flex-row w-full justify-around absolute">
        <Animated.Image
          className="h-[220] w-[90]"
          source={require('../assets/images/light.png')}
          entering={FadeInUp.delay(200).duration(1000).springify()}
        />
        <Animated.Image
          className="h-[180] w-[70] "
          source={require('../assets/images/light.png')}
          entering={FadeInUp.delay(400).duration(1000).springify()}
        />
      </View>
      {/* title and form */}
      <View className="flex w-full h-full justify-around  pt-40 pb-10 ">
        {/* title */}
        <Animated.View
          className="flex items-center"
          entering={FadeInDown.delay(200).duration(1000)}>
          <Text className="text-white  tracking-wider text-5xl font-bold">
            Sign up
          </Text>
        </Animated.View>
        {/* form */}
        <Animated.View
          className="flex mx-4 space-y-4"
          entering={FadeInDown.delay(400).duration(1000)}>
          <View className="p-4 bg-black/5 rounded-2xl">
            <TextInput placeholder="Username" placeholderTextColor={'grey'} />
          </View>
          <View className="p-4 bg-black/5 rounded-2xl">
            <TextInput placeholder="Email" placeholderTextColor={'grey'} />
          </View>
          <View className="p-4 bg-black/5 rounded-2xl">
            <TextInput
              secureTextEntry
              placeholder="Password"
              placeholderTextColor={'grey'}
            />
          </View>
          <View>
            <TouchableOpacity className="p-4 bg-cyan-400 rounded-2xl mb-3">
              <Text className="text-center text-white text-xl font-bold">
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center">
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signin')}>
              <Text className="text-sky-600">Sign in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
