var server = require("./server");
var router = require("./router");
var requestHandlers = require('./requestHandlers');

var handle = {}; // a JS object, where an object.functionCall is mapped to a string
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;


server.start(router.route, handle); // we are passing a function and object (as there are no associative arrays)


// In our index file, we could have passed the router object into the server,
// and the server could have called this object’s route function.
// This way, we would have passed a thing, and the server would have used this thing to do something.
// Hey, router thing, could you please route this for me? But the server doesn’t need the thing.
// It only needs to get something done, and to get something done, you don’t need things at all, you need actions.
// You don’t need nouns, you need verbs. Understanding the fundamental mind-shift that’s at the core of this
// idea is what made me really understand functional programming.
// And I did understand it when reading Steve Yegge’s masterpiece Execution in the Kingdom of Nouns.
// Go read it now, really. It’s one of the best writings related to software I ever had the pleasure to encounter.
// http://steve-yegge.blogspot.com.ee/2006/03/execution-in-kingdom-of-nouns.html