import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "@app/screens/HomeScreen";
import RunDetailsScreen from "@app/screens/RunDetailsScreen";
import RunScreen from "@app/screens/RunScreen";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    RunDetails: {
      screen: RunDetailsScreen
    },
    Run: {
      screen: RunScreen
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "screen"
  }
);

export default createAppContainer(HomeStack);
