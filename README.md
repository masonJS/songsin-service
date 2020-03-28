# songsin-service

songsin university project based micro service architecture

## Structure

- songsin-api
    - function
        - get
        - post
        - utils
    
- songsin-layer
    - src
        - postgresql-lib
        - request-lib
        - response-lib
        
        
## Execution
Build layer
```
cd songsin-layer && npm run local
```
Execute api
```
cd songsin-api && npm run start
```

## Deploy
Deploy layer
```
cd songsin-layer && npm run deploy
```
Deploy api
```
cd songsin-api && npm run deploy
```
