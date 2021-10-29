import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function DefaultPage(props) {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text>DefaultPage</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});