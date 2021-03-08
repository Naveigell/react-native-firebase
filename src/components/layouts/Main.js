import React, { Fragment } from "react";
import { Text, View } from "react-native";
import AppBar from "../includes/AppBar";
import BottomBar from "../includes/BottomBar";

function Main() {

	return (
		<Fragment>
			<AppBar/>
			<BottomBar/>
		</Fragment>
	);
}

export default Main;