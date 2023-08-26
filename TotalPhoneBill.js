export function totalPhoneBill(CustActions, sms_price, call_price){
    const ArrCustActions = CustActions.split(",");
      let totalBill = 0;
      for(let i = 0; i < ArrCustActions.length; i++ ){
      let CustAct = ArrCustActions[i].trim();
        if(CustAct == "call" || CustAct == "Call" || CustAct == "CALL"){
          totalBill += call_price
        }
        else if(CustAct == "sms" || CustAct == "Sms" || CustAct == "SMS") {
          totalBill += sms_price
        }
        else {
          totalBill
        }
      }
      return "R" + totalBill.toFixed(2);
}