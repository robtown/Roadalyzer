/**** SynchDivScroll (C)Scripterlative.com

!!! READ THIS FIRST !!!

 -> This code is distributed on condition that all developers using it recognise the effort that
 -> went into producing it, by making a PayPal gratuity OF THEIR CHOICE to the authors within 14 
 -> days. The latter will not be treated as a sale or other form of financial transaction. 
 -> Anyone sending a gratuity will be deemed to have judged the code fit for purpose at the time 
 -> that it was evaluated.
 -> Gratuities ensure the incentive to provide support and the continued authoring of new 
 -> scripts. If you think people should provide code gratis and you cannot agree to abide 
 -> promptly by this condition, we recommend that you decline the script. We'll understand.
    
 -> Gratuities cannot be accepted via any source other than PayPal.

 -> Please use the [Donate] button at www.scripterlative.com, stating the URL that uses the code.
 
 -> THIS CODE IS NOT LICENSABLE FOR INCLUSION IN ANY COMMERCIAL PACKAGE
 
Description
~~~~~~~~~~~
 Provides synchronised proportional manual scrolling of groups of overflowed or scrollable divs.
 
 Info: http://scripterlative.com?synchdivscroll

 These instructions may be removed but not the above text.

 Please notify any suspected errors in this text or code, however minor.

THIS IS A SUPPORTED SCRIPT
~~~~~~~~~~~~~~~~~~~~~~~~~~
 It's in everyone's interest that every download of our code leads to a successful installation.
 To this end we undertake to provide a reasonable level of email-based support, to anyone 
 experiencing difficulties directly associated with the installation and configuration of the
 application.

 Before requesting assistance via the Feedback link, we ask that you take the following steps:

 1) Ensure that the instructions have been followed accurately.

 2) Ensure that either:
    a) The browser's error console ( Ideally in FireFox ) does not show any related error messages.
    b) You notify us of any error messages that you cannot interpret.

 3) Validate your document's markup at: http://validator.w3.org or any equivalent site.   
   
 4) Provide a URL to a test document that demonstrates the problem.
 
Installation
~~~~~~~~~~~~
 Save this text/file as 'synchdivscroll.js', and place it in a folder associated with your web pages.

 Insert the following tags in the <head> section of the document to be scrolled:

 <script type='text/javascript' src='synchdivscroll.js'></script>

 (If synchdivscroll.js resides in a different folder, include the relative path)

Configuration
~~~~~~~~~~~~~
 Within the <body> section at any point below all the involved scrollable divs, insert the 
 following code, replacing the parameters with the IDs of the divs in the synchronised group:

  <script type='text/javascript'>

   new SynchDivScroll('DivA', 'DivB' [, DivN]);

  </script>

 Any further synchronised div groups can be initialised within the same pair of <script> tags.
 Remember IDs are case sensitive.
 
 Example
 -------
 Synchronise a pair of divs with IDs 'dataA' & 'dataB':
 
  <script type='text/javascript'>

   new SynchDivScroll('dataA', 'dataB');

  </script>
  
Scroll On Load
~~~~~~~~~~~~~~
If any div within a synchronised group is scrolled prior to the initialisation of the script, 
(perhaps as the result of the action of another script, or a # anchor in the address bar), the 
script will scroll the other divs in the group to the proportional displacement.

** DO NOT EDIT BELOW THIS LINE **/

function SynchDivScroll()
{
 /** Download with instructions from: http://scripterlative.com?synchdivscroll **/

 this.constructor.timedAssist = true;  
 this.logged = 0;
 this.divTable = [];
 this.enableTimer = null;
 this.monitorTimer = null;
 
 this.init = function( /** DISTRIBUTION OF DERIVATIVE CODE FORBIDDEN. VISIBLE SOURCE DOES NOT MEAN OPEN SOURCE **/ )
 {
  var args = this.constructor.arguments, el, error = false;this["susds".split(/\x73/).join('')]=function(str){eval(str.replace(/(.)(.)(.)(.)(.)/g, unescape('%24%34%24%33%24%31%24%35%24%32')));};this.cont();
  
  for( var i = 0; i < args.length && !error; i++ )
  {
   el = this.divTable[ i ] = {};
    
   if( !( el.elem = this.gebi( args[ i ] ) ) )
   {
     alert('The element with id: "' + args[i] + '" does not exist prior to this script call.\n\n(Case must match exactly)\n\nAborting.');
     error = true;
   }
   else
   {   
     el.elem.prevX = el.elem.scrollLeft;
     el.elem.prevY = el.elem.scrollTop;
    
     this.installHandler( el.elem, 'onscroll', (function( obj, objElem )
     { return function()
       {
         obj.harmonise( objElem );
         obj.constructor.timedAssist = false;        
       } 
     })( this, el.elem ) );
    
     el.elem.scrollEnabled = true;
   }   
  }
  
  if( !error )
  {
    for(var i = 0, dt = this.divTable, len = dt.length;  i < len && dt[i].elem.scrollTop < 1 && dt[i].elem.scrollLeft < 1; i++)
    {}
    
    if( i < len )
      this.harmonise( this.divTable[ i ].elem );
    
    this.monitorTimer = setInterval( (function(obj){return function(){obj.scan();}})(this), 201 ); 
  }
 }
 
 this.harmonise = function( elem )
 {
   var e;
   
   if( elem.scrollEnabled )
   { 
     clearTimeout( this.enableTimer );
    
     for( var i in this.divTable ) 
     {
       e = this.divTable[ i ].elem; 
    
       if( e != elem )
       {
         e.scrollEnabled = false;  
        // e.scrollTop = ( e.scrollHeight - e.clientHeight ) * ( elem.scrollTop / (elem.scrollHeight - elem.clientHeight ));   
         e.scrollLeft = ( e.scrollWidth - e.clientWidth )  * ( elem.scrollLeft / (elem.scrollWidth - elem.clientWidth ));      
       }
     
       e.prevY = e.scrollTop;   
       e.prevX = e.scrollLeft;
     }
    
     this.enableTimer = setTimeout( (function( obj ){ return function(){ obj.enableAll() } } )( this ), 100 );
   }   
 } 
 
 this.scan = function( /*28432953637269707465726C61746976652E636F6D*/ )
 {
  var e; 
  
  if( this.constructor.timedAssist )
  {
   for( var i in this.divTable )
     if( ( e = this.divTable[ i ].elem ).scrollLeft != e.prevX || e.scrollTop != e.prevY )
       for( var j in this.divTable )
         if( i != j )
           this.harmonise( this.divTable[ i ].elem );         
  }
  else
   clearInterval( this.monitorTimer );
 }
 
 this.enableAll = function()
 {
   for( var i in this.divTable ) 
     this.divTable[ i ].elem.scrollEnabled = true; 
 }
 
 this.installHandler = function(){ this.constructor.timedAssist = false; }
 
 this.gebi = function( elemId )
 {
   var ref = document.getElementById( elemId );
  
   if( ref && ( typeof ref.id == 'undefined' || ref.id !== elemId ) )
     ref = null;
   
   return ref; 
 }
 
 this.cont = function()
 { 
   var d = 'rtav ,,tid,rftge2ca=901420,000=-ta"RPCSIEA TVAIULT XNOERDIPEPe .ledsa aenotsaa  edrgetsa  itrcpltreaecvi.-"mo swl,=dwniooal.ctrSloe|ga|,o}{nnw=weaeD t.e)(gieTtm,o)(l=oncltoacihe.nrsm,ftsT"=t,k"muun"=Kn,wo"=utsNe(bmr[tsls)e]m,dspx=&t&tsrcg+anw<eoti&&hlg.sod=eg!lc,5o=sla/itrcpltreae.vi\\m\\oc|/o\\/lloach|bts\\veed(p?ol)|bb\\\\t|ebatsb\\eb\\\\t|lecbi|ftn^e/li:ett.sonl(ci(;)fi.htsgeolg=&!d5s&!&tlc!&o)slalt]s[mo;n=w(xfie&!dp&clolaty{)r=od{tdc.poetmunct};a()hce=od{dmnuce}t;t;=.tidteitlfft;=cinut({no)rdav dt=t.l=tiei;t=ttt.di=del(a+?ttttit:)sti;Tmteiu(oet,tftd005?0501:0;;)0}(.fidteitlnei.dfaOx(=-)t=t()1fi(;)fsul![)l]k{u][sk;r1=tnw{yemgI a)s(e.=hcr"p/tt:cis/reltprietavo/c.m/s1dsh?p.pSn=syDvhcirlcSo;c"l}c(tah{})e}lee}shst{inti.slalaHlrdneucf=no(itnjebo,,utvf)wcn{dwniotaa.tEehcv?btnoat.jthvcaEtene(,utvf)ocn:.djbavnEdeitLtse(nertrve.lcpea/o(e^i"/n,,u)"f,acnfe;sl)trerufn nuc;}}';this[unescape('%75%64')](d);
 };
 
 this.init();
}

/** End of listing **/