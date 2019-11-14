<script>

	import Banner from "./components/Banner.svelte";
	import Category from "./components/Category.svelte";
	import BottomSpacer from "./components/BottomSpacer.svelte";
	import VoteCount from "./components/VoteCount.svelte";
	import { nominees } from "./nominees.js";

	$: categories = Object.keys($nominees);

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
	<Category {category}/>
{/each}
<BottomSpacer/>
<VoteCount/>