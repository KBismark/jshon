/**
 * JSHON devlopment server. Beta Version.
 */

const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");
const compiler = require("./compiler");
//Prefix app.css classnames with `jsh-`
compiler.prefix("jsh");
compiler.ssr(true);
const { Switch } = require("./lib/helpers");
const jServe = require("./lib/jserve");
const {watcher,initBuild,watcherSettings,getWatcherUpdates, watchFile} = require("./lib/watcher");
var basedir = __dirname.split("jshon-compiler");
basedir.pop();
basedir = basedir.join("");
const srcDir = path.join(basedir,"src");
watcherSettings({srcDir:srcDir})
jServe.srcDir(srcDir);
jServe.is_dev();


initBuild(path.join(srcDir,"/scripts"))
watcher(path.join(srcDir,"/scripts"),9,true);

const server = http.createServer(function(req,res){
    
    const parsedUrl = url.parse(req.url);
    var {pathname} = parsedUrl;
    //Remove ending slash if any
    if(pathname.length>1&&pathname.endsWith("/")){
        pathname = pathname.slice(0,pathname.length-1);
    }
    
    Switch(pathname,[
        {
            //Serve Modules
            test:pathname=>pathname.startsWith("/module/"),
            perform:function(pathname){
                var content; 
                try {
                    var filename = path.join(srcDir,pathname);
                    content = fs.readFileSync(filename,"utf8");
                    if(content.length&&!/[^\s]/.test(content)){
                        res.writeHead(404,{}).end();
                    }else{
                        res.writeHead(200,{"Content-Type":"text/javascript"});

                        res.write(content);
                        res.end();
                    }
                   
                } catch (error) {
                    res.writeHead(404,{}).end();
                }
            }
        },
        {
            //Serve Static resources
            test:pathname=>pathname.startsWith("/statics/"),
            perform:function(pathname){
                var splited_url = pathname.split("/"),fileContent = null;
                
                try {
                    fileContent = fs.readFileSync(path.join(srcDir,pathname));
                } catch (error) {
                    fileContent=null;
                }
                if(fileContent!==null){
                    switch (pathname.split("/")[2]) {
                        case "css":
                            res.writeHead(200,{
                                "Content-Type":"text/css"
                            }).write(fileContent);
                            break;
                        case "js":
                            res.writeHead(200,{
                                "Content-Type":"text/javascript"
                            }).write(fileContent);
                            break;
                        case "img":
                            var imageType = splited_url[3].split(".").pop().toLowerCase();
                            if(imageType!=="svg"){
                                res.writeHead(200,{
                                    "Content-Type":`image/${imageType}`
                                }).write(fileContent);
                            }else{
                                res.writeHead(200,{
                                    "Content-Type":`image/svg+xml`
                                }).write(fileContent);
                            }
                            break;
                        case "fonts":
                            var fontType = splited_url[3].split(".").pop().toLowerCase();
                            switch (fontType) {
                                case "woff":
                                case "woff2":
                                    fontType="woff";
                                case "ttf":
                                    res.writeHead(200,{
                                        "Content-Type":"application/x-font-"+fontType
                                    }).write(fileContent);
                                    break;
                                case "svg":
                                    res.writeHead(200,{
                                        "Content-Type":"image/svg+xml"
                                    }).write(fileContent);
                                    break;
                                case "eot":
                                    res.writeHead(200,{
                                        "Content-Type":"application/vnd.ms-fontobject"
                                    }).write(fileContent);
                                    break;

                                //Add your own font extention cases here

                                default:
                                    res.writeHead(404,{});
                                    break;
                            }
                            break;

                        //Add your own path cases here

                        default:
                            res.writeHead(404,{});
                    }
                    res.end();
                }else{
                    res.writeHead(404,{});
                    res.end();
                }
            }
        },
        {
            //Check for Module changes
            test:pathname=>pathname==="/$check-for-updates",
            perform:function(pathname){
                res.writeHead(200,{"Content-Type":"application/json"});
                res.write(JSON.stringify(getWatcherUpdates()));
                res.end();
            }
        },
        {
            //If none match, check entries.
            test:pathname=>true,
            perform:function(pathname){
                
                //Read entries
                var entries = fs.readFileSync(path.join(basedir,"entry.js"),"utf8");
                entries = new Function("return ("+entries+")")();
                var entrySrc = "",found=false;
                for(var i=0; i<entries.length;i++){
                    if(typeof(entries[i].pathname)=="string"){
                        if(entries[i].pathname==pathname){
                            entrySrc = entries[i].src;
                            found = true;
                            break;
                        }
                    }else{
                        if(entries[i].pathname.test(pathname)){
                            entrySrc = entries[i].src;
                            found = true;
                            break;
                        }
                    }
                }
                if(found){
                    //Read package.json for ssr value
                    var useSSR = fs.readFileSync(path.join(basedir,"package.json"),"utf8");
                    useSSR = new Function("return "+useSSR)().ssr;
                    //Serve Html with JServe
                    jServe.render({
                        ssr:useSSR,
                        htmlEntryPath:path.join(srcDir,"/index.dev.html"),
                        jsEntryPath:entrySrc,
                        pageData:{},
                        insertable:{
                            title:"JSHON App with JServe",
                            meta:{}
                        },
                        callback:function(err,htmlString){
                            res.writeHead(200,{"Content-Type":"text/html"})
                            if(!err){
                                
                                res.write(htmlString);
                                res.end();
                                return;
                            }
                            res.end("<H1>AN ERROR OCCURRED</H1>");
                        }
                    })

                }else{
                    return true;
                }
            }
        }
    ],
    //Nothing was matched
    function Default(){
        //Not found
        res.writeHead(404,{}).end();
    })



});




server.listen(3003,function(){
    console.log("JSHON Running...");
});