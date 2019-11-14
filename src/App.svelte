<script>

	import Banner from "./components/Banner.svelte";
	import Category from "./components/Category.svelte";
	import BottomSpacer from "./components/BottomSpacer.svelte";
	import VoteCount from "./components/VoteCount.svelte";

	let dataReq = fetch("/memes.json")
		.then(response => response.json());


	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');

	var showBanner = true;
	var missingVotes = 2;
	let loading = true;

</script>

<style>
	:global(:root) {
		--color-primary: rgb(204, 143, 0);
		--color-primary-variant: rgb(167, 117, 0);
		--color-secondary: rgb(0, 0, 0);
		--color-secondary-variant: rgb(20, 20, 20);
	}
	:global(body) {
		background-color: var(--color-primary);
		padding: 0;
		font-family: 'Hind', sans-serif;
	}
</style>

<Banner />
{#await dataReq}
	<p>Loading data...</p>
{:then data}
	{#each data.categories as category}
		<Category name={category.name} entries={category.nominees} />
	{/each}
{/await}
<BottomSpacer {token}/>
<VoteCount {missingVotes} {loading}/>