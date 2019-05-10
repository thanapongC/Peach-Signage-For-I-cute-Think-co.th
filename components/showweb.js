import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  AsyncStorage,
  WebView,
} from 'react-native';
import {
  createSwitchNavigator
 } from 'react-navigation';
import moment from "moment";
import keepAwake from "react-native-keep-awake";
import Orientation from 'react-native-orientation-locker';
// import Orientation from 'react-native-orientation';
var urlPath = require('./URL');
const url = urlPath.url;
import FristPage from '../App';

class Showweb extends React.Component {

    constructor(props){
        super(props);
    
        this.state = {
          URLlink: '',
          time: moment().format("LT"),
          date: moment().format("ll"),
          isLoading: false,
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

                 const DeviceIDvalue = await AsyncStorage.getItem('DeviceIDLocal');
                 const setXYAPI = await AsyncStorage.getItem('SetXY');
                 const Website = await AsyncStorage.getItem('URLwebsite');

                   const option = {

                                    method: 'POST',
                                    headers: {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({

                                      device_id: DeviceIDvalue,
                                      statusdevice: 'online'

                                    })

                                  }

                   let response = await fetch(url + 'php/api/settingdevice.php', option );

                   let responseJson = await response.json();


                    if(responseJson.showtype == 'close' || responseJson.xy != setXYAPI || responseJson.link != Website){

                      await AsyncStorage.removeItem('URLwebsite');
                      await AsyncStorage.removeItem('SetXY');
                      await this.props.navigation.navigate('FristPage');

                    }else{

                      console.log('no change');

                    }

                 } catch (error) {

                   console.log(error);

                 }

           }


async componentDidMount(){

    const website = await AsyncStorage.getItem('URLwebsite');
    const setXY = await AsyncStorage.getItem('SetXY');
    this.setState({

      URLlink: website,

    });
    if(setXY == 'horizontal'){

      await Orientation.lockToLandscape();

    }else if(setXY == 'vertical'){

      await Orientation.lockToPortrait();

    }
    await this.re_render();

    }

  render() {

          setTimeout(() => {

          this.get_update();

          }, 10000);

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

          <WebView
            source={{uri: this.state.URLlink}}
            style={{marginTop: 20}}
          />
        
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
    ShowwebPage: { screen: Showweb },
  }
);
