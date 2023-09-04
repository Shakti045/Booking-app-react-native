import { FlatList, Pressable, SafeAreaView,  Text, TouchableHighlight, View } from 'react-native'
import React from 'react'
import { data } from '../constants/data'
import { Entypo } from '@expo/vector-icons';


const Rooms = ({propertyid,placeid,roomid,setroomid,setstep}:{propertyid:string,placeid:string,roomid:any,setroomid:(newValue:any)=>void,setstep:(newValue:number)=>void}) => {

  const rooms=data.find((e)=>e.id===placeid).properties.find((property)=>property.id===propertyid).rooms
  return (
     <SafeAreaView style={{position:'relative'}}>
      <Text style={{fontWeight:'900',fontSize:20,marginTop:15,marginLeft:5}}>Select a room to proceed</Text>
      <FlatList data={rooms} 
        keyExtractor={(room)=>room.id}
        renderItem={({item})=>(
          <Pressable onPress={()=>{
            setroomid(item)
          }} style={[{padding:10,borderRadius:10,margin:6,elevation:10,gap:10,backgroundColor:'#003580'},item.id===roomid?.id?{opacity:1}:{opacity:.7}]}>
           <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>{item.name}</Text>
           <View style={{flexDirection:'row',gap:10}}>
           <Text style={{color:'white'}}>Size {item.size} sqft</Text>
           <Text style={{color:'white'}}>Bed {item.bed}</Text>
           </View>
           <Text style={{color:'white'}}>Payment terms {item.refundable}</Text>
           <View style={{flexDirection:'row',justifyContent:'center',marginTop:8}}>
            {
              item.id===roomid?.id && (
                <Entypo name="check" size={24} color="white" />
              )
            }
           </View>
          </Pressable>
        )}
        />
       {
        roomid && (
          <TouchableHighlight onPress={()=>setstep(2)} style={{backgroundColor:'#1a8cff',padding:10,paddingVertical:15,
          borderRadius:5,margin:5}}>
          <Text style={{color:'white',fontSize:20,fontWeight:'bold',textAlign:'center'}}>Confirm</Text>
        </TouchableHighlight>
        )
       }

     </SafeAreaView>
  )
}

export default Rooms

