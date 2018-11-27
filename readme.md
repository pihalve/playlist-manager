# Playlist Manager

Web application for generating m3u playlists from user-defined static and smart playlists.

# Client App (ReactJS)

## ReactJS app creation

What I did initially to create the ReactJS app was running the following command 
(having first installed NodeJS v10.13.0):

    npx create-react-app client-app

Which gave this output:

    npx: installed 63 in 7.023s

    Creating a new React app in D:\Projects\PlaylistManager\site\client-app.

    Installing packages. This might take a couple of minutes.
    Installing react, react-dom, and react-scripts...

    + react@16.6.3
    + react-scripts@2.1.1
    + react-dom@16.6.3
    added 1700 packages from 661 contributors and audited 35639 packages in 249.025s
    found 0 vulnerabilities


    Success! Created client-app at D:\Projects\PlaylistManager\site\client-app
    Inside that directory, you can run several commands:

      npm start
        Starts the development server.

      npm run build
        Bundles the app into static files for production.

      npm test
        Starts the test runner.

      npm run eject
        Removes this tool and copies build dependencies, configuration files
        and scripts into the app directory. If you do this, you can’t go back!

    We suggest that you begin by typing:

      cd client-app
      npm start

    Happy hacking!
	
See `/client-app/readme.md` for more information.

Then I installed `reactstrap` to add bootstrap support to the react app.
I used the following series of commands (probably new versions exist when you read this):

    npm install jquery@3.3.1
	npm install reactstrap bootstrap@4

## ReatcJS scrathpad

<a
  className="App-link"
  href="https://reactjs.org"
  target="_blank"
  rel="noopener noreferrer"
>
