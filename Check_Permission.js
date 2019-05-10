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
  PermissionsAndroid,
  Alert,
  NetInfo,
} from 'react-native';
import {
  createSwitchNavigator,
  createAppContainer,
 } from 'react-navigation';
 import codePush from "react-native-code-push";
 import Orientation from 'react-native-orientation-locker';
 import LoadingHor1Page from './components/loading/loading_hor1';
 import LoadingHor2Page from './components/loading/loading_hor2';
 import LoadingHor3Page from './components/loading/loading_hor3';
 import LoadingHor4Page from './components/loading/loading_hor4';
 import LoadingHor5Page from './components/loading/loading_hor5';
 import LoadingVer1Page from './components/loading/loading_ver1';
 import LoadingVer2Page from './components/loading/loading_ver2';
 import LoadingVer3Page from './components/loading/loading_ver3';
 import LoadingVer4Page from './components/loading/loading_ver4';
 import LoadingVer5Page from './components/loading/loading_ver5';
 import ShowwebPage from './components/showweb';

import SetorientationPage from './components/setting/setorientation';
import AndroidOpenSettings from 'react-native-android-open-settings'
import RNFetchBlob from 'rn-fetch-blob';

var urlPath = require('./components/URL');

const url = urlPath.url;

class FristPageScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

PermissionsStorage = async () => {


    const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              'title': 'ขออนุญาติใช้พื้นที่จัดเก็บ',
              'message': 'ระบบต้องการใช้พื้นที่จัดเก็บ'
            }
    )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("คุณสามารถใช้พื้นที่จัดเก็บได้");
                } else {
                    console.log("คุณไม่สามารถใช้พื้นที่จัดเก็บได้");
                }

}

get_update = async () => {

                try {

                  const Usernamevalue = await AsyncStorage.getItem('UsernameLocal');
                  const Passwordvalue = await AsyncStorage.getItem('PasswordLocal');
                  const DeviceIDvalue = await AsyncStorage.getItem('DeviceIDLocal');
                  const tem_selectIDvalue = await AsyncStorage.getItem('Template_select_id');
                  const temIDvalue = await AsyncStorage.getItem('Template_id');

                    const option = {
                                     method: 'POST',
                                     headers: {
                                       Accept: 'application/json',
                                       'Content-Type': 'application/json',
                                     },
                                     body: JSON.stringify({
                                       username: Usernamevalue,
                                       password: Passwordvalue,
                                       device_id: DeviceIDvalue,
                                       template_select_id: tem_selectIDvalue,
                                       template_id: temIDvalue,
                                       statusdevice: 'online'
                                     })
                                   }

                    let response = await fetch(url + 'php/api/get_update.php', option );
                    let responseJson = await response.json();

                     if(responseJson == '1'){
                          await AsyncStorage.removeItem('Template_select_id');
                          await AsyncStorage.removeItem('Template_id');
                          await this.login_system();
                     }else{
                          console.log('no change');
                     }

                  } catch (error) {

                    console.log(error);
                    Alert.alert(error)

                  }

            }

login_system = async () => {


              const devicevalue = await AsyncStorage.getItem('DeviceIDLocal');
              const setupstatusdevice = await AsyncStorage.getItem('SetupStatusDevice');
              const setupstatususerpassword = await AsyncStorage.getItem('SetupStatusUsernamePassword');
       
              const option = {
      
                              method: 'POST',
                              headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
      
                                device_id: devicevalue,
                                statusdevice: 'online'
      
                              })
      
                            }
       
             try {
       
               let responseDevice = await fetch(url + 'php/api/settingdevice.php', option );
               let responseJsonDevice = await responseDevice.json();

               if(setupstatusdevice == 'setup' && setupstatususerpassword == 'setup'){
       
                                  if(responseJsonDevice.showtype == 'close'){
                        
                                        let response = await fetch(url + 'php/api/getdata.php', option );
                                        let responseJson = await response.json();

                                        console.log(responseJson)

                                  if(responseJson.template_select_id == '11'){
                        
                                            let template_id = responseJson.template_id;
                                            await AsyncStorage.setItem('Template_id', template_id );
                                
                                                setTimeout(() => {
                                                      this.props.navigation.navigate('LoadingHor1PageRoute');
                                                  }, 2500);
                        
                                  }else if(responseJson.template_select_id == '12'){
                        
                                            let template_id = responseJson.template_id;
                                            await AsyncStorage.setItem('Template_id', template_id );
                                
                                                setTimeout(() => {
                                                      this.props.navigation.navigate('LoadingHor2PageRoute');
                                                  }, 5000);
                        
                                  }else if(responseJson.template_select_id == '13'){
                        
                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingHor3PageRoute');
                                                }, 5000);
                        
                                  }else if(responseJson.template_select_id == '14'){
                        
                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingHor4PageRoute');
                                                }, 5000);
                        
                                  }else if(responseJson.template_select_id == '15'){
                        
                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingHor5PageRoute');
                                                }, 5000);
                        
                                  }else if(responseJson.template_select_id == '21'){
                        
                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingVer1PageRoute');
                                                }, 5000);
                        
                                  }else if(responseJson.template_select_id == '22'){
                        
                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingVer2PageRoute');
                                                }, 5000);
                        
                                  }else if(responseJson.template_select_id == '23'){
                        
                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingVer3PageRoute');
                                                }, 5000);
                        
                                  }else if(responseJson.template_select_id == '24'){
                        
                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingVer4PageRoute');
                                                }, 5000);
                        
                                  }else if(responseJson.template_select_id == '25'){

                                          let template_id = responseJson.template_id;
                                          await AsyncStorage.setItem('Template_id', template_id );
                              
                                              setTimeout(() => {
                                                    this.props.navigation.navigate('LoadingVer5PageRoute');
                                                }, 5000);
                        
                                  }else{
                        
                                          console.log('กรุณาเลือกรูปเเบบที่จะทำการเเสดงในระบบ');
                            
                                          setTimeout(() => {
                                                this.get_update();
                                              }, 5000);
                        
                                  }
                        
                                }else if(responseJsonDevice.showtype == 'open'){
                        
                                        console.log('open')
                              
                                        var link = responseJsonDevice.link;
                                        var setxy = responseJsonDevice.xy;
                              
                                        await AsyncStorage.setItem('URLwebsite', link);
                                        await AsyncStorage.setItem('SetXY', setxy);
                              
                                        setTimeout(() => {
                                          this.props.navigation.navigate('Showweb');
                                        }, 5000);
                        
                                }
       
              }else if(setupstatusdevice == null){
       
                    setTimeout(() => {
                          this.props.navigation.navigate('Setorientation');
                      }, 5000);
       
              }
       
       
               } catch (error) {

                console.log(error);
                Alert.alert(error)

               }
       
}

delete_file_video = async () => {

      let pathvideo = RNFetchBlob.fs.dirs.DownloadDir + '/video_peachsignage';
   
      RNFetchBlob.fs.isDir(pathvideo).then( async (isDir) => {
            if(isDir != false ){
                await RNFetchBlob.fs.unlink(pathvideo);
            }else{
                console.log('ไม่พบเส้นทางในระบบ');
            }
      })

}
   
delete_file_pic = async () => {
   
     let path = RNFetchBlob.fs.dirs.DownloadDir + '/picture_peachsignage';
     let path_2 = RNFetchBlob.fs.dirs.DownloadDir + '/picture_peachsignage2';
     let path_3 = RNFetchBlob.fs.dirs.DownloadDir + '/picture_peachsignage3';

      RNFetchBlob.fs.isDir(path).then( async (isDir) => {
            if(isDir != false ){
                await RNFetchBlob.fs.unlink(path);
            }else{
                console.log('ไม่พบเส้นทางในระบบ');
            }
      })
  
    RNFetchBlob.fs.isDir(path_2).then( async (isDir2) => {
            if(isDir2 != false ){
                await RNFetchBlob.fs.unlink(path_2);
            }else{
                console.log('ไม่พบเส้นทางในระบบ');
            }
    })
  
    RNFetchBlob.fs.isDir(path_3).then( async (isDir3) => {
            if(isDir3 != false ){
                await RNFetchBlob.fs.unlink(path_3);
            }else{
                console.log('ไม่พบเส้นทางในระบบ');
                // Alert.alert('ไม่พบเส้นทางในระบบ')
            }
    })

   
}

CheckConnectivity = () => {
  NetInfo.isConnected.fetch().then(isConnected => {
    if (isConnected) {
      // Alert.alert("!");
      this.setState({

        isLoading: true

      });

      this.login_system();

    } else {
      Alert.alert(
        'เเจ้งเตือน',
        'กรุณาเชื่อมต่ออินเทอร์เน็ต!',
        [
        
          {text: 'ตั้งค่า', onPress: () => AndroidOpenSettings.wifiSettings()},
        ],
        {cancelable: false},
      );
    }
  });
};

async componentDidMount(){
  this.CheckConnectivity();
  Orientation.lockToLandscape();
  await this.PermissionsStorage();
  await this.delete_file_video();
  await this.delete_file_pic();
}

  render() {

  if (this.state.isLoading) {

      setTimeout(() => {

        this.get_update();

      }, 10000);

    return (

      <View style={{ flex: 1, padding: 10, borderWidth: 1, borderColor: 'transparent', backgroundColor:'rgba(36, 40, 45, 0.8)', flexDirection: 'column', justifyContent: 'center' }}>

          <StatusBar hidden={true} />

              <View style={{ backgroundColor:'transparent', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>

                  <Image source={require('./img/icon/sig.png') } style={{width: 400, height: 400 }}  />

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

const codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_START };

// export default createSwitchNavigator(
//   {
//     FristPage: { screen: FristPageScreen },
//     Setorientation: { screen: SetorientationPage },
//     LoadingHor1PageRoute: { screen: LoadingHor1Page },
//     LoadingHor2PageRoute: { screen: LoadingHor2Page },
//     LoadingHor3PageRoute: { screen: LoadingHor3Page },
//     LoadingHor4PageRoute: { screen: LoadingHor4Page },
//     LoadingHor5PageRoute: { screen: LoadingHor5Page },
//     LoadingVer1PageRoute: { screen: LoadingVer1Page },
//     LoadingVer2PageRoute: { screen: LoadingVer2Page },
//     LoadingVer3PageRoute: { screen: LoadingVer3Page },
//     LoadingVer4PageRoute: { screen: LoadingVer4Page },
//     LoadingVer5PageRoute: { screen: LoadingVer5Page },
//     Showweb: { screen: ShowwebPage },
//   }
// );

export default createSwitchNavigator(
  {
    FristPage: FristPageScreen,
    Setorientation: SetorientationPage,
    LoadingHor1PageRoute: LoadingHor1Page,
    LoadingHor2PageRoute: LoadingHor2Page,
    LoadingHor3PageRoute: LoadingHor3Page,
    LoadingHor4PageRoute: LoadingHor4Page,
    LoadingHor5PageRoute: LoadingHor5Page,
    LoadingVer1PageRoute: LoadingVer1Page,
    LoadingVer2PageRoute: LoadingVer2Page,
    LoadingVer3PageRoute: LoadingVer3Page,
    LoadingVer4PageRoute: LoadingVer4Page,
    LoadingVer5PageRoute: LoadingVer5Page,
    Showweb: ShowwebPage,
  }
);

