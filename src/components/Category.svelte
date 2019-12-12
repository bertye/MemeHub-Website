<script>
    import Entry from "./Entry.svelte";
    import { nominees } from "../nominees.js";
    export let category;
    
    $: entries = $nominees[category];
    
    let expanded = false;
    $:buttonClass = expanded ? "active" : "";
    
    function toggle() {
        expanded = !expanded;
    }
</script>

<style>
    button {
        text-transform: uppercase;
        background-color: var(--color-secondary);
        color:  var(--color-primary);
        font-size: 1.8em;
        padding: 1em 1em;
        margin: 0.75em auto 0.75em;
        display: block;
        width: 80%;
        max-width: 20em;
        border: none;
        transition:
            width 0.5s ease,
            max-width 0.5s ease;
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

    
</style>

<button class={buttonClass} on:click={toggle}>{category}</button>
<div id="gallery" class={buttonClass}>
    {#each entries as entry}
        <Entry {entry} {category}/>
    {/each}
</div>
