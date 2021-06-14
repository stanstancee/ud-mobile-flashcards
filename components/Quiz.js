import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { globalStyles } from '../Utils/helpers'
import HeaderBox from './HeaderBox'
import { colors } from '../Utils/colors'
import { setLocalNotification, clearLocalNotification } from '../Utils/helpers'
import ButtonContainer, { ButtonContainerSmall } from './ButtonContainer'

const QuizComplete = ({ perc, correct, len, navigation, resetState }) => {
  return (
    <View style={styles.container}>
      <Text style={[globalStyles.text, { color: colors.secondaryText }]}> You got {correct} out of {len} correctly</Text>
      <Text style={[globalStyles.text, { color: colors.secondaryBackground }]}>Your Score is {perc}% </Text>
      <ButtonContainer method={() => navigation.goBack()} title="Return to Deck " color={colors.primaryText} />
      <ButtonContainer method={resetState} title="Start Again" color={colors.secondaryText} />


    </View>
  )
}

class Quiz extends Component {

  state = {
    num: 1,
    correct: 0,
    expand: false,
    index: 0,
    openComplete: false,
    perc: 0



  };

  resetState = () => this.setState({
    num: 1,
    correct: 0,
    expand: false,
    index: 0,
    openComplete: false,
    perc: 0

  }

  )


  handlePress = (type) => {
    const { num } = this.state
    const { questions } = this.props.route.params

    if (questions.length === num) {
      this.setState((prev) => {
        let correct = type === "correct" ? prev.correct + 1 : prev.correct
        let perc = ((correct / questions.length) * 100).toFixed()


        return {
          correct,
          openComplete: !prev.openComplete,
          perc
        }

      })
      clearLocalNotification()
      .then(setLocalNotification)
    }
    else {
      this.setState((prev) => {
        let num = prev.num + 1
        let correct = type === "correct" ? prev.correct + 1 : prev.correct
        let index = prev.index + 1
        return {
          ...prev, num, correct, index, expand: !prev.expand
        }
      })
    }

  }


  render() {
    const { route, navigation } = this.props
    const { questions } = route.params
    const len = questions.length
    const { num, index, correct, expand, openComplete, perc } = this.state
    return (
      <ScrollView>
        <View style={[styles.container, { flex: 1 }]}>
          <HeaderBox>
            <View  >
              <Text style={globalStyles.text}>Quiz Time!</Text>
              <Text style={globalStyles.text}>{`${num} / ${len}`}</Text>
            </View>

          </HeaderBox>
          {
            openComplete ? <QuizComplete perc={perc} correct={correct} len={len} navigation={navigation} resetState={this.resetState} /> :
              <View style={styles.container}>
                <Text style={styles.question}>Question</Text>
                <Text style={[globalStyles.text, { color: colors.secondaryText }]}>{questions[index].question}</Text>
                {
                  expand ?
                    <View style={styles.container}>
                      <Text style={styles.question}>Answer</Text>
                      <Text style={[globalStyles.text, { color: colors.secondaryText }]}>{questions[index].answer}</Text>
                      <Text style={[globalStyles.text, { color: colors.secondaryBackground }]}>Let's know if you got it right?</Text>
                      <View style={styles.btn}>
                        <ButtonContainerSmall title="Correct" color="green" method={() => this.handlePress("correct")} />
                        <ButtonContainerSmall title="Wrong" color="red" method={() => this.handlePress("wrong")} />
                      </View>
                    </View> :
                    <ButtonContainer title="Show Answer" method={() => this.setState({ expand: true })} color={colors.secondaryText} />

                }



              </View>
          }
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  question: {
    alignSelf: 'flex-start',
    fontSize: 40,
    margin: 5,
    color: colors.primaryText,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'

  },


})
export default Quiz;
