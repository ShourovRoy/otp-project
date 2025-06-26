<script lang="ts">
    import Navbar from '$lib/components/Navbar.svelte';


    let {children} = $props()


</script>


<div>
    <Navbar />

    {@render children()}
</div>