# What is GraphQL?  

[GraphQL](http://www.graphql.org/) is an API standard  as an [open-source project](https://facebook.github.io/react/blog/2015/02/20/introducing-relay-and-graphql.html) by [Facebook](https://www.facebook.com/) to be an alternative to REST.  

Instead of many endpoints that return fixed data-structures, [GraphQL](http://www.graphql.org/) only exposes a single API endpoint that responds precisely with the data specified in the HTTP request. 

## More efficient how? 

**Only the necessary data is transferred over the network, resulting in minimization of network consumption.**

GraphQL exposes a single endpoint that responds to HTTP requests for data (GraphQL requests), and evaluates the query and and replies to HTTP request with only the data specified. No more, no less. Unlike REST APIs, which have several endpoints and respond very structured responses to requests, often returning excess information and/or requiring multiple HTTP requests to piece together objects.

### REST vs. GraphQL (Technical Example) 

There is a blog application that has the following objects and relationships: 
* `user` - represents a user model. 
    * properties: 
        * `user.id` _integer_ (primary key, auto-incrementing)
        * `user.firstName` _string_ 
        * `user.lastName` _string_ 
        * `user.password_digest` _string_ 
        * `user.dob` _date-time_ 
    * relationships: 
        * has-many `followers` 
* `follow` - represents a subscription to another user's blog posts 
    * properties: 
        * `follow.id` _integer_ (primary key, auto-incrementing)
        * `follow.subscriber` _integer_ (foreign key, user who "follows" another user)
        * `follow.user` _integer_ (foreign key, user that is "followed")
    * relationships: 
        * has-many `users`
        * belongs-to `users` 

#### REST Approach 

A REST API for this blog application would have a `/users`" endpoint and a `/follows` endpoint with the following routes: 

**Users REST Endpoint** 
1. INDEX - GET `/users` 
2. SHOW - GET `/users/:id` 
3. CREATE - POST `/users/`
    * body (JSON): 
    ```js 
    { user: { firstName , lastName password, dob}
    ```  
4. UPDATE - PATCH `/users/:id` 
    * body (JSON): 
    ```js 
    { user: { firstName , lastName password, dob}
    ```   
5. DELETE - DELETE `/users/:id` 

**Follows REST Endpoint**  
The endpoint `/follows/` 
1. INDEX - GET `/follows` 
2. SHOW - GET `/follows/:id` 
3. CREATE - POST `/follows`
    * body (JSON): 
    ```js 
    { follow: { subscriber , user} 
    ```  
4. UPDATE - PATCH `/follows/:id` 
    * body (JSON): 
    ```js
    { follow: { subscriber , user} 
    ```   
5. DELETE - DELETE `/follows/:id` 


In order to get all the users that follow the user currently logged in (assuming basic setup and no nested routes) the following logic would be executed: 

1. Front-end (client) executes a HTTP`GET` request to the `/follows` endpoint (index)
2. REST API (backend/server) queries the all the `follow` records in the database, and encodes them as JSON in the body of the HTTP response (status `200` _success_) returned to the client. 
3. Front-end (client) decodes HTTP request and parses the JSON data from the body creating an array in memory with all the `follow` objects returned from the `GET` request. 
4. Front-end (client) executes a reduce function, filtering down the array of `follow` objects so that it only includes the ones whose `user` field matches the `id` field of the authenticated user. 
5. Front-end (client) executes a HTTP `GET` request to `/users` endpoint (index)
6. REST API (backend/server) queries database for all the `user` records in the database, and encodes them as JSON data in the body of an HTTP response (status `200` _success_) returned to the client. 
7. Front-end (client) creates an array to store the associated `user` objects, then loops over the `user` (foreign key) field filtered from the `GET` request to the follow `/follow` adding the user's with the corresponding `ids`. 


#### GraphQL Approach 

1. Front-end (client) sends GraphQL query to server: 
    * body: 
    ```graphql 
    query {
        Follow (user: 23){
            Followers {
                firstName 
                LastName
            }
        }
    }
    ```
2. GraphQL API (backend/server) queries the database for all the records of `follows` the whose `user` propety is  `23`, then takes those foreign keys (`follow.user`) to query the database for all the `user` records contained in the result of the first query and returns an HTTP response to the client containing an array of objects each with `firstName` and `lastName` fields of **only** the `user` models with matching `follow.user` 

#### The difference 

REST APIs are built with 5-7 routes for each of the endpoints. Each endpoint represents a collection of records in a database (in a "table" in relational databases), and return either a single record (object) or all of the records (objects). The client (frontend) is then responsible for parsing the responses, filtering the data (if needed) and making additional subsequent requests for more information (if needed), which returns individual records (objects) or all records associated with an endpoint (or "table") in strictly defined data structures which could result in repeating the filtering of data, and making additional/supplemental HTTP requests over and over until all the data is necessary information is gathered. 

GraphQL APIs reduce the number of HTTP requests/responses by enabling the developer to "declare" exactly the information needed, and allow the API to join, filter and sort data in a single HTTP request (similar to filtering done in SQL databases using the `where` operator). 

Instead of providing excess records (e.g. REST `INDEX`) The HTTP response generated from the GraphQL server contains only the records that match the conditions specified in by the client, and each object only has the fields specified, stripping out additional fields and objects, and (in some cases) dramatically reducing the size of the HTTP response. 

## TLDR; 

GraphQL takes a declarative, SQL-_like_ approach to data fetching (APIs), and increases application efficiency and flexibility by enabling client (frontend) request to _declare_ the required information, then querying,  filtering, ordering, and joining records/objects (like a SQL statement) and returning **only** the _declared_ records and fields. No extraneous records, and only the fields _declared_. 

This approach allows GraphQL to reduce both the number/frequency of HTTP request and size of HTTP requests.   