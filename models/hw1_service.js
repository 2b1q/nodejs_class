/*
* [model]
* Only for Education purpose
* Home work 1 services
*/

// greeting function return rand greet
const greeting = ()=> {
  let greets =
  ['Happy "Not Monday"'
  ,"Hello from the other side"
  ,"Hope you're surviving another workweek"
  ,"I hope you've had your coffee already"
  ,"It's me again"
  ,"I'll keep this short"
  ,`I'm sorry if this Message sabotaged "inbox zero" for you`
  ,"Just what you want: another greeting!"]
  return greets[Math.floor(Math.random()*greets.length)];
}

// simple hello service
exports.hello = (ua) => new Promise((resolve) => {
  let greet = greeting(); // get greet str
  resolve({
    greeting: greet,
    your_browser: ua
  })
});
