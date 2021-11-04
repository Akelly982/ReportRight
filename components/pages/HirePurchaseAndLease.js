import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Spacer} from "../Spacer";












// jsClass
// TODO make it an import to this page
class LeaseReport {
    constructor (interest,principle,numberOfPayments,installmentAmmount,residual){
        this.interst = interest;
        this.principle = principle;
        this.numberOfPayments = numberOfPayments;
        this.installmentAmmount = installmentAmmount;
        this.residual = residual;

        
    }

    getPrinciple() {
        return this.principle
    }
}




export function HirePurchaseAndLease(props) {
    const navigation = useNavigation()


    // report
    const [report,setReport] = useState(null)

    // user inputs 
    const INTEREST_INITVALUE = 10
    const PRINCIPLE_INITVALUE = 50000
    const NUMBEROFPAYMENTS_INITVALUE = 10
    const INSTALLMENTAMMOUNT_INITVALUE = 5000
    const RESIDUAL_INITVALUE = 0

    const [clientName,setClientName] = useState(null)
    const [interest,setInterest] = useState(INTEREST_INITVALUE)
    const [principle,setPrinciple] = useState(PRINCIPLE_INITVALUE)
    const [numberOfPayments,setNumberOfPayments] = useState(NUMBEROFPAYMENTS_INITVALUE)
    const [installmentAmmount,setInstallmentAmmount] = useState(INSTALLMENTAMMOUNT_INITVALUE)
    const [residual,setResidual] = useState(RESIDUAL_INITVALUE)


    // Setup Radio Buttons
    const HIREPURCHASE = 'HirePurchase'
    const LEASE = 'Lease'
    const [reportTypeRadioBtn,setReportTypeRadioButton] = useState(LEASE)
    

    const PRINCIPLE = 'Principle'
    const NUMBEROFPAYMENTS = 'NumberOfPaymets'
    const INSTALLMENTAMMOUNT = 'InstallmentAmmount'
    const RESIDUAL = 'Residual'
    const [inputFieldRadioBtn,setInputFieldRadioButton] = useState(PRINCIPLE)
    
    
    const WEEKLY = 'Weekly'
    const FORTNIGHTLY = 'Fornightly'
    const MONTHLY = 'Monthly'
    const QUARTERLY = 'Quarterly'
    const HALFYEARLY = "Half Yearly"
    const ANNUALLY = 'Annually'
    const [paymentFrequencyRadioBtn,setPaymentFrequencyRadioButton] = useState(MONTHLY)




    const calculateSelectedInput = () => { 
        alert('calculate Selected input: ' + inputFieldRadioBtn)
    }


    const generateReport = () => { 
        console.log('report generation started')

        // ensure all required fields are filled in 
        if (principle == null ||
            interest == null ||
            numberOfPayments == null ||
            installmentAmmount == null ||
            residual == null){

                alert('Please fill in all the required fields')
    
        }else{
            console.log('InputFields are filled')

            const r = new LeaseReport(interest,principle,numberOfPayments,installmentAmmount,residual)

            console.log(r.getPrinciple())

        }
    }


    const viewReport = () => { 
        if(report == null){
            alert("Please generate the report first")
        }else{
            alert("View Report")
        }
        
    }


    const downloadReport = () => { 
        if(report == null){
            alert("Please generate the report first")
        }else{
            alert("View Report")
        }
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
                            <Text>Client Name: (optional)</Text>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setClientName(val) }
                            style={hplStyles.inputField}
                            placeholder="James"
                            keyboardType="default"
                        />
                    </View>

                    {/*1 Interest */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContText}>
                            <Text>Interest %:</Text>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setInterest(val)}
                            style={hplStyles.inputField}
                            keyboardType="numeric"
                            value={INTEREST_INITVALUE.toString()}  //value has to initialized as a string
                        />
                    </View>

                    <Spacer height={50}/>

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
                            value={PRINCIPLE_INITVALUE.toString()}
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
                            value={NUMBEROFPAYMENTS_INITVALUE.toString()}
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
                            value={INSTALLMENTAMMOUNT_INITVALUE.toString()}
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
                            value={RESIDUAL_INITVALUE.toString()}
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
                    <Text> Payment Frequency </Text>

                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequencyRadioButton(WEEKLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == WEEKLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {WEEKLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequencyRadioButton(FORTNIGHTLY)}>
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
                                <TouchableOpacity onPress={() => setPaymentFrequencyRadioButton(QUARTERLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == QUARTERLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {QUARTERLY} </Text>
                            </View>
                    </View>

                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequencyRadioButton(HALFYEARLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == HALFYEARLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {HALFYEARLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequencyRadioButton(ANNUALLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == ANNUALLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {ANNUALLY} </Text>
                            </View>
                    </View>
                </View>
            </View>




            {/* Generate Report */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <TouchableOpacity style={hplStyles.Btn} onPress={() => generateReport()}>
                        <Text style={hplStyles.BtnText}> Generate Report </Text>
                    </TouchableOpacity>
                </View>
            </View>



            {/* View and Download */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <TouchableOpacity style={(report == null) ? hplStyles.btnDisabled : hplStyles.btn} onPress={() => viewReport()}>
                        <Text style={hplStyles.BtnText}> View Report </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={(report == null) ? hplStyles.btnDisabled : hplStyles.btn} onPress={() => downloadReport()}>
                        <Text style={hplStyles.BtnText}> Download Report </Text>
                    </TouchableOpacity>
                </View>
            </View>

            
        </ScrollView>
    );
}






// ------------------------------------------------------------
// -------- STYLES --------------------------------------------


const hplStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    outerCont:{
        backgroundColor: "#e8e8e8",
        paddingVertical: 25,
        marginVertical: 10,
        marginHorizontal: '5%',
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

    btnDisabled:{
        marginVertical: 5,
        backgroundColor: '#3b3b3b',
        borderRadius: 5,
        minHeight: 40,

        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
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