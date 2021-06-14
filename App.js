import 'react-native-gesture-handler';
import React, { Component } from 'react'
import { Platform, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Deck from "./components/Deck"
import DeckList from './components/DeckList'
import AddCard from "./components/AddCard"
import Quiz from './components/Quiz'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { applyMiddleware, createStore } from 'redux'
import reducer from './reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { colors } from './Utils/colors'
import Constants from 'expo-constants'
import { setLocalNotification } from './Utils/helpers'
import * as Notifications from 'expo-notifications'




import AddDeck from './components/AddDeck'
import { Ionicons } from '@expo/vector-icons'

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

const FlashcardStatusBar = ({ backgroundColor, ...props }) => {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar translucent backgroundColor={backgroundColor} style="light" {...props} />
        </View>
    );
}
class App extends Component {
    //when component mounts, call setLocalNotification() which will register a notification for every 7pm
    componentDidMount(){
         setLocalNotification()
    }

    render() {

    //Notifications.setNotificationHandler allow notification when app is on foreground
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
              shouldShowAlert: true,
              shouldPlaySound: true,
              shouldSetBadge: false,
            }),
          });

        const Tab = createBottomTabNavigator();
        const DeckListStack = createStackNavigator();
        const AddDeckStack = createStackNavigator();

        return (
            <Provider store={store}>
                <FlashcardStatusBar backgroundColor={colors.statusbar}  />

                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ color }) => {
                                let iconName;

                                if (route.name === 'Deck List') {
                                    iconName = Platform.OS === "ios" ? 'ios-albums' : 'md-albums';
                                } else if (route.name === 'Add Deck') {
                                    iconName = Platform.OS === "ios" ? 'ios-add-circle' : 'md-add-circle';
                                }

                                return <Ionicons name={iconName} size={50} color={color} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: colors.primaryText,
                            inactiveTintColor: colors.secondaryText,
                            style:{backgroundColor:colors.primaryBackground, height:60},
                            labelStyle:{fontSize:16,color:"#fff",}


                        }}
                    >
                        <Tab.Screen name="Deck List"  >
                            {() => (
                                <DeckListStack.Navigator>
                                    <DeckListStack.Screen name="Deck List" component={DeckList} />
                                    <DeckListStack.Screen name="Deck" component={Deck} />
                                    <DeckListStack.Screen name="Add Card" component={AddCard} />
                                    <DeckListStack.Screen name="Quiz" component={Quiz} />

                                </DeckListStack.Navigator>
                            )}
                        </Tab.Screen>
                        <Tab.Screen name="Add Deck" >
                            {() => (
                                <AddDeckStack.Navigator>
                                    <AddDeckStack.Screen name="Add Deck" component={AddDeck} />
                                </AddDeckStack.Navigator>

                            )}

                        </Tab.Screen>
                    </Tab.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}

export default App