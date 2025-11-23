import { typography } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { StyleSheet } from 'react-native';
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

    return (
        <SafeAreaView style={[styles.container, { backgroundColor }]} edges={['top']}>
            <MaterialTopTabs
                screenOptions={{
                    tabBarStyle: [styles.tabBar, { backgroundColor }],
                    tabBarIndicatorStyle: {
                        backgroundColor: indicatorColor,
                    },
                    tabBarLabelStyle: styles.tabLabel,
                    tabBarActiveTintColor: textColor,
                    tabBarInactiveTintColor: textColor + '80',
                }}
            >
                <MaterialTopTabs.Screen
                    name="index"
                    options={{ title: "🎉 Events" }}
                />
                <MaterialTopTabs.Screen
                    name="food"
                    options={{ title: "🍔 Food" }}
                />
            </MaterialTopTabs>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tabBar: {
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    tabLabel: {
        ...typography.h3,
        fontWeight: 'bold',
        textTransform: 'none',
    },
});
