import { supabase } from "$lib/supabaseClient";
import type { Actions } from "@sveltejs/kit";


export const actions: Actions = {
    signup : async (event) => {
        let formData = await event.request.formData();

        let fullName = formData.get("fullName") as string;
        let phone = formData.get("phone") as string;
        let email = formData.get("email") as string;

        console.log(phone)

        const {data, error} = await supabase.auth.signInWithOtp({
            phone: phone
        });


        if (error) {
            console.log(error);
        }

        console.log(data)


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
        } = await supabase.auth.verifyOtp({
        phone: phone,
        token: otp,
        type: 'sms',
        })

        console.log(error)
        console.log(session)
        // create verified user in the table
        await supabase.from('profiles').upsert({
            id: session?.user.id,
            full_name: fullName,
            phone: session?.user.phone,
            email: email
        })
    }
};



