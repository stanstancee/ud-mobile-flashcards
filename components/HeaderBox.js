import React from "react"
import {View,Image} from 'react-native'
import {globalStyles} from '../Utils/helpers'
import card from '../assets/card.png'

export default function HeaderBox(props){
    return (
        <View style={[globalStyles.container]}>
            <Image style={globalStyles.logo} source={card} alt="card" />
            {props.children}

        </View>
    )
}

