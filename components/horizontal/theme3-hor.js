import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  TextInput,
  Button,
  Image,
  TouchableHighlight,
  FlatList,
  ActivityIndicator,
  AsyncStorage,
  Alert,
  YellowBox
} from 'react-native';
import {
  createSwitchNavigator
 } from 'react-navigation';
 import moment from "moment";
 import keepAwake from "react-native-keep-awake";
import VideoPlayer from 'react-native-video-controls';
import ImageCarousel from 'react-native-image-page';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import RNFetchBlob from 'rn-fetch-blob';

 var urlPath = require('../URL');

 const url = urlPath.url;
 const { config, fs } = RNFetchBlob
 import FristPage from '../../App';

class Theme3ScreenHor extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      time: moment().format("LT"),
      date: moment().format("ll"),
      lengthState: '',
      lengthState_2: '',
      lengthState_3: '',
      ArrayPic: '',
      ArrayPic_2: '',
      ArrayPic_3: '',
      isLoading: false,

    }

  }

get_store_pic = async () => {

   try {

       const LengthPicvalue = await AsyncStorage.getItem('LengthPic');
       const LengthPicvalue_2 = await AsyncStorage.getItem('LengthPic_2');
       const LengthPicvalue_3 = await AsyncStorage.getItem('LengthPic_3');
       
       const ArrayPicvalue = await AsyncStorage.getItem('ArrayPic');
       var obj = JSON.parse(ArrayPicvalue);
      //  console.log(ArrayPicvalue)

       const ArrayPicvalue_2 = await AsyncStorage.getItem('ArrayPic_2');
       var obj_2 = JSON.parse(ArrayPicvalue_2);
      //  console.log(ArrayPicvalue)

       const ArrayPicvalue_3 = await AsyncStorage.getItem('ArrayPic_3');
       var obj_3 = JSON.parse(ArrayPicvalue_3);
      //  console.log(ArrayPicvalue)

       this.setState({

         lengthState: LengthPicvalue,
         lengthState_2: LengthPicvalue_2,
         lengthState_3: LengthPicvalue_3,
         ArrayPic: obj,
         ArrayPic_2: obj_2,
         ArrayPic_3: obj_3

       });
     } catch (error) {
       console.log(error);
     }
  }

re_render = async () => {
   try {
       this.setState({

         isLoading: true

       });
     } catch (error) {
       console.log(error);
     }
  }

get_update = async () => {

               try {

                 const Usernamevalue = await AsyncStorage.getItem('UsernameLocal');
                 const Passwordvalue = await AsyncStorage.getItem('PasswordLocal');
                 const DeviceIDvalue = await AsyncStorage.getItem('DeviceIDLocal');
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
                                      template_id: temIDvalue,
                                      statusdevice: 'online'

                                    })

                                  }

                   let response = await fetch(url + 'php/api/get_update.php', option );

                   let responseJson = await response.json();

                   console.log(responseJson)

                    if(responseJson == '1'){

                      await AsyncStorage.removeItem('Template_id');
                      await AsyncStorage.removeItem('LengthPic');
                      await AsyncStorage.removeItem('ArrayPic');
                      await AsyncStorage.removeItem('LengthPic_2');
                      await AsyncStorage.removeItem('ArrayPic_2');
                      await AsyncStorage.removeItem('LengthPic_3');
                      await AsyncStorage.removeItem('ArrayPic_3');
                      await this.props.navigation.navigate('FristPage');

                    }else{

                      console.log('no change');

                    }

                 } catch (error) {

                   console.log(error);

                 }

           }


  async componentDidMount(){

    await Orientation.lockToLandscape();
    await this.get_store_pic();
    await this.re_render();

  }


  render() {

    setTimeout(() => {

    this.get_update();

    }, 1000);

if (this.state.isLoading) {

  setTimeout(() => {

    this.setState({
      time: moment().format("LT"),
      date: moment().format("ll")
    })
  }, 30000);

    return (

      <View style={{
        flex: 1,
        backgroundColor: 'black'
      }}>

          <StatusBar hidden={true} />

          <View style={{
            flex: 5,
            flexDirection: 'row',
            backgroundColor: 'black'
          }}>

        <View style={{
          flex: 1,
          backgroundColor: 'black',
        }}>

        <View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'center', zIndex: 1 }}>

           <ImageCarousel
               height={"100%"}
               delay={2000}
               hideIndicators={true}
               indicatorSize={10}
               images={ this.state.ArrayPic }
               />

           </View>

        </View>

        <View style={{
          flex: 1,
          backgroundColor: 'black',
        }}>

        <View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'center', zIndex: 1 }}>

           <ImageCarousel
               height={"100%"}
               delay={2000}
               hideIndicators={true}
               indicatorSize={10}
               images={ this.state.ArrayPic_2 }
               />

           </View>

        </View>

        </View>

        <View style={{
          flex: 2.5,
          flexDirection: 'row',
          backgroundColor: 'black'
        }}>

      <View style={{
        flex: 1,
        backgroundColor: 'black',
      }}>

      <View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'center', zIndex: 3 }}>

         <ImageCarousel
             height={"100%"}
             delay={2000}
             hideIndicators={true}
             indicatorSize={10}
             images={ this.state.ArrayPic_3 }
             />

         </View>

      </View>

      </View>

     </View>

    );

  }else{

    return (

      <View style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white'
      }}>

        <StatusBar hidden={true} />

          <Text></Text>

       </View>

    );
  }

  }
}

export default createSwitchNavigator(
  {
    Theme3ScreenHorPage: { screen: Theme3ScreenHor },
  }
);
