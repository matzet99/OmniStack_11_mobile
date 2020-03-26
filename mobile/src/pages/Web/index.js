import React from 'react';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';

export default function Web() {

    const route = useRoute();

    const url = route.params.incident.URL;

    return (
        <WebView
            source={{ uri: url }}
            style={{ marginTop: 20 }}
        />
    )
}