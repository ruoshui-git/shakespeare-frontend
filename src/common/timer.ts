import { readable, writable } from "svelte/store";

const createTimer = () => {
    let original = new Date();

    const getElapsedSec = () => {
        return Math.round((new Date().getTime() - original.getTime()) / 1000);
    };

    const { subscribe, set } = writable(getElapsedSec());

    let interval: null | number = null;

    const reset = () => {
        set(0);
        original = new Date();
    };

    return {
        subscribe,
        reset,
        start: () => {
            reset();
            interval && clearInterval(interval);
            interval = setInterval(() => {
                set(getElapsedSec());
            }, 1000);
        },
        stop: () => {
            interval && clearInterval(interval);
            interval = null;
        },
    };
};

const timer = createTimer();

export default timer;
