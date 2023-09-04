import { FlatList, StyleSheet, Text, View ,ScrollView, Alert} from 'react-native'
import React ,{useState}from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/StackNavigator'
import { data } from '../constants/data'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native'
import { FontAwesome } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import RootState from '../redux/store/store'
import Amenities from '../components/Facilities'



type PropertDetailScreaanProps=NativeStackScreenProps<RootStackParamList,'Propertydetails'>
const PropertyDetail = ({navigation,route}:PropertDetailScreaanProps) => {
const {placeid,propertyid}=route.params;

const {details}=useSelector((state:RootState)=>state.booking);
const startdate=new Date(details.checkindate);
const enddate=new Date(details.checkoutdate);
const days=(details.checkoutdate-details.checkindate)/(24 * 60 * 60 * 1000);

const {token}=useSelector((state:RootState)=>state.auth)
  


// const checkindate=new Date(details.startdate);

const property = data.find(place => place.id === placeid)?.properties.find(property => property.id === propertyid);
const [showall,setshowall]=useState(false);

  const photos=showall?property.photos:property.photos.slice(0,5)

  return (
    <ScrollView>
      <View
        style={{
          backgroundColor: "white",
          marginTop: 0,
          paddingVertical: 15,
          elevation: 30,
        }}
      >
      
       <View style={{flexDirection:'row',flexWrap:'wrap',width:'100%'}}>
       {
          [...photos, { id: "customecomponent", image: "" }].map((e)=>{
            return (
              <View key={e.id} style={{height:100,width:'30%',margin:6}}>
                {e.id === "customecomponent" ? (
                <TouchableOpacity
                  onPress={() => setshowall(!showall)}
                  style={{
                    backgroundColor: "gray",
                    height: 100,
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                    ,borderRadius:5
                  }}
                >
                  <View>
                    <Text>{showall ? "Show less" : "Show More"}</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <Image
                  source={e.image}
                  style={{
                    height: 100,
                    width: "100%",
                    borderRadius:5
                  }}
                />
              )}
             </View>)
          })
        }
       </View>
        <View
          style={{
            margin: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap:'wrap',
            gap:5
          }}
        >
          <View >
             <View>
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {property.name}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <FontAwesome name="star" size={24} color="#003580" />
              <Text>{property.rating}</Text>
              <View
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  backgroundColor: "blue",
                  borderRadius: 5,
                  
                }}
              >
                <Text style={{ color: "white" }}>Genius Level</Text>
              </View>
              <View
            style={{
              paddingHorizontal: 6,
              paddingVertical: 4,
              backgroundColor: "green",
              borderRadius: 5,
              shadowColor: "red",
              
            }}
          >
            <Text style={{ color: "white" }}>Travel Sustainale</Text>
            </View>
            </View>
          </View>

          
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
          padding: 5,
          paddingVertical: 15,
          elevation: 30,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "700" }}>
          Price for {days} days and {details.rooms} rooms
        </Text>
        <View style={{ flexDirection: "row", gap: 5 }}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: "300",
              color: "#DC4C49",
              textDecorationLine: "line-through",
            }}
          >
            Rs.{property.oldPrice * details.rooms*days}
          </Text>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "green" }}>
            Rs.{property.newPrice * details.rooms*days}
          </Text>
          <Text></Text>
        </View>

        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
            backgroundColor: "green",
            borderRadius: 10,
            width: 150,
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <FontAwesome name="rupee" size={15} color="white" />
          <Text style={{ color: "white", textAlign: "center" }}>
            {property.oldPrice * details.rooms*days -
            property.newPrice * details.rooms*days} discount
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
          padding: 5,
          paddingVertical: 15,
          elevation: 30,
        }}
      >
        <View style={{flexDirection:'row',gap:100}}>
          <View>
            <Text style={{fontWeight:'bold'}}>Check in</Text>
            <Text style={{fontWeight:'900',color:'blue',fontSize:18}}>{startdate.toLocaleDateString()}</Text>
          </View>
          <View>
          <Text style={{fontWeight:'bold'}}>Check out</Text>
           <Text style={{fontWeight:'900',color:'blue',fontSize:18}}>{enddate.toLocaleDateString()}</Text>
          </View>
        </View>

        <Text style={{marginTop:8,fontWeight:'bold'}}>Rooms and guests</Text>
        <Text style={{fontWeight:'900',color:'blue',fontSize:18}}>{details.rooms} rooms {details.adults} adults {details.children} childrens</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          marginTop: 10,
          padding: 5,
          paddingVertical: 15,
          elevation: 30,
        }}
      >
       <Text style={{fontWeight:'bold'}}>Most popular facilities</Text>
         <Amenities/>
       </View>
     
     <TouchableOpacity onPress={()=>{
      if(!token){
        return Alert.alert('No user found', 'Please login before proceed', [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'LOGIN NOW', onPress: () => {
            navigation.navigate('Main')
          }},
        ]);
      }
      navigation.navigate('Checkout',{
        totalprice:property.newPrice * details.rooms * days,
        propertyid:propertyid,
        placeid:placeid,
        propertyprice:property.newPrice,
        days:days
      })
     }} style={{padding:10,backgroundColor:'blue',marginTop:15}}>
       <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:'center'}}>Confirm booking</Text>
     </TouchableOpacity>
    </ScrollView>
  );
}

export default PropertyDetail

const styles = StyleSheet.create({})








// <FlatList
// numColumns={3}
// data={[...photos, { id: "customecomponent", image: "" }]}
// keyExtractor={(photo) => photo.id}
// renderItem={({ item, index }) => (
//   <>
//     {item.id === "customecomponent" ? (
//       <TouchableOpacity
//         onPress={() => setshowall(!showall)}
//         style={{
//           backgroundColor: "gray",
//           height: 100,
//           width: "30%",
//           borderRadius: 5,
//           margin: 6,
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <View>
//           <Text>{showall ? "Show less" : "Show More"}</Text>
//         </View>
//       </TouchableOpacity>
//     ) : (
//       <Image
//         source={item.image}
//         style={{
//           height: 100,
//           width: "30%",
//           borderRadius: 5,
//           margin: 6,
//         }}
//       />
//     )}
//   </>
// )}
// />