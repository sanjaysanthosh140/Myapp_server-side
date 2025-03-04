import {Request,Response} from 'express'
require('dotenv').config()
export const stripcall = async (req: Request, res: Response) => {
    const Stripe = require("stripe")
    const stripe = new (Stripe as any)(process.env.Strip_Secret_Key)
    try {
        let clientside:any
        let data: any = req.body
        const amount = Number(data.amount)
        const { currency } = data
        console.log(amount,currency)
        await stripe.paymentIntents.create({
            amount: amount,
            currency: currency
        }).then((paymentIntent: any) => {
            console.log(paymentIntent.client_secret)
             clientside = paymentIntent.client_secret
        })
        res.setHeader("Content-Type", "application/json");
       res.status(200).json({
        clientside:clientside
        })
       
       
    } catch (error) {
       
       console.log(error)
       
    }
}