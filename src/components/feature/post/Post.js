import React, { useState } from "react";
import { Alert } from "react-native";
import { Text, View, StyleSheet, TextInput, Platform, ToastAndroid } from "react-native";
import FlatButton from "../../shared/Button";
import Firebase from "../../../system/firebase";

function alert(message) {
	if (Platform.OS == "android") {
		ToastAndroid.show(message, ToastAndroid.SHORT);
	} else {
		Alert.alert("Alert", message);
	}
}

function Post({ navigation }) {

	const [caption, setCaption] = useState("");

	const createPost = () => {
		if (caption.length > 0) {
			Firebase().database().ref("posts").push().set({
				caption,
				user_uid: Firebase().auth().currentUser.uid
			}).then((response) => {
				setCaption("");
				navigation.navigate("Feed");
			}).catch((error) => {
				alert("Create post error");
			});
		} else {
			alert("Content length must be greater than 0");
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Post Content
			</Text>
			<TextInput value={caption} onChangeText={(value) => setCaption(value)} style={styles.input} numberOfLines={5} multiline/>
			<View style={styles.spacer}/>
			<View style={{alignSelf: "stretch"}}>
				<FlatButton onPress={createPost} title="Save" fontSize={17}/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		justifyContent: 'flex-start', 
		alignItems: 'flex-start',
		padding: 20,
		backgroundColor: "#fff",
		marginTop: 6,
		marginBottom: 6,
	},
	title: {
		fontFamily: "SegoeUI",
		fontSize: 18
	},
	input: {
		marginTop: 10,
		alignSelf: "stretch",
		borderWidth: 1,
		borderRadius: 7,
		borderColor: "#949494",
		fontSize: 17,
		padding: 14,
		textAlignVertical: 'top'
	},
	spacer: {
		marginTop: 10
	}
});

export default Post;