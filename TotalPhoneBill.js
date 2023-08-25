export function totalPhoneBill(CustActions, sms_price, call_price){
    const ArrCustActions = CustActions.split(",");
      let totalBill = 0;
      for(let i = 0; i < ArrCustActions.length; i++ ){
      let CustAct = ArrCustActions[i].trim();
        if(CustAct === "call"){
        totalBill += call_price
        }
        else if (CustAct === "sms"){
        totalBill += sms_price
        }
        else {
            alert(`${CustAct} is not a recognized product for billing`)
        }
      }
      return "R" + totalBill.toFixed(2);
}