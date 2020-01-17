/**Preface
- We will be exploring all the parts of JS
- Many people say JS is the worst popular language, but that is just not true
- JS is world's most ubiquitous and influential programming language
- Every part of JS is useful
- KEY - approach JS with a fresh set of eyes, attempt to understand how every line of code works/WHY it works
- Not possible to fully know JS, but something to strive for

The Mission:
- 'You will always be more effective in your development work if you more completely understand how your code works'
- - 'Good enough to work' should never be just good enough
- Write every line of code with intention and clairty

The Path:
- Don't binge the books - stop after each section and practice code/ideas from the section
- The more you understand JS, the more questions you will ask and the more you will have to explore
*/

/**Chapter 1 - What is Javascript?

About this book:
- Knowing JS is not a destination, but a direction
- All of JS is founded on three fundamental pillars - Scopes/Closures, Prototypes/Objects, Types/Coercion 
- A good start always depends on a solid first step

What's with the name?
- JavaScript was voted on, was intended to be used by Java programmers
- 'Script' was used at the time to refer to lightweight programs
- Marketing ploy to position it as a better alternative to Java
- NOT a variant of the Java language

Language Specification
- JS's syntax and behaviors are defined in the ES specification
- TC39 comittee is the one that meets and decides on JS specifications
- Generally meets about every month
- Voice of every TC39 member determines what direction JS will take


The Web Rules Everything About JS
- How JS is implemented for web browsers is really the only reality that matters


Not All (Web) JS
- alert("Hello, world!"); is not technically a JS program, not included in JS specification
- Various JS environments add APIs to global scope of your JS programs
    - Tinhs like JS engines, Node.js, etc.
- console.log() is not actually defined in JS specs, but have universal utility

It's Not Always Js
- console/REPL in browser's DevTools is not a straightforward JS environment
    - Are just tools for developers
    - Can't treat the console as a true JS environment
- Above tools will not always adhere to the nuances of JS
- KEY - think of the console as a JS approximation

Many Faces
- 'Paradigm' - refers to a broad mindset to structuring code
- Typical paradigm-level code categories - Procedural, Object-Oriented, and Functional programming
    - Procedural - organizes code in top-down, linear progression, usually collected together in related units called procedures
    - Object-Oriented (classes) - Organizes code by collecting logic/data together into classes
    - Functional Programming - organizes code into functions 
    
- Above are orientations for how programmers approach problems and solutions
- KEY - JavaScript is definitely a multi-paradigm language (can chose paradigm on a line-by-line basis)

Backwards and Forwards
- Javascript - guided by preservation of backwards compatibility
- Backwards Compatibility - means once something is accepted as official JS, there will not be a future change
in the language that will make that new code become invalid
    - Code written in 1995 should still function today
- Idea is that JS developers can write code with confidence that their code will not stop working
    - Makes JS choice as a language a safe choice for the future
- Not many other examples of this level of comittment in other programming languages
- Once a feature is in JS, can't really remove it because this might break programs

- Forwards compatibility - including a new addition to the language in a program would not cause that program to break,
if it were to run an older version of JS
    - JS is not forwards compatible 
    - CSS and HTML are forwards compatible

Jumping the Gaps
- If you run a program that uses an ES2019 feature in an engine from 2016, your program will most likely crash
- For new/incompatible syntax - solution is transpiling
    - Transpiling - common version is Babel - converts unrecognized newer JS syntax to an older version, to allow
    code to run
*/

//Example - developer might write code like this:

if (something) {
    let x = 3;
    console.log(x);
}
else {
    let x = 4;
    console.log(x);
}

//Babel may transpile the above code to look like this:

var x$0;
var x$1;
if (something) {
    x$0 = 3;
    console.log(x$0);
} else {
    x$1 = 4;
    console.log(x$1);
}

/**
- Above program output by Babel just choses to rename variables, removing the need for let usage
    - Let was added in ES6, so at first many programs had to transpile to not use Let
- Strongly recommended that developers use latest version of JS so their code is clean
- Should always focus on writing clean/new syntax forms, and let tools produce forwards compatibility

Filling the Gaps:
- For an API method that was only recently added, most common solution is to add a polyfill, or ('shim')
    -Stands in and acts as if older environment already had it named
Example: */

// getSomeRecords() returns a promise for some data it will fetch
var pr = getSomeRecords();

//Show the UI spinner while we get this done
startSpinner();

pr
    .then(renderRecords)
    .catch(showError)
    .finally(hideSpinner)

/**Above code utilizes the .finally method, which is ES2019 feature
 - If used in pre ES2019 environment, .finally method would not be supported and error would occur
 
- A polyfill for .finally for pre-ES2019 environments could look like this*/

if (!Promise.prototype.finally) {
    Promise.prototype.finally = function f(fn){
        return this.then(
            function t(v){
                return Promise.resolve( fn() )
                    .then(function t(){
                        return v;
                    });
            },
            function c(e){
                return Promise.resolve( fn() )
                    .then(function t(){
                        throw e;
                    });
            }
        );
    };
}
/**KEY - use ES-Shim npm package, gives you tons of shims to use for newer methods
- Transpilers such as Babel usually  */
