import { writable } from "svelte/store";

export default class ModelHistory {
    static total: number = 0;

    readonly id: number;
    prompt: string;
    output: string;

    constructor(prompt: string, output: string) {
        this.id = ModelHistory.total++;
        this.prompt = prompt;
        this.output = output;
    }
}
const storageKey = "modelHistory";
function createHistory() {
    let initial: ModelHistory[] = [];
    const stored = localStorage.getItem(storageKey);
    if (stored) {
        initial = JSON.parse(stored);
        ModelHistory.total = initial[0].id + 1;

    }

    const { subscribe, set, update } = writable<ModelHistory[]>(initial);

    return {
        subscribe,
        add: (entry: ModelHistory) =>
            update((history) => {
                const newHistory = [entry, ...history];
                try {
                    localStorage.setItem(storageKey, JSON.stringify(newHistory));
                } catch (error) {

                }
                return newHistory;
            }),
        reset: () => {
            set([]);
            ModelHistory.total = 0;
            localStorage.removeItem(storageKey);
        },
    };
}

export const modelHistory = createHistory();
