# Puzzles

This repo combines a couples of cloud services to play together as a node micro service:

* IFTTT to hook on Gmail API: https://ifttt.com/activity/applet/72428461d
* Webtask to run  a Node micro services: https://wt-899ad662534626853154fbb53e185922-0.run.webtask.io/ifttt-email-process
* mLab to store data on Mongo DB: https://mlab.com/databases/hernodb/

## How it works?

Just sent an email to `herno.apps.testing@gmail.com`.
Then check the applet log https://ifttt.com/activity/applet/72428461d and you should see a `applet run` log, which means
that our Webtask micro service has been execute successfully.

## What it does?

* We have a hook (IFTTT) on every new email sent to `herno.apps.testing@gmail.com` that fires a Webtask.
* Webtask runs a service that:
    * executes some data checks,
    * Save Data to a DB
    * Execute a success function (we're currently just logging a message).

## Test instructions 

If you want to test the micro service in isolation, you just need to:
* hit https://wt-899ad662534626853154fbb53e185922-0.run.webtask.io/ifttt-email-process?from=your.email@yourdomain.com

you will see this output:
```["message from: your.email@yourdomain.com","Data saved!","We did a great Job"]```

* hit https://wt-899ad662534626853154fbb53e185922-0.run.webtask.io/ifttt-email-process

and you will see an error report, data check has failed:
```{
  "code": 400,
  "error": "Script returned an error.",
  "details": "Error: no data",
  "name": "Error",
  "message": "no data",
  ...
}```