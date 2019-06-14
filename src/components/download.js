import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  ActivityIndicator
} from "react-native";
import { withNavigation } from "react-navigation";
import { Pulse } from "react-native-loader";
import RNFetchBlob from "rn-fetch-blob";

class Download extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false,
      btnText: "Download",
      btnColor: "teal",
      item: "",
      data: "",
      isLoading: true
    };
  }

  saveImage = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Permission to save images",
          message:
            "Cool Photo App needs access to your storage " +
            "so you can save awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the storage");
      } else {
        console.log("storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  download = () => {
    this.setState({ downloading: true, btnText: "Downloading" });
    let url = this.state.item.links.download;
    var date = new Date();
    const { config, fs } = RNFetchBlob;
    let dir = fs.dirs.PictureDir;

    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          dir +
          "/image_" +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ".png",
        description: "Image"
      }
    };
    config(options)
      .fetch("GET", url)
      .then(res => {
        console.log("Success Downloaded");

        ToastAndroid.show("Downloaded", ToastAndroid.SHORT);
        this.setState({
          downloading: false,
          btnText: "Download",
          btnColor: "teal"
        });
      })
      .catch(err => {
        ToastAndroid.show("someting went wrong!", ToastAndroid.SHORT);
      });
  };

  componentDidMount() {
    const { navigation } = this.props;
    const item = navigation.getParam("item");
    this.setState({ item: item, isLoading: false }, () => {
      console.log("item is", this.state.item);
    });
    this.saveImage();
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
          <View style={styles.main}>
            <Image
              source={{ uri: this.state.item.urls.regular }}
              style={{
                height: "80%",
                width: "80%",
                borderRadius: 15
              }}
              resizeMode="contain"
            />

            <Text style={{ color: "white" }}>
              Photo by: {this.state.item.user.first_name} on Unsplash{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.btn, { backgroundColor: this.state.btnColor }]}
              onPress={this.download}
            >
              <Text
                style={{
                  color: "white",
                  fontFamily: "sans-serif-thin",
                  paddingRight: 10
                }}
              >
                {this.state.btnText}
              </Text>
              {this.state.downloading && <ActivityIndicator color="white" />}
            </TouchableOpacity>
          </View>
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
    alignItems: "center"
  },
  main: {
    flex: 1,
    backgroundColor: "#576574",
    justifyContent: "center",
    alignItems: "center",
    color: "white"
  },
  btn: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    paddingHorizontal: 80,
    paddingVertical: 20,
    borderRadius: 15
  }
});

export default withNavigation(Download);
