import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

type HistoryItemProps = {
    message: string;
}

function HistoryItem({ message }: HistoryItemProps): JSX.Element {
    return <Pressable onPress={() => { }}><Text style={{ color: "white", fontSize: 20 }}>{message}</Text></Pressable>
}

export default function History({ navigation }: any) {
    const [history, setHistory] = useState<string[] | null>(null);

    useEffect(() => {
        const getHistory = async () => {
            const receivedHistory = await AsyncStorage.getItem('history');
            if (!receivedHistory) {
                return;
            }
            const parsedHistory: { message: string }[] = JSON.parse(receivedHistory);
            setHistory(parsedHistory.map(entry => entry.message));
        }

        getHistory();
    }, []);

    return <>
        <View style={{ backgroundColor: "black", height: "100%", flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            {history && history.map((message, index) => <HistoryItem key={index} message={message} />)}
        </View>
    </>
}