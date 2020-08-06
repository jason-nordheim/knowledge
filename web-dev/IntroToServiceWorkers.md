# Intro to Service Workers 

## What are Service Workers 

Service workers allow web applications to continue working when the connection to the application server is unreachable. More technically, a service worker is a JavaScript file that gets registered with the device browser, and stays registered in the web browser allowing the web application to function even when the device is offline. 

## What happened before Service Workers 

Before [Progressive Web Applications](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps), developer's bult standard web applications, which worked (roughly) in the following manner: 

1. Browser make's request to remote server. 
2. Remote server responds with HTML/CSS/JavaScript. 
3. Browser interprets and render's content from Server. 
4. New request to application server is made, repeat (1 - 4) 

### Then Service Workers...  

Service worker's jump in this process by intercepting the request from the Browser, and using logic to determine if that request should go to the server, or should be processed locally. This means that some or all of a web application could work **offline**. 

#### Caveats 

Service workers are not golden hammer's (they can't be used to address every problem) - there are some limitations of Service Workers that should be kept in mind when deciding if using a Service Worker is worth the development cost. Let's review: 

* Service workers cannot directly access/modify the DOM 
  * Service workers work by intercepting HTTP requests, they do not have directly access to the DOM. [this is done via the "Post Message Interface"]
* Service worker's are "programmable network proxies" 
  * i.e. They are able to _programatically_ intercept, manipulate, and/or redirect network (HTTP) requests. 
* Service workers are "terminated" when not in use, and re-started when needed again. 
* Service workers are fully compatable with ES6 [promises syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  * [aka](https://www.yourdictionary.com/aka#:~:text=The%20definition%20of%20aka%20is,YourDictionary%20definition%20and%20usage%20example.); Service Worker's are compatbile with the `.then().catch()` asynchronous syntax 
* Service Workers **require** HTTPS _unless_ working on a [localhost](https://en.wikipedia.org/wiki/Localhost) environment. 

## Why would I want to use a service worker? 

* Service worker's are great for refreshing and caching information for use offline (think of hiking applications downloading trails)
* Defer actions requested while offline (sending an email, rating a trail, saving a song to a playlist) for when connectivity to the application server is re-established. 
* Download and store sets of information for access offline (offline trails, offline sounds, etc.)
* Offline push-notifications (typically for mobile devices) 

# The Service Worker Lifecycle 

1. **Register** your service worker
2. call the **install** event 
3. **activate** the service worker 