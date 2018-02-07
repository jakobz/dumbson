# dumbson

JavaScript objects to query string serialization format.

It uses plain JSON.stringify, and then swaps '[]{}:,"' chars, which are escaped in query, with corresponding '()-!*.~', which are not escaped. This is done to reduce length of URL, and improve readability:

```javascript
json: {"name":"John","value":15}
dumbson: -~name~*~John~.~value~*15!
encodeURI(json): %7B%22name%22:%22John%22,%22value%22:15%7D
encodeURI(dumbson): -~name~*~John~.~value~*15!
```

This looks retarded, however:
- it gives better URLs, than just putting plain or base64 JSON into query string
- it works as reliable as plain JSON
- there is strong guarantee that ```serialize(parse(dumbson)) = dumbson```

## Usage

```
npm i dumbson -s
```

```javascript
import * as dumbson from 'dumbson';

stringify({ filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null })
// "-~filter~*-~type~*(1.4.3).~color~*~red~.~size~*null!.~sort~*~name~.~page~*0.~mode~*null!"

parse("-~filter~*-~type~*(1.4.3).~color~*~red~.~size~*null!.~sort~*~name~.~page~*0.~mode~*null!")
// { filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null }


// stringifyQuery and parseQueryString utilize "&a=b&c=d" pattern for 1-st level, which looks a bit better.

stringifyQuery({ filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null })
// "filter=-~type~*(1.4.3).~color~*~red~.~size~*null!&sort=~name~&page=0&mode=null"

parseQueryString("filter=-~type~*(1.4.3).~color~*~red~.~size~*null!&sort=~name~&page=0&mode=null")
// { filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null }

```

## Using with react-router

```javascript
import * as dumbson from 'dumbson';

const routerHistory = useRouterHistory(...)(dumbson);
```
