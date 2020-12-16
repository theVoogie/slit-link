<script>
	import Header from './Header.svelte'
	import Footer from './Footer.svelte'
	import Waves from './Waves.svelte'
	import {clipIt, isValidUrl} from "./helpers" 

	let urlInput = ""; 
	$: validUrl = isValidUrl(urlInput);
	$: console.log(" >>> " + urlInput +" >>> validity is: " + validUrl)
	let shortUrl;
	const baseUrl = 'https://go.slit.link/';

	const handleSubmit = () => {
		if (!urlInput) return;
		const apiUrl = baseUrl + 'generate';
		const data = {
			url: urlInput
		}
		fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
			shortUrl = baseUrl + data.id;
		})
		.catch((error) => {
			console.warn('Error:', error);
		});
	}
</script>

<main>
	<Header />
	<section>
		<div class="text-banner">
			SLIT.LINK is a blazing fast url shortener. It's totally free and each generated link has a lifetime of 5 days. Enjoy!
		</div>
		<article>
			<form on:submit|preventDefault={handleSubmit}>
				<input class="basic-input" bind:value={urlInput} disabled={!!shortUrl}>
				<button disabled={!validUrl || !urlInput || !!shortUrl} type=submit>
					Submit
				</button>
			</form>
			{#if shortUrl}
				<div class="short-url-container">
					<input id="shortened" readonly value={shortUrl}>
					<div class="copy" on:click={() => clipIt("shortened")}>💾</div>
				</div>
			{/if}
		</article>
	</section>
	<Footer />
</main>
<Waves />

<style>
	#short-url-container {
		width: 100%;
		margin-top: 2rem;
		padding: 2rem;
	}
	#shortened {
		margin: 0 auto;
		text-align: center;
		width: 100%;
		color: #f7f7f7;
		font-size: 2.4em;
		font-weight: 300;
		background-color: transparent;
		border: none;
		border-bottom: 1px solid rgb(214, 214, 214);
		border-radius: 0px;
	}
	#shortened:focus {
    outline: none;
	}
	.copy {
		margin-top: 3rem;
		text-align: center;
		font-size: 3.6rem;
		cursor: pointer;
	}
	.copy:hover {
		font-weight: 600;
	}
	.copy:active {
		transform: scale(0.8);
	}

</style>