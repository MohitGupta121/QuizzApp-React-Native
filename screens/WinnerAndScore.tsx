import { Button, Dimensions, ImageBackground, StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { useRoute, useNavigation } from '@react-navigation/native';
import LinearGradient from "react-native-linear-gradient";
import { useEffect, useMemo, useState } from "react";
import { styles } from './Test';
import {Table , Row , Rows } from "react-native-table-component";
import { initialScore } from "../App";

const WinnerAndScore = ({Score , handleScoreChange}:any) => {
    const params:any = useRoute().params;
    const naviagation = useNavigation();
    
    const scoreStyle = StyleSheet.create({
        fullContainer:{
            paddingTop:50,
            flex:1,
            alignItems: 'center',
            gap:50,
        },
        scoreHeading:{
            color:"black",
            fontSize:30,
            fontWeight:"500",
        },
        tableHead:{
            height: 40 ,
            backgroundColor: '#9acdff', 
        },
        tableCell:{
            height: 40 ,
            backgroundColor: '#ffffff', 
        },
        tableTextStyle:{
            color:'black',
            fontSize:20,
            padding:5 ,
        },
        tableTextHeadingStyle:{
            color:'black',
            fontSize:20,
            padding:5 ,
            fontWeight:"500",
            textAlign:"center"
        },
    })

    const [winnerScreen,SetwinnerScreen] = useState(true);

    const winScreen:JSX.Element = useMemo(()=>(<LinearGradient colors={['green', 'yellow', 'green']} style={{flex: 1}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          color: 'black',
          fontSize: 50,
          fontWeight: '500',
          textAlign: 'center',
        }}>
        Winner{'\n'}🥇{'\n'}
        {params.winner == 'user1'
          ? params.Score.user1.name
          : params.Score.user2.name}
      </Text>
    </View>
  </LinearGradient>), [])

    useEffect(()=>{
        setTimeout(()=>SetwinnerScreen(false) , 2000);
        console.log(winnerScreen)
    },[]);

    function startAgain(){
      handleScoreChange(initialScore);
      naviagation.navigate("Name");
    }


  return (
    winnerScreen
    ?winScreen
    :<View style={scoreStyle.fullContainer}>
        <LinearGradient style={{padding:20, borderRadius:30 }} start={{x: 0, y: 0}} end={{x: 1, y: 1}} colors={["#f6ff00" , "#00eeff"]}>
            <Text style={scoreStyle.scoreHeading}>Score Board</Text>
        </LinearGradient>
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} style={{width:Dimensions.get("screen").width - 20}}>
            <Row data={["User" , "Score"]}  style={scoreStyle.tableHead} textStyle={scoreStyle.tableTextHeadingStyle} />
            <Rows data={[[params.Score.user1.name,params.Score.user1.score],[params.Score.user2.name, params.Score.user2.score]]}  style={scoreStyle.tableCell} textStyle={scoreStyle.tableTextStyle} />
        </Table>
        <Button title="Start Again" onPress={startAgain} />
    </View>
  );
}

export default WinnerAndScore
