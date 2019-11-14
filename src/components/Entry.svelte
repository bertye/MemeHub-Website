<script>
    import { createEventDispatcher } from 'svelte';

    export let id;
    export let file;
    export let user;
    export let selected;

    $: fileType = file.split('.')[1];


    const dispatch = createEventDispatcher();
    
    $: activeClass = selected ? "active" : "";

    function toggle() {
        dispatch('select', { selected: !selected, id });
    }
</script>

<style>
    div {
        display: inline-block;
        box-sizing: border-box;
        
        border: .5em solid var(--color-secondary);
        background-color: var(--color-secondary);
        color: var(--color-primary);
        margin: 0 1em;
        padding: 0;
        height: 100%;
    }

    div.active {
        background-color: var(--color-primary);
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
        height: 85%;
        margin: 0 auto;
    }
    p {
        display: block;
        margin: 0;
        padding: 1em 2.3em;
        text-transform: uppercase;
        text-align: center;
        font-size: 1.2em;
    }
</style>

<div class="{activeClass}" on:click={toggle}>
    {#if fileType == "jpg"}
        <img src={file} alt="Meme by @{user}">
    {:else if fileType == "mp4"}
        <video src={file} autoplay muted loop />
    {/if}
    <p>@{user}</p>
</div>