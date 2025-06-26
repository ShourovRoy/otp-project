import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    
};


export const actions: Actions = {
    logout: async ({locals}) => {
        let {error} =  await locals.supabase.auth.signOut();

        if (error) {
            return fail(400, {errorMessage: error.message})
        }


        console.log("logout successful")

        
        return {
            message: "logout successful"
        }

    }
};