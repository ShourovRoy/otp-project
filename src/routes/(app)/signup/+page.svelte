<script lang="ts">
import type { PageProps } from './$types';
    import { onMount } from 'svelte';
	import intlTelInput from 'intl-tel-input';
    import { enhance } from '$app/forms';
	let input: HTMLInputElement;


    let {data ,form}: PageProps = $props()
    console.log(form);

	onMount(() => {
		const iti = intlTelInput(input, {
			initialCountry: 'auto',
			geoIpLookup: callback => {
				fetch('https://ipinfo.io/json?token=b35498df410eb1')
					.then((res) => res.json())
					.then((data) => callback(data.country))
					.catch(() => callback('us'));
			},
			utilsScript: 'https://cdn.jsdelivr.net/npm/intl-tel-input@17/build/js/utils.js'
		});

		// On submit, replace raw value with formatted number
		const form = input.closest('form');
		form?.addEventListener('submit', (e) => {
			input.value = iti.getNumber(); // e.g., +880123456789
		});

       
	});

    $effect(() => {
        if (form?.phone) {
            input.value = form?.phone;
        }
    })
</script>


<div class="card" style="width: 18rem;">
  <form action="?/signup" method="post">
    <input value={form?.fullName} placeholder="Full name" class="form-control" type="text" name="fullName" id="fullName">
    <input value={form?.email} placeholder="Email" class="form-control" type="email" name="email" id="email">
    
    
    {#if form?.isVerifyNow == true }
    
    
    <input value={form?.phone} placeholder="Phone" class="form-control w-full" type="tel" name="phone" id="phone">
    <input placeholder="Otp code" class="form-control" type="text" name="otp" id="otp">    
    {:else}
    <input  bind:this={input} placeholder="Phone" class="form-control w-full" type="tel" name="phone" id="phone">

    {/if}



    {#if form?.isVerifyNow }
        <button formaction="?/verifyOtp" class="btn btn-info">Verify Otp</button>
    {:else}
        <button class="btn btn-success" type="submit">SIGNUP</button>
    {/if}
    
  </form>
</div>