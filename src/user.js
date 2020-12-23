import { writable } from 'svelte/store';
import { loading } from './loading.js';
import { token } from './token.js';

export const user = writable({ loading: true, name: "" });

fetch('__env.API_URL/user?token=' + token)
    .then(response => {
        if (!response.ok) {
            console.log("ERROR couod not get user.");
            console.log(response.statusText);
            return {
                name: "Invalid",
                invalidToken: true
            };
        }
        return response.json();
    }, err => {
        console.log("ERROR cannot reach webserver.");
        console.log(err);
        user.set({ name: "Unknown", noConnection: true });
    })
    .then(user.set)
    .finally(() => { loading.update(n => n - 1); });

loading.update(n => n + 1);