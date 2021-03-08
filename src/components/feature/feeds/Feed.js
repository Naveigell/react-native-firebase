import React, { Fragment, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import FeedItem from "./FeedItem";
import { EditModal, DeleteModal } from "../../shared/Modal";
import Firebase from "../../../system/firebase";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 30,
		height: 44,
		borderWidth: 1,
		margin: 10
	},
});

const styles1 = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: 'rgba(52, 52, 52, 0.8)'
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
	  	backgroundColor: "#F194FF",
	},
	buttonClose: {
	  	backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});

const test = [
	{username: 'Devyin', caption: 'urna qeet nisi erat tempus erat.'},
	{username: 'Dan', caption: 'urna quis porta fringilla, quam augue laoreet ligula, quis laoreet nisi erat tempus erat.'},
	{username: 'Dominic', caption: 'urna qungilla, quam augue laoreet ligula, quis laoreet nisi erat tempus erat.'},
	{username: 'Jackson', caption: 'urna quis porta fringilla, quam augue laoreet ligula, quispus erat.'},
	{username: 'James', caption: 'urorta fringilla, quam augue laoreet ligula, quis laoreet nis tempus erat.'},
	{username: 'Joel', caption: 'uruis laoreet nisi erat tempus erat.'},
	{username: 'John', caption: 's porta fringilla, quam augue laoreet ligula, quis laoreet nisi erat tempus erat.'},
	{username: 'Jillian', caption: 'urna quis porta fringilla, quam augue laorula, quisi erat tempus erat.'},
	{username: 'Jimmy', caption: 'urna quis porta fisi erat tempus erat.'},
	{username: 'Julie', caption: 'urn augue laoreet ligula, quis laoreet nisi erat tem'},
];

function Feed(){
	const editModal = useRef();
	const deleteModal = useRef();

	const [editModalVisible, setEditModalVisible] = useState(false);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [content, setContent] = useState("");
	const [id, setId] = useState("");
	const [data, setData] = useState([]);
	const [didMount, setDidMount] = useState(false); 

	useEffect(() => {
		let isRendered = true;
		if (isRendered) {
			const database = Firebase().database();
			database.ref("posts").on('value', (snapshot) => {
				let collections = [];
				let data = [];

				if (snapshot != undefined) {
					snapshot.forEach((child) => {
						let obj = {
							id: child.key,
							...child.val()
						};
						collections.push(obj);
					});
		
					for (const collection of collections) {
						database.ref("users").child(collection.user_uid).once('value', (child) => {
							collection.user = child.val();
							data.push(collection);
						}).then(() => {
							if (isRendered) {
								setData(data);
							}
						});
					}
				}
			});
		}
		
		return () => {
			isRendered = false;
		};
	}, []);

	return (
		<Fragment>
			<EditModal id={id} innerRef={editModal} setContent={setContent} content={content} visible={editModalVisible} setVisible={setEditModalVisible}/>
			<DeleteModal id={id} innerRef={deleteModal} content={content} visible={deleteModalVisible} setVisible={setDeleteModalVisible}/>
			<FlatList
				keyExtractor={(item, index) => index.toString()}
				data={data}
				renderItem={({item, index}) => <FeedItem item={item} setId={setId} setContent={setContent} key={index} setDeleteModalVisible={setDeleteModalVisible} setEditModalVisible={setEditModalVisible} index={index}/>}
			/>
		</Fragment>
	);
}

export default Feed;