const play_array = [
    "A Midsummer Night's Dream",
    "All's Well That Ends Well",
    "Antony and Cleopatra",
    "As You Like It",
    "Coriolanus",
    "Cymbeline",
    "Hamlet",
    "Henry IV, Part I",
    "Henry IV, Part 2",
    "Henry V",
    "Henry VI, Part 1",
    "Henry VI, Part 2",
    "Henry VI, Part 3",
    "Henry VIII",
    "Julius Caesar",
    "King John",
    "King Lear",
    "Love's Labor's Lost",
    "Macbeth",
    "Measure for Measure",
    "Much Ado About Nothing",
    "Othello",
    "Pericles, Prince of Tyre",
    "Richard II",
    "Richard III",
    "Romeo and Juliet",
    "The Comedy of Errors",
    "The Merchant of Venice",
    "The Merry Wives of Windsor",
    "The Taming of the Shrew",
    "The Tempest",
    "The Two Gentlemen of Verona",
    "The Two Noble Kinsmen",
    "The Winter's Tale",
    "Timon of Athens",
    "Titus Andronicus",
    "Troilus and Cressida",
    "Twelfth Night"
];

interface Play {
    id: number,
    name: string,
}

const plays = play_array.map((name, id) => ({ name, id }))

export default plays;
