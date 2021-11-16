let activeToken = [];

const VerifyUserAuth = (authToken) => {
    let tokenExists = false;
    for(let x = 0; x < activeToken.length; x++){
        if(authToken === activeToken[x]){
            tokenExists = true;
            // Early return if true
            return tokenExists;
        }
    }

    // Returns false if the early return didnt happen
    return tokenExists;
}

const AddAuthTokenToList = (authToken) => {
    activeToken.push(authToken);
}

module.exports = {
    VerifyUserAuth,
    AddAuthTokenToList
};