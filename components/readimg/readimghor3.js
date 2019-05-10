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
import Theme3ScreenHorPage from '../horizontal/theme3-hor';
import * as Progress from 'react-native-progress';

const { config, fs } = RNFetchBlob;

class ReadPicItemhor3 extends React.Component {

  constructor(props){
    super(props);

    this.state = {

      lengthState: '',
      lengthState_2: '',
      lengthState_3: '',
      ArrayState: '',
      ArrayState_2: '',
      ArrayState_3: '',

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
                            ArrayState: PicArrayPathOBJ,

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

read_Pic_Item_3 = async () => {

                  try{

                    await RNFetchBlob.fs.ls(RNFetchBlob.fs.dirs.DownloadDir + '/picture_peachsignage3')
                      .then((files) => {
                        var PicArrayPathOBJ_3 = [];
                        for (let picpath_3 of files) {
                            var type_3 = picpath_3.substring(picpath_3.indexOf("."));

                            if(type_3 == ".jpg" || type_3 == ".png" || type_3 == ".gif"){

                              var string_3 = 'file:///storage/emulated/0/Download/picture_peachsignage3/' + picpath_3

                              PicArrayPathOBJ_3.push( { uri: string_3 } );

                          }

                          }

                        var length_3 = PicArrayPathOBJ_3.length;


                          this.setState({

                            lengthState_3: length_3,
                            ArrayState_3: PicArrayPathOBJ_3

                          })

                      })

                  }catch (err) {

                console.warn(err)

              }

                  }

set_store_pic = async () => {

           try {

              const lengthsend = JSON.stringify(this.state.lengthState);
              const Arraysend = JSON.stringify(this.state.ArrayState);

              await AsyncStorage.setItem('LengthPic', lengthsend )
              await AsyncStorage.setItem('ArrayPic', Arraysend )

              const lengthsend_2 = JSON.stringify(this.state.lengthState_2);
              const Arraysend_2 = JSON.stringify(this.state.ArrayState_2);

              await AsyncStorage.setItem('LengthPic_2', lengthsend_2 )
              await AsyncStorage.setItem('ArrayPic_2', Arraysend_2 )

              const lengthsend_3 = JSON.stringify(this.state.lengthState_3);
              const Arraysend_3 = JSON.stringify(this.state.ArrayState_3);

              await AsyncStorage.setItem('LengthPic_3', lengthsend_3 )
              await AsyncStorage.setItem('ArrayPic_3', Arraysend_3 )

             } catch (error) {

               console.log(error);

             }

          }

async componentDidMount(){

    await Orientation.lockToLandscape();
    await this.read_Pic_Item();
    await this.read_Pic_Item_2();
    await this.read_Pic_Item_3();
    await this.set_store_pic();
    setTimeout(() => {

      this.props.navigation.navigate('Theme3ScreenHorPageRoute');

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
    ReadPicItemPagehor3: { screen: ReadPicItemhor3 },
    Theme3ScreenHorPageRoute: { screen: Theme3ScreenHorPage },
  }
);
