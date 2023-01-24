var Internal = {
    allow:false,
    rerenderPage:function(){},
    pageRerendering:false
};
!function(){
    /*
     * JSHON importation and exportation library.
     * -Version: 1.0.0-
     * -Lincense: MIT- 
     * 
     * The JSHON Project by Kwabena Bismark.
     * See project on github: https://github.com/KBismark/JSHON
     * Join us on tech forums: []
     */

    var symbolIdentifier = "$_"+Math.random()+"-";
    function setFreezedObjectProperty(obj,key,value){
        return Object.defineProperty(obj,key, {
            value:value,
            enumerable:false,
            configurable:false,
            writable:false
        });
    };
    function setWritableObjectProperty(obj,key,value){
        return Object.defineProperty(obj,key,{
            value:value,
            enumerable:false,
            configurable:false,
            writable:true
        })
    };
    function setFreezedObjectProperties(obj,propsObj){
        var keys = Object.keys(propsObj);
        for(var i=0;i<keys.length;i++){
            setFreezedObjectProperty(obj,keys[i],propsObj[keys[i]]);
        }
        return obj;
    }

    /**
     * Loads script files by creating a new script element.
     */
    function loadScripts(src,dependency){
        var script = document.createElement("script");
        script.src = [src,typeof(modulesVersion[src])=="string"?modulesVersion[src]:""].join("");
        script.onerror = function(){
            JSHON[symbolIdentifier+"requested"][dependency]=false;
            var importsKey = symbolIdentifier+"imports",i;
            var dependants = JSHON[importsKey][dependency];
            if(dependants){
                //Send unsuccessful message to all modules 
                //that depends on this particular module.
                for(i=0;i<dependants.length;i++){
                    modulesCallback(false,dependants[i]);
                }
            }
            this.onerror=null;
        };
        return script;
    }
    var modules={},modulesReqObj={abort:function(){}},
    currentModuleRequest=modulesReqObj,currentLoadingModule={
        src:null
    };
    function pageLoadAborter(src){
        return {
            abort:function(){
                if(src===currentLoadingModule.src){
                    currentModuleRequest.abort();
                    currentModuleRequest=modulesReqObj;
                    modules[currentLoadingModule.src].onload=null;
                    modules[currentLoadingModule.src].onerror=null;
                    modules[currentLoadingModule.src].loading=false;
                }
            }
        }
    }
    function moduleRequestsOnload(){
        if(this.status==200){
            currentModuleRequest=modulesReqObj;
            modules[this.pageSrc].loading=false;
            modules[this.pageSrc].loaded=true;
            modules[this.pageSrc].jshonLoading=true;
            var script=document.createElement("script");
            script.textContent=this.responseText;
            document.head.appendChild(script);
            JSHON.loadModule(this.pageSrc,{
                onload:scopedJSHONonload(this.pageSrc),
                onerror:scopedJSHONonerror(this.pageSrc),
                args:this.args
            });
        }else{
            this.onerror();
        }
        
    };
    function moduleRequestsOnabort(){
        currentModuleRequest=modulesReqObj;
        modules[this.pageSrc].loading=false;
        modules[this.pageSrc].onerror=null;
        modules[this.pageSrc].onload=null;
    };
    function moduleRequestsOnerror(){
        currentModuleRequest=modulesReqObj;
        var onerror = modules[this.pageSrc].onerror;
        modules[this.pageSrc].onerror=null;
        modules[this.pageSrc].onload=null;
        modules[this.pageSrc].loading=false;
        modules[this.pageSrc].loaded=false;
        if(onerror){
            onerror(this.args);
        }
    };

    function scopedJSHONonload(pageSrc){
        return function(args){
            var onload=modules[pageSrc].onload;
            modules[pageSrc].onerror=null;
            modules[pageSrc].onload=null;
            modules[pageSrc].jshonLoaded=true;
            modules[pageSrc].jshonLoading=false;
            if(currentLoadingModule.src===pageSrc){
                onload(args);
            }
            pageSrc=null;
        }
    };
    function scopedJSHONonerror(pageSrc){
        return function(args){
            var onerror = modules[pageSrc].onerror;
            modules[pageSrc].onerror=null;
            modules[pageSrc].onload=null;
            modules[pageSrc].jshonLoaded=false;
            modules[pageSrc].jshonLoading=false;
            if(onerror&&currentLoadingModule.src===pageSrc){
                onerror(args);
            }
            pageSrc=null;
        }
    };
    function pageLoader(src,props){
        currentModuleRequest.abort();
        if(typeof(currentLoadingModule.src)=="string"){
            modules[currentLoadingModule.src].onload=null;
            modules[currentLoadingModule.src].onerror=null;
            modules[currentLoadingModule.src].loading=false;
        }
        currentLoadingModule.src=null;
        var request = new XMLHttpRequest();
        request.pageSrc=src;
        request.args=props.args;
        request.onload=moduleRequestsOnload;
        request.onerror=moduleRequestsOnerror;
        //request.onabort=moduleRequestsOnabort;
        modules[src].onload=props.onload;
        modules[src].onerror=props.onerror;
        modules[src].loading=true;
        request.open("GET",[src,typeof(modulesVersion[src])=="string"?modulesVersion[src]:""].join(""),true);
        currentModuleRequest=request;
        currentLoadingModule.src=src;
        var importsKey = symbolIdentifier+"imports",
        dependency=symbolIdentifier+src;
        if(!JSHON[importsKey][dependency]){
            JSHON[importsKey][dependency] = [];
        }
        request.send();
    };
    function loadPage(src,props){
        if(modules[src]){
            if(modules[src].loaded){
                currentModuleRequest.abort();
                currentModuleRequest=modulesReqObj;
                if(typeof(currentLoadingModule.src)=="string"){
                    modules[currentLoadingModule.src].onload=null;
                    modules[currentLoadingModule.src].onerror=null;
                    modules[currentLoadingModule.src].loading=false;
                }
                currentLoadingModule.src=src;
                if(modules[src].jshonLoaded){
                    JSHON.loadModule(src,props);
                }else{
                    modules[src].onload=props.onload;
                    modules[src].onerror=props.onerror;
                    if(!modules[src].jshonLoading){
                        JSHON.reloadModule(src);
                    }
                }
            }else{
                if(!modules[src].loading){
                    pageLoader(src,props);
                }else{
                    modules[src].onload=props.onload;
                    modules[src].onerror=props.onerror;
                }
            }
            return pageLoadAborter(src);
        };
        modules[src]={
            loaded:false,
            loading:false,
            jshonLoaded:false,
            jshonLoading:false,
            onload:props.onload,
            onerror:props.onerror,
            onabort:props.onabort
        };
        if(JSHON.includesModule(src)){
            currentModuleRequest.abort();
            if(typeof(currentLoadingModule.src)=="string"){
                modules[currentLoadingModule.src].onload=null;
                modules[currentLoadingModule.src].onerror=null;
                modules[currentLoadingModule.src].loading=false;
            }
            currentLoadingModule.src=src;
            modules[src].loaded=true;
            modules[src].jshonLoading=true;
            JSHON.loadModule(src,{
                onload:scopedJSHONonload(src),
                onerror:scopedJSHONonerror(src),
                args:props.args
            });
        }else{
            pageLoader(src,props);
        }
        
        return pageLoadAborter(src);
    };

    function modulesCallback(result,dependantData){
        JSHON.import[dependantData.pathname].loadResult[dependantData.position] = result;
        if(!dependantData.regulator.firstload){
            dependantData.regulator.requests++;
            if(
                dependantData.regulator.requests==dependantData.regulator.expectedRequests
                /** All requests has returned */
            ){  
                dependantData.regulator.firstload=true;
                if(
                    JSHON.import[dependantData.pathname].loadResult.indexOf(false)<0
                    /** All dependencies are loaded successfully */
                ){
                    JSHON[symbolIdentifier+'currentPathname']=JSHON.import[dependantData.pathname].main;
                    JSHON.import[dependantData.pathname].onload();
                    JSHON.import[dependantData.pathname].onload=null;
                    JSHON.import[dependantData.pathname].onerror=null;
                    JSHON.import[dependantData.pathname].onerrorOnce=null;
                }else{
                    var importsKey = symbolIdentifier+"imports",i;
                    var dependants = JSHON[importsKey][dependantData.pathname];
                    if(dependants){
                        //Send unsuccessful message to all modules 
                        //that depends on this particular module.
                        for(i=0;i<dependants.length;i++){
                            modulesCallback(false,dependants[i]);
                        }
                    }
                    if(JSHON.import[dependantData.pathname].onerrorOnce){
                        JSHON.import[dependantData.pathname].onerrorOnce();
                        JSHON.import[dependantData.pathname].onerrorOnce=null;
                    }
                    if(JSHON.import[dependantData.pathname].onerror){
                        JSHON.import[dependantData.pathname].onerror();
                    }
                }
                dependantData.regulator.requests = 0;
            }
        }else{
            if(JSHON.import[dependantData.pathname].successful.indexOf(dependantData.position)<0){
                dependantData.regulator.requests++;
            }
            if(
                JSHON.import[dependantData.pathname].loadResult.indexOf(false)<0
                /** All dependencies are loaded successfully */
            ){
                JSHON[symbolIdentifier+'currentPathname']=JSHON.import[dependantData.pathname].main;
                JSHON.import[dependantData.pathname].onload();
                JSHON.import[dependantData.pathname].onload=null;
                JSHON.import[dependantData.pathname].onerror=null;
                JSHON.import[dependantData.pathname].onerrorOnce=null;
            }else{
                var totalReq = dependantData.regulator.requests+JSHON.import[dependantData.pathname].successful.length;
                if(totalReq==dependantData.regulator.expectedRequests){
                    var importsKey = symbolIdentifier+"imports",i;
                    var dependants = JSHON[importsKey][dependantData.pathname];
                    if(dependants){
                        //Send unsuccessful message to all modules 
                        //that depends on this particular module.
                        for(i=0;i<dependants.length;i++){
                            modulesCallback(false,dependants[i]);
                        }
                    }
                    if(JSHON.import[dependantData.pathname].onerror){
                        JSHON.import[dependantData.pathname].onerror();
                    }
                    dependantData.regulator.requests = 0;
                }
            }
        }

    }
    function reloadModule(src){
        var dependency = symbolIdentifier+src;
        var i;
        if(this.import[dependency]/** Module is already loaded */){
            if(this.import[dependency].setup/** If module was correctly setup */){
                if(
                    this.import[dependency].loadResult.indexOf(false)>=0
                    /** Could not load dependencies of this module successfully */
                ){
                    /** Reload dependencies that were not loaded successfully */
                    for(i=0;i<this.import[dependency].loadResult.length;i++){
                        if(!this.import[dependency].loadResult[i]){
                            this.reloadModule(this.import[dependency].dependencies[i]);
                        }
                    }
                }
            }
        }else/** The module's file is not loaded at all */ {
            if(
                !this[symbolIdentifier+"requested"][dependency]
                /** If not in the process loading, request for it */
            ){
                this[symbolIdentifier+"requested"][dependency]=true;
                document.head.appendChild(loadScripts(src,dependency))
            }
        }
    };
    var inAppModuleLoads = {};
    function loadModule(src,{onload=null,onerror=null,args=undefined}){
        if(typeof (onload)=="function"){
            if(!inAppModuleLoads[src]){
                inAppModuleLoads[src] = {
                    listeners:[
                        {
                            onerror:onerror,onload:onload,
                            args:args
                        }
                    ],
                    loaded:false,
                    loading:true
                }
                JSHON.pathname = symbolIdentifier+"inAppModuleLoads-"+src;
                JSHON.include(src);
                JSHON.onerror=(function(src){
                    return function(){
                        inAppModuleLoads[src].loading=false;
                        var i;
                        for(i=0;i<inAppModuleLoads[src].listeners.length;i++){
                            if(typeof (inAppModuleLoads[src].listeners[i].onerror)=="function"){
                                inAppModuleLoads[src].listeners[i].onerror(inAppModuleLoads[src].listeners[i].args)
                            }
                        }
                    }
                })(src);
                JSHON.onload=(function(src){
                    return function(){
                        inAppModuleLoads[src].loaded=true;
                        var i;
                        for(i=0;i<inAppModuleLoads[src].listeners.length;i++){
                            inAppModuleLoads[src].listeners[i].onload(inAppModuleLoads[src].listeners[i].args)
                        }
                        inAppModuleLoads[src].listeners=null;
                    }
                })(src);
            }else{
                if(inAppModuleLoads[src].loaded){
                    onload(args);
                }else{
                    inAppModuleLoads[src].listeners.push({
                        onerror:onerror,onload:onload,
                        args:args
                    });
                    if(!inAppModuleLoads[src].loading){
                        inAppModuleLoads[src].loading=true;
                        JSHON.reloadModule(src)
                    }
                    
                }
            }
        }
    
    };
    var modulesVersion={},versioned=false;
    
    function resetModuleExports(pathname){
        Internal.allow=true;
    }
    var JSHONImportExportModule = {
        getCurrentPathname(){
            return this[symbolIdentifier+'currentPathname'];
        },
        /**
         * `JSHON.version` 
         * Set versions of modules globally. Versions are concantenated to the module's
         * source path everytime it's loaded. 
         */
        set version(obj){
            if(typeof(obj)=="object"&&null!=obj&&!versioned){
                setFreezedObjectProperties(modulesVersion,obj);
                versioned=true;
            }
        },
        /**
         * `JSHON.export`   
         * Export specific named files that can only be imported by name.
         */
        set export(obj){
            var currentFilename = symbolIdentifier+'currentPathname';
            if(this[currentFilename]==""/** Resolves to export globally*/){
                this.global=obj;
            }else{
                var path = symbolIdentifier+this[currentFilename];
                if(
                    !this.exports[path]
                    /** Ignore if a file tries to export under an existing filename */
                    /**Can't export multiple times under the same filename */
                ){
                    this.exports[path] = {...obj};
                    //setFreezedObjectProperty(this.exports,path,setFreezedObjectProperties({},obj));
                    var importsKey = symbolIdentifier+"imports",i;
                    var dependants = JSHON[importsKey][path];
                    if(dependants){
                        //Send successful message to all modules 
                        //that depends on this particular module.
                        for(i=0;i<dependants.length;i++){
                            this.import[dependants[i].pathname].successful.push(dependants[i].position);
                            modulesCallback(true,dependants[i]);
                        }
                    }
                }else{
                    if(Internal.allow){
                        this.exports[path] = {...obj};
                    }
                }
            }
            this[currentFilename] = "";
            versioned=true;
        },
        /**
         * `JSHON.global`   
         * Export modules that can be imported without providing the file name of the exporter.
         * These type of exports may be overwritten if there exist name collissions between 
         * previuos export and new exports.
         */
        set global(obj){
            var keys = Object.keys(obj),i;
            for(i=0;i<keys.length;i++){
                setWritableObjectProperty(this.import.global,keys[i],obj[keys[i]]);
            }
        },
        /**
         * This is used to set file names
         * @param {string} pathname
         */
        set pathname(pathname){
            if(typeof (pathname)=="string"&&pathname.length>0){
                this[symbolIdentifier+'currentPathname'] = pathname;
                if(
                    !this.import[symbolIdentifier+pathname]
                    /** Ignore if a file tries to register its name as an existing filename */
                ){
                    setFreezedObjectProperty(this.import,symbolIdentifier+pathname,{
                        setup:false,
                        dependencies:[],
                        loadResult:[],
                        onload:null,
                        onerror:null,
                        onerrorOnce:null,
                        main:pathname,
                        successful:[]
                    });
                }
            }
        },
        /**
         * Execute your code on load.
         * @param {() => void} cb
         */
        set onload(cb){
            if(typeof (cb)=="function"){
                var currentFilename = symbolIdentifier+'currentPathname';
                var path = symbolIdentifier+this[currentFilename];
                var setup;
                if(Internal.allow){
                    setup = this.import[path].setup;
                    this.import[path].setup = false;
                }
                if(this[currentFilename].length>0&&!this.import[path].setup&&this.import[path].dependencies.length>0){
                    this.import[path].setup=true;
                    this.import[path].onload=cb;
                    var docFragment = document.createDocumentFragment(),i;
                    var returned = {requests:0,expectedRequests:this.import[path].dependencies.length};
                    var importsKey = symbolIdentifier+"imports",dependency,inline;
                    for(i=0;i<this.import[path].dependencies.length;i++){
                        dependency = symbolIdentifier+this.import[path].dependencies[i];
                        if(
                            this.import[dependency]
                            /** This dependency-module has already been loaded by a different module. */
                            /** No need to load again */
                        ){
                            if(
                                this.import[dependency].loadResult.indexOf(false)<0
                                /** Dependencies of themodule was successfully loaded */
                            ){

                                this.import[path].successful.push(i);
                                modulesCallback(true,{
                                    pathname:path,
                                    position:i,
                                    regulator:returned
                                });
                            }
                            else
                            /** Could not load all dependencies of the module successfully. Retry. */ {
                                JSHON[importsKey][dependency].push({
                                    pathname:path,
                                    position:i,
                                    regulator:returned
                                })
                                this.reloadModule(this.import[path].dependencies[i])
                            }
                        }else/** This dependency-module's file is not loaded at all */{
                            if(!JSHON[importsKey][dependency]){
                                JSHON[importsKey][dependency] = [];
                            }
                            JSHON[importsKey][dependency].push({
                                pathname:path,
                                position:i,
                                regulator:returned
                            });
                            if(
                                !this[symbolIdentifier+"requested"][dependency]
                                /** If not in the process loading, request for it */
                            ){
                                if(!this.inline_modules){
                                    this[symbolIdentifier+"requested"][dependency]=true;
                                    docFragment.appendChild(loadScripts(this.import[path].dependencies[i],dependency))
                                }else{
                                    if((inline=this.inline_modules()[this.import[path].dependencies[i]])){inline()}
                                    else{
                                        this[symbolIdentifier+"requested"][dependency]=true;
                                        docFragment.appendChild(loadScripts(this.import[path].dependencies[i],dependency))
                                    }
                                }
                                
                            }
                            
                        }
                        
                    }
                    document.head.appendChild(docFragment);
                }
                if(Internal.allow){
                    this.import[path].setup = setup;
                }
                this[currentFilename]="";
            }
        },
        /**
         *  File specific exports
         * 
         * @param {() => void} cb
         */
        set onerror(cb){
            if(typeof (cb)=="function"){
                var path = symbolIdentifier+this[symbolIdentifier+'currentPathname'];
                if(this[symbolIdentifier+'currentPathname'].length>0&&!this.import[path].setup&&this.import[path].dependencies.length>0){
                    this.import[path].onerror=cb;
                }
            }
        },
        /**
         * File specific exports
         * 
         * @param {() => void} cb
         */
        set onerrorOnce(cb){
            if(typeof (cb)=="function"){
                var path = symbolIdentifier+this[symbolIdentifier+'currentPathname'];
                if(this[symbolIdentifier+'currentPathname'].length>0&&!this.import[path].setup&&this.import[path].dependencies.length>0){
                    this.import[path].onerrorOnce=cb;
                }
            }
        }
    };
    setFreezedObjectProperty(setFreezedObjectProperty(window,"JSHON",JSHONImportExportModule).JSHON,"loadPage",loadPage);
    setFreezedObjectProperty(setFreezedObjectProperty(JSHON,"exports",{}),symbolIdentifier+"imports",{});
    setFreezedObjectProperty(setFreezedObjectProperty(JSHON,"import",{}),symbolIdentifier+"requested",{});
    setFreezedObjectProperty(setWritableObjectProperty(JSHON,symbolIdentifier+'currentPathname',""),"reloadModule",reloadModule);
    setFreezedObjectProperty(setFreezedObjectProperty(JSHON,"loadModule",loadModule),"include",function JSHONExternalImports(src){
        var currentFilename = symbolIdentifier+'currentPathname';
        var path = symbolIdentifier+JSHON[currentFilename];
        if(JSHON[currentFilename].length>0&&!JSHON.import[path].setup){
            JSHON.import[path].dependencies.push(src);
            JSHON.import[path].loadResult.push(false);
        }
    });
    setFreezedObjectProperty(setFreezedObjectProperty(JSHON.import,"global",{}),"from",function JSHONInternalImports(src){
        var path = symbolIdentifier+src;
        if(JSHON.exports[path]){
            return JSHON.exports[path];
        }
        return;
    });
    setFreezedObjectProperty(JSHON,"includesModule",function JSHONIncludesModule(src){
        return !!JSHON.import[symbolIdentifier+src];
    });
    //Not running on server
    setFreezedObjectProperty(JSHON,"jServe",false);
    JSHON.PAGEDATA={};
    function checkForUpdates(){
        var request = new XMLHttpRequest();
        request.onerror = request.ontimeout = request.onabort =
        function(){
            setTimeout(() => {
                checkForUpdates();
            }, 5000);
        };
        request.onload = function(){
            var res  = this.response;
            var total = res.length,l=total;
            if(!total){
                setTimeout(() => {
                    checkForUpdates();
                }, 1000);
                return;
            }
            
            for(let i = 0;i<l;i++){
                loadReplacer(res[i],function(){
                    total--;
                    if(total<=0){
                        //
                        loadReplacer("/statics/css/app.css",null,function onLoad(){
                            var preStyle = document.getElementById("jsh-dev-app-css");
                            preStyle.textContent = this.response;
                            Internal.rerenderPage();
                            setTimeout(() => {
                                checkForUpdates();
                            }, 1000);
                        },function onError(){
                            Internal.rerenderPage();
                            setTimeout(() => {
                                checkForUpdates();
                            }, 1000);
                        })
                        

                        
                    }
                })
            }
            
        }
        request.responseType="json";
        request.open("GET","/$check-for-updates",true);
        request.send();
    };
    function loadReplacer(src,callback,onload,onerror){
        var request = new XMLHttpRequest();
        request.onerror = request.ontimeout = request.onabort = onload?onerror:callback;
        request.onload = onload?onload:function(){
            var id = "hmr-"+this.src.replace(/\//g,"-").replace(/\./g,"-d-");
            var preScript = document.getElementById(id);
            var script = document.createElement("script");
            script.textContent = this.response;
            script.setAttribute("id",id);
            Internal.allow=true;
            if(preScript){
                preScript.remove();
            }
            document.head.appendChild(script);
            Internal.allow = false;
            this.callback();
        }
        request.callback = callback;
        request.src=src;
        request.responseType="text";
        request.open("GET",src,true);
        request.send();
    };
    window.addEventListener("load",function(e){
        setTimeout(() => {
            checkForUpdates();
        }, 2000);
    },true)
}();
!function(){
    "use strict";
    //Should we hydrate?
    var JSHONHydrate = window.__JSHONHydrate;
    //Private State Management Object
    var states = {};
    //Public State Management Object
    var sharedStates={};
    //Holds reference to components functions
    var componentTypes = {};
    //Keeps data on rendering cycles
    var renderCycle = {
        on:false,
        renderingMode:false,
        register:{},
        refresh:{},
        queue:[],
        attributes:{},
        update:{},
        newPage:{
            id:null,
            getArgs:undefined,
            isPoppedState:false,
            pageName:"",
            firstRender:false
        },
        currentPage:null
    };
    //This is hopefully to be used for safe writes and reads directly to and from the dom.
    var outOfScopeTasks={
        write:[],
        read:[]
    };
    //Components are id'ed for easy access from the states object
    var componentsCount=0; 
    var componentTypesCount=0;
    var symbolIdentifier = `$_${Math.random()}-`;
    var tempIdentifier = `$_${Math.random()}-TEMP`;
    var componentsIdentifier = symbolIdentifier+"component";


    function setFreezedObjectProperty(obj,key,value){
        return Object.defineProperty(obj,key, {
            value:value,
            enumerable:false,
            configurable:false,
            writable:false
        });
    };
    function setNonEnumerableObjectProperty(obj,key,value){
        return Object.defineProperty(obj,key,{
            value:value,
            enumerable:false,
            configurable:true,
            writable:true
        })
    };
    function setWritableObjectProperty(obj,key,value){
        return Object.defineProperty(obj,key,{
            value:value,
            enumerable:false,
            configurable:false,
            writable:true
        })
    };
    function setFreezedObjectProperties(obj,propsObj){
        var keys = Object.keys(propsObj);
        for(var i=0;i<keys.length;i++){
            setFreezedObjectProperty(obj,keys[i],propsObj[keys[i]]);
        }
        return obj;
    };
    function releaseSpace(a){
        var i;
        for(i in a){
            a[i]=null;
        }
    }
    function findObjectNode(chainArray,parentObject){
        var i;
        var mainObject = parentObject;
        parentObject = null;
        for(i=1;i<chainArray.length;i++){
            mainObject = mainObject.children[chainArray[i]];
        }
        return mainObject
    }
    
    function isvalidJSHON(node){
        return (
          typeof (node)=="object"
          &&null!=node
          &&typeof (node.tag=(node.tag||node.t))=="string"
          &&node.tag.length>0
          &&Array.isArray(node.children=(node.children||node.c))
          &&(node.attr=(node.attr||node.a))
          &&typeof (node.attr)=="object"
        );
    }

    function componenetToText(current,dynamicNode,componentsCount,textValue){
        var newNode = buildText(textValue,dynamicNode.positioningChainArray);
        findObjectNode(
            dynamicNode.positioningChainArray,
            states[componentsCount][symbolIdentifier].objectNode
        ).children[0]=newNode.objectNode;
        dynamicNode.currentChildObjectNode=newNode.objectNode;
        dynamicNode.currentChildDomNode=newNode.domNode;
        states[current][symbolIdentifier].domNode.parentNode
        .replaceChild(
            newNode.domNode,states[current][symbolIdentifier].domNode
        );
    };

    function textToComponent(dynamicNode,componentValue){
        dynamicNode.currentChildDomNode.parentNode
        .replaceChild(
            states[componentValue[componentsIdentifier]][symbolIdentifier].domNode,
            dynamicNode.currentChildDomNode
        );
        findObjectNode(
            dynamicNode.currentChildObjectNode.positioningChainArray,
            states[componentsCount][symbolIdentifier].objectNode
        ).children[0] = componentValue;
        releaseSpace(dynamicNode.currentChildObjectNode);
        dynamicNode.currentChildObjectNode=componentValue;
        dynamicNode.currentChildDomNode=null;
    }

    //Converts the json object into HTML element.
    function buildNode(node,positioningChainArray,elements,rendering,componenet_id,isSVG){
        node.tag=node.tag||node.t;
        node.attr=node.attr||node.a;
        node.children=node.children||node.c;
        componenet_id.id++;
        if(!isSVG){
            isSVG=node.tag.toLowerCase()=="svg";
        }
        var domElementNode = !isSVG?document.createElement(node.tag):document.createElementNS("http://www.w3.org/2000/svg",node.tag);
        var styler = setNodeAttributes(domElementNode,node.attr,elements,rendering,componenet_id);
        var elementStyles = {};
        if(styler&&styler.keyed){
            elementStyles[styler.key]={
                positioningChainArray:positioningChainArray,
                listeningKeys:styler.listeners,
                styles:styler.styles,
                attributes:styler.attributes,
                classNames:styler.classNames
            }
        }
        var objectElementNode = {
            type:"element",
            children:[],
            data:{},
            positioningChainArray:positioningChainArray,
            depth:positioningChainArray.length
        };
        var i;
        var childNodeType;
        var childNode;
        var dynamicNodes=[];
        var replacer;
        for(i=0;i<node.children.length;i++){
            childNodeType = typeof (node.children[i]);
            positioningChainArray = objectElementNode.positioningChainArray.slice();
            positioningChainArray.push(i);
            if(childNodeType=="function"/** Dynamic Node */){
                replacer = buildText("",positioningChainArray);
                dynamicNodes.push({
                    positioningChainArray:positioningChainArray,
                    node:node.children[i],
                    currentChildDomNode:replacer.domNode,
                    currentChildObjectNode:replacer.objectNode
                })
                objectElementNode.children.push({
                    type:"dynamic",
                    children:[replacer.objectNode],
                    data:{},
                    positioningChainArray:positioningChainArray,
                    depth:positioningChainArray.length
                });
                domElementNode.appendChild(replacer.domNode);
                replacer=null;
            }
            else if(isvalidJSHON(node.children[i])/** Static Node */){
                childNode = buildNode(node.children[i],positioningChainArray,elements,rendering,componenet_id,isSVG);
                domElementNode.appendChild(childNode.domNode);
                objectElementNode.children.push(childNode.objectNode);
                dynamicNodes = dynamicNodes.concat(childNode.dynamicNodes);
                if(!rendering){
                    elementStyles = {
                        ...elementStyles,
                        ...childNode.elementsStyle
                    };
                }
            }
            else/** Everything else is a text */{
                
                if(null===node.children[i]/** Null is an empty text */){
                    node.children[i] = "";
                }
                childNode = buildText(node.children[i],positioningChainArray);
                domElementNode.appendChild(childNode.domNode);
                objectElementNode.children.push(childNode.objectNode);
            }
        }
        return {
            domNode:domElementNode,
            objectNode:objectElementNode,
            dynamicNodes:dynamicNodes,
            elementsStyle:elementStyles
        }
    };

    var ImageData=[];
    if(JSHONHydrate){
        //Loads images after page loads
        window.addEventListener("load",function(){
            setTimeout(function(){
                var n=ImageData,m,i,j=0;
                while(j<n.length){
                    m=document.createElement("img");
                    for(i=0;i<n[0].listeners.length;i++){
                        m[n[j].listeners[i]]=n[j].node[n[j].listeners[i]];
                    };
                    if(n[j].head){
                        states[n[j].id][symbolIdentifier].domNode=m;
                        if(n[j].listhead){
                            states[n[j].id][symbolIdentifier].dynamicNodes[n[j].listhead.id].currentChildDomNode=m;
                        }
                    }
                    for(i=0;i<n[j].node.attributes.length;i++){
                        m.setAttribute(n[j].node.attributes[i].name||n[j].node.attributes[i].nodeName,n[j].node.attributes[i].value);
                    };
                    n[j].node.replaceWith(m);
                    j++;
                }
                ImageData=[];
            },0);
        },{once:true});
    };

    function HydrationNodeBuilder(domElementNode,node,positioningChainArray,elements,rendering,componenet_id,child,listhead){
        node.tag=node.tag||node.t;
        node.attr=node.attr||node.a;
        node.children=node.children||node.c;
        var id=componenet_id.id;
        componenet_id.id++;
        var styler = setNodeAttributesForHydration(domElementNode,node.attr,elements,rendering,componenet_id);
        node.tag = node.tag.toLowerCase();
        if(node.tag=="img"&&domElementNode.nodeName!=="img"){
            if(JSHONHydrate){
                ImageData.push({
                    head:!child,
                    id:id,
                    listeners:styler.listeners,
                    node:domElementNode,
                    listhead:listhead
                })
            }
        }
        var elementStyles = {};
        elementStyles[styler.key]={
            positioningChainArray:positioningChainArray,
            listeningKeys:styler.listeners,
            styles:styler.styles,
            attributes:styler.attributes,
            classNames:styler.classNames
        }
        var objectElementNode = {
            type:"element",
            children:[],
            data:{},
            positioningChainArray:positioningChainArray,
            depth:positioningChainArray.length
        };
        var i;
        var childNodeType;
        var childNode;
        var dynamicNodes=[];
        var replacer;
        var cursor=0,listLength=0;
        for(i=0;i<node.children.length;i++){
            childNodeType = typeof (node.children[i]);
            positioningChainArray = objectElementNode.positioningChainArray.slice();
            positioningChainArray.push(i);
            if(childNodeType=="function"/** Dynamic Node */){
                dynamicNodes.push({
                    positioningChainArray:positioningChainArray,
                    node:node.children[i],
                    currentChildDomNode:null,
                    currentChildObjectNode:null
                });
                objectElementNode.children.push({
                    type:"dynamic",
                    children:[{}],
                    data:{},
                    positioningChainArray:positioningChainArray,
                    depth:positioningChainArray.length
                });
                replacer = domElementNode.childNodes[cursor];
                if(replacer.attributes["j-len"])/* A list head*/{
                    listLength=Number(replacer.attributes["j-len"].value);
                    dynamicNodes[dynamicNodes.length-1].currentChildObjectNode=new Array(listLength);
                    dynamicNodes[dynamicNodes.length-1].currentChildDomNode=replacer.nextSibling;
                    cursor+=listLength;
                }else{
                    if(replacer.attributes["j-type"].value=="text")/* TextNode*/{
                        dynamicNodes[dynamicNodes.length-1].currentChildObjectNode={
                            type:"text",
                            children:[],
                            data:{},
                            positioningChainArray:positioningChainArray,
                            depth:positioningChainArray.length
                        };
                        dynamicNodes[dynamicNodes.length-1].currentChildDomNode=replacer.nextSibling;
                    }else/* Component  */{
                        dynamicNodes[dynamicNodes.length-1].currentChildDomNode=replacer.nextSibling;
                    }
                    cursor++;
                }
                replacer.parentNode.removeChild(replacer);
                replacer=null;
            }
            else if(isvalidJSHON(node.children[i])/** Static Node */){
                childNode = HydrationNodeBuilder(domElementNode.childNodes[cursor],node.children[i],positioningChainArray,elements,rendering,componenet_id,true,false);
                objectElementNode.children.push(childNode.objectNode);
                dynamicNodes = dynamicNodes.concat(childNode.dynamicNodes);
                elementStyles = {
                    ...elementStyles,
                    ...childNode.elementsStyle
                };
                cursor++;
            }
            else/** Everything else is a text */{
                if(null==node.children[i]/** Null is an empty text */){
                    node.children[i] = "";
                }
                childNode = buildTextForHydration(domElementNode.childNodes[cursor],node.children[i],positioningChainArray);
                objectElementNode.children.push(childNode.objectNode);
                cursor++;
            }
        }
        return {
            domNode:domElementNode,
            objectNode:objectElementNode,
            dynamicNodes:dynamicNodes,
            elementsStyle:elementStyles
        }

    }

    function setNodeAttributesForHydration(domNode,attr,elements,rerendering,componenet_id){
        var i,keyed=false;
        var listeners = [];
        var attributes = {};
        var classNames = [];
        if(typeof (attr.key)!="string"||attr.key.length<1){
            attr.key=symbolIdentifier+componenet_id.id;
        }
        var refKey = attr.key,keyed=true;
            
        if(elements[refKey]){
            var refElAttrKeys = Object.keys(elements[refKey]);
            //Set any other attribute from `keyed element`
            for(i=0;i<refElAttrKeys.length;i++){
                if(typeof (elements[refKey][refElAttrKeys[i]])=="function"){
                    domNode[refElAttrKeys[i]] = elements[refKey][refElAttrKeys[i]];
                    attributes[refElAttrKeys[i]] = elements[refKey][refElAttrKeys[i]];
                    //Keep names of listeners set on node.
                    //Listeners are reset to `null` before 
                    //node is detached from the DOM.
                    listeners.push(refElAttrKeys[i]);
                }
            }
        }
        //New styles can be set with objects only in runtime.
        //Keep intial styles in object form instead of strings.
        var stylesObject = {},key,matched;
        if(domNode.attributes){
            if(domNode.attributes.style){
                var styles = domNode.attributes.style.value.replace(/.$/,"").split(";");
                for(i=0;i<styles.length;i++){
                    styles[i] = styles[i].split(":");
                    key = styles[i][0].match(/-[a-z]/g);
                    if(key){
                        while(key.length>0){
                            matched = key.shift();
                            styles[i][0] = styles[i][0].replace(matched,matched[1].toUpperCase());
                        }
                    }
                    stylesObject[styles[i][0]]=styles[i][1].trim();
                }
            }
            for(i=0;i<domNode.classList.length;i++){
                classNames.push(domNode.classList[i]);
            }
            var attrName ="";
            for(i=0;i<domNode.attributes.length;i++){
                attrName=domNode.attributes[i].name||domNode.attributes[i].nodeName||domNode.attributes[i].localName;
                if(["style","class"].indexOf(attrName)<0){
                    attributes[attrName] = domNode.attributes[i].value;
                }
            }
        };
        return {
            key:refKey,
            keyed:keyed,
            listeners:listeners,
            styles:stylesObject,
            attributes:attributes,
            classNames:classNames
        }
    }

    function buildText(text,positioningChainArray,textNode){
        text = text+"";
        return {
            domNode:textNode?textNode:document.createTextNode(text),
            objectNode:{
                type:"text",
                children:[],
                data:{},
                positioningChainArray:positioningChainArray,
                depth:positioningChainArray.length,
                textValue:text
            }
        }
    
    }

    function buildTextForHydration(textNode,text,positioningChainArray){
        return buildText(text,positioningChainArray,textNode);
    }

    /**
     * 
     * @param {HTMLElement} domNode 
     * @param {*} attr 
     * @param {*} elements 
     */
     function setInitialNodeAttributes(domNode,attr,elements,componenet_id){
        var attrkeys = Object.keys(attr);
        var styleSet = false;
        var classSet = false;
        var i,keyed=false;
        var listeners = [];
        var attributes = {};
        var classNames = [];
        var valueType;
        if((styleSet=attrkeys.indexOf("style"))>=0){
            attrkeys.splice(styleSet,1);
            if(typeof (attr.style)=="string"){
                //Set styles from JSHON.attr
                domNode.style = attr.style;
            }
        }
        styleSet = false;
        if((classSet=attrkeys.indexOf("class"))>=0){
            attrkeys.splice(classSet,1);
            classSet = true;
        }else{
            classSet = false;
        }
        if(typeof (attr.key)!="string"||attr.key.length<1){
            attr.key=symbolIdentifier+componenet_id.id;
        }else{
            attrkeys.splice(attrkeys.indexOf("key"),1);
        }
        //if(typeof (attr.key)=="string"&&attr.key.length>0/** If node was keyed */){
            var refKey = attr.key,keyed=true;
            
            if(elements[refKey]){
                var refElAttrKeys = Object.keys(elements[refKey]);
                if(typeof (elements[refKey].class)=="string"&&elements[refKey].class.length>0){
                    refElAttrKeys.splice(refElAttrKeys.indexOf("class"),1);
                    if(classSet){
                        //Join classnames set on `keyed element` with
                        //those from JSHON.attr
                        attr.class+=" "+elements[refKey].class;
                    }else{
                        attr.class=elements[refKey].class;
                    }
                    classSet = true;
                    
                }
                if(typeof (elements[refKey].style)=="object"&&null!=elements[refKey].style){
                    refElAttrKeys.splice(refElAttrKeys.indexOf("style"),1);
                    var styleKeys = Object.keys(elements[refKey].style);
                    //Set styles from `keyed element`
                    for(i=0;i<styleKeys.length;i++){
                        domNode.style[styleKeys[i]]=elements[refKey].style[styleKeys[i]];
                    }
                    styleSet=true;
                }
                //Set any other attribute from `keyed element`
                for(i=0;i<refElAttrKeys.length;i++){
                    valueType = typeof (elements[refKey][refElAttrKeys[i]]);
                    if(valueType=="string"){
                        domNode.setAttribute(refElAttrKeys[i],elements[refKey][refElAttrKeys[i]]);
                    }else{
                        domNode[refElAttrKeys[i]] = elements[refKey][refElAttrKeys[i]];
                    }
                    attributes[refElAttrKeys[i]] = elements[refKey][refElAttrKeys[i]];
                    if(valueType=="function"){
                        
                        //Keep names of listeners set on node.
                        //Listeners are reset to `null` before 
                        //node is detached from the DOM.
                        listeners.push(refElAttrKeys[i]);
                    }
                }
            }
            
        //}
        if(classSet){
            //Set the class attribute
            domNode.setAttribute("class",attr.class);
            for(i=0;i<domNode.classList.length;i++){
                classNames.push(domNode.classList[i]);
            }
        }
        //Set any other attribute from JSHON object
        for(i=0;i<attrkeys.length;i++){
            valueType = typeof (attr[attrkeys[i]]);
            if(valueType=="string"){
                domNode.setAttribute(attrkeys[i],attr[attrkeys[i]]);
            }else{
                domNode[attrkeys[i]] = attr[attrkeys[i]];
            }
            attributes[attrkeys[i]] = attr[attrkeys[i]];
            if(valueType=="function"){
                //Keep names of listeners set on node.
                //Listeners are reset to `null` before 
                //node is detached from the DOM.
                if(listeners.indexOf(attrkeys[i])<0){
                    listeners.push(attrkeys[i]);
                }
            }
        }
        
        //New styles can be set with objects only in runtime.
        //Keep intial styles in object form instead of strings.
        var stylesObject = {},key,matched;
        if(domNode.attributes.style){
            var styles = domNode.attributes.style.value.replace(/.$/,"").split("; ");
            for(i=0;i<styles.length;i++){
                styles[i] = styles[i].split(":");
                key = styles[i][0].match(/-[a-z]/g);
                if(key){
                    while(key.length>0){
                        matched = key.shift();
                        styles[i][0] = styles[i][0].replace(matched,matched[1].toUpperCase());
                    }
                }
                stylesObject[styles[i][0]]=styles[i][1].trim();
            }
        }
        return {
            key:refKey,
            keyed:keyed,
            listeners:listeners,
            styles:stylesObject,
            attributes:attributes,
            classNames:classNames
        }
     }
     function setNodeAttributesForRerenders(domNode,attr,elements,componenet_id){
        if(typeof (attr.key)!="string"||attr.key.length<1){
            attr.key = symbolIdentifier+componenet_id.id;
        }
        if(elements[attr.key]){
            if(elements[attr.key].classNames.length>0){
                domNode.setAttribute("class",elements[attr.key].classNames.join(" "));
            }
            var nodeStylesKeys = Object.keys(elements[attr.key].styles),i;
            for(i=0;i<nodeStylesKeys.length;i++){
                domNode.style[nodeStylesKeys[i]]=elements[attr.key].styles[nodeStylesKeys[i]];
            }
            var nodeAttrKeys = Object.keys(elements[attr.key].attributes),index,valueType;;
            if(nodeAttrKeys.length>0){
                index = nodeAttrKeys.indexOf("style");
                if(index>-1){
                    nodeAttrKeys.splice(index,1);
                }
                index = nodeAttrKeys.indexOf("class");
                if(index>-1){
                    nodeAttrKeys.splice(index,1);
                }
                for(i=0;i<nodeAttrKeys.length;i++){
                    valueType = typeof (elements[attr.key].attributes[nodeAttrKeys[i]]);
                    index = elements[attr.key].listeningKeys.indexOf(nodeAttrKeys[i]);
                    if(index<0){
                        if(valueType=="function"){
                            elements[attr.key].listeningKeys.push(nodeAttrKeys[i]);
                            domNode[nodeAttrKeys[i]] = elements[attr.key].attributes[nodeAttrKeys[i]];
                        }else{
                            if(valueType=="string"){
                                domNode.setAttribute(nodeAttrKeys[i],elements[attr.key].attributes[nodeAttrKeys[i]])
                            }else{
                                domNode[nodeAttrKeys[i]] = elements[attr.key].attributes[nodeAttrKeys[i]];
                            }
                        }
                    }else{
                        if(valueType!="function"){
                            elements[attr.key].listeningKeys.splice(index,1);
                            if(valueType=="string"){
                                domNode.setAttribute(nodeAttrKeys[i],elements[attr.key].attributes[nodeAttrKeys[i]])
                            }else{
                                domNode[nodeAttrKeys[i]] = elements[attr.key].attributes[nodeAttrKeys[i]];
                            }
                        }else{
                            domNode[nodeAttrKeys[i]] = elements[attr.key].attributes[nodeAttrKeys[i]];
                        }
                    }
                }
            }
        }
     }
    /**
     * 
     * @param {HTMLElement} domNode 
     * @param {*} attr 
     * @param {*} elements 
     */
    function setNodeAttributes(domNode,attr,elements,rerendering,componenet_id){
        if(!rerendering/** Initial builds or Refresh builds */){
           return setInitialNodeAttributes(domNode,attr,elements,componenet_id)
        }else/** Re-renders reuse current node attributes */ {
            setNodeAttributesForRerenders(domNode,attr,elements,componenet_id)
        }
        
    }
    function takeArguments(){
        return arguments;
    }
    function RenderNewPage(){
        var newpage=false;
        if(renderCycle.newPage.id){
            //Ignore new page render if the new page to be rendered is same as the current page.
            if(renderCycle.newPage.id!=standAloneApps[symbolIdentifier].currentPage){
                var currentPageId = standAloneApps[symbolIdentifier].currentPage;
                var currentPage = states[currentPageId][symbolIdentifier].domNode;
                var currentPageParentNode = currentPage.parentNode;
                var pageExitRegisteredComponents = Object.keys(standAloneApps[symbolIdentifier].onpageExit[currentPageId]);
                for(var i=0;i<pageExitRegisteredComponents.length;i++){
                    //OnPageExit Events
                    standAloneApps[symbolIdentifier].onpageExit[currentPageId][pageExitRegisteredComponents[i]]
                    .apply(states[pageExitRegisteredComponents[i]])
                }
                standAloneApps[symbolIdentifier].onpageExit[currentPageId]={};
                var pagePosition = document.createTextNode("");
                currentPageParentNode.insertBefore(pagePosition,currentPage);
                standAloneApps[symbolIdentifier].visitedPages[currentPageId]=true;
                destroyComponent(currentPageId,false);
                standAloneApps[symbolIdentifier].currentPage = renderCycle.newPage.id;
                $Render(
                    states[renderCycle.newPage.id][symbolIdentifier].ref,
                   // renderCycle.newPage.getArgs(takeArguments)
                   undefined
                );
                if(pagePosition.nextSibling==currentPage){
                    currentPageParentNode.removeChild(currentPage);
                }
                currentPageParentNode.replaceChild(
                    states[renderCycle.newPage.id][symbolIdentifier].domNode,
                    pagePosition
                );
                currentPageId = renderCycle.newPage.id;
                if(renderCycle.newPage.firstRender){
                    window.scrollTo({top:0});
                }
                renderCycle.newPage.firstRender=undefined;
                renderCycle.newPage.id = currentPage = pagePosition = currentPageParentNode = null;
                renderCycle.queue=[];
                newpage=true;
            }
            //Same component may be used to render many pages with different args/props.
            //The window location's href may need to be changed to reflect changes
            if(renderCycle.newPage.pageName!=standAloneApps[symbolIdentifier].currentPageName){
                standAloneApps[symbolIdentifier].currentPageName=renderCycle.newPage.pageName;
                if(!renderCycle.newPage.isPoppedState){
                    var state_data = typeof(renderCycle.newPage.getArgs)=="function"?
                    renderCycle.newPage.getArgs():renderCycle.newPage.getArgs;
                    history.pushState(state_data,"",standAloneApps[symbolIdentifier].currentPageName);
                }
            }
            renderCycle.newPage.pageName="";
            renderCycle.newPage.isPoppedState=false;

        }
        return newpage;
    };
    function PerformBatchUpdatingTasks(){
        renderCycle.renderingMode=true;
        var newpage=RenderNewPage();
        var next,page=standAloneApps[symbolIdentifier].currentPage;
       if(!newpage){
            while(renderCycle.queue.length>0){
                next = renderCycle.queue.shift();
                if(states[next][symbolIdentifier].ownerPage==page){
                    $Render(states[next][symbolIdentifier].ref,renderCycle.refresh[next]?renderCycle.refresh[next]:symbolIdentifier);
                }
                
            }
       }
        var styleKeys,currentStyles,elementKeys,i,k;
        var ids = Object.keys(renderCycle.attributes),j;
        var newStyles,newAttrs,element,value,current,index;
        var addClassnames,removeClassnames,currentClassnames;
        var updateClassnames=false;
        for(j=0;j<ids.length;j++){
            
            elementKeys = Object.keys(renderCycle.attributes[ids[j]]);
            if(!newpage&&!states[ids[j]][symbolIdentifier].isDestroyed&&states[ids[j]][symbolIdentifier].ownerPage==page){
                for(k=0;k<elementKeys.length;k++){
                    element=null;
                    if(states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]]){
                        //Styles
                        currentStyles = states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].styles;
                        newStyles = renderCycle.attributes[ids[j]][elementKeys[k]].styles;
                        styleKeys = Object.keys(newStyles);
                        if(styleKeys.length>0){
                            element = findDomNode(
                                states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].positioningChainArray,
                                states[ids[j]][symbolIdentifier].domNode
                            );
                            for(i=0;i<styleKeys.length;i++){
                                newStyles[styleKeys[i]] = (newStyles[styleKeys[i]]+"").trim();
                                if(currentStyles[styleKeys[i]]!=newStyles[styleKeys[i]]){
                                    currentStyles[styleKeys[i]] = newStyles[styleKeys[i]];
                                    element.style[styleKeys[i]] = newStyles[styleKeys[i]];
                                }
                            }
                        }
                        //Classnames
                        currentClassnames = states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].classNames;
                        addClassnames = Object.keys(renderCycle.attributes[ids[j]][elementKeys[k]].classNames.add);
                        removeClassnames = Object.keys(renderCycle.attributes[ids[j]][elementKeys[k]].classNames.remove);
                        for(i=0;i<removeClassnames.length;i++){
                            index = currentClassnames.indexOf(removeClassnames[i]);
                            if(index>-1){
                                updateClassnames = true;
                                currentClassnames.splice(index,1);
                            }
                            index = addClassnames.indexOf(removeClassnames[i]);
                            if(index>-1){
                                addClassnames.splice(index,1);
                            }
                        }
                        if(addClassnames.length>0){
                            for(i=0;i<addClassnames.length;i++){
                                if(currentClassnames.indexOf(addClassnames[i])<0){
                                    updateClassnames = true;
                                    currentClassnames.push(addClassnames[i]);
                                }
                            }
                        }
                        if(updateClassnames){
                            if(!element){
                                element = findDomNode(
                                    states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].positioningChainArray,
                                    states[ids[j]][symbolIdentifier].domNode
                                );
                            }
                            element.setAttribute("class",currentClassnames.join(" "));
                        }
    
                        //Attributes
                        newAttrs = Object.keys(renderCycle.attributes[ids[j]][elementKeys[k]].attributes);
                        index = newAttrs.indexOf("style");
                        if(index>-1){
                            //Styles can only be set with `setStyles()`
                            newAttrs.splice(index,1);
                        }
                        index = newAttrs.indexOf("class");
                        if(index>-1){
                            //Classnames can only be set with `setClass()`
                            newAttrs.splice(index,1);
                        }
                        if(newAttrs.length>0){
                            if(!element){
                                element = findDomNode(
                                    states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].positioningChainArray,
                                    states[ids[j]][symbolIdentifier].domNode
                                );
                            }
                            current = states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].attributes;
                            for(i=0;i<newAttrs.length;i++){
                                value = renderCycle.attributes[ids[j]][elementKeys[k]].attributes[newAttrs[i]];
                                if(value!=current[newAttrs[i]]){
                                    current[newAttrs[i]] = value;
                                    if(typeof(value)=="string"){
                                        element.setAttribute(newAttrs[i],value);
                                    }else{
                                        element[newAttrs[i]] = value;
                                        index = states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]]
                                        .listeningKeys.indexOf(newAttrs[i]);
                                        if(index<0){
                                            if(typeof (value)=="function"){
                                                states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]]
                                                .listeningKeys.push(newAttrs[i])
                                            }
                                        }else{
                                            if(typeof (value)!="function"){
                                                states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]]
                                                .listeningKeys.splice(index,1);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                } 
            }else{
                //Apply changes to components' objects and re-apply to actual nodes when
                //re-rendiring or page is revisited.
                for(k=0;k<elementKeys.length;k++){
                    if(states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]]){
                        //Styles
                        states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].styles = {
                            ...states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].styles,
                            ...renderCycle.attributes[ids[j]][elementKeys[k]].styles
                        }
                        //Classnames
                        currentClassnames = states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].classNames;
                        addClassnames = Object.keys(renderCycle.attributes[ids[j]][elementKeys[k]].classNames.add);
                        removeClassnames = Object.keys(renderCycle.attributes[ids[j]][elementKeys[k]].classNames.remove);
                        for(i=0;i<removeClassnames.length;i++){
                            index = currentClassnames.indexOf(removeClassnames[i]);
                            if(index>-1){
                                currentClassnames.splice(index,1);
                            }
                            index = addClassnames.indexOf(removeClassnames[i]);
                            if(index>-1){
                                addClassnames.splice(index,1);
                            }
                        }
                        if(addClassnames.length>0){
                            for(i=0;i<addClassnames.length;i++){
                                if(currentClassnames.indexOf(addClassnames[i])<0){
                                    currentClassnames.push(addClassnames[i]);
                                }
                            }
                        }
                        //Attributes
                        newAttrs = renderCycle.attributes[ids[j]][elementKeys[k]].attributes;
                        states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].attributes = {
                            ...states[ids[j]][symbolIdentifier].keyedElements[elementKeys[k]].attributes,
                            ...renderCycle.attributes[ids[j]][elementKeys[k]].attributes
                        }
                    }
                }
                
            }
        } 
        if(!newpage){
            for(i=0;i<outOfScopeTasks.write.length;i++){
                outOfScopeTasks.write[i]();
            }
        }
        outOfScopeTasks.write=[];
        renderCycle.on=false;
        renderCycle.renderingMode=false;
        renderCycle.register = {};
        renderCycle.refresh = {};
        renderCycle.attributes = {};
        renderCycle.update = {};
        if(standAloneApps[symbolIdentifier].visitedPages[page]){
            var pageRerenderRegisteredComponents=Object.keys(standAloneApps[symbolIdentifier].onNewPage[page]);
            for(i=0;i<pageRerenderRegisteredComponents.length;i++){
                //OnPageRerendered Events
                standAloneApps[symbolIdentifier].onNewPage[page][pageRerenderRegisteredComponents[i]]
                .apply(states[pageRerenderRegisteredComponents[i]]);
            }
        }
        standAloneApps[symbolIdentifier].onNewPage[page]={};
        
    }

    function findDomNode(positioningChainArray,domNode){
        var i;
        for(i=1;i<positioningChainArray.length;i++){
            domNode = domNode.childNodes[positioningChainArray[i]];
        }
        return domNode;
    }
    
    function destroyComponent(id,refresh,ignoreDetachEvent){
        if(!states[id][symbolIdentifier].isDestroyed){
            if(states[id].onDetach&&!ignoreDetachEvent){
                states[id].onDetach.apply(states[id]);
            }
            
            states[id].onDetach=null;
            states[id][symbolIdentifier].isDestroyed=true;
            var clear = refresh||states[id][symbolIdentifier].destroy;
            if(clear||!states[id][symbolIdentifier].keepOnDetach){
                var component = setNonEnumerableObjectProperty({},symbolIdentifier,{
                    parent:0,
                    parentDNode:undefined,
                    id:states[id][symbolIdentifier].id,
                    firstCall:false,
                    childComponents:[],
                    sharingState:states[id][symbolIdentifier].sharingState,
                    isInserted:false,
                    detached:false,
                    dynamicNodes:[],
                    domNode:null,
                    objectNode:null,
                    ownerPage:states[id][symbolIdentifier].ownerPage,
                    keepStateOnDetach:states[id][symbolIdentifier].keepStateOnDetach,
                    keepOnDetach:states[id][symbolIdentifier].keepOnDetach,
                    destroy:states[id][symbolIdentifier].destroy,
                    isDestroyed:true,
                    data:states[id][symbolIdentifier].data,
                    classType:states[id][symbolIdentifier].classType,
                    created:true,
                    keyedElements:clear?{}:states[id][symbolIdentifier].keyedElements,
                    cleared:clear,
                    ref:setNonEnumerableObjectProperty({},symbolIdentifier,states[id][symbolIdentifier].ref[symbolIdentifier])
                });
                setFreezedObjectProperty(component,"keepStateOnDetach",keepStateOnDetach);
                setFreezedObjectProperty(component,"keepOnDetach",keepOnDetach);
                setFreezedObjectProperty(component,"resetAttrOnDetach",destroyOnDetach);
                setFreezedObjectProperty(component,"destroyOnDetach",destroyOnDetach);
                if(states[id][symbolIdentifier].keepStateOnDetach&&states[id].state){
                    component.state = {...states[id].state};
                }
                component.public = states[id].public?{...states[id].public}:{};
                var element,i;
                var listeningKeys,j;
                for(i in states[id][symbolIdentifier].keyedElements){
                    if(
                        states[id][symbolIdentifier].keyedElements[i].listeningKeys.length>0
                        /** If a method/listener is set on the element */
                    ){
                        listeningKeys = states[id][symbolIdentifier].keyedElements[i].listeningKeys;
                        //Locate the element
                        element = findDomNode(
                            states[id][symbolIdentifier].keyedElements[i].positioningChainArray,
                            states[id][symbolIdentifier].domNode
                        );
                        //Set the method/listener to null
                        for(j=0;j<listeningKeys.length;j++){
                            element[listeningKeys[j]]=null;
                        }
                    }
                }
                var dynamicNodes = states[id][symbolIdentifier].dynamicNodes;
                for(i=0;i<dynamicNodes.length;i++){
                    if(
                        Array.isArray(dynamicNodes[i].currentChildObjectNode)
                        /** List */
                    ){
                        for(j=0;j<dynamicNodes[i].currentChildObjectNode.length;j++){
                            if(
                                dynamicNodes[i].currentChildObjectNode[j][componentsIdentifier]
                                /** Child component */
                            ){
                                destroyComponent(dynamicNodes[i].currentChildObjectNode[j][componentsIdentifier],refresh,ignoreDetachEvent);
                            }
                        }
                    }else if(
                        dynamicNodes[i].currentChildObjectNode[componentsIdentifier]
                        /** Child component */
                    ){
                        destroyComponent(dynamicNodes[i].currentChildObjectNode[componentsIdentifier],refresh,ignoreDetachEvent);
                    }
                    dynamicNodes[i].currentChildDomNode=null;
                    dynamicNodes[i].currentChildObjectNode=null;
                    dynamicNodes[i].node=null;
                }
                states[id][symbolIdentifier].domNode = null;
                states[id] = component;
            }else{
                var element,i;
                var listeningKeys,j;
                if(states[id][symbolIdentifier].domNode&&states[id][symbolIdentifier].domNode.parentNode){
                    var parentId=states[id][symbolIdentifier].parent,
                    dNodeId=states[id][symbolIdentifier].parentDNode,
                    listPosition=states[id][symbolIdentifier].listPosition;
                    if(states[parentId][symbolIdentifier].keepOnDetach){
                        var text = buildText("",states[parentId][symbolIdentifier].dynamicNodes[dNodeId].positioningChainArray);
                        states[id][symbolIdentifier].domNode.replaceWith(text.domNode);
                        if(typeof (listPosition)=="number"){//A list node
                            states[parentId][symbolIdentifier].dynamicNodes[dNodeId].currentChildObjectNode[listPosition]=text.objectNode;
                            if(listPosition==0){
                                states[parentId][symbolIdentifier].dynamicNodes[dNodeId].currentChildDomNode=text.domNode;
                            }
                        }else{
                            states[parentId][symbolIdentifier].dynamicNodes[dNodeId].currentChildDomNode=text.domNode;
                            states[parentId][symbolIdentifier].dynamicNodes[dNodeId].currentChildObjectNode=text.objectNode;
                        }
                        
                    }else{
                        states[id][symbolIdentifier].domNode.parentNode.removeChild(states[id][symbolIdentifier].domNode);
                    }
                    parentId=states[id][symbolIdentifier].parent=0,
                    dNodeId=states[id][symbolIdentifier].parentDNode=undefined;
                    states[id][symbolIdentifier].listPosition=undefined;
                }
                var dynamicNodes = states[id][symbolIdentifier].dynamicNodes;
                for(i=0;i<dynamicNodes.length;i++){
                    if(
                        Array.isArray(dynamicNodes[i].currentChildObjectNode)
                        /** List */
                    ){
                        for(j=0;j<dynamicNodes[i].currentChildObjectNode.length;j++){
                            if(
                                dynamicNodes[i].currentChildObjectNode[j][componentsIdentifier]
                                /** Child component */
                            ){
                                destroyComponent(dynamicNodes[i].currentChildObjectNode[j][componentsIdentifier],refresh,ignoreDetachEvent);
                            }
                        }
                    }else if(
                        dynamicNodes[i].currentChildObjectNode[componentsIdentifier]
                        /** Child component */
                    ){
                        destroyComponent(dynamicNodes[i].currentChildObjectNode[componentsIdentifier],refresh,ignoreDetachEvent);
                    }
                }
            }
            if(renderCycle.register[id]){
                renderCycle.queue.splice(renderCycle.queue.indexOf(id),1);
                renderCycle.register[id] = null;
            }
        }
    }
    
    function ComponentRef(){
        componentsCount++;
        var data = {};
        data[symbolIdentifier]=componentsCount;
        states[componentsCount] = setNonEnumerableObjectProperty({},symbolIdentifier,{
            parent:0,
            parentDNode:undefined,
            id:componentsCount,
            firstCall:false,
            childComponents:[],
            sharingState:[],
            isInserted:false,
            detached:false,
            dynamicNodes:[],
            domNode:null,
            objectNode:null,
            ownerPage:standAloneApps[symbolIdentifier].currentPage,
            keepNodeOnDetach:false,
            keepStateOnDetach:false,
            keepOnDetach:false,
            destroy:false,
            isDestroyed:true,
            data:data,
            classType:this[symbolIdentifier].classType,
            created:false,
            keyedElements:{},
            ref:setNonEnumerableObjectProperty({},symbolIdentifier,setFreezedObjectProperties({},{
                classType:this[symbolIdentifier].classType,
                id:componentsCount
            })),
    
        });
        setFreezedObjectProperty(states[componentsCount],"keepStateOnDetach",keepStateOnDetach)
        setFreezedObjectProperty(states[componentsCount],"keepOnDetach",keepOnDetach)
        setFreezedObjectProperty(states[componentsCount],"resetAttrOnDetach",destroyOnDetach);
        setFreezedObjectProperty(states[componentsCount],"destroyOnDetach",destroyOnDetach);
        data=null;
        
        return  states[componentsCount][symbolIdentifier].ref;
    };
    
    function scopedComponent(componentsCount){
        return function ComponentInstance(){
            return $Render(states[componentsCount][symbolIdentifier].ref,arguments);
        }
    }
    
    function startNewCycle(){
        
        if(!renderCycle.on){
            renderCycle.on=true;
            setTimeout(requestFrame,50);
        } 
    }
    function triggerOnRerenderEvents(){
        var i; 
        for(i in renderCycle.update){
            if(typeof (states[renderCycle.update[i]].beforeUpdate)=="function"){
                states[renderCycle.update[i]].beforeUpdate.apply(states[renderCycle.update[i]]);
            }
        }
        PerformBatchUpdatingTasks();
    }
    var requestFrame = window.requestAnimationFrame?function requestRenderingFrame_1(){
        requestAnimationFrame(triggerOnRerenderEvents);
    }:function requestRenderingFrame_2(){
        triggerOnRerenderEvents();
    };
    
    function setStateRenderer(componentsCount){
        startNewCycle();
        if(!renderCycle.register[componentsCount]){
            renderCycle.register[componentsCount] = componentsCount;
            renderCycle.queue.push(componentsCount);
            renderCycle.update[componentsCount] = componentsCount;
        }
    }
    function $PerformHydrationTask(componentInfo,args,domNode,listhead){
        var componentsCount = componentInfo[symbolIdentifier].id;
        var componentType = componentInfo[symbolIdentifier].classType; 
        states[componentsCount][symbolIdentifier].firstCall=true;
        var jshon = componentTypes[componentType].fn.apply(states[componentsCount],args);
        var mainNode = HydrationNodeBuilder(domNode,jshon,[0],states[componentsCount].elements||{},false,{id:componentsCount},false,listhead);
        states[componentsCount][symbolIdentifier].keyedElements = mainNode.elementsStyle;
        states[componentsCount][symbolIdentifier].dynamicNodes = mainNode.dynamicNodes;
        states[componentsCount][symbolIdentifier].domNode = mainNode.domNode;
        states[componentsCount][symbolIdentifier].objectNode = mainNode.objectNode;
        states[componentsCount][symbolIdentifier].ownerPage = standAloneApps[symbolIdentifier].currentPage;
        states[componentsCount][symbolIdentifier].isDestroyed=false;
        states[componentsCount][symbolIdentifier].created = true;
        //states[componentsCount][symbolIdentifier].refresh = true;
        if(
            typeof (states[componentsCount].onCreation)=="function"
        ){
            states[componentsCount].onCreation.apply(states[componentsCount],args);
        }
        states[componentsCount].onCreation=null;
        states[componentsCount].sharedState=buildSharedState(componentsCount);
        if(typeof (states[componentsCount].onParentCall)=="function"){
            states[componentsCount].onParentCall.apply(states[componentsCount],args);
        }
        if(states[componentsCount].elements){
            states[componentsCount].elements={};
        };
        var value,valueType,j;
        var list,currentNode;
        var dynamicNodes = states[componentsCount][symbolIdentifier].dynamicNodes,i;
        for(i=0;i<dynamicNodes.length;i++){
            value = dynamicNodes[i].node.apply(states[componentsCount],states[componentsCount].state?undefined:args);
            valueType = typeof (value);
            if(valueType=="object"){
                if(null==value){

                }else if(value[componentsIdentifier]){
                    states[value[componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].parent = componentsCount;
                    states[value[componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].parentDNode = i;
                    value = $PerformHydrationTask(value[componentsIdentifier].ref,value[componentsIdentifier].args,dynamicNodes[i].currentChildDomNode);
                    dynamicNodes[i].currentChildDomNode=null;
                    dynamicNodes[i].currentChildObjectNode=value;
                }else if(Array.isArray(value)){
                    if(value.length>0){
                        list=[];
                        currentNode = dynamicNodes[i].currentChildDomNode;
                        valueType = typeof (value[0]);
                        if(valueType=="object"){
                            if(null==value[0]||!currentNode.attributes){
                                list.push("");
                            }else if(value[0][componentsIdentifier]){
                                states[value[0][componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].parent = componentsCount;
                                states[value[0][componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].parentDNode = i;
                                states[value[0][componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].listPosition = list.length;
                                list.push(
                                    $PerformHydrationTask(value[0][componentsIdentifier].ref,value[0][componentsIdentifier].args,currentNode,{id:i})
                                );
                                
                            }else if(Array.isArray(value[0])){

                            }else{
                                list.push(value[0]+"");
                            }
                        }else{
                            list.push(value[0]+"");
                        }
                        for(j=1;j<value.length;j++){
                            currentNode = currentNode.nextSibling;
                            valueType = typeof (value[j]);
                            if(valueType=="object"){
                                if(null==value[j]){
                                    list.push("");
                                }else if(value[j][componentsIdentifier]){
                                    states[value[j][componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].parent = componentsCount;
                                    states[value[j][componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].parentDNode = i;
                                    states[value[j][componentsIdentifier].ref[symbolIdentifier].id][symbolIdentifier].listPosition = list.length;
                                    list.push(
                                        $PerformHydrationTask(value[j][componentsIdentifier].ref,value[j][componentsIdentifier].args,currentNode)
                                    );
                                    
                                }
                            }else{
                                list.push(value[j]+"");
                            }
                        }
                        dynamicNodes[i].currentChildObjectNode=list;
                    }
                }
            }
        }
        return setNonEnumerableObjectProperty({},componentsIdentifier,componentsCount);
    };
    function $Render(componentInfo,args){
        if(!JSHONHydrate){
            $Render = $MainRender;
            return $Render(componentInfo,args);
        }
        return setNonEnumerableObjectProperty({},componentsIdentifier,{ref:componentInfo,args:args});
    }
    function $MainRender(componentInfo,args){
        var componentsCount = componentInfo[symbolIdentifier].id;
        var componentType = componentInfo[symbolIdentifier].classType;
        var mainNode,oldView,rerendering;
        var i=0,j,fromParent=args!=symbolIdentifier;
        if(!states[componentsCount][symbolIdentifier].firstCall){
            if(states[componentsCount][symbolIdentifier].refresh){
                var refresh = true;
                states[componentsCount][symbolIdentifier].refresh = false;
                oldView = states[componentsCount][symbolIdentifier].domNode;
                destroyComponent(componentsCount,refresh);
                fromParent=false;
            }
            states[componentsCount][symbolIdentifier].firstCall=true;
            var jshon = componentTypes[componentType].fn.apply(states[componentsCount],args);
            rerendering = states[componentsCount][symbolIdentifier].created&&!states[componentsCount][symbolIdentifier].cleared;
            states[componentsCount][symbolIdentifier].cleared=false;
            if(rerendering){
                mainNode = buildNode(jshon,[0],states[componentsCount][symbolIdentifier].keyedElements,true,{id:componentsCount});
            }else{
                mainNode = buildNode(jshon,[0],states[componentsCount].elements||{},false,{id:componentsCount});
                states[componentsCount][symbolIdentifier].keyedElements = mainNode.elementsStyle;
            }
            states[componentsCount][symbolIdentifier].dynamicNodes = mainNode.dynamicNodes;
            states[componentsCount][symbolIdentifier].domNode = mainNode.domNode
            states[componentsCount][symbolIdentifier].objectNode = mainNode.objectNode
            states[componentsCount][symbolIdentifier].domNodeChanged=true;
            states[componentsCount][symbolIdentifier].ownerPage=standAloneApps[symbolIdentifier].currentPage;
            
            
            states[componentsCount][symbolIdentifier].detached=false;
            
            if(oldView){
                oldView.parentNode.replaceChild(mainNode.domNode,oldView);
            }
            //Trigger events
            if(!states[componentsCount][symbolIdentifier].created){
                states[componentsCount][symbolIdentifier].created = true;
                if(
                    typeof (states[componentsCount].onCreation)=="function"
                ){
                    states[componentsCount].onCreation.apply(states[componentsCount],args);
                }
            }
            states[componentsCount].sharedState=buildSharedState(componentsCount);
            states[componentsCount].initArgs=undefined;
            states[componentsCount].onCreation=null;
            if(states[componentsCount].elements){
                states[componentsCount].elements={};
            }
        }else if(states[componentsCount][symbolIdentifier].refresh||Internal.pageRerendering){
            states[componentsCount][symbolIdentifier].firstCall = false;
            return $Render(componentInfo,args);
        }
        states[componentsCount][symbolIdentifier].isDestroyed=false;
            //Trigger events
            if(fromParent/** Not a SetState() call */){
                if(typeof (states[componentsCount].onParentCall)=="function"){
                    states[componentsCount].onParentCall.apply(states[componentsCount],args);
                }
            }else
            /** Refresh calls Render() with arguments */
            /** SetState calls must Render() without arguments */{
                args = refresh?args:undefined;
            };
            
    
            var x,y,m;
            var append;
            var unique;
            var current;
            var newNode;
            var replacer;
            var lastNode;
            var topBoundary;
            var domFragment;
            var objectArray;
            var ownBoundary;
            var newComponent;
            var bottomBoundary;
            var valueType,value;
            var currentComponent;
            var topLen,bottomLen;
            var dynamicObectNode;
            var disposedTextNodes;
            var currentObjectArray;
            var listComponentsToDestroy;
            var dynamicNodes = states[componentsCount][symbolIdentifier].dynamicNodes;
            for(i=0;i<dynamicNodes.length;i++){
                value = dynamicNodes[i].node.apply(states[componentsCount],states[componentsCount].state?undefined:args);
                
                valueType = typeof (value);
                if(valueType=="object"){
                    if(!value/** is NULL */){
                        if(dynamicNodes[i].currentChildDomNode/** Current node is a text or a list */){
                            if(dynamicNodes[i].currentChildObjectNode.type=="text"/** ...is a text */){
                                if(
                                    /** NULL is same as empty string */
                                    dynamicNodes[i].currentChildDomNode.nodeValue!=""
                                    /** If only the new text is not same as current */
                                ){
                                    dynamicNodes[i].currentChildDomNode.textContent = "";
                                }
                            }else/** Might be a list */{
                                bottomBoundary = dynamicNodes[i].currentChildDomNode.nextSibling;
                                ownBoundary = document.createTextNode("");
                                dynamicNodes[i].currentChildDomNode[tempIdentifier]=0;
                                currentObjectArray = dynamicNodes[i].currentChildObjectNode;
                                for(j=1;j<currentObjectArray.length;j++){
                                    bottomBoundary[tempIdentifier]=j;
                                    bottomBoundary = bottomBoundary.nextSibling;
                                }
                                dynamicNodes[i].currentChildDomNode.parentNode.insertBefore(ownBoundary,bottomBoundary);
                                bottomBoundary = ownBoundary;
                                lastNode = dynamicNodes[i].currentChildDomNode;
                                while(lastNode.nextSibling!=bottomBoundary){
                                    if(
                                        currentObjectArray[lastNode.nextSibling[tempIdentifier]].type!="text"
                                        /** A componenet node */
                                    ){
                                        current = currentObjectArray[lastNode.nextSibling[tempIdentifier]]
                                        [componentsIdentifier];
                                        destroyComponent(current);
                                    }
                                    lastNode.parentNode.removeChild(lastNode.nextSibling);
                                    
                                }
                                if(currentObjectArray[lastNode[tempIdentifier]].type=="text"){
                                    if(
                                        /** NULL is same as empty string */
                                        lastNode.nodeValue!=""
                                        /** If only the new text is not same as current */
                                    ){
                                        lastNode.textContent = "";
                                    }
                                }else{
                                    current = currentObjectArray[lastNode[tempIdentifier]][componentsIdentifier];
                                    componenetToText(current,dynamicNodes[i],componentsCount,"");
                                    destroyComponent(current);
                                }
                                bottomBoundary.parentNode.removeChild(bottomBoundary);
                            }
                        }else
                        /** ...is a component */
                        /** Destroy current component */ 
                        /** Replace current component with text node */ {
                            current = dynamicNodes[i].currentChildObjectNode[componentsIdentifier];
                            componenetToText(current,dynamicNodes[i],componentsCount,"");
                            destroyComponent(current);
                        }
                    }else if(value[componentsIdentifier]/** Component */){
                        /** Set parent Ref on child component */
                        
                        states[value[componentsIdentifier]][symbolIdentifier].parent = componentsCount;
                        states[value[componentsIdentifier]][symbolIdentifier].parentDNode = i;
                        newComponent = states[value[componentsIdentifier]][symbolIdentifier].domNode;
                        current = dynamicNodes[i].currentChildObjectNode[componentsIdentifier];
                        if(
                            typeof (current)=="number"
                            /** Current node is a component */
                        ){
                            if(
                                current==value[componentsIdentifier]
                                /** Same component */
                            ){
                                
                                if(
                                    !states[value[componentsIdentifier]][symbolIdentifier].domNode.isConnected&&
                                    states[value[componentsIdentifier]][symbolIdentifier].domNodeChanged
                                ){
                                    states[value[componentsIdentifier]][symbolIdentifier].domNodeChanged=false;
                                    var ddm;
                                    if(
                                        (ddm=findDomNode(dynamicNodes[i].positioningChainArray,states[componentsCount][symbolIdentifier].domNode))
                                        !=states[value[componentsIdentifier]][symbolIdentifier].domNode
                                    ){
                                        ddm.replaceWith(states[value[componentsIdentifier]][symbolIdentifier].domNode)
                                    }
                                    
                                }
                            }
                            else
                            /** Destroy current component */ 
                            /** Replace current component with new component */ {
                               
                                if(
                                    states[current][symbolIdentifier].domNode&&
                                    states[current][symbolIdentifier].domNode.parentNode
                                ){
                                    states[current][symbolIdentifier].domNode.parentNode
                                    .replaceChild(
                                        newComponent,
                                        states[current][symbolIdentifier].domNode
                                    );
                                    destroyComponent(current);
                                    dynamicNodes[i].currentChildObjectNode[componentsIdentifier]
                                    =value[componentsIdentifier];
                                }
                            }
                        }else/** Current node is not a component */ {
                            if(dynamicNodes[i].currentChildObjectNode.type=="text"/** ...is a text */){
                                if(
                                    dynamicNodes[i].currentChildDomNode&&
                                    dynamicNodes[i].currentChildDomNode.parentNode
                                ){
                                    dynamicNodes[i].currentChildDomNode.parentNode
                                    .replaceChild(newComponent,dynamicNodes[i].currentChildDomNode);
                                }
                                dynamicObectNode = findObjectNode(
                                    dynamicNodes[i].currentChildObjectNode.positioningChainArray,
                                    states[componentsCount][symbolIdentifier].objectNode
                                );
                                releaseSpace(dynamicNodes[i].currentChildObjectNode);
                                dynamicNodes[i].currentChildObjectNode=value;
                                dynamicObectNode.children[0]=value;
                                dynamicObectNode=dynamicNodes[i].currentChildDomNode=null;
                            }else/** Might be a list */ {
                                bottomBoundary = dynamicNodes[i].currentChildDomNode.nextSibling;
                                ownBoundary = document.createTextNode("");
                                dynamicNodes[i].currentChildDomNode[tempIdentifier]=0;
                                currentObjectArray = dynamicNodes[i].currentChildObjectNode;
                                for(j=1;j<currentObjectArray.length;j++){
                                    bottomBoundary[tempIdentifier]=j;
                                    bottomBoundary = bottomBoundary.nextSibling;
                                }
                                dynamicNodes[i].currentChildDomNode.parentNode.insertBefore(ownBoundary,bottomBoundary);
                                bottomBoundary = ownBoundary;
                                lastNode = dynamicNodes[i].currentChildDomNode;
                                while(lastNode.nextSibling!=bottomBoundary){
                                    if(
                                        currentObjectArray[lastNode.nextSibling[tempIdentifier]].type!="text"
                                        /** A componenet node */
                                    ){
                                        current = currentObjectArray[lastNode.nextSibling[tempIdentifier]]
                                        [componentsIdentifier];
                                        destroyComponent(current);
                                    }
                                    lastNode.parentNode.removeChild(lastNode.nextSibling);
                                }
                                if(currentObjectArray[lastNode[tempIdentifier]].type=="text"){
                                   
                                    dynamicNodes[i].currentChildDomNode.parentNode
                                    .replaceChild(newComponent,dynamicNodes[i].currentChildDomNode);
                                    findObjectNode(
                                        dynamicNodes[i].currentChildObjectNode.positioningChainArray,
                                        states[componentsCount][symbolIdentifier].objectNode
                                    ).children[0]=value;
                                    dynamicNodes[i].currentChildObjectNode=value;
                                    dynamicNodes[i].currentChildDomNode=null;
                                }else{
                                    current = currentObjectArray[lastNode[tempIdentifier]][componentsIdentifier];
                                   
                                    if(
                                        current==value[componentsIdentifier]
                                        /** Same component */
                                    ){
                                        if(
                                            !states[value[componentsIdentifier]][symbolIdentifier].domNode.isConnected&&
                                            states[value[componentsIdentifier]][symbolIdentifier].domNodeChanged
                                        ){
                                            states[value[componentsIdentifier]][symbolIdentifier].domNodeChanged=false;
                                            var ddm;
                                            if(
                                                (ddm=findDomNode(dynamicNodes[i].positioningChainArray,states[componentsCount][symbolIdentifier].domNode))
                                                !=states[value[componentsIdentifier]][symbolIdentifier].domNode
                                            ){
                                                ddm.replaceWith(states[value[componentsIdentifier]][symbolIdentifier].domNode)
                                            }
                                            
                                        }
                                    }
                                    else
                                    /** Destroy current component */ 
                                    /** Replace current component with new component */ {
                                        states[current][symbolIdentifier].domNode.parentNode
                                        .replaceChild(
                                            newComponent,
                                            states[current][symbolIdentifier].domNode
                                        );
                                        destroyComponent(current);
                                    }
                                    dynamicNodes[i].currentChildObjectNode=value;
                                    dynamicNodes[i].currentChildDomNode=null;
                                    findObjectNode(
                                        dynamicNodes[i].positioningChainArray,
                                        states[componentsCount][symbolIdentifier].objectNode
                                    ).children[0]=value;
                                }
                                bottomBoundary.parentNode.removeChild(bottomBoundary);
                            }
                        }
                        
                    }else if(
                        Array.isArray(value)
                        /** List */
                        /** Every element in a list must be a text or a component */
                        /** We'll ignore every list nested in this list */
                    ){
                        if(
                            Array.isArray(dynamicNodes[i].currentChildObjectNode)
                            /** Current node is a head of a list */
                        ){
                            if(value.length>0){
                                //Get the current list boundaries.
                                bottomBoundary = dynamicNodes[i].currentChildDomNode.nextSibling;
                                ownBoundary = document.createTextNode("");
                                dynamicNodes[i].currentChildDomNode[tempIdentifier]=0;
                                currentObjectArray = dynamicNodes[i].currentChildObjectNode;
                                for(j=1;j<currentObjectArray.length;j++){
                                    bottomBoundary[tempIdentifier]=j;
                                    bottomBoundary = bottomBoundary.nextSibling;
                                }
                                dynamicNodes[i].currentChildDomNode.parentNode.insertBefore(ownBoundary,bottomBoundary);
                                bottomBoundary = ownBoundary;
                                objectArray = [];unique={};
                                for(j=0;j<value.length;j++){
                                    if(
                                        typeof (value[j])=="object"&&
                                        value[j]&&
                                        value[j][componentsIdentifier]/** `component[componentsIdentifier]` is always >=1 */
                                        /** New node is a component */
                                    ){
                                        if(!unique[value[j][componentsIdentifier]]/** Avoid doubled-component in list */){
                                            unique[value[j][componentsIdentifier]]=true;
                                            
                                            /** Set parent Ref on child component */
                                            states[value[j][componentsIdentifier]][symbolIdentifier].parent=componentsCount;
                                            states[value[j][componentsIdentifier]][symbolIdentifier].parentDNode = i;
                                            states[value[j][componentsIdentifier]][symbolIdentifier].listPosition = objectArray.length;
                                            objectArray.push(value[j]);
                                        }
                                        
    
                                        
                                    }else/** Treat as text */ {
                                        if(
                                            value[j]==null||
                                            Array.isArray(value[j])/** Ignore nested lists */
                                        ){
                                            value[j]="";
                                        }
                                        objectArray.push(value[j]+"")
                                    }
                                }
                                /* 
                                 * Decide whether to start from the top of the list or bottom
                                 * Very useful especially when we need to append near the end 
                                 * or begining of a list.
                                */
                                x=objectArray.length,y=currentObjectArray.length;
                                m=0;topLen=0;bottomLen=0;
                                while(m<x&&m<y){
                                    if(
                                        typeof (objectArray[m])=="string"&&currentObjectArray[m].type!="text"||
                                        objectArray[m][componentsIdentifier]!=currentObjectArray[m][componentsIdentifier]
                                    ){
                                        break;
                                    }
                                    topLen++;
                                    m++;
                                }
                                x--;y--;
                                while(x>-1&&y>-1){
                                    if(
                                        typeof (objectArray[x])=="string"&&currentObjectArray[y].type!="text"||
                                        objectArray[x][componentsIdentifier]!=currentObjectArray[y][componentsIdentifier]
                                    ){
                                        break;
                                    }
                                    bottomLen++;
                                    x--;y--;
                                }
                                
                                listComponentsToDestroy = [];
                                if(topLen>=bottomLen){
                                    //parent = dynamicNodes[i].currentChildDomNode.parentNode;
                                    newNode = dynamicNodes[i].currentChildDomNode;
                                        j=0;
                                        disposedTextNodes = [];
                                        while(newNode!=bottomBoundary&&j<objectArray.length){
                                            if(
    
                                                currentObjectArray[newNode[tempIdentifier]].type=="text"
                                                /** Current node is a text */
                                            ){
                                                if(typeof (objectArray[j])=="string"/** New node is a text */){
                                                    if(objectArray[j]!=newNode.nodeValue){
                                                        newNode.textContent=objectArray[j];
                                                    }
                                                    objectArray[j]=currentObjectArray[newNode[tempIdentifier]];
                                                    lastNode = newNode;
                                                    newNode = lastNode.nextSibling;
                                                }else/** ...is a component */ {
                                                    disposedTextNodes.push(newNode);
                                                    current = objectArray[j][componentsIdentifier];
                                                    lastNode = states[current][symbolIdentifier].domNode;
                                                    newNode.parentNode.replaceChild(lastNode,newNode);
                                                    newNode = lastNode.nextSibling;
                                                }
                                                
                                            }else/** ...is a component */ {
                                                current = currentObjectArray[newNode[tempIdentifier]][componentsIdentifier];
                                                if(typeof (objectArray[j])=="string"/** New node is a text */){
                                                    if(disposedTextNodes.length>0/** Re-use disposed text nodes */){
                                                        lastNode = disposedTextNodes.pop();
                                                        lastNode.textContent = objectArray[j];
                                                        objectArray[j] = currentObjectArray[lastNode[tempIdentifier]];
                                                    }else{
                                                        lastNode = buildText(objectArray[j],[j]);
                                                        objectArray[j] = lastNode.objectNode;
                                                        lastNode = lastNode.domNode;
                                                    }
                                                    newNode.parentNode.replaceChild(lastNode,newNode);
                                                    newNode = lastNode.nextSibling;
                                                    listComponentsToDestroy.push(current);
                                                }else/** ...is a component */ {
                                                    if(current!=objectArray[j][componentsIdentifier]/** Not same component */){
                                                        lastNode = states[objectArray[j][componentsIdentifier]]
                                                        [symbolIdentifier].domNode;
                                                        newNode.parentNode.replaceChild(lastNode, newNode);
                                                        newNode = lastNode.nextSibling;
                                                        listComponentsToDestroy.push(current);
                                                    }else{
                                                        lastNode = newNode;
                                                        newNode = lastNode.nextSibling;
                                                    }
    
                                                }
                                            }
                                            if(j==0/** Head of list */){
                                                dynamicNodes[i].currentChildDomNode = lastNode;
                                            }
                                            j++;
                                        }
                                        //lastNode = getLastNode(dynamicNodes[i].currentChildDomNode,j);
                                        domFragment = document.createDocumentFragment();
                                        append = false;
                                        while(j<objectArray.length) {
                                            if(typeof (objectArray[j])=="string"/** New node is a text */){
                                                if(disposedTextNodes.length>0/** Re-use disposed text nodes */){
                                                    newNode = disposedTextNodes.pop();
                                                    newNode.textContent = objectArray[j];
                                                    objectArray[j] = currentObjectArray[newNode[tempIdentifier]];
                                                }else{
                                                    newNode = buildText(objectArray[j],[j]);
                                                    objectArray[j] = newNode.objectNode;
                                                    newNode = newNode.domNode;
                                                }
                                                domFragment.appendChild(newNode);
                                            }else/** ...is a component */ {
                                                current = objectArray[j][componentsIdentifier];
                                                newNode = states[current][symbolIdentifier].domNode;
                                                domFragment.appendChild(newNode);
                                            }
                                            j++;
                                            append=true;
                                        }
                                        if(append){
                                            append=false;
                                            newNode = domFragment.lastChild;
                                            lastNode.parentNode.insertBefore(domFragment,lastNode.nextSibling);
                                            lastNode = newNode;
                                        }
                                        if(currentObjectArray.length>objectArray.length){
                                            y=objectArray.length;
                                            while(lastNode!=bottomBoundary.previousSibling){
                                                bottomBoundary.parentNode.removeChild(bottomBoundary.previousSibling);
                                                if(typeof (currentObjectArray[y])!="string"){
                                                    if(objectArray.indexOf(currentObjectArray[y])<0){
                                                        listComponentsToDestroy.push(currentObjectArray[y][componentsIdentifier]);
                                                    }
                                                }
                                                y++;
                                            }
                                        }

                                        bottomBoundary.parentNode.removeChild(bottomBoundary);
                                        dynamicNodes[i].currentChildObjectNode = objectArray;
                                        findObjectNode(
                                            dynamicNodes[i].positioningChainArray,
                                            states[componentsCount][symbolIdentifier].objectNode
                                        ).children[0] = objectArray;
                                }else{
                                    ownBoundary = document.createTextNode("");
                                    dynamicNodes[i].currentChildDomNode.parentNode.insertBefore(
                                        ownBoundary,
                                        dynamicNodes[i].currentChildDomNode
                                    );
                                    topBoundary = ownBoundary;
                                    newNode = bottomBoundary.previousSibling;
                                        j=objectArray.length-1;
                                        disposedTextNodes = [];
                                        while(newNode!=topBoundary&&j>-1){
                                            if(
    
                                                currentObjectArray[newNode[tempIdentifier]].type=="text"
                                                /** Current node is a text */
                                            ){
                                                if(typeof (objectArray[j])=="string"/** New node is a text */){
                                                    if(objectArray[j]!=newNode.nodeValue){
                                                        newNode.textContent=objectArray[j];
                                                    }
                                                    objectArray[j]=currentObjectArray[newNode[tempIdentifier]];
                                                    lastNode = newNode;
                                                    newNode = lastNode.previousSibling;
                                                }else/** ...is a component */ {
                                                    disposedTextNodes.push(newNode);
                                                    current = objectArray[j][componentsIdentifier];
                                                    lastNode = states[current][symbolIdentifier].domNode;
                                                    newNode.parentNode.replaceChild(lastNode,newNode);
                                                    newNode = lastNode.previousSibling;
                                                }
                                                
                                            }else/** ...is a component */ {
                                                current = currentObjectArray[newNode[tempIdentifier]][componentsIdentifier];
                                                if(typeof (objectArray[j])=="string"/** New node is a text */){
                                                    if(disposedTextNodes.length>0/** Re-use disposed text nodes */){
                                                        lastNode = disposedTextNodes.pop();
                                                        lastNode.textContent = objectArray[j];
                                                        objectArray[j] = currentObjectArray[lastNode[tempIdentifier]];
                                                    }else{
                                                        lastNode = buildText(objectArray[j],[j]);
                                                        objectArray[j] = lastNode.objectNode;
                                                        lastNode = lastNode.domNode;
                                                    }
                                                    newNode.parentNode.replaceChild(lastNode,newNode);
                                                    newNode = lastNode.previousSibling;
                                                    listComponentsToDestroy.push(current);
    
                                                }else/** ...is a component */ {
                                                    if(current!=objectArray[j][componentsIdentifier]/** Not same component */){
                                                        lastNode = states[objectArray[j][componentsIdentifier]]
                                                        [symbolIdentifier].domNode;
                                                        newNode.parentNode.replaceChild(lastNode, newNode);
                                                        newNode = lastNode.previousSibling;
                                                        listComponentsToDestroy.push(current);
                                                    }else{
                                                        lastNode = newNode;
                                                        newNode = lastNode.previousSibling;
                                                    }
    
                                                }
                                            }
                                            j--;
                                        }
                                        domFragment = document.createDocumentFragment();
                                        append = false;
                                        y=j;
                                        while(j>-1) {
                                            x=y-j;
                                            if(typeof (objectArray[x])=="string"/** New node is a text */){
                                                if(disposedTextNodes.length>0/** Re-use disposed text nodes */){
                                                    newNode = disposedTextNodes.pop();
                                                    newNode.textContent = objectArray[x];
                                                    objectArray[x] = currentObjectArray[newNode[tempIdentifier]];
                                                }else{
                                                    newNode = buildText(objectArray[x],[x]);
                                                    objectArray[x] = newNode.objectNode;
                                                    newNode = newNode.domNode;
                                                }
                                                domFragment.appendChild(newNode);
                                            }else/** ...is a component */ {
                                                current = objectArray[x][componentsIdentifier];
                                                newNode = states[current][symbolIdentifier].domNode;
                                                domFragment.appendChild(newNode);
                                            }
                                            if(j==0/** Head of list */){
                                                dynamicNodes[i].currentChildDomNode = lastNode;
                                            }
                                            j--;
                                            append=true;
                                        }
                                        if(append){
                                            append=false;
                                            newNode = domFragment.firstChild;
                                            lastNode.parentNode.insertBefore(domFragment,lastNode);
                                            lastNode = newNode;
                                        }
                                        if(currentObjectArray.length>objectArray.length){
                                            y=objectArray.length;
                                            while(lastNode.previousSibling!=topBoundary) {
                                                lastNode.parentNode.removeChild(lastNode.previousSibling);
                                                if(typeof (currentObjectArray[y])!="string"){
                                                    if(objectArray.indexOf(currentObjectArray[y])<0){
                                                        listComponentsToDestroy.push(currentObjectArray[y][componentsIdentifier]);
                                                    }
                                                }
                                                y++;
                                            }
                                        }
                                        topBoundary.parentNode.removeChild(topBoundary);
                                        bottomBoundary.parentNode.removeChild(bottomBoundary);
                                        dynamicNodes[i].currentChildObjectNode = objectArray;
                                        dynamicNodes[i].currentChildDomNode = lastNode;
                                        findObjectNode(
                                            dynamicNodes[i].positioningChainArray,
                                            states[componentsCount][symbolIdentifier].objectNode
                                        ).children[0] = objectArray;
                                }
                                for(j=0;j<listComponentsToDestroy.length;j++){
                                    if(
                                        listComponentsToDestroy[j]&&
                                        !states[listComponentsToDestroy[j]][symbolIdentifier].isDestroyed
                                       &&!states[listComponentsToDestroy[j]][symbolIdentifier].domNode.parentNode
                                        /** If these components are not re-used/re-inserted somewhere, destroy */
                                    ){
                                        destroyComponent(listComponentsToDestroy[j]);
                                    }
                                }
                            }
    
                        }else/** ...is a component or a text */ {
                            domFragment = document.createDocumentFragment();
                            objectArray = [];
                            if(dynamicNodes[i].currentChildObjectNode.type=="text"/** ...is a text */){
                                for(j=0;j<value.length;j++){
                                    if(
                                        typeof (value[j])=="object"&&
                                        value[j]&&
                                        value[j][componentsIdentifier]/** `component[componentsIdentifier]` is always >=1 */
                                        /** New node is a component */
                                    ){
                                        domFragment.appendChild(
                                            states[value[j][componentsIdentifier]][symbolIdentifier]
                                            .domNode
                                        );
                                        objectArray.push(value[j]);
                                    }else/** Treat as text */ {
                                        if(
                                            value[j]==null||
                                            Array.isArray(value[j])/** Ignone nested lists */
                                        ){
                                            value[j]="";
                                        }
                                        newNode = buildText(value[j],[objectArray.length]);
                                        domFragment.appendChild(newNode.domNode);
                                        objectArray.push(newNode.objectNode)
                                    }
                                }
                                if(j>0/** If the array was non-empty */){
                                    releaseSpace(dynamicNodes[i].currentChildObjectNode);
                                    dynamicNodes[i].currentChildObjectNode = objectArray;
                                    //Hold the head of the list
                                    newNode = domFragment.firstChild;
                                    dynamicNodes[i].currentChildDomNode.parentNode.replaceChild(
                                        domFragment,
                                        dynamicNodes[i].currentChildDomNode
                                    );
                                    //Keep the head of the list
                                    dynamicNodes[i].currentChildDomNode = newNode;
                                    dynamicObectNode = findObjectNode(
                                        dynamicNodes[i].positioningChainArray,
                                        states[componentsCount][symbolIdentifier].objectNode
                                    );
                                    dynamicObectNode.children[0] = objectArray;
                                }
                                
    
                            }else
                            /** ...is a component */
                            /** Destroy current component */ 
                            /** Replace current component with the list elements */{
                               if(value.length>0){
                                    //Firstly, replace the current component node with
                                    //another node (maybe a textNode).
                                    //Incase, the list also includes the current component node
                                    //as a member, we would lose our way to the DOM because,
                                    //appending to the document fragment would also remove the 
                                    //node from the DOM. Hence, no way back to place our newly
                                    //built list.
                                    current = dynamicNodes[i].currentChildObjectNode[componentsIdentifier];
                                    currentComponent = states[current][symbolIdentifier].domNode;
                                    replacer = document.createTextNode("");
                                    currentComponent.parentNode.replaceChild(replacer,currentComponent);
                                    for(j=0;j<value.length;j++){
                                        if(
                                            typeof (value[j])=="object"&&
                                            value[j]&&
                                            value[j][componentsIdentifier]/** `component[componentsIdentifier]` is always >=1 */
                                            /** New node is a component */
                                        ){
                                            domFragment.appendChild(
                                                states[value[j][componentsIdentifier]][symbolIdentifier]
                                                .domNode
                                            );
                                            objectArray.push(value[j]);
                                        }else/** Treat as text */ {
                                            if(
                                                value[j]==null||
                                                Array.isArray(value[j])/** Ignone nested lists */
                                            ){
                                                value[j]="";
                                            }
                                            newNode = buildText(value[j],[objectArray.length]);
                                            domFragment.appendChild(newNode.domNode);
                                            objectArray.push(newNode.objectNode)
                                        }
                                    }
                                    dynamicNodes[i].currentChildObjectNode = objectArray;
                                    //Hold the head of the list
                                    newNode = domFragment.firstChild;
                                    replacer.parentNode.replaceChild(domFragment,replacer);
                                    //Keep the head of the list
                                    dynamicNodes[i].currentChildDomNode = newNode;
                                    dynamicObectNode = findObjectNode(
                                        dynamicNodes[i].positioningChainArray,
                                        states[componentsCount][symbolIdentifier].objectNode
                                    );
                                    dynamicObectNode.children[0] = objectArray;
                                    //Deal with just detached component
                                    if(!currentComponent.parentNode/**If not re-used somewhere */){
                                        destroyComponent(current);
                                    }
                                    currentComponent=null;
                               }
    
                            }
                        }
                    }else/** Treat as text */{
                        if(dynamicNodes[i].currentChildDomNode/** Current node is text or a list */){
                            if(dynamicNodes[i].currentChildObjectNode.type=="text"/** ...is a text */){
                                if(
                                    dynamicNodes[i].currentChildDomNode.nodeValue!=(value=value+"")
                                    /** If only the new text is not same as current */
                                ){
                                    dynamicNodes[i].currentChildDomNode.textContent = value;
                                }
                            }else/** Might be a list */{
                                bottomBoundary = dynamicNodes[i].currentChildDomNode.nextSibling;
                                ownBoundary = document.createTextNode("");
                                dynamicNodes[i].currentChildDomNode[tempIdentifier]=0;
                                currentObjectArray = dynamicNodes[i].currentChildObjectNode;
                                for(j=1;j<currentObjectArray.length;j++){
                                    bottomBoundary[tempIdentifier]=j;
                                    bottomBoundary = bottomBoundary.nextSibling;
                                }
                                dynamicNodes[i].currentChildDomNode.parentNode.insertBefore(ownBoundary,bottomBoundary);
                                bottomBoundary = ownBoundary;
                                lastNode = dynamicNodes[i].currentChildDomNode;
                                while(lastNode.nextSibling!=bottomBoundary){
                                    if(
                                        currentObjectArray[lastNode.nextSibling[tempIdentifier]].type!="text"
                                        /** A componenet node */
                                    ){
                                        current = currentObjectArray[lastNode.nextSibling[tempIdentifier]]
                                        [componentsIdentifier];
                                        destroyComponent(current);
                                    }
                                    lastNode.parentNode.removeChild(lastNode.nextSibling);
                                }
                                if(currentObjectArray[lastNode[tempIdentifier]].type=="text"){
                                    if(
                                        /** NULL is same as empty string */
                                        lastNode.nodeValue!=(value=""+value)
                                        /** If only the new text is not same as current */
                                    ){
                                        lastNode.textContent = value;
                                    }
                                }else{
                                    current = currentObjectArray[lastNode[tempIdentifier]][componentsIdentifier];
                                    componenetToText(current,dynamicNodes[i],componentsCount,value);
                                    destroyComponent(current);
                                }
                                bottomBoundary.parentNode.removeChild(bottomBoundary);
                            }
                        }else
                        /** ...is a component */
                        /** Destroy current component */ 
                        /** Replace current component with text node */ {
                            current = dynamicNodes[i].currentChildObjectNode[componentsIdentifier];
                            componenetToText(
                                current,
                                dynamicNodes[i],
                                componentsCount,
                                value
                            );
                            destroyComponent(current);
                        }
                    }
                }else/** Treat as string */{
                    if(dynamicNodes[i].currentChildDomNode/** Current node is text or a list */){
                        if(dynamicNodes[i].currentChildObjectNode.type=="text"/** ...is a text */){
                            if(
                                dynamicNodes[i].currentChildDomNode.nodeValue!=(value=value+"")
                                /** If only the new text is not same as current */
                            ){
                                dynamicNodes[i].currentChildDomNode.textContent = value;
                            }
                        }else/** Might be a list */{
                            bottomBoundary = dynamicNodes[i].currentChildDomNode.nextSibling;
                            ownBoundary = document.createTextNode("");
                            dynamicNodes[i].currentChildDomNode[tempIdentifier]=0;
                            currentObjectArray = dynamicNodes[i].currentChildObjectNode;
                            for(j=1;j<currentObjectArray.length;j++){
                                bottomBoundary[tempIdentifier]=j;
                                bottomBoundary = bottomBoundary.nextSibling;
                            }
                            dynamicNodes[i].currentChildDomNode.parentNode.insertBefore(ownBoundary,bottomBoundary);
                            bottomBoundary = ownBoundary;
                            lastNode = dynamicNodes[i].currentChildDomNode;
                            while(lastNode.nextSibling!=bottomBoundary){
                                if(
                                    currentObjectArray[lastNode.nextSibling[tempIdentifier]].type!="text"
                                    /** A componenet node */
                                ){
                                    current = currentObjectArray[lastNode.nextSibling[tempIdentifier]]
                                    [componentsIdentifier];
                                    destroyComponent(current);
                                }
                                lastNode.parentNode.removeChild(lastNode.nextSibling);
                            }
                            if(currentObjectArray[lastNode[tempIdentifier]].type=="text"){
                                if(
                                    /** NULL is same as empty string */
                                    lastNode.nodeValue!=(value=""+value)
                                    /** If only the new text is not same as current */
                                ){
                                    lastNode.textContent = value;
                                }
                            }else{
                                current = currentObjectArray[lastNode[tempIdentifier]][componentsIdentifier];
                                componenetToText(
                                    current,
                                    dynamicNodes[i],componentsCount,value
                                );
                                destroyComponent(current);
                            }
                            bottomBoundary.parentNode.removeChild(bottomBoundary);
                        }
                    }else
                    /** ...is a component */
                    /** Destroy current component */ 
                    /** Replace current component with text node */ {
                        current = dynamicNodes[i].currentChildObjectNode[componentsIdentifier];
                        componenetToText(current,dynamicNodes[i],componentsCount,value);
                        destroyComponent(current);
                    }
                }
            }
        //}
        
        return setNonEnumerableObjectProperty({},componentsIdentifier,componentsCount);
    }
    function getLastNode(first,len){
        var last=first;
        while(len>1){
            last=last.nextSibling;
            len--;
        }
        return last;
    }
    function keepStateOnDetach(value){
        this[symbolIdentifier].keepStateOnDetach = typeof (value)=="boolean"?value:false;
    };
    
    function keepOnDetach(value){
        this[symbolIdentifier].keepOnDetach = typeof (value)=="boolean"?value:false;
    }

    function destroyOnDetach(value){
        this[symbolIdentifier].destroy = typeof (value)=="boolean"?value:false;
    }
    function destroyNode(ref){
        if(isHanging(ref)){
            var id = ref[symbolIdentifier].id;
            states[id][symbolIdentifier].keepOnDetach = false;
            destroyComponent(id,false,true);
        }
    }
    function isHanging(ref){
        return isDetached(ref)&&states[id][symbolIdentifier].keepOnDetach;
    }
    function isDetached(ref){
        return ref[symbolIdentifier]&&states[ref[symbolIdentifier].id][symbolIdentifier].isDestroyed;
    }
    function eachComponent(cb){
        for(var i in states){
            cb(states[i][symbolIdentifier].ref);
        }
    };
    var jshSymbol = Math.random()+"";



;
    function cloneComponent(ref){
        if(!isDetached(ref)){
            var id = ref[symbolIdentifier].id;
            var componentType = ref[symbolIdentifier].classType;
            componentsCount++;
            var cRef=setNonEnumerableObjectProperty({},symbolIdentifier,setFreezedObjectProperties({},{
                classType:componentType,
                id:componentsCount
            }));
            var data = {};
            data[symbolIdentifier]=componentsCount;
            states[componentsCount] = setNonEnumerableObjectProperty({
                ...states[id]
            },symbolIdentifier,{
                firstCall:false,
                childComponents:[],
                isInserted:false,
                detached:false,
                dynamicNodes:[],
                domNode:null,
                objectNode:null,
                ownerPage:standAloneApps[symbolIdentifier].currentPage,
                keepNodeOnDetach:false,
                keepStateOnDetach:false,
                destroy:false,
                created:false,
                keyedElements:{},
                ...states[id][symbolIdentifier],
                sharingState:states[id][symbolIdentifier].sharingState.slice(),
                parent:0,
                parentDNode:undefined,
                id:componentsCount,
                classType:componentType,
                data:data,
                isDestroyed:true,
                keepOnDetach:true,
                ref:cRef
            });
            states[componentsCount][symbolIdentifier].domNode=
            states[componentsCount][symbolIdentifier].domNode.cloneNode(true);
            setFreezedObjectProperty(states[componentsCount],"keepStateOnDetach",keepStateOnDetach);
            setFreezedObjectProperty(states[componentsCount],"keepOnDetach",keepOnDetach);
            setFreezedObjectProperty(states[componentsCount],"resetAttrOnDetach",destroyOnDetach);
            setFreezedObjectProperty(states[componentsCount],"destroyOnDetach",destroyOnDetach);
            data=null;
            return cRef;
        }
        return
    };
    var componentNames = {};
    var componentNameTasks = {
        tasks:function(){},
        current:symbolIdentifier
    }
    Internal.rerenderPage=function(){
        Internal.allow=false;
        componentNameTasks.tasks();
        componentNameTasks = {
            tasks:function(){},
            current:symbolIdentifier
        }
        Internal.pageRerendering = true;
        Refresh(states[standAloneApps[symbolIdentifier].currentPage][symbolIdentifier].ref);
        Internal.pageRerendering = false;
        
    }
    
    function Component(fn,name){
        console.log(componentNames);
        if(typeof (fn)!="function"){return fn};
        if(typeof(name)!=="string"){
            name = fn.name;
        }
        var cPath = JSHON.getCurrentPathname();
        if(!componentNames[cPath]){
            componentNames[cPath] = {}
        }
        if(!componentNames[cPath][name]){
            componentNames[cPath][name] = []
        }
        if(cPath!==componentNameTasks.current){
            var hx,valx = componentNames[cPath][name];
            for(hx=0;hx<valx.length;hx++){
                valx[hx].marked = false;
            }
            
        }
        componentNameTasks.current=cPath;
        componentNameTasks.name = name;
        componentNameTasks.tasks=function(){
            var hx,valx = componentNames[this.current][this.name];
            for(hx=0;hx<valx.length;hx++){
                valx[hx].marked = false;
            }
        }
        if(Internal.allow){
            var componentType;
            //if(componentNames[cPath][name]){
                var is_in = false,h,vals = componentNames[cPath][name];
                for(h=0;h<vals.length;h++){
                    if(!vals[h].marked){
                        vals[h].marked = true;
                        vals[h].fn = fn;
                        componentType = vals[h].class;
                        is_in=true;
                        break;
                    }
                }
                if(!is_in){
                    // for(h=0;h<vals.length;h++){
                    //     vals[h].marked = false;
                    // }
                    componentTypesCount++;
                    componentType = componentTypesCount;
                    componentTypes[componentType]={
                        class:componentType,
                        instance:[],
                        fn:fn
                    };
                    componentNames[cPath][name].push(componentTypes[componentType]);
                }else{
                    // if(vals[vals.length-1].marked){
                    //     for(h=0;h<vals.length;h++){
                    //         vals[h].marked = false;
                    //     }
                    // }
                }
            // }else{

            // }
        }else{
            componentTypesCount++;
            var componentType = componentTypesCount;
            componentTypes[componentType]={
                class:componentType,
                instance:[],
                fn:fn
            };
            componentNames[cPath][name].push(componentTypes[componentType]);
        }
        
        function functionClass(){
            componentsCount++;
            var data = {};
            data[symbolIdentifier]=componentsCount;
            states[componentsCount] = setNonEnumerableObjectProperty({},symbolIdentifier,{
                parent:0,
                parentDNode:undefined,
                id:componentsCount,
                firstCall:false,
                childComponents:[],
                sharingState:[],
                isInserted:false,
                detached:false,
                dynamicNodes:[],
                domNode:null,
                objectNode:null,
                ownerPage:standAloneApps[symbolIdentifier].currentPage,
                keepNodeOnDetach:false,
                keepOnDetach:false,
                keepStateOnDetach:false,
                destroy:false,
                data:data,
                classType:componentType,
                created:false,
                isDestroyed:true,
                keyedElements:{},
                ref:setNonEnumerableObjectProperty({},symbolIdentifier,setFreezedObjectProperties({},{
                    classType:componentType,
                    id:componentsCount
                }))
            });
            setFreezedObjectProperty(states[componentsCount],"keepStateOnDetach",keepStateOnDetach);
            setFreezedObjectProperty(states[componentsCount],"keepOnDetach",keepOnDetach);
            setFreezedObjectProperty(states[componentsCount],"resetAttrOnDetach",destroyOnDetach);
            setFreezedObjectProperty(states[componentsCount],"destroyOnDetach",destroyOnDetach);
            data=null;
            return scopedComponent(componentsCount);
        };
        return setFreezedObjectProperty(setNonEnumerableObjectProperty(functionClass,symbolIdentifier,setFreezedObjectProperties({},{classType:componentType})),"getInstanceRef",ComponentRef);
    };
    function JSHONComponent(){
        var setup,node;
        if(this.initArgs){
          setup = this.initArgs.setup;
          node = typeof(this.initArgs.node)=="function"?node.apply(this,arguments):this.initArgs.node;
          this.state={};
          this.state[jshSymbol]={
            node:node,
            setup:setup
          };
        }else{
          node = this.state[jshSymbol].node;
          setup = this.state[jshSymbol].setup;
        }
        var propKeys = Object.keys(setup);
        for(var i=0;i<propKeys.length;i++){
          this[propKeys[i]]=setup[propKeys[i]];
        }
        this.keepStateOnDetach(true);
        return node;
    };
    JSHONComponent=Component(JSHONComponent);
    
    function Refresh(componentRef){
        if(Internal.allow){return}
        if(arguments.length>0){
            
            if(
                states[componentRef[symbolIdentifier].id][symbolIdentifier].created&&
                !states[componentRef[symbolIdentifier].id][symbolIdentifier].isDestroyed
            ){
                var i,args=[];
                for(i=1;i<arguments.length;i++){
                    args.push(arguments[i]);
                }
                states[componentRef[symbolIdentifier].id][symbolIdentifier].refresh=true;
                startNewCycle();
                if(!renderCycle.register[componentRef[symbolIdentifier].id]){
                    renderCycle.register[componentRef[symbolIdentifier].id] = componentRef[symbolIdentifier].id;
                    renderCycle.queue.push(componentRef[symbolIdentifier].id);
                }
                renderCycle.refresh[componentRef[symbolIdentifier].id]=args;
            }
        }
    }
    function Render(instanceRef){
        if(Internal.allow){return}
        if(arguments.length>0&&arguments[0][symbolIdentifier]){
            var i=1,args=[];
            while (i<arguments.length){
                args.push(arguments[i]);
                i++;
            }console.log("OKOK");
            return $Render(instanceRef,args);
        }
        return null;
    }
    function createCallback(This,fn,once){
        var called=false;
        This=This[symbolIdentifier].data[symbolIdentifier];
        if(typeof (fn)=="function"){
            if(typeof (once)!="boolean"){
                once = false;
            }
            return function(){
                if(once/** This callback can be called once */){
                    if(!called){
                        called = true;
                        return {v:fn.apply(states[This],arguments),x:fn=This=null}.v;
                    }
                }else/** Not clear when this callback isn't needed */ {
                    return fn.apply(states[This],arguments);
                }
                
            }
        }
        //Function not provided
        return fn;
    }
    /**
     * Use createMethod when you need both the component object
     * and the actual `this` of the method.
     * @param {*} This 
     * @param {*} fn 
     * @param {*} once 
     * @returns 
     */
    function createMethod(This,fn,once){
        var called=false;
        This=This[symbolIdentifier].data[symbolIdentifier];
        if(typeof (fn)=="function"){
            if(typeof (once)!="boolean"){
                once = false;
            };
            return function(){
                if(once/** This callback can be called once */){
                    if(!called){
                        called = true;
                        var i=0,args=[states[This]];
                        while (i<arguments.length){
                            args.push(arguments[i]);
                            i++;
                        };
                        return {v:fn.apply(this,args),x:fn=This=null}.v;
                    }
                }else/** Not clear when this callback isn't needed */ {
                    var i=0,args=[states[This]];
                    while (i<arguments.length) {
                        args.push(arguments[i]);
                        i++;
                    };
                    return fn.apply(this,args);
                }
                
            }
        }
        //Function not provided
        return null;
    }
    function writeDOM(task){
        outOfScopeTasks.write.push(task);
    }
    function readDOM(task){
        outOfScopeTasks.read.push(task);
    }
    function onPageExit(This,callback){
        if(!This[symbolIdentifier].data||typeof(callback)!="function"){
            return;
        }
        var currentPage=standAloneApps[symbolIdentifier].currentPage;
        standAloneApps[symbolIdentifier].onpageExit[currentPage]
        [This[symbolIdentifier].id]=callback;
    }
    function onNewPage(This,callback){
        if(!This[symbolIdentifier].data||typeof(callback)!="function"){
            return;
        }
        var currentPage=standAloneApps[symbolIdentifier].currentPage;
        standAloneApps[symbolIdentifier].onNewPage[currentPage]
        [This[symbolIdentifier].id]=callback;
    }
    function setInitArgs(componentRef,initArgs){
        if(!states[componentRef[symbolIdentifier].id][symbolIdentifier].created){
            states[componentRef[symbolIdentifier].id].initArgs=initArgs;
        }
        return componentRef;
    }
    function setState(This,state,update){
        if(renderCycle.renderingMode){
            return;
        }
        var mustUpdate = false;
        if(!This[symbolIdentifier].data){
            return;
        }
        if(This.state/** State is defined */){
            if(state){
                var currentState = This.state,i; 
                This.state = {
                    ...currentState,
                    ...state
                };
                if(!This[symbolIdentifier].isDestroyed/** Perform operation only if component is not detached */){
                    if(typeof (update)!="boolean"){
                        if(Object.keys(currentState).length!=Object.keys(state).length){
                            mustUpdate = true;
                        }else{
                            var stateKeys = Object.keys(This.state);
                            for(i=0;i<stateKeys.length;i++){
                                if(This.state[stateKeys[i]]!==currentState[stateKeys[i]]){
                                    mustUpdate = true;
                                    break;
                                }
                            }
                        }
                    }else{
                        mustUpdate = update;
                    }
                }
            }else{
                mustUpdate = typeof (update)!="boolean"?true:update;
                This.state=null;
            }
        }else/** State is not defined [NULL] */ {
            if(state){
                This.state = {
                    ...state
                };
                mustUpdate = typeof (update)!="boolean"?true:update;
            }else{
                mustUpdate = typeof (update)!="boolean"?false:update;
            }
        }
        if(
            mustUpdate&&!This[symbolIdentifier].isDestroyed
            /** Trigger re-render if component is not detached. */
        ){
            setStateRenderer(This[symbolIdentifier].id);
        }
    };
    function createSharedState(stateId,state){
        if(!sharedStates[stateId]){
            sharedStates[stateId]={
                id:stateId,
                group:[],
                data:{...state}
            }
        }
    }
    function getSharedState(This,stateId){
        if(!This[symbolIdentifier].data){
            return;
        }
        if(sharedStates[stateId]){
            return sharedStates[stateId].data;
        }
    };
    function buildSharedState(componentsCount){
        var state={},sharingState=states[componentsCount][symbolIdentifier].sharingState,i;
        if(!sharingState.length){return};
        for(i=0;i<sharingState.length;i++){
            state[sharingState[i]]=sharedStates[sharingState[i]].data;
        }
        return state;
    }
    function joinSharedState(This,stateId,state){
        if(!This[symbolIdentifier].data){
            return;
        }
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
    };
    
    function unjoinSharedState(This,stateId){
        if(!This[symbolIdentifier].data){
            return;
        }
        if(sharedStates[stateId]){
            var index;
            if((index=sharedStates[stateId].group.indexOf(This[symbolIdentifier].id))<0){
                sharedStates[stateId].group.splice(index,1);
                index=This[symbolIdentifier].sharingState.indexOf(stateId);
                This[symbolIdentifier].sharingState.splice(index,1);
            }
        }
    }
    function setSharedState(This,stateId,state,update){
        if(renderCycle.renderingMode||!This[symbolIdentifier].data){
            return;
        }
        var mustUpdate = false;
        if(sharedStates[stateId]/** State is defined */){
            if(This[symbolIdentifier].sharingState.indexOf(stateId)<0){return}
            if(state){
                var currentState = sharedStates[stateId].data,i; 
                sharedStates[stateId].data = {
                    ...currentState,
                    ...state
                };
                //if(!This[symbolIdentifier].isDestroyed/** Perform operation only if component is not detached */){
                    if(typeof (update)!="boolean"){
                        if(Object.keys(currentState).length!=Object.keys(state).length){
                            mustUpdate = true;
                        }else{
                            var stateKeys = Object.keys(sharedStates[stateId].data);
                            for(i=0;i<stateKeys.length;i++){
                                if(sharedStates[stateId].data[stateKeys[i]]!==currentState[stateKeys[i]]){
                                    mustUpdate = true;
                                    break;
                                }
                            }
                        }
                    }else{
                        mustUpdate = update;
                    }
                //}
            }else{
                mustUpdate = typeof (update)!="boolean"?true:update;
                sharedStates[stateId].data=null;
            }
        }else/** State is not defined [NULL] */ {
            return;
        }
        
        if(mustUpdate){
            for(i=0;i<sharedStates[stateId].group.length;i++){
                if(!states[sharedStates[stateId].group[i]][symbolIdentifier].isDestroyed){
                    /** Trigger re-render if component is not detached. */
                    setStateRenderer(sharedStates[stateId].group[i]);
                }
            }
            
        }
    };
    function setClass(This,key,classObject){
        if(renderCycle.renderingMode){
            return;
        }
        var mustUpdate = false;
        if(!This[symbolIdentifier].data){
            return;
        }
        if(This[symbolIdentifier].keyedElements[key]){
            if(!renderCycle.attributes[This[symbolIdentifier].id]){
                renderCycle.attributes[This[symbolIdentifier].id] = {}
                renderCycle.update[This[symbolIdentifier].id] = This[symbolIdentifier].id;
            };
            if(!renderCycle.attributes[This[symbolIdentifier].id][key]){
                renderCycle.attributes[This[symbolIdentifier].id][key] = {
                    styles:{},
                    classNames:{
                        add:{},
                        remove:{}
                    },
                    attributes:{}
                }
            }
            var i;
            if(classObject.add){
                for(i=0;i<classObject.add.length;i++){
                    renderCycle.attributes[This[symbolIdentifier].id][key]
                    .classNames.add[classObject.add[i]]=true;
                    mustUpdate = true;
                }
            }
            if(classObject.remove){
                for(i=0;i<classObject.remove.length;i++){
                    renderCycle.attributes[This[symbolIdentifier].id][key]
                    .classNames.remove[classObject.remove[i]]=true;
                    mustUpdate = true;
                }
            }
            if(mustUpdate){
                startNewCycle();
            }
        }
    }
    function setStyle(This,key,styleObject){
        if(renderCycle.renderingMode){
            return;
        }
        This = states[This[symbolIdentifier].id];
        if(!This[symbolIdentifier].data){
            return;
        }
        if(This[symbolIdentifier].keyedElements[key]){
            if(!renderCycle.attributes[This[symbolIdentifier].id]){
                renderCycle.attributes[This[symbolIdentifier].id] = {}
                renderCycle.update[This[symbolIdentifier].id] = This[symbolIdentifier].id;
            };
            if(!renderCycle.attributes[This[symbolIdentifier].id][key]){
                renderCycle.attributes[This[symbolIdentifier].id][key] = {
                    styles:{},
                    classNames:{
                        add:{},
                        remove:{}
                    },
                    attributes:{}
                }
            }
            renderCycle.attributes[This[symbolIdentifier].id][key].styles = {
                ...renderCycle.attributes[This[symbolIdentifier].id][key].styles,
                ...styleObject
            }
            startNewCycle();
        }
    
    }
    function setAttribute(This,key,attrObject){
        if(renderCycle.renderingMode){
            return;
        }
        if(!This[symbolIdentifier].data){
            return;
        }
        if(This[symbolIdentifier].keyedElements[key]){
            if(!renderCycle.attributes[This[symbolIdentifier].id]){
                renderCycle.attributes[This[symbolIdentifier].id] = {}
                renderCycle.update[This[symbolIdentifier].id] = This[symbolIdentifier].id;
            };
            if(!renderCycle.attributes[This[symbolIdentifier].id][key]){
                renderCycle.attributes[This[symbolIdentifier].id][key] = {
                    styles:{},
                    classNames:{
                        add:{},
                        remove:{}
                    },
                    attributes:{}
                }
            }
            renderCycle.attributes[This[symbolIdentifier].id][key].attributes = {
                ...renderCycle.attributes[This[symbolIdentifier].id][key].attributes,
                ...attrObject
            }
            startNewCycle();
        }
    }
    function getElement(componentRef,key){
        if(componentRef[symbolIdentifier]){
            componentRef = states[componentRef[symbolIdentifier].id];
            if(componentRef[symbolIdentifier].isDestroyed){
                return null;
            }
            if(typeof (key)!=="string"){
                return componentRef[symbolIdentifier].domNode;
            }
            if(componentRef[symbolIdentifier].keyedElements[key]){
                return findDomNode(
                    componentRef[symbolIdentifier].keyedElements[key].positioningChainArray,
                    componentRef[symbolIdentifier].domNode
                );
            }
        }
        return null;
    }
    function getComponentRef(This){
        return This[symbolIdentifier].ref;
    }
    function getParentComponentRef(childRef){
        var parentId = states[childRef[symbolIdentifier].id][symbolIdentifier].parent;
        if(parentId/** parentId is always >=1 unless the component has no direct parent*/){
            return states[parentId][symbolIdentifier].ref;
        }
        return null;
    }
    function getSharedData(componentRef){
        if(!states[componentRef[symbolIdentifier].id][symbolIdentifier].isDestroyed){
            if(states[componentRef[symbolIdentifier].id].public){
                return {
                    ...states[componentRef[symbolIdentifier].id].public
                };
            }
        }
        return {};
    }
    var standAloneApps = {};
    var appCreation = {
        allow:true,
        key:symbolIdentifier
    };
    standAloneApps[symbolIdentifier] = {
        created:false,
        currentPage:null,
        currentPageName:window.location.origin,
        onpageExit:{},
        onNewPage:{},
        visitedPages:{}
    };
    var pageStack = [],pagesCursor=0,prePageCursor=0;
    //Creates the first page of the app
    function createApp(appName,ref,argsTaker,destination){
        if(Internal.allow){return}
        if(!standAloneApps[symbolIdentifier].created&&appCreation.allow){
            standAloneApps[symbolIdentifier].created = true;
            standAloneApps[symbolIdentifier].currentPage = ref[symbolIdentifier].id;
            renderCycle.currentPage=ref[symbolIdentifier].id;
            // if(typeof (appName)=="undefined"){
            //     appName = window.location.pathname;
            // }
            appName = window.location.origin+appName;
            pageStack.push(appName);
            standAloneApps[symbolIdentifier].currentPageName=appName;
            standAloneApps[appName] = ref[symbolIdentifier].id;
            standAloneApps[symbolIdentifier].onpageExit[ref[symbolIdentifier].id]={};
            standAloneApps[symbolIdentifier].onNewPage[ref[symbolIdentifier].id]={};
            if(JSHONHydrate){
                $PerformHydrationTask(ref,argsTaker(takeArguments),destination.children[0]);
                JSHONHydrate=false;
            }else{
                $Render(ref,argsTaker(takeArguments));
                destination.innerHTML="";
                destination.appendChild(states[ref[symbolIdentifier].id][symbolIdentifier].domNode);
            }
            
            
        }
    }
    window.addEventListener("popstate",function PagePopState(e){
        var pathname = window.location.origin+window.location.pathname;
        if(standAloneApps[pathname]){
            if(standAloneApps[symbolIdentifier].currentPageName!=pathname){
                var ref={};ref[symbolIdentifier]=standAloneApps[pathname];
                JSHON.ui.renderPage(window.location.pathname,ref,function(){},true);
            }
        }else{
            history.replaceState(e.state,"",standAloneApps[symbolIdentifier].currentPageName);
        }
    },false);
    //Creates new page if not created and render 
    //In place of current page
    /**
     * 
     * @param {*} pageName 
     * @param {*} ref 
     * @param {(argumentsTaker:takeArguments)=>arguments} argsTaker 
     * `argsTaker` must call and return the value returned by `argumentsTaker`
     */
    function renderPage(pageName,ref,argsTaker,popstate){
        if(renderCycle.renderingMode){return}
        if(standAloneApps[symbolIdentifier].created){
            pageName = window.location.origin+pageName;
            if(!standAloneApps[pageName]){
                standAloneApps[pageName] = ref[symbolIdentifier].id;
                renderCycle.newPage.firstRender=true;
            }
            if(!standAloneApps[symbolIdentifier].onpageExit[ref[symbolIdentifier].id]){
                standAloneApps[symbolIdentifier].onpageExit[ref[symbolIdentifier].id]={};
            }
            if(!standAloneApps[symbolIdentifier].onNewPage[ref[symbolIdentifier].id]){
                standAloneApps[symbolIdentifier].onNewPage[ref[symbolIdentifier].id]={};
            }
            renderCycle.newPage.id = standAloneApps[pageName];
            renderCycle.newPage.pageName = pageName;
            renderCycle.newPage.isPoppedState=popstate;
            renderCycle.newPage.getArgs = argsTaker;
            startNewCycle();
        }
    };

    function lockAppCreation(secretId){
        if(appCreation.allow){
            appCreation.key=secretId;
            appCreation.allow=false;
        }
    };
    function unlockAppCreation(secretId){
        if(appCreation.key===secretId){
            appCreation.allow = true;
            appCreation.key = symbolIdentifier;
        }
    };
    function noopXSS(s){return s};
    setFreezedObjectProperty(JSHON,'ui',
    setFreezedObjectProperties({},{
        renderPage:renderPage,
        createComponent:Component,
        JSHONComponent:JSHONComponent,
        createApp:createApp,
        render:Render,
        refresh:Refresh,
        createCallback:createCallback,
        createMethod:createMethod,
        setState:setState,
        setStyle:setStyle,
        setAttribute:setAttribute,
        setClass:setClass,
        setInitArgs:setInitArgs,
        getElement:getElement,
        getSharedData:getSharedData,
        getComponentRef:getComponentRef,
        getParentComponentRef:getParentComponentRef,
        XSS:noopXSS,
        xss:noopXSS,
        writeDOM:writeDOM,
        readDOM:readDOM,
        onPageRerendered:onNewPage,
        onPageExit:onPageExit,
        getSharedState:getSharedState,
        setSharedState:setSharedState,
        joinSharedState:joinSharedState,
        unjoinSharedState:unjoinSharedState,
        createSharedState:createSharedState,
        lockAppCreation:lockAppCreation,
        unlockAppCreation:unlockAppCreation,
        
        //Make compatible with other libraries
        isDetached:isDetached,
        isMemoryLeakable:isHanging,
        destroyComponent:destroyNode,
        eachComponent:eachComponent,
        cloneComponent:cloneComponent,
        typeOfComponent:function(obj){
            return obj&&obj[symbolIdentifier]&&obj[symbolIdentifier].id;
        }
    }));



    console.log(states);
    }();