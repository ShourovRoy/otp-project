import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals}) => {
    console.log(locals.user)
    return {
        userName: locals.loggedInName
    }
};