import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabNavigator from './TabNavigator'
import Search from '../screens/Search'
import Signup from '../screens/Signup'
import Places from '../screens/Places'
import PropertyDetail from '../screens/PropertyDetail'
import Map from '../screens/Map'
import Checkout from '../screens/Checkout'
import PaymentSuccess from '../screens/PaymentSuccess'


export type RootStackParamList={
    Main:undefined,
    Search:undefined,
    Signup:undefined,
    Places:{
      placeid:string,
    },
    Propertydetails:{
      placeid:string,
      propertyid:string,
    },
    Map:{
      points:Array<{longitude:string,latitude:string,name:string}>
    },
    Checkout:{
      totalprice:number,
      propertyid:string,
      placeid:string,
      propertyprice:number,
      days:number
    },
    PaymentSuccess:undefined
}

const Stack=createNativeStackNavigator<RootStackParamList>();
const StackNavigator = () => {
  return (
         <NavigationContainer>
         <Stack.Navigator initialRouteName='Main' screenOptions={{
          headerStyle:{backgroundColor:'#003580'},headerTitleStyle:{color:'white'},headerTitleAlign:'center',headerBackVisible:false
         }} >
           <Stack.Screen name='Main' component={TabNavigator} options={{
            headerShown:false
           }}/>
           <Stack.Screen name='Search' component={Search}/>
           <Stack.Screen name='Signup' component={Signup}/>
           <Stack.Screen name='Places' component={Places}/>
           <Stack.Screen name='Propertydetails' component={PropertyDetail}/>
           <Stack.Screen name='Map' component={Map} options={{
            headerShown:false
           }}/>
           <Stack.Screen name='Checkout' component={Checkout}/>
           <Stack.Screen name='PaymentSuccess' component={PaymentSuccess} options={{headerShown:false}}/>
         </Stack.Navigator>
        </NavigationContainer>
  )
}

export default StackNavigator;