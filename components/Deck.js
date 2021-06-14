import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import HeaderBox from './HeaderBox'
import { globalStyles } from '../Utils/helpers'
import { colors } from '../Utils/colors'
import ButtonContainer from './ButtonContainer'
import { connect } from 'react-redux';


class Deck extends Component {
  state = {
    warning: false
  }

  handleRoute = () => {
    const { navigation: { navigate }, deck } = this.props
    const { questions } = deck
    if (questions.length) {
      this.setState({ warning: false })
      navigate('Quiz', { questions: questions })

    }
    else {
      this.setState({ warning: true })
    }

  }
  handleAddCard = () => {
    const { navigation: { navigate }, deck } = this.props
    const { title } = deck
    navigate('Add Card', { title })
    this.setState({ warning: false })

  }

  render() {
    const { deck } = this.props
    const { questions, title } = deck
    const len = questions.length
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View>
          <HeaderBox>
            <View  >
              <Text style={globalStyles.text}>{title}</Text>
              <Text style={globalStyles.text}>{len} {len > 1 ? 'flashcards' : 'flashcard'}</Text>
            </View>

          </HeaderBox>
        </View>
        <ButtonContainer method={this.handleAddCard} title="Add Card" color={colors.primaryText} />
        <ButtonContainer method={this.handleRoute} title="Start Quiz" color={colors.secondaryText} />
        {this.state.warning && <Text style={[globalStyles.text, { color: "red" }]}>This deck is empty, Please add Card to continue</Text>}


      </View>
    );
  }
}
const mapStateToProps = (decks, { route }) => {
  const { title } = route.params
  return {
    deck: decks[title]
  }

}

export default connect(mapStateToProps)(Deck)



