import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function HirePurchaseAndLease(props) {
    const navigation = useNavigation()

    const [clientName,setClientName] = useState('')
    const [principle,setPrinciple] = useState('')
    const [interest,setInterest] = useState('')
    const [numberOfPayments,setNumberOfPayments] = useState('')
    const [installmentAmmount,setInstallmentAmmount] = useState('')
    const [residual,setResidual] = useState('')

    const [reportTypeRadioBtn,setReportTypeRadioButton] = useState(1)
    const [inputFieldRadioBtn,setInputFieldRadioButton] = useState("principle")
    const [paymentFrequencyRadioBtn,setPaymentFrequencyRadioButton] = useState(1)


    return (
        <View style={hplStyles.container}>

            {/* Calculation / report type */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    
                </View>
            </View>

            {/* Input Fields  */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>

                    {/* Their are two types of inputs here */}
                    {/* 1: label and inputField */}
                    {/* 2: label Radio Button and inputField */}

                    {/*1 ClientName */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContText}>
                            <Text>ClientName: (optional)</Text>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setClientName(val) }
                            style={hplStyles.inputField}
                            placeholder="Romano"
                            keyboardType="default"
                        />
                    </View>

                    {/*2 Principle */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContTextAndRadioButton}>
                            <Text>Principle:</Text>
                            <TouchableOpacity onPress={() => setInputFieldRadioButton('principle')}>
                                <Text style={(inputFieldRadioBtn == 'principle') ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setPrinciple(val) }
                            style={hplStyles.inputField}
                            placeholder="50000"
                            keyboardType="numeric"
                        />
                    </View>

                    {/*2 interest */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContTextAndRadioButton}>
                            <Text>Interest %:</Text>
                            <TouchableOpacity onPress={() => setInputFieldRadioButton('interest')}>
                                <Text style={(inputFieldRadioBtn == 'interest') ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setInterest(val) }
                            style={hplStyles.inputField}
                            placeholder="5"
                            keyboardType="numeric"
                        />
                    </View>
                    {/*2 numberOfPayments */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContTextAndRadioButton}>
                            <Text>Number of payments:</Text>
                            <TouchableOpacity onPress={() => setInputFieldRadioButton('numberOfPayments')}>
                                <Text style={(inputFieldRadioBtn == 'numberOfPayments') ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setNumberOfPayments(val) }
                            style={hplStyles.inputField}
                            placeholder="10"
                            keyboardType="numeric"
                        />
                    </View>

                    {/*2 installmentAmmount */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContTextAndRadioButton}>
                            <Text>Installment ammount:</Text>
                            <TouchableOpacity onPress={() => setInputFieldRadioButton('installmentAmmount')}>
                                <Text style={(inputFieldRadioBtn == 'installmentAmmount') ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setInstallmentAmmount(val) }
                            style={hplStyles.inputField}
                            placeholder="5000"
                            keyboardType="numeric"
                        />
                    </View>

                    {/*2 residual */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContTextAndRadioButton}>
                            <Text>Residual:</Text>
                            <TouchableOpacity onPress={() => setInputFieldRadioButton('residual')}>
                                <Text style={(inputFieldRadioBtn == 'residual') ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setResidual(val) }
                            style={hplStyles.inputField}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                    </View>

                </View>
            </View>




            {/* Payment Frequency */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>

                </View>
            </View>

            
        </View>
    );
}

const hplStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    outerCont:{
        backgroundColor: "#e8e8e8",
        paddingVertical: 25,
        marginVertical: 10,
        marginLeft: '10%',
        marginRight: '10%',
    },

    innerCont:{
        marginVertical: 5,
        marginHorizontal: 20,
    },

    input:{
        marginVertical: 5,
    },

    inputContTextAndRadioButton:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputFieldRadioButton:{
        fontSize: 15,
        color: '#3b3b3b',
    },

    inputFieldRadioButton_Active:{
        fontSize: 15,
        color: 'red',
    },

    inputLabel:{

    },

    inputField:{
        backgroundColor: '#fff',
    },
});