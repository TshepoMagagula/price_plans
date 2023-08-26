document.addEventListener("alpine:init", () => {
    
    Alpine.data('price_plansWithSQLite', () => {
        return{
            createMessageShow: false,
            deleteMessageShow: false,
            messageShow: false,
            totalPhoneBillShow: false,
            showPricePlans: false,
            price_plans: [],
            message: '',
            createMessage: '',
            deleteMessage: '',
            plan_name: '',
            actions: '',
            totalPhoneBill: 0,
            pricePlan: '',
            newCall_cost: 0,
            newSms_cost: 0,
            name: '',
            call_cost : 0,
            sms_cost : 0,
            id : 0,
            show: false,
            init(){
                this.getPricePlans()
            },
            getPricePlans(){

                return axios.get('/api/price_plans')
                            .then(result => {
                                this.price_plans = result.data.price_plans
                                console.log(result.data)
                            })
            },

            getTotalPhoneBill(){

                const plansInDB = [];
                this.price_plans.forEach(element => {
                    plansInDB.push(element.plan_name)
                });

                if(!this.plan_name || !plansInDB.includes(this.plan_name)){
                    alert(`Invalid price plan: The price plan name is either empty or it does not exist in the database`)
                }
                else {
                    return axios.post('/api/phonebill', {
                        "price_plan": this.plan_name,
                        "actions" : this.actions
                    }).then(result => {
                        this.totalPhoneBill = result.data.total
                    }),
    
                    this.totalPhoneBillShow = true
                }                
            },

            createPricePlan(){

                const plansInDB = [];
                this.price_plans.forEach(element => {
                    plansInDB.push(element.plan_name)
                });
                
                if(!this.name || plansInDB.includes(this.name)){
                    alert(`Invalid plan name: The plan name is either empty or it already exists in the database`)
                }
                else if(!this.sms_cost > 0 || !this.call_cost > 0){
                    alert(`Invalid sms or call cost: the sms and call cost must be above 0`)
                }
                else {
                    return axios.post('/api/price_plan/create', {
                        "name": this.name,
                        "call_cost" : this.call_cost,
                        "sms_cost": this.sms_cost
                    }).then(result => {
                        this.createMessage = result.data.message;
                    }),

                    this.createMessageShow = true
                }                
            },

            updatePricePlan(){

                const plansInDB1 = [];
                this.price_plans.forEach(element => {
                    plansInDB1.push(element.plan_name)
                });
                
                if(!this.pricePlan || !plansInDB1.includes(this.pricePlan)){
                    alert(`Invalid plan name: The plan name is either empty or it does not exist in the database`)
                } 
                else if(!this.newSms_cost > 0 || !this.newCall_cost > 0){
                    alert(`Invalid sms or call cost: the sms and call cost must be above 0`)
                }
                else {
                    return axios.post('/api/price_plan/update', {
                        "price_plan": this.pricePlan,
                        "sms_price" : this.newSms_cost,
                        "call_price": this.newCall_cost
                    }).then(result => {
                        this.message = result.data.message
                    }),
    
                    this.messageShow = true
                }                
            },

            deletePricePlan(){

                const IDsInDB = [];
                this.price_plans.forEach(element => {
                    IDsInDB.push(element.id)
                });

                let IdTracker = false;

                IDsInDB.forEach(element => {
                    if(this.id == element){
                        IdTracker =true
                    }   
                })

                if(!IdTracker){
                    alert(`Invalid id: The given id does not exist in the database`)
                }
                else {
                    return axios.post('/api/price_plan/delete', {
                        "id": this.id
                    }).then(result => {
                        this.deleteMessage = result.data.message
                    }),
                    
                    this.deleteMessageShow = true
                }              
            }
        }
    })
})