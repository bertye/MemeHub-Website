<script>
    import { nominees } from '../nominees.js';
    import { votes } from '../votes.js';
    import { loading } from '../loading.js';
    import { fade } from 'svelte/transition';

    $: isLoading = $loading > 0;
    $: categoryCount = Object.keys($nominees).length;
    $: voteCount = Object.keys($votes).length;
    $: missing = categoryCount - voteCount;

</script>

<style>
    #container {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;

        background-color: var(--color-primary-variant);
        border-top: .5em solid var(--color-secondary);
        
    }
    p {
        color: var(--color-secondary);
        font-size: 1.7em;
        text-align: center;
        margin: 0;
        padding: .37em 1.2em .3em;
    }
    #spinner {
        display: block;
        position: absolute;
        bottom: 0;
        right: 0;
        height: 2em;
        width: 2em;
        margin: .7em 1em;        
        border: .2em rgba(0, 0, 0, 0) solid;
        border-top: .2em solid var(--color-secondary);
        border-radius: 50%;
        -webkit-animation: spin2 1s infinite linear;
                animation: spin2 1s infinite linear;
    }

    @-webkit-keyframes spin2 {
        from {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(359deg);
                    transform: rotate(359deg);
        }
    }

    @keyframes spin2 {
        from {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(359deg);
                    transform: rotate(359deg);
            -webkit-transform: rotate(359deg);
                    transform: rotate(359deg);
        }
    }
</style>

<div id="container">
    {#if missing > 1}
        <p>
            {missing} votes to cast!
        </p>
    {:else if missing == 1}
        <p>
            1 vote to cast!
        </p>
    {:else}
        <p>
            You are all done!
        </p>
    {/if}
    {#if isLoading}
        <div id="spinner"></div>
    {/if}
</div>
