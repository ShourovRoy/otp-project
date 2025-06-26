import { supabase } from "$lib/supabaseClient";
import type { Actions } from './$types';





export const actions = {

	login: async (event ) => {
		let formData = await event.request.formData()
        let phoneNumber = formData.get("phoneNumber") as string
        console.log(phoneNumber);

        let {data, error} = await supabase.auth.signInWithOtp({
            phone: phoneNumber,
            options: {
                shouldCreateUser: true
            }
        })

        console.log(data)
        console.log(error)

        return {message: 1 > 2 != null ? true : false}
	},

} satisfies Actions;