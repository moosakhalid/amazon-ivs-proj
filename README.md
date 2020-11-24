# amazon-ivs-proj
A simple push button deployment of a live streaming platform via Amazon IVS hosted on S3.

The "cloudformation" folder contains the JSON formatted CloudForamtion template which is required to spin up the infrastructure required for this project.

The "index.html" is a simple HTML file which sets up a minimal webpage, the deployment process uploads this file to an S3 Website bucket.

The "ivs.js" file contains the client side JavaScript code which invokes the IVS SDK for Web , plays the IVS stream and shows the metadata injected by the
IVS PutMetadata API.
