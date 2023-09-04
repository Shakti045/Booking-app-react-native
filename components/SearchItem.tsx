import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'

type SearchItemProps={
  name:string,
  imageurl:string,
  propertynumber:number,
  shortDescription:string
}
const SearchItem = ({name,imageurl,propertynumber,shortDescription}:SearchItemProps) => {
  return (
    <View style={{flexDirection:'row',gap:10,alignItems:'center',marginTop:10}}>
     <View>
       <Image source={imageurl} style={styles.image}/>
     </View>
     <View style={{justifyContent:'space-between'}}>
       <Text style={{color:'black',fontWeight:'bold',fontSize:25}}>{name}</Text>
       <Text style={{color:'black',fontWeight:'700',fontSize:20}}>{shortDescription}</Text>
       <Text style={{color:'gray',fontWeight:'500'}}>{propertynumber} Properties</Text>
     </View>
    </View>
  )
}

export default SearchItem

const styles = StyleSheet.create({
  image:{
    height:70,
    width:70,
    borderRadius:10
  }
})