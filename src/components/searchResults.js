import React, { Component } from "react";
import {
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { withNavigation } from "react-navigation";
import axios from "axios";
import { Pulse } from "react-native-loader";

let page = 1;

class SearchResults extends Component {
  state = {
    images: [],
    isLoading: true,
  };

  getImages = async (page = 1) => {
    const { navigation } = this.props;
    const term = navigation.getParam("term");

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: term, page: page, per_page: 20 },
          headers: {
            Authorization:
              "Client-ID 8d50a0bbf2407a181e3ad213d7ae31d70e8ff2b91321f3288bcbe7473e275e4f",
          },
        }
      );

      this.setState({
        images: [...this.state.images, ...response.data.results],
        isLoading: false,
      });
    } catch (err) {
      console.log("error ", err);
    }
  };

  getMore = () => {
    page++;
    this.getImages(page);
  };

  download = (item) => {
    this.props.navigation.navigate("Download", { item: item });
  };

  componentDidMount() {
    this.getImages();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.isLoading && (
          <View style={styles.loader}>
            <Pulse size={100} color="white" />
          </View>
        )}

        {!this.state.isLoading && (
          <FlatList
            style={{ backgroundColor: "#576574" }}
            data={this.state.images}
            keyExtractor={(item) => item.id}
            numColumns={2}
            onEndReached={() => {
              this.getMore();
            }}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.list}
                onPress={() => this.download(item)}
              >
                <Image
                  key={item.id}
                  source={{ uri: item.urls.small }}
                  style={styles.img}
                />
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.noData}>
                <Image
                  source={require("../assets/noImg.gif")}
                  style={styles.img}
                  resizeMode="contain"
                />
                <Text style={styles.noDataText}>
                  Sorry, nothing found, Try something else
                </Text>
              </View>
            }
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    height: "100%",
    backgroundColor: "#2c3e50",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    flex: 1,
  },
  noData: {
    flex: 1,
    paddingTop: 300,
    paddingBottom: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  noDataText: {
    color: "white",
    fontSize: 20,
    fontFamily: "sans-serif-thin",
  },
  img: { height: 150, width: "100%" },
});

export default withNavigation(SearchResults);
