let blockList = [];

const AddToBlock = (username) => {
    blockList.push(username);
}

const IsUserBlocked = (username) => {
    let blockedStatus = false;
    let blockAmount = 0;

    blockList.map((x) => {
        if(x != username) return;

        blockAmount++;
    });

    if(blockAmount < 3){
        // Not blocked  
    } else{
        // Blocked ( This is what gets sent to the catch exception where this method is called )
        blockedStatus = true;
    }
    return new Promise((resolve, reject) => {
        resolve(blockedStatus);
    });
}

const RemoveUserBlock = (username) => {
    blockList.map((x) => {
        if(x != username) return;

        blockList.splice(x, 1);
    });
}

module.exports = {
    AddToBlock,
    IsUserBlocked,
    RemoveUserBlock
};