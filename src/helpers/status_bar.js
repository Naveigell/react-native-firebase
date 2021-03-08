import { Platform, StatusBar } from "react-native";

const STATUS_BAR_HEIGHT = Platform.OS == 'ios' ? 20 : StatusBar.currentHeight;

export default STATUS_BAR_HEIGHT;