import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles.js';

export default function Doar(){
    
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    
    function navigateBack(){
        navigation.goBack();
    }

    function navigateToWeb(){
        navigation.navigate('Web', { incident });
    }


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#E02041" ></Feather>
                </TouchableOpacity>
            </View> 

            <View style={styles.incident}>
                <Text style={[styles.incidentPropert, {marginTop:0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>
                <View style={styles.row}>
                    <Text style={styles.campo}>Conta:</Text>
                    <Text style={styles.campoInfo}>{incident.conta}</Text>

                    <Text style={styles.campo}>Agencia:</Text>
                    <Text style={styles.campoInfo}>{incident.agencia}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.campo}>Banco:</Text>
                    <Text style={styles.campoInfo}>{incident.banco}</Text>
                </View>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Ajude com quanto poder.</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={()=>{navigateToWeb(incident)}}>
                    <Text style={styles.actionText}>Doar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}