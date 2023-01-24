//<
import "../../jshon";
"Everything inside this custom comment tags are ignored"
//>

!function(){
    JSHON.pathname = "/module/home/app.js"
    JSHON.export = {
        App:JSHON.ui.createComponent(function(){
            return (
                <jshon>
                    <div style="text-align:center;">
                        <h1 style="color:#fff">A Glow Button Built With JSHON</h1>
                        <br/>
                        <br/>
                        <div >
                            <button class="glow-on-hover" type="button">HOVER ME, THEN CLICK ME!</button>
                        </div>
                        <br/>
                        <br/>
                        <p style="color:#ddd;font-size:18px">
                            Make changes to the scripts in <span style="color:green;font-weight:bold;">/src/scripts</span> 
                            and come back.
                        </p>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div style="color:#ddd;position:absolute;bottom:20px;left:0;right:0;text-align:center;">
                            Original button in HTML/CSS : 
                            <a href="https://codepen.io/kocsten">Glow Button</a>
                        </div>
                    </div>
                </jshon>
            )
        })
    }
}()