import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as yup from 'yup';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';

const validateprepaymentinformationscheema=yup.object().shape({
  name:yup.string().required().min(3),
  mobilenumber:yup.string().required().min(10).max(12),
  emailid:yup.string().email().required()
})
const PrePayment = ({setuserdetails,setstep}:{setuserdetails:(newValue:any)=>void,setstep:(newValue:number)=>void}) => {
  return (
    <View>
      <Text style={{fontWeight:'900',fontSize:20,marginTop:15,margin:15}}>Fill all required details</Text>
      <Formik
      validationSchema={validateprepaymentinformationscheema}
       initialValues={{name:"",mobilenumber:"",emailid:""}}
       onSubmit={(data)=>{
           if(data){
             setuserdetails(data);
             setstep(3);
           }
       }}
      >
        {
         ({
          handleChange,
          handleSubmit,
          errors,
          touched
         })=>(
          <>
           <View >
           <Text  style={styles.label}>Enter your name</Text>
           <TextInput  onChangeText={handleChange('name')} placeholder='Enter your name' style={styles.input}/>
           </View>

           {
           touched.name && errors.name && (
              <Text style={styles.errortext}>{errors.name}</Text>
            )
           }


           <View >
           <Text  style={styles.label}>Enter your mobilenumber</Text>
           <TextInput  onChangeText={handleChange('mobilenumber')} placeholder='Enter your mobilenumber' style={styles.input}/>
           </View>

           {
              touched.mobilenumber  && errors.mobilenumber && (
              <Text style={styles.errortext}>{errors.mobilenumber}</Text>
            )
           }

           <View >
           <Text  style={styles.label}>Enter your emailid</Text>
           <TextInput  onChangeText={handleChange('emailid')} placeholder='Enter emailid' style={styles.input}/>
           </View>
           {
           touched.emailid  && errors.emailid && (
              <Text style={styles.errortext}>{errors.emailid}</Text>
            )
           }

           <Pressable onPress={()=>{handleSubmit()}} style={styles.button}>
            <Text style={{color:'white',textAlign:'center'}}>Continue</Text>
           </Pressable>
          </>
         )
        }
      </Formik>
    </View>
  )
}

export default PrePayment

const styles = StyleSheet.create({
  label:{
   marginLeft:15
  },
  input:{
    margin:15,
    gap:15
  },
  button:{
    padding:15,
    backgroundColor:'#003580',
    borderRadius:10,
    margin:15
  }
  ,
  errortext:{
    color:'red',
    marginLeft:15
  }
})