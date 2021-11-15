// jsClass
// TODO make it an import to this page
class LeaseReport {
    constructor (clientName,principle,annualInterestRate,numberOfPayments,installmentAmmount,paymentFrequencyRadioBtn,paymentFrequencyVal){
        this.clientName = clientName
        this.principle = principle;
        this.annualInterestRate = annualInterestRate;
        this.numberOfPayments = numberOfPayments;
        this.installmentAmmount = installmentAmmount;
        this.paymentFrequencyRadioBtn = paymentFrequencyRadioBtn;
        this.paymentFrequencyVal = paymentFrequencyVal;

        this.initPrinciple = principle
        this.accountBalance = installmentAmmount * numberOfPayments
        this.interestOwing = (installmentAmmount * numberOfPayments) - principle
         
    }

    getPrinciple() {
        return this.principle
    }
}