import React, { useEffect, useState } from 'react';
import {
    Pressable,
    Text,
    View,
} from 'react-native';

import Voice, { SpeechEndEvent, SpeechResultsEvent, SpeechStartEvent } from '@react-native-voice/voice';

export type VoiceListenerProps = {
    handleListenStart: () => void;
    handleListenStop?: () => void;
    handleMessageReceived: (message: string) => Promise<void>;
}

export default function VoiceListener({ handleListenStart, handleListenStop, handleMessageReceived }: VoiceListenerProps): JSX.Element {
    const [isListening, setIsListening] = useState(false);
    let temporaryMessage: string[] = [""];

    useEffect(() => {
        Voice.onSpeechResults = (e: SpeechResultsEvent) => { temporaryMessage = e.value! };
        Voice.onSpeechStart = (e: SpeechStartEvent) => { setIsListening(true) };
        Voice.onSpeechEnd = async (e: SpeechEndEvent) => await handleMessageReceived(temporaryMessage.join(" "));
    }, [])

    const handleButtonPress = async () => {
        if (isListening) {
            typeof handleListenStop !== 'undefined' && handleListenStop();
            setIsListening(false);
            await Voice.stop();
        } else {
            handleListenStart();
            await Voice.start('en-US');
        }
    }

    return <>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Pressable style={{ borderWidth: 3, borderColor: "white", borderRadius: 70, width: 130, height: 130, justifyContent: "center", alignItems: "center" }} onPress={async () => { await handleButtonPress() }}>
                <Text style={{ color: "white", fontSize: 20 }}>{isListening ? 'Stop' : 'Record'}</Text>
            </Pressable>
        </View>
    </>
}
