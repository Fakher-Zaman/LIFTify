import React from 'react';
import { StyleSheet } from 'react-native';

import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Brands from 'react-native-vector-icons/FontAwesome5';
import Home from '../screens/Home';
import Settings from '../screens/Settings';
import Workouts from '../screens/Workouts';
import Nutritions from '../screens/Nutritions';
import Pallete from '../constants/colors';
import { useSelector } from 'react-redux';

const Tab = createBottomTabNavigator();

export default function BottomNavigationBar() {
    const theme = useSelector((state) => state.theme);
    const isDarkMode = theme === 'dark';

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}
            tabBar={({ navigation, state, descriptors, insets }) => (
                <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    activeColor={Pallete.primary}
                    inactiveColor={isDarkMode ? Pallete.darkText : Pallete.charcoal}
                    style={{ backgroundColor: isDarkMode ? Pallete.darkNavBarBackground : Pallete.navBarBackground }}
                    onTabPress={({ route, preventDefault }) => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (event.defaultPrevented) {
                            preventDefault();
                        } else {
                            navigation.dispatch({
                                ...CommonActions.navigate(route.name, route.params),
                                target: state.key,
                            });
                        }
                    }}
                    renderIcon={({ route, focused, color }) => {
                        const { options } = descriptors[route.key];
                        if (options.tabBarIcon) {
                            return options.tabBarIcon({ focused, color, size: 24 });
                        }

                        return null;
                    }}
                    getLabelText={({ route }) => {
                        const { options } = descriptors[route.key];
                        const label =
                            options.tabBarLabel !== undefined
                                ? options.tabBarLabel
                                : options.title !== undefined
                                    ? options.title
                                    : route.title;

                        return label;
                    }}
                />
            )}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="home" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Workouts"
                component={Workouts}
                options={{
                    tabBarLabel: 'Workouts',
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5Brands name="phoenix-framework" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Nutritions"
                component={Nutritions}
                options={{
                    tabBarLabel: 'Nutritions',
                    tabBarIcon: ({ color, size }) => {
                        return <FontAwesome5Brands name="nutritionix" size={size} color={color} />;
                    },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={Settings}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => {
                        return <Icon name="cog" size={size} color={color} />;
                    },
                }}
            />
        </Tab.Navigator>
    );
}
