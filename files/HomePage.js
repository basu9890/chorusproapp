import * as React from "react";
import {

  StyleSheet,
  FlatList,
  View,
  Text,

} from 'react-native';
import { Card,Divider   } from 'react-native-elements';
export default class HomePage extends React.Component{
   
state={
  listInfo:[],
}
constructor(props)
{
super(props);
this.getList();
}

// async componentDidMount(){
//     this.getList();
//   }
  
  getList=()=>{
   
    fetch("http://bubudashi.com/shoprunner/shop_list_new", {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((responseJson) => {
    console.log(responseJson);
    var dataLength=responseJson.data.length;
      for(var i=0;i<dataLength;i++){
   this.state.listInfo.push(responseJson.data[i].email);
  
      }

      console.log(this.state.listInfo,"sdfasdfasdfa");

    })
    
    
    .catch((error) => {
     //alert(error);
      console.warn(error);
    });
    }
    renderSeparator = () => {  
      return (  
          <View  
              style={{  
                  height: 1,  
                  width: "100%",  
                  backgroundColor: "#000",  
              }}  
          />  
      );  
  };  

    render(){

    console.log(this.state.listInfo,"0980980980")
    
        return(
                <View >
                     <FlatList  
                    data={ this.state.listInfo}  
                    renderItem={({item}) => 
                    <Card>
                        <Text   
                             >ssfsfsdf</Text>
                              </Card>
                              }  
                    ItemSeparatorComponent={this.renderSeparator}  
                    keyExtractor={item => item.email}
                />  

                </View>
        );
    }
}
const styles = StyleSheet.create({
    view:{
    
     flex:1
      
    },
  
  });