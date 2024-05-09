import React, { useEffect, useState } from 'react';
import {
    Button,
    Text,
    View,
} from 'react-native';

import VoiceListener from '../components/VoiceListener';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage({ navigation }: any): JSX.Element {
    const [message, setMessage] = useState<string | null>(null);
    const handleListenStart = () => {
        setMessage(null);
    }

    const handleMessageReceived = async (newMessage: string) => {
        setMessage(newMessage);
        const history = await AsyncStorage.getItem('history');
        if (!history) {
            await AsyncStorage.setItem('history', JSON.stringify([{ message: newMessage }]));
        } else {
            console.log(history);
            const parsedHistory: { message: string }[] = JSON.parse(history);
            parsedHistory.push({ message: newMessage });
            await AsyncStorage.setItem('history', JSON.stringify(parsedHistory));
        }
    }

    return <>
        <View style={{ backgroundColor: "black", height: "100%", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <VoiceListener handleListenStart={handleListenStart} handleMessageReceived={handleMessageReceived} />
            <View style={{ position: "absolute", bottom: 30 }}>
                <Button onPress={() => { navigation.navigate('History') }} color="white" title="History" />
                {message && <Text style={{ color: "white", fontSize: 20 }}>{message}</Text>}
            </View>
        </View>
    </>
}
