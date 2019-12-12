import { writable } from 'svelte/store';
import { loading } from './loading.js';

export const media = writable({});

fetch("/media.json")
    .then(response =>  response.json())
    .then(json => {
        media.set(json);
        loading.update(n => n - 1);
    });

loading.update(n => n + 1);