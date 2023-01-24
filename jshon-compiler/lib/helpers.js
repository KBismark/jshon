   /**
     * 
     * @param {any} value 
     * 
     * @param {{test:(value:any)=>boolean,perform:(value:any,...args),usePreviousCallback:boolean}[]} cases 
     * Return a truthy value in your case performer-task to perform the next case task without testing if they pass or not. 
     * If the return value is an array, it is considered as an array of arguments to pass to the next case task.
     * 
     * Remember: The swtich's value is always the first argument to all case tasks performed whether you provided
     * arguments through an array or not.
     * 
     * @param {(value:any)} defaults Default task is executed if no case is matched or is included in the next tasks to perform.
     */
    function Switch(value,cases,defaults){
        if(!cases.length){defaults(value);return}
        var toNext = false, args = [], preCallback=null,matched_a_case_at=-1;
        for(var i = 0; i < cases.length; i++){
            if(!toNext){
                if(cases[i].test(value)){ 
                    if(cases[i].usePreviousCallback&&i){
                        if(!preCallback){
                            preCallback=i;
                        }
                        toNext = cases[preCallback].perform(value);
                    }else{
                        toNext = cases[i].perform(value);
                    }
                    matched_a_case_at=i;
                    if(toNext){
                        if(Array.isArray(toNext)){
                            args = toNext;
                        }else{
                            args=[];
                        }
                        toNext = true;
                    }else{
                        break;
                    }
                };
            }else{
                args.unshift(value);
                if(cases[i].usePreviousCallback&&i){
                    if(!preCallback){
                        preCallback=i;
                    }
                    toNext = cases[preCallback].perform.apply(null,args);
                }else{
                    toNext = cases[i].perform.apply(null,args);
                }
                matched_a_case_at=i;
                if(toNext){
                    if(Array.isArray(toNext)){
                        args = toNext;
                    }else{
                        args=[];
                    }
                    toNext = true;
                }else{
                    break;
                }
            }
            
        };
        if(defaults){
            if(matched_a_case_at==-1){
                defaults(value);
            }else if(matched_a_case_at==cases.length-1){
                if(toNext){
                    args.unshift(value);
                    defaults.apply(null,args);
                }
            }
        }
    }





    module.exports = {
        Switch
    }