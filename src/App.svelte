<script>
	import Banner from "./components/Banner.svelte";
	import Category from "./components/Category.svelte";
	import BottomSpacer from "./components/BottomSpacer.svelte";
	import VoteCount from "./components/VoteCount.svelte";
	import { nominees } from "./nominees.js";
	import { user } from './user.js';

	const infoLoading = "Loading...";
	const infoVote = "Vote for your favorite Memes!";
	const infoError = "Invalid token!";

	$: categories = Object.keys($nominees);
	let text = infoLoading;
	let loading = true;
	let error = false;
	const userUnsub = user.subscribe(newUser => {
		if (newUser.loading) {
			loading = true;
			error = false;
			text = infoLoading;
			return;
		}

		loading = false;
		if (newUser.error) {
			error = true;
			text = infoError;
			return;
		}

		error = false;
		text = infoVote;
	})

</script>

<style>
	:global(:root) {
		--color-primary: rgb(204, 143, 0);
		--color-primary-variant: rgb(167, 117, 0);
		--color-secondary: rgb(0, 0, 0);
		--color-secondary-variant: rgb(87, 87, 87);
	}
	:global(body) {
		background-color: var(--color-primary);
		padding: 0;
		font-family: 'Hind', sans-serif;
	}
	p {
		color: var(--color-secondary);

        margin: 0;
        padding: 1em 1em;
        font-size: 1.2em;
        text-align: center;
		font-size: 1.3em;
	}
	a {
		color: var(--color-secondary-variant);
	}
	form {
		padding:  1em 2em;
		display: flex;
		align-content: stretch;
	}
	input[type="text"] {
		width: 100%;
		margin: 0;
		background-color: transparent;
		color: var(--color-secondary);
		border: 0.3em solid var(--color-secondary);
	}
	input[type="submit"] {

		color: var(--color-primary);
		background-color: var(--color-secondary);
		border: 0.3em solid var(--color-secondary);
		margin: 0 0 0 1em;
	}
</style>

<Banner {text}/>

{#if error} 
	<p>You need a valid token in order to vote. Please check your messages from <a href="https://t.me/ToMemeHub_Bot">@ToMemeHub_Bot</a></p>
	<p>You can also enter your token here:</p>
	<form action="/" method="GET">
		<input type="text" name="token"/>
		<input type="submit" value="Use"/>
	</form>
{:else if !loading}
	{#each categories as category}
		<Category {category}/>
	{/each}
	<VoteCount/>
{/if}
<BottomSpacer/>