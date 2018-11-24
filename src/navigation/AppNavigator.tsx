import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "@app/screens/HomeScreen";
import RunDetailsScreen from "@app/screens/RunDetailsScreen";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    RunDetails: {
      screen: RunDetailsScreen
    }
  },
  {
    initialRouteName: "Home",
    headerMode: "screen"
  }
);

export default createAppContainer(HomeStack);
