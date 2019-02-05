## RAINBOW DASHBOARD

Vue, Express, Node, sqlite3 dashboard


### Steps to run :

1. Install docker on your computer

2. Navigate into the directory DEV_dashboard_2018
```cd your/path/to/DEV_dashboard_2018```

3. Start the docker service
```sudo service docker start```

4. Build Docker Images
```sudo docker-compose build```

5. Run the stack
```sudo docker-compose up```

Your app should be running on : http://127.0.0.1:8080

Now you just have to create an account, log in and enjoy


### Presentation

There are 2 parts to this dockerized Vue app: Frontend (Vue), Backend (Node with Express).

The frontend is on the 'client' folder, backend in the 'server' folder.


### Warnings

If you run ```npm install``` locally in the server or client folder, you'll need to delete 'node_modules' before running again with the docker setup.
```rm -rf client/node_modules && rm -rf server/node_modules```
