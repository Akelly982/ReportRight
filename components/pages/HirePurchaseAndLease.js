import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function HirePurchaseAndLease(props) {
    const navigation = useNavigation()

    const [clientName,setClientName] = useState('')
    const [principle,setPrinciple] = useState('')
    const [interest,setInterest] = useState('')
    const [numberOfPayments,setNumberOfPayments] = useState('')
    const [installmentAmmount,setInstallmentAmmount] = useState('')
    const [residual,setResidual] = useState('')


    // Setup Radio Buttons
    const HIREPURCHASE = 'HirePurchase'
    const LEASE = 'Lease'
    const [reportTypeRadioBtn,setReportTypeRadioButton] = useState(HIREPURCHASE)
    

    const PRINCIPLE = 'Principle'
    const INTEREST = 'Interest'
    const NUMBEROFPAYMENTS = 'NumberOfPaymets'
    const INSTALLMENTAMMOUNT = 'InstallmentAmmount'
    const RESIDUAL = 'Residual'
    const [inputFieldRadioBtn,setInputFieldRadioButton] = useState(PRINCIPLE)
    
    
    const WEEKLY = 'Weekly'
    const FORTNIGHTLY = 'Fornightly'
    const MONTHLY = 'Monthly'
    const QUARTERLY = 'Quarterly'
    const HALFYEARLY = "HalfYearly"
    const ANNUALLY = 'ANNUALLY'
    const [paymentFrequencyRadioBtn,setPaymentFrequencyRadioButton] = useState(MONTHLY)




    const calculateSelectedInput = () => { 
        alert('calculate Selected input: ' + inputFieldRadioBtn)
    }


    const generateReport = () => { 
        alert('report generation')
    }


    const viewReport = () => { 
        alert('view report')
    }


    const downloadReport = () => { 
        alert('download report')
    }


    return (
        <ScrollView style={hplStyles.container}>

            {/* Calculation / report type */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <View style={hplStyles.rbReportCont}>
                            <View style={hplStyles.rbReportItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(HIREPURCHASE)}>
                                    <Text style={(reportTypeRadioBtn == HIREPURCHASE) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> Hire Purchase </Text>
                            </View>
                            <View style={hplStyles.rbReportItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(LEASE)}>
                                    <Text style={(reportTypeRadioBtn == LEASE) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> Lease </Text>
                            </View>
                    </View>
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
                            placeholder="James"
                            keyboardType="default"
                        />
                    </View>

                    {/*2 Principle */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContTextAndRadioButton}>
                            <Text>Principle:</Text>
                            <TouchableOpacity onPress={() => setInputFieldRadioButton(PRINCIPLE)}>
                                <Text style={(inputFieldRadioBtn == PRINCIPLE) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
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
                            <TouchableOpacity onPress={() => setInputFieldRadioButton(INTEREST)}>
                                <Text style={(inputFieldRadioBtn == INTEREST) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
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
                            <TouchableOpacity onPress={() => setInputFieldRadioButton(NUMBEROFPAYMENTS)}>
                                <Text style={(inputFieldRadioBtn == NUMBEROFPAYMENTS) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
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
                            <TouchableOpacity onPress={() => setInputFieldRadioButton(INSTALLMENTAMMOUNT)}>
                                <Text style={(inputFieldRadioBtn == INSTALLMENTAMMOUNT) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
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
                            <TouchableOpacity onPress={() => setInputFieldRadioButton(RESIDUAL)}>
                                <Text style={(inputFieldRadioBtn == RESIDUAL) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setResidual(val) }
                            style={hplStyles.inputField}
                            placeholder="0"
                            keyboardType="numeric"
                        />
                    </View>


                    <TouchableOpacity style={hplStyles.calculateSelectedInputBtn} onPress={() => calculateSelectedInput()}>
                        <Text style={hplStyles.calculateSelectedInputBtnText}> Calculate Selected Input </Text>
                    </TouchableOpacity>
                </View>
            </View>





            {/* Payment Frequency */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(WEEKLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == WEEKLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {WEEKLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(FORTNIGHTLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == FORTNIGHTLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {FORTNIGHTLY} </Text>
                            </View>
                    </View>

                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(MONTHLY )}>
                                    <Text style={(paymentFrequencyRadioBtn == MONTHLY ) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {MONTHLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(QUARTERLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == QUARTERLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {QUARTERLY} </Text>
                            </View>
                    </View>

                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(HALFYEARLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == HALFYEARLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {HALFYEARLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setReportTypeRadioButton(ANNUALLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == ANNUALLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {ANNUALLY} </Text>
                            </View>
                    </View>
                </View>
            </View>



            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <TouchableOpacity style={hplStyles.Btn} onPress={() => generateReport()}>
                        <Text style={hplStyles.BtnText}> Generate Report </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <TouchableOpacity style={hplStyles.Btn} onPress={() => viewReport()}>
                        <Text style={hplStyles.BtnText}> View Report </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={hplStyles.Btn} onPress={() => downloadReport()}>
                        <Text style={hplStyles.BtnText}> Download Report </Text>
                    </TouchableOpacity>
                </View>
            </View>

            
        </ScrollView>
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




    // Report RB

    rbReportCont:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    rbReportItem:{
        display: 'flex',
        flexDirection: 'row',
    },



    // inputFields and Labels

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


    


    // increments RB

    rbFrequencyCont:{
        marginVertical: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    rbFrequencyItem:{
        display: 'flex',
        flexDirection: 'row',
    },


    // Buttons

    Btn:{
        marginVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 5,
        minHeight: 40,

        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    BtnText:{
        color: '#e8e8e8'
    },

    calculateSelectedInputBtn:{
        marginVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 5,
        minHeight: 40,
        marginLeft: '10%',

        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    calculateSelectedInputBtnText:{
        color: '#e8e8e8'
    },


});