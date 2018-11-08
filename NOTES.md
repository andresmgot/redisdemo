Demo Setup

minikube start
minikube addons enable ingress
helm init
# helm repo add bitnami https://charts.bitnami.com/bitnami
# helm repo add svc-cat https://svc-catalog-charts.storage.googleapis.com
# helm repo add azure https://kubernetescharts.blob.core.windows.net/azure
helm install svc-cat/catalog --name catalog --namespace catalog

# https://github.com/Azure/open-service-broker-azure/blob/master/docs/quickstart-minikube.md
  # Get subscrition ID (login)
  # Create Resource Group 

# gcloud container clusters create --subnetwork=default --zone us-east1-c andres-test
## kubectl -n kube-system create serviceaccount tiller
## kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
## helm init --service-account tiller
## kubectl create clusterrolebinding default-admin --clusterrole=cluster-admin --serviceaccount default:default
## helm install --name kubeapps  --namespace kubeapps bitnami/kubeapps
 
Demo 1
With Kubeapps 
# Go to Configuration
# Add azure
# Go to Service Instances -> Install Service Catalog
# Go to Charts -> open-service-broker (azure)
  # SUB_ID
  # TenantID
  # ClientID
  # ClientSecret
  # Experimental
# Go to Service Instances -> Refresh
# Go to Service Instances -> Install Redis
# Go to Charts -> Kubeless

Demo 2
# With Kubeapps
# Go to Services Instances -> Redis -> Add binding
# In terminal
  ~/projects/bin/kubeless function deploy todos-create \
    --runtime nodejs8 \
    --dependencies package.json \
    --secrets my-redis-binding \
    --handler todos.create \
    --from-file todos-create.js
  ~/projects/bin/kubeless function deploy todos-delete \
    --runtime nodejs8 \
    --dependencies package.json \
    --secrets my-redis-binding \
    --handler todos.delete \
    --from-file todos-delete.js
  ~/projects/bin/kubeless function deploy todos-read-all \
    --runtime nodejs8 \
    --dependencies package.json \
    --secrets my-redis-binding \
    --handler todos.readAll \
    --from-file todos-read-all.js
  ~/projects/bin/kubeless function deploy todos-read-one \
    --runtime nodejs8 \
    --dependencies package.json \
    --secrets my-redis-binding \
    --handler todos.readOne \
    --from-file todos-read-one.js
  ~/projects/bin/kubeless function deploy todos-update \
    --runtime nodejs8 \
    --dependencies package.json \
    --secrets my-redis-binding \
    --handler todos.update \
    --from-file todos-update.js

  ~/projects/bin/kubeless trigger http create \
    --function-name todos-create \
    --hostname 192.168.99.100.nip.io \
    --path create \
    todos-create
  ~/projects/bin/kubeless trigger http create \
    --function-name todos-delete \
    --hostname 192.168.99.100.nip.io \
    --path delete \
    todos-delete
  ~/projects/bin/kubeless trigger http create \
    --function-name todos-read-all \
    --hostname 192.168.99.100.nip.io \
    --path read-all todos-read-all
  ~/projects/bin/kubeless trigger http create \
    --function-name todos-read-one \
    --hostname 192.168.99.100.nip.io \
    --path read-one todos-read-one
  ~/projects/bin/kubeless trigger http create \
    --function-name todos-update \
    --hostname 192.168.99.100.nip.io \
    --path update todos-update
