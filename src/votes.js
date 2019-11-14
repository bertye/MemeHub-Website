import { writable } from 'svelte/store';
import { loading } from './loading.js';

let votes_value = {};
export const votes = writable(votes_value);

fetch("votes.json")
    .then(response => response.json())
    .then(json => {
        votes.set(json);
        loading.update(n => n - 1);
    })
    .then(() => {
        votes.subscribe(sendVotes);
    });

function sendVotes(votes) {
    // TODO implement
    loading.update(n => n + 1);
    console.log("sending votes:");
    console.log(votes);
    const req = new Promise(resolve => setTimeout(resolve, 500));
    req.then(() => {
        loading.update(n => n - 1);
    });
    return req;
}

loading.update(n => n + 1);