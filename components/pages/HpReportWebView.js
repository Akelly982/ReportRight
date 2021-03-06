import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';



// http://www.unit-conversion.info/texttools/remove-line-breaks/#data
// http://www.unit-conversion.info/texttools/remove-spaces/   <--- dont use this one it fuses your <div and class togeather
// http://www.unit-conversion.info/texttools/remove-extra-spaces/#data
    // Above site helpfull to remove lineBrakes then spaces on that
    // you end up with one long html string easy to put into a var
// (1) remove extra spaces   (2) remove line brakes  (3) add it to var 
    // inline styles work in the html string   
    


//html string will contain inline css  
const htmlTestString =  '<!doctype html> <html lang="en"> <body> <div class="mainContainer"> <div class="reportContainer"> <div class="title"> <h3>Report Type:<h3> <h3>Hire Purchase</h3> </div> <div class="Client"> <div class="textAndVar"> <p>Client Name: </p> <p> jimmy </p> </div> <div class="spacer"> <p> ------------------------------- </p> </div> </div> <div class="headerData"> <div class="textAndVar"> <p>Principle: </p> <p> xxxxx </p> </div> <div class="textAndVar"> <p>Annual Interest rate: </p> <p> xxxxx </p> </div> <div class="textAndVar"> <p> rrr: </p> <p> xxxxx </p> </div> <div class="textAndVar"> <p>Principle: </p> <p> xxxxx </p> </div> <div class="textAndVar"> <p>Principle: </p> <p> xxxxx </p> </div> </div> <div class="spacer"> <p> ------------------------------- </p> </div> <div class="tableData"> <div class="row" id="rowName"> <p class="rowItem"> Increment </p> <p class="rowItem"> somthing else </p> <p class="rowItem"> somthing else </p> <p class="rowItem"> somthing else </p> <p class="rowItem"> somthing else </p> <p class="rowItem"> somthing else </p> <p class="rowItem"> somthing else </p> </div> <div class="row"> <p class="rowItem"> 1 </p> <p class="rowItem"> 1324432143 </p> <p class="rowItem"> 31241324132 </p> <p class="rowItem"> 100000.12 </p> <p class="rowItem"> 31423512341 </p> <p class="rowItem"> 123 </p> <p class="rowItem"> 9999 </p> </div> <div class="row"> <p class="rowItem"> 2 </p> <p class="rowItem"> 1324432143 </p> <p class="rowItem"> 3 </p> <p class="rowItem"> 100000.12 </p> <p class="rowItem"> 31423512341 </p> <p class="rowItem"> 12345678910 </p> <p class="rowItem"> 9999 </p> </div> <div class="row"> <p class="rowItem"> 3 </p> <p class="rowItem"> 1324432143 </p> <p class="rowItem"> 34132 </p> <p class="rowItem"> 100000.12 </p> <p class="rowItem"> 31423512341 </p> <p class="rowItem"> 12345678910 </p> <p class="rowItem"> 9999 </p> </div><div class="spacer"> <p> ---- ------------------------------------ </p> </div> <div class="tableDataInsert"> <div class="textAndVar"> <p> Year: </p> <p> 1 </p> </div> <div class="varLeft"> <p> 16000.65 </p> </div> <div class="varLeft"> <p> 11000.12 </p> </div> </div> <div class="spacer"> <p> ---- ------------------------------------ </p> </div> <div class="row"> <p class="rowItem"> 4 </p> <p class="rowItem"> 1324432143 </p> <p class="rowItem"> 31241324132 </p> <p class="rowItem"> 100000.12 </p> <p class="rowItem"> 31423512341 </p> <p class="rowItem"> 12345678910 </p> <p class="rowItem"> 9999 </p> </div> <div class="tableDataInsert"> <div class="itemCenter"> <p> Adjustment: </p> </div> <div class="itemLeft"> <p> 0.57 </p> </div> <div class="itemLeft"> <p> -0.57 </p> </div> </div> <div class="tableDataInsert"> <div class="itemCenter"> <p> Totals: </p> </div> <div class="itemLeft"> <p> 120000 </p> </div> <div class="itemLeft"> <p> 18000 </p> </div> </div> </div> </div> </div> </body> </html> <style> :root { --ReportColor: #fff; --ReportEdge: lightblue; --textColor: #3b3b3b; }p{ color: var(--textColor); } h3{ color: var(--textColor); } .mainContainer{ background-color: var(--ReportEdge); padding:25px; width: 925px; display: flex; justify-content: center; } .reportContainer{ background-color: var(--ReportColor); /* 875 px is the width of the grid it has fixed width partially because i want it to*/ /* be zoomable on the mobile devices */ width: 875px; padding: 20px; display: flex; flex-direction: column; }.title{ display: flex; flex-direction: row; justify-content: center; align-items: center; } .title h3{ padding-left: 5px; padding-right: 5px; } .spacer{ height: 30px; display: flex; justify-content: center; align-items: center; } .headerData{ width: 100%; display: grid; grid-template-columns: auto auto auto; } .textAndVar{ display: flex; flex-direction: row; align-items: center; justify-content: center; } .textAndVar p{ padding-left: 10px; padding-right: 10px; } /* ======== TABLE DATA ============ */ /* ================================ */ .tableData{ width: 100%; } .row{ display: grid; grid-template-columns: 125px 125px 125px 125px 125px 125px 125px; /* grid-template-columns: auto auto auto auto auto auto auto; */ } .rowItem{ display:flex; justify-content: center; align-items: center; } .tableDataInsert{ display: grid; grid-template-columns: 150px 125px 125px 125px 125px 125px 125px; } .tableEndText{ display: flex; flex-direction: column; justify-content: center; align-items: center; } .itemCenter{ display: flex; flex-direction: column; align-items: center; justify-content: center; } .itemLeft { display: flex; flex-direction: column; } </style>' 


// const myHtmlFile = require("./my-asset-folder/local-site.html");
// const myHtmlFile = require("../hpReport.html");

export function HpReportWebView(props) {

    const navigation = useNavigation()

    return (
        <WebView 
            originWhiteList={['*']}
            source={{html: props.reportStr}}
            javaScriptEnabled={true}
            scalesPageToFit={true}  //still zoomable but sets it so that it starts with full view
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
    },
});