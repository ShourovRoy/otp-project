<script lang="ts">

    import { onMount } from 'svelte';
	import intlTelInput from 'intl-tel-input';
    import type { PageProps } from './$types';
	let input: HTMLInputElement;

	$effect(() => {
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
        console.log("isVerified: ",form?.isVerifyNow);
    	if (form?.phoneNumber) {
     	   input.value = form?.phoneNumber;
    	}
    })

	let {form, data}: PageProps = $props()
</script>


<div class="mx-auto py-5">

    <div class="shadow bg-white rounded p-3 mx-auto" style="width: 17rem;">
     
        {#if form?.errorMessage != null }
            <div class="alert alert-warning" role="alert">
                <p>{form?.errorMessage}</p>
            </div>
        {/if}

        {#if form?.message != null }
            <div class="alert alert-primary" role="alert">
                <p>{form?.message}</p>
            </div>
        {/if}
     
        <form action="?/login" method="post">
       
      
        
        {#if form?.isVerifyNow === true }
            <label for="phoneNumber">
                Phone
            </label>
            <br />
            <input value={form?.phoneNumber} placeholder="Phone" class="form-control w-full mb-2" type="tel" name="phoneNumber" id="phoneNumber">
            <label for="otp">
                Otp Code
            </label>
            <input placeholder="Otp code" class="form-control mb-2" type="text" name="otp" id="otp">    
        {:else}
            <label for="phoneNumber">
                Phone
            </label>
            <br />
            <input  bind:this={input} placeholder="Phone" style="padding-right: 0px !important;" class="form-control w-full mb-2" type="tel" name="phoneNumber" id="phoneNumber">
        {/if}
    
            <div class="mt-3">

                {#if form?.isVerifyNow }
                    <button formaction="?/verifyLoginOtp" class="btn btn-info">Verify Otp</button>
                {:else}
                    <button class="btn btn-primary btn-sm" type="submit">Login</button>
                {/if}
            </div>
        
      </form>
    </div>
</div>