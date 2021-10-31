import React from 'react';
import { StyleSheet, Text, View} from 'react-native';

export function Spacer(props) {

    const h = props.height;

    // do not allow it to be smaller than 20 due to squishing text if it's their
    if(h < 20){
        console.log("minHeight for Spacer == 20")
    }

    return (
        <View style={[SpacerStyles.container, {height: h }]}>
                <Text> -- -- -- -- -- </Text>
        </View>
    );
}

const SpacerStyles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 20,
    },


});