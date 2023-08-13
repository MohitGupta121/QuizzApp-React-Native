/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React, { useMemo, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from '@react-navigation/native';
import Test from './screens/Test';
import TieBreaker from './screens/TieBreaker';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import WinnerAndScore from './screens/WinnerAndScore';
import Name from './screens/Name';


const Stack = createNativeStackNavigator();
const queryClient = new QueryClient;

export const initialScore = {
  user1:{
    name : "User 1",
    complete:false,
    questions:new Set(),
    correct:0,
    score : 0,
  },
  user2:{
    name : "User 2",
    complete:false,
    questions:new Set(),
    correct:0,
    score : 0,
  },
} as const;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


  const [Score , setScore] = useState(initialScore)

  function handleScoreChange(score:any){
    setScore(score);
  }



  return (

    <QueryClientProvider client={queryClient}>
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerStyle:{
          backgroundColor:Colors.dark,
        }, headerTitleStyle:{color:Colors.white,},
        headerBackVisible:false,
        headerTitleAlign:"center"
        }} >
          <Stack.Screen name="Name">
            {props=><Name {...props} Score={Score} handleScoreChange={handleScoreChange} />}
          </Stack.Screen>
          <Stack.Screen name="Test" initialParams={{user:"user1" , tie:false}}>
            {props=><Test {...props} Score={Score} handleScoreChange={handleScoreChange} />}
          </Stack.Screen>
          <Stack.Screen name="Tie Breaker"  component={TieBreaker}/>
          <Stack.Screen name="Winner"  >
            {props=><WinnerAndScore {...props} handleScoreChange={handleScoreChange} Score={Score} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
    </QueryClientProvider>
  );
}



export default App;
