<script>
	export let urlInput;

	const handleSubmit = () => {
		alert(urlInput);
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
		text-transform: uppercase;
		font-size: 2em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>