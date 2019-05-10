/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  TextInput,
  Image,
  TouchableHighlight,
  AsyncStorage,
  YellowBox,
  Button,
  Alert,
  StyleSheet,
  ImageBackground,
  NetInfo,
} from 'react-native';
import {
  createSwitchNavigator
 } from 'react-navigation';
 import Orientation from 'react-native-orientation-locker';
//  import OfflineNotice from './OfflineNotice'
import FristPage from '../../App';
var urlPath = require('../URL');

const url = urlPath.url;

class SetorientationforApp extends React.Component {

  constructor(props){
    super(props);

    this.a = React.createRef();
    this.b = React.createRef();
    this.c = React.createRef();
    this.d = React.createRef();

    this.state = {

      Username: '',
      Password: '',
      DeviceID: '',

    }

  }

  check_and_update_devices = async () => {

    const devicevalue = await AsyncStorage.getItem('DeviceIDLocal');

    const option = {

                     method: 'POST',
                     headers: {
                       Accept: 'application/json',
                       'Content-Type': 'application/json',
                     },
                     body: JSON.stringify({

                       device_id: devicevalue

                     })
                    

                   }

   try {

     let response = await fetch(url + 'php/api/checkdevice.php', option );

     let responseJson = await response.json();

     if(responseJson == 1){
      await AsyncStorage.setItem('SetupStatusDevice', 'setup' );
      // Alert.alert('อุปกรณ์สามารถใช้งานได้');
      Alert.alert(
        'เเจ้งเตือน',
        'อุปกรณ์สามารถใช้งานได้!',
        // [
        
        //   {text: 'ตั้งค่า', onPress: () => AndroidOpenSettings.wifiSettings()},
        // ],
        // {cancelable: true},
      );
     }else{
      // Alert.alert('อุปกรณ์ไม่สามารถใช้งานได้');
      Alert.alert(
        'เเจ้งเตือน',
        'อุปกรณ์ไม่สามารถใช้งานได้!',
        // [
        
        //   {text: 'ตั้งค่า', onPress: () => AndroidOpenSettings.wifiSettings()},
        // ],
        // {cancelable: true},
      );
     }

    

     } catch (error) {

       console.log(error);

     }

  }

set_valuelogin = async () => {

      const { Username }  = this.state ;
      const { Password }  = this.state ;
      const { DeviceID }  = this.state ;

     try {

         await AsyncStorage.setItem('UsernameLocal', Username );
         await AsyncStorage.setItem('PasswordLocal', Password );
         await AsyncStorage.setItem('DeviceIDLocal', 'PEACHSIGN-'+ DeviceID );

         const Usernamevalue = await AsyncStorage.getItem('UsernameLocal');
         const Passwordvalue = await AsyncStorage.getItem('PasswordLocal');
         const DeviceIDvalue = await AsyncStorage.getItem('DeviceIDLocal');

         console.log(DeviceIDvalue)

         const option = {

                          method: 'POST',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({

                            username: Usernamevalue,

                            password: Passwordvalue

                          })

                        }

         let response = await fetch(url + 'php/api/saveconfirm.php', option );

         let responseJson = await response.json();

          if(responseJson == '1'){

            Alert.alert("บักทึกเเล้ว");
            await AsyncStorage.setItem('SetupStatusUsernamePassword', 'setup' );
            await this.check_and_update_devices();
            await this.props.navigation.navigate('FristPage');

          }else{

            // Alert.alert("ไม่พบผู้ใช้งานกรุณาตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน");

            Alert.alert(
              'เเจ้งเตือน',
              'ไม่พบผู้ใช้งานกรุณาตรวจสอบชื่อผู้ใช้งานเเละรหัสผ่าน!',
              // [
              
              //   {text: 'ตั้งค่า', onPress: () => AndroidOpenSettings.wifiSettings()},
              // ],
              // {cancelable: true},
            );
            

          }

       } catch (error) {

         console.log(error);

       }

 }

 clear_valuelogin = async () => {

    try {

        await AsyncStorage.removeItem('UsernameLocal');
        await AsyncStorage.removeItem('PasswordLocal');
        await AsyncStorage.removeItem('DeviceIDLocal');
        await AsyncStorage.removeItem('Username_ID_Local');
        await AsyncStorage.removeItem('SetupStatus');

        Alert.alert("ลบข้อมูลเเล้ว");

      } catch (error) {

        console.log(error);

      }

   }

async componentDidMount(){

    await Orientation.lockToLandscape();

  }


  render() {
    return (

      

  <View style={{
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor:'rgba(36, 40, 45, 0.8)',
    flexDirection: 'row',
    justifyContent: 'center',
  }}>

   

  <StatusBar hidden={true} />

  {/* <OfflineNotice /> */}

  <View style={{
    flex: 3,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
  }}>

              <View style={{
                borderWidth: 1,
                borderBottomColor:'rgb(255,252,252)',
                borderColor: 'transparent',
                marginBottom: 10,
                marginTop: 5
             }}>

             <TextInput style={{color: 'rgb(255,252,252)'}}
             autoFocus={true}
             disableFullscreenUI={true}
             ref={this.a}
             onSubmitEditing={() => this.b.current.focus()}
             placeholder="ชื่อผู้ใช้งาน หรือ E-mail"
             placeholderTextColor='rgb(158,158,158)'
             onChangeText={(Username) => this.setState({Username})}
             />

            </View>

            <View style={{
                borderWidth: 1,
                borderBottomColor:'rgb(255,252,252)',
                borderColor: 'transparent',
                marginBottom: 10,
                marginTop: 5
             }}>
              <TextInput style={{color: 'rgb(255,252,252)'}}
              disableFullscreenUI={true}
              ref={this.b}
              onSubmitEditing={() => this.c.current.focus()}
              placeholder="รหัสผ่าน"
              placeholderTextColor='rgb(158,158,158)'
              onChangeText={(Password) => this.setState({Password})}
              />
            </View>

          <View style={{
              flex: 1,
              borderColor: 'transparent',
              flexDirection: 'row',
              justifyContent: 'center',
           }}>


          <View style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: 'rgb(255,252,252)',
              borderColor: 'transparent',
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
           }}>

           <Text style={{
              flex: 1,
              marginTop: 10,
              alignItems: 'center',
              justifyContent: 'center',
           }}>PEACHSIGN-</Text>


          </View>

            <View style={{
              flex: 3,
              borderWidth: 1,
              borderBottomColor: 'rgb(255,252,252)',
              borderColor: 'transparent',
              marginTop: 10,
              marginLeft: 10,
           }}>


            <TextInput style={{color: 'rgb(255,252,252)'}}
            disableFullscreenUI={true}
            ref={this.c}
            placeholder="รหัสประจำเครื่อง"
            placeholderTextColor='rgb(158,158,158)'
            onChangeText={(DeviceID) => this.setState({DeviceID})}
            />

          </View>


          </View>

          <View style={{
              flex: 1,
              borderRadius: 5,
              backgroundColor: 'transparent',
              borderColor: 'transparent',
           }}>


          </View>


          <View style={{
                flex: 2,
                borderWidth: 1,
                borderColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>

              <View style={{
                flex: 1,
                paddingRight: 10,
                marginTop: 10,
              }}>

              <TouchableHighlight onPress={ this.set_valuelogin }
              underlayColor='rgb(138,234,140)'
              style={{
                backgroundColor: 'rgb(87,189,89)',
                height: 50,
                borderRadius: 5,
                justifyContent:'center',
                alignItems:'center',
                
              }}>

                  <Text style={{color: '#fff'}}> บันทึกค่าข้อมูลนี้ </Text>

              </TouchableHighlight>

              </View>


              <View style={{
                flex: 1,
                marginTop: 10,
                paddingLeft: 10,
              }}>

              <TouchableHighlight onPress={ this.clear_valuelogin }
              underlayColor='rgb(232,159,159)'
              style={{
                backgroundColor: 'rgb(232,109,109)',
                height: 50,
                borderRadius: 5,
                justifyContent:'center',
                alignItems:'center',
              }}>

                <Text style={{color: '#fff'}}> ล้างค่าข้อมูล </Text>

              </TouchableHighlight>

              </View>

              </View>

              <View style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>


              </View>


  </View>


  </View>


    );
  }
}

export default createSwitchNavigator(
  {
    SetorientationPage: { screen: SetorientationforApp },
    // SetorientationPage: { screen: FristPage },
  }
);
