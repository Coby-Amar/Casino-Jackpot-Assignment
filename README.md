# Casino Jackpot Assignment

## Thoughts 

**UCP - means used/using chatgpt prompt

1. created the repo <b>PR</b> - Initial commit
2. created client folder with base bones using `npm create vite@latest` react with typescript <b>PR</b> - created bones for client vite with react
3. created server folder with base bones UCP `create base ts express server and add testing add nodemon`
4. fixed chat gpt results to match a more human use <b>PR</b> - added server and made global gitignore
5. think of which to start with server or client and decided server
6. UCP `add sessions to express ts` to add sessions to the server
7. UCP `add .env` to add environment variables
8. create app routes index and slots route ( under assumtion that later there will be more routes i created a template for the design of new routes )  
9. create app middleware so if user doesnt exist on session creates new one ( because there is no login for now ) 
10. create model for user so that we can use later for now only has credits and added to session for now
11. created bones for roll function <b>PR</b> - added sessions middleware .env and routes bones
12. <b>PR</b> - moved tests to src folder and changed config to ts  