<script>
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
	<div class="omnio">slit.link</div>
	<h2 class="omnio">
		> <span class="fancy-font">{urlInput}</span>
	</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<input class="basic-input" bind:value={urlInput} disabled={!!shortUrl}>
		<button disabled={!validUrl || !urlInput || !!shortUrl} type=submit>
			Submit
		</button>
	</form>
	{#if shortUrl}
		<section>
			<input id="shortened" class="fancy-font" readonly value={shortUrl}>
			<div class="copy" on:click={() => clipIt("shortened")}>click to copy</div>
		</section>
	{/if}
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;300&display=swap');
	
	* {
		font-family: Helvetica, sans-serif
	}
	main {
		text-align: center;
		padding: 2em;
		max-width: 240px;
		margin: 0 auto;
	}

	.omnio {
		color: #999999;
		font-size: 2em;
		font-weight: 100;
	}

	form {
		margin-bottom: 6em;
	}

	.fancy-font {
		font-family: Poppins, Helvetica, sans-serif;
		font-weight: 100;
	}

	.basic-input {
		width: 40%
	}

	.copy {
		cursor: pointer;
		transition: all 200ms cubic-bezier(0.215, 0.610, 0.355, 1)
	}

	.copy:hover {
		font-weight: 600;
	}

	.copy:active {
		transform: scale(0.8);
	}

	#shortened {
		text-align: center;
		width: 60%;
		color: #333333;
		font-size: 2em;
		font-weight: 300;
		border: none;
		border-top: 1px solid #AAA;
	}

	#shortened:focus {
    outline: none;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>