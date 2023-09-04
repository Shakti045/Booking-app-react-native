import { View, Text, Pressable, SafeAreaView, Alert ,StyleSheet ,Modal, Button, TouchableOpacity, ScrollView ,Image} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import DateInput from '../components/DateInput'
import { AntDesign } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store/store';
import { set_details } from '../redux/slices/booking';



// type HomeProps= BottomTabScreenProps<RootTabParamList,'Home'> & NativeStackScreenProps<RootStackParamList,'Main'>


const Home = ({navigation,route}:any) => {
  const dispatch:AppDispatch=useDispatch();
  const [showdate,setshowdate]=useState<boolean>(false);
  const [startdate,setstartdate]=useState<Date | null>();
  const [enddate,setenddate]=useState<Date | null>();
  const [rooms,setrooms]=useState<number>(1);
  const [adults,setadults]=useState<number>(2);
  const [children,setchildren]=useState<number>(0);
  const [modalvisible,setmodalvisible]=useState<boolean>(false);
  
  const params=route.params;



  function handlesearch(){

    
    if(!params || !startdate || !enddate){
      return Alert.alert('Alert', 'Please enter all fields required', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK'},
      ]);
    }
    
    dispatch(set_details({
      adults:adults,
      rooms:rooms,
      children:children,
      checkindate:startdate.getTime(),
      checkoutdate:enddate.getTime()
    }))
    navigation.navigate('Places',{
      placeid:params.id
    })
  }
  return (
      <SafeAreaView>
       <View style={styles.inputcontainer}>
          <Pressable style={styles.inputbox} onPress={()=>{
            navigation.navigate('Search')
          }}>
          <Ionicons name="search" size={24} color="black" />
          <Text>{params?params.placename:'Enter your destination'}</Text>
          </Pressable>

          <Pressable onPress={()=>
          {
            setshowdate(true);
            setstartdate(null);
            setenddate(null);
          }} style={styles.inputbox}>
          <Feather name="calendar" size={24} color="black" />
          <Text>
            {
              enddate?`${startdate.toDateString()} to ${enddate.toDateString()}`:"Enter your checkin and check out date"
            }
          </Text>
          </Pressable>
          <Pressable onPress={()=>setmodalvisible(true)} style={styles.inputbox}>
          <Ionicons name="person" size={24} color="black" />
          <Text style={{color:'red'}}>{rooms} room - {adults} adults - {children} children</Text>
          </Pressable>
          <TouchableOpacity onPress={handlesearch} style={styles.button}>
          <View><Text style={{color:'white',textAlign:'center',fontSize:18,fontWeight:'bold'}}>Search</Text></View>
          </TouchableOpacity>
          </View>
          <Text
            style={{ marginHorizontal: 20, fontSize: 17, fontWeight: "500" }}
          >
            Travel More spend less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                backgroundColor: "#003580",
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                Genius
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                You are ate genius level one in our loyalty program
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                15% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Complete 5 stays to unlock level 2
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                borderRadius: 10,
                padding: 20,
                marginHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  marginVertical: 7,
                }}
              >
                10% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Enjoy Discounts at participating at properties worldwide
              </Text>
            </Pressable>
          </ScrollView>
          <View style={{marginTop:10,flexDirection:'row',justifyContent:'center'}}>
             <Image
              style={{ width: 200, height: 50, resizeMode: "cover" }}
              source={{
                uri: "https://assets.stickpng.com/thumbs/5a32a821cb9a85480a628f8f.png",
              }}
            />
          </View>
         <DateInput startdate={startdate} setstartdate={setstartdate} setenddate={setenddate} showmodal={showdate} setshowmodal={setshowdate}/>
         <Modal
          animationType="slide"
         transparent={true}
         visible={modalvisible}
         onRequestClose={() => {
        setmodalvisible(!modalvisible);
    }}>
     <View style={styles.bottommodal}>
      <View style={{padding:15,backgroundColor:'gray',elevation:5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
        <Text>Select rooms & guests</Text>
      </View>
      <View style={styles.chocicecontainer}>
        <View style={styles.choicebox}>
          <Text>Rooms</Text>
          <View style={styles.chociecontrol}>
            <Pressable onPress={()=>setrooms(Math.max(1,rooms-1))}><AntDesign name="minuscircle" size={24} color="black" /></Pressable>
             <Text style={styles.value}>{rooms}</Text>
            <Pressable onPress={()=>setrooms(rooms+1)}><AntDesign name="pluscircle" size={24} color="black" /></Pressable>
          </View>
        </View>
        <View style={styles.choicebox}>
          <Text>Adults</Text>
          <View style={styles.chociecontrol}> 
            <Pressable onPress={()=>setadults(Math.max(1,adults-1))} ><AntDesign name="minuscircle" size={24} color="black" /></Pressable>
             <Text style={styles.value}>{adults}</Text>
            <Pressable onPress={()=>setadults(adults+1)}><AntDesign name="pluscircle" size={24} color="black" /></Pressable>
          </View>
        </View>
        <View style={styles.choicebox}>
          <Text>Childrens</Text>
          <View style={styles.chociecontrol}>
            <Pressable onPress={()=>setchildren(Math.max(0,children-1))}><AntDesign name="minuscircle" size={24} color="black" /></Pressable>
             <Text style={styles.value}>{children}</Text>
            <Pressable onPress={()=>setchildren(children+1)}><AntDesign name="pluscircle" size={24} color="black" /></Pressable>
          </View>
        </View>
      </View>
      <Button onPress={()=>setmodalvisible(false)} title='Close'/>
     </View>
         </Modal>
      </SafeAreaView>
  )
}

const styles=StyleSheet.create({
  inputcontainer:{
    margin:15,
    gap:15
  },
  inputbox:{
    flexDirection:'row',
    alignItems:'center',
    gap:15,
    borderWidth:2,
    borderColor:'#003580',
    padding:15,
    borderRadius:10,
  },
  bottommodal:{
    height:300,
    width:'100%',
    backgroundColor:'white',
    position:'absolute',
    bottom:0
  },
  choicebox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  chociecontrol:{
    flexDirection:'row',
    gap:10,
    alignItems:'center'
  },
  chocicecontainer:{
    margin:10
  },
  value:{
    fontSize:50,
    fontWeight:'bold'
  },
  button:{
    padding:15,
    backgroundColor:'#003580',
    borderRadius:10
  }
})



export default Home;