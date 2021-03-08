import React from "react";
import { View, StyleSheet } from "react-native";
import FlatButton from "../../shared/Button";
import Firebase from "../../../system/firebase";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-end",
		padding: 15
	}
});

function Account({ navigation }) {

	const doLogout = () => {
		Firebase().auth().signOut().then(() => {
			navigation.replace("Login");
		});
	};

	return (
		<View style={styles.container}>
			<FlatButton onPress={doLogout} title="Logout" fontSize={15} backgroundColor={"#cf1e0e"} radius={5}/>
		</View>
	);
}

export default Account;