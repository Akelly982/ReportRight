import React from 'react';
import {useState,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Animated} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Spacer} from "../Spacer";
// import { LeaseReport } from '../jsClass/LeaseReport';


// =======================================================
// ======== Report Class =================================

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

    //Class Methods ----------------

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
            //installmenst start with increment 1 and array index 0
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
                //r+1 accounts for array index start from 0
            if((r+1)%this.paymentFrequencyVal == 0 && r!=0){
                // console.log("Year: " + year + " / itemRow: " + r)
                console.log("====================================================================================")
                console.log("Year: " + year +" / IncrementNum: " + (r+1)+ " / PrinciplePaid: " + this.rowArray[r][7] + " / InterestPaid: " + this.rowArray[r][3])
                console.log("====================================================================================")
                year++
            }
            // console.log("r: "+r)
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


// ===================================================
// ======== Page data ================================


export function HirePurchaseAndLease(props) {
    const navigation = useNavigation()

    // debug log report btn
    const LOGREPORTBTN = true

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
    const HIREPURCHASE = 'Hire Purchase'
    const LEASE = 'Lease'
    const [reportTypeRadioBtn,setReportTypeRadioButton] = useState(HIREPURCHASE)
    
    
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

// =====================================================
// =====================================================


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

        //Columns names remain the same between reports so generate first
        let incrementArrColumnNames = ["Installment number",
                      "Principle Component",
                      "Interest Component",
                      "Cumulative Interest",
                      "Interest Owing",
                      "Principle Outstanding",
                      "AccountBalance",
                      "Cumulative Principle"]

        //Genereate report based on type HP or LEASE
            //if not Hire Purchase it is Lease
        if (reportTypeRadioBtn == HIREPURCHASE){
            let akTest = "aktest"
            generateHirePurchaseReport(incrementArrColumnNames)
        }else{
            alert("lease report type not ready for generation yet sorry")
        }
    }

    const generateHirePurchaseReport = (arrColumnNames) => {

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
        let report = new Report(reportTypeRadioBtn,clientName,principle,annualInterestRate,numberOfPayments,installmentAmmount,paymentFrequencyRadioBtn,paymentFrequencyVal,arrColumnNames,incrementArr)

        //set report to useState()
        setReport(report)


    }



    // ===========================================================
    // ============= report btns =================================

    const viewReport = () => { 
        if(report == null){
            alert("Please generate the report first")
        }else{
            navigation.navigate('HpReportWebView') //name from corresponding app.js stack.screen element
        }
    }

    const downloadReport = () => { 
        if(report == null){
            alert("Please generate the report first")
        }else{
            alert("download Report")
        }
    }

    const logReport = () => {
        // alert("logReport")
        report.logToConsole()
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


    // =====================================================
    // =====================================================

    return (
        <ScrollView style={hplStyles.container}>

            {/* Calculation / report type */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <View style={hplStyles.rbReportCont}>
                            <TouchableOpacity style={hplStyles.rbReportItem} onPress={() => setReportTypeRadioButton(HIREPURCHASE)}>
                                <View style={hplStyles.inputFieldRadioButton}>
                                    <View style={(reportTypeRadioBtn == HIREPURCHASE) ? hplStyles.inputFieldRadioButton_Active : null }/>
                                </View>
                                <Text> Hire Purchase </Text>
                            </TouchableOpacity>
                            {/* onPress={() => setReportTypeRadioButton(LEASE)     <-- put in place when Lease Report is ready */}
                            <TouchableOpacity style={hplStyles.rbReportItem} onPress={() => alert("Lease Report type is not ready sorry..")}>
                                <View style={hplStyles.inputFieldRadioButton}>
                                    <Text style={(reportTypeRadioBtn == LEASE) ? hplStyles.inputFieldRadioButton_Active : null }/>
                                </View>
                                <Text> Lease </Text>
                            </TouchableOpacity>

                    </View>
                </View>
            </View>



            {/* Payment Frequency */}
            <View style={hplStyles.outerCont}>
                <View style={hplStyles.innerCont}>
                    <Text> Payment Frequency </Text>

                    {/* Row 1 */}
                    <View style={hplStyles.rbFrequencyCont}>
                        <TouchableOpacity style={hplStyles.rbFrequencyItem} onPress={() => setPaymentFrequency(WEEKLY)}>
                            <View style={hplStyles.inputFieldRadioButton}>
                                <Text style={(paymentFrequencyRadioBtn == WEEKLY) ? hplStyles.inputFieldRadioButton_Active : null }/>
                            </View>
                            <Text> {WEEKLY} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={hplStyles.rbFrequencyItem} onPress={() => setPaymentFrequency(FORTNIGHTLY)}>
                        <View style={hplStyles.inputFieldRadioButton}>
                                <Text style={(paymentFrequencyRadioBtn == FORTNIGHTLY) ? hplStyles.inputFieldRadioButton_Active : null }/>
                            </View>
                            <Text> {FORTNIGHTLY} </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Row 2 */}
                    <View style={hplStyles.rbFrequencyCont}>
                        <TouchableOpacity style={hplStyles.rbFrequencyItem} onPress={() => setPaymentFrequency(MONTHLY)}>
                        <View style={hplStyles.inputFieldRadioButton}>
                                <Text style={(paymentFrequencyRadioBtn == MONTHLY) ? hplStyles.inputFieldRadioButton_Active : null }/>
                            </View>
                            <Text> {MONTHLY} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={hplStyles.rbFrequencyItem} onPress={() => setPaymentFrequency(QUARTERLY)}>
                        <View style={hplStyles.inputFieldRadioButton}>
                                <Text style={(paymentFrequencyRadioBtn == QUARTERLY) ? hplStyles.inputFieldRadioButton_Active : null }/>
                            </View>
                            <Text> {QUARTERLY} </Text>
                        </TouchableOpacity>
                    </View>
                    {/* Row 3 */}
                    <View style={hplStyles.rbFrequencyCont}>
                        <TouchableOpacity style={hplStyles.rbFrequencyItem} onPress={() => setPaymentFrequency(HALFYEARLY)}>
                        <View style={hplStyles.inputFieldRadioButton}>
                                <Text style={(paymentFrequencyRadioBtn == HALFYEARLY) ? hplStyles.inputFieldRadioButton_Active : null }/>
                            </View>
                            <Text> {HALFYEARLY} </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={hplStyles.rbFrequencyItem} onPress={() => setPaymentFrequency(ANNUALLY)}>
                        <View style={hplStyles.inputFieldRadioButton}>
                                <Text style={(paymentFrequencyRadioBtn == ANNUALLY) ? hplStyles.inputFieldRadioButton_Active : null }/>
                            </View>
                            <Text> {ANNUALLY} </Text>
                        </TouchableOpacity>
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
                    <ShowLogReportBtn bool={LOGREPORTBTN}/>
                </View>
            </View>

            
        </ScrollView>
    );
}





// =====================================================
// -------- STYLES ------------------------------------- 
// =====================================================

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
        justifyContent: 'center',
        alignItems: 'center',
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
        backgroundColor: '#fff',
        borderRadius: 100,
        width: 25,
        height: 25,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputFieldRadioButton_Active:{
        backgroundColor: 'red',
        borderRadius: 100,
        width: 15,
        height: 15,
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
        justifyContent: 'center',
        alignItems: 'center',
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