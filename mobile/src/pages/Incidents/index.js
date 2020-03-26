import React, { useState, useEffect} from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api';
import logoImg from '../../assets/logo.png';
import styles from './styles.js';
import lista  from '../../util/mockup';

export default function Incidents(){

    const [incidents, setIncidents] = useState(lista);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);
        
        const respnse = await api.get('/incident', {
            params: { page }
        });

        setIncidents([ ...incidents, ...respnse.data, ...lista]);
        setTotal(respnse.headers['x-total-count']);
        setPage(page +1);
        setLoading(false);
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{lista.length} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos caso abaixo e salve o dia!</Text>
            <FlatList 
                style={styles.incidentList}
                data={incidents}
                extraData={incidents}
                keyExtractor={(incident) => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentPropert}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentPropert}>Caso:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentPropert}>Valor:</Text>
                        <Text style={styles.incidentValue}>R$ {incident.value}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={()=> navigateToDetail(incident) }>

                            <Text style={styles.detailsButtonText}>Ver maia detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                    </View>
                )}

            />
        </View>
    )
}