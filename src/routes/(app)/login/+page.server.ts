import { supabase } from "$lib/supabaseClient";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
    
};


export const actions = {

	login: async (event ) => {
		let formData = await event.request.formData()
        let phoneNumber = formData.get("phoneNumber") as string
        
        
        if( !phoneNumber) return fail(400, {errorMessage: "Please enter a phone number!"});
        

        let {data, error} = await supabase.auth.signInWithOtp({
            phone: phoneNumber,
            options: {
                shouldCreateUser: false
            }
        })

        if (error) {
            return fail(400, {errorMessage: error.message})
        }

        return {message: "Otp has been sent", isVerifyNow: true, phoneNumber};
	},

    verifyLoginOtp : async (event) => {
        
        let formData = await event.request.formData();

        let phoneNumber = formData.get("phoneNumber") as string;
        let otp = formData.get("otp") as string;


        // verify the otp
        const {
            data: { session },
            error,
        } = await event.locals.supabase.auth.verifyOtp({
            phone: phoneNumber,
            token: otp,
            type: 'sms',
        })


        // create verified user in the table
        let {data, error: detailsError} =  await supabase.from('profiles').select().eq("id", session?.user.id);
        if (detailsError) {
            return fail(400, {errorMessage: "Login failed"})
        }

        if (data != null) {

            event.locals.loggedInName = data[0].full_name
            redirect(303, "/")
        }
    }

} satisfies Actions;