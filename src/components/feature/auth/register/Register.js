import React, { useEffect, useState } from "react";
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
		fontFamily: "SegoeUI"
	},
	spacer: {
		marginBottom: 12
	},
	error: {
		textAlign: "center",
		color: "#9e1e24",
		fontSize: 17,
	},
});

function Register({ navigation }) {

	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [displayName, setDisplayName] = useState("");
	const [password, setPassword] = useState("");
	const [repeatPassword, setRepeatPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		if (Firebase().auth().currentUser != null) {
			navigation.replace("Main");
		}
	});

	const doRegister = () => {
		if (email.length < 6) {
			setErrorMessage("Email length must be greater than 6");
		} else if (username.length < 6) {
			setErrorMessage("Username length must be greater than 6");
		} else if (displayName.length < 6) {
			setErrorMessage("Display name length must be greater than 6");
		} else if (password.length < 6) {
			setErrorMessage("Password length must be greater than 6");
		} else if (repeatPassword.length < 6) {
			setErrorMessage("Password repeat length must be greater than 6");
		} else if (repeatPassword != password) {
			setErrorMessage("Password and repeat password must be same");
		} else {
			Firebase().auth().fetchSignInMethodsForEmail(email).then((signInMethods) => {
				if (signInMethods.length > 0) {
					setErrorMessage("Email has been used by another account");
				} else {
					Firebase().database().ref("users").orderByChild("username").equalTo(username).once('value', (snapshot) => {
						if (snapshot.exists()) {
							setErrorMessage("Username has been used by another account.");
						} else {
							Firebase().auth().createUserWithEmailAndPassword(email, password).then((response) => {
								Firebase().database().ref("users").child(response.user.uid).set({
									display_name: displayName,
									email,
									username
								}).then(() => {
									navigation.replace("Main");
								});
							}).catch((error) => {
								setErrorMessage(error.message);
							});
						}
					})
				}
			}).catch((error) => {
				console.log(error);
			});
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>REGISTER</Text>
			<TextInput placeholder={"Email"} value={email} onChangeText={(value) => setEmail(value)} placeholderTextColor={"#aaa"} style={styles.input}/>
			<TextInput placeholder={"Username"} value={username} onChangeText={(value) => setUsername(value)} placeholderTextColor={"#aaa"} style={styles.input}/>
			<TextInput placeholder={"Display Name"} value={displayName} onChangeText={(value) => setDisplayName(value)} placeholderTextColor={"#aaa"} style={styles.input}/>
			<TextInput placeholder={"Password"} value={password} onChangeText={(value) => setPassword(value)} placeholderTextColor={"#aaa"} style={styles.input} secureTextEntry={true}/>
			<TextInput placeholder={"Repeat Password"} value={repeatPassword} onChangeText={(value) => setRepeatPassword(value)} placeholderTextColor={"#aaa"} style={styles.input} secureTextEntry={true}/>
			<FlatButton radius={1} title="REGISTER" onPress={doRegister} backgroundColor={"#1a5c91"}/>
			<View style={styles.spacer}/>
			<FlatButton radius={1} fontColor={"#000"} title="LOGIN" onPress={() => navigation.replace("Login")} backgroundColor={"#ccc"}/>
			<View style={styles.spacer}/>
			{
				errorMessage.length > 0 ? <Text style={styles.error}>{ errorMessage }</Text> : null
			}
		</View>
	);
}

export default Register;