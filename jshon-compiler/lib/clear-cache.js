
var marker = {
    on:false,
    markStart:0
};
function mark(){
    if(marker.on){return}
    marker.on = true;
    var required_modules = Object.keys(require.cache);
    if(required_modules.length){
        marker.markStart = required_modules.length;
    }
}
function unmark(){
    marker.on = false;
    marker.markStart = 0;
}
function clear(){
    var required_modules = Object.keys(require.cache);
    if(required_modules.length<2){
        unmark();
        return;
    }
    marker.markStart = marker.markStart?marker.markStart:1;
    var j,index;
    for(var i=marker.markStart;i<required_modules.length;i++){
        for(j=0;j<marker.markStart;j++){
            index = require.cache[required_modules[j]].children.indexOf(require.cache[required_modules[i]]);
            if(index>=0){
                require.cache[required_modules[j]].children.splice(index,1);
            }
        }
        require.cache[required_modules[i]] = null;
        delete require.cache[required_modules[i]];
    }
    unmark();
}


module.exports = { mark, clear, unmark }