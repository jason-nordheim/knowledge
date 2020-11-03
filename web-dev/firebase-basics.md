# Firebase Basics 

Firebase is a sort of 'BaaS' or 'Backend-as-a-Service'... It streamlines the development process for developers and eliminates the need for developers to write/maintain server-side code (i.e. things like; authentication, trusted API calls, security logic, database connections, scalling, and so much more) 

This is what makes Firebase so powerful; it enables developers to setup full-stack applications quickly leveraging the [Google Cloud platfom](https://cloud.google.com) to deliver this functionality as well as dynamically scaling the hardware (via virtual harware) to ensure performance accross geographic regions and at scale (i.e. with a growing user-base). 


## Getting Started 

### Pre-reqs 

Before you get started with Firebase you should have: 
* A Google Account (free)
* Node JS & npm (Node Package Manager) installed 
* Internet Connection (to setup project) 

> It is suggested you also install the firebase CLI tools using the command. Instructions for installation can be found [here](https://firebase.google.com/docs/cli)

### Defining a Firebase Project 

A "Firebase project" is 
* a container for the Google's cloud infastructure. 
* can contain multiple "apps"

### Creating a Firebase Project 

To create a new project, you will need open the [Firebase Console](https://console.firebase.google.com/), login with your google account and create a new project. 

Once logged in, you should see your main dashboard with any projects you have created. From the main dashboard select: "Add Project". This will ask you to give your project a name, which it will use to generate a unique URL (if the name is already taken, random characters will be attached to the project name provided). 

### Installing the CLI 

There are [multiple ways to install the firebase command line tools (CLI)](https://firebase.google.com/docs/cli), but since most people using firebase, we will simply cover the install via npm here: 

First, we need to ask npm to download and install the `firebase-tools` globally. 

```sh 
npm install -g firebase-tools 
```

#### Connecting the Firebase CLI with your Google account 

Next we will need to login with the same google account used before. On the command line, run `firebase login` which should open your default browser and have you login to your Google account. 

#### Configuring your project

Once authenticated, we can initialize our project. Start by navigating to your project's root directory (if you have not already done so). Once in the root of your project's directory, begin the configuration for firebase using the command: `firebase init`. 

This will display a command-line menu that will configure the project to connect to Firebase. 

##### Project Selection 

First, you will be prompted to select the project that you created (from the projects created in the Firebase console) or create a new one. 

Next the firebase CLI will prompt you to select what features/tools from Firebase you plan on using so it can configure your project accordingly. 

> Some of the Firebase CLI menus have you select multiple options. You can make selections by using using the arrow keys to select an option, then the space bar to toggle the selection of that item. 

##### Project & Technology Configuration 

Generally, we will want to install the tools for "hosting" and "emulators" which will enable deployment to Google's cloud platform and local emulation of our application for testing and debugging. 

* Hosting sets up a cloud container that will be enable delivery of the application globally via Google's CDN (content delivery network). 
* Emulators allow us to simulate interactions with Firebase technologies locally 

Once those selections have been made, the Firebase CLI will ask which folder (within the project directory, conventially vanilla JavaScript applications are configured in a `~/publc/` directory). This directory shoulld contain everything your application needs to function and once selected, will be deployed to Google's hosting platform. 

> If using vanilla JavaScript to create your application, the files can be place directly in the project's directory, but more commonly developers are using Firebase in conjunction with front-end frameworks like React, Vue, Angular, etc. These frameworks will likely require a compiling to a build directory. 

Next the Firebase CLI will ask if the application is a "single-page app" (SPA). In most cases, you will want to answer "yes" (`y`). 

Assuming there is already an `index.html` (and you specified that as the entry point into the application), Firebase will display a message saying `File public/index.html already exists. Overwrite? (y/n)`, for which the answer is almost always `n` (no) as we do not want to erase the content in `index.html`. 

#### Emulator Setup 

The Firebase emulator allows developers to _simulate_ interactions with firebase locally for testing purposes, without actually performing any CRUD (create, read, update, delete) functions or having network connectivity. 

#### Finishing up 

Upon completion of the all the prompts from the Firebase CLI, there should be 2 new files in the project's root directory: 

* `.firebaserc` - firebase resource configuration file, used to identify the associated cloud project 
* `firebase.json` - configuration file that can be modified depending on how and what Firebase services are needed

#### Running and debugging your app 

You can run your application (including Firebase emulators) by running the command `firebase serve` from the root of the project directory. 

> Note: This assumes you already ran `firebase init` and configured your project 

This will spin up a local web server on [localhost:5000](localhost:5000) so you can star


#### Deploying the application (Hosting)

When all the bugs have been worked out, the next step would be to get it out there so people can use it, after all - an application is no good to anyone if they can't access it. 

> Note: This assumes you already ran `firebase init` and configured your project 

To deploy, once again proceed to the root directory of your project via the command line and run the command: `firebase deploy` , which will take the files within the configured diretory (conventially called `public`) and upload them to a cloud storage container. 



## User Authentication 

You can conceptualize Firebase Authentication by thinking of it as a 'read-only' database for your users. 

Within the [Firebase console](https://console.firebase.google.com/), make sure you are in the correct project, then select 'Authentication' from the 'Develop' section in the left-hand menu. 

Within the 'Authentication' tab, you should see additional pages for 'Users', 'Sign-in methods', 'Templates', and 'Usage', and the 'Users' page should be open by default. 

### Setup 

Before you can do anything with Firebase authentication, it you have to choose and enable an authentication provider (many sign-in providers are supported, see 'Sign-on' page). 

> The simpliest provider to setup is the 'Google' provider. 

Any user's that 'Sign-up' for this application would show up here. In order to manually ad users within the console, the 'Email/Password' sign-in method must be enabled. 

Once someone registers or signs in via one of the supported providers, Firebase will generate a UUID or a unique record identifier for this user. This will be key in connecting application data with users. 

Additionally, you can remove a user, grab their unique identifier, disable their account, or send a reset to the user all from the 'Users' portion of the 'Authentication' tab. 

#### The Firebase Auth SDK 

Once configured in the console, we need to setup that connectivity in the corresponding application that we intend to leverage Firebase services... 

This begins by getting a reference to the Firebase Authorization SDK (which can be installed via NPM or via CDNs). Assuming the reference to the SDK is linked with the application, then we can get a reference to auth very simply: 

```js
// need to have an import for 'firebase' SDK before this will work 

// setups up authorization and provides SDK methods for the 'default' provider 
// configured during the 'firebase init' setup
const auth = firebase.auth() 
```

This will provide all the necessary tools to manage users within our application. 

The next step will be getting a reference to the provider ('Sign-in Provider') that we want available to the user. 

```js
// need to have an import for 'firebase' SDK before this will work 

// setup auth to default project  
const auth = firebase.auth() 

// get reference to Google Auth Provider 
const provider = firebase.auth.GoogleAuthProvider() 
```

#### Signing in and out 

Once references to the Firebase auth SDK and an enabled provider is made, we can setup the process of signing in and signing out of our applicaiton. 

At it's simpliest, we would do this by call the `auth.signInWithPopup()` method on the variable reference to the Firebase auth object and pass the provider we want to use: `auth.signInWithPopup(provider)`. This enable us to use the same logic for sign-in accross the various supported providers. 

```js
// app.js 
const auth = firebase.auth() 
const provider = firebase.auth.GoogleAuthProvider() 

/* refence to sign-in button */ 
const signInButton = document.querySelector('#sign-in-btn')
/* attach to the sing in button */
signInButton.onClick = (e) => {
  // with most SPA's we don't want the page to refresh on button click 
  e.preventDefault() 
  // displays pop up window for user to login with google credentials 
  auth.signInWithPopup(provider) 
}
```

The process of signing out is largely the same. For signing out, we simply use the function `signOut()` (no parameters) provided by the Firebase auth SDK. 

> Note: both the `signInWithPopup()` and the `signOut()` functions are asynchronous and return a promise. 

```js
// app.js 

/* get reference to the Firebase auth SDK */
const auth = firebase.auth() 
/* setup reference to the google authentication provider */
const provider = firebase.auth.GoogleAuthProvider() 

/* attach sign-in function to sign-in button */ 
const signInButton = document.querySelector('#sign-in-btn')
signInButton.onClick = (event) => {
  event.preventDefault() 
  auth.signInWithPopup(provider) 
}

/* attach sign-out function to sign-out button */ 
const signOutButton = document.querySelector('#sign-out-btn')
signOutButton.onClick = (event) => {
  event.preventDefault() 
  auth.signOut() 
}
```

> Under the hood, Firebase is creating a JSON Web token to manage the authentication state. You can find this using the Dev Tools of your brower, in Chrome, this would appear under Application > Storage > IndexedDB > FirebaseLocalStorage. This will contain information about the currently authenticated user (assuming there is one) 

### Managing Authentication State 

The authorization state (i.e. "logged in" or "logged out") is something we can reliably expect to change frequently throughout the application's lifecycle, and most applications will show different screens, data, information, etc. based on the authorization state (i.e. "Is anyone logged in?", "Who is logged in?")

Of course, the Firebase auth SDK provides a way to monitor the authorization state through the function `auth.onStateChanged(callbackFunction)` which executes the provided callback function whenever the state changes as well as access to the currently authenticated user (as a parameter to the callback function). 

We can do this in a very similar fashion to the `document.addEventListener()` function native to JavaScript. 

```js
// continuing with the example above (app.js)

/* think of the `onStateChanged` function like an event listener that executes a callback function anytime the authorization state changes */
auth.onStateChanged((user) => {
  if (user) {
    // do something if there is a user logged in 
    // ...code... 
  } else {
    // do something else if there is no user logged in 
    // ...code... 
  }
})
```

## Managing Data

'Cloud Firestore' and 'Realtime Database' are the two products available to developers to manage application data. Both 'Cloud Firestore and 'Realtime Database' are NoSQL databases, but as this is a "Getting Started" we will focus on the most used database product for Firebase; 'Cloud Firestore'. 

> the titles 'Cloud Firestore' and 'Realtime database' can be a little misleading as both are "real-time" database (by default), enabling synced updating of records on both the front-end and the back-end 

### Understanding Cloud Firestore 

Cloud Firestore is a [NoSQL](https://www.mongodb.com/nosql-explained#:~:text=Spin%20up%20a%20NoSQL%20Cluster,wide%2Dcolumn%2C%20and%20graph.) database, and is fundamentally different from the traditional "relational" databases (SQL, PL/SQL, etc.), for a number of reasons.

> Note: This true not just for Google's 'Cloud Firestore', but for any NoSQL database like [MongoDB](https://www.mongodb.com/)

NoSQL database are "document-oriented" and related pieces of data are stored in "collections". In other words; related pieces of information (data) is stored in "collections" and each item/value within that collection is stored in a "document". Unlike "relational-databases" which have a schema defining how data should be structured, NoSQL databases do not. 

Inherently, this trades off flexibility for reliability as "relational databases" will reject any attempts to submit data that does not follow the rules established in the database schema. Since data in NoSQL databases is unstructured or loosely structured, there is no schema to valid that the data being added to the database is in the same format as the other _documents_ in the associated _collection_. 

> Firebase provides 1 GB of storage space for free. Once the database grows beyond that, Google/Firebase will charge a variable fee based on network egress as well as document reads, writes and deletes. 

In Summary

* Relational Databases 
  * Group uniform information into strictly defined tables
  * Each record in a table must have the same fields
  * Each field within a record, must have the same data-type as every other record within the table. 
* Non-relational Database
  * Group related pieces of information into loosely (or completely unstructured) "collections" 
  * Each entry in a collection is referred to as a "document"
  * Documents are not required to have the same fields or data-types 

### Relational Databases vs. Non-relational Dataabases 

In traditional databases (relational databases), data is stored in tables, which represent a collection of records that have the same pieces of information (think "properties" or "fields"). These tables are linked or "associated" with other tables using "relationships" that define how the two objects relate to each other. In other words, if we have a table of "homes" and a table of "owners"; a relational database would require that we define how those two tables _relate_ to one another. That might be defined something like: 

* A "home" must have at least one "owner" (1-many)
* A "owner" can have no homes, or multiple homes (0-many)
* A "owner" can only have one primary resident (1-1)

In addtion to strictly defined relationships, relational datbases require  a **fixed schema** and use SQL (Structured Query Langauge) to create, read, update and delete records, as well as create, modify and destroy relationships between tables/records. Any attempts to insert data that does not abide by the rules defined in the data will fail. 

### Strengths of traditional databases

Since every table, record, and relationship within a relational database must be strictly defined, relational databases ensure that data is uniformly structured by requiring every record must include the same set of fields and requiring every field within a record must hold the same type of data (integer, float, decimal, character, string (varchar), etc.). 

By requiring this, relational databases provide greater protection of the data as well as providing a mechinism to place the work of consolidating information from related sets of tables can be done reliably. 

### Transitioning to the world of non-relational databases

Unlike relational databases, NoSQL databases store data in a fundamentally different way.

Instead of "records" in "tables", non-relational databases have "documents" inside "collections". The idea (and constraint) of relationships does not exist, nor does the constraint that each "record"/"document" have the same set of properties ("fields") as the other document in the same collection. 

With non-relational databases, every pertinent piece of information ("fields" and "field values") associated with a record can be vary between records ("documents"). Non-relational databases result in a flatter data structure that doesn't requiring joining of different tables to pull in related records (via a relationship, defined in the database schema). In other words the data is ["denormalized"](https://www.geeksforgeeks.org/denormalization-in-databases/), which can lead to redundant data; an idea that can make a developers and engineers very uncomfortable. 

### Benefits and Drawbacks of Denomalized data

As of a result of their fundamentally different data structures which is primarily a result of denormalization of data; relational and non-relational databases each have drawbacks and benefits.

Because non-relational databases have data that is de-normalized: 

Benefits: 
  * Data retrieving is often faster, since data does not have to be "joined" 
  * Queries for data can often be far simplier, more reliable, and more performant than data that is stored in a relational database structure.
    * Non-relational databases enable filtering of data in a single collection ("table") rather than have to join pieces of information (records) from different tables 

Drawbacks:
  * Updates and inserts are more expensive
    * While relational database (should) never store the same piece of information in more than one place, updating, inserting, or removing data requires just one database call. Conversely, non-relational databases often have the same piece of information in more than one place which results in updates, inserts, or deletes, requiring multiple database calls 
  * De-normalized data (non-relational) is often more heterogenous/inconsistent increasing chances of corrupted data. 
  * Increased storage
    * Same data may be stored/saved in more than one document or collection, taking up more storage space to hold the additional (redundant) data. 

The idea here is to optomize database performance for the most-common use cases. In most applications; data is queried or "read" from a database far more often than it is updated, inserted, or deleted. Non-relational databases have embraced this idea, optimizing performance for querying (reading) data at the cost of making updating, inserting, and removing records ("documents") more expensive (i.e. "resource intensive") operations. 

Diving deeper, in a relational datbase, if we wanted to get the answer to the question: "How many dogs are registered to male owners under the age of 25", we would have to perform a join on the "dogs" table and the "owners" table which results in the database going through all the records in each of the tables and connecting records through foreign and primary keys, then filtering based upon conditions of that aggregated data. 

In the non-relational database, information is stored in flatter manner, with each "document" in a "collection" having all the relevant information, requiring no matching of records to other records. Under the hood, non-relational databases are indexing every "field" of each "document" resulting in queries of collections containing 1,000,000 records and 10 records returning in the same amount of time. In a relational databases, as records within tables grow, the matching of associated records (joins), and the filtering/quering of records will take longer and longer as the number of records to be matched and filtered in each table grows. 

This means that Cloud Firestore excel in performance, ease-of-use, scalability, resilience and scallability. 

#### Cloud Firestore Setup 

Starting in the [Firebase console](https://console.firebase.google.com/) and in the associated project, select "Database" from the "Develop" menu along the left-side of the Project's dashboard, and then using the "Create Database" option provided. 

After clicking the "Create Database" button, a modal should be displayed that asks a few configuration questions in order to setup the database appropriately. The first option is "Secure rules for Cloud Firestore", where you can configure security rules to define what read/write conditions should be validated before allowing users to create, read, update, or delete documents. 

We often start in "test mode" which is the least secure, but most accessible way to get the database setup, and then once the application has been fully developed and tested, the "Cloud Firestore" will be reconfigured to "production" mode which will restrict additions, modifications, and deletions from the database. 

Next the setup modal will prompt the developer to define the primary region in which they expect the application will be used, this will determine the location of the physical servers that will house and maintain the applications data. Here we want to pick the location that is closest to the most users. 

Once completed, the "Cloud Firebase" page should now display four tabs ("Data", "Rules", "Indexes", and "Usage") 

#### Collections 

Once we have a database, we need to create To create a "collection" (think "bucket of related information") that will serve as the starting point for retrieving, adding and modifying information stored.

To create a collection, make sure you are signed in to the [Firebase console](https://console.firebase.google.com/) and within the correct project. 

From the Project Dashboard, select the "Cloud Firestore" option under the "Develop" section of the left-hand menu bar (if you just created your database, you should be there automatically). You should see tabs for "Data", "Rules", "Indexes", and "Usage". Select the "Data" tab, then "Start a collection" from the database that was just created. 

This will display another modal prompting for configuration information such as the _collection ID_ (string) which will serve as the unique identifier (project scoped) that will be the entry point for interacting with data. Conventially this name should indicate what information is being stored in the collection (i.e. "Users" would store user information). 

When you click next from the first page of the collection creation wizard, Firebase will prompt for the creation of the first "document" in that collection. 

> Recall, a database is a bucket for grouping of associated information. A "collection" is a bucket of associated records, and a "document" is a record  with a collection. 

#### Documents 

Every document in a collection **must** have a "Document ID" which will serve as the unique identifier (similar to a primary key in relational databases). Unlike relational databases, NoSQL databases do not require a schema to define tables and the relationships that exist between tables, instead collections server as container to keep related information together, and documents are distinct records within a collection. 

Other than a "Document ID" (which we will let Firestore create for us...), beyond that documents can be composed of as many "fields" as desired, and documents can even have varying fields within a collection, unlike relational databases where each record ("document"), must have the same set of fields defined, no more - no less; NoSQL databases do not require or validate information in the document beyond requiring a unique "Document ID". This means that records/documents within the database are more flexible, but also less structured and more sucseptable to database corruption. 

In order to ensure that queries can work reliably and data is not corrupted, documents should be created with the same set of key value pairs. When each document ("record") has the exact same fields, and the data types across documents is the same, queries become more reliable and working with the data becomes far easier. 


#### Fields 

Similar to Collections serving as containers for Documents, and documents represent individual records in a database, each document is comprised of "fields", which contain the the data (think "properties" of an "object"). Unlike relational (SQL) databases, NoSQL databases do nott require that each document have the same set of fields. 

##### Understanding Firestore Fields 

I think the best way to understand the concept of "fields" in a non-relational (NoSQL) database is to discuss an example: 

Imagine we have a collection called "Characters" - inside the _collections_ of Characters we will have _documents_ that contain _fields_ that outline all the pertinent information related to a specific pet. 

* Collection => "Characters" (a container of many pets)
  * Document => "Character" (a specific pet)
    * Field => an attribute of the "Character" 

Represented in JSON, it might look something like: 

```json
// characters.json 
[
  {
    "name": "Simba",
    "species": "Lion",
    "sex": "male",
    "role": "hero", 
  },{
    "name": "Scar", 
    "species": "Lion", 
    "sex": "female",
    "role": "villian", 
    "brother": "Mufasa"
  },{
    "name": "Mufasa", 
    "species": "Lion", 
    "sex": "male", 
    "brother": "Scar"
  },{
    "name": "Timon",
    "species": "Meerkat", 
    "sex": "male", 
    "role": "advisor", 
    "trivia": [
      "Timon is one of the few characters whose name has no meaning in Swahili", 
      "Timon has greek historical references that roughly mean 'he who respects'" 
    ]
  },{
    "name": "Pumbaa", 
    "species": "Warthog", 
    "sex": "male",
    "trivia": [
      "'Pumbaa' means 'to be foolish, silly, wearkminded, careless, negligent' in Swahili"
    ]
  },{
    "name": "Nala", 
    "species":  "Lioness", 
    "sex": "female", 
    "husband": "Simba", 
    "children": 3, 
    "trivia": [
      "Nala means 'gift' in Swahili"
    ]
  }
]
```


First and foremost, it is important to note that the above JSON objects could be added to a "Characters" collection in a Cloud Firestore, but let's discuss that a bit more.

Reviewing the above JSON data, there are a few things that are important to take note of: 

1. All the "characters" (i.e. "documents") have `name`, `sex`, and `species` properties (i.e. "fields") that allow us to query information about the "characters" in the collection. 
2. Some of the characters have different sets of "fields" (properties) from other characters. 
3. There is no listed "Document ID" listed in the JSON data 

Delving deeper into the above take-aways, it should be noted that: 

* Non-relational databases, do not have a schema that requires specific fields with specific types for each record ("document") in the database. 
*  The "Document ID" is not explicitely listed - in most cases, it is based to let the database (in this case "Firestore") generate that unique identifier for us. 
* The "fields" or properties of each "document" or character can (and is) varrying between records. In some records there is a field for "husband", but in other records, there is not as that would not make sense for that character. Additionally, the same field _could_ (although this should be avoided) have different values (in reference to the type of data: number, string, timestamp, etc.) than the other records within the database. 

### Working with Cloud Firestore Programatically 

* Pre-requisites: 
  * Firebase Database Created via the Firebase console 
  * Firebase SDK is accessible via CDN or via a Node package 
  * Project connected to Firestore via Firebase CLI (`firebase init`) 

The first thing that we need to do is get a reference to the the Cloud Firestore SDK database: 

```js
// reference to Firestore database 
const db = firebase.firestore() 
```

This will configure a reference to the Cloud Firestore database defined by the config files (`.firebaserc` and `firebase.json`) previously setup. 

Next we will want to make **a reference to the collection or collections** that will hold the application data. This reference will be used to create, read, upate, and query data in that collection. 

> In regards to the UI, the Firebase JavaScript SDK is designed so that changes to the database (made in real-time) are reactively updated in the UI in real-time. In other words; the UI will be "subscribed" to changes made on the back-end in real-time (by default). When the application no longer cares about changes made to a collection, the collections should be "unsubscribed" from in order to avoid memory leaks and degradded application performance. 

```js
// reference to Firestore database 
const db = firebase.firestore() 
// reference to "characters" collection within the Firestore databse 
const charactersRef = db.collection('characters')
```

Now that we have a reference to the "characters" collection, we can use that reference to work with our collection. 

To add a new document, we use the `add()` function (called upon the collection reference) and provide an object with the fields for that document (i.e. "record"). So if our we wanted to add a new character with the name 'Annie', and a species of 'Spider', and a sex of 'female', we would simply: 


```js
// reference to Firestore database 
const db = firebase.firestore() 
// reference to "characters" collection within the Firestore databse 
const charactersRef = db.collection('characters')

// creates a new document in the "characters" collection
// the Annie character with the name 'Annie', and a species of 'Spider', and a sex of 'female' 
charactersRef.add({
  name: "Annie", 
  species: "Spider", 
  sex: "female"
})
```

> You do not need to define the "Document ID", Firestore will do this automatically. 

#### Associating documents with users 

However, most application associate pieces of information to specific users of the application. To do this (assuming authentication is already setup), we would want to make a refernece to the `auth.onStateChanged()` event handler, which recieves a user object when there is an authenticated user. 


```js
// app.js 
const auth = firebase.auth() 
const provider = firebase.auth.GoogleAuthProvider() 
const db = firebase.firestore() 
const charactersRef = db.collection('characters')

/* attach sign-in function to sign-in button */ 
const signInButton = document.querySelector('#sign-in-btn')
signInButton.onClick = (event) => {
  event.preventDefault() 
  auth.signInWithProvider(provider) 
}

/* attach sign-out function to sign-out button */ 
const signOutButton = document.querySelector('#sign-out-btn')
signOutButton.onClick = (event) => {
  event.preventDefault() 
  auth.signOut() 
}

const addCharacterButton = document.querySelector('#add-char-btn')
// disable adding characters if no one is logged in
addCharactersButton.enabled = false 


/* listen for changes in authorization */
auth.onAuthStateChanged((user) => {
 /* if we have a user... */
  if(user) {
    
    /* enable the button */ 
    addCharactersButton.enabled = false 

    /* define event handler to add new character */
    addCharacterButton.onClick = (event) => {
      event.preventDefault() // page should not refresh 

      /* replace with getting the data from the form 
       * adding in a field with a reference to the currently 
       * autheticated user */
      const newChar = {
        name: "Annie", 
        species: "Spider", 
        sex: "female", 
        createdBy: user.uid 
      }

      /* add the new character to the collection */
      charactersRef.add(newChar)

      /* should reset the form */
    })
  }
}) 
```

By adding a field that associates the document with the user that was authenticated at the time of creation, we can now query the collection by the user that created each character. 


#### Adding timestamps 

Another common action would be to attach a timestamp of the document's creation to the document itself enabling querying documents not only by the authenticated user, but also by the creation data/time of the document. But since machines accessing an application can be physically located in different timezones, we do not want to run into data corruption as a result of using local (client) time. 

We can avoid all of this by using the server time. The Firebase SDK makes this easy by including a function to get the server time. We can get this function by destructuring it from the Firebase SDK: 

```js
const { serverTimestamp } = firebase.firestore.FieldValue 
```

This function will return a timestamp of the Firestore (database) server at the time of invocation:

```js
const { serverTimestamp } = firebase.firestore.FieldValue 
serverTimestamp() // returns date/time of from the database server 
```


```js
// app.js 
const auth = firebase.auth() 
const provider = firebase.auth.GoogleAuthProvider() 
const db = firebase.firestore() 
const charactersRef = db.collection('characters')

/* attach sign-in function to sign-in button */ 
const signInButton = document.querySelector('#sign-in-btn')
signInButton.onClick = (event) => {
  event.preventDefault() 
  auth.signInWithProvider(provider) 
}

/* attach sign-out function to sign-out button */ 
const signOutButton = document.querySelector('#sign-out-btn')
signOutButton.onClick = (event) => {
  event.preventDefault() 
  auth.signOut() 
}

const addCharacterButton = document.querySelector('#add-char-btn')
addCharactersButton.enabled = false 

/* listen for changes in authorization */
auth.onAuthStateChanged((user) => {
  if(user) {
    
    addCharactersButton.enabled = false 
    addCharacterButton.onClick = (event) => {
      event.preventDefault() 

      /* get reference to the server timestamp specific to 
       * that firebase project using object destructuring 
       * of the Firebase SDK  */
      const { serverTimestamp } = firebase.firestore.FieldValue 
      
      const newChar = {
        name: "Annie", 
        species: "Spider", 
        sex: "female", 
        createdBy: user.uid 
        createdAt: serverTimestamp() // gets the server time at the point of invocation 
      }

      charactersRef.add(newChar)

      /* should reset the form */
    })
  }
}) 
```

This avoids issues with different timezones by ensuring that each database record's timestamp is from the same timezone regardless of the client application's timezone. 


#### Reading/Querying data in Cloud Firestore 

In order to query data, we must have a reference to the Firestore database as well as the collection in that database that contains the relevant information. Using that reference we can filter the results using the `where(query)` function provided by the Firebase SDK on references to collections. The `where` function takes three (3) parameters

1. `fieldName` - the name of the field within the document 
2. `condition` a [comparison operator](https://firebase.google.com/docs/firestore/query-data/queries#query_operators) 
3. `value` a specific value of the provided field that should be used for comparison 

This generally would look like: `collectionRef.where('uid', '==', user.uid)`

In the Lion King characters example previously described, it may be necessary to find all the characters that are male. In more technical terms; retreiving all the character records ("documents") from the "characters" collection that have a field titled "sex" (field name) and a corresponding field value of "male". If we only care about the data at a specific time, we can leverage the `get()` function to simply query the data once. Since this is happening asychronously, we can leverage modern JavaScript's function chaining and the `then()` function to define what should be done when that data is retrieved from the collection referenced. 

```js
let unsubscribeChars = charactersRef
  .where('sex', '==', 'male')
  .get()
  .then(querySnapshot => {
    // the resulting documents can be accessed via the 
    // `.docs` property 
    querySnapshot.docs.forEach(doc => {
      doc.id // will return the document ID 
      doc.data() // will retrieve the data of the document 
    })
  }) 
```

> A full list of operators can be found in the [Firebase docs](https://firebase.google.com/docs/firestore/query-data/queries) and for the most part, Cloud Firestore supports the same comparison operators that are found in relational databases. 

While this is very useful, often we want to extend Application functionality by making our application aware to changes in the database as they occur. Once the application is aware of these changes, the user-interface (UI) can be updated to reflect the corresponding changes. Commonly this is called **subscribing** or _"listening for changes"_, and is something Firebase/Firestore SDK makes easy to do.


#### Realtime Updates  

Retrieving data in real-time can take applications to the next level, and is often a requirement in the real-world. Just like a one-time query to the database, we can leverage the `onSnapshot` function which takes a callback function that will be re-run anytime the database has changes that modify the returned result-set or the fields within the documents returned by the query. 

```js
charactersRef
  .where('createdBy', '==', user.uid)
  .get()
  .then(querySnapshot => {
    /* code to run whenever the data returned from the query changes */
  }) 
})
```

By default, the Firebase SDK will continuously and asynchronously listen for changes to the database and re-execute the callback function provided to the `onSnapshot(callbackFunc)` function.  will be re-executed enabling real-time updates. The callback function will continue be re-invoked whenever any relevant changes are made until the function until the corresponding `unsubscribe()` function is has been called.

This `unsubscribe` function is provided as by the Firebase SDK to the caller as the return value of the query function (real-time or single-run). To increase performance, the unsubscribe function can be invoked to stop the re-invokation of the callback function. 

```js
// app.js 
const auth = firebase.auth() 
const provider = firebase.auth.GoogleAuthProvider() 
const db = firebase.firestore() 
const charactersRef = db.collection('characters')

/* create reference to unsubscribe to be defined later... */
let unsubscribeChars; 

/* ...code to sign-in/sign-out ... */

auth.onAuthStateChanged((user) => {
  if(user) {
     /* ... code to add characters ...*/ 

    /* Use the refence to the characters collection 
     * to define the data relevant data that should be retrund 
     * by the query to the database... 
     * in this case, that would be the character created by the current user.. */
    unsubscribeChars = charactersRef
      .where('createdBy', '==', user.uid)
      .onSnapshot(querySnapshot => {
        /* code to run whenever the data returned from the query changes */
      }) 
    })
  } else {
    /* no user is logged in , no longer concerned about changes 
     * unsubscribe from changes as long as we have an unsubscribe function
    */
    unsubscribe && unsubscribe()  
  }
}) 
``` 

Since the `onSnapshot(querySnapshotCallbackFunc)` function recieves a callback function that will be run anytime documnets/data returned by the query is added, removed, or modified in the database. The `querySnapshotCallbackFunc` recieves (as a parameter) an object. This object will have a property `docs` that would be an array of the documents that meet the condition(s) specified in the query called on the referenced collection. 

#### Working with documents  

The documents returned by the query  

```js
unsubscribeChars = charactersRef
  .where('createdBy', '==', user.uid)
  .onSnapshot(querySnapshot => {
    /* code to run whenever the data returned from the query changes */
    const items = querySnapshot.docs.map(doc => {
      /* use the result set to update the DOM or render elements to the screen */
    })
  }) 
})
```

For performance, firebase simply returns a reference to that object when we map through the `docs` property of the object provided by the `onSnapshot()` function. In order to access the fields of the document, we must invoke the `data()` method on the reference to the document. The `data()` function will return an JavaScript object with all the fields of the document at the time of invocation. 


```js
// app.js 
const auth = firebase.auth() 
const provider = firebase.auth.GoogleAuthProvider() 
const db = firebase.firestore() 
const charactersRef = db.collection('characters')

/* create reference to unsubscribe to be defined later... */
let unsubscribeChars; 

/* ...removed: code to sign-in/sign-out ... */

auth.onAuthStateChanged((user) => {
  if(user) {
     /* ... removed code to add characters ...*/ 

    /* define the data we are interested with a query to our collection: 
     * in this case, that would be the character created by the current user.. */
    unsubscribeChars = charactersRef
      .where('uid', '==', user.uid)
      .onSnapshot(querySnapshot => {
        /* code to run whenever the data returned from the query changes */
        const items = querySnapshot.docs.map(doc => {
          /* retrieve the fields of the documents from the reference provided */
          return doc.data() 
        })
        /* use the result set to update the DOM or render elements to the screen */
        /* ... code ... */ 
      }) 
    })
  } else {
    /* unsubscribe if no one is authenticated */
    unsubscribe && unsubscribe()  
  }
}) 
```

#### Advanced Queries 

As an application grows, it will likely have more documents and fields and require more advanced querying. 

In order to create more refined queries, `where()` it may be neccessary to specify multiple conditions the documents returned should meet. To specify multiple conditions, `where()` functions can be chained. As each `where()` statement is executed, the returned results are passed to the next `where()` function filtering the recieved documents until until the `onSnapshot()` or `get()` function is invoked. 

```js
/* retrieve only the characters that were by the `user.uid`, 
 * then filter that result set to only return values that 
 * a `sex` property that is equal to `male` */
charactersRef
  .where('createdBy', '==', user.uid)
  .where('sex','==', 'male')
  .onSnapshot(querySnapshot => {
    /* work with returned data */ 
  }) 
})
```
Often it is necessary not only to filter the data returned from the database, but also to sort the data ("documents"). While we could do this on the client-side, it is often more effecient to execute the sort with the query placing the work of sorting documents on the database. This can be done by chaining an `orderBy(fieldName)` function. 

> The `orderBy()` function must follow any `where()` functions - invoking the `where()` function after the `orderBy()` will result in errors. 

The `orderBy` function requires at least one (1) parameter, which would be the name of the field of that all the returned documents should be sorted. By default `orderBy(fieldName)` will return the documents in ascending order, but this can be overridden by passing a second parameter specifying the sort order: 

```js
/* order the documents returned by the field "name" in descending order */
charactersRef
  .where('createdBy', '==', user.uid)
  .orderBy("name", "desc")
  .onSnapshot(querySnapshot => {
    /* work with returned data */ 
  }) 
```

> Fields like date/time fields, strings, and numbers all have default sorting that can be invoked by simply providing the name of the field that the returned documents should be sorted, and will (by default) sort the documents by the value of the specified field in ascending order. 


### Database Security 

In order to ensure that data is not corrupted, Cloud Firestore Security rules can be defined. These rules will ensure that requests to the database meet the specified conditions before allowing them to be executed. Any production application should have safegaurds in place to ensure that the database does not get corrupted. 

#### Seting up database security rules 

To access the Cloud Firebase Security rules, within the make sure you have logged into the [Firebase console](https://console.firebase.google.com/), selected the appropriate project, and selected the "Cloud Firestore" section under "Develop" from the left-hand side. Once there, the main content should should show four (4) tabs: "Data", "Rules", "Indexes", and "Usuage". The "Rules" tab is where we define these rules. 

Rules for Cloud Firestore are defined using a special syntax whose singular purpose is to make it easy to define and implement security logic. 

By default, you will see something like: 

```
rules_version = '2'; 
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**}{
      allow read, write; 
    }
  }
}
```

The above tells Firebase that we want to allow `read` and `write` to documents in our database. Metaphorically, this is the equivilant of "having the gates wide open" (i.e. allowing all database transactions to go through). 

Typically we start by disabling `read` and `write` accross the board, then re-enabling it when certain conditions are met. To globally disable `read` and `write` for a database, simple remove the semi-colon (`;`) and place a colon (`:`) then add `if false` to indicate that `read`/`write` permisssions should not be allowed by default. We then terminate ("end") the statement with a semi-colon (`;`). 

```
rules_version = '2'; 
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**}{
      allow read, write: if false;  
    }
  }
}
```

Next we want to specify the conditions in which Firestore should allow database requests to complete. We can do this by adding an additional `match` statement after the closing curly brace (`}`) of the first `match` statement where we indicated that we want to deny `read`/`write` globally. What follows the keyword `match` should be the name of the collection that we are defining rules for, continuing with our example, lets configure rules for our `characters` collection. 

If we wanted to specify that someone can `write` to our `characters` collection, if (and only if) their `uid` (user id) matches the `createdBy` field in the database, then we need to begin by identifying who made the request. We can get a reference to the requests's user id (`uid`) using `request.auth.uid`. Next, we use the user's id (`uid`) to make a comparison that will determine if Firestore should allow the database request to go through, so to ensure that user's can only add characters to the database that have a `createdBy` field with thier own user id we need to inspect the database request to see if the record's `createdBy` field has the same user id (`uid`) as the user making the request.

We can get a reference to the document attached to the request using `request.resource`, then selecting the `data` attribute (`request.resource.data`) and lastly specifying the field within the document we want to use for comparison; in this case `createdBy`. Putting all of this together; we would enter a condition that allows `write` to our `characters` collection `if request.auth.uid == request.resource.data.createdBy`: 

```
rules_version = '2'; 
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**}{
      allow read, write; 
    }
    match /characters/{docId} {
      allow write: if request.auth.uid == request.resource.data.createdBy; 
    }
  }
}
```

> Notice the `{docId}` in the example above? Curly braces (`{}`) in a match statement (before the statement body) are used to designate a wildcards/variables. In this case, we are aliasing the document id for each document in the `characters` collection (hence `match /characters/{docId}`)

With this second rule in place, we are allowing through any `write` request to create a document with the a `uid` matching the `createdBy` field of the document. 

Next, we might want to specify that `read`ing data should be allowed if the `uid` of the user making the request, matches the `createdBy` field of the document, ensuring user's only have `read` permissions to the characters that they created. To do this, we want to compare the `uid` of the request (`request.auth.uid`) to the `createdBy` field in each document in the collecton and allowing `read` permissions if they match.

Since we are still working with the `characters` collection; we can alias in document in the collection using `resource` (not `request.resource` which inspects the document intended to be `write`n to the database). This would result in a statement like: `allow read: if request.auth.uid == resource.data.createdBy`: 

```
rules_version = '2'; 
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**}{
      allow read, write; 
    }
    match /characters/{docId} {
      allow write: if request.auth.uid == request.resource.data.createdBy; 
      allow read: if request.auth.uid == resource.data.createdBy; 
    }
  }
}
```

With these rules in place: 
* Documents in the `characters` collection can only by written (`allow write: if {condition}`) if the document they intend to write has a `createdBy` field whose value matches the value of the currently authenticated user's `uid`.
* Documents in the `characters` collection can only be `read` if their `createdBy` field has the same value as the `uid` of the user making the `read` request. 
* All database transactions that do not meet the conditions described above will be denied 

## Beyond the basics 

There are a multitude of tools, technologies and services that Firebase provides that have not been outlined here. This article is intended as a "getting started" reference covering most of what developers need to get an built. 

Let's breifly touch on what some of those things are 

### Cloud Functions

For more advanced applications that require things like automatic execution of server-side code if certain conditions are met, can enable API functionality, run background jobs, and more; Firebase has "Cloud Functions for Firebase". With Cloud Functions we can execute server side code in Node JS, Python or Go to define how and when these more complex back-end functionality. 

### Cloud Storage 

If you need to store raw files (like pictures, PDFs, etc.), "Cloud Storage for Firebase" is the tool, enabling developers to upload and download any type of files from their hosted Firebase server. Once files are uploaded, automated tasks can be kicked off. One practical example of this is leveraging Machine Learning to decipher text in an image upload to Firebase Cloud Storage. 

### Machine Learning 

Firebase comes pre-configured to use a variety of APIs to handle machine learning tasks in a wide variety of scenarios. More information can be found in the [Firebase docs](https://firebase.google.com/products/ml)

### Extensions 

Firebase has an API for developers to build tools (for other developers) that enable more features, or streamline the setup and deployment of features through [extensions](https://firebase.google.com/products/extensions). New extensions are added all the time, and they extend the functionality and value of the tools, technologies and services offered by Firebase to create truly "full stack" applications. 

## Wrapping Up 

Firebase offers developers a free resource to build truly full-stack applications that are hosted on Google's servers, highly available, and highly performant at little or no cost to developers and is a great place to get started building full-stack applications. 