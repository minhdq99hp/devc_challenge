import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Button, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, AntDesign, MaterialIcons, Feather } from '@expo/vector-icons';

// import Masonry from 'react-native-masonry';

const user = {
  name: "Nguyễn Bích Diệp",
  profession: "Recruiter",
  nPhotos: "210",
  nFollowers: "15k",
  nFollowing: "605",

  photos: [
    {
      uri: require("./assets/1.jpg"),
    },
    {
      uri: require("./assets/2.jpg"),
    },
    {
      uri: require("./assets/3.jpg"),
    },
    {
      uri: require("./assets/4.jpg"),
    },
    {
      uri: require("./assets/5.jpg"),
    },
    {
      uri: require("./assets/6.jpg"),
    },
    {
      uri: require("./assets/1.jpg"),
    },
    {
      uri: require("./assets/2.jpg"),
    },
    {
      uri: require("./assets/3.jpg"),
    },
    {
      uri: require("./assets/4.jpg"),
    },
    {
      uri: require("./assets/5.jpg"),
    },
    {
      uri: require("./assets/6.jpg"),
    },
    {
      uri: require("./assets/1.jpg"),
    },
    {
      uri: require("./assets/2.jpg"),
    },
    {
      uri: require("./assets/3.jpg"),
    },
    {
      uri: require("./assets/4.jpg"),
    },
    {
      uri: require("./assets/5.jpg"),
    },
    {
      uri: require("./assets/6.jpg"),
    },
  ]
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Ionicons name="md-arrow-back" size={24} color="black" />
          <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
        </View>
        <View style={styles.userView}>
          <Image style={styles.userAvatar} source={require('./assets/avatar.jpg')}/>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userProfession}>{user.profession}</Text>
            <View style={styles.userButtonView}>
              <TouchableOpacity style={styles.followButton} activeOpacity={.5}>
                <Text style={styles.followButtonText}>Follow</Text>  
              </TouchableOpacity>
              <TouchableOpacity style={styles.messageButton} activeOpacity={.5}>
                <SimpleLineIcons name="paper-plane" size={22} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.userStatsView}>
          <View style={styles.userStatsItemView}>
            <Text style={styles.userStatsText}>{user.nPhotos}</Text>
            <Text style={styles.userStatsLabelText}>Photos</Text>
          </View>
          <View style={styles.userStatsItemView}>
            <Text style={styles.userStatsText}>{user.nFollowers}</Text>
            <Text style={styles.userStatsLabelText}>Followers</Text>
          </View>
          <View style={styles.userStatsItemView}>
            <Text style={styles.userStatsText}>{user.nFollowing}</Text>
            <Text style={styles.userStatsLabelText}>Following</Text>
          </View>
        </View>

        {/* <Masonry
          sorted // optional - Default: false
          columns={2} // optional - Default: 2
          bricks={user.photos.map((photo) => (photo))}
        /> */}

        <View style={styles.photosView}>
          {user.photos.map((photo) => (
            <Image style={styles.photo} source={photo.uri}/>
          ))}
        </View>

        <View style={{height: 120,}}></View>

        
      </ScrollView>
      <View style={styles.footer}>
        <AntDesign name="bars" size={30} color="rgb(51,60,87)" />
        <MaterialIcons name="add-circle-outline" size={30} color="rgb(51,60,87)" />
        <Feather name="user" size={30} color="rgb(51,60,87)" />
      </View>
    </SafeAreaView>
    
  );
}

const marginContainer = 15;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flexGrow: 1,
    marginTop: 50,
    marginRight: marginContainer,
    marginLeft: marginContainer,
    backgroundColor: '#fff',
    justifyContent: "flex-start",
    flexDirection: "column",
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userView:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginTop: 30,
    marginBottom: 30,
  },
  userAvatar:{
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userInfo:{
    flex: 0.95,
    marginLeft: 30,
    justifyContent: "space-between"
  },
  userName:{
    fontSize: 22,
    fontWeight: "bold",
  },
  userProfession:{
    color: "gray",
    marginBottom: 10,
    marginTop: -3,
  },
  userButtonView:{
    flexDirection: "row",
  },
  followButton:{
    flex: 0.6,
    padding: 5,
    borderRadius: 25,
    backgroundColor: "rgb(71,113,246)",
    marginRight: 10,
  },
  followButtonText:{
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  messageButton:{
    flex: 0.35,
    padding: 5,
    borderRadius: 25,
    backgroundColor: "rgb(120,213,250)",
    alignItems: "center",
  },
  userStatsView:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  userStatsItemView:{
    flex: 0.25,
    alignItems: "center",
  },
  userStatsLabelText:{
    color: "gray",
    minWidth: "100%",
    textAlign: "center",
  },
  userStatsText:{
    fontSize: 24,
    minWidth: "100%",
    textAlign: "center",
  },
  footer:{
    height: 45,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
  },
  photosView:{
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  photo:{
    maxWidth: 170,
    margin: 3,
    height: 170, 
  
  }
});

