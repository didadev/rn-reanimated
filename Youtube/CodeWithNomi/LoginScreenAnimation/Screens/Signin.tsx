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
import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated';

export default function Signin() {
  const navigation = useNavigation();
  return (
    <View className="h-full w-full bg-white">
      <Image
        //style={{position: 'absolute', width: '100%', height: '100%'}}
        className="h-full w-full absolute"
        source={require('../assets/images/background.png')}
      />
      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Animated.Image
          className="h-[225] w-[90]"
          source={require('../assets/images/light.png')}
          entering={FadeInUp.delay(200).duration(1000).springify()}
        />
        <Animated.Image
          className="h-[160] w-[65]"
          source={require('../assets/images/light.png')}
          entering={FadeInUp.delay(400).duration(1000).springify()}
        />
      </View>
      {/* title and forms */}
      <View className="h-full w-full flex  justify-around pt-40 pb-10 ">
        {/* Title */}
        <Animated.View
          entering={FadeInUp.duration(1000).springify()}
          className=" flex items-center ">
          <Text className="text-white font-bold text-5xl tracking-wider">
            Login
          </Text>
        </Animated.View>
        {/* Form */}
        <View className="flex items-center mx-4 space-y-4  ">
          <Animated.View
            className="bg-black/5 p-5 rounded-2xl w-full"
            entering={FadeInDown.duration(1000).springify()}>
            <TextInput placeholder="Email" placeholderTextColor={'gray'} />
          </Animated.View>
          <Animated.View
            className="bg-black/5 p-5 rounded-2xl w-full mb-3"
            entering={FadeInDown.delay(200).duration(1000).springify()}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={'gray'}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View
            className="w-full"
            entering={FadeInDown.delay(400).duration(1000).springify()}>
            <TouchableOpacity className="p-3 bg-sky-400 rounded-2xl mb-3">
              <Text className="text-center text-white text-xl font-bold">
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            className="flex-row justify-center"
            entering={FadeInDown.delay(600).duration(1000).springify()}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('signup')}>
              <Text className="text-sky-600">Signup</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
