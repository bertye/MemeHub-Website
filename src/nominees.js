import { writable } from 'svelte/store';
import { loading } from './loading.js';

export const nominees = writable({});

fetch("/nominees.json")
    .then(response =>  response.json())
    .then(json => {
        nominees.set(json);
        loading.update(n => n - 1);
    });

loading.update(n => n + 1);