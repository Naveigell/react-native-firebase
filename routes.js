import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/components/feature/auth/login/Login";
import Register from "./src/components/feature/auth/register/Register";
import Main from "./src/components/layouts/Main";

const Stack = createStackNavigator();

const navigationOption = {
	animationEnabled: false
};

function Route(){
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="LoginActivity" screenOptions={{headerShown: false}}>
				<Stack.Screen name="Login" options={navigationOption} component={Login}></Stack.Screen>
				<Stack.Screen name="Register" options={navigationOption} component={Register}></Stack.Screen>
				<Stack.Screen name="Main" component={Main}></Stack.Screen>
			</Stack.Navigator>
		</NavigationContainer>
		// <Main/>
	);
}	

export default Route;
