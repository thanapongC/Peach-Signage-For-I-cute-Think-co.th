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
import Theme4ScreenVerPage from '../vertical/theme4-ver';
import * as Progress from 'react-native-progress';

const { config, fs } = RNFetchBlob;

class ReadPicItemver4 extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      lengthState: '',
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

                // console.log(string)

                PicArrayPathOBJ.push( { uri: string } );

            }

            }

          var length = PicArrayPathOBJ.length;
          
          console.log(length)
          // console.log(PicArrayPathOBJ)

            this.setState({

              lengthState: length,
              ArrayState: PicArrayPathOBJ

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

            // console.log(Arraysend)

            await AsyncStorage.setItem('LengthPic', lengthsend )
            await AsyncStorage.setItem('ArrayPic', Arraysend )

             } catch (error) {

               console.log(error);

             }

          }

    async componentDidMount(){

    await Orientation.lockToPortrait();
    await this.read_Pic_Item();
    await this.set_store_pic();
    setTimeout(() => {

      this.props.navigation.navigate('Theme4ScreenVerPageRoute');

      }, 10000);

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
    ReadPicItemPagever4: { screen: ReadPicItemver4 },
    Theme4ScreenVerPageRoute: { screen: Theme4ScreenVerPage },
  }
);
