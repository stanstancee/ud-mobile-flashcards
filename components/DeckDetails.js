import React, { Component } from 'react';
import { Text, View, Animated,  TouchableWithoutFeedback,StyleSheet  } from 'react-native'

import { connect } from 'react-redux'
import { handleInitialData } from '../actions/index'
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../Utils/colors'
import { globalStyles } from '../Utils/helpers'
class DeckDetails extends Component {
    state = {
        value: new Animated.Value(1)
    };
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    animatedBox = (deck) => {
        const { value } = this.state
        Animated.sequence([
            Animated.timing(value, { duration: 100, toValue: 0, useNativeDriver: true }),
            Animated.timing(value, { duration: 100, toValue: 1, useNativeDriver: true }),

        ]).start(() => {
            this.props.navigation.navigate('Deck', { title: deck })
        })


    }
    render() {
        const { title , decks} = this.props
        const deck =  decks[title]
        const len = deck.questions.length
        return (
            <TouchableWithoutFeedback onPress={() => this.animatedBox(title)}>
                <Animated.View style={[globalStyles.container,styles.container, { transform: [{ scale: this.state.value }] }]}>
                    <View>
                        <Text style={[globalStyles.text]} >{deck.title}</Text>
                        <Animated.Text style={[globalStyles.smallText, { fontSize: 20 }]}>{len} {len > 1? "flashcards":"flashcard"} </Animated.Text>
                    </View>
                    <AntDesign name="rightcircle" size={50} color={colors.white} />
                </Animated.View>
            </TouchableWithoutFeedback>
        )


    }

}
const styles = StyleSheet.create({
    container: { width: "85%",
     marginBottom: 10 ,
     backgroundColor:colors.primaryText}
})

function mapStateToProps(decks) {
    return {
        decks
    };

}

export default connect(mapStateToProps)(DeckDetails)