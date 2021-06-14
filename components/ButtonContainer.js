import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { colors } from '../Utils/colors'


const ButtonContainer = (props) => {
    const { method, title, color } = props
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color }]} onPress={method}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
export const ButtonContainerSmall = (props) => {
    const { method, title, color } = props
    return (
        <TouchableOpacity style={[styles.container, { backgroundColor: color ,width:"40%"}]} onPress={method}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center', width: "90%", margin: 10, height: 60, borderRadius: 10
    },
    text: { color: colors.white, alignSelf: 'center', fontSize: 20 }


})

export default ButtonContainer