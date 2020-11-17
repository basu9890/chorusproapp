import React ,{PropTypes}from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Button,
  AsyncStorage,
  PermissionsAndroid
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class RegistrationScreen extends React.Component{

state={
  firstName:'',
  lastName:'',
  email:'',
  mobileNumber:'',
  password:'',
  confirmPassword:'',
  statusPermission:'',
  latitude:'',
  longitude:'',
  filePath:{}
}
componentDidMount() {

  this.getPermissionsAsync();
  this.loginApi();
 }

 storeData = async () => {
  try {
    await AsyncStorage.setItem('Manager',this.state.managerValue)
  } catch (e) {
    alert(e);
  }
}


  registerUser=()=>{
    if (this.state.firstName != '') {  
        if (this.state.email != '') {
          if (this.state.mobileNumber != '') {
          
                 if( this.isEmailValid(this.state.email)){
                   if( this.phonenumber(this.state.mobileNumber)){
                    this.postDetails1()
                 // this.props.navigation.navigate('Home1',{name:this.state.firstName})
               
              }else{
                alert('Please Enter Valid Mobile Number');
                }
              } else{
                  alert('Please Enter Valid Email Address');
                }
             
             
          
          } else {
            alert('Please Enter Valid Mobile Number');
          }
        } else {
          alert('Please Enter Email Address');
        }
     
    } else {
      alert('Please Enter First Name');
    }
   
  }
  isEmailValid = (mail) => {
    console.log(this.state.mobileNumber)
   
    let email = mail
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(String(email).toLowerCase())
}
 phonenumber(inputtxt) {
  var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(inputtxt.match(phoneno)) {
    return true;
  }
  else {
    
    return false;
  }
}


getPermissionsAsync= async () =>{
  try {
     const  status  = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
     console.warn(status);
     if (status !== 'granted') {
       alert('Permission to access location was denied');
     }else if(status === 'granted'){

     this.setState({statusPermission:status});
     }}catch (err) {
      console.warn(err);
    }
   }

findCoordinates = () => {
if(this.state.statusPermission==='granted'){
navigator.geolocation = require('@react-native-community/geolocation');
navigator.geolocation.getCurrentPosition(
position => {
console.warn(position.coords.latitude,position.coords.longitude);
this.setState({latitude:position.coords.latitude,longitude:position.coords.longitude});

},
error => alert(error.message),
{ enableHighAccuracy: false, timeout: 20000 }
);
}else{
alert("Location Permission Require");
this.getPermissionsAsync();
}
};


loginApi=()=>{
 
  fetch("http://bubudashi.com/shoprunner/shop_list_new", {
    method: 'GET'
 })
 .then((response) => response.json())
 .then((responseJson) => {
    console.log(responseJson.data.length);
    
 })
 .catch((error) => {
    console.log(error);
 });
 

}

postDetails1=()=>{

  {
   

    // console.log("uyuyuyuyufufu",formData);
    let photo = { uri: this.state.filePath.uri}
    let formdata = new FormData();
    
    formdata.append("username",this.state.firstName)
    formdata.append("mobileno", this.state.mobileNumber)
    formdata.append("email", this.state.email)
    formdata.append("current_lat", this.state.latitude)
    formdata.append("current_lon", this.state.longitude)
    formdata.append("shop_logo", {uri: photo.uri, name: 'image.jpg', type: 'image/jpeg'})


   fetch("http://bubudashi.com/shoprunner/shop_register_new", {
       method: 'POST',
       headers: { 
       
         'Content-Type': 'multipart/form-data',
         },

       body: formdata
        
     })
     .then((response) => (response.json())) 
     .then((responseJson) => {console.warn(responseJson)
    
     {
       console.log("Yessss",responseJson);
     }
     })
     .catch((err) => { console.warn(err); });
   }

 }


postDetails=()=>{

  {
    let localUri = this.state.filePath.uri;
    let filename = localUri.split('/').pop();
    let match = (filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append('file', { uri: localUri, type , name: filename});

    console.log(localUri,filename,"uyuyuyuyufufu",formData);

   var data={
    username:this.state.firstName,
    mobileno:this.state.mobileNumber,
    email:this.state.email,
    current_lat:this.state.latitude,
    current_lon:this.state.longitude,
    shop_logo:formData,

   }

   fetch("http://bubudashi.com/shoprunner/shop_register_new", {
       method: 'POST',
       headers: { 
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         },

       body: JSON.stringify(data)
        
     })
     .then((response) => (response.json())) 
     .then((responseJson) => {console.warn(responseJson)
    
     {
       console.log("Yessss",responseJson);
     }
     })
     .catch((err) => { console.warn(err); });
   }

 }

chooseFile = () => {
  var options = {
    title: 'Select Image',
    customButtons: [
      { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
    ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  ImagePicker.showImagePicker(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      let source = response;
      console.log(source);
      this.setState({
        filePath: source,
      });
    }
  });
};

navigateToList=()=>{
  this.props.navigation.navigate('home');
}


    render(){
   

        return(
          <ScrollView contentContainerStyle={styles.view}
         
          >
                <View >
               <View >
            
         <TextInput
     style={styles.textInput}
     placeholder="Username*"
     placeholderTextColor="black"
     onChangeText={text =>this.setState({firstName:text})}
    />
         <TextInput
      style={styles.textInput}
      keyboardType='number-pad'
      onChangeText={text => this.setState({mobileNumber:text})}
     placeholder="Mobile Number*"

  maxLength={10}
     placeholderTextColor="black"
    />
     <TextInput
      style={styles.textInput}
      onChangeText={text =>this.setState({email:text})}
     placeholder="Email Address*"
     placeholderTextColor="black"
    />
    <View style={styles.button}>
        <Button
 onPress={this.findCoordinates}
  title="Location"
  color="#1E90FF"
/>
</View>
<View style={styles.button}>
<Button
 onPress={this.chooseFile}
  title="Browse"
  color="#1E90FF"
/>
</View>
        </View>
        <View style={styles.button}>
        <Button
 onPress={this.registerUser}
  title="Register"
  color="#1E90FF"

/>

</View>
<View style={styles.button}>
<Button
 onPress={this.navigateToList}
  title="Go To List"
  color="#1E90FF"
/>
</View>


                </View>
                </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  view:{
  
    justifyContent:"flex-start",
    alignItems:"center",
    
  },
textInput:{
 height: 40,
 width:300,
  borderColor: 'gray',
   borderWidth: 1,
   marginTop:15,
   marginLeft:10
},
button:{
  marginTop:15
}
});
