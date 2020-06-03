import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { withNavigation } from "react-navigation";

class QuickSearch extends Component {
  constructor(props) {
    super(props);
    state = {
      bgColor: this.props.bgColor,
    };
  }

  handleQuickSearch = (term) => {
    this.props.navigation.navigate("SearchResults", {
      term: term,
    });
  };

  render() {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.main]}
          onPress={() => this.handleQuickSearch(this.props.category)}
        >
          <View
            style={{
              backgroundColor: this.props.bgColor,
              borderRadius: 10,
              padding: 30,
              width: 200,
            }}
          >
            <Text style={styles.category}>{this.props.category}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.handleQuickSearch(this.props.category)}
          style={styles.imgStyle}
        >
          <ImageBackground
            source={{ uri: this.props.image }}
            style={styles.image}
            imageStyle={{ borderRadius: 15 }}
            resizeMode="cover"
          ></ImageBackground>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginVertical: 35,
  },
  image: {
    width: 100,
    height: 100,
  },

  categoryView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  category: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "monospace",
    color: "#2d3436",
    opacity: 1,
  },
  imgStyle: {
    position: "absolute",
    top: 60,
    right: -30,
  },
});

export default withNavigation(QuickSearch);
