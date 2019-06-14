import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  NetInfo,
  Image
} from "react-native";
import Search from "./search";
import QuickSearch from "./quickSearch";
import { withNavigation } from "react-navigation";
import { Pulse } from "react-native-loader";
import axios from "axios";

let colors = ["#22a6b3", "#6ab04c", "#16a085", "#2c3e50", "#006266", "#F97F51"];
class Main extends Component {
  state = {
    bgImgURL: "",
    travelBgImg: "",
    catsBgImg: "",
    landscapeBgImg: "",
    foodBgImg: "",
    bgColor: "",
    connection: null,
    isLoading: true
  };

  connCheck = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({ connection: isConnected ? true : false });
    });

    handleFirstConnectivityChange = isConnected => {
      if (isConnected) {
        this.getBgImg();
        this.setState({ connection: true });
      } else {
        this.setState({
          connection: false
        });
      }
    };

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      handleFirstConnectivityChange
    );
  };

  getBgImg = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          headers: {
            Authorization:
              "Client-ID 8d50a0bbf2407a181e3ad213d7ae31d70e8ff2b91321f3288bcbe7473e275e4f"
          }
        }
      );
      const travelBgImg = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { query: "travel" },
          headers: {
            Authorization:
              "Client-ID 8d50a0bbf2407a181e3ad213d7ae31d70e8ff2b91321f3288bcbe7473e275e4f"
          }
        }
      );
      const catsBgImg = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { query: "cat" },
          headers: {
            Authorization:
              "Client-ID 8d50a0bbf2407a181e3ad213d7ae31d70e8ff2b91321f3288bcbe7473e275e4f"
          }
        }
      );
      const landscapeBgImg = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { query: "landscape" },
          headers: {
            Authorization:
              "Client-ID 8d50a0bbf2407a181e3ad213d7ae31d70e8ff2b91321f3288bcbe7473e275e4f"
          }
        }
      );
      const foodBgImg = await axios.get(
        "https://api.unsplash.com/photos/random",
        {
          params: { query: "food" },
          headers: {
            Authorization:
              "Client-ID 8d50a0bbf2407a181e3ad213d7ae31d70e8ff2b91321f3288bcbe7473e275e4f"
          }
        }
      );

      var min = 0;
      var max = 5;
      var randomIndex = Math.floor(Math.random() * (+max - +min)) + +min; //we only need index from 0-5

      this.setState({
        bgImgURL: response.data.urls.regular,
        travelBgImg: travelBgImg.data.urls.regular,
        catsBgImg: catsBgImg.data.urls.regular,
        landscapeBgImg: landscapeBgImg.data.urls.regular,
        foodBgImg: foodBgImg.data.urls.regular,
        bgColor: colors[randomIndex],
        isLoading: false
      });
    } catch (err) {
      console.log("error ", err.message);
    }
  };

  componentDidMount() {
    this.getBgImg();
    this.connCheck();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden />

        {!this.state.connection ? (
          <View style={styles.noData}>
            <Image
              source={require("../assets/noInternet.gif")}
              style={{ height: 150, width: "100%" }}
              resizeMode="contain"
            />
            <Text style={styles.noDataText}>No internet</Text>
          </View>
        ) : (
          <View>
            {this.state.isLoading && (
              <View style={styles.loader}>
                <Pulse size={100} color="white" />
              </View>
            )}

            {!this.state.isLoading && (
              <View>
                <Search img={this.state.bgImgURL} />

                <View style={{ backgroundColor: this.state.bgColor }}>
                  <Text style={styles.quickSearchText}> Quick Search </Text>

                  <View style={{ paddingBottom: 20 }}>
                    <QuickSearch
                      catagory="Travel"
                      image={this.state.travelBgImg}
                    />
                    <QuickSearch catagory="Cats" image={this.state.catsBgImg} />
                    <QuickSearch
                      catagory="Landscape"
                      image={this.state.landscapeBgImg}
                    />
                    <QuickSearch catagory="Food" image={this.state.foodBgImg} />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quickSearch: {
    flex: 1,
    flexDirection: "row"
  },
  loader: {
    height: "100%",
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center"
  },
  quickSearchText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif-thin",
    color: "white",
    paddingVertical: 20,
    textAlign: "center"
  },
  noData: {
    flex: 1,
    paddingTop: 300,
    paddingBottom: 300,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center"
  },
  noDataText: {
    color: "white",
    fontSize: 20,
    fontFamily: "sans-serif-thin"
  }
});

export default withNavigation(Main);
