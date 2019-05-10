import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  Image,
  ActivityIndicator,
  AsyncStorage,
  YellowBox,
  ImageBackground,
} from 'react-native';
import {
  createSwitchNavigator
 } from 'react-navigation';
// import RNFetchBlob from 'react-native-fetch-blob';
// import Orientation from 'react-native-orientation';
import Orientation from 'react-native-orientation-locker';
import RNFetchBlob from 'rn-fetch-blob';
import ReadPicItemPagehor5 from '../readimg/readimghor5';
import * as Progress from 'react-native-progress';

var urlPath = require('../URL');

const url = urlPath.url;
const { config, fs } = RNFetchBlob;

class LoadingHor5 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      Pic: '',
      text: '',
      Pic_2: '',
    }

  }

extention(filename){
      return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

downloadpic = async (picurl) => {

        try{
          var date = new Date();
          let PicURL = url + picurl;
          var ext = this.extention(PicURL);
          ext = "."+ext[0];
            let PictureDir = fs.dirs.DownloadDir + '/picture_peachsignage'
            let options = {
              fileCache: false,
              addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                path:  PictureDir + "/signagePic_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description : 'Picture'
              }
            }

          await config(options).fetch('GET', PicURL)

        }catch (err) {
      console.warn(err)
    }

        }

downloadpic_2 = async (picurl_2) => {

        try{
          var date = new Date();
          let PicURL = url + picurl_2;
          var ext = this.extention(PicURL);
          ext = "."+ext[0];
            let PictureDir = fs.dirs.DownloadDir + '/picture_peachsignage2'
            let options = {
              fileCache: false,
              addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                path:  PictureDir + "/signagePic_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description : 'Picture'
              }
            }

          await config(options).fetch('GET', PicURL)

        }catch (err) {
      console.warn(err)
    }

        }


get_data = async () => {

        const devicevalue = await AsyncStorage.getItem('DeviceIDLocal');

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

         let response = await fetch(url + 'php/api/getdataall.php', option )
         .then((response) => response.json())
               .then((responseJson) => {

                 this.setState({

                   Pic: responseJson.image_slide_1,
                   text: responseJson.text_content,

                 })

                 let picstring = this.state.Pic;
                 var Picarray = picstring.split('|');

                 for (let picarray of Picarray) {

                  this.downloadpic(picarray);

                 }

               }).catch((error) => {
                 console.error(error);
               });;

         } catch (error) {

           console.log(error);

         }

      }

      get_data_2 = async () => {

              const devicevalue = await AsyncStorage.getItem('DeviceIDLocal');

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

               let response = await fetch(url + 'php/api/getdataall.php', option )
               .then((response) => response.json())
                     .then((responseJson) => {

                       this.setState({

                         Pic_2: responseJson.image_slide_2,

                       })

                       let picstring_2 = this.state.Pic_2;
                       var Picarray_2 = picstring_2.split('|');

                       for (let picarray_2 of Picarray_2) {

                        this.downloadpic_2(picarray_2);

                       }

                     }).catch((error) => {
                       console.error(error);
                     });;

               } catch (error) {

                 console.log(error);

               }

            }

    async componentDidMount(){

    Orientation.lockToLandscape();
    await this.get_data();
    await this.get_data_2();
    await AsyncStorage.setItem('Text_Content', this.state.text)
    setTimeout(() => {

      this.props.navigation.navigate('ReadPicItemPagehor5Route');

    }, 10000);


  };

  render() {


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
            source={require('../../img/icon/sig.png') }
            style={{width: 400, height: 400 }}
          />

      </View>

          <Text style={{
            color: 'white',
            paddingBottom: 5
          }}>กำลังดาวน์โหลดข้อมูล</Text>

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
  }
}

export default createSwitchNavigator(
  {
    LoadingHor5Page: { screen: LoadingHor5 },
    ReadPicItemPagehor5Route: { screen: ReadPicItemPagehor5 },
  }
);
