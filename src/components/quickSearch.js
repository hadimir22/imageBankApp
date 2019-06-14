import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from "react-native";
import { withNavigation } from "react-navigation";

class QuickSearch extends Component {
  constructor(props) {
    super(props);
  }

  handleQuickSearch = term => {
    this.props.navigation.navigate("SearchResults", {
      term: term
    });
  };

  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.main}
        onPress={() => this.handleQuickSearch(this.props.catagory)}
      >
        <ImageBackground
          source={{ uri: this.props.image }}
          style={styles.image}
          imageStyle={{ borderRadius: 15, opacity: 0.8 }}
          resizeMode="cover"
        >
          <View style={styles.catagoryView}>
            <Text style={styles.catagory}>{this.props.catagory}</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    marginHorizontal: 20,
    marginVertical: 15
  },
  image: {
    width: "100%",
    height: 60
  },

  catagoryView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  catagory: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "monospace",
    color: "white",
    padding: 20,
    opacity: 1
  }
});

export default withNavigation(QuickSearch);
