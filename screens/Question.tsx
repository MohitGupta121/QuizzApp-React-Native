import { Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from './Test';
import { Button } from 'react-native';
import { useEffect , useState } from 'react';
import RadioGroup,{ RadioButton , RadioButtonProps } from 'react-native-radio-buttons-group';
function Question({question , Score , handleScoreChange , user}:any) {

    const [options , setOptions]  = useState<RadioButtonProps[]>([]);
    const [answer , setAnswer] = useState<string|undefined>();

    useEffect( ()=>{

        if ( question.type === "boolean"){
            setOptions([
            {
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'True',
                value: 'True',
                labelStyle:{ color :"black"},
            },
            {
                id: '2', // acts as primary key, should be unique and non-empty string
                label: 'False',
                value: 'False',
                labelStyle:{ color :"black"}
            },
        ])
        }else{
            let opt = [ question.correct_answer, ...question.incorrect_answers]
            let radioOpitons:RadioButtonProps[] = [];
            opt.map((item, i)=>{radioOpitons.push({
                id : String(i+1),
                label: item,
                value : item,
                labelStyle: {color:"black" , flexWrap:"wrap"}
            })})

            setOptions(radioOpitons);
        }


    }, [question])

    useEffect(()=>{
        if ( answer){
        let ans = options.find((item)=>item.id === answer);
        if ( ans?.value === question.correct_answer){
            user==="user1"?
            handleScoreChange({
                ...Score ,
                user1:{
                    ...Score.user1,
                    correct : Score.user1.correct+1,
                    score : Score.user1.score+5,
                    questions : new Set([...Score.user1.questions ,ans?.id])
                }
            })
            :
            handleScoreChange({
                ...Score ,
                user2:{
                    ...Score.user2,
                    correct : Score.user2.correct+1,
                    score : Score.user2.score+5
                }

            })
        }else if ( ans?.value != question.correct_answer){
            user==="user1"?
            handleScoreChange({
                ...Score ,
                user1:{
                    ...Score.user1,
                    correct : Score.user1.correct-1,
                    score : Score.user1.score-2
                }
            })
            :
            handleScoreChange({
                ...Score ,
                user2:{
                    ...Score.user2,
                    correct : Score.user2.correct-1,
                    score : Score.user2.score-2
                }

            })
        }
        console.log(answer)
        if ( question.type === "boolean"){
            setOptions([
            {
                id: '1', // acts as primary key, should be unique and non-empty string
                label: 'True',
                value: 'True',
                labelStyle:{ color :"black"},
                disabled:true,
            },
            {
                id: '2', // acts as primary key, should be unique and non-empty string
                label: 'False',
                value: 'False',
                labelStyle:{ color :"black"},
                disabled:true,
            },
        ])
    }else{
        let opt = [ question.correct_answer, ...question.incorrect_answers]
        let radioOpitons:RadioButtonProps[] = [];
        opt.map((item, i)=>{radioOpitons.push({
            id : String(i+1),
            label: item,
            value : item,
            labelStyle: {color:"black" , flexWrap:"wrap"},
            disabled:true,
            })})

            setOptions(radioOpitons);
        }
    }
    } , [answer])

  return (
    <View style={questionStyle.questionContainer}>
        <View >
            <Text style={questionStyle.questionText} >{decodeURIComponent(question.question)}</Text>
        </View>
        <View style={questionStyle.options}>

            <View style={{flex:1 , gap:10 , alignItems:"flex-start" }}>
                <RadioGroup 
                radioButtons={options}
                onPress={(data)=>setAnswer(data)}
                selectedId = {answer}
                containerStyle={{flex:1 , justifyContent: 'center',alignItems: 'flex-start'}}
                />
            </View>

        </View>

    </View>
  )
}

const questionStyle = StyleSheet.create({
    questionContainer:{
        flex:1,
        gap:20,
        justifyContent:"center",
        padding:10,
        backgroundColor : "#fff25f36",
        borderRadius: 20 ,
    },
    questionText:{
        fontSize:18,
        color:"black",
    },
    options:{
        flex:1,
    }
})

export default Question
