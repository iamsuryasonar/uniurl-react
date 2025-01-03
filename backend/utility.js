
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

function validateUrlWithFix(url) {
    url = url.trim();

    if (url.substr(0, 3) === "www") {
        return url = "https://" + url;
    } else if (url.substr(0, 8) === "https://" || url.substr(0, 7) === "http://" || url.substr(0, 7) === "mailto:" || url.substr(0, 4) === "tel:") {
        return url;
    } else {
        return;
    }
}

module.exports = {
    responseHandler,
    getRandomUsername,
    validateUrlWithFix,
};

