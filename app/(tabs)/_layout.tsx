import { Tabs } from 'expo-router';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import { Colors } from '@/constants/Colors';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="home" color={Colors.dark.icon} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="heart" color={Colors.dark.icon} />,
        }}
      />
    </Tabs>
  );
}
