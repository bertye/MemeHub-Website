import { writable } from 'svelte/store';
import { loading } from './loading.js';
import { token } from './token.js';

let votes_value = {};
export const votes = writable(votes_value);

fetch('http://localhost:3040/votes?token=' + token)
    .then(
        response => response.json(),
        err => {
            console.log("ERROR couod not get votes.");
            console.log(err);
            return {};
        })
    .then(json => {
        votes.set(json);
        loading.update(n => n - 1);
    })
    .then(() => {
        votes.subscribe(sendVotes);
    });

function sendVotes(votes) {
    loading.update(n => n + 1);

    fetch('http://localhost:3040/votes?token=' + token,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(votes)
        })
        .then(
            () => {  },
            err => {
                console.log("ERROR could not push votes.");
                console.log(err);
            })
        .then(() => { loading.update(n => n - 1); });
}

loading.update(n => n + 1);