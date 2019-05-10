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
import Orientation from 'react-native-orientation-locker';
import RNFetchBlob from 'rn-fetch-blob';
import Theme4ScreenHorPage from '../horizontal/theme4-hor';
import * as Progress from 'react-native-progress';

const { config, fs } = RNFetchBlob;

class ReadPicItemhor4 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      lengthState: '',
      ArrayStateVideo: '',
      ArrayState: '',
    }

  }

  read_Pic_Item = async () => {

                  try{

                    await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DownloadDir + '/picture_peachsignage')
                      .then((files) => {
                        var PicArrayPathOBJ = [];
                        for (let picpath of files) {
                            var type = picpath.substring(picpath.indexOf("."));

                            if(type == ".jpg" || type == ".png" || type == ".gif"){

                              var string = 'file:///storage/emulated/0/Download/picture_peachsignage/' + picpath

                              PicArrayPathOBJ.push( { uri: string } );

                          }

                          }

                        var length = PicArrayPathOBJ.length;

                          this.setState({

                            lengthState: length,
                            ArrayState: PicArrayPathOBJ

                          })

                      })

                  }catch (err) {

                console.warn(err)

              }

                  }

          read_Video_Item = async () => {

            try{
  
                await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DownloadDir + '/video_peachsignage')
                .then((files) => {
                  var VideoArrayPathOBJ = '';
                  for (let videopath of files) {
                      var type = videopath.substring(videopath.indexOf("."));
  
                      if(type == ".mp4"){
  
                        var stringvideo = 'file:///storage/emulated/0/Download/video_peachsignage/' + videopath
                        VideoArrayPathOBJ = { uri: stringvideo }
  
                    }
  
                    }

                    this.setState({
  
                      ArrayStateVideo: VideoArrayPathOBJ,
  
                    })
  
  
  
                })
  
            }catch (err) {
  
          console.warn(err)
  
        }
  
            }


            set_store_pic = async () => {

              const { lengthState, ArrayState, ArrayStateVideo }  = this.state ;
    
               try {
    
                  const lengthsend = JSON.stringify(lengthState);
                  const Arraysend = JSON.stringify(ArrayState);
                  const ArraysendVideo = JSON.stringify(ArrayStateVideo);
                  await AsyncStorage.setItem('LengthPic', lengthsend )
                  await AsyncStorage.setItem('ArrayPic', Arraysend )
                  await AsyncStorage.setItem('ArrayVideo', ArraysendVideo )
    
    
                 } catch (error) {
    
                   console.log(error);
    
                 }
    
              }


    async componentDidMount(){

    Orientation.lockToLandscape();

    await this.read_Pic_Item();
    await this.read_Video_Item();
    await this.set_store_pic();
    setTimeout(() => {

      this.props.navigation.navigate('Theme4ScreenHorPageRoute');

    }, 10000);

  }


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
    ReadPicItemPagehor4: { screen: ReadPicItemhor4 },
    Theme4ScreenHorPageRoute: { screen: Theme4ScreenHorPage },
  }
);
