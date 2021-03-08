import React from 'react';
import { StyleSheet, Text, LogBox } from 'react-native';
import Route from './routes';
import { useFonts } from "@use-expo/font";

const customFonts = {
	SegoeUI: require("./src/assets/fonts/Segoe-UI-Bold.ttf"),
};

export default function App() {

	LogBox.ignoreLogs(['Setting a timer']);
	const [isLoaded] = useFonts(customFonts);

    if (!isLoaded) {
        return <Text>Loading</Text>;
    }

	return (
		<Route/>
	);
}

const styles = StyleSheet.create({
	container: {
		
	},
});
