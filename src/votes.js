import { writable } from 'svelte/store';
import { loading } from './loading.js';
import { token } from './token.js';

let votes_value = {};
export const votes = writable(votes_value);

fetch('http://localhost:3040/votes?token=' + token)
    .then(response => {
        if (!response.ok) {
            console.log("ERROR couod not get votes.");
            console.log(response.statusText);
            return {};
        }
        return response.json()
    })
    .then(votes.set)
    .then(() => {
        votes.subscribe(sendVotes);
    })
    .finally(() => { loading.update(n => n - 1); });

function sendVotes(votes) {
    loading.update(n => n + 1);

    fetch('http://localhost:3040/votes?token=' + token,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(votes)
        })
        .then(response => { 
            if (!response.ok) {
                console.log("ERROR could not push votes.");
                console.log(response.statusText);
            }
        })
        .finally(() => { loading.update(n => n - 1); });
}

loading.update(n => n + 1);