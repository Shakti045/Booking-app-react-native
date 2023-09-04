import { StyleSheet, Text, View } from 'react-native'
import React ,{useState,useEffect} from 'react'
import { apiConnector } from '../services/connector'
import { orderurls, userurls } from '../services/url'
import { ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import RootState from '../redux/store/store'
import { FlatList } from 'react-native'

const Bookings = () => {
  const [loading,setloading]=useState(true);
  const {token}=useSelector((state:RootState)=>state.auth)
  const [bookings,setbookings]=useState([]);
  async function getbookings() {
    try{
      const {data}=await apiConnector({
        method:'GET',
        url:orderurls.getallorders,
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      setbookings(data?.Bookings)
      
    }catch(err){
      console.log(err);
    }finally{
      setloading(false);
    }
  }

  useEffect(()=>{
    getbookings();
  },[])

  if(loading){
    return <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
          <ActivityIndicator size='large'/>
          </View>
  }
  return (
    <View>
      <FlatList data={bookings}
      keyExtractor={(booking)=>booking.id}
      renderItem={({item})=>{
        return <View style={{margin:8,padding:10,borderRadius:8,backgroundColor:'#003580'}}>
            <Text style={{color:'white'}}>Amount paid Rs.{item?.amountpaid}</Text>
             <Text style={{color:'white'}}>From {item.checkindate} to {item.checkoutdate}</Text>
             <Text style={{color:'white'}}>{item.contactnumber}</Text>
             <Text style={{color:'white'}}>{item.email}</Text>
        </View>
      }}
      />
    </View>
  )
}

export default Bookings

const styles = StyleSheet.create({})