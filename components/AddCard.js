import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, TextInput, Text, StyleSheet, View } from 'react-native'
import { colors } from '../Utils/colors'
import ButtonContainer from './ButtonContainer'
import { globalStyles } from '../Utils/helpers'
import { Header } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import { addCardToDeck } from '../actions'
import { _addCardToDeck } from '../Utils/api'


class AddCard extends Component {
  state = {
    question: "",
    answer: "",
    warning: false
  }

  handleTextChange = (text, name) => {
    this.setState(prev => {
      return {
        ...prev, [name]: text
      }
    })

  }

  validateInput = () => {
    const { question, answer } = this.state
    return question && answer
  }

  handleSubmit = () => {
    const { question, answer } = this.state
    const { title } = this.props.route.params
    const { dispatch, navigation } = this.props
    const card = {
      question,
      answer
    }
    if (this.validateInput()) {
      _addCardToDeck(title, card)
        .then(() => {
          dispatch(addCardToDeck(title, card))
          navigation.goBack()
        })


    }
    else {
      this.setState({ warning: true })
    }

  }
  render() {
    const { title } = this.props.route.params
    const { warning, question, answer } = this.state
    return (
      <ScrollView>
        <KeyboardAvoidingView
          behavior="height"
          style={styles.container}
          keyboardVerticalOffset={Header}>

          <Text style={globalStyles.bigText}> {title.toUpperCase()} DECK </Text>

          <View style={globalStyles.container}>
            <Text style={[globalStyles.text,]}>Add a new card to the deck of flashcards</Text>
          </View>

          <Text style={globalStyles.mediumText}>Your Question </Text>
          <TextInput style={globalStyles.input} value={question} onChangeText={(text) => this.handleTextChange(text, "question")} />

          <Text style={globalStyles.mediumText}>Your Answer </Text>
          <TextInput style={globalStyles.input} multiline={true} value={answer} onChangeText={(text) => this.handleTextChange(text, "answer")} />

          <ButtonContainer title="Add Card" color={this.validateInput() ? colors.primaryText : colors.divider} method={this.handleSubmit} />
          {warning && <Text style={{ color: "red" }}>Please, make sure both inputs are not empty</Text>}


        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,

  },
  text: {
    fontSize: 18,
    color: colors.white,
    margin: 10
  },

})
export default connect()(AddCard);