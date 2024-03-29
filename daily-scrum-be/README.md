# Daily Scrum BE

curl -H "Content-Type: application/json" -X POST -d '{"username":"pippo", "password":"pippo"}' localhost:3000/api/register

curl -H "Content-Type: application/json" -X POST -d '{"username":"pippo", "password":"pippo"}' localhost:3000/api/login

## protected APIs

curl -H "Content-Type: application/json" -H "Authorization: Bearer xxxxx" -X GET localhost:3000/api/users

curl -H "Content-Type: application/json" -H "Authorization: Bearer xxxxx" -X GET localhost:3000/api/sessions

curl -H "Content-Type: application/json" -H "Authorization: Bearer xxxxx" -X GET localhost:3000/api/jira/5b4718b76a66cf638d2c9b11

