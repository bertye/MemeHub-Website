<script>
    import { createEventDispatcher } from 'svelte';
    import { votes } from '../votes.js';
    import { media } from '../media.js';

    export let entry;
    export let category;

    $: file = $media[entry];
    $: selected = $votes[category] && $votes[category] == entry;
    $: fileType = file.split('.')[1];
    $: activeClass = selected ? "active" : "";

    function toggle() {
        if (selected) {
            delete $votes[category];
            votes.update(v => v); // delete not working properly
        }
        else {
            $votes[category] = entry;
        }
    }

</script>

<style>
    div {
        display: inline-block;
        box-sizing: border-box;
        text-indent: 0;
        border: .5em solid var(--color-secondary);
        background-color: var(--color-secondary);
        margin: 0 1em;
        padding: .5em .2em;
        height: 100%;
    }

    div.active {
        background-color: var(--color-primary-variant);
        color: var(--color-secondary);
    }

    div:first-child {
        margin-left: 5em;
    }
    
    div:last-child {
        margin-right: 5em;
    }
    
    img, video {
        display: block;
        box-sizing: border-box;
        height: 100%;
        margin: 0 auto;
    }

</style>

<div class="{activeClass}" on:click={toggle}>
    {#if fileType == "jpg" || fileType == "png" || fileType == "gif"}
        <img src={file} alt="Meme {entry}">
    {:else if fileType == "mp4"}
        <video src={file} autoplay muted loop />
    {/if}
</div>