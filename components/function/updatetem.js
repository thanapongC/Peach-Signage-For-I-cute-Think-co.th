get_update = async (username, password, device, tem_selectID, temID) => {

               try {

                   console.log(username);
                   console.log(password);
                   console.log(device);
                   console.log(tem_selectID);
                   console.log(temID);

                   const option = {

                                    method: 'POST',
                                    headers: {
                                      Accept: 'application/json',
                                      'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({

                                      username: username,
                                      password: password,
                                      device_id: device,
                                      template_select_id: tem_selectID,
                                      template_id: temID,
                                      statusdevice: 'online'

                                    })

                                  }

                   let response = await fetch(url + 'php/api/get_update.php', option );

                   let responseJson = await response.json();

                   console.log(responseJson)

                    if(responseJson == '1'){

                      await AsyncStorage.removeItem('Template_select_id');
                      await AsyncStorage.removeItem('Template_id');
                      await this.props.navigation.navigate('FristPage');

                    }else{

                      console.log('no change');

                    }

                 } catch (error) {

                   console.log(error);

                 }

           }

export default get_update
