import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput, Text, StyleSheet, View } from 'react-native'
import { colors } from '../Utils/colors'
import ButtonContainer from './ButtonContainer'
import { globalStyles } from '../Utils/helpers'
import { Header } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { _saveDeckTitle } from '../Utils/api'
import * as Notifications from 'expo-notifications'

class AddDeck extends Component {
  state = {
    warning: false,
    title: ""
  }

  handleTextChange = (text) => {
    this.setState({ title: text })

  }

  handleSubmit = () => {
    const { title } = this.state
    const { dispatch, navigation } = this.props

    if (title) {
      _saveDeckTitle(title)
        .then(() => {
          dispatch(addDeck(title))
          navigation.navigate('Deck List')

        })

    }
    else {
      this.setState({ warning: true })
    }

  }
// handleNotification = () =>{
//   Notifications.scheduleNotificationAsync(
//     {
//       content: {
//         title: 'Complete a quiz',
//         body: "You are yet to complete a quiz today",
//       },
//       trigger: {
//         seconds:10
//       }
//     }

// )
// }

  render() {
    const { warning, title } = this.state
    return (
      <KeyboardAvoidingView
        behavior="height"
        style={styles.container}
        keyboardVerticalOffset={Header}>

        <Text style={globalStyles.bigText}> ADD DECK </Text>

        <View style={globalStyles.container}>
          <Text style={[globalStyles.text,]}>Create a new deck of flashcards</Text>
        </View>

        <Text style={globalStyles.mediumText}>Title: </Text>
        <TextInput style={globalStyles.input} value={title} onChangeText={this.handleTextChange} />


        <ButtonContainer title="Add Card" color={title ? colors.primaryText : colors.divider} method={this.handleSubmit} />
        {/* <ButtonContainer title="Test Noti" color={ colors.primaryText } method={this.handleNotification} /> */}
        {warning && <Text style={{ color: "red" }}>Input must not be empty</Text>}


      </KeyboardAvoidingView>
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
export default connect()(AddDeck);
