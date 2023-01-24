const {mark, clear } = require("./clear-cache");
const clearCache = clear;
/**
*If a page is not rendered before then,
*we read the `.../page.ssr.html` file
*and create a function to return the contents
*on next page render.    
* `PAGES` will hold the page function.
*/
var PAGES = {};
var PAGES_BLOCKING_CONTENTS = {};
var INLINE_MODULES = {};
var symbolIdentifier = `$_${Math.random()}-`;
var symbol = `$_${Math.random()}-symbol`;
/**
 * A new `JSHON` object is created for every page to render.
 */
function newPage({callback,data,htmlEntryPath,renderId,jsEntryPath,inserts}){
    var pageRendered = false;
    var dependencyModulePaths = [];
    renderId[symbol] = function(){
        pageRendered = true;
        callback = null;
        var i;
        for(i in componentTypes){
            componentTypes[i]=componentTypes[i].fn=null;
        }
        clear(awaitingTasks);
        clear(data);
        clear(states);
        clear(inserts);
        if(jserve.dev){
            //console.log(Object.keys(require.cache).slice(-20));
            clearCache();
            //console.log(Object.keys(require.cache).slice(-20));
        }
        renderId[symbol] = true;
    };
    if(typeof (data)!="object"||null==data){
        data={};
    }
    if(typeof (inserts)!="object"||null==inserts){
        inserts={};
    }
    const JSH = {
        PAGEDATA:data,
        INSERTABLE:inserts,
        include:noop,
        /**
         * @param {{ (): void; }} cb
         */
        set onload(cb){
            if(!pageRendered){cb()}
        },
        /**
         * @param {{ (): void; }} cb
         */
         set onerror(cb){
            cb=null;
        },
        /**
         * @param {{ (): void; }} cb
         */
         set onerrorOnce(cb){
            cb=null;
        },
        /**
         * @param {{}} obj
         */
         set export(obj){
            if(!pageRendered){
                if(this.pathname.length>0){
                    this.exports[this.pathname] = obj;
                }else{
                    this.global = obj;
                }
                this.pathname = "";
            }
        },
        /**
         * @param {{}} obj
         */
         set global(obj){
           if(!pageRendered){
            this.import.global = {...this.import.global,...obj};
            this.pathname = "";
           }
        },
        exports:{},
        import:{
            from:function JSHONInternalImports(src,server_alternate_src){
                server_alternate_src=server_alternate_src||src;
                // if(typeof (server_alternate_src)=="string"){
                //     src=server_alternate_src;
                // }
                if(!JSH.exports[server_alternate_src]){
                    if(server_alternate_src.startsWith("/")){
                        var currentPathname = JSH.pathname;
                        require(server_alternate_src.replace("/","./ssr/"))(JSH);
                        dependencyModulePaths.push({
                            internal:server_alternate_src.replace("/module/","./ssr/inline_modules/"),
                            external:src,
                            pathname:server_alternate_src//.replace(".","")
                        });
                        JSH.pathname = currentPathname;
                    }
                }
                return JSH.exports[server_alternate_src]||(JSH.exports[server_alternate_src]={});
            },
            global:{}
        },
        loadModule:function loadModule(src,obj,server_alternate_src){
            if(!pageRendered){
                server_alternate_src=server_alternate_src||src;
                // if(typeof (server_alternate_src)=="string"){
                //     src=server_alternate_src;
                // }
                if(src.startsWith("/")){
                    if(!JSH.exports[server_alternate_src]){
                        var currentPathname = JSH.pathname;
                        JSH.pathname = symbolIdentifier+"inAppModuleLoads-"+server_alternate_src;
                        require(server_alternate_src.replace("/","./ssr/"))(JSH);
                        dependencyModulePaths.push({
                            internal:server_alternate_src.replace("/module/","./ssr/inline_modules/"),
                            external:src,
                            pathname:server_alternate_src//.replace(".","")
                        });
                        JSH.pathname = currentPathname;
                    }
                    obj.onload(obj.args);
                }
            }
        },
        reloadModule:noop,
        loadPage:noop,
        includesModule:function(server_alternate_src){
            return !!JSH.exports[server_alternate_src]
        },
        await:function wait(secret,cb){
            if(appCreation.ready||pageRendered){return}
            if(typeof (cb)=="function"){
                awaitingTasks.push(secret);
                cb(data,inserts);
            }
        },
        resume:function resume(secret){
            if(appCreation.ready||pageRendered){return}
            var index = awaitingTasks.indexOf(secret);
            if(index>=0){
                awaitingTasks.splice(index,1);
                if(awaitingTasks.length<=0){
                    appCreation.ready=true;
                    var ssrHtml = require(htmlEntryPath)({
                        id:"jshon-ssr-html",
                        is_ssr:"<script>window.__JSHONHydrate=true;</script>",
                        render:function(){
                            //var client_data = PAGES_BLOCKING_CONTENTS[htmlEntryPath](data,jsEntryPath); {pathname}
                            var inline_dependencies=`<script id="jshon-starter-script">!function(){var at=JSHON.PAGEDATA;JSHON.PAGEDATA=${stringifyValue(data)};`+
                            `var atk=Object.keys(at);for(var z=0;z<atk.length;z++){JSHON.PAGEDATA[atk[z]]=typeof(JSHON.PAGEDATA[atk[z]])=='undefined'?at[atk[z]]:JSHON.PAGEDATA[atk[z]]};`+
                            `${textSeparatorScript};Object.defineProperty(JSHON,'inline_modules',{value:function JSHONInlineModules(){return {`,i;
                            if(jserve.dev){
                                for(i=0;i<dependencyModulePaths.length;i++){
                                    jserve.buildSSRString({pathname:dependencyModulePaths[i].pathname});
                                    inline_dependencies+=`${JSON.stringify(dependencyModulePaths[i].external)}:${require(dependencyModulePaths[i].internal).toString()},`
                                };
                                jserve.buildSSRString({pathname:jsEntryPath.replace(".","")});
                            }else{
                                for(i=0;i<dependencyModulePaths.length;i++){
                                    inline_dependencies+=`${JSON.stringify(dependencyModulePaths[i].external)}:${require(dependencyModulePaths[i].internal).toString()},`
                                };
                            }
                            inline_dependencies+=`};},writable:false,configurable:false});!${require(jsEntryPath.replace("./module/","./ssr/inline_modules/")).toString()}()}();</script>`
                            return /*'<i class="jshon-d-node" j-type="element"></i>'+*/JSH.ui.render(renderingPage.ref,renderingPage.args)[symbolIdentifier].value+inline_dependencies;//getStarterScript(jsEntryPath)+
                            //`}()</script>${inline_dependencies}`;//window._$page_data$_=${stringifyValue(client_data)}
                        }
                    },escape,data,inserts);
                    //var mainHtml = PAGES[htmlEntryPath](undefined,true,data,`<script src="${jsEntryPath}"></script>`);
                    // var ssrHtml = PAGES[htmlEntryPath](function(){
                    //     var client_data = PAGES_BLOCKING_CONTENTS[htmlEntryPath](data,jsEntryPath);
                    //     return JSH.ui.render(renderingPage.ref,renderingPage.args)+getStarterScript(client_data.APP_SRC||jsEntryPath)+
                    //     `window._$page_data$_=${stringifyValue(client_data)}}()</script>`;
                    // },escape,data,inserts);
                    var cb = callback;
                    renderId[symbol]();
                    cb(null,ssrHtml);
                    //callback(null,PAGES[htmlEntryPath](function(){return JSH.ui.render(renderingPage.ref,renderingPage.args)},data));
                    
                }
            }
        },
        abort:function haltExecution(){
            if(renderId[symbol]){
                renderId[symbol]();
            }
        },
        aborted:function(){
            return typeof (renderId[symbol])=="boolean";
        },
        getDynamicAttributes:function(This,key,classNames){
            
            if(!This[symbolIdentifier].firstCall[key]){
                This[symbolIdentifier].firstCall[key]=true;
                if(This.elements){
                    if(This.elements[key]){
                        if(typeof (This.elements[key]["class"])=="string"){
                            This.elements[key]["class"] = (classNames+" "+This.elements[key]["class"]).split(" ");
                        }else{
                            This.elements[key]["class"] = classNames.split(" ");
                        }
                    }else{
                        This.elements[key]={
                            class:classNames.split(" ")
                        }
                    }
                }else{
                    This.elements={};
                    This.elements[key]={
                        class:classNames.split(" ")
                    }
                }
            }
            if(!appCreation.ready){return ""}
            if(This.elements&&This.elements[key]){
                var atributeString = "",atributes=Object.keys(This.elements[key]),i;
                var hasClassAttr = atributes.indexOf("class"),index;
                var dynamicClassnames = Object.keys(This[symbolIdentifier].dynamicClassnames);
                if((hasClassAttr>-1&&atributes.splice(hasClassAttr,1))||dynamicClassnames.length&&(This.elements[key]["class"]=[])){
                    dynamicClassnames.forEach(function(value){
                        index = This.elements[key]["class"].indexOf(value);
                        if(index>-1){
                            if(!This[symbolIdentifier].dynamicClassname[value]){
                                This.elements[key]["class"].splice(index,1);
                            }
                        }else{
                            if(This[symbolIdentifier].dynamicClassname[value]){
                                This.elements[key]["class"].push(value);
                            }
                        }
                    })
                    // if(typeof (This.elements[key]["class"])=="string"){
                    //     This.elements[key]["class"]=This.elements[key]["class"].split(" ");
                    // }
                    atributeString+=` class="${escape(This.elements[key]["class"].join(" "))}"`
                }
                var valueTypes = ["string","number","boolean"];
                for(i=0;i<atributes.length;i++){
                    if(valueTypes.indexOf(typeof (This.elements[key][atributes[i]]))>=0){
                        atributeString+=` ${escape(atributes[i])}="${escape(This.elements[key][atributes[i]])}"`
                    }
                }
                if(atributes.indexOf("style")>=0){
                    var dynamicInlineStyles = Object.keys(This.elements[key]["style"]);
                    if(dynamicInlineStyles.length>0){
                        atributeString+=' style="';
                        for(i=0;i<dynamicInlineStyles.length;i++){
                            atributeString+=
                            `${dynamicInlineStyles[i].replace(/[A-Z]/g,"-$&").toLowerCase()}:${This.elements[key]["style"][dynamicInlineStyles[i]]};`
                        }
                        atributeString+='"';
                    }
                    
                    
                }
                return atributeString;
            }else{
                return "";
            }
        },
        getRightValue:function(value,ignoreArray){
            if(!appCreation.ready){return ""}
            if(typeof (value)=="object"){
                if(null==value){
                    if(ignoreArray){
                        return `<noscript class="jshon-d-text"></noscript>`;
                    }
                    return `<i class="jshon-d-node" j-type="text"></i><noscript class="jshon-d-text"></noscript>`;
                }else if(Array.isArray(value)){
                    if(!ignoreArray){
                        //if(!value.length){return this.getRightValue("",ignoreArray)};
                        return `<i class="jshon-d-node" j-type="list" j-len="${value.length}"></i>${value.map(v=>this.getRightValue(v,true)).join("")}`;
                    }else{
                        return `<noscript class="jshon-d-text"></noscript>`;
                    }
                }else if(value[symbolIdentifier]){
                    if(ignoreArray){
                        return value[symbolIdentifier].value;
                    }
                    return `<i class="jshon-d-node" j-type="element"></i>${value[symbolIdentifier].value}`;
                }
            }
            if(ignoreArray){
                return `<noscript class="jshon-d-text">${_In_Escape(value+"")}</noscript>`;
            }
            return `<i class="jshon-d-node" j-type="text"></i><noscript class="jshon-d-text">${_In_Escape(value+"")}</noscript>`;
        }
    }
    var awaitingTasks = [];
    var renderingPage = {
        args:null,
        ref:null
    };
    var appCreation = {
        locked:false,
        secretId:symbolIdentifier,
        created:false,
        ready:false
    };
    var componentTypes = {};
    var states = {};
    var sharedStates={};
    var parentComponents = [0];
    var componentsCount = 0;;
    var typeCount = 0;
    function getInstanceRef(){
        if(pageRendered){return {}}
        componentsCount++;
        var ref = {};
        ref[symbolIdentifier] = {
            id:componentsCount,
            classType:this[symbolIdentifier].classType
        };
        states[componentsCount] = {
            keepStateOnDetach:noop,
            keepOnDetach:noop,
            destroyOnDetach:noop,
        };
        states[componentsCount][symbolIdentifier] = {
            ref:ref,
            id:componentsCount,
            classType:this[symbolIdentifier].classType,
            dynamicClassnames:{},
            firstCall:{},
            sharingState:[]
        }
        return ref;
    };
    function clear(a){
        var i;
        for(i in a){
            a[i]=null;
        }
    }
    function toString(JSHb,jshonObject,args,This_id,num){
        var s="<"+(jshonObject.tag|jshonObject.t),i;
        jshonObject.children=jshonObject.children|jshonObject.c;
        for(i=0;i<jshonObject.children.length;i++){
            if(typeof(jshonObject.children[i])=="function"){
                jshonObject.children[i].apply(states[This_id],args);
            }else{
                if(typeof(jshonObject.children[i])=="string"){
                    
                }
            }
        }
        s+=JSH.getDynamicAttributes(states[This_id],8)
    };
    JSH.ui = {
        writeDom:noop,
        onPageExit:noop,
        onPageRerendered:noop,
        lockAppCreation:function(secretId){
            if(pageRendered){return}
            if(!appCreation.locked){
                appCreation.locked=true;
                appCreation.secretId = secretId;
            }
        },
        unlockAppCreation:function(secretId){
            if(pageRendered){return}
            if(appCreation.secretId===secretId){
                appCreation.locked=false;
                appCreation.secretId = symbolIdentifier;
            }
        },
        createApp:function(pageName,pageRef,sendArgs){
            if(pageRendered){return}
            if(!appCreation.created&&!appCreation.locked){
                appCreation.created = true;
                var args = sendArgs(takeArguments);
                JSH.ui.render(pageRef,args);
               if(awaitingTasks.length<=0){
                appCreation.ready=true;
               // var mainHtml = PAGES[htmlEntryPath](undefined,true,data,`<script src="${jsEntryPath}"></script>`);
                var ssrHtml = require(htmlEntryPath)({
                    id:"jshon-ssr-html",
                    is_ssr:"<script>window.__JSHONHydrate=true;</script>",
                    render:function(){
                        //var client_data = PAGES_BLOCKING_CONTENTS[htmlEntryPath](data,jsEntryPath); {pathname}
                        var inline_dependencies=`<script id="jshon-starter-script">!function(){var at=JSHON.PAGEDATA;JSHON.PAGEDATA=${stringifyValue(data)};`+
                        `var atk=Object.keys(at);for(var z=0;z<atk.length;z++){JSHON.PAGEDATA[atk[z]]=typeof(JSHON.PAGEDATA[atk[z]])=='undefined'?at[atk[z]]:JSHON.PAGEDATA[atk[z]]};`+
                        `${textSeparatorScript};Object.defineProperty(JSHON,'inline_modules',{value:function JSHONInlineModules(){return {`,i;
                        // if(jserve.dev){
                        //     for(i=0;i<dependencyModulePaths.length;i++){
                        //         jserve.buildSSRString({pathname:dependencyModulePaths[i].pathname});
                        //         inline_dependencies+=`${JSON.stringify(dependencyModulePaths[i].external)}:${require(dependencyModulePaths[i].internal).toString()},`
                        //     };
                        //     jserve.buildSSRString({pathname:jsEntryPath.replace(".","")});
                        // }else{
                            for(i=0;i<dependencyModulePaths.length;i++){
                                inline_dependencies+=`${JSON.stringify(dependencyModulePaths[i].external)}:${require(dependencyModulePaths[i].internal).toString()},`
                            };
                        //}
                        inline_dependencies+=`};},writable:false,configurable:false});!${require(jsEntryPath.replace("./module/","./ssr/inline_modules/")).toString()}()}();</script>`
                        return /*'<i class="jshon-d-node" j-type="element"></i>'+*/JSH.ui.render(pageRef,args)[symbolIdentifier].value+inline_dependencies;//getStarterScript(jsEntryPath)+
                        //`}()</script>${inline_dependencies}`;//window._$page_data$_=${stringifyValue(client_data)}
                    }
                },escape,data,inserts);
                var cb = callback;
                renderId[symbol]();
                cb(null,ssrHtml);
               }else{
                renderingPage.args = args;
                renderingPage.ref = pageRef;
               }
            }
        },
        renderPage:noop,
        render:function(ref){
            if(pageRendered){return ""}
            if(!appCreation.created){return ""}
            var id = ref[symbolIdentifier].id,i,args=[];
            for(i=1;i<arguments.length;i++){
                args.push(arguments[i]);
            }
            
                var created = states[id][symbolIdentifier].created;
                if(!created||(created&&states[id][symbolIdentifier].refresh)){
                    //Component creation or component refresh
                    states[id][symbolIdentifier].refresh = false;
                    states[id][symbolIdentifier].parent = parentComponents[parentComponents.length-1];
                    parentComponents.push(id);
                    states[id][symbolIdentifier].created=true;
                    var htmlStringFunction = componentTypes[ref[symbolIdentifier].classType].fn.apply(states[id],args);
                    if(typeof (states[id].onCreation)=="function"&&!created){
                        states[id].onCreation.apply(states[id],args);
                    }
                    states[id].sharedState=buildSharedState(id);
                    if(typeof (states[id].onParentCall)=="function"){
                        states[id].onParentCall.apply(states[id],args);
                    }
                    states[id][symbolIdentifier].renderingData = {
                        htmlStringFunction:htmlStringFunction
                    }
                    htmlStringFunction.apply(states[id],args);
                    states[id].initArgs=undefined;
                    parentComponents.pop();
                    if(appCreation.ready){
                        var r={};
                        r[symbolIdentifier]={
                            value:states[id][symbolIdentifier].renderingData.htmlStringFunction.apply(states[id],args)
                        };
                        return r;
                    }
                    return "";
                }else{
                    if(!appCreation.ready){
                        //Component upadates
                        var setStateCall = args.length>0&&args[0]==symbolIdentifier;
                        if(setStateCall){
                            args = undefined;
                        }else if(typeof (states[id].onParentCall)=="function"){
                            states[id].onParentCall.apply(states[id],args);
                        }
                        if(typeof (states[id].beforeUpdate)=="function"){
                            states[id].beforeUpdate.apply(states[id],args);
                        }
                        if(states[id][symbolIdentifier].renderingData){
                            states[id][symbolIdentifier].renderingData.htmlStringFunction.apply(states[id],args);
                        }
                        return "";
                    }else{
                        if(typeof (states[id].onParentCall)=="function"){
                            states[id].onParentCall.apply(states[id],args);
                        }
                        if(typeof (states[id].beforeUpdate)=="function"){
                            states[id].beforeUpdate.apply(states[id],args);
                        }
                        var r={};
                        r[symbolIdentifier]={
                            value:states[id][symbolIdentifier].renderingData.htmlStringFunction.apply(states[id],args)
                        };
                        return r;
                    }
                    
                    
                }
            
        },
        refresh:function(ref){
            if(pageRendered){return}
            if(appCreation.ready){return}
            if(arguments.length>0){
                states[ref[symbolIdentifier].id][symbolIdentifier].refresh=true;
                JSH.ui.render.apply(null,arguments);
            }
        },
        createComponent:function(fn){
            if(pageRendered){return}
            if(typeof (fn)!="function"){
                return fn;
            }
            typeCount++;
            var classId = typeCount;
            componentTypes[classId] = {fn:fn};
            function functionClass(){
                componentsCount++;
                var count = componentsCount;
                return function(){
                    var ref = {};
                    ref[symbolIdentifier] = {
                        id:count,
                        classType:classId
                    };
                    states[componentsCount] = {
                        keepStateOnDetach:noop,
                        keepOnDetach:noop,
                        destroyOnDetach:noop
                    };
                    states[componentsCount][symbolIdentifier] = {
                        ref:ref,
                        id:count,
                        classType:classId,
                        dynamicClassnames:{},
                        firstCall:{},
                        sharingState:[]
                    }
                    
                    return JSH.ui.render(ref,arguments);
                }
            };
            functionClass[symbolIdentifier] = {
                classType:typeCount
            };
            functionClass.getInstanceRef = getInstanceRef;
            return functionClass;
        },
        createMethod:function(This,fn,once){
            if(pageRendered){return noop}
            var called = false;
            This = This[symbolIdentifier].id;
            return function createMethod(){
                if(pageRendered){fn=null; return}
                if(once){
                    if(!called){
                        called = true;
                        var i,args=[states[This]];
                        for(i=0;i<arguments.length;i++){
                            args.push(arguments[i]);
                        }
                        return {x:fn.apply(this,args),p:fn=null}.x;
                    }
                }else{
                    var i,args=[states[This]];
                    for(i=0;i<arguments.length;i++){
                        args.push(arguments[i]);
                    }
                    return fn.apply(this,args);
                }
            }
        },
        createCallback:function(This,fn,once){
            if(pageRendered){return noop}
            var called = false;
            This = This[symbolIdentifier].id;
            return function createCallback(){
                if(pageRendered){fn=null; return}
                if(once){
                    if(!called){
                        called = true;
                        return {x:fn.apply(states[This],arguments),p:fn=null}.x;
                    }
                }else{
                    return fn.apply(states[This],arguments);
                }
            }
        },
        getParentComponentRef:function(childRef){
            if(pageRendered){return null}
            if(states[childRef[symbolIdentifier].id][symbolIdentifier].created){
                var parentId = states[childRef[symbolIdentifier].id][symbolIdentifier].parent;
                if(parentId/** ParentId is always >=1 unless it has no parent. */){
                    return states[parentId][symbolIdentifier].ref;
                }
            }
            return null;
        },
        getComponentRef:function(This){
            if(pageRendered){return}
            return This[symbolIdentifier].ref;
        },
        getElement:noopNull,
        getSharedData:function(ref){
            if(pageRendered){return {}}
            var id = ref[symbolIdentifier].id;
            return states[id].public?{...states[id].public}:{};
        },
        setAttribute:function(This,key,attrObj){
            if(pageRendered){return}
            if(!This[symbolIdentifier].created||appCreation.ready){return}
            if(This.elements&&This.elements[key]){
                This.elements[key] = {
                    ...This.elements[key],
                    ...attrObj
                }
            }
        },
        setStyle:function(This,key,styleObj){
            if(pageRendered){return}
            if(!This[symbolIdentifier].created||appCreation.ready){return}
            if(This.elements&&This.elements[key]){
                if(!This.elements[key]["style"]){
                    This.elements[key]["style"]=styleObj;
                }else{
                    This.elements[key]["style"]={
                        ...This.elements[key]["style"],
                        ...styleObj
                    }
                }
            }
        },
        setClass:function(This,key,classObj){
            if(pageRendered){return}
            if(!This[symbolIdentifier].created||appCreation.ready){return}
            if(This.elements&&This.elements[key]){
                if(classObj.add){
                    var i;
                    for(i=0;i<classObj.add.length;i++){
                        This[symbolIdentifier].dynamicClassnames[classObj.add[i]]=true;
                    }
                }
                if(classObj.remove){
                    var i;
                    for(i=0;i<classObj.remove.length;i++){
                        This[symbolIdentifier].dynamicClassnames[classObj.remove[i]]=false;
                    }
                }
            }
        },
        setState:function(This,stateObject,update){
            if(pageRendered){return}
            if(!This[symbolIdentifier].created||appCreation.ready){return}
            var mustUpdate = false;
            if(stateObject){
                if(This.state){
                    if(typeof (update)!="boolean"){
                        var currentstate = This.state,i;
                        var newStateKeys = Object.keys(stateObject);
                        var currentStatekeys = Object.keys(currentstate);
                        if(newStateKeys.length>currentStatekeys.length){
                            mustUpdate = true;
                        }else{
                            for(i=0;i<newStateKeys.length;i++){
                                if(currentstate[newStateKeys[i]]!==stateObject[newStateKeys[i]]){
                                    mustUpdate = true;
                                    break;
                                }
                            }
                        }
                    }else{
                        mustUpdate=update;
                    }
                    This.state = {...This.state,...stateObject};

                }else{
                    This.state = {...stateObject};
                    mustUpdate = true;
                }
            }else{
                if(This.state){
                    mustUpdate = typeof (update)!="boolean"?true:update;
                }else{
                    mustUpdate = typeof (update)!="boolean"?false:update;
                }
                This.state = null;
            }
            if(mustUpdate){
                JSH.ui.render(This[symbolIdentifier].ref,symbolIdentifier);
            }
            
        },
        setInitArgs:function(ref,initArgs){
            if(pageRendered){return ref}
            states[ref[symbolIdentifier].id].initArgs=initArgs;
            return ref;
        },
        getSharedState:function(This,stateId){
            if(pageRendered){return}
            if(sharedStates[stateId]){
                return sharedStates[stateId].data;
            }
        },
        createSharedState:function(stateId,state){
            if(pageRendered){return}
            if(!sharedStates[stateId]){
                sharedStates[stateId]={
                    id:stateId,
                    group:[],
                    data:{...state}
                }
            }
        },
        joinSharedState:function joinSharedState(This,stateId,state){
            if(pageRendered){return}
            if(sharedStates[stateId]){
                if(sharedStates[stateId].group.indexOf(This[symbolIdentifier].id)<0){
                    sharedStates[stateId].group.push(This[symbolIdentifier].id);
                    This[symbolIdentifier].sharingState.push(stateId);
                }
            }else{
                sharedStates[stateId]={
                    id:stateId,
                    group:[This[symbolIdentifier].id],
                    data:{}
                }
                if(state){
                    sharedStates[stateId].data={...state};
                }
                This[symbolIdentifier].sharingState.push(stateId);
            }
        },
        unjoinSharedState:function unjoinSharedState(This,stateId){
            if(pageRendered){return}
            if(sharedStates[stateId]){
                var index;
                if((index=sharedStates[stateId].group.indexOf(This[symbolIdentifier].id))<0){
                    sharedStates[stateId].group.splice(index,1);
                    index=This[symbolIdentifier].sharingState.indexOf(stateId);
                    This[symbolIdentifier].sharingState.splice(index,1);
                }
            }
        },
        setSharedState:function(This,stateId,stateObject,update){
            if(pageRendered){return}
            if(!This[symbolIdentifier].created||appCreation.ready){return}
            if(!sharedStates[stateId]){return};
            if(This[symbolIdentifier].sharingState.indexOf(stateId)<0){return}
            var mustUpdate = false;
            if(stateObject){
                if(typeof (update)!="boolean"){
                    var currentstate = sharedStates[stateId].data,i;
                    var newStateKeys = Object.keys(stateObject);
                    var currentStatekeys = Object.keys(currentstate);
                    if(newStateKeys.length>currentStatekeys.length){
                        mustUpdate = true;
                    }else{
                        for(i=0;i<newStateKeys.length;i++){
                            if(currentstate[newStateKeys[i]]!==stateObject[newStateKeys[i]]){
                                mustUpdate = true;
                                break;
                            }
                        }
                    }
                }else{
                    mustUpdate=update;
                }
                sharedStates[stateId].data = {...sharedStates[stateId].data,...stateObject};
            }else{
                if(sharedStates[stateId].data){
                    mustUpdate = typeof (update)!="boolean"?true:update;
                }else{
                    mustUpdate = typeof (update)!="boolean"?false:update;
                }
                sharedStates[stateId].data=null;
                
            }
            if(mustUpdate){
                JSH.ui.render(This[symbolIdentifier].ref,symbolIdentifier);
                for(i=0;i<sharedStates[stateId].group.length;i++){
                    /** Trigger re-render if component is not detached. */
                    JSH.ui.render(states[sharedStates[stateId].group[i]][symbolIdentifier].ref,symbolIdentifier);
                }
            }
            
        },
        XSS:_In_Escape,
        xss:_In_Escape
    };
    function buildSharedState(componentsCount){
        var state={},sharingState=states[componentsCount][symbolIdentifier].sharingState,i;
        if(!sharingState.length){return};
        for(i=0;i<sharingState.length;i++){
            state[sharingState[i]]=sharedStates[sharingState[i]].data;
        }
        return state;
    };
    function _In_Escape(str) {
        if(!appCreation.ready){
            return str;
        }
        return (str+"").replace(/&/gs,"&amp;")
            .replace(/</gs, "&lt;")
            .replace(/>/gs, "&gt;")
            .replace(/"/gs, "&quot;")
            .replace(/'/gs, "&#39;")
            .replace(/`/gs, "&#96;");
    }
    return JSH;
}
function haltExecution(renderId){
    if(renderId[symbol]){
        renderId[symbol]();
    }
}
function escape(str) {
    return (str+"").replace(/&/gs,"&amp;")
        .replace(/</gs, "&lt;")
        .replace(/>/gs, "&gt;")
        .replace(/"/gs, "&quot;")
        .replace(/'/gs, "&#39;")
        .replace(/`/gs, "&#96;");
}
function takeArguments(){return arguments;}
function noop(){}
function noopNull(){return null}
function Render(src,cb,data,htmlEntryPath,renderId,insertable){
    var jshon = newPage({
        callback:cb,
        data:data,
        htmlEntryPath:htmlEntryPath,
        jsEntryPath:"./module"+src,
        renderId:renderId,
        inserts:insertable
    });
    jshon.import.from("/module"+src);
    // var html = ssr.html;
    // ssr.html = "";
    // return html;
}

function Escape(str) {
    return str.replace(/</gs,"&lt;").replace(/>/gs,"&gt;");
}
 var notVariable = /[^_$A-Za-z0-9]+/;
 var unsafeChar = /[><]/;
 function stringifyObject(data){
    var g='{';
    var valueType,i,key,val;
    var objKeys = Object.keys(data);
    for(i=0;i<objKeys.length;i++){
        key = objKeys[i];
        val = data[key];
        //if(notVariable.test(key)){
            if(unsafeChar.test(key)){
                g+=`[p(${JSON.stringify(Escape(key))})]`
            }else{
                g+=JSON.stringify(key);
            }
            
        // }else{
        //     g+=key;
        // }
        g+=":"
        valueType = typeof (val);
        if(valueType=="string"){
            if(unsafeChar.test(val)){
                g+=`p(${JSON.stringify(Escape(val))})`
            }else{
                g+=JSON.stringify(val);
            }
        }else if(valueType=="number"||valueType=="boolean"){
            g+=val;
        }else if(valueType=='object'){
            if(null==val){
                g+="null";
            }else{
                if(Array.isArray(val)){
                    g+=stringifyArray(val);
                }else{
                    g+=stringifyObject(val)
                }
            }
        }else{
            g+="null";
        }
        g+=",";
    }
    
    // if(g.endsWith(",")){
    //     g = g.replace(/.$/,"");
    // }
    g+="}";
    return g;

}
function stringifyArray(arr){
    var length = arr.length,i;
    var valueType;
    var str="["
    for(i=0;i<length;i++){
        valueType = typeof (arr[i]);
        if(valueType=="string"){
            if(unsafeChar.test(arr[i])){
                str+=`p(${JSON.stringify(Escape(arr[i]))})`
            }else{
                str+=JSON.stringify(arr[i]);
            }
        }else if(valueType=="number"||valueType=="boolean"){
            str+=arr[i];
        }else if(valueType=='object'){
            if(null==arr[i]){
                str+="null";
            }else{
                if(Array.isArray(arr[i])){
                    str+=stringifyArray(arr[i]);
                }else{
                    str+=stringifyObject(arr[i])
                }
            }
        }else{
            str+="null";
        }
        str+=",";
    }
    if(str.endsWith(",")){
        str = str.replace(/.$/,"");
    }
    str+="]";
    return str;
}
function stringifyValue(value){
    var valueType = typeof (value);
    if(valueType=="object"){
        if(Array.isArray(value)){
            return `{x:function(){function p(s){var f=[String.fromCharCode(60),String.fromCharCode(62)],r="replace";return s[r](/&lt;/g,f[0])[r](/&gt;/g,f[1])};return ${stringifyArray(value)}}}.x();`
        }else if(null!=value){
            return `{x:function(){function p(s){var f=[String.fromCharCode(60),String.fromCharCode(62)],r="replace";return s[r](/&lt;/g,f[0])[r](/&gt;/g,f[1])};return ${stringifyObject(value)}}}.x();`
        }else{
            return "null";
        }
    }else if(valueType=="string"){
        if(unsafeChar.test(value)){
            value=`p(${JSON.stringify(Escape(arr[i]))})`;
            return `{x:function(){function p(s){var f=[String.fromCharCode(60),String.fromCharCode(62)],r="replace";return s[r](/&lt;/g,f[0])[r](/&gt;/g,f[1])};return ${value}}}.x();`
        }else{
            return JSON.stringify(value);
        }
    }else if(valueType=="number"||valueType=="boolean"){
        return value+"";
    }else{
        return "null";
    }
};
var textSeparatorScript=`!function(){
    var d=document;
    var t=d.getElementsByClassName("jshon-d-text");
    if(t){
        function deX(str) {
            return (str+"").replace(/&amp;/gs,"&")
                .replace(/&lt;/gs,"<")
                .replace(/&gt;/gs,">")
                .replace(/&quot;/gs,'"')
                .replace(/&#39;/gs, "'")
                .replace(/&#96;/gs, "\`");
        };
        while(t.length>0){
            t[0].replaceWith(d.createTextNode(deX(t[0].textContent)));
        }
    };
}();`.replace(/\s\s/gs,"");

var jserve=module.exports = {
    /**
     * 
     * @param {{ssr:boolean,htmlEntryPath:PathLike,jsEntryPath:PathLike,pageData:{},insertable:{},callback:(err:null|NodeJS.ErrnoException,html:string)}} param0 
     *
     */
    render:function(param0){
        var {htmlEntryPath,jsEntryPath,pageData,insertable,callback} = param0;
        const ssr = !!param0.ssr;
        var renderId = Object.defineProperty({},symbol,{
            value:null,
            writable:true,
            enumerable:false,
            configurable:false
        });
        if(typeof (pageData)!="object"||!pageData){
            pageData={};
        }
        if(typeof (insertable)!="object"||!insertable){
            insertable={};
        }
        const compiled_htmlEntryPath = htmlEntryPath+".c.js";
        // if(!PAGES[htmlEntryPath]){
        //     PAGES[htmlEntryPath] = require(compiled_htmlEntryPath);
        // }
        if(jserve.dev){
            mark();
        }
        if(ssr){
            Render(jsEntryPath,callback,pageData,compiled_htmlEntryPath,renderId,insertable);
        }else{
            callback(null,require(compiled_htmlEntryPath)({
                id:"jshon-cr-html",
                is_ssr:"",
                render:function(){
                    var merger=`<script>!function(){var at=JSHON.PAGEDATA;JSHON.PAGEDATA=${stringifyValue(pageData)};`+
                    `var atk=Object.keys(at);for(var z=0;z<atk.length;z++){JSHON.PAGEDATA[atk[z]]=typeof(JSHON.PAGEDATA[atk[z]])=='undefined'?at[atk[z]]:JSHON.PAGEDATA[atk[z]]};`+
                    `}()</script>`;
                    return merger+`<script id="app-starter-script" src="/module${escape(jsEntryPath)}"></script>`;
                }
            },escape,pageData,insertable));

            //For development
            if(jserve.dev){
                clearCache();
            }
        }
        return renderId;
    },
    abort:haltExecution,
    aborted:function(renderId){
        return typeof (renderId[symbol])=="boolean";
    },
    HTMLEscape:escape,
    is_dev(){
        jserve.dev=true;
    }
}