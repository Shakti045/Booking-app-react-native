import { StyleSheet, Text, View ,TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/StackNavigator'
import { useSelector } from 'react-redux'
import RootState from '../redux/store/store'
import { Entypo } from '@expo/vector-icons';
import Rooms from '../components/Rooms'
import PrePayment from '../components/PrePayment'
import RazorpayCheckout from 'react-native-razorpay';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store/store'
import { set_bookingdetails } from '../redux/slices/order'

type CheckoutScreenProps=NativeStackScreenProps<RootStackParamList,'Checkout'>

const steps=[
    {
        id:1,
        name:'Select room'
    },
    {
        id:2,
        name:'Fill Details'
    },
    {
      id:3,
      name:'Payment'
    }
]

const Checkout = ({navigation,route}:CheckoutScreenProps) => {
    const dispatch:AppDispatch=useDispatch();
    const {propertyid,totalprice,placeid,propertyprice,days}=route.params;
    const {details}=useSelector((state:RootState)=>state.booking);
    const [step,setstep]=useState(1);
    const [room,setroom]=useState<any>();
    const [userdetails,setuserdetails]=useState<any>();

    function initiatepayment(){
      var options:any = {
        description: 'Pay for your bookings',
        image: 'https://d6xcmfyh68wv8.cloudfront.net/assets/razorpay-glyph.svg',
        currency: 'INR',
        key: 'rzp_test_Rnp0K8cxMwbHqZ', // Your api key
        amount: totalprice*100,
        name: 'Booking.com',
        prefill: {
          email: 'void@razorpay.com',
          contact: '9191919191',
          name: 'Booking.com'
        },
        theme: {color: '#003580'},
    
      }
      RazorpayCheckout.open(options).then((data) => {
        // handle success
        // alert(`Success: ${data.razorpay_payment_id}`);
        dispatch(set_bookingdetails({
          roomid:room?.id,
          amountpaid:totalprice,
          razorpayid:data.razorpay_payment_id,
          checkindate:new Date(details?.checkindate).toLocaleDateString(),
          checkoutdate:new Date(details?.checkoutdate).toLocaleDateString(),
          contactnumber:userdetails?.mobilenumber,
          email:userdetails?.emailid
        }))
        navigation.navigate('PaymentSuccess')
      }).catch((error) => {
        // handle failure
        // alert(`Error: ${error.code} | ${error.description}`);
      });
    }

    function handlepayment(){
      Alert.alert('Payment confirmation', 'Once payment completed the process can not be undo', [
        {
          text: 'Cancel',
          onPress: () =>{},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => initiatepayment(),style:'destructive'},
      ]);

      
    }
  return (
    <View>
      <View style={{ flexDirection:'row',justifyContent:'space-around',marginTop:8}}>
        {
            steps.map((e)=>(
                <View key={e.id} style={[e.id<step?styles.checked:styles.notchecked,styles.stepbox]}>
                    {
                      e.id<step?( <Entypo name="check" size={24} color="white" />):(
                        <Text style={[{color:'white',fontWeight:'bold',fontSize:20}]}>{e.id}</Text>
                      )
                    }
                </View>
            ))
        }
      </View>
      <View style={{justifyContent:'space-around',flexDirection:'row', borderBottomWidth:2,borderStyle:'dotted',paddingBottom:10}}>
        {
          steps.map((e)=>{
            return <Text key={e.id} style={[{color:'black',fontSize:20},e.id>=step?{fontWeight:'100'}:{fontWeight:'bold'}]}>{e.name}</Text>
          })
        }
      </View>
      <View>
        {
          step===1 && (
            <Rooms setstep={setstep} setroomid={setroom} roomid={room} propertyid={propertyid} placeid={placeid}/>
          )
        }
        {
          step===2 && (
            <PrePayment setuserdetails={setuserdetails} setstep={setstep}/>
          )
        }
        {
          step===3 && room!==null && userdetails!==null && (
            <>
    
          <Text  style={{fontWeight:'900',fontSize:20,margin:2,marginLeft:6}}>Room details</Text>
           <View 
           style={{padding:10,borderRadius:10,margin:6,gap:10,backgroundColor:'#003580',elevation:10}}>
           <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>{room?.name}</Text>
           <View style={{flexDirection:'row',gap:10}}>
           <Text style={{color:'white'}}>Size {room?.size} sqft</Text>
           <Text style={{color:'white'}}>Bed {room?.bed}</Text>
           </View>
           <Text style={{color:'white'}}>Payment terms {room?.refundable}</Text>
           <View style={{flexDirection:'row',justifyContent:'center',marginTop:8}}>
          </View>
          </View>

          <Text style={{fontWeight:'900',fontSize:20,margin:2,marginLeft:6}}>User details</Text>
          <View style={{padding:10,borderRadius:10,margin:6,gap:10,backgroundColor:'#003580',elevation:10}}>
           <Text style={{color:'white'}}>{userdetails?.name}</Text>
           <Text style={{color:'white'}}>{userdetails?.mobilenumber}</Text>
           <Text style={{color:'white'}}>{userdetails?.emailid}</Text>
          </View>
          
          <Text  style={{fontWeight:'900',fontSize:20,margin:2,marginLeft:6}}>Booking details</Text>
          <View style={{padding:10,borderRadius:10,margin:6,gap:10,backgroundColor:'#003580',elevation:10}}>
           <View style={{flexDirection:'row',gap:5}}>
           <Text style={{color:'white'}}>{details?.rooms}  rooms</Text>
           <Text style={{color:'white'}}>{details?.adults}  adults</Text>
           <Text style={{color:'white'}}>{details?.children} children</Text>
           <Text style={{color:'white'}}>{days} days</Text>
           </View>
           <Text style={{color:'white'}}>Checkindate {new Date(details?.checkindate).toLocaleDateString()}</Text>
           <Text style={{color:'white'}}>Checkoutdate {new Date(details?.checkoutdate).toLocaleDateString()}</Text>
           <Text style={{color:'white'}}>Total price : Rs.{propertyprice} * {details?.rooms} * {days} = Rs.{totalprice}
           </Text>
          </View>
          <TouchableOpacity onPress={handlepayment} style={{padding:10,borderRadius:10,margin:6,gap:10,backgroundColor:'#003580',elevation:10}}>
            <Text style={{color:'white',textAlign:'center'}}>Continue checkout</Text>
          </TouchableOpacity>
          </>)
        }
       </View>
    </View>
  )
}

export default Checkout

const styles = StyleSheet.create({
    checked:{
        backgroundColor:'green'
    },
    notchecked:{
      backgroundColor:'#99ccff'
    },
    stepbox:{
        height:50,
        width:50,
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center'
    }
})