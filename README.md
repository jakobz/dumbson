# dumbson

JavaScript objects to query string serialization format.

Basically, it swaps '[]{}:,"' chars, which are escaped in query, with corresponding '()-!*.~', which are not escaped. Then it uses plain JSON.stringify and JSON.parse.

For example, { name: "John", value: 15 } gives "-~name~*~John~.~value~*15!"

This looks retarded, however:
- this approach supports everything you can put into JSON
- it gives better URLs, than just putting JSON into query, or base64(json)
- there is strong guarantee that serialize(parse(dumbson)) = dumbson

stringifyQuery and parseQueryString utilize "&a=b&c=d" pattern for 1-st level, which looks a bit better.

## Examples

```javascript

stringify({ filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null }) // "-~filter~*-~type~*(1.4.3).~color~*~red~.~size~*null!.~sort~*~name~.~page~*0.~mode~*null!"

parse("-~filter~*-~type~*(1.4.3).~color~*~red~.~size~*null!.~sort~*~name~.~page~*0.~mode~*null!")
// { filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null }

stringifyQuery({ filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null }) // "filter=-~type~*(1.4.3).~color~*~red~.~size~*null!&sort=~name~&page=0&mode=null"

parseQueryString("filter=-~type~*(1.4.3).~color~*~red~.~size~*null!&sort=~name~&page=0&mode=null") // { filter: { type: [1,4,3], color: 'red', size: null }, sort: 'name', page: 0, mode: null }

```

## Using with react-router

```javascript
import * as dumbson from 'dumbson';

const routerHistory = useRouterHistory(...)(dumbson);
```
