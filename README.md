# Get feedback - emoting

This application is designed for getting feedback from the audience. It can be used in public presentations, or even in airport or retail shops to see if our customers are content  with the service. So, by simply asking a questions we can get feedback about their experience. 
 
This application uses:
*IBM Bluemix OpenWhisk to host the backend
*Cloudant to persist the data
*GitHub Pages to host the frontend

Usage:
*Create a new question
*Retrieve the question to collect feedback
*Record the answers
*View the results 


## Code Structure

| File | Description |
| ---- | ----------- |
|[**question.create.js**](actions/question.create.js)| Creates a new question. |
|[**question.read.js**](actions/question.read.js)| Returns the text of a question based on its ID. |
|[**question.stats.js**](actions/question.stats.js)| Returns results about a given question. |
|[**rating.create.js**](actions/rating.create.js)| Called when a user taps on one of the rating. |
|[**options.js**](actions/options.js)| Implements the OPTIONS verb for the actions exposed through the OpenWhisk API Gateway. |
|[**deploy.sh**](deploy.sh)|Helper script to install, uninstall, update the OpenWhisk actions used by the application.|