<script>
	import {clipIt} from "./helpers" 

	let urlInput; 
	let shortUrl;
	const baseUrl = 'https://go.slit.link/';

	const handleSubmit = () => {
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
	<h2>Entered: {urlInput || "none"}</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value={urlInput}>
		<button disabled={!urlInput} type=submit>
			Submit
		</button>
	</form>
	{#if shortUrl}
		<section>
			<input id="shortened" readonly value={shortUrl}>
			<div on:click={() => clipIt("shortened")}>copy</div>
		</section>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h2 {
		color: #999999;
		font-size: 2em;
		font-weight: 100;
	}

	form {
		margin-bottom: 1em;
	}

	#shortened {
		width: 60%;
		color: #333333;
		font-size: 2.5em;
		font-weight: 260;
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