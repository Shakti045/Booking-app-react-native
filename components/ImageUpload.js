import React, { useState } from 'react';
import {Text, TouchableOpacity ,ToastAndroid } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { apiConnector } from '../services/connector';
import { userurls } from '../services/url';
import {  useSelector } from 'react-redux';
import Loader from './Loader';


export default function ImageUpload({seturl}) {
  const {token}=useSelector((state)=>state.auth);
  const [updatemode,setupdatemode]=useState(false);
  const [base64Img,setbase64Img]=useState();
  const [loading,setloading]=useState(false);

  const pickImage = async () => {
   
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: true
    });

      
    if (!result.canceled) {
      seturl(result.assets[0].uri);
      setupdatemode(true);
      let base64Img = `data:image/jpg;base64,${result.assets[0].base64}`
      setbase64Img(base64Img);
    }else{

    }
  };

  async function updatephotoinserver(url){
    try{
     await apiConnector({
      method:'POST',
      url:userurls.updateprofilephoto,
      data:{
        url:url
      },
      headers:{
        'Authorization':`Bearer ${token}`
      }
     })
     ToastAndroid.show("Image updated successfully",ToastAndroid.LONG)
    }catch(err){
      console.log("Error while updating photo in server","=>",err);
      ToastAndroid.show("Something went wrong",ToastAndroid.LONG)
      throw new Error();
    }
  }

  function uploadtocloudinary(){
        let apiUrl = 'https://api.cloudinary.com/v1_1/djq1vmvy4/image/upload'
        let data = {
            "file": base64Img,
            "upload_preset": "rfahuwwl",
          }
          setloading(true);
          fetch(apiUrl, {
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            method: 'POST',
          }).then(async r => {
              let data = await r.json()
             if(data){
              await updatephotoinserver(data.secure_url);
            
             }
        }).catch(err=>{console.log(err);}).finally(()=>{
          setloading(false);
          setupdatemode(false);
        })
   }

  return (
    <>
      {
        updatemode?(
        <TouchableOpacity disabled={loading} onPress={uploadtocloudinary} style={{padding:15,borderRadius:15,backgroundColor:'#003580'}}>
          {
            loading?<Loader/>:<Text style={{color:'white',textAlign:'center'}}>Confirm edit</Text>
          }
        </TouchableOpacity>):(
        <TouchableOpacity style={{padding:15,borderRadius:15,backgroundColor:'#003580'}} onPress={pickImage}>
         <Text style={{color:'white',textAlign:'center'}}>Edit image</Text>
        </TouchableOpacity> )
      }
   </>
  );
}
