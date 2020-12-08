const advanced = [
    "6|Hamlet\n6|by William Shakespeare",
    "6|HAMLET:\n6|What, shall I stay behind the arras?",
    "6|QUEEN:\n6|Nay, answer me. Stand and unfold yourself.",
    "6|HAMLET:\n6|To be or not to be--that is the question:",
    "6|HAMLET:\n6|To be or not to be--that is the question:\n6|Whether 'tis nobler in the mind to suffer\n6|The slings and arrows of outrageous fortune,\n6|Or to take arms against a sea of troubles\n6|And, by opposing, end them. To die, to sleep--\n6|No more--and by a sleep to say we end\n6|The heartache and the thousand natural shocks\n6|That flesh is heir to--'tis a consummation\n6|Devoutly to be wished.",
    "6|CLAUDIUS:\n6|Get thee to a nunnery. Why wouldst thou be\n6|a breeder of sinners? I am myself",
    `6|OPHELIA:
6|O, what a noble mind is here o'erthrown!
6|The courtier's, soldier's, scholar's, eye, tongue,
6|sword,
6|Th' expectancy and rose of the fair state,
6|The glass of fashion and the mold of form,
6|Th' observed of all observers, quite, quite down!
6|And I, of ladies most deject and wretched,
6|That sucked the honey of his musicked vows,
6|Now see that noble and most sovereign reason,
6|Like sweet bells jangled, out of time and harsh;
6|That unmatched form and stature of blown youth
6|Blasted with ecstasy. O, woe is me
6|T' have seen what I have seen, see what I see!
6|
6|HAMLET:
`,
    `6|POLONIUS:
6| [aside]  Though this be madness, yet there is
6|method in 't.--Will you walk out of the air, my lord?
6|
6|HAMLET:`,
    "6|O, my offense is rank, it smells to heaven;\n6|",
    `0|ROBIN:
    0|	If we shadows have offended,
    0|	Think but this and all is mended:
    0|	That you have but slumbered here
    0|	While these visions`,
    `1|LAFEW:
1|Farewell, pretty lady. You must hold the credit
1|of your father. 	[Bertram and Lafew exit.]
1|
1|HELEN:
1|O, were that all! I think not on my father,`,
    `2|IRAS:
2|The gods forbid!
2|
2|CLEOPATRA:`,
    `3|Forever and a day.\n3|\n3|ROSALIND:`,
    `O wonder!
30|How many goodly creatures are there here!
30|How beauteous mankind is! O, brave new world`,
    `29|KATHERINE:\n29|Forward, I pray, since we have come so far,\n29|And be it moon, or star,`,
    `6|OPHELIA:\n6|How stands your disposition to be married?\n6|\n6|HAMLET:\n`,
    `25|How stands your disposition to be married?\n\n6|HAMLET:\n,`,
];

const regular: [string, number][] = [
    ["O, my offense is rank, it smells to heaven;", 6],
    [
        "Now cracks a noble heart. Good night, sweet prince,\nAnd flights of angels sing thee to thy rest.",
        6,
    ],
    [
        "What a piece of work is a man, how noble in\nreason, how infinite in faculties,",
        6,
    ],
    [
        `   Doubt thou the stars are fire,
       Doubt that the sun doth move,
    Doubt truth to be a liar,
       But never doubt I love.
O dear Ophelia, `,
        6,
    ],
    ["O, what a rogue and peasant slave", 6],
    ["Now I am alone.", 6],
    ["Brevity is the soul of", 6],
    ["Gold? Yellow, glittering, precious", 34],
    [
        `ROBIN:
    If we shadows have offended,
    Think but this and all is mended:
    That you have but slumbered here
    While these visions`,
        0,
    ],
    [
        `LAFEW:
Farewell, pretty lady. You must hold the credit
of your father. 	[Bertram and Lafew exit.]

HELEN:
O, were that all! I think not on my father,`,
        1,
    ],
    [`IRAS:\nThe gods forbid!\n\nCLEOPATRA:\n`, 2],
    [`Forever and a day.\n\nROSALIND:`, 3],
    [
        `O wonder!
How many goodly creatures are there here!
How beauteous mankind is! O, brave new world`,
        30,
    ],
    [
        `KATHERINE:\nForward, I pray, since we have come so far,\nAnd be it moon, or sun,`,
        29,
    ],
    [`OPHELIA:\nHow stands your disposition to be married?\n\nHAMLET:\n`, 6],
    [`POLONIUS:\nTo be or not to be--that is the question:\n`, 6],
];

function randChoice<T>(a: Array<T>): T {
    return a[Math.floor(Math.random() * a.length)];
}

export function getReg(): [string, number] {
    return randChoice(regular);
}

export function getAdv(): string {
    return randChoice(advanced);
}
