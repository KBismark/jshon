//Part of this file from:
    // Type definitions for React 18.0
    // Project: http://facebook.github.io/react/


declare global {
    namespace JSX {
        type Element = JSHONElement;
        interface IntrinsicElements {
            jshon:JSHONHTMLWrapperTag;
            // HTML
            a: HTMLTags|HTMLTagsExtension.AnchorHTMLAttributes;
            abbr: HTMLTags;
            address: HTMLTags;
            area: HTMLTags|HTMLTagsExtension.AreaHTMLAttributes;
            article: HTMLTags;
            aside: HTMLTags;
            audio: HTMLTags|HTMLTagsExtension.AudioHTMLAttributes;
            b: HTMLTags;
            base: HTMLTags|HTMLTagsExtension.BaseHTMLAttributes;
            bdi: HTMLTags;
            bdo: HTMLTags;
            big: HTMLTags;
            blockquote: HTMLTags|HTMLTagsExtension.BlockquoteHTMLAttributes;
            body: HTMLTags;
            br: HTMLTags;
            button: HTMLTags|HTMLTagsExtension.ButtonHTMLAttributes;
            canvas: HTMLTags|HTMLTagsExtension.CanvasHTMLAttributes;
            caption: HTMLTags;
            cite: HTMLTags;
            code: HTMLTags;
            col: HTMLTags|HTMLTagsExtension.ColHTMLAttributes;
            colgroup: HTMLTags|HTMLTagsExtension.ColgroupHTMLAttributes;
            data: HTMLTags|HTMLTagsExtension.DataHTMLAttributes;
            datalist: HTMLTags;
            dd: HTMLTags;
            del: HTMLTags|HTMLTagsExtension.DelHTMLAttributes;
            details: HTMLTags|HTMLTagsExtension.DetailsHTMLAttributes;
            dfn: HTMLTags;
            dialog: HTMLTags|HTMLTagsExtension.DialogHTMLAttributes;
            div: HTMLTags; 
            dl: HTMLTags;
            dt: HTMLTags;
            em: HTMLTags;
            embed: HTMLTags;
            fieldset: HTMLTags|HTMLTagsExtension.FieldsetHTMLAttributes;
            figcaption: HTMLTags;
            figure: HTMLTags;
            footer: HTMLTags;
            form: HTMLTags|HTMLTagsExtension.FormHTMLAttributes;
            h1: HTMLTags;
            h2: HTMLTags;
            h3: HTMLTags;
            h4: HTMLTags;
            h5: HTMLTags;
            h6: HTMLTags;
            head: HTMLTags;
            header: HTMLTags;
            hgroup: HTMLTags;
            hr: HTMLTags;
            html: HTMLTags|HTMLTagsExtension.HtmlHTMLAttributes;
            i: HTMLTags;
            iframe: HTMLTags|HTMLTagsExtension.IframeHTMLAttributes;
            img: HTMLTags|HTMLTagsExtension.ImgHTMLAttributes;
            input: HTMLTags|HTMLTagsExtension.InputHTMLAttributes;
            ins: HTMLTags|HTMLTagsExtension.InsHTMLAttributes;
            kbd: HTMLTags;
            keygen: HTMLTags|HTMLTagsExtension.KeygenHTMLAttributes;
            label: HTMLTags|HTMLTagsExtension.LabelHTMLAttributes;
            legend: HTMLTags;
            li: HTMLTags|HTMLTagsExtension.LiHTMLAttributes;
            link: HTMLTags|HTMLTagsExtension.LinkHTMLAttributes;
            main: HTMLTags;
            map: HTMLTags|HTMLTagsExtension.MapHTMLAttributes;
            mark: HTMLTags;
            menu: HTMLTags|HTMLTagsExtension.MenuHTMLAttributes;
            menuitem: HTMLTags;
            meta: HTMLTags|HTMLTagsExtension.MetaHTMLAttributes;
            meter: HTMLTags|HTMLTagsExtension.MeterHTMLAttributes;
            nav: HTMLTags;
            noindex: HTMLTags;
            noscript: HTMLTags;
            object: HTMLTags|HTMLTagsExtension.ObjectHTMLAttributes;
            ol: HTMLTags|HTMLTagsExtension.OlHTMLAttributes;
            optgroup: HTMLTags|HTMLTagsExtension.OptgroupHTMLAttributes;
            option: HTMLTags|HTMLTagsExtension.OptionHTMLAttributes;
            output: HTMLTags|HTMLTagsExtension.OutputHTMLAttributes;
            p: HTMLTags;
            param: HTMLTags|HTMLTagsExtension.ParamHTMLAttributes;
            picture: HTMLTags;
            pre: HTMLTags;
            progress: HTMLTags|HTMLTagsExtension.ProgressHTMLAttributes;
            q: HTMLTags;
            rp: HTMLTags;
            rt: HTMLTags;
            ruby: HTMLTags;
            s: HTMLTags;
            samp: HTMLTags;
            slot: HTMLTags|HTMLTagsExtension.SlotHTMLAttributes;
            script: HTMLTags|HTMLTagsExtension.ScriptHTMLAttributes;
            section: HTMLTags;
            select: HTMLTags|HTMLTagsExtension.SelectHTMLAttributes;
            small: HTMLTags;
            source: HTMLTags|HTMLTagsExtension.SourceHTMLAttributes;
            span: HTMLTags;
            strong: HTMLTags;
            style: HTMLTags|HTMLTagsExtension.StyleHTMLAttributes;
            sub: HTMLTags;
            summary: HTMLTags;
            sup: HTMLTags;
            table: HTMLTags|HTMLTagsExtension.TableHTMLAttributes;
            template: HTMLTags;
            tbody: HTMLTags;
            td: HTMLTags|HTMLTagsExtension.TdHTMLAttributes;
            textarea: HTMLTags|HTMLTagsExtension.TextareaHTMLAttributes;
            tfoot: HTMLTags;
            th: HTMLTags|HTMLTagsExtension.ThHTMLAttributes;
            thead: HTMLTags;
            time: HTMLTags|HTMLTagsExtension.TimeHTMLAttributes;
            title: HTMLTags;
            tr: HTMLTags;
            track: HTMLTags|HTMLTagsExtension.TrackHTMLAttributes;
            u: HTMLTags;
            ul: HTMLTags;
            "var": HTMLTags;
            video: HTMLTags|HTMLTagsExtension.VideoHTMLAttributes;
            wbr: HTMLTags;
            webview: HTMLTags|HTMLTagsExtension.WebViewHTMLAttributes;

            // SVG
            svg: React.SVGProps<SVGSVGElement>;

            animate: React.SVGProps<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
            animateMotion: React.SVGProps<SVGElement>;
            animateTransform: React.SVGProps<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
            circle: React.SVGProps<SVGCircleElement>;
            clipPath: React.SVGProps<SVGClipPathElement>;
            defs: React.SVGProps<SVGDefsElement>;
            desc: React.SVGProps<SVGDescElement>;
            ellipse: React.SVGProps<SVGEllipseElement>;
            feBlend: React.SVGProps<SVGFEBlendElement>;
            feColorMatrix: React.SVGProps<SVGFEColorMatrixElement>;
            feComponentTransfer: React.SVGProps<SVGFEComponentTransferElement>;
            feComposite: React.SVGProps<SVGFECompositeElement>;
            feConvolveMatrix: React.SVGProps<SVGFEConvolveMatrixElement>;
            feDiffuseLighting: React.SVGProps<SVGFEDiffuseLightingElement>;
            feDisplacementMap: React.SVGProps<SVGFEDisplacementMapElement>;
            feDistantLight: React.SVGProps<SVGFEDistantLightElement>;
            feDropShadow: React.SVGProps<SVGFEDropShadowElement>;
            feFlood: React.SVGProps<SVGFEFloodElement>;
            feFuncA: React.SVGProps<SVGFEFuncAElement>;
            feFuncB: React.SVGProps<SVGFEFuncBElement>;
            feFuncG: React.SVGProps<SVGFEFuncGElement>;
            feFuncR: React.SVGProps<SVGFEFuncRElement>;
            feGaussianBlur: React.SVGProps<SVGFEGaussianBlurElement>;
            feImage: React.SVGProps<SVGFEImageElement>;
            feMerge: React.SVGProps<SVGFEMergeElement>;
            feMergeNode: React.SVGProps<SVGFEMergeNodeElement>;
            feMorphology: React.SVGProps<SVGFEMorphologyElement>;
            feOffset: React.SVGProps<SVGFEOffsetElement>;
            fePointLight: React.SVGProps<SVGFEPointLightElement>;
            feSpecularLighting: React.SVGProps<SVGFESpecularLightingElement>;
            feSpotLight: React.SVGProps<SVGFESpotLightElement>;
            feTile: React.SVGProps<SVGFETileElement>;
            feTurbulence: React.SVGProps<SVGFETurbulenceElement>;
            filter: React.SVGProps<SVGFilterElement>;
            foreignObject: React.SVGProps<SVGForeignObjectElement>;
            g: React.SVGProps<SVGGElement>;
            image: React.SVGProps<SVGImageElement>;
            line: React.SVGProps<SVGLineElement>;
            linearGradient: React.SVGProps<SVGLinearGradientElement>;
            marker: React.SVGProps<SVGMarkerElement>;
            mask: React.SVGProps<SVGMaskElement>;
            metadata: React.SVGProps<SVGMetadataElement>;
            mpath: React.SVGProps<SVGElement>;
            path: React.SVGProps<SVGPathElement>;
            pattern: React.SVGProps<SVGPatternElement>;
            polygon: React.SVGProps<SVGPolygonElement>;
            polyline: React.SVGProps<SVGPolylineElement>;
            radialGradient: React.SVGProps<SVGRadialGradientElement>;
            rect: React.SVGProps<SVGRectElement>;
            stop: React.SVGProps<SVGStopElement>;
            switch: React.SVGProps<SVGSwitchElement>;
            symbol: React.SVGProps<SVGSymbolElement>;
            text: React.SVGProps<SVGTextElement>;
            textPath: React.SVGProps<SVGTextPathElement>;
            tspan: React.SVGProps<SVGTSpanElement>;
            use: React.SVGProps<SVGUseElement>;
            view: React.SVGProps<SVGViewElement>;
        }
    }
    interface JSHON{
        ui:{
            createApp(appName:string,ref:componentRef,sendArgs:(argumentsTaker:argumentTaker)=>IArguments,dest:HTMLElement):void;
            renderPage(appName:string,ref:componentRef,sendArgs:(argumentsTaker:argumentTaker)=>IArguments):void;
            onPageExit(This:ThisObject,callback:()=>void):void;
            onPageRerendered(This:ThisObject,callback:()=>void):void;
            createComponent(fn:(this:ThisObject,...args: any[])=>JSHONElement|JSHONTacElement):ComponentClassFunction;
            render(ref:componentRef,...args: any[]):renderId;
            refresh(ref:componentRef,...args: any[]):void;
            getComponentRef(This:ThisObject):componentRef;
            getParentComponentRef(childRef:componentRef):componentRef|null;
            getSharedData(ref:componentRef):{},
            getElement(ref:componentRef,elementKey:string|undefined):HTMLElement;
            createCallback<T=ThisObject>(This:T,callback:(this:T,...args:any[])=>void,once?:boolean):(...args:any[])=>void;
            createMethod<T=ThisObject>(This:T,callback:(This:T,...args:any[])=>void,once?:boolean):(...args:any[])=>void;
            lockAppCreation(secretId:any):void;
            unlockAppCreation(secretId:any):void;
            setInitArgs(ref:componentRef,initArgs:any):componentRef;
            setState(This:ThisObject,newState:{},update:boolean):void;
            setStyle(This:ThisObject,elementKey:string,styleObject:CSSStyleDeclaration):void;
            setClass(This:ThisObject,elementKey:string,classObject:{add?:classnames[],remove?:classnames[]}):void;
            setAttribute(This:ThisObject,elementKey:string,attrObject:HTMLAttributes|ARIAMixins|GlobalEventHandlers):void;
            writeDOM(task:()=>void):void;
            readDOM(task:()=>void):void;
            xss<V=string>(value:V):V;
            XSS<V=string>(value:V):V;
            createSharedState(stateId:string,state:{},update:boolean):void;
            joinSharedState(This:ThisObject,stateId:string,state:{}):void;
            unjoinSharedState(This:ThisObject,stateId:string):void;
            setSharedState(This:ThisObject,stateId:string,newState:{},update:boolean):void;
            getSharedState(This:ThisObject,stateId:string):undefined|{};

            JSHONComponent(...args: any[]):componentRef;
            isDetached():boolean;
            isMemoryLeakable():boolean;
            destroyComponent(ref:componentRef):void;
            cloneComponent(ref:componentRef):componentRef;
            typeOfComponent():boolean
            
        }

        include(module_src:string):void;
        includesModule(module_src:string):boolean;
        loadModule(module_src:string,handler:{onload:()=>void,onerror?:()=>void,args:any},alternate_server_side_module_src?:string):void;
        reloadModule(module_src:string):void;
        loadPage(module_src:string,handler:{onload:()=>void,onerror?:()=>void,args:any}):void;
        await(secret:any,task:(PAGEDATA:{},INSERTABLE:{})=>void):void;
        resume(secret:any):void;
        abort():void;
        aborted():boolean;
        onload:()=>void;
        onerror:()=>void;
        onerrorOnce:()=>void;
        pathname:string;
        gobal:null;
        export:null;
        import:{
            from(module_src:string,alternate_server_side_module_src?:string):{};
            global:{};
        },
        jServe:boolean,
        /**
         * Set versions of modules globally. If a module's version is set, it's concantenated to the module's
         * source path everytime it's loaded. `JSHON.version` can be set once and only 
         * before your first `JSHON.export` or `JSHON.global` exports. Works only on browser.
         * Fallback on `alternate_server_side_module_src` argument to `JSHON.import.from()` and `JSHON.loadModule()`
         * or alikes.
         * 
         * @example
         * JSHON.version = {
         *     //Versions as search params
         *     "path_to_module":"?version=2.1.3&[if any]",
         *     //Versions as pathnames
         *     "path_to_another_module":"/v2.1.3/[if any]",
         * }
         * 
         * //However, in each case you are required to import and export 
         * //"path_to_module" and "path_to_another_module" as the module's source path.    
         * 
         * 
         */
        version:{[module_src:string]:string}

    };
    
    interface ThisObject{
        state: null;
        public: null;
        elements: null;
        keepOndetach:(keep?:boolean)=>void;
        destroyOndetach:(destroy?:boolean)=>void;
        keepStateOndetach:(keep?:boolean)=>void;
        onParentCall:((this:this,...args:any[])=>void)|null;
        beforeUpdate:((this:this,...args:any[])=>void)|null;
        onCreation:((this:this,...args:any[])=>void)|null;
    }
    type componentRef = {
        [x:symbol]:{
            id:number,
            classType:number
        }
    }
    type renderId = {
        [x:symbol]:number
    }
    type classnames = string;
    type argumentTaker = (...args:any[])=>IArguments;
    interface JSHONElement{
        tag:HTMLElementTagNameTypes|HTMLElementDeprecatedTagNameTypes|SVGElementTagNameTypes;
        attr:HTMLAttributes|ARIAMixins|GlobalEventHandlers|SpecialStyleString|SpecialClassName;
        children:JSHONChildNodes;
    };
    interface JSHONTacElement{
        t:HTMLElementTagNameTypes|HTMLElementDeprecatedTagNameTypes|SVGElementTagNameTypes;
        a:HTMLAttributes|ARIAMixins|GlobalEventHandlers|SpecialStyleString|SpecialClassName;
        c:JSHONChildNodes;
    };
    type JSHONChildNodes = [(string|JSHONDynamicNode|JSHONElement)];
    type JSHONDynamicNode = (this:ThisObject,...args: any[])=>null|string|number|renderId|JSHONList;
    type JSHONList = [null|string|number|renderId];

    interface ComponentClassFunction extends Function{
        ():ComponentInstance;
        getInstanceRef():componentRef;
    }
    interface ComponentInstance extends Function{
        (this:ThisObject,...args: any[]):renderId;
    }
    interface SpecialStyleObject {
        style?:CSSStyleDeclaration;
    }
    interface SpecialStyleString {
        style?:string;
    }
    interface SpecialClassName {
        class?:string;
    }
    /** 
     * This tag is only meant for wrapping your HTML code 
     * to ease code detecting and reduce compilation time.
     * 
     * **NOTE:** Aside this tag, your HTML code must be wrapped in 
     * one parent tag. That is to say, every component must have
     * one top-most parent element.
     */
    interface JSHONHTMLWrapperTag{}
    type HTMLTags = JHTMLAttributes|ARIAMixins|SpecialStyleString|SpecialClassName;
    
    declare const JSHON:JSHON;
}




// Taken from React (18.0) Type definitions 
// Project: http://facebook.github.io/react/
interface HTMLAttributes {

    // Standard HTML Attributes
    accessKey?: string | undefined;
    contentEditable?: boolean | "inherit" | undefined;
    contextMenu?: string | undefined;
    dir?: string | undefined;
    draggable?: boolean | undefined;
    hidden?: boolean | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    placeholder?: string | undefined;
    slot?: string | undefined;
    spellCheck?: boolean | undefined;
    tabindex?: number | undefined;
    title?: string | undefined;
    translate?: 'yes' | 'no' | undefined;

    // Other Standard HTML Attributes
    accept?: string | undefined;
    acceptCharset?: string | undefined;
    action?: string | undefined;
    allowFullScreen?: boolean | undefined;
    allowTransparency?: boolean | undefined;
    alt?: string | undefined;
    as?: string | undefined;
    async?: boolean | undefined;
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    autoplay?: boolean | undefined;
    capture?: boolean | 'user' | 'environment' | undefined;
    cellPadding?: number | string | undefined;
    cellSpacing?: number | string | undefined;
    charSet?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    cite?: string | undefined;
    cols?: number | undefined;
    colSpan?: number | undefined;
    content?: string | undefined;
    controls?: boolean | undefined;
    coords?: string | undefined;
    crossOrigin?: string | undefined;
    data?: string | undefined;
    dateTime?: string | undefined;
    default?: boolean | undefined;
    defer?: boolean | undefined;
    disabled?: boolean | undefined;
    download?: any;
    encType?: string | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    frameBorder?: number | string | undefined;
    headers?: string | undefined;
    height?: number | string | undefined;
    high?: number | undefined;
    href?: string | undefined;
    hrefLang?: string | undefined;
    for?: string | undefined;
    httpEquiv?: string | undefined;
    integrity?: string | undefined;
    keyParams?: string | undefined;
    keyType?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    list?: string | undefined;
    loop?: boolean | undefined;
    low?: number | undefined;
    manifest?: string | undefined;
    marginHeight?: number | undefined;
    marginWidth?: number | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    media?: string | undefined;
    mediaGroup?: string | undefined;
    method?: string | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    nonce?: string | undefined;
    noValidate?: boolean | undefined;
    open?: boolean | undefined;
    optimum?: number | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    preload?: string | undefined;
    readOnly?: boolean | undefined;
    rel?: string | undefined;
    required?: boolean | undefined;
    reversed?: boolean | undefined;
    rows?: number | undefined;
    rowSpan?: number | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    size?: number | undefined;
    sizes?: string | undefined;
    span?: number | undefined;
    src?: string | undefined;
    srcDoc?: string | undefined;
    srcLang?: string | undefined;
    srcSet?: string | undefined;
    start?: number | undefined;
    step?: number | string | undefined;
    summary?: string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    value?: string | number | undefined;
    width?: number | string | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;

    // Unknown
    radioGroup?: string | undefined; // <command>, <menuitem>

    // WAI-ARIA
    role?: AriaRole | undefined;

    // RDFa Attributes
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;

    // Non-standard Attributes
    autocapitalize?: string | undefined;
    autoCorrect?: string | undefined;
    autoSave?: string | undefined;
    color?: string | undefined;
    results?: number | undefined;
    security?: string | undefined;
    unselectable?: 'on' | 'off' | undefined;

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string | undefined;
}
interface JHTMLAttributes {
    
    key?: string | undefined;

    // Standard HTML Attributes
    accesskey?: string | undefined;
    //class?: string | undefined;
    contenteditable?: boolean | "inherit" | undefined;
    contextmenu?: string | undefined;
    dir?: string | undefined;
    draggable?: boolean | undefined;
    hidden?: boolean | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    placeholder?: string | undefined;
    slot?: string | undefined;
    spellcheck?: boolean | undefined;
    //style?: CSSStyleDeclaration | undefined;
    tabindex?: string | undefined;
    title?: string | undefined;
    translate?: 'yes' | 'no' | undefined;

    // Other Standard HTML Attributes
    accept?: string | undefined;
    acceptcharset?: string | undefined;
    action?: string | undefined;
    allowfullscreen?: boolean | undefined;
    allowtransparency?: boolean | undefined;
    alt?: string | undefined;
    as?: string | undefined;
    async?: boolean | undefined;
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    autoplay?: boolean | undefined;
    capture?: boolean | 'user' | 'environment' | undefined;
    cellpadding?: string | undefined;
    cellspacing?: string | undefined;
    charset?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    cite?: string | undefined;
    cols?: string | undefined;
    colspan?: string | undefined;
    content?: string | undefined;
    controls?: boolean | undefined;
    coords?: string | undefined;
    crossorigin?: string | undefined;
    data?: string | undefined;
    datetime?: string | undefined;
    default?: boolean | undefined;
    defer?: boolean | undefined;
    disabled?: boolean | undefined;
    download?: any;
    enctype?: string | undefined;
    form?: string | undefined;
    formaction?: string | undefined;
    formencType?: string | undefined;
    formmethod?: string | undefined;
    formnovalidate?: boolean | undefined;
    formtarget?: string | undefined;
    frameborder?: string | undefined;
    headers?: string | undefined;
    height?: string | undefined;
    high?: string | undefined;
    href?: string | undefined;
    hreflang?: string | undefined;
    for?: string | undefined;
    httpequiv?: string | undefined;
    integrity?: string | undefined;
    keyparams?: string | undefined;
    keytype?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    list?: string | undefined;
    loop?: boolean | undefined;
    low?: string | undefined;
    manifest?: string | undefined;
    marginheight?: string | undefined;
    marginwidth?: string | undefined;
    max?: string | undefined;
    maxlength?: string | undefined;
    media?: string | undefined;
    mediagroup?: string | undefined;
    method?: string | undefined;
    min?: string | undefined;
    minlength?: string | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    nonce?: string | undefined;
    novalidate?: boolean | undefined;
    open?: boolean | undefined;
    optimum?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    playsinline?: boolean | undefined;
    poster?: string | undefined;
    preload?: string | undefined;
    readonly?: boolean | undefined;
    rel?: string | undefined;
    required?: boolean | undefined;
    reversed?: boolean | undefined;
    rows?: string | undefined;
    rowspan?: string | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    size?: string | undefined;
    sizes?: string | undefined;
    span?: string | undefined;
    src?: string | undefined;
    srcdoc?: string | undefined;
    srclang?: string | undefined;
    srcset?: string | undefined;
    start?: string | undefined;
    step?: string | undefined;
    summary?: string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    value?: string | undefined;
    width?: string | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;

    // Unknown
    radiogroup?: string | undefined; // <command>, <menuitem>

    // WAI-ARIA
    role?: AriaRole;

    // RDFa Attributes
    about?: string | undefined;
    datatype?: string | undefined;
    inlist?: any;
    prefix?: string | undefined;
    property?: string | undefined;
    resource?: string | undefined;
    typeof?: string | undefined;
    vocab?: string | undefined;

    // Non-standard Attributes
    autocapitalize?: string | undefined;
    autocorrect?: string | undefined;
    autosave?: string | undefined;
    color?: string | undefined;
    results?: string | undefined;
    security?: string | undefined;
    unselectable?: 'on' | 'off' | undefined;

    // Living Standard
    /**
     * Hints at the type of data that might be entered by the user while editing the element or its contents
     * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
     */
    inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search' | undefined;
    /**
     * Specify that a standard HTML element should behave like a defined custom built-in element
     * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
     */
    is?: string | undefined;
}

// Taken from React (18.0) Type definitions 
// Project: http://facebook.github.io/react/
// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
type AriaRole =
    | 'alert'
    | 'alertdialog'
    | 'application'
    | 'article'
    | 'banner'
    | 'button'
    | 'cell'
    | 'checkbox'
    | 'columnheader'
    | 'combobox'
    | 'complementary'
    | 'contentinfo'
    | 'definition'
    | 'dialog'
    | 'directory'
    | 'document'
    | 'feed'
    | 'figure'
    | 'form'
    | 'grid'
    | 'gridcell'
    | 'group'
    | 'heading'
    | 'img'
    | 'link'
    | 'list'
    | 'listbox'
    | 'listitem'
    | 'log'
    | 'main'
    | 'marquee'
    | 'math'
    | 'menu'
    | 'menubar'
    | 'menuitem'
    | 'menuitemcheckbox'
    | 'menuitemradio'
    | 'navigation'
    | 'none'
    | 'note'
    | 'option'
    | 'presentation'
    | 'progressbar'
    | 'radio'
    | 'radiogroup'
    | 'region'
    | 'row'
    | 'rowgroup'
    | 'rowheader'
    | 'scrollbar'
    | 'search'
    | 'searchbox'
    | 'separator'
    | 'slider'
    | 'spinbutton'
    | 'status'
    | 'switch'
    | 'tab'
    | 'table'
    | 'tablist'
    | 'tabpanel'
    | 'term'
    | 'textbox'
    | 'timer'
    | 'toolbar'
    | 'tooltip'
    | 'tree'
    | 'treegrid'
    | 'treeitem';
    
interface ARIAMixins {
    "aria-atomic": string
    "aria-auto-complete": string
    "aria-busy": string
    "aria-checked": string
    "aria-colcount": string
    "aria-colindex": string
    "aria-colspan": string
    "aria-current": string
    "aria-disabled": string
    "aria-expanded": string
    "aria-haspopup": string
    "aria-hidden": string
    "aria-keyshortcuts": string
    "aria-label": string
    "aria-level": string
    "aria-live": string
    "aria-modal": string
    "aria-multiLine": string
    "aria-multi-selectable": string
    "aria-orientation": string
    "aria-placeholder": string
    "aria-posinset": string
    "aria-pressed": string
    "aria-readonly": string
    "aria-required": string
    "aria-roledescription": string
    "aria-rowcount": string
    "aria-rowindex": string
    "aria-rowspan": string
    "aria-selected": string
    "aria-setsize": string
    "aria-sort": string
    "aria-valuemax": string
    "aria-valuemin": string
    "aria-valuenow": string
    "aria-valuetext": string
}


interface AllHTMLAttributes {
    // Standard HTML Attributes
    accept?: string | undefined;
    acceptCharset?: string | undefined;
    action?: string | undefined;
    allowFullScreen?: boolean | undefined;
    allowTransparency?: boolean | undefined;
    alt?: string | undefined;
    as?: string | undefined;
    async?: boolean | undefined;
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    autoplay?: boolean | undefined;
    capture?: boolean | 'user' | 'environment' | undefined;
    cellPadding?: number | string | undefined;
    cellSpacing?: number | string | undefined;
    charSet?: string | undefined;
    challenge?: string | undefined;
    checked?: boolean | undefined;
    cite?: string | undefined;
    classID?: string | undefined;
    cols?: number | undefined;
    colSpan?: number | undefined;
    content?: string | undefined;
    controls?: boolean | undefined;
    coords?: string | undefined;
    crossOrigin?: string | undefined;
    data?: string | undefined;
    dateTime?: string | undefined;
    default?: boolean | undefined;
    defer?: boolean | undefined;
    disabled?: boolean | undefined;
    download?: any;
    encType?: string | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    frameBorder?: number | string | undefined;
    headers?: string | undefined;
    height?: number | string | undefined;
    high?: number | undefined;
    href?: string | undefined;
    hrefLang?: string | undefined;
    for?: string | undefined;
    httpEquiv?: string | undefined;
    integrity?: string | undefined;
    keyParams?: string | undefined;
    keyType?: string | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    list?: string | undefined;
    loop?: boolean | undefined;
    low?: number | undefined;
    manifest?: string | undefined;
    marginHeight?: number | undefined;
    marginWidth?: number | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    media?: string | undefined;
    mediaGroup?: string | undefined;
    method?: string | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    multiple?: boolean | undefined;
    muted?: boolean | undefined;
    name?: string | undefined;
    nonce?: string | undefined;
    noValidate?: boolean | undefined;
    open?: boolean | undefined;
    optimum?: number | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    preload?: string | undefined;
    readOnly?: boolean | undefined;
    rel?: string | undefined;
    required?: boolean | undefined;
    reversed?: boolean | undefined;
    rows?: number | undefined;
    rowSpan?: number | undefined;
    sandbox?: string | undefined;
    scope?: string | undefined;
    scoped?: boolean | undefined;
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    selected?: boolean | undefined;
    shape?: string | undefined;
    size?: number | undefined;
    sizes?: string | undefined;
    span?: number | undefined;
    src?: string | undefined;
    srcDoc?: string | undefined;
    srcLang?: string | undefined;
    srcSet?: string | undefined;
    start?: number | undefined;
    step?: number | string | undefined;
    summary?: string | undefined;
    target?: string | undefined;
    type?: string | undefined;
    useMap?: string | undefined;
    value?: string |  undefined;
    width?: number | string | undefined;
    wmode?: string | undefined;
    wrap?: string | undefined;
}

declare namespace HTMLTagsExtension {

    type HTMLAttributeReferrerPolicy =
    | ''
    | 'no-referrer'
    | 'no-referrer-when-downgrade'
    | 'origin'
    | 'origin-when-cross-origin'
    | 'same-origin'
    | 'strict-origin'
    | 'strict-origin-when-cross-origin'
    | 'unsafe-url';

type HTMLAttributeAnchorTarget =
    | '_self'
    | '_blank'
    | '_parent'
    | '_top';

interface AnchorHTMLAttributes {
    download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    ping?: string | undefined;
    rel?: string | undefined;
    target?: HTMLAttributeAnchorTarget | undefined;
    type?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
}

interface AudioHTMLAttributes {}

interface AreaHTMLAttributes {
    alt?: string | undefined;
    coords?: string | undefined;
    download?: any;
    href?: string | undefined;
    hrefLang?: string | undefined;
    media?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    rel?: string | undefined;
    shape?: string | undefined;
    target?: string | undefined;
}

interface BaseHTMLAttributes {
    href?: string | undefined;
    target?: string | undefined;
}

interface BlockquoteHTMLAttributes {
    cite?: string | undefined;
}

interface ButtonHTMLAttributes {
    autofocus?: boolean | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    name?: string | undefined;
    type?: 'submit' | 'reset' | 'button' | undefined;
    value?: string |  undefined;
}

interface CanvasHTMLAttributes {
    height?:  string | undefined;
    width?:  string | undefined;
}

interface ColHTMLAttributes {
    span?:  undefined;
    width?:  string | undefined;
}

interface ColgroupHTMLAttributes {
    span?:  undefined;
}

interface DataHTMLAttributes {
    value?: string | undefined;
}

interface DetailsHTMLAttributes {
    open?: boolean | undefined;
    onToggle?: ReactEventHandler<T> | undefined;
}

interface DelHTMLAttributes {
    cite?: string | undefined;
    dateTime?: string | undefined;
}

interface DialogHTMLAttributes {
    open?: boolean | undefined;
}

interface EmbedHTMLAttributes {
    height?:  string | undefined;
    src?: string | undefined;
    type?: string | undefined;
    width?:  string | undefined;
}

interface FieldsetHTMLAttributes {
    disabled?: boolean | undefined;
    form?: string | undefined;
    name?: string | undefined;
}

interface FormHTMLAttributes {
    acceptCharset?: string | undefined;
    action?: string | undefined;
    autocomplete?: string | undefined;
    encType?: string | undefined;
    method?: string | undefined;
    name?: string | undefined;
    noValidate?: boolean | undefined;
    target?: string | undefined;
}

interface HtmlHTMLAttributes {
    manifest?: string | undefined;
}

interface IframeHTMLAttributes {
    allow?: string | undefined;
    allowFullScreen?: boolean | undefined;
    allowTransparency?: boolean | undefined;
    /** @deprecated */
    frameBorder?:  string | undefined;
    height?:  string | undefined;
    loading?: "eager" | "lazy" | undefined;
    /** @deprecated */
    marginHeight?:  undefined;
    /** @deprecated */
    marginWidth?:  undefined;
    name?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sandbox?: string | undefined;
    /** @deprecated */
    scrolling?: string | undefined;
    seamless?: boolean | undefined;
    src?: string | undefined;
    srcDoc?: string | undefined;
    width?:  string | undefined;
}

interface ImgHTMLAttributes {
    alt?: string | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    decoding?: "async" | "auto" | "sync" | undefined;
    height?:  string | undefined;
    loading?: "eager" | "lazy" | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    useMap?: string | undefined;
    width?:  string | undefined;
}

interface InsHTMLAttributes {
    cite?: string | undefined;
    dateTime?: string | undefined;
}

type HTMLInputTypeAttribute =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

interface InputHTMLAttributes {
    accept?: string | undefined;
    alt?: string | undefined;
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    capture?: boolean | 'user' | 'environment' | undefined; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
    checked?: boolean | undefined;
    crossOrigin?: string | undefined;
    disabled?: boolean | undefined;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    height?:  string | undefined;
    list?: string | undefined;
    max?:  string | undefined;
    maxLength?:  undefined;
    min?:  string | undefined;
    minLength?:  undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    size?:  undefined;
    src?: string | undefined;
    step?:  string | undefined;
    type?: HTMLInputTypeAttribute | undefined;
    value?: string |  undefined;
    width?:  string | undefined;
}

interface KeygenHTMLAttributes {
    autofocus?: boolean | undefined;
    challenge?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    keyType?: string | undefined;
    keyParams?: string | undefined;
    name?: string | undefined;
}

interface LabelHTMLAttributes {
    form?: string | undefined;
    htmlFor?: string | undefined;
}

interface LiHTMLAttributes {
    value?: string |  undefined;
}

interface LinkHTMLAttributes {
    as?: string | undefined;
    crossOrigin?: string | undefined;
    href?: string | undefined;
    hrefLang?: string | undefined;
    integrity?: string | undefined;
    media?: string | undefined;
    imageSrcSet?: string | undefined;
    imageSizes?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    rel?: string | undefined;
    sizes?: string | undefined;
    type?: string | undefined;
    charSet?: string | undefined;
}

interface MapHTMLAttributes {
    name?: string | undefined;
}

interface MenuHTMLAttributes {
    type?: string | undefined;
}

interface MediaHTMLAttributes {
    autoplay?: boolean | undefined;
    controls?: boolean | undefined;
    controlsList?: string | undefined;
    crossOrigin?: string | undefined;
    loop?: boolean | undefined;
    mediaGroup?: string | undefined;
    muted?: boolean | undefined;
    playsInline?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
}

interface MetaHTMLAttributes {
    charSet?: string | undefined;
    content?: string | undefined;
    httpEquiv?: string | undefined;
    name?: string | undefined;
    media?: string | undefined;
}

interface MeterHTMLAttributes {
    form?: string | undefined;
    high?:  undefined;
    low?:  undefined;
    max?:  string | undefined;
    min?:  string | undefined;
    optimum?:  undefined;
    value?: string |  undefined;
}

interface QuoteHTMLAttributes {
    cite?: string | undefined;
}

interface ObjectHTMLAttributes {
    classID?: string | undefined;
    data?: string | undefined;
    form?: string | undefined;
    height?:  string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    useMap?: string | undefined;
    width?:  string | undefined;
    wmode?: string | undefined;
}

interface OlHTMLAttributes {
    reversed?: boolean | undefined;
    start?:  undefined;
    type?: '1' | 'a' | 'A' | 'i' | 'I' | undefined;
}

interface OptgroupHTMLAttributes {
    disabled?: boolean | undefined;
    label?: string | undefined;
}

interface OptionHTMLAttributes {
    disabled?: boolean | undefined;
    label?: string | undefined;
    selected?: boolean | undefined;
    value?: string |  undefined;
}

interface OutputHTMLAttributes {
    form?: string | undefined;
    htmlFor?: string | undefined;
    name?: string | undefined;
}

interface ParamHTMLAttributes {
    name?: string | undefined;
    value?: string |  undefined;
}

interface ProgressHTMLAttributes {
    max?:  string | undefined;
    value?: string |  undefined;
}

interface SlotHTMLAttributes {
    name?: string | undefined;
}

interface ScriptHTMLAttributes {
    async?: boolean | undefined;
    /** @deprecated */
    charSet?: string | undefined;
    crossOrigin?: string | undefined;
    defer?: boolean | undefined;
    integrity?: string | undefined;
    noModule?: boolean | undefined;
    nonce?: string | undefined;
    referrerPolicy?: HTMLAttributeReferrerPolicy | undefined;
    src?: string | undefined;
    type?: string | undefined;
}

interface SelectHTMLAttributes {
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    required?: boolean | undefined;
    size?:  undefined;
    value?: string |  undefined;
    onChange?: ChangeEventHandler<T> | undefined;
}

interface SourceHTMLAttributes {
    height?:  string | undefined;
    media?: string | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    type?: string | undefined;
    width?:  string | undefined;
}

interface StyleHTMLAttributes {
    media?: string | undefined;
    nonce?: string | undefined;
    scoped?: boolean | undefined;
    type?: string | undefined;
}

interface TableHTMLAttributes {
    cellPadding?:  string | undefined;
    cellSpacing?:  string | undefined;
    summary?: string | undefined;
    width?:  string | undefined;
}

interface TextareaHTMLAttributes {
    autocomplete?: string | undefined;
    autofocus?: boolean | undefined;
    cols?:  undefined;
    dirName?: string | undefined;
    disabled?: boolean | undefined;
    form?: string | undefined;
    maxLength?:  undefined;
    minLength?:  undefined;
    name?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    rows?:  undefined;
    value?: string |  undefined;
    wrap?: string | undefined;

    onChange?: ChangeEventHandler<T> | undefined;
}

interface TdHTMLAttributes {
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    colSpan?:  undefined;
    headers?: string | undefined;
    rowSpan?:  undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
    height?:  string | undefined;
    width?:  string | undefined;
    valign?: "top" | "middle" | "bottom" | "baseline" | undefined;
}

interface ThHTMLAttributes {
    align?: "left" | "center" | "right" | "justify" | "char" | undefined;
    colSpan?:  undefined;
    headers?: string | undefined;
    rowSpan?:  undefined;
    scope?: string | undefined;
    abbr?: string | undefined;
}

interface TimeHTMLAttributes {
    dateTime?: string | undefined;
}

interface TrackHTMLAttributes {
    default?: boolean | undefined;
    kind?: string | undefined;
    label?: string | undefined;
    src?: string | undefined;
    srcLang?: string | undefined;
}

interface VideoHTMLAttributes {
    height?:  string | undefined;
    playsInline?: boolean | undefined;
    poster?: string | undefined;
    width?:  string | undefined;
    disablePictureInPicture?: boolean | undefined;
    disableRemotePlayback?: boolean | undefined;
}

// this list is "complete" in that it contains every SVG attribute
// that React supports, but the types can be improved.
// Full list here: https://facebook.github.io/react/docs/dom-elements.html
//
// The three broad type categories are (in order of restrictiveness):
//   - " string"
//   - "string"
//   - union of string literals
interface SVGAttributes {
    // Attributes which also defined in HTMLAttributes
    // See comment in SVGDOMPropertyConfig.js
    class?: string | undefined;
    color?: string | undefined;
    height?:  string | undefined;
    id?: string | undefined;
    lang?: string | undefined;
    max?:  string | undefined;
    media?: string | undefined;
    method?: string | undefined;
    min?:  string | undefined;
    name?: string | undefined;
    style?: SpecialStyleString | undefined;
    target?: string | undefined;
    type?: string | undefined;
    width?:  string | undefined;

    // Other HTML properties supported by SVG elements in browsers
    role?: AriaRole | undefined;
    tabIndex?:  undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;

    // SVG Specific attributes
    accentHeight?:  string | undefined;
    accumulate?: "none" | "sum" | undefined;
    additive?: "replace" | "sum" | undefined;
    alignmentBaseline?: "auto" | "baseline" | "before-edge" | "text-before-edge" | "middle" | "central" | "after-edge" |
    "text-after-edge" | "ideographic" | "alphabetic" | "hanging" | "mathematical" | "inherit" | undefined;
    allowReorder?: "no" | "yes" | undefined;
    alphabetic?:  string | undefined;
    amplitude?:  string | undefined;
    arabicForm?: "initial" | "medial" | "terminal" | "isolated" | undefined;
    ascent?:  string | undefined;
    attributeName?: string | undefined;
    attributeType?: string | undefined;
    autoReverse?: Booleanish | undefined;
    azimuth?:  string | undefined;
    baseFrequency?:  string | undefined;
    baselineShift?:  string | undefined;
    baseProfile?:  string | undefined;
    bbox?:  string | undefined;
    begin?:  string | undefined;
    bias?:  string | undefined;
    by?:  string | undefined;
    calcMode?:  string | undefined;
    capHeight?:  string | undefined;
    clip?:  string | undefined;
    clipPath?: string | undefined;
    clipPathUnits?:  string | undefined;
    clipRule?:  string | undefined;
    colorInterpolation?:  string | undefined;
    colorInterpolationFilters?: "auto" | "sRGB" | "linearRGB" | "inherit" | undefined;
    colorProfile?:  string | undefined;
    colorRendering?:  string | undefined;
    contentScriptType?:  string | undefined;
    contentStyleType?:  string | undefined;
    cursor?:  string | undefined;
    cx?:  string | undefined;
    cy?:  string | undefined;
    d?: string | undefined;
    decelerate?:  string | undefined;
    descent?:  string | undefined;
    diffuseConstant?:  string | undefined;
    direction?:  string | undefined;
    display?:  string | undefined;
    divisor?:  string | undefined;
    dominantBaseline?:  string | undefined;
    dur?:  string | undefined;
    dx?:  string | undefined;
    dy?:  string | undefined;
    edgeMode?:  string | undefined;
    elevation?:  string | undefined;
    enableBackground?:  string | undefined;
    end?:  string | undefined;
    exponent?:  string | undefined;
    externalResourcesRequired?: Booleanish | undefined;
    fill?: string | undefined;
    fillOpacity?:  string | undefined;
    fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
    filter?: string | undefined;
    filterRes?:  string | undefined;
    filterUnits?:  string | undefined;
    floodColor?:  string | undefined;
    floodOpacity?:  string | undefined;
    focusable?: Booleanish | "auto" | undefined;
    fontFamily?: string | undefined;
    fontSize?:  string | undefined;
    fontSizeAdjust?:  string | undefined;
    fontStretch?:  string | undefined;
    fontStyle?:  string | undefined;
    fontVariant?:  string | undefined;
    fontWeight?:  string | undefined;
    format?:  string | undefined;
    fr?:  string | undefined;
    from?:  string | undefined;
    fx?:  string | undefined;
    fy?:  string | undefined;
    g1?:  string | undefined;
    g2?:  string | undefined;
    glyphName?:  string | undefined;
    glyphOrientationHorizontal?:  string | undefined;
    glyphOrientationVertical?:  string | undefined;
    glyphRef?:  string | undefined;
    gradientTransform?: string | undefined;
    gradientUnits?: string | undefined;
    hanging?:  string | undefined;
    horizAdvX?:  string | undefined;
    horizOriginX?:  string | undefined;
    href?: string | undefined;
    ideographic?:  string | undefined;
    imageRendering?:  string | undefined;
    in2?:  string | undefined;
    in?: string | undefined;
    intercept?:  string | undefined;
    k1?:  string | undefined;
    k2?:  string | undefined;
    k3?:  string | undefined;
    k4?:  string | undefined;
    k?:  string | undefined;
    kernelMatrix?:  string | undefined;
    kernelUnitLength?:  string | undefined;
    kerning?:  string | undefined;
    keyPoints?:  string | undefined;
    keySplines?:  string | undefined;
    keyTimes?:  string | undefined;
    lengthAdjust?:  string | undefined;
    letterSpacing?:  string | undefined;
    lightingColor?:  string | undefined;
    limitingConeAngle?:  string | undefined;
    local?:  string | undefined;
    markerEnd?: string | undefined;
    markerHeight?:  string | undefined;
    markerMid?: string | undefined;
    markerStart?: string | undefined;
    markerUnits?:  string | undefined;
    markerWidth?:  string | undefined;
    mask?: string | undefined;
    maskContentUnits?:  string | undefined;
    maskUnits?:  string | undefined;
    mathematical?:  string | undefined;
    mode?:  string | undefined;
    numOctaves?:  string | undefined;
    offset?:  string | undefined;
    opacity?:  string | undefined;
    operator?:  string | undefined;
    order?:  string | undefined;
    orient?:  string | undefined;
    orientation?:  string | undefined;
    origin?:  string | undefined;
    overflow?:  string | undefined;
    overlinePosition?:  string | undefined;
    overlineThickness?:  string | undefined;
    paintOrder?:  string | undefined;
    panose1?:  string | undefined;
    path?: string | undefined;
    pathLength?:  string | undefined;
    patternContentUnits?: string | undefined;
    patternTransform?:  string | undefined;
    patternUnits?: string | undefined;
    pointerEvents?:  string | undefined;
    points?: string | undefined;
    pointsAtX?:  string | undefined;
    pointsAtY?:  string | undefined;
    pointsAtZ?:  string | undefined;
    preserveAlpha?: Booleanish | undefined;
    preserveAspectRatio?: string | undefined;
    primitiveUnits?:  string | undefined;
    r?:  string | undefined;
    radius?:  string | undefined;
    refX?:  string | undefined;
    refY?:  string | undefined;
    renderingIntent?:  string | undefined;
    repeatCount?:  string | undefined;
    repeatDur?:  string | undefined;
    requiredExtensions?:  string | undefined;
    requiredFeatures?:  string | undefined;
    restart?:  string | undefined;
    result?: string | undefined;
    rotate?:  string | undefined;
    rx?:  string | undefined;
    ry?:  string | undefined;
    scale?:  string | undefined;
    seed?:  string | undefined;
    shapeRendering?:  string | undefined;
    slope?:  string | undefined;
    spacing?:  string | undefined;
    specularConstant?:  string | undefined;
    specularExponent?:  string | undefined;
    speed?:  string | undefined;
    spreadMethod?: string | undefined;
    startOffset?:  string | undefined;
    stdDeviation?:  string | undefined;
    stemh?:  string | undefined;
    stemv?:  string | undefined;
    stitchTiles?:  string | undefined;
    stopColor?: string | undefined;
    stopOpacity?:  string | undefined;
    strikethroughPosition?:  string | undefined;
    strikethroughThickness?:  string | undefined;
    string?:  string | undefined;
    stroke?: string | undefined;
    strokeDasharray?: string |  undefined;
    strokeDashoffset?: string |  undefined;
    strokeLinecap?: "butt" | "round" | "square" | "inherit" | undefined;
    strokeLinejoin?: "miter" | "round" | "bevel" | "inherit" | undefined;
    strokeMiterlimit?:  string | undefined;
    strokeOpacity?:  string | undefined;
    strokeWidth?:  string | undefined;
    surfaceScale?:  string | undefined;
    systemLanguage?:  string | undefined;
    tableValues?:  string | undefined;
    targetX?:  string | undefined;
    targetY?:  string | undefined;
    textAnchor?: string | undefined;
    textDecoration?:  string | undefined;
    textLength?:  string | undefined;
    textRendering?:  string | undefined;
    to?:  string | undefined;
    transform?: string | undefined;
    u1?:  string | undefined;
    u2?:  string | undefined;
    underlinePosition?:  string | undefined;
    underlineThickness?:  string | undefined;
    unicode?:  string | undefined;
    unicodeBidi?:  string | undefined;
    unicodeRange?:  string | undefined;
    unitsPerEm?:  string | undefined;
    vAlphabetic?:  string | undefined;
    values?: string | undefined;
    vectorEffect?:  string | undefined;
    version?: string | undefined;
    vertAdvY?:  string | undefined;
    vertOriginX?:  string | undefined;
    vertOriginY?:  string | undefined;
    vHanging?:  string | undefined;
    vIdeographic?:  string | undefined;
    viewBox?: string | undefined;
    viewTarget?:  string | undefined;
    visibility?:  string | undefined;
    vMathematical?:  string | undefined;
    widths?:  string | undefined;
    wordSpacing?:  string | undefined;
    writingMode?:  string | undefined;
    x1?:  string | undefined;
    x2?:  string | undefined;
    x?:  string | undefined;
    xChannelSelector?: string | undefined;
    xHeight?:  string | undefined;
    xlinkActuate?: string | undefined;
    xlinkArcrole?: string | undefined;
    xlinkHref?: string | undefined;
    xlinkRole?: string | undefined;
    xlinkShow?: string | undefined;
    xlinkTitle?: string | undefined;
    xlinkType?: string | undefined;
    xmlBase?: string | undefined;
    xmlLang?: string | undefined;
    xmlns?: string | undefined;
    xmlnsXlink?: string | undefined;
    xmlSpace?: string | undefined;
    y1?:  string | undefined;
    y2?:  string | undefined;
    y?:  string | undefined;
    yChannelSelector?: string | undefined;
    z?:  string | undefined;
    zoomAndPan?: string | undefined;
}

interface WebViewHTMLAttributes {
    allowFullScreen?: boolean | undefined;
    allowpopups?: boolean | undefined;
    autofocus?: boolean | undefined;
    autosize?: boolean | undefined;
    blinkfeatures?: string | undefined;
    disableblinkfeatures?: string | undefined;
    disableguestresize?: boolean | undefined;
    disablewebsecurity?: boolean | undefined;
    guestinstance?: string | undefined;
    httpreferrer?: string | undefined;
    nodeintegration?: boolean | undefined;
    partition?: string | undefined;
    plugins?: boolean | undefined;
    preload?: string | undefined;
    src?: string | undefined;
    useragent?: string | undefined;
    webpreferences?: string | undefined;
}
}

type HtmlAttributesTypes =
  | "abbr"
  | "accept-charset"
  | "accept"
  | "accesskey"
  | "action"
  | "align"
  | "alink"
  | "allow"
  | "allowfullscreen"
  | "allowpaymentrequest"
  | "alt"
  | "archive"
  | "async"
  | "autobuffer"
  | "autocapitalize"
  | "autocomplete"
  | "autofocus"
  | "autoplay"
  | "axis"
  | "background"
  | "behavior"
  | "bgcolor"
  | "border"
  | "bottommargin"
  | "buffered"
  | "cellpadding"
  | "cellspacing"
  | "char"
  | "charoff"
  | "charset"
  | "checked"
  | "cite"
  | "class"
  | "classid"
  | "clear"
  | "code"
  | "codebase"
  | "codetype"
  | "color"
  | "cols"
  | "colspan"
  | "command"
  | "compact"
  | "content"
  | "contenteditable"
  | "contextmenu"
  | "controls"
  | "coords"
  | "crossorigin"
  | "data"
  | "datafld"
  | "datasrc"
  | "datetime"
  | "declare"
  | "decoding"
  | "default"
  | "defer"
  | "dir"
  | "direction"
  | "dirname"
  | "disabled"
  | "download"
  | "draggable"
  | "enctype"
  | "enterkeyhint"
  | "exportparts"
  | "face"
  | "for"
  | "form"
  | "formaction"
  | "formenctype"
  | "formmethod"
  | "formnovalidate"
  | "formtarget"
  | "frame"
  | "frameborder"
  | "headers"
  | "height"
  | "hidden"
  | "high"
  | "href"
  | "hreflang"
  | "hspace"
  | "http-equiv"
  | "icon"
  | "id"
  | "imagesizes"
  | "imagesrcset"
  | "inputmode"
  | "integrity"
  | "intrinsicsize"
  | "is"
  | "ismap"
  | "itemid"
  | "itemprop"
  | "itemref"
  | "itemscope"
  | "itemtype"
  | "kind"
  | "label"
  | "lang"
  | "language"
  | "leftmargin"
  | "link"
  | "loading"
  | "longdesc"
  | "loop"
  | "low"
  | "manifest"
  | "marginheight"
  | "marginwidth"
  | "max"
  | "maxlength"
  | "mayscript"
  | "media"
  | "method"
  | "methods"
  | "min"
  | "minlength"
  | "moz-opaque"
  | "mozallowfullscreen"
  | "mozcurrentsampleoffset"
  | "msallowfullscreen"
  | "multiple"
  | "muted"
  | "name"
  | "nohref"
  | "nomodule"
  | "nonce"
  | "noresize"
  | "noshade"
  | "novalidate"
  | "nowrap"
  | "object"
  | "onafterprint"
  | "onbeforeprint"
  | "onbeforeunload"
  | "onblur"
  | "onerror"
  | "onfocus"
  | "onhashchange"
  | "onlanguagechange"
  | "onload"
  | "onmessage"
  | "onoffline"
  | "ononline"
  | "onpopstate"
  | "onredo"
  | "onresize"
  | "onstorage"
  | "onundo"
  | "onunload"
  | "open"
  | "optimum"
  | "part"
  | "ping"
  | "placeholder"
  | "played"
  | "poster"
  | "prefetch"
  | "preload"
  | "profile"
  | "radiogroup"
  | "readonly"
  | "referrerpolicy"
  | "rel"
  | "required"
  | "rev"
  | "reversed"
  | "rightmargin"
  | "rows"
  | "rowspan"
  | "rules"
  | "sandbox-allow-downloads"
  | "sandbox-allow-modals"
  | "sandbox-allow-popups-to-escape-sandbox"
  | "sandbox-allow-popups"
  | "sandbox-allow-presentation"
  | "sandbox-allow-same-origin"
  | "sandbox-allow-storage-access-by-user-activation"
  | "sandbox-allow-top-navigation-by-user-activation"
  | "sandbox"
  | "scope"
  | "scoped"
  | "scrollamount"
  | "scrolldelay"
  | "scrolling"
  | "selected"
  | "shadowroot"
  | "shape"
  | "size"
  | "sizes"
  | "slot"
  | "span"
  | "spellcheck"
  | "src"
  | "srcdoc"
  | "srclang"
  | "srcset"
  | "standby"
  | "start"
  | "style"
  | "summary"
  | "tabindex"
  | "target"
  | "text"
  | "title"
  | "topmargin"
  | "translate"
  | "truespeed"
  | "type"
  | "usemap"
  | "valign"
  | "value"
  | "valuetype"
  | "version"
  | "vlink"
  | "volume"
  | "vspace"
  | "webkitallowfullscreen"
  | "width"
  | "wrap"
  | "xmlns";

type HTMLElementTagNameTypes =
    "a"|
    "abbr"|
    "address"|
    "area"|
    "article"|
    "aside"|
    "audio"|
    "b"|
    "base"|
    "bdi"|
    "bdo"|
    "blockquote"|
    "body"|
    "br"|
    "button"|
    "canvas"|
    "caption"|
    "cite"|
    "code"|
    "col"|
    "colgroup"|
    "data"|
    "datalist"|
    "dd"|
    "del"|
    "details"|
    "dfn"|
    "dialog"|
    "div"|
    "dl"|
    "dt"|
    "em"|
    "embed"|
    "fieldset"|
    "figcaption"|
    "figure"|
    "footer"|
    "form"|
    "h1"|
    "h2"|
    "h3"|
    "h4"|
    "h5"|
    "h6"|
    "head"|
    "header"|
    "hgroup"|
    "hr"|
    "html"|
    "i"|
    "iframe"|
    "img"|
    "input"|
    "ins"|
    "kbd"|
    "label"|
    "legend"|
    "li"|
    "link"|
    "main"|
    "map"|
    "mark"|
    "menu"|
    "meta"|
    "meter"|
    "nav"|
    "noscript"|
    "object"|
    "ol"|
    "optgroup"|
    "option"|
    "output"|
    "p"|
    "picture"|
    "pre"|
    "progress"|
    "q"|
    "rp"|
    "rt"|
    "ruby"|
    "s"|
    "samp"|
    "script"|
    "section"|
    "select"|
    "slot"|
    "small"|
    "source"|
    "span"|
    "strong"|
    "style"|
    "sub"|
    "summary"|
    "sup"|
    "table"|
    "tbody"|
    "td"|
    "template"|
    "textarea"|
    "tfoot"|
    "th"|
    "thead"|
    "time"|
    "title"|
    "tr"|
    "track"|
    "u"|
    "ul"|
    "var"|
    "video"|
    "wbr";


type HTMLElementDeprecatedTagNameTypes =
    "acronym"|
    "applet"|
    "basefont"|
    "bgsound"|
    "big"|
    "blink"|
    "center"|
    "dir"|
    "font"|
    "frame"|
    "frameset"|
    "isindex"|
    "keygen"|
    "listing"|
    "marquee"|
    "menuitem"|
    "multicol"|
    "nextid"|
    "nobr"|
    "noembed"|
    "noframes"|
    "param"|
    "plaintext"|
    "rb"|
    "rtc"|
    "spacer"|
    "strike"|
    "tt"|
    "xmp";


type SVGElementTagNameTypes =
    "a"|
    "animate"|
    "animateMotion"|
    "animateTransform"|
    "circle"|
    "clipPath"|
    "defs"|
    "desc"|
    "ellipse"|
    "feBlend"|
    "feColorMatrix"|
    "feComponentTransfer"|
    "feComposite"|
    "feConvolveMatrix"|
    "feDiffuseLighting"|
    "feDisplacementMap"|
    "feDistantLight"|
    "feDropShadow"|
    "feFlood"|
    "feFuncA"|
    "feFuncB"|
    "feFuncG"|
    "feFuncR"|
    "feGaussianBlur"|
    "feImage"|
    "feMerge"|
    "feMergeNode"|
    "feMorphology"|
    "feOffset"|
    "fePointLight"|
    "feSpecularLighting"|
    "feSpotLight"|
    "feTile"|
    "feTurbulence"|
    "filter"|
    "foreignObject"|
    "g"|
    "image"|
    "line"|
    "linearGradient"|
    "marker"|
    "mask"|
    "metadata"|
    "mpath"|
    "path"|
    "pattern"|
    "polygon"|
    "polyline"|
    "radialGradient"|
    "rect"|
    "script"|
    "set"|
    "stop"|
    "style"|
    "svg"|
    "switch"|
    "symbol"|
    "text"|
    "textPath"|
    "title"|
    "tspan"|
    "use"|
    "view";

    import ".";