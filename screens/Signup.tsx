import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import OtpInputs from "react-native-otp-inputs";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import { Snackbar } from "react-native-paper";
import { schedulePushNotification } from "../components/Notification";
import Loader from "../components/Loader";
import { apiConnector } from "../services/connector";
import { authurls } from "../services/url";
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";


const signupvalidationscheema = yup.object().shape({
  email: yup.string().email().required(),
  firstname: yup.string().min(2, "minimum length should be 2").required(),
  lastname: yup.string().min(2, "minimum length should be two").required(),
  password:yup.string().required().min(8, 'Password must be at least 8 characters long').matches(/[A-Z]/, 'Password must contain at least one uppercase letter').matches(/[a-z]/, 'Password must contain at least one lowercase letter').matches(/[0-9]/, 'Password must contain at least one number').matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character'),
  otp: yup.string().length(6).required(),
});

interface signupdata {
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  otp: string;
}
const Signup = () => {
  const navigation=useNavigation();
  const [otpsent, setotpsent] = useState<boolean>(false);
  const [loading,setloading]=useState<boolean>(false);
  const [errortext,seterrortext]=useState<string>("");
  async function getotp(email:string) {
    if(!email){return seterrortext("Email is required")}
    setloading(true);
    try{
     const {data}=await axios.post(authurls.getotp,{
      email:email
     })
      setotpsent(true);
     if(data.Success){

      await schedulePushNotification(`Your otp to authorize signup is ${data?.Otp}`)
     }
   
    }catch(err:any){
      console.log(err);
      
      seterrortext(err?.response?.data?.Message)
    }finally{
      setloading(false);
    }

  }

 async  function createuser(userinput: signupdata) {
     setloading(true);
     try{
      const {data}=await apiConnector({
        method:"POST",
        url:authurls.signup,
        data:{...userinput}
      })
      if(data?.Success){
         seterrortext('Account created succefully')
         navigation.goBack();
      }
     }catch(err:any){
      console.log(err);
      seterrortext(err?.response?.data?.Message);
     }finally{
      setloading(false);
     }
  }

  return (

     <SafeAreaView style={{flex:1,justifyContent:'space-between'}}>
        <ScrollView>
        <View style={styles.container}>
          <Text style={{ fontSize: 25, fontWeight: "bold", margin: 15 }}>
            Create a new account
          </Text>
          <View>
            <Formik
              initialValues={{
                email: "",
                firstname: "",
                lastname: "",
                password: "",
                otp: "",
              }}
              validationSchema={signupvalidationscheema}
              onSubmit={(data: signupdata) => {
                createuser(data);
              }}
            >
              {({
                values,
                handleChange,
                handleSubmit,
                setFieldValue,
                touched,
                errors,
                handleReset,
                
              }) => (
                <>
                  <View style={styles.inputcontainer}>
                    <Text>Enter first name</Text>
                    <TextInput
                      value={values.firstname}
                      placeholder="Enter your firstname"
                      onChangeText={handleChange("firstname")}
                      style={styles.input}
                    />
                    {touched.firstname && errors.firstname && (
                      <Text style={styles.errortext}>{errors.firstname}</Text>
                    )}
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text>Enter last name</Text>
                    <TextInput
                      value={values.lastname}
                      placeholder="Enter your lastname"
                      onChangeText={handleChange("lastname")}
                      style={styles.input}
                    />
                    {touched.lastname && errors.lastname && (
                      <Text style={styles.errortext}>{errors.lastname}</Text>
                    )}
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text>Enter email address</Text>
                    <TextInput
                      value={values.email}
                      placeholder="Enter your emailaddress"
                      onChangeText={handleChange("email")}
                      style={styles.input}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errortext}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.inputcontainer}>
                    <Text>Create a new password</Text>
                    <TextInput
                      secureTextEntry
                      value={values.password}
                      placeholder="Create your password"
                      onChangeText={handleChange("password")}
                      style={styles.input}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errortext}>{errors.password}</Text>
                    )}
                  </View>
                  {otpsent && (
                    <>
                      <Text style={{ marginLeft: 15 }}>
                        Enter otp received on mail
                      </Text>

                      <OtpInputs
                        handleChange={(code) => {
                          if (code.length === 6) {
                            setFieldValue("otp", code);
                          }
                        }}
                        numberOfInputs={6}
                        autofillFromClipboard={false}
                        inputContainerStyles={{
                          margin: 15,
                          flex: 1,
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                        inputStyles={{
                          width: 30,
                          height: 30,
                          borderBottomWidth: 3,
                          borderBottomColor: "#4dc3ff",
                          textAlign: "center",
                          fontSize: 25,
                        }}
                      />

                      {touched.otp && errors.otp && (
                        <Text style={[styles.errortext, { marginLeft: 15 }]}>
                          {errors.otp}
                        </Text>
                      )}
                    </>
                  )}
                  <TouchableOpacity
                  disabled={loading}
                    onPress={() => {
                      otpsent ? handleSubmit() : getotp(values?.email);
                    }}
                    style={styles.button}
                  >
                    {
                      loading?<Loader/>:(<Text
                        style={{
                          color: "white",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        {otpsent ? "Create account" : "Get otp"}
                      </Text>)
                    }
                 
                   
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
        
        </ScrollView>
        <Snackbar visible={errortext!==""}
        duration={5000} onDismiss={()=>seterrortext("")}
        >
         {errortext}
        </Snackbar>
     </SafeAreaView>

  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  inputcontainer: {
    gap: 5,
    margin: 15,
    marginTop: 6,
  },
  input: {
    padding: 10,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#003580",
  },
  errortext: {
    color: "red",
    fontSize: 18,
  },
  button: {
    padding: 15,
    backgroundColor: "#003580",
    borderRadius: 15,
    margin: 15,
    marginTop: 30,
  },
});
