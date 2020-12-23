import { writable } from 'svelte/store';
import { loading } from './loading.js';
import { token } from './token.js'

export const nominees = writable({});


fetch(`__env.API_URL/nominees?token=${token}`)
    .then(response => response.json())
    .then(json => {
        nominees.set(json);
        loading.update(n => n - 1);
        console.log(json);
    });

loading.update(n => n + 1);