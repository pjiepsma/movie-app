import {Tabs} from 'expo-router';
import React from 'react';
import {Ionicons} from "@expo/vector-icons";
import {Colors} from '@/constants/Colors';

const TabLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: () => <Ionicons size={28} name="home" color={Colors.dark.icon}/>,
                }}
            />
        </Tabs>
    );
}

export default TabLayout;
