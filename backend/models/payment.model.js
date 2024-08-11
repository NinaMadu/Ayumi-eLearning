import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",

        },
        
        course:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",

        },      

        amount:{
            type:double,
            require:true,
                    
        },
        
    },{timestamps:true}
);

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;



