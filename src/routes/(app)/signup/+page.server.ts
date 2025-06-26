import { supabase } from "$lib/supabaseClient";
import { fail, type Actions } from "@sveltejs/kit";


export const actions: Actions = {
    signup : async (event) => {
        let formData = await event.request.formData();

        let fullName = formData.get("fullName") as string;
        let phone = formData.get("phone") as string;
        let email = formData.get("email") as string;

        if(!email || !fullName || !phone) return fail(400, {errorMessage: "All fields are required!"});

        const {data, error} = await event.locals.supabase.auth.signInWithOtp({
            phone: phone
        });


        if (error) {
            return fail(400, {errorMessage: error.message})
        }


        // return 
        return {message: "Otp has been sent", isVerifyNow: true, email, fullName, phone};

    },


    // verify otp
    verifyOtp : async (event) => {
        
        let formData = await event.request.formData();

        let fullName = formData.get("fullName") as string;
        let phone = formData.get("phone") as string;
        let email = formData.get("email") as string;
        let otp = formData.get("otp") as string;


        // verify the otp
        const {
            data: { session },
            error,
        } = await event.locals.supabase.auth.verifyOtp({
            phone: phone,
            token: otp,
            type: 'sms',
        })


        // create verified user in the table
        let {data} =  await supabase.from('profiles').upsert({
            id: session?.user.id,
            full_name: fullName,
            phone: session?.user.phone,
            email: email
        })

 
    }
};



