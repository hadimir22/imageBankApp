import React, { Component } from "react";
import {
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { withNavigation } from "react-navigation";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }
  handleClick = () => {
    this.props.navigation.navigate("SearchResults", {
      term: this.state.text,
    });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <ImageBackground
          source={{
            uri: this.props.img,
          }}
          style={{
            width: "100%",
            height: 300,
            backgroundColor: this.props.bgColor,
          }}
          resizeMode="cover"
        >
          <View style={styles.logoView}>
            <Icon name="camera" color="white" size={20} />
            <Text style={styles.logo}>Image Bank</Text>
          </View>
          <View style={styles.searchView}>
            <TextInput
              style={styles.searchBox}
              onChangeText={(text) => this.setState({ text })}
              value={this.state.text}
              enablesReturnKeyAutomatically={true}
              onSubmitEditing={this.handleClick}
              placeholder="Search "
            />
            <TouchableOpacity
              style={styles.searchBtn}
              onPress={this.handleClick}
              activeOpacity={0.8}
            >
              <Icon name="search" size={25} color="teal" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  logoView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  logo: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    paddingLeft: 8,
  },
  searchView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBox: {
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 50,
    backgroundColor: "white",
    fontFamily: "sans-serif",
    color: "#34495e",
    height: 40,
    width: 300,
  },
  searchText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    color: "white",
    padding: 20,
  },
  searchBtn: {
    position: "absolute",
    right: 65,
    top: 125,
  },
});

export default withNavigation(Search);
