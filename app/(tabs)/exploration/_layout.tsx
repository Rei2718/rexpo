import { ThemedView } from '@/components_2/core/ThemedView';
import { radii, typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
    createMaterialTopTabNavigator,
    MaterialTopTabBar,
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function ExplorationLayout() {
    const backgroundColor = useThemeColor('backgroundPrimary');
    const textColor = useThemeColor('textPrimary');
    const indicatorColor = useThemeColor('accent');
    const inactivetabBarColor = textColor + '80';
    const inactiveIndicatorColor = textColor + '10';

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <MaterialTopTabs
                    tabBar={props => (
                        <View style={{ backgroundColor }}>
                            <View style={[styles.inactiveIndicator, { backgroundColor: inactiveIndicatorColor }]} />
                            <MaterialTopTabBar {...props} />
                        </View>
                    )}
                    screenOptions={{
                        tabBarStyle: styles.tabBar,
                        tabBarIndicatorStyle: {
                            backgroundColor: indicatorColor,
                            height: 4,
                            borderRadius: radii.pill,
                        },
                        tabBarLabelStyle: styles.tabLabel,
                        tabBarActiveTintColor: textColor,
                        tabBarInactiveTintColor: inactivetabBarColor,
                    }}
                >
                    <MaterialTopTabs.Screen
                        name="index"
                        options={{ title: "🎉  Events" }}
                    />
                    <MaterialTopTabs.Screen
                        name="food"
                        options={{ title: "🍔  Food" }}
                    />
                </MaterialTopTabs>
            </SafeAreaView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    tabBar: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        backgroundColor: 'transparent',
    },
    tabLabel: {
        ...typography.h2,
        fontWeight: 'bold',
        textTransform: 'none',
    },
    inactiveIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 4,
    },
});
