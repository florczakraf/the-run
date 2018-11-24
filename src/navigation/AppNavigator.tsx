import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "@app/screens/HomeScreen";
import RunDetailsScreen from "@app/screens/RunDetailsScreen";
import RunScreen from "@app/screens/RunScreen";
import { availableRuns } from "@app/data";

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
    initialRouteParams: { run: availableRuns[0] },
    headerMode: "screen"
  }
);

export default createAppContainer(HomeStack);
