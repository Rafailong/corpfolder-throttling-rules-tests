#! /bin/bash

docker run -it --name nodejs -v /home/ravila/Development/corpfolder-throttling-rules:/tests --add-host="ravila-apigee-prod.nearbpo.com:52.25.80.2" --add-host="ravila-apigee-test.nearbpo.com:52.25.80.2" node
