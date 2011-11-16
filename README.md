Want to prevent accidentally calling sync functions?

`require("nosync")` will clog that drain for you, by making all sync
functions throw after the next tick.

This still allows you to do whatever you need to in the setup phase of
your program, where synchronous IO is a good thing.
