import {  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React ,{useState} from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/StackNavigator'
import Loader from '../components/Loader'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { apiConnector } from '../services/connector'
import { authurls } from '../services/url'
import { AppDispatch } from '../redux/store/store'
import { useDispatch } from 'react-redux'
import { set_token } from '../redux/slices/auth'

const validateloginscheema=yup.object().shape({
    email:yup.string().email().required(),
    password:yup.string().min(4).required()
})

type logindata={
    email:string,
    password:string
}

const Login = () => {
  const navigation=useNavigation<NativeStackNavigationProp<RootStackParamList,'Main'>>();
  const dispatch:AppDispatch=useDispatch();
  const [loading,setloading]=useState<boolean>(false);
  async function loginuser(userinput:logindata){
    setloading(true);
    try{
       const {data}=await apiConnector({
        method:'POST',
        url:authurls.login,
        data:{...userinput}
       })
       if(data.Success){
        Toast.show({
          type:'success',
          text1:'Login successfull',
        })
        dispatch(set_token(data?.Token))
       }
    }catch(err){
      console.log("Error while login","=>",err);
      Toast.show({
        type:'error',
        text1:err?.response?.data?.Message,
      })
    }finally{
      setloading(false);
    }
  }
  return (
    <View style={styles.maincontainer}>
      <Text style={{fontSize:25,fontWeight:'bold',margin:15}}>Login to your account</Text>
      <View>
        <Formik
         validationSchema={validateloginscheema}
         initialValues={{email:"",password:""}}
         onSubmit={(data:logindata)=>{
            loginuser(data);
         }}
        >
            {
                ({
                 values,
                 touched,
                 handleSubmit,
                 handleChange,
                 handleReset,
                 errors,
                 isValid   
                }:any)=>(
                <>
                 <View style={styles.inputcontainer}>
                    <Text>Enter email id</Text>
                    <TextInput style={styles.input} onChangeText={handleChange('email')} value={values.email} placeholder='Enter email id'/>
                    {
                        touched.email && errors.email && (
                            <Text style={styles.errortext}>{errors.email}</Text>
                        )
                    }
                 </View>    
                <View style={styles.inputcontainer}>
                  <Text>Enter your password</Text>
                  <TextInput secureTextEntry placeholder='Enter your password' value={values.password} onChangeText={handleChange('password')} style={styles.input}/>
                  {
                    touched.password && errors.password && (
                     <Text style={styles.errortext}>{errors.password}</Text>
                    )
                  }
                </View> 
                <View style={styles.inputcontainer}> 
                 <TouchableOpacity disabled={loading} onPress={handleSubmit} style={styles.button}>
                   {
                    loading?<Loader/>:<Text style={{color:'white',textAlign:'center'}}>LOGIN</Text>
                   }
                 </TouchableOpacity>
                </View>
                <Pressable onPress={()=>{navigation.navigate('Signup')}} style={{margin:15,marginTop:0,flexDirection:'row',justifyContent:'center'}}>
                    <Text>Don't have an account ? create a new</Text>
                </Pressable>
                </>
                )
            }
        </Formik>
      </View>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    maincontainer:{
      marginTop:10,
      flex:1,
      justifyContent:'center',
     
    },
    inputcontainer:{
        gap:5,
        margin:15,
        marginTop:3
    },
    input:{
        padding:10,
        borderRadius:15,
        borderWidth:2,
        borderColor:'#003580'
    },
    errortext:{
        color:'red',
        fontSize:18
    },
    button:{
        padding:15,
        backgroundColor:'#003580',
        borderRadius:15
    }
})