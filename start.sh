#! /bin/bash

docker run -it --name nodejs -v /home/ravila/Development/corpfolder-throttling-rules:/tests --add-host="dpineda-apigee-prod.nearbpo.com:52.25.80.2" --add-host="dpineda-apigee-test.nearbpo.com:52.25.80.2" node
