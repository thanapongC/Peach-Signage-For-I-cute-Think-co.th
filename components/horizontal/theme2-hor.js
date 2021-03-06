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
  YellowBox,
} from 'react-native';
import {
  createSwitchNavigator
 } from 'react-navigation';
 import moment from "moment";
 import keepAwake from "react-native-keep-awake";
import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';
import ImageCarousel from 'react-native-image-page';
import Orientation from 'react-native-orientation-locker';
import RNFetchBlob from 'rn-fetch-blob';

var urlPath = require('../URL');

const url = urlPath.url;
const { config, fs } = RNFetchBlob
import FristPage from '../../App';

class Theme2ScreenHor extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      time: moment().format("LT"),
      date: moment().format("ll"),
      lengthState: '',
      ArrayPic: '',
      ArrayVideo: '',
      isLoading: false,
    }

  }


get_store_pic = async () => {

       try {

           const LengthPicvalue = await AsyncStorage.getItem('LengthPic');
           const ArrayPicvalue = await AsyncStorage.getItem('ArrayPic');
           const ArrayVideovalue = await AsyncStorage.getItem('ArrayVideo');
           var obj = JSON.parse(ArrayPicvalue);
           var objVideo = JSON.parse(ArrayVideovalue);
           console.log(ArrayPicvalue)

           this.setState({

             lengthState: LengthPicvalue,
             ArrayPic: obj,
             ArrayVideo: objVideo

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
                      await AsyncStorage.removeItem('ArrayVideo');
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
        flexDirection: 'row',
      }}>

          <StatusBar hidden={true} />

        <View style={{flex: 7, backgroundColor: 'black', zIndex: 2 }}>

        <View style={{ flex: 3.5, backgroundColor: 'black', }}>

        <VideoPlayer
             repeat
             source={ this.state.ArrayVideo }
             disableVolume
             disableTimer
             disableFullscreen
             disableBack
             showOnStart
             disableSeekbar
             disablePlayPause
         />

        </View>

        </View>

        <View style={{
          flex: 3,
          backgroundColor: 'black',
          zIndex: 1
        }}>

        <View style={{ flex: 1 , flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>

        <ImageCarousel
            height={"100%"}
            delay={2000}
            hideIndicators={true}
            indicatorSize={10}
            images={ this.state.ArrayPic }
            />

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
    Theme2ScreenHorPage: { screen: Theme2ScreenHor },
  }
);
