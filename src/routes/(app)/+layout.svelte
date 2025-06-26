<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
    import Navbar from '$lib/components/Navbar.svelte';
    import type { PageProps } from './$types';


    let {children, data} = $props()

    $effect(() => {
        console.log(data.userName);
    })

</script>


<div>
    <Navbar user={data.userName} />

    {@render children()}


    <Footer />
</div>