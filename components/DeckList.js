import React, { Component } from 'react';
import { Text, View,  ScrollView,  StyleSheet } from 'react-native'
import HeaderBox from './HeaderBox'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/index'
import { colors } from '../Utils/colors'
import { globalStyles } from '../Utils/helpers'
import DeckDetails from './DeckDetails'
class DeckList extends Component {

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }


    render() {
        const { decksArray } = this.props
        return (
            <View style={styles.container}>
                <HeaderBox>
                    <View  >
                        <Text style={styles.text}>My Mobile Flashcard</Text>
                        <Text style={globalStyles.smallText}>Test your memory now!</Text>
                    </View>

                </HeaderBox>
                <ScrollView >
                    <Text style={[styles.text, { color: colors.primaryText }]}>{decksArray.length} Decks  On Board</Text>
                    {decksArray.map((deck, index) => {
                        return (
                            <DeckDetails title={deck} key={index} navigation={this.props.navigation} />
                        )

                    })}
                </ScrollView>

            </View>
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
function mapStateToProps(decks) {
    const decksArray = Object.keys(decks)
    return {
        decksArray
    };

}

export default connect(mapStateToProps)(DeckList)