module.exports = (variable, message,err) => {
    if(variable == "" || typeof variable == undefined || variable == null){
        err.push({text: message});
    }
    return err;
}