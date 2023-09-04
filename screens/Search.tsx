import { SafeAreaView, StyleSheet, Pressable, View ,FlatList } from 'react-native'
import React,{useState} from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/StackNavigator'
import { TextInput } from 'react-native-paper';
import { data } from '../constants/data';
import SearchItem from '../components/SearchItem';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/TabNavigator';


type searchprops= BottomTabScreenProps<RootTabParamList,'Home'> & NativeStackScreenProps<RootStackParamList,'Search'>


const Search = ({navigation}:searchprops) => {
  const [items,setitems]=useState([]);
  return (
    <SafeAreaView>
         <View style={styles.container}>
          <TextInput onChangeText={(text)=>{
            setitems(()=>{
             if(text){
              const newitems=data.filter((item)=>item.place.toLowerCase().includes(text.toLowerCase()))
              return newitems;
             }else{
              return [];
             }
              
            })
          }} placeholder='Search your destination'/>
          <View>
            <FlatList
             data={items}
             keyExtractor={(item)=>item.id}
             renderItem={({item})=>(
              <Pressable onPress={()=>{
                navigation.navigate('Home',{
                  placename:item.place,
                  id:item.id
                })
              }}>
              <SearchItem name={item.place} propertynumber={item.properties.length} imageurl={item.placeImage} shortDescription={item.shortDescription}/>
              </Pressable>
             )}
            />
          </View>
        </View>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({
  container:{
    margin:10
  }
});