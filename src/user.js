import { writable } from 'svelte/store';
import { loading } from './loading.js';
import { token } from './token.js';

export const user = writable({ loading: true, name: "" });

fetch('http://localhost:3040/user?token=' + token)
    .then(response => {
        if (!response.ok) {
            console.log("ERROR couod not get user.");
            console.log(response.statusText);
            return { 
                user: "Invalid",
                error: true
            };
        }
        return response.json();
    })
    .then(user.set)
    .finally(() => { loading.update(n => n - 1); });

loading.update(n => n + 1);