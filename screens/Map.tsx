import { StyleSheet, Text, View ,StatusBar} from 'react-native'
import React, {useEffect,useRef} from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/StackNavigator'
import MapView ,{Marker} from 'react-native-maps'

type MapScreenProps=NativeStackScreenProps<RootStackParamList,'Map'>;

const Map = ({route}:MapScreenProps) => {
    const mapView = useRef(null);
    const {points}=route.params;
    const cordinates=points.map(({latitude,longitude})=>{
        return {
            latitude:Number(latitude),
            longitude:Number(longitude)
        }
    })
    useEffect(()=>{
        mapView.current.fitToCoordinates(cordinates,{
            edgePadding:{
                top:190,
                left:190,
                bottom:190,
                right:190,
            }
        });
    },[]);
    
    const statusbarwidth=StatusBar.currentHeight;
  return (
    <View style={{marginTop:statusbarwidth}}>
     <MapView ref={mapView} style={{width:'100%',height:'100%'}}>
       {
        points.map(({name,longitude,latitude})=>{
            return <Marker key={name} title={name} coordinate={{
                longitude:Number(longitude),
                latitude:Number(latitude)
            }}>
                {/* <Text>{name}</Text> */}
            </Marker>
        })
       }
     </MapView>
    </View>
  )
}

export default Map

const styles = StyleSheet.create({})