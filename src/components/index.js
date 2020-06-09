import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  NetInfo,
  Image,
} from "react-native";
import Search from "./search";
import QuickSearch from "./quickSearch";
import { withNavigation } from "react-navigation";
import axios from "axios";

let colors = [
  "#22a6b3",
  "#6ab04c",
  "#16a085",
  "#00cec9",
  "#2c3e50",
  "#ff793f",
  "#227093",
  "#006266",
  "#1289A7",
  "#F97F51",
];
let cardColors = [
  "#ff7675",
  "#e67e22",
  "#636e72",
  "#f9ca24",
  "#b53471",
  "#78e08f",
  "#fdcb6e",
  "#01a3a4",
  "#01a3a4",
  "#78e08f",
  "#0fb9b1",
];
class Main extends Component {
  state = {
    bgImgURL: "",
    travelBgImg: "",
    catsBgImg: "",
    landscapeBgImg: "",
    loveBgImg: "",
    foodBgImg: "",
    bgColor: "",
    connection: true,
    isLoading: false,
  };

  connCheck = () => {
    NetInfo.isConnected.fetch().then((isConnected) => {
      this.setState({ connection: isConnected ? true : false });
    });

    handleFirstConnectivityChange = (isConnected) => {
      if (isConnected) {
        this.getBgImg();
        this.setState({ connection: true });
      } else {
        this.setState({
          connection: false,
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
      header = {
        headers: {
          Authorization:
            "Client-ID 8d50a0bbf2407a181e3ad213d7ae31d70e8ff2b91321f3288bcbe7473e275e4f",
        },
      };
      await axios
        .all([
          axios.get("https://api.unsplash.com/photos/random", header),
          axios.get(
            "https://api.unsplash.com/photos/random?query=travel",
            header
          ),
          axios.get(
            "https://api.unsplash.com/photos/random?query=love",
            header
          ),
          axios.get(
            "https://api.unsplash.com/photos/random?query=cats",
            header
          ),
          axios.get(
            "https://api.unsplash.com/photos/random?query=landscape",
            header
          ),
          axios.get(
            "https://api.unsplash.com/photos/random?query=food",
            header
          ),
        ])
        .then(
          axios.spread((rand, travel, love, cats, landscape, food) => {
            var min = 0;
            var max = colors.length;
            var randomIndex = Math.floor(Math.random() * (+max - +min)) + +min; //we only need index from 0-5

            this.setState({
              bgImgURL: rand.data.urls.regular,
              travelBgImg: travel.data.urls.regular,
              loveBgImg: love.data.urls.regular,
              catsBgImg: cats.data.urls.regular,
              landscapeBgImg: landscape.data.urls.regular,
              foodBgImg: food.data.urls.regular,
              bgColor: colors[randomIndex],
              isLoading: false,
            });
          })
        );
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <Search
              img={this.state.bgImgURL}
              bgColor={
                cardColors[
                  Math.floor(Math.random() * (+cardColors.length - +0)) + +0
                ]
              }
            />

            <View
              style={{
                backgroundColor:
                  colors[
                    Math.floor(Math.random() * (+cardColors.length - +0)) + +0
                  ],
              }}
            >
              <Text style={styles.quickSearchText}> Quick Search </Text>

              <View
                style={{
                  paddingBottom: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <QuickSearch
                  category="Travel"
                  bgColor={
                    cardColors[
                      Math.floor(Math.random() * (+cardColors.length - +0)) + +0
                    ]
                  }
                  image={this.state.travelBgImg}
                />
                <QuickSearch
                  category="Love"
                  bgColor={
                    cardColors[
                      Math.floor(Math.random() * (+cardColors.length - +0)) + +0
                    ]
                  }
                  image={this.state.loveBgImg}
                />
                <QuickSearch
                  category="Cats"
                  bgColor={
                    cardColors[
                      Math.floor(Math.random() * (+cardColors.length - +0)) + +0
                    ]
                  }
                  image={this.state.catsBgImg}
                />
                <QuickSearch
                  category="Landscape"
                  bgColor={
                    cardColors[
                      Math.floor(Math.random() * (+cardColors.length - +0)) + +0
                    ]
                  }
                  image={this.state.landscapeBgImg}
                />
                <QuickSearch
                  category="Food"
                  bgColor={
                    cardColors[
                      Math.floor(Math.random() * (+cardColors.length - +0)) + +0
                    ]
                  }
                  image={this.state.foodBgImg}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quickSearch: {
    flex: 1,
    flexDirection: "row",
  },
  loader: {
    height: "100%",
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
  },
  quickSearchText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif-thin",
    color: "white",
    paddingVertical: 20,
    textAlign: "center",
  },
  noData: {
    flex: 1,
    paddingTop: 300,
    paddingBottom: 300,
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    color: "white",
    fontSize: 20,
    fontFamily: "sans-serif-thin",
  },
});

export default withNavigation(Main);
