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
					<div class="copy" on:click={() => clipIt("shortened")}>
						<div class="copy-icon">
							<span class="copy-frame"></span>
							<span class="copy-frame"></span>
						</div>
					</div>
				</div>
			{/if}
		</article>
	</section>
	<Footer />
</main>
<Waves />

<style>

	.short-url-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	#shortened {
		margin: 0 auto;
		text-align: center;
		padding: 1rem;
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
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 3rem auto;
		text-align: center;
		font-size: 3.6rem;
		cursor: pointer;
	}
	.copy-icon {
		position: relative;
		width: 6rem;
		height: 6rem;
		border-radius: 50%;
		background-color: #a97ca48a;
		border: 1px solid #3333338A;
		transition: transform 180ms ease-in-out;
	}
	.copy-icon:active {
		transform: scale(0.9);
	}
	.copy-frame {
		position: absolute;
		width: 2.8rem;
		height: 3.6rem;
		border-radius: 4px;
	}
	.copy-frame:first-child {
		bottom: 0.8rem;
		right: 1.2rem;
		background-color: #a97ca48a;
		border: 2px solid #121212df;
	}
	.copy-frame:last-child {
		top: 0.8rem;
		left: 1.2rem;
		background-color: #a97ca4;
		border: 2px solid #121212dc;
	}

</style>