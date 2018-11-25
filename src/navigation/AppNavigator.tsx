import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "@app/screens/HomeScreen";
import RunDetailsScreen from "@app/screens/RunDetailsScreen";
import RunScreen from "@app/screens/RunScreen";
import SummaryScreen from "@app/screens/SummaryScreen";
// import { availableRuns } from "@app/data";

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
    },
    Summary: {
      screen: SummaryScreen
    }
  },
  {
    initialRouteName: "Home",
    // initialRouteParams: { run: availableRuns[0] },
    headerMode: "screen"
  }
);

export default createAppContainer(HomeStack);
