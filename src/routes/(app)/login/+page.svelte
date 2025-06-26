<script lang="ts">

    import { onMount } from 'svelte';
	import intlTelInput from 'intl-tel-input';
	let input: HTMLInputElement;

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
</script>

<form action="?/login" method="post">

    <input name="phoneNumber" bind:this={input} type="tel" class="phone-input" placeholder="Enter phone number" />
    <button type="submit">LOGIN</button>

</form>
