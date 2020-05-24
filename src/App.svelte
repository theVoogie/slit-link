<script>
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
	<h2>Entered: {urlInput || "none"}!</h2>
	<form on:submit|preventDefault={handleSubmit}>
		<input bind:value={urlInput}>
		<button disabled={!urlInput} type=submit>
			Submit
		</button>
	</form>
	{#if shortUrl}
		<section>
			<h1>{shortUrl}</h1>
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
		color: #ff3e00;
		font-size: 2em;
		font-weight: 100;
	}

	form {
		margin-bottom: 1em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>