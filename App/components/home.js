/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  View,
  AlertIOS,
  AsyncStorage
} from 'react-native';
import Communications from 'react-native-communications';

import Nav from './global-widgets/nav'
import SwipeCards from 'react-native-swipe-cards';
import Icon from 'react-native-vector-icons/Ionicons';
const labels = ["distance","name","phone","address","id","photo_url"]

var json_data;
var data;
var temp = []
var q = 0
function getMoviesFromApiAsync(url1) {
    console.log("URL TRACE:",url1)
    return fetch(url1)
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson.restaurants;
        for(var i in data)
        {
          var c = 0
          var prep = []
          for(var j in data[i]){
            var sla = labels[c]
            prep[sla] = data[i][j]
            //prep.push({key: labels[c], value: data[i][j]})
            c++
          }
          q = q + 1
        temp.push(prep)
      }
        console.log("Temp", temp)
      })
      .catch((error) => {
        console.error(error);
      });
}



export default class Home extends Component {
  constructor(props){
    super(props)
    //getMoviesFromApiAsync()
    this.state = {
      restaurants_data: null,
      initialPosition: 'unknown',
    }

    console.log("DATA",this.state.restaurants_data)

  }

  Card(x){
    console.log("Card data",x)

    return (
      <View style={styles.card}>
        <Image source = {{uri: x["photo_url"]}} resizeMode="cover" style ={{width:350, height:350}} />
        <View style={{width:350, height:70, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', margin:15, marginTop:25,}} >
        <Text style={{fontSize:20, fontWeight:'300', color:'#444'}}>{x.name} </Text>
        <Text style={{fontSize:21, fontWeight:'200', color:'#444'}}>{x.distance} mi</Text>
        </View>
        <View style={{flexDirection:'row'}}>
        </View>
        </View>
      </View>
    )
  }
    handleYup (card) {
      AlertIOS.alert(
        card.name,
        'Call the place?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
          {text: 'Call', onPress: () => Communications.phonecall(card.phone, true)}
        ]
      )


    console.log(`Yup for`, card)
  }

  handleNope (card) {
    console.log(`Nope for ${card.text}`)
  }
  noMore(){
    return (
      <View style={styles.card} >
        <Text>No More Card</Text>
      </View>
    )
  }

  yup(){
this.refs['swiper']._goToNextCard()  }

nope(){
this.refs['swiper']._goToNextCard()  }

componentWillMount() {

    navigator.geolocation.getCurrentPosition(
        (position) => {
          var initialPosition = position;

          AsyncStorage.getItem('user').then((userId) => {
            console.log(userId, 'userId');
            // token doesnt matter right now but we might want to add later
            //static ip for demo, but GPS does work.
            return getMoviesFromApiAsync("http://138.68.62.249:8000/restaurants?lat=32.785723&lng=-96.800743")
          }).then((resp) => {
            this.setState({
              restaurants_data: temp
            });
          })

          // return "http://138.68.62.249:8000/restaurants?lat=" + lat + "&lng=" + long
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );


    // fetch asyncOffline token and user if user go to main otherwise login

  }



render() {
  if(this.state.restaurants_data == null){
    return <Text>Loading ..... </Text>
  }else{
  return (
    <View style={styles.container}>
         <Nav chat = {() => this.props.navigator.replace({id: "messages"})} toProfile = {() => this.props.navigator.replace({id:'profile'})} />
    <SwipeCards
      ref = {'swiper'}
      cards={this.state.restaurants_data}
      containerStyle = {{  backgroundColor: '#f7f7f7', alignItems:'center', margin:20}}
      renderCard={(cardData) => this.Card(cardData)}
      renderNoMoreCards={() => this.noMore()}
      handleYup={this.handleYup}
      handleNope={this.handleNope} />
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
      <TouchableOpacity style = {styles.buttons} onPress = {() => this.nope()}>
      <Icon name='ios-trash' size={45} color="#888" style={{}} />
      </TouchableOpacity>
      <TouchableOpacity style = {styles.buttons} onPress = {() => this.yup()}>
      <Icon name='ios-pizza' size={36} color="#888" style={{marginTop:5}} />
      </TouchableOpacity>
      </View>
      </View>
  )
}}
}

//onPress = {() => this.renderNope()}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  buttons:{
    width:80,
    height:80,
    borderWidth:10,
    margin: 25,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:40
  },
  buttonSmall:{
    width:50,
    height:50,
    borderWidth:10,
    borderColor:'#e7e7e7',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25
  },
   card: {
    //flex: 1,
    alignItems: 'center',
    alignSelf:'center',
    borderWidth:2,
    borderColor:'#e3e3e3',
    width: 350,
    height: 420,
  }

});
