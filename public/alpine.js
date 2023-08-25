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
                return axios.post('/api/phonebill', {
                    "price_plan": this.plan_name,
                    "actions" : this.actions
                }).then(result => {
                    this.totalPhoneBill = result.data.total
                }),

                this.totalPhoneBillShow = true
            },

            createPricePlan(){

                const plansInDB = [];
                this.price_plans.forEach(element => {
                    plansInDB.push(element.plan_name)
                });
                
                if(!this.name || plansInDB.includes(this.name)){
                    alert(`Invalid plan name: The plan name is either empty or it already exists in the database`)
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
                return axios.post('/price_plan/update', {
                    "price_plan": this.pricePlan,
                    "sms_price" : this.newCall_cost,
                    "call_price": this.newSms_cost
                }).then(result => {
                    this.message = result.data.message
                }),

                this.messageShow = true
            },

            deletePricePlan(){

                return axios.post('/api/price_plan/delete', {
                    "id": this.id
                }).then(result => {
                    this.deleteMessage = result.data.message
                }),
                
                this.deleteMessageShow = true
            }
        }
    })
})