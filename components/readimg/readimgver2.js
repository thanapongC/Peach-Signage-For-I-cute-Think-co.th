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
import Theme2ScreenVerPage from '../vertical/theme2-ver';
import * as Progress from 'react-native-progress';

const { config, fs } = RNFetchBlob;

class ReadPicItemver2 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      lengthState: '',
      lengthState_2: '',
      ArrayState: '',
      ArrayStateVideo: '',
      ArrayState_2: '',
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

    read_Pic_Item_2 = async () => {

                    try{

                      await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DownloadDir + '/picture_peachsignage2')
                        .then((files) => {
                          var PicArrayPathOBJ_2 = [];
                          for (let picpath_2 of files) {
                              var type_2 = picpath_2.substring(picpath_2.indexOf("."));

                              if(type_2 == ".jpg" || type_2 == ".png" || type_2 == ".gif"){

                                var string_2 = 'file:///storage/emulated/0/Download/picture_peachsignage2/' + picpath_2

                                PicArrayPathOBJ_2.push( { uri: string_2 } );

                            }

                            }

                          var length_2 = PicArrayPathOBJ_2.length;

                            this.setState({

                              lengthState_2: length_2,
                              ArrayState_2: PicArrayPathOBJ_2

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

          const { ArrayStateVideo }  = this.state ;

           try {

            const lengthsend = JSON.stringify(this.state.lengthState);
            const Arraysend = JSON.stringify(this.state.ArrayState);

            await AsyncStorage.setItem('LengthPic', lengthsend )
            await AsyncStorage.setItem('ArrayPic', Arraysend )

            const lengthsend_2 = JSON.stringify(this.state.lengthState_2);
            const Arraysend_2 = JSON.stringify(this.state.ArrayState_2);

            await AsyncStorage.setItem('LengthPic_2', lengthsend_2 )
            await AsyncStorage.setItem('ArrayPic_2', Arraysend_2 )

            const ArraysendVideo = JSON.stringify(ArrayStateVideo);
            await AsyncStorage.setItem('ArrayVideo', ArraysendVideo )

             } catch (error) {

               console.log(error);

             }

          }


    async componentDidMount(){

    Orientation.lockToPortrait();
    await this.read_Pic_Item();
    await this.read_Pic_Item_2();
    await this.read_Video_Item();
    await this.set_store_pic();
    // await this.set_store_pic_2();
    // setTimeout(() => {

      this.props.navigation.navigate('Theme2ScreenVerPageRoute');

    // }, 10000);

  };

  render() {


    return (

      <View style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor:'rgba(36, 40, 45, 0.8)',
      }}>

          <StatusBar hidden={true} />

          <View style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>

          <Image
                source={require('../../img/icon/sig.png') }
                style={{width: 400, height: 400 }}
              />

          </View>

          <View style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>


          <Text style={{
            color: 'white',
            paddingBottom: 5
          }}>กำลังดาวน์โหลดข้อมูล</Text>

          <Progress.Bar 
           width={300}
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
    ReadPicItemPagever2: { screen: ReadPicItemver2 },
    Theme2ScreenVerPageRoute: { screen: Theme2ScreenVerPage },
  }
);
