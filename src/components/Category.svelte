<script>
    import Entry from "./Entry.svelte";
    import { nominees } from "../nominees.js";
    import { votes } from "../votes.js";
    export let category;

    $: entries = $nominees[category];
    $: needsVote = !(category in $votes);

    let gallery;
    let expanded = false;
    $: buttonClass = expanded ? "active" : "";

    function toggle() {
        expanded = !expanded;
    }

    function scrollSideways(event) {
        event.preventDefault();
        gallery.scrollBy(event.deltaY * 100, 0);
    }
</script>

<style>
    button {
        text-transform: uppercase;
        background-color: var(--color-secondary);
        color: var(--color-primary);
        font-size: 1.8em;
        padding: 1em 1em;
        margin: 0.75em auto 0.75em;
        display: block;
        width: 80%;
        max-width: 20em;
        border: none;
        transition: width 0.5s ease, max-width 0.5s ease;
    }

    button.active {
        width: 100%;
        max-width: 100%;
    }

    #gallery {
        display: block;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        margin: 0;
        padding: 0;
        min-width: 100%;
        background-color: var(--color-primary);
        text-align: center;
        height: 0;
        transition: height 0.5s ease;
    }
    #gallery::-webkit-scrollbar {
        display: none;
    }

    #gallery.active {
        height: 30em;
        padding: 0 0 1em;
    }

    .need-vote {
        background-color: var(--color-primary);
        display: inline-block;
        width: 0.6em;
        height: 0.6em;
        border-radius: 50%;
        margin-left: 0.2em;
        margin-bottom: 0.05em;
    }
</style>

<button class={buttonClass} on:click={toggle}>
    #{category}
    {#if !needsVote}✓{/if}
</button>
<div
    id="gallery"
    class={buttonClass}
    bind:this={gallery}
    on:wheel={scrollSideways}>
    {#each entries as entry}
        <Entry {entry} {category} />
    {/each}
</div>
