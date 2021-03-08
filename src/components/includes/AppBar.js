import React from "react";
import { Text, View, StatusBar, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import STATUS_BAR_HEIGHT from "../../helpers/status_bar";

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff',
		height: 55,
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity:  0.4,
		shadowRadius: 3,
		elevation: 5
	},
	header: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingLeft: 9,
		paddingRight: 9
	},
	title: {
		fontSize: 18,
		marginLeft: 5
	}
});

function AppBar(){
	return (
		<View style={{ overflow: 'hidden', paddingBottom: 1, marginTop: STATUS_BAR_HEIGHT }}>
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={{flex: 1}}>
						<TouchableOpacity activeOpacity={0.6}>
							<Icon name='bars' type='font-awesome'/>
						</TouchableOpacity>
					</View>
					<View style={{flex: 6}}>
						<Text style={styles.title}>
							React Native Firebase
						</Text>
					</View>
					<View>
						<TouchableOpacity activeOpacity={0.6}>
							<Icon name='ellipsis-vertical' type='ionicon' size={25}/>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
}

export default AppBar;