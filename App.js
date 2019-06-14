import Main from "./src/components/index";
import SearchResults from "./src/components/searchResults";
import Download from "./src/components/download";
import { createStackNavigator, createAppContainer } from "react-navigation";

const StackNav = createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },

    SearchResults: {
      screen: SearchResults,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },

    Download: {
      screen: Download,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }
  },
  {
    initialRouteName: "Main"
  }
);

export default createAppContainer(StackNav);
