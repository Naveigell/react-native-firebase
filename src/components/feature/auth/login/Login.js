import React, { useState, useEffect } from "react";
import { Text, TextInput, View, StyleSheet } from "react-native";
import STATUS_BAR_HEIGHT from "../../../../helpers/status_bar";
import FlatButton from "../../../shared/Button";

import Firebase from "../../../../system/firebase";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginTop: STATUS_BAR_HEIGHT,
		padding: 20,
		backgroundColor: "#00222e",
		// backgroundColor: "#18222e",
		// #00222e
	},
	input: {
		backgroundColor: "#253547",
		color: "#fff",
		paddingTop: 9,
		paddingBottom: 9,
		paddingLeft: 14,
		paddingRight: 14,
		marginBottom: 12
	},
	title: {
		textAlign: "center",
		marginBottom: 40,
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold",
	},
	spacer: {
		marginBottom: 12
	},
	error: {
		textAlign: "center",
		color: "#9e1e24",
		fontSize: 17,
	}
});

function Login({ navigation }) {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (Firebase().auth().currentUser != null) {
			navigation.replace("Main");
		}
	});

	const doLogin = () => {

		if (email.length < 6) {
			setErrorMessage("Email length must be greater than 6");
		} else if (password.length < 6) {
			setErrorMessage("Password length must be greater than 6");
		} else {
			Firebase().auth().signInWithEmailAndPassword(email, password).then((user) => {
				navigation.replace("Main");
			}).catch((error) => {
				setErrorMessage(error.message);
			});
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>LOGIN</Text>
			<TextInput placeholder={"Email"} autoCompleteType={"email"} value={email} onFocus={() => setErrorMessage("")} onChangeText={(value) => setEmail(value)} placeholderTextColor={"#aaa"} style={styles.input}/>
			<TextInput placeholder={"Password"} secureTextEntry={true} value={password} onFocus={() => setErrorMessage("")} onChangeText={(value) => setPassword(value)} placeholderTextColor={"#aaa"} style={styles.input}/>
			<FlatButton radius={1} title="LOGIN" onPress={doLogin} backgroundColor={"#1a5c91"}/>
			<View style={styles.spacer}/>
			<FlatButton radius={1} fontColor={"#000"} title="REGISTER" onPress={() => navigation.replace("Register")} backgroundColor={"#ccc"}/>
			<View style={styles.spacer}/>
			{
				errorMessage.length > 0 ? <Text style={styles.error}>{ errorMessage }</Text> : null
			}
		</View>
	);
}

export default Login;