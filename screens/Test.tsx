import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useQuery } from "react-query"
import { useRoute, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Question from "./Question";
import { createStackNavigator } from "@react-navigation/stack";
import {GestureHandlerRootView} from 'react-native-gesture-handler'
import { Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';

export const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        padding: 10,
        gap: 20,
    },
    text:{
        color:"black"
    },
    textHeading:{
        fontSize:30,
        color:"black",
        fontWeight:"600",
        textAlign:"center"
    },
    viewHeading:{
        justifyContent:"center",
    }
})


export default function Test({navigation , Score , handleScoreChange  }:any){

    function handleSubmit(){
        if ( Score.user1.score === Score.user2.score){
            navigation.push("Test",{
                user:"user1",tie:true
            });
        }else if ( Score.user1.score > Score.user2.score ){
            navigation.navigate("Winner",{
                Score,
                winner : "user1",
            });
        }else if ( Score.user1.score < Score.user2.score ){
            navigation.navigate("Winner",{
                Score,
                winner : "user2",
            });
        } 
    }


    const {user , tie}:any = useRoute().params;
    console.log("user:",user, "tie:" ,tie);

    const {isFetching , data , error} = useQuery("questions" , ()=>fetch("https://opentdb.com/api.php?amount=10").then(res=>res.json()));
    
    // const {Score , handleScoreChange , user} = useRoute().params;

    useEffect( ()=>{console.log(data?.results)}, [data])

    if( tie ){
        navigation.setOptions({title:"Tie Breaker"})
    }

    const [Tie , setTie] = useState(tie);
    useEffect(()=>{
        setTimeout(()=>setTie(false),2000)
    } , [Tie])

    const Stack = createStackNavigator();
    // const navigate = useNavigation();

    useEffect(()=>{console.log(Score)} , [Score])

    return (Tie?
        <View style={{flex: 1,justifyContent: 'center',alignItems:"center" , backgroundColor:"#3683f6"}}>
            <Text style={{fontSize:50 , fontWeight:"500", color:"white"}}>Tie Breaker</Text>
        </View>
        :
        <ScrollView contentContainerStyle={styles.mainContainer}>
            {/* <View ><Text style={{color:"black"}}>{JSON.stringify(Score,undefined,4)}</Text></View> */}
            <View style={styles.viewHeading}>
                <Text style={styles.textHeading}>{user==="user1"?Score.user1.name:Score.user2.name}</Text>
            </View>
            <ScrollView  contentContainerStyle={{justifyContent: 'space-between',gap:20}}  >
            
            {
                !isFetching ? data.results.map(
                    (item:any, index:any)=>(<Question key={index} Score={Score} handleScoreChange={handleScoreChange} user={user} question={item} />)
                    ):
                    <Text style={{color:"black"}}>Loading...</Text>
            }
            
            </ScrollView>
            <View>
                {
                user==="user1"?
                <Button 
                title="Submit and start User 2"
                onPress={()=>navigation.push("Test" , {
                    user:"user2"
                })}
                />:
                <Button title="Submit" onPress={handleSubmit}  />
                }
            </View>
        </ScrollView>
    )
}