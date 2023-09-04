import { StyleSheet, Text,SafeAreaView } from "react-native";
import React ,{useEffect} from "react";
import LottieView from "lottie-react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import RootState from "../redux/store/store";
import { RootStackParamList } from "../navigation/StackNavigator";
import { useSelector } from "react-redux";
import { apiConnector } from "../services/connector";
import { orderurls } from "../services/url";
import { schedulePushNotification } from "../components/Notification";

type PaymentSuccessProps=NativeStackScreenProps<RootStackParamList,'PaymentSuccess'>
const PaymentSuccess = ({navigation}:PaymentSuccessProps) => {
      const {bookingdetails:{roomid,amountpaid,razorpayid,checkindate,checkoutdate,contactnumber,email}}=useSelector((state:RootState)=>state.order);
      const {token}=useSelector((state:RootState)=>state.auth);
      console.log(roomid,amountpaid,razorpayid,checkindate,checkoutdate,contactnumber,email,token);

      const createorder=async()=>{
        try{
           await apiConnector({
            method:'POST',
            url:orderurls.bookorder,
            data:{roomid,amountpaid,razorpayid,checkindate,checkoutdate,contactnumber,email,token},
            headers:{
              'Authorization':`Bearer ${token}`
            }
           })
           await schedulePushNotification(`Your booking has been placed successfully`)
          
        }catch(err){
          console.log(err);
        }finally{
          navigation.replace('Main');
        }
      }

      useEffect(()=>{
        createorder();
      },[]);
      
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <LottieView
        source={require("../assets/thumbs.json")}
        // ref={animation}
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={true}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your payment has received please wait while confirming booking
      </Text>
      <LottieView
        source={require("../assets/sparkle.json")}
        style={{
          height: 300,
        
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={true}
        speed={0.7}
      />
    </SafeAreaView>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({});