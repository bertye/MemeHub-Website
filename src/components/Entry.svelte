<script>
    import { createEventDispatcher } from 'svelte';

    export let id;
    export let image;
    export let user;
    export let selected;

    
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
    
    img {
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
    <img src={image} alt="Meme by @{user}">
    <p>@{user}</p>
</div>