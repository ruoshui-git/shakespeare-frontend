import { writable } from 'svelte/store';

export default class ModelHistory {
    static total: number = 0;

    readonly id: number;
    prompt: string;
    response: string;

    constructor(prompt: string, response: string) {
        this.id = (ModelHistory.total)++;
        this.prompt = prompt;
        this.response = response;
    }
}

function createHistory() {
    const { subscribe, set, update } = writable<ModelHistory[]>([]);

    return {
        subscribe,
        add: (entry: ModelHistory) => update(history => [entry, ...history]),
        reset: () => { set([]); ModelHistory.total = 0; },
    }
}

export const modelHistory = createHistory();