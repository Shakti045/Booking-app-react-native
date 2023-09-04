import { View, Text ,ActivityIndicator} from 'react-native'
import React ,{useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiConnector } from '../services/connector';
import { userurls } from '../services/url';
import { useSelector } from 'react-redux';
import RootState from '../redux/store/store';
import Toast from 'react-native-toast-message';
import { Image } from 'expo-image';
import ImageUpload from '../components/ImageUpload';


type profile={
 firstname:string,
 lastname:string,
 profileimage:any,
 email:string
}

const Profile = () => {
  const [loading,setloading]=useState<boolean>(true);
  const {token}=useSelector((state:RootState)=>state.auth);
  const [url,seturl]=useState<string>();
   const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const [profile,setprofile]=useState<profile>();
  async function getuserdetails(){
    try {
      const {data}=await apiConnector({
        method:'GET',
        url:userurls.getuserdetails,
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      if(data.Success){
        setprofile(data.User);
      }
    } catch (error) {
      console.log("Error while gettinguserdetails","=>",error); 
      Toast.show(
        {
          type:'error',
          text1:error?.response?.data?.Message
        }
      )
    }finally{
      setloading(false);
    }
  }


  useEffect(() => {
    getuserdetails();
  },[]);

  if(loading){
    return (
     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={'large'}/>
     </View>
    )
  }


  return (
      <SafeAreaView style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{alignItems:'center',gap:30}}>
        <Image
        source={url?url:profile?.profileimage}
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
        style={{height:100,width:100,borderRadius:100}}

      />
        <ImageUpload  seturl={seturl}/>
        <Text>{profile?.email}</Text>
        <Text>{profile?.firstname} {profile?.lastname}</Text>
        </View>
      </SafeAreaView>
  )
}

export default Profile