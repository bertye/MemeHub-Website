<link href="https://fonts.googleapis.com/css?family=Hind|Teko:300&display=swap" rel="stylesheet">

<link rel="prefetch" href="/img/memes/memeA.jpg" />
<link rel="prefetch" href="/img/memes/memeB.jpg" />

<script>

	import Banner from "./components/Banner.svelte";
	import Category from "./components/Category.svelte";
	import BottomSpacer from "./components/BottomSpacer.svelte";

	const urlParams = new URLSearchParams(window.location.search);
	const token = urlParams.get('token');

	var showBanner = true;
	var categories = ['Dank', 'Gesellschaft', 'Spooktober'];
	var dummy_entries = [
		{
			id: '1',
			user: "mainy",
			image: "/img/memes/memeA.jpg",
			selected: false,
		},
		{
			id: '2',
			user: "mainy",
			image: "/img/memes/memeB.jpg",
			selected: true,
		},
		{
			id: '3',
			user: "mainy",
			image: "/img/memes/memeA.jpg",
			selected: false,
		}
	];
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
{#each categories as category}
	<Category name={category} entries={dummy_entries} />
{/each}
<BottomSpacer {token}/>
