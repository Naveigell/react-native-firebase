import React from "react";
import { Modal as BaseModal, StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, TextInput } from "react-native";
import FlatButton from "../shared/Button";
import Firebase from "../../system/firebase";

export function EditModal({ visible, innerRef, setVisible, title, content, setContent, id }) {

	const onUpdate = () => {
		Firebase().database().ref("posts").child(id).update({
			"caption": content
		});
		setVisible(false);
	};

	return (
		<View>
			<BaseModal visible={visible} ref={innerRef} transparent={true} animationType="fade">
				<TouchableOpacity style={editStyles.centeredView} onPress={() => setVisible(false)} activeOpacity={1}>
					<TouchableWithoutFeedback style={{height: "100%"}}>
						<View style={editStyles.modalView}>
							<Text style={editStyles.title}>{ title || "Edit Content" }</Text>
							<TextInput onChangeText={(value) => setContent(value)} style={editStyles.input} value={content} autoFocus={true}></TextInput>
							<View style={editStyles.buttonGroupContainer}>
								<FlatButton onPress={onUpdate} title="Save" paddingVertical={5} fontSize={15} backgroundColor="#faa307"/>
								<View style={editStyles.spacer}/>
								<FlatButton title="Cancel" paddingVertical={5} fontSize={15} backgroundColor="#c2c2c2" onPress={() => setVisible(false)}/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</TouchableOpacity>
			</BaseModal>
		</View>
  	);
};

export function DeleteModal({ visible, innerRef, setVisible, title, content, id }) {

	const onDelete = () => {
		Firebase().database().ref("posts").child(id).remove();
		setVisible(false);
	};

	return (
		<View>
			<BaseModal visible={visible} ref={innerRef} transparent={true} animationType="fade">
				<TouchableOpacity style={deleteStyles.centeredView} onPress={() => setVisible(false)} activeOpacity={1}>
					<TouchableWithoutFeedback style={{height: "100%"}}>
						<View style={deleteStyles.modalView}>
							<Text style={deleteStyles.title}>{ title || "Delete Content" }</Text>
							<Text style={deleteStyles.description}>
								{ content }
							</Text>
							<View style={deleteStyles.buttonGroupContainer}>
								<FlatButton onPress={onDelete} title="Delete" paddingVertical={5} fontSize={15} backgroundColor="#c81d25"/>
								<View style={deleteStyles.spacer}/>
								<FlatButton title="Cancel" paddingVertical={5} fontSize={15} backgroundColor="#c2c2c2" onPress={() => setVisible(false)}/>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</TouchableOpacity>
			</BaseModal>
		</View>
  	);
}

const deleteStyles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	},
	modalView: {
		margin: 20,
		alignSelf: "stretch",
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	title: {
		fontSize: 20,
		fontWeight: "bold"
	},
	description: {
		marginTop: 20
	},
	buttonGroupContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 20
	},
	spacer: {
		margin: 4
	}
});

const editStyles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(0, 0, 0, 0.7)'
	},
	modalView: {
		margin: 20,
		alignSelf: "stretch",
		backgroundColor: "#fff",
		borderRadius: 8,
		padding: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	title: {
		fontSize: 16,
		fontWeight: "bold"
	},
	input: {
		borderColor: "#dedede",
		borderWidth: 1,
		borderRadius: 3,
		marginTop: 10,
		fontSize: 17,
		padding: 8
	},
	buttonGroupContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		marginTop: 10
	},
	
	spacer: {
		margin: 4
	}
});