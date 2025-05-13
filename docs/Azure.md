
Log in to your registry

```sh
az login
az acr login --name mdbstore
```

Pull your image 
```sh
docker pull mcr.microsoft.com/mcr/hello-world
```

Tag your image
```sh
# docker images  
REPOSITORY                   TAG       IMAGE ID       CREATED      SIZE
mdb-iam-util-demo-frontend   latest    14d9350a294b   4 days ago   601MB
mdb-iam-util-demo-backend    latest    4ae48c8bdc4f   4 days ago   310MB
```

```sh
# docker tag mcr.microsoft.com/mcr/hello-world mdbstore.azurecr.io/samples/hello-world
docker tag 4ae48c8bdc4f mdbstore.azurecr.io/sad/backend:latest
docker tag 14d9350a294b mdbstore.azurecr.io/sad/frontend:latest
```

Push the image to your registry
```sh
# docker push mdbstore.azurecr.io/samples/hello-world
docker push mdbstore.azurecr.io/sad/backend:latest
docker push mdbstore.azurecr.io/sad/frontend:latest
```

## References
- [Azure Container Registry documentation](https://learn.microsoft.com/en-us/azure/container-registry/)