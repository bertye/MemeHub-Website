<script>
    import slide from 'svelte-transitions-slide';
    import Entry from "./Entry.svelte";

    export let name;
    export let entries;
    export let expanded = false;
    
    let current = 0;
    $:buttonClass = expanded ? "active" : "";
    
    function toggle() {
        expanded = !expanded;
    }

    function handleSelect(event) {
        if (event.detail.selected) {
            // deselect others
            entries.forEach(e => {
                e.selected = e.id == event.detail.id;
            });
            entries = [...entries];

            // TODO update db
            console.log("new selected meme: " + event.detail.id)
        }
        else {
            // TODO update db
            console.log("deselected meme.");
        }
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
        white-space: nowrap;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
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
    }

    
</style>

<button class={buttonClass} on:click={toggle}>#{name}</button>
<div id="gallery" class={buttonClass} transition:slide>
    {#each entries as entry}
        <Entry {...entry} on:select={handleSelect}/>
    {/each}
</div>
