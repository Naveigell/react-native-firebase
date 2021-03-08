import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Card } from "react-native-elements";
import { Icon } from 'react-native-elements';
import FlatButton from "../../shared/Button";
import Firebase from "../../../system/firebase";

const styles = StyleSheet.create({
	item: {
		margin: 4,
		elevation: 0,
		marginBottom: 3
	},
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	contentContainer: {
		marginTop: 15
	},
	buttonGroup: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	spacer: {
		margin: 4
	}
});

function ButtonGroup({ setEditModalVisible, setDeleteModalVisible, content, setContent, id, setId }) {

	function openModal(modalVisible) {
		modalVisible(true);
		setId(id);
		setContent(content);
	}

	return (
		<View style={styles.buttonGroup}>
			<FlatButton onPress={() => openModal(setEditModalVisible)} title="Update" paddingVertical={5} fontSize={12} backgroundColor="#faa307"/>
			<View style={styles.spacer}/>
			<FlatButton onPress={() => openModal(setDeleteModalVisible)} title="Delete" paddingVertical={5} fontSize={12} backgroundColor="#c81d25"/>
		</View>
	);
}

function touchable() {
	return <TouchableOpacity activeOpacity={0.6}>
		<Icon name='ellipsis-vertical' type='ionicon' size={19}/>
	</TouchableOpacity>
}

function FeedItem({ index, setEditModalVisible, setDeleteModalVisible, setContent, setId, item }) {
	// console.log(item);
	return (
		<Card containerStyle={styles.item}>
			<View style={styles.container}>
				<Text style={{fontFamily: "SegoeUI"}}>{item.user.username}</Text>
				{
					Firebase().auth().currentUser.uid == item.user_uid ? <ButtonGroup id={item.id} setId={setId} content={item.caption} setContent={setContent} setDeleteModalVisible={setDeleteModalVisible} setEditModalVisible={setEditModalVisible}/> : null
				}
				
			</View>
			<View style={styles.contentContainer}>
				<Text>
					{ item.caption }
				</Text>
			</View>
		</Card>
	);
}

export default FeedItem;