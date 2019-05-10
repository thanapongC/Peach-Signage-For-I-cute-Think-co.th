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
  Image,
  AsyncStorage,
  YellowBox,
  Alert,
  NetInfo,
  AppState,
} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
 } from 'react-navigation';
 import codePush from "react-native-code-push";
 import Orientation from 'react-native-orientation-locker';
 import AndroidOpenSettings from 'react-native-android-open-settings'
 import * as Progress from 'react-native-progress';
 import FristPage from './Check_Permission'

 const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

class CheckupdatePageScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      appState: AppState.currentState,
      status: 'ตรวจสอบการอัพเดต',
    };
  }

Checkupdate() {
  // console.log('call checkupdate')
  codePush.sync({
    updateDialog: true,
    installMode: codePush.InstallMode.IMMEDIATE
    }, (status) => {
            switch (status) {
              case codePush.SyncStatus.CHECKING_FOR_UPDATE:
              // console.log("Checking for updates.");
              this.setState({
  
                status: 'ตรวจสอบการอัพเดตระบบ..',

              })
              break;
              case codePush.SyncStatus.DOWNLOADING_PACKAGE:
                  // console.log("Downloading package.");
                  this.setState({
  
                    status: 'ดาวน์โหลดการอัพเดต..',
    
                  })
                  break;
              case codePush.SyncStatus.INSTALLING_UPDATE:
                  // console.log("Installing update.");
                  this.setState({
  
                    status: 'ติดตั้งการอัพเดต..',
    
                  })
                  break;
              case codePush.SyncStatus.UP_TO_DATE:
                  // console.log("Up-to-date.");
                  this.setState({
  
                    status: 'อัพเดตเสร็จสิ้น..',
    
                  })
                  codePush.restartApp();
                  break;
              case codePush.SyncStatus.UPDATE_INSTALLED:
                  // console.log("Update installed.");
                  this.setState({
  
                    status: 'กำลังเริ่มต้นระบบใหม่..',
    
                  })
                  codePush.restartApp();
                  break;
              case codePush.SyncStatus.ERROR:
                  console.log("Update Error");
                  this.setState({

                    status: 'Server Error..',

                  })
              break;
              default:
                  console.log("I dont know.");
                  this.setState({

                    status: 'ไม่สามารถตรวจสอบการอัพเดตได้..',
    
                  })
                  break;
          }
      })
}

CheckConnectivity = async () => {
  NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected) {
      this.setState({

        isLoading: true

      });

      codePush.checkForUpdate().then((update) => {
        if (!update) {
  
            console.log("The app is up to date!");
            this.setState({

              status: 'อัพเดตเป็นเวอร์ชั่นล่าสุดเเล้ว..',
      
            });
            setTimeout(() => {

              this.props.navigation.navigate('nextPage');
          
              }, 5000);
  
        } else {

            codePush.allowRestart();
            this.Checkupdate();
            console.log("An update is available! Should we download it?");
        }
    });

    }else{
      Alert.alert(
        'เเจ้งเตือน',
        'กรุณาเชื่อมต่ออินเทอร์เน็ต!',
        [ {text: 'ตั้งค่า', onPress: () => AndroidOpenSettings.wifiSettings()}, ],
        {cancelable: false},
      );
    }
  });
};


async componentDidMount(){

  Orientation.lockToLandscape();
  this.CheckConnectivity();

}

  render() {

  if (this.state.isLoading) {

    return (

      <View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'rgba(36, 40, 45, 0.8)',
      }}>

          <StatusBar hidden={true} />
          

          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>

      <View style={{
        backgroundColor:'transparent',
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Image
            source={require('./img/icon/sig.png') }
            style={{width: 400, height: 400 }}
          />

      </View>

          <Text style={{
            color: 'white',
            paddingBottom: 5
          }}>{this.state.status}</Text>

          <Progress.Bar 
           width={500}
           color = 'rgba(255,252,252, 1)'
           size={60}
           height={15}
           progress={0.9}
           indeterminate={true}
           animated={true}
         />

         <Text style={{
           paddingBottom: 5
         }}></Text>

       </View>

       </View>

    );

  }else{

    return (

      <View style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: 'transparent', backgroundColor:'rgba(36, 40, 45, 0.8)', flexDirection: 'column', justifyContent: 'center' }}>

          <StatusBar hidden={true} />

              <View style={{ backgroundColor:'transparent', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>

                  <Image source={require('./img/icon/sig.png') } style={{width: 400, height: 400 }}  />

              </View>

      </View>

    );
  }
  }
}

const viewpagecontainer = createSwitchNavigator(
  {
    CheckupdatePage: CheckupdatePageScreen,
    nextPage: FristPage
  }
);

export default codePush(codePushOptions)(viewpagecontainer);
