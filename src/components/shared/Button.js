import React from "react";
import { TouchableOpacity, TouchableNativeFeedback, View, StyleSheet, Text } from "react-native";

function FlatButton({ onPress, style, title, radius, backgroundColor, elevation, fontColor, fontSize, paddingVertical, paddingHorizontal }) {
	const styles = style || StyleSheet.create({
		container: {
			elevation: elevation || 8,
			borderRadius: radius || 3,
			backgroundColor: backgroundColor || "#2196F3",
			paddingVertical: paddingVertical || 10,
			paddingHorizontal: paddingHorizontal || 12
		},
		text: {
			fontSize: fontSize || 14,
			alignSelf: "center",
			color: fontColor || "#fff"
		}
	});

	return (
		<TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={onPress}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
}

export default FlatButton;

// const styles = StyleSheet.create({
// 	appButtonContainer: {
// 		elevation: 8,
// 		backgroundColor: "#2196F3",
// 		borderRadius: 2,
// 		paddingVertical: 10,
// 		paddingHorizontal: 12
// 	},
// 	appButtonText: {
// 		fontSize: 14,
// 		fontFamily: "SegoeUI",
// 		color: "#fff",
// 		alignSelf: "center",
// 	}
// });

// function RippleButton() {
// 	return (
// 		<View>
// 			<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple("#091", false)}>
// 				<View>
// 					<Text style={styles.appButtonText}>{title}</Text>
// 				</View>
// 			</TouchableNativeFeedback>
// 		</View>
// 	);
// }