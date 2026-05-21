Body
Navbar
Route= / => Feed
Route= /login =>Login
Route= /Connections => Connections
Route= /profile => Profile


#Deployment

-SignUp On AWS
-Launch Instance
-Chomd 400 <secret>.pem
-chmod 400 Windows CMD Me Usually Properly Kaam Nahi Karta. Windows Me icacls Use Karna Padta Hai.
-use chatgpt

cd "C:\Users\Himanshu saini\Downloads"

icacls "devTinder-secret.pem" /inheritance:r

icacls "devTinder-secret.pem" /remove "Himansh\CodexSandboxUsers"

icacls "devTinder-secret.pem" /grant:r "%USERNAME%:R"


ssh -i "devTinder-secret.pem" ubuntu@ec2-54-196-174-201.compute-1.amazonaws.com

if server is disconnect use upper -ssh -i cmd again 


-now install node
-but first run this cmd
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

then 

do this again
ssh -i "devTinder-secret.pem" ubuntu@ec2-54-196-174-201.compute-1.amazonaws.com
then
-install node version exact that you use in your system

nvm install current version

-then go on git and take project HTTPS 
and write on cmd git clone and then project HTTPS

Frontend
-ab pahle hum devTinder-web ko karege cd devTinder-web 
and npm install to install dependencies then npm run build 
to deplay frontend project there is a software called NGINX
-sudo apt update
-sudo apt install nginx
-sudo systemctl start nginx
-sudo systemctl enable nginx
-Copy code from dist to /var/www/html/
-sudo scp -r dist/* /var/www/html/
-cd /var/www/html/
-ls
-enable port :80 of your instance
-instance =>security=>security group
-inbound rules 

Backend
- npm install for backend dependencies
- use git pull agar koi changes ho jaye backend ke  code mein
-use git log to see changes 
-npm run start
 -allow ec2instance public IP on mongodb server
 - atlas => security => Network Access

-cmd band hote hi server band ho jayega toh isko fix karne klea hum use karte hai PM2
PM2 is Advanced Production Process Manager for Node.js
-PM2 is a daemon process manager that will help you manage and keep your application online 24/7
-npm install pm2 -g
then do this cmd pm2 start npm -- start
- pm2 logs (if application will not run )

Correct Flow Ye Hai:

cd ~/devTinder
pm2 delete npm
pm2 start npm --name devTinder -- start (for custom )
pm2 save

- pm2 logs (if application will not run )
- pm2 flush  (it will flushing the logs) npm  <name>

-pm2 list
-pm2 stop <name>
-pm2 delete <name>

Frontend = http://16.171.0.86/
Backend = http://16.171.0.86:7777

Domain name = devTinder.com => 16.171.0.86 

frontend = devTinder.com
backend = devTinder.com/api
use nginx proxy pass

chatgpt prompt =>NGINX proxy pass /api to 7777 node application

sudo nano /etc/nginx/sites-available/default

nginx congifg

 server_name 54.196.174.201;

 location /api/ {
        proxy_pass http://localhost:7777/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
    restart nginx

    -sudo systemctl restart nginx

    -modify the frontend project URL to "/api