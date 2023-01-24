

!function(){
    JSHON.pathname = "/module/home/index.js";
    JSHON.include("/module/home/app.js");
    JSHON.onload = function(){
        JSHON.ui.createApp(
            "/",
            JSHON.import.from("/module/home/app.js").App.getInstanceRef(),
            function(){},
            typeof(window)=="undefined"?null:document.getElementById("page")
        )
    }
    

}();