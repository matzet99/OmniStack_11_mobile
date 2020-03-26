import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

import Detail from './pages/Detail';
import Incidents from './pages/Incidents';
import Doar from './pages/Doar';
import Web from './pages/Web';

const AppStack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}> 
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
                <AppStack.Screen name="Doar" component={Doar} />
                <AppStack.Screen name="Web" component={Web} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}