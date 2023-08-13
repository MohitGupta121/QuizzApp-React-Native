import { useState } from "react";
import { Button, Text } from "react-native"
import { View ,TextInput} from "react-native"
import { useNavigation } from '@react-navigation/native';

const Name = ({Score , handleScoreChange}:any) => {
    const navigation= useNavigation();
    const [state , setState] = useState({user1:"User-1" , user2:"User-2"});

    function handleSubmit(){
        handleScoreChange({user1:{
            ...Score.user1 ,
            name : state.user1,
        },user2:{
            ...Score.user2 ,
            name : state.user2,
        }});

        navigation.navigate("Test", {user:"user1" , tie:false});
    }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      }}>
      <View style={{gap: 30}}>
        <View style={{gap: 10}}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
            User-1 Name :
          </Text>
          <TextInput
          value={state.user1}
          onChangeText={name=>setState({...state , user1:name})}
            style={{
              borderWidth: 2,
              borderRadius: 20,
              padding: 10,
              borderColor: 'black',
              minWidth: 300,
              maxWidth: 500,
              fontSize: 20,
              color:"black"
            }}
          />
        </View>
        <View style={{gap: 10}}>
          <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
            User-2 Name :
          </Text>
          <TextInput
          value={state.user2}
          onChangeText={name=>setState({...state , user2:name})}
            style={{
              borderWidth: 2,
              borderRadius: 20,
              padding: 10,
              borderColor: 'black',
              minWidth: 300,
              maxWidth: 500,
              fontSize: 20,
              color:"black"
            }}
          />
        </View>
        
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

export default Name
