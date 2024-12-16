
const responseHandler = (res, status_code, status, message, data) => {
    res.status(status_code).json({
        status_code,
        status,
        message,
        data,
    })
}

function getRandomUsername() {
    const adjectives = ['Fast', 'Cool', 'Happy', 'Smart', 'Brave', 'Lucky'];
    const nouns = ['Tiger', 'Eagle', 'Wolf', 'Shark', 'Dragon', 'Falcon'];
    const randomNumber = Math.floor(100 + Math.random() * 900);

    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

    return `${randomAdjective}${randomNoun}${randomNumber}`;
}

module.exports = {
    responseHandler,
    getRandomUsername,
};

