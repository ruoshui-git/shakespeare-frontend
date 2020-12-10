import type { RouteDetailLoaded, RouterEvent } from "svelte-spa-router";

const gtagID = "G-0X9KG5VGXK";
export const notifyPagePageview = (event: RouterEvent<RouteDetailLoaded>) => {
    gtag("config", gtagID, {
        page_path: event.detail.location,
    });
};

export const notifyGenerate = (advanced: boolean) => {
    gtag("event", "generate", {
        event_label: advanced ? "advanced" : "regular",
    });
};

const scriptId = "ga-gtag";
// From https://github.com/idmadj/ga-gtag/blob/master/src/index.js
export const installGtag = () => {
    if (document.getElementById(scriptId)) return;

    const { head } = document;
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "text/javascript";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagID}`;
    head.insertBefore(script, head.firstChild);

    window.dataLayer = window.dataLayer || [];

    gtag("js", new Date());
    gtag("config", gtagID);
};

// Merge dataLayer property to window
declare global {
    interface Window {
        dataLayer: IArguments[];
    }
}

function gtag(
    command: "config",
    targetId: string,
    config?: ControlParams | EventParams | CustomParams
): void;
function gtag(command: "set", config: CustomParams): void;
function gtag(command: "js", config: Date): void;
function gtag(
    command: "event",
    eventName: EventNames | string,
    eventParams?: ControlParams | EventParams | CustomParams
): void;
function gtag(): any {
    // Can't use arrow func + destructuring as Google expects
    // arguments objects in dataLayer (not an array of arguments).
    window.dataLayer.push(arguments);
}

// from // Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface CustomParams {
    [key: string]: any;
}

interface ControlParams {
    groups?: string | string[];
    send_to?: string | string[];
    event_callback?: () => void;
    event_timeout?: number;
}

type EventNames =
    | "add_payment_info"
    | "add_to_cart"
    | "add_to_wishlist"
    | "begin_checkout"
    | "checkout_progress"
    | "exception"
    | "generate_lead"
    | "login"
    | "page_view"
    | "purchase"
    | "refund"
    | "remove_from_cart"
    | "screen_view"
    | "search"
    | "select_content"
    | "set_checkout_option"
    | "share"
    | "sign_up"
    | "timing_complete"
    | "view_item"
    | "view_item_list"
    | "view_promotion"
    | "view_search_results";

interface EventParams {
    checkout_option?: string;
    checkout_step?: number;
    content_id?: string;
    content_type?: string;
    coupon?: string;
    currency?: string;
    description?: string;
    fatal?: boolean;
    items?: Item[];
    method?: string;
    number?: string;
    promotions?: Promotion[];
    screen_name?: string;
    search_term?: string;
    shipping?: Currency;
    tax?: Currency;
    transaction_id?: string;
    value?: number;
    event_label?: string;
    event_category?: string;
}

type Currency = string | number;

interface Item {
    brand?: string;
    category?: string;
    creative_name?: string;
    creative_slot?: string;
    id?: string;
    location_id?: string;
    name?: string;
    price?: Currency;
    quantity?: number;
}

interface Promotion {
    creative_name?: string;
    creative_slot?: string;
    id?: string;
    name?: string;
}
