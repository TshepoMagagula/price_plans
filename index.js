import express from 'express';
import cors from 'cors';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';
import {totalPhoneBill} from './TotalPhoneBill.js';

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3008;

const  db = await sqlite.open({
    filename:  './data_plan.db',
    driver:  sqlite3.Database
});

console.log('db initialized');

await db.migrate();

app.post('/api/phoneBill/', async function(req, res) {
    const plan_name = req.body.price_plan;
    const actions = req.body.actions;
    const price_plan = await db.all(`SELECT * FROM price_plan WHERE plan_name = '${plan_name}'`);
    const sms_price = price_plan[0].sms_price;
    const call_price = price_plan[0].call_price;

    res.json({
        "total" : totalPhoneBill(actions, sms_price, call_price)
    })
});

app.get('/api/price_plans', async function(req, res) {

    const price_plans = await db.all(`SELECT * FROM price_plan`)
    
    res.json({
        price_plans
    })
});

app.post('/api/price_plan/create', async function(req, res) {
    
    const {name,
        call_cost,
        sms_cost} = req.body;

    const result = await db.run(`INSERT INTO price_plan (plan_name, sms_price, call_price) 
    VALUES ('${name}', ${sms_cost}, ${call_cost})`)

    res.json({
        status: 'success',
        message: `Price plan "${name}" has been created`
    })
});

app.post('/api/price_plan/update', async function(req, res) {

    const {sms_price,
        call_price,
        price_plan} = req.body;

    const result = await db.run(`UPDATE price_plan SET sms_price = ?, call_price = ? 
    WHERE plan_name = ?`, sms_price, call_price, price_plan)

    res.json({
        status : 'success',
        message: `Price Plan '${price_plan}' has been updated`
    })
});

app.post('/api/price_plan/delete', async function(req, res) {

    const id = req.body.id;
    const result = await db.run(`DELETE FROM price_plan WHERE id = ?`, id)

    res.json({
        "status" : 'success',
        message : `Price plan with id ${id} has been deleted`
    })
});

app.listen(PORT, () => console.log(`started on port : ${PORT}`))
console.log("done!")