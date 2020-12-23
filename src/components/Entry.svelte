<script>
    import { votes } from "../votes.js";

    export let entry;
    export let category;

    $: selected = $votes[category] && $votes[category] == entry.id;
    $: activeClass = selected ? "active" : "";

    function toggle() {
        if (selected) {
            delete $votes[category];
            votes.update((v) => v); // delete not working properly
        } else {
            $votes[category] = entry.id;
        }
    }
</script>

<style>
    div {
        display: inline-block;
        box-sizing: border-box;
        text-indent: 0;
        margin: 0 1em;
        padding: 0.5em 0.2em;
        height: 100%;
        vertical-align: top;
    }

    div.active > img,
    div.active > .video-entry {
        border-color: var(--color-primary-variant);
        background-color: var(--color-primary-variant);
    }

    div:first-child {
        margin-left: 5em;
    }

    div:last-child {
        margin-right: 5em;
    }

    img,
    .video-entry {
        display: block;
        outline: 0.5em solid var(--color-secondary);
        border: 0.5em solid var(--color-secondary);
        background-color: var(--color-secondary);
        box-sizing: border-box;
        max-height: 100%;
        max-width: 90vw;
        margin: 0 auto;
    }

    video {
        display: inline-block;
        max-height: 18em;
        max-width: 85vw;
    }

    div.active .video-entry {
        color: var(--color-secondary);
    }

    .video-entry {
        display: inline-block;
        margin: 0;
        padding: 0;
        color: var(--color-primary);
        user-select: none;
        font-size: 1.3em;
    }

    span {
        margin: 0;
    }
</style>

<div class={activeClass} on:click={toggle}>
    {#if entry.ext == 'jpg' || entry.ext == 'png' || entry.ext == 'gif'}
        <img src={`__env.MEDIA_URL/${entry.id}`} alt="Meme {entry.id}" />
    {:else if entry.ext == 'mp4'}
        <!-- svelte-ignore a11y-no-onchange -->
        <span class="video-entry">
            <video
                src={`__env.MEDIA_URL/${entry.id}`}
                controls
                on:click={(e) => e.stopPropagation()} />
            <br />
            <span>VOTE</span>
        </span>
    {/if}
</div>
