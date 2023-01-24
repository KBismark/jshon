const fs = require("fs");
const path = require("path");
const compiler = require("../compiler");
var staticDir = "",srcDir = "";
const transformCode = function(a){return a};

var watchersFD = {};
function watcher(dir,onchange,watch,isFile){
    if(!watch){
        try {
            watchersFD[dir].close();
        } catch (error) {
            
        }
        if(isFile){
            return
        }
    }
    var contents,pathname,mainPath,err=false;
    try {
        contents = fs.readdirSync(dir,"utf8");
    } catch (error) {
        err = true;
    }
    if(!err){
        if(watch){
            for(var i = 0;i<contents.length;i++){
                pathname = contents[i].split(".").pop();
                var is_dir = !(["js","jsx","cjs","mjs"].includes(pathname));
                if(is_dir){
                    watcher(path.join(dir,"/"+contents[i]),9,true);
                }else{
                    watchFile(path.join(dir,"/"+contents[i]));
                }
            }

            let emitted = false;
            watchersFD[dir] = fs.watch(dir,function(event,filename){
                    if(!emitted){
                        emitted = true;
                        var is_dir = !(["js","jsx","cjs","mjs"].includes(filename.split(".").pop()));
                        try {
                            if(is_dir){
                                fs.readdirSync(path.join(dir,filename));
                            }
                        } catch (error) {
                            if(error.code=='ENOENT'&&error.path.startsWith(path.join(srcDir,"/scripts/"))){
                                var f = error.path.replace(path.join(srcDir,"/scripts"),"");
                                remove(path.join(srcDir,"/module",f));
                                remove(path.join(srcDir,"/ssr/module",f));
                                remove(path.join(srcDir,"/ssr/inline_modules",f));
                            }
                        }
                        watcher(dir,9,false,false);
                        setTimeout(() => {
                            watcher(dir,9,true);
                            emitted = false;
                        }, 100);
                    }
                
            }).on("error",function(error){
                if(error.code=='EPERM'&&error.syscall=='watch'&&error.filename===null){

                }
            });

        }else{
            for(var i = 0;i<contents.length;i++){
                pathname = contents[i].split(".").pop();
                var is_dir = !(["js","jsx","cjs","mjs"].includes(pathname));
                mainPath = path.join(dir,"/"+contents[i]);
                if(is_dir){
                    if(watchersFD[mainPath]){
                        watcher(mainPath,9,false);
                    }
                }else{
                    if(watchersFD[mainPath]){
                        watcher(mainPath,9,false,true);
                    }
                }
            }
        }
    }else{
        
    }
}

function watchFile(filename,wait){
    let emmited = false;
    if(watchersFD[filename]){
        try {
            watchersFD[filename].close()
        } catch (error) {
            
        }
    }
    watchersFD[filename] = fs.watch(filename,function(event,f_name){
        if(!emmited){
            emmited = true;
            watcher(filename,9,false,true);
            setTimeout(() => {
                
                
                buildScripts(filename);
                if(!ups_cleared){
                    updates = {};
                    ups_cleared = true;
                }
                updates[(filename.replace(path.join(srcDir,"/scripts/"),"/module/")).replace(/\\/g,"/").replace(/\/\//g,"/")]
                = true;
                watchFile(filename);
                emmited = false;

            }, 100);
        }
    });
}

function buildScripts(filename){
    try {
        var fileContent = fs.readFileSync(filename,"utf8");
        fileContent = compiler.translate(fileContent.replace(/\/\/<(.*?)\/\/>/gs,""));
        fs.writeFileSync(path.join(staticDir,"/css/app.css"),appCSSMessage+compiler.getStyleSheet());
        var file = filename.replace(path.join(srcDir,"/scripts"),"");
        var slash = path.join("/");
        var paths = (path.join("/module",file)).split(slash);
        paths.pop();
        if(paths.length>0){
            try {
                fs.mkdirSync(srcDir+(paths=(paths.join(slash))),{recursive:true});
            } catch (error) {
                
            }
            try {
                fs.mkdirSync(path.join(srcDir,"/ssr",paths),{recursive:true});
            } catch (error) {
                
            }
            try {
                paths = (path.join("/inline_modules",file)).split(slash);
                paths.pop();
                paths=paths.join(slash);
                fs.mkdirSync(path.join(srcDir,"/ssr",paths),{recursive:true});
            } catch (error) {
                
            }
        }
        fs.writeFileSync(path.join(srcDir,"/module",file),fileContent.code);
        fs.writeFileSync(path.join(srcDir,"/ssr/module",file),`module.exports = function(JSHON){\n${fileContent.ssrCode}\n}`);
        fs.writeFileSync(path.join(srcDir,"/ssr/inline_modules",file),`module.exports = function(){\n${transformCode(fileContent.code)}\n}`);
    } catch (error) {
        if(error.code=='ENOENT'&&error.path.startsWith(path.join(srcDir,"/scripts"))){
            var f = error.path.replace(path.join(srcDir,"/scripts"),"");
            remove(path.join(srcDir,"/module",f));
            remove(path.join(srcDir,"/ssr/module",f));
            remove(path.join(srcDir,"/ssr/inline_modules",f));
        }
    }
        
}


var started = false;
function watchIndexHTML(){
    if(!started){
        started = true;
        fs.writeFileSync(
            path.join(srcDir,"/index.dev.html.ssr.js"),
            compiler.parseSSRHtml(fs.readFileSync(path.join(srcDir,"/index.dev.html"),"utf8"))
        );
        fs.writeFileSync(
            path.join(srcDir,"/index.html.ssr.js"),
            compiler.parseSSRHtml(fs.readFileSync(path.join(srcDir,"/index.html"),"utf8"))
        );
    }
    let emitted = false;
    let fsd = fs.watch(path.join(srcDir,"/index.dev.html"),function(event){
        if(event=="change"&&!emitted){
            emitted=true;
            fsd.close();
            setTimeout(() => {
                fs.writeFileSync(
                    path.join(srcDir,"/index.dev.html.ssr.js"),
                    compiler.parseSSRHtml(fs.readFileSync(path.join(srcDir,"/index.dev.html"),"utf8"))
                );
                fs.writeFileSync(
                    path.join(srcDir,"/index.html.ssr.js"),
                    compiler.parseSSRHtml(fs.readFileSync(path.join(srcDir,"/index.html"),"utf8"))
                );
                watchIndexHTML();
            }, 100);
            
        }
    })
};

function initBuild(dir){
    var contents = fs.readdirSync(dir,"utf8"),pathname,mainPath;
    for(var i = 0;i<contents.length;i++){
        pathname = contents[i].split(".").pop();
        var is_file = (["js","jsx","cjs","mjs"].includes(pathname));
        if(is_file){
            buildScripts(path.join(dir,"/"+contents[i]));
        }else{
            initBuild(path.join(dir,"/"+contents[i]));
        }
    }

    if(!started){
        watchIndexHTML();
    }
}

function remove(pathname){
    try {
        fs.rmSync(pathname,{force:true,recursive:true});
    } catch (error) {
        
    }
};

function watcherSettings(options){
    if(!started){
        srcDir = options.srcDir;
        staticDir = path.join(srcDir,"/statics");
    }
}
var ups = 0;
var updates = {};
var ups_cleared = true;
function getWatcherUpdates(){
    ups_cleared = false;
    var keys = Object.keys(updates);
    var up = [];
    setTimeout(() => {
        if(!ups_cleared){
            updates = {};
            ups_cleared = true;
        }
    }, 600);
    return keys;
}


var appCSSMessage = 
'/*\n'+
'Please do not add your style rules in this file.\n'+
'They will be over-written with the inline styles\n'+
'in your app. The compiler removes all inline styles\n'+
'automatically and replace them with css class names.\n'+
'The style rules for each class name is placed here in \n'+
'this file. See https://github.com/KBismark/remove-style\n'+
'repo for how this feature works.\n'+
'*/\n';

module.exports = {
    initBuild, watcher, watcherSettings, getWatcherUpdates, watchFile
}