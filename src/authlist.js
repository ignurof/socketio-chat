let activeToken = [];

const VerifyUserAuth = (authToken) => {
    let tokenExists = false;
    for(let x = 0; x < activeToken.length; x++){
        if(authToken === activeToken[x].authToken){
            tokenExists = true;
            // Early return if true
            return tokenExists;
        }
    }

    // Returns false if the early return didnt happen
    return tokenExists;
}

const AddAuthTokenToList = (authToken, authID) => {    
    RemoveAuth(authID);

    let authObj = {
        authToken,
        authID
    };
    activeToken.push(authObj);
    console.log(activeToken);
}

const RemoveAuth = (authID) => {
    // We use the filter function to keep every element that is not equal to the element to be removed and assign the newly formed array to the original array.
    activeToken = activeToken.filter((item) => {
        return item.authID !== authID
    });
}

module.exports = {
    VerifyUserAuth,
    AddAuthTokenToList
};