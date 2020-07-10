# Flickr Search Web App

### Technology stack

 * [AngularJS](https://angularjs.org/)
 * [Boostrap](https://getbootstrap.com/)
 * [Flickr API](https://www.flickr.com/services/api/)


### Features

 * Searching based on current location and text input.
```
flickr.photos.search
Return a list of photos matching some criteria. Only photos visible to the calling user
will be returned.
```

*  View more info about a photo.
```
flickr.photos.getInfo
Returns information about a photo.

```

## App Preview

![Home Page](/app/screenshot/flickr-home.png)



## Getting Started

To get you started you can simply clone the `angularjs-flickr-app` repository and install the dependencies:

### Prerequisites

You need git to clone the `angularjs-flickr-app` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `angularjs-flickr-app`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `angularjs-flickr-app`

Clone the `angularjs-flickr-app` repository using git:

```
git clone https://github.com/Sakhamen/angularjs-flickr-app.git
cd angularjs-flickr-app
```

If you just want to start a new project without the `angularjs-flickr-app` commit history then you can do:

```
git clone --depth=1 https://github.com/Sakhamen/angularjs-flickr-app.git <your-project-name>
```

The `depth=1` tells git to only pull down one commit worth of historical data.

### Install Dependencies

We have two kinds of dependencies in this project: tools and AngularJS framework code. The tools
help us manage and test the application.

* We get the tools we depend upon and the AngularJS code via `npm`, the [Node package manager][npm].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically copy the downloaded AngularJS files to `app/lib` so we
can simply do:

```
npm install
```

Behind the scenes this will also call `npm run copy-libs`, which copies the AngularJS files and
other front end dependencies. After that, you should find out that you have two new directories in
your project.

* `node_modules` - contains the npm packages for the tools we need
* `app/lib` - contains the AngularJS framework files and other front end dependencies

*Note copying the AngularJS files from `node_modules` to `app/lib` makes it easier to serve the
files by a web server.*

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
npm start
```

Now browse to the app at [`localhost:8000/index.html`][local-app-url].
