import React from "react";
import Post from "../feature/post/Post";
import Feed from "../feature/feeds/Feed";
import Account from "../feature/account/Account";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

function screenOptions({ route }){
	return {
		tabBarIcon: ({ focused, color, size }) => {
			let iconName;
			let iconType;

			if (route.name === 'Feed') {
				iconType = "ionicon";
				iconName = focused ? 'home-sharp' : 'home-outline';
			} else if (route.name === 'Post') {
				iconType = "ionicon";
				iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
			} else if (route.name == 'Account') {
				iconType = "ionicon";
				iconName = focused ? 'person-sharp' : 'person-outline';
			}

			return <Icon name={iconName} type={iconType} size={size} color={color} />;
		},
	};
}

function tabBarOptions(){
	return {
		activeTintColor: 'tomato',
		inactiveTintColor: 'gray',
		showLabel: false
	};
}

function BottomBar() {

	// const tabBarOptions = {
	// 	activeTintColor: 'tomato',
	// 	inactiveTintColor: 'gray',
	// 	showLabel: false
	// };

	return (
		<Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions()}>
			<Tab.Screen name="Feed" component={Feed} />
			<Tab.Screen name="Post" component={Post} />
			<Tab.Screen name="Account" component={Account} />
		</Tab.Navigator>
	);
}

export default BottomBar;