import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Like from '../screens/Like';
import Bookings from '../screens/Bookings';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import RootState from '../redux/store/store';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store/store';
import Login from '../screens/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set_token } from '../redux/slices/auth';

export type RootTabParamList={
    Home:{
      placename:string,
      id:string
      } | undefined,
    Profile:undefined,
    Like:undefined,
    Bookings:undefined
}


const Tab=createBottomTabNavigator<RootTabParamList>();



const TabNavigator=()=>{
   const {token}=useSelector((state:RootState)=>state.auth);
   const dispatch:AppDispatch=useDispatch();

   async function getprevioustoken(){
      try{
         const token=await AsyncStorage.getItem('bookinguserToken');
         if(token){
            dispatch(set_token(token));
         }
      }catch(err){
       console.log("Error while getting token from asyncstorage","=>",err);
      }
   }
   useEffect(()=>{
       getprevioustoken();
   },[]);
    return (
       <Tab.Navigator initialRouteName='Home' screenOptions={{
        headerStyle:{backgroundColor:'#003580'},headerTitleAlign:'center',
        headerTitleStyle:{color:'white'},
        headerRight:()=>{
            return (
             <View style={{paddingRight:15}}>
               <Ionicons name="notifications" size={20} color="white" />
             </View>
            )
        }
       }}>
         <Tab.Screen name='Home' component={Home} options={{
            headerTitle:'Booking.com',tabBarIcon:({focused})=>{
               return (
                  <>
                   <Entypo name="home" size={24} color={`${focused?"#003580":"black"}`}/>
                  </>
               )
            }
         }}/>
         <Tab.Screen name='Bookings' component={Bookings} options={{
            headerTitle:'My bookings',tabBarIcon:({focused})=>{
               return (
                  <>
                   <FontAwesome name="hotel" size={24} color={`${focused?"#003580":"black"}`} />
                  </>
               )
            }
         }}/>
         <Tab.Screen name='Like' component={Like} options={{
            headerTitle:'Wishlist',tabBarIcon:({focused})=>{
               return (
                  <>
                  <AntDesign name="heart" size={24} color={`${focused?"#003580":"black"}`} />
                  </>
               )
            }
         }}/>
         <Tab.Screen name='Profile' component={token?Profile:Login} options={{
            headerTitle:'My profile',tabBarIcon:({focused})=>{
               return (
                  <>
                   <Ionicons name="person" size={24} color={`${focused?"#003580":"black"}`} />
                  </>
               )
            }
         }}/>
       </Tab.Navigator>
    )
}

export default TabNavigator;