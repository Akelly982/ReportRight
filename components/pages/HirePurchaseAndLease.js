import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Spacer} from "../Spacer";
// import { LeaseReport } from '../jsClass/LeaseReport';




class Report {
    constructor (reportTypeStr,clientName,principle,annualInterestRate,numberOfPayments,installmentAmmount,paymentFrequencyStr,paymentFrequencyVal,columnArray ,rowArray){
        this.reportTypeStr = reportTypeStr
        this.clientName = clientName
        this.principle = principle;
        this.annualInterestRate = annualInterestRate;
        this.numberOfPayments = numberOfPayments;
        this.installmentAmmount = installmentAmmount;
        this.paymentFrequencyStr = paymentFrequencyStr;
        this.paymentFrequencyVal = paymentFrequencyVal
        this.columnArray = columnArray;
        this.rowArray = rowArray;

        this.totalAccountBalance = installmentAmmount * numberOfPayments
        this.totalInterestOwing = (installmentAmmount * numberOfPayments) - principle
 
    }

    //Methods ----------------

    logToConsole(){

        // log init data 
        console.log('---------HEADER Data----------------------')
        console.log('Report type: ' + this.reportTypeStr)
        console.log('ClientName:' + this.clientName)
        console.log('principle: ' + this.principle)
        console.log('Annual Interest Rate: ' + this.annualInterestRate)
        console.log('Installment Ammount: ' + this.installmentAmmount)
        console.log('frequency: ' + this.paymentFrequencyStr)
        console.log("frequencyVal: " + this.paymentFrequencyVal)
        console.log('Total Account balance: ' + this.totalAccountBalance)
        console.log('Total Interest Owing: ' + this.totalInterestOwing)
        console.log("Interest Method: Acturarial Method")
        console.log('------------------------------------')

        console.log('---------Table Data----------------------')
        // log column names
        let strColumns = ''
        this.columnArray.forEach(e => {
            strColumns = strColumns + e + "  "
        });
        console.log(strColumns)

        // print rows
        let r = 0
        let year = 1
        this.rowArray.forEach(row => {

            // read row
            let strRow = ''
            row.forEach(e => {
                strRow = strRow + e.toString() + "  "
            });
            console.log(strRow)

            //if incremnt modulous , End year stmt with stats
            if(r%12 == 0){
                // console.log("Year: " + year + " / itemRow: " + r)
                console.log("====================================================================================")
                console.log("Year: " + year +" / IncrementNum: " + this.paymentFrequencyVal + " / PrinciplePaid: " + this.rowArray[r][7] + " / InterestPaid: " + this.rowArray[r][3])
                console.log("====================================================================================")
                year++
            }
            r++
        })

    }

    //Getters ----------------

    getReportTypeStr(){
        return this.reportTypeStr
    }

    getClientName(){
        return this.clientName
    }

    getPrinciple(){
        return this.principle
    }

    getAnnualInterestRate(){
        return this.annualInterestRate
    }

    getNumberOfPayments(){
        return this.numberOfPayments
    }

    getInstallmentAmmount(){
        return this.installmentAmmount
    }

    getPaymentFrequencyStr(){
        return this.paymentFrequencyStr
    }

    getTotalAccountBalance(){
        return this.totalAccountBalance
    }

    getTotalIntersetOwing(){
        return this.totalInterestOwing
    }


}




// -------------------------------------------------------------------
// -------------------------------------------------------------------


export function HirePurchaseAndLease(props) {
    const navigation = useNavigation()
    

    // report
    const [report,setReport] = useState(null)

    // user inputs 
    const ANNUALINTERESTRATE_INITVALUE = 4.5
    const PRINCIPLE_INITVALUE = 100000
    const NUMBEROFPAYMENTS_INITVALUE = 60
    const INSTALLMENTAMMOUNT_INITVALUE = null
    const PAYMENTFREQUENCYVAL_INITVALUE = 12

    const [clientName,setClientName] = useState(null)
    const [annualInterestRate,setAnnualInterestRate] = useState(ANNUALINTERESTRATE_INITVALUE)
    const [principle,setPrinciple] = useState(PRINCIPLE_INITVALUE)
    const [numberOfPayments,setNumberOfPayments] = useState(NUMBEROFPAYMENTS_INITVALUE)
    const [installmentAmmount,setInstallmentAmmount] = useState(INSTALLMENTAMMOUNT_INITVALUE)
    const [paymentFrequencyVal,setPaymentFrequencyVal] = useState(PAYMENTFREQUENCYVAL_INITVALUE)
    


    // Setup Radio Buttons
        // setup form RB
    const HIREPURCHASE = 'HirePurchase'
    const LEASE = 'Lease'
    const [reportTypeRadioBtn,setReportTypeRadioButton] = useState(LEASE)
    
    
        // setup frequency string RB
        // this is later converted to paymentFrequencyVal  
            // (12 months per year) / (52 weeks per year) / etc
    const WEEKLY = 'Weekly'
    const FORTNIGHTLY = 'Fornightly'
    const MONTHLY = 'Monthly'
    const QUARTERLY = 'Quarterly'
    const HALFYEARLY = "Half Yearly"
    const ANNUALLY = 'Annually'

    const [paymentFrequencyRadioBtn,setPaymentFrequencyRadioButton] = useState(MONTHLY)




    // useEffect(()=> {
        
    // })[installmentAmmount]

    const setPaymentFrequency = (frequency) => {
        //first update rb views
        setPaymentFrequencyRadioButton(frequency)

        //then update paymentFrequencyVal
            // their is a millisecond delay when value is set it here to not upset 
            // calculating installment ammount somtimes the wait for to update required 
            // user to click the calculate btn twice
        switch(frequency){
            case WEEKLY:
                setPaymentFrequencyVal(52)
                break; 
            case FORTNIGHTLY:
                setPaymentFrequencyVal(26)
                break; 
            case MONTHLY:
                setPaymentFrequencyVal(12)
                break; 
            case QUARTERLY:
                setPaymentFrequencyVal(4)
                break; 
            case HALFYEARLY:
                setPaymentFrequencyVal(2)
                break; 
            case ANNUALLY:
                setPaymentFrequencyVal(1)
                break; 
            default:
                setPaymentFrequencyVal(12)
        }
    }


    const calculateInstallmentAmmount = () => {
        //alert('calculate Instalment ammount')
        // console.log("--- calc instalment ammount ---")
        // console.log("principle: " + principle)
        // console.log("Annual Interest Rate: " + annualInterestRate)
        // console.log("numberOfPayments: " + numberOfPayments)
        // console.log("paymentFrequency RB: " + paymentFrequencyRadioBtn)
        // console.log("paymentFrequencyVal: " + paymentFrequencyVal)

        // Payment Frequency is always set due to it being a radio btn (monthly == default) 
        if (principle == null ||
            annualInterestRate == null ||
            numberOfPayments == null ||
            paymentFrequencyVal == null){

                alert("Please ensure all input fields are filled in")

        }else{


            // REFERENCE (from goolge collab / sites)
                // This next bit is a bit difficult but the expression you need is below
                    // incrementsPerYear = 12
                    // numYears = numPayments / incrementsPerYear
                    //paymentAmmount = (principle * annualInterestRate/incrementsPerYear) / (1 - math.pow((1+ annualInterestRate/incrementsPerYear),(-1 * numPayments ))) 
                    // print(paymentAmmount)
            
                    //to get 4.5 in form of percentage 0.045
                    // let AIR = annualInterestRate/100  

                    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
                    // xxx.toFixed(2)
            
            // split in half to dignoise an issue
            // let x = ((principle * (annualInterestRate / 100) )/ paymentFrequencyVal)
            // let y = (1- Math.pow((1 + ((annualInterestRate / 100) / paymentFrequencyVal)),(-1 * numberOfPayments)))
            // console.log("x: " + x)
            // console.log("y: " + y)

            
            let num = ((principle * (annualInterestRate / 100) )/ paymentFrequencyVal) / (1- Math.pow((1 + ((annualInterestRate / 100) / paymentFrequencyVal)),(-1 * numberOfPayments)))
            console.log(typeof num)
            num = num.toFixed(2)
            setInstallmentAmmount( num )
            console.log("installmentAmmount: " + installmentAmmount)

        }
    }


    const generateReport = () => { 

        // ensure all required fields are filled in 
        if (principle == null ||
            annualInterestRate == null ||
            numberOfPayments == null ||
            paymentFrequencyVal == null ||
            installmentAmmount == null){
            alert('Please fill in all the required fields and have calculated the installment ammount')
            return
        }

        //recalculate installment amount and ensure it is based off of the same input data 
        let num = ((principle * (annualInterestRate / 100) )/ paymentFrequencyVal) / (1- Math.pow((1 + ((annualInterestRate / 100) / paymentFrequencyVal)),(-1 * numberOfPayments)))
        num = num.toFixed(2)  
    
        if(num != installmentAmmount){
            alert('installment ammount miss match calculate again')
            return
        }

        // Begin Generation
        //Our Column Names
        let incrementArrColumnNames = ["Installment number",
                      "Principle Component",
                      "Interest Component",
                      "Cumulative Interest",
                      "Interest Owing",
                      "Principle Outstanding",
                      "AccountBalance",
                      "Cumulative Principle"]

        
        // initial setup
            //Arrays  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
        let incrementArr = []   //blank array to hold rows
        
        // vars
        let initInterestOwing = (installmentAmmount * numberOfPayments) - principle
        let initAccountBalance = installmentAmmount * numberOfPayments
        let cumulativeInterest = 0    
        let cumulativePrinciple = 0                  
        let interestOwing = initInterestOwing
        let principleOutstanding = principle
        let accountBalance = initAccountBalance

        
        // Loop
        let decimalPlaces = 2
        let i = 1
        while(i <= numberOfPayments){
            //set secondarys (changes here reflect in the main columns for each row)
            let currentInterestComp = (principleOutstanding * (annualInterestRate / 100)) / paymentFrequencyVal
            let currentPrincipleComponent = installmentAmmount - currentInterestComp

            //increment the mains
                //NOTE -= AND =+ dont work here being javascript apparently
            cumulativePrinciple = cumulativePrinciple + currentPrincipleComponent
            cumulativeInterest = cumulativeInterest + currentInterestComp
            interestOwing = interestOwing - currentInterestComp
            principleOutstanding = principleOutstanding - currentPrincipleComponent
            accountBalance = accountBalance - installmentAmmount
        
            // create row
            let activeRow = [i,
                currentPrincipleComponent.toFixed(2),
                currentInterestComp.toFixed(2),
                cumulativeInterest.toFixed(2),
                interestOwing.toFixed(2),
                principleOutstanding.toFixed(2),
                accountBalance.toFixed(2),
                cumulativePrinciple.toFixed(2)]

            // debug log
            // console.log(activeRow)

            //append arr (js is push)
            incrementArr.push(activeRow)

            //Repeat
            i = i+1
        }

        // create Report object
        let report = new Report("Hire Purchase",clientName,principle,annualInterestRate,numberOfPayments,installmentAmmount,paymentFrequencyRadioBtn,paymentFrequencyVal,incrementArrColumnNames,incrementArr)

        //set report to useState()
        setReport(report)


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
            alert("download Report")
        }
    }

    const ShowLogReportBtn = (props) =>{
        if(props.bool){
            return(
            <TouchableOpacity style={(report == null) ? hplStyles.btnDisabled : hplStyles.btn} onPress={() => logReport()}>
                <Text style={hplStyles.btnText}> log Report </Text>
            </TouchableOpacity>
            )
        }else{
            return(null)
        }
    }

    const logReport = () => {
        // alert("logReport")
        report.logToConsole()
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



            {/* Payment Frequency */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <Text> Payment Frequency </Text>

                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequency(WEEKLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == WEEKLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {WEEKLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequency(FORTNIGHTLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == FORTNIGHTLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {FORTNIGHTLY} </Text>
                            </View>
                    </View>

                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequency(MONTHLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == MONTHLY ) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {MONTHLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequency(QUARTERLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == QUARTERLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {QUARTERLY} </Text>
                            </View>
                    </View>

                    <View style={hplStyles.rbFrequencyCont}>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequency(HALFYEARLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == HALFYEARLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {HALFYEARLY} </Text>
                            </View>
                            <View style={hplStyles.rbFrequencyItem}>
                                <TouchableOpacity onPress={() => setPaymentFrequency(ANNUALLY)}>
                                    <Text style={(paymentFrequencyRadioBtn == ANNUALLY) ? hplStyles.inputFieldRadioButton_Active : hplStyles.inputFieldRadioButton }> x </Text>
                                </TouchableOpacity>
                                <Text> {ANNUALLY} </Text>
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
                            keyboardType="default"
                            placeholder="James"
                        />
                    </View>

                    {/*1 annualInterestRate */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContText}>
                            <Text>Annual Interest Rate %:</Text>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setAnnualInterestRate(val)}
                            style={hplStyles.inputField}
                            keyboardType="numeric"
                            placeholder={ANNUALINTERESTRATE_INITVALUE.toString()}
                        />
                    </View>

                    {/*1 Principle */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContTextn}>
                            <Text>Principle:</Text>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setPrinciple(val) }
                            style={hplStyles.inputField}
                            keyboardType="numeric"
                            placeholder={PRINCIPLE_INITVALUE.toString()}
                        />
                    </View>


                    {/*1 numberOfPayments */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContText}>
                            <Text>Number of payments:</Text>
                        </View>
                        <TextInput
                            onChangeText={ (val) => setNumberOfPayments(val) }
                            style={hplStyles.inputField}
                            keyboardType="numeric"
                            placeholder={NUMBEROFPAYMENTS_INITVALUE.toString()}
                        />
                    </View>

                    <Spacer height={50}/>

                    {/*1 installmentAmmount */}
                    <View style={hplStyles.input}>
                        <View style={hplStyles.inputContText}>
                            <Text>Installment ammount:</Text>
                        </View>
                        <View style={hplStyles.installmentAmmountCont}>
                            <Text style={hplStyles.installmentAmmountContText}> { installmentAmmount } </Text>
                        </View>
                    </View>

                    {/* 2 residual */}
                    {/* <View style={hplStyles.input}>
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
                    </View> */}


                    <TouchableOpacity style={hplStyles.calculateInstallmentAmmountInputBtn} onPress={() => calculateInstallmentAmmount()}>
                        <Text style={hplStyles.calculateInstallmentAmmountInputBtnText}> Calculate Installment Ammount </Text>
                    </TouchableOpacity>

                </View>
            </View>




            {/* Generate Report */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <TouchableOpacity style={hplStyles.btn} onPress={() => generateReport()}>
                        <Text style={hplStyles.btnText}> Generate Report </Text>
                    </TouchableOpacity>
                </View>
            </View>



            {/* View and Download */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <TouchableOpacity style={(report == null) ? hplStyles.btnDisabled : hplStyles.btn} onPress={() => viewReport()}>
                        <Text style={hplStyles.btnText}> View Report </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={(report == null) ? hplStyles.btnDisabled : hplStyles.btn} onPress={() => downloadReport()}>
                        <Text style={hplStyles.btnText}> Download Report </Text>
                    </TouchableOpacity>
                    <ShowLogReportBtn bool={true}/>
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

    btn:{
        marginVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 5,
        minHeight: 40,

        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    btnText:{
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

    installmentAmmountCont:{
        backgroundColor: '#d6d6d6',
        width: '100%',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    installmentAmmountContText:{
        color: '#000',
        marginVertical: 5,
    },



    calculateInstallmentAmmountInputBtn:{
        marginVertical: 5,
        backgroundColor: 'grey',
        borderRadius: 5,
        minHeight: 40,
        marginLeft: '10%',

        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    calculateInstallmentAmmountInputBtnText:{
        color: '#e8e8e8'
    },


});