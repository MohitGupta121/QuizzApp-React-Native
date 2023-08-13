import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import {styles} from './Test';

export default function TieBreaker(){
    return(
        <ScrollView style={styles.mainContainer}>
            <View>
                <Text>User 1</Text>
            </View>
        </ScrollView>
    )
}