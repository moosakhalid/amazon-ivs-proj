# amazon-ivs-proj
A simple push button deployment of a live streaming platform via Amazon IVS hosted on S3.

The "cloudformation" folder contains the JSON formatted CloudForamtion template which is required to spin up the infrastructure required for this project.

The "index.html" is a simple HTML file which sets up a minimal webpage, the deployment process uploads this file to an S3 Website bucket.

The "ivs.js" file contains the client side JavaScript code which invokes the IVS SDK for Web , plays the IVS stream and shows the metadata injected by the
IVS PutMetadata API.


# Instructions for deploying the project
1. Use either AWS CLI or AWS Console to launch the CloudFormation template under cloudformation folder.
2. Wait for deployment to finish and note down the "Ingest Server URL", "Stream Key" and "website URL", you'll need to plug these into OBS studio.
3. Download and start OBS studio, under settings/preferences for OBS studio head to "stream" settings.
4. Select "Custom" option and paste in Ingest URL and Stream key in the appropriate boxes.
5. Head to the Website URL you noted down in step 2 and check out the IVS stream as well as the IVS metadata feature.


Note:
a. It is assumed that user has appropriate AWS permissions or an AWS Admin user for launching the template. 
   The template creates : Lambda function, EventBridge rules, IVS channel, IAM roles and policy, S3 bucket and S3 bucket policy.

b. For launching the template from AWS command line given that your IAM user has appropriate permissions, use the following command:

    aws cloudformation create-stack --stack-name "ivs-mk" --capabilities "CAPABILITY_NAMED_IAM" --template-body file://ivs.cf.json
    
Note:
  Tob programatically get Cloudformation stack run output values use the following command, rename the template file to whatever template file
  name you passed in.
  
    aws cloudformation describe-stacks --stack-name ivs-mk --query "Stacks[].Outputs[].[OutputKey,OutputValue]"
  
  Please note that you need to download the file ivs.cf.json from the cloudformation folder and execute the command above in the same
  directory where the file is placed or change the path passed to --template-body parameter accordingly.
