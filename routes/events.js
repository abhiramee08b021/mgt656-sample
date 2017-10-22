var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.render('new_event', {title: 'Create new Event'});
});

router.post('/new', function(req, res, next) {
  var errors = [];
  var title = req.param("title");
  var image = req.param("image");
  var location = req.param("location");
  var year = req.param("year");
  var month = req.param("month");
  var day = req.param("day");
  var hour = req.param("hour");
  var minute = req.param("minute");

  console.log("trying to create a new event");
  if (title == "") {
    errors.push("title cannot be empty");
  }  

  if (image == ""){
    errors.push("image cannot be empty");
  }

  if (location == ""){
    errors.push("location cannot be empty");
  }

  if (title.length > 50){
    errors.push("title cannot be greater than 50 chars");
  }

  if (location.length > 50){
    errors.push("location cannot be greater than 50 chars");
  }

  if (image.endsWith(".png")  == false && image.endsWith(".gif") == false && image.endsWith(".JPG") == false){
    errors.push("image can only be a gif or png");
  }

  if (errors.length != 0){
    console.log("there are errors" + errors);
  	res.render('new_event', {errors: errors});
    console.log(image);
    return; 
  }

  var event = {id: events_list.events.length,
               title: title,
               image: image,
               location: location,
               time: month+"/"+ day + "/" + year + " " + hour+':'+minute,
               attendees: []

  };
  
  console.log(events_list);
  console.log('----------------------------------------')
  console.log(event);

  events_list.events.push(event);

  var url = events_list.events.length - 1;
  return res.redirect('/events/'+ url.toString());
});


router.get('/:event_id', function(req, res, next) {
  res.render('event_details', {title: 'View Event Details', event: events_list.events[req.param('event_id')]});
});

router.post('/:event_id', function(req, res, next) {
  console.log("posting to an event\n");
  var email = req.param("email")
  if (email.search(/yale.edu/i) == -1){
  	var errors = ["Not a valid yale email"];
  	res.render('event_details', {title: 'View Event Details', event: events_list.events[req.param('event_id')], errors: errors})
    return; 	
  }
  events_list.events[req.param('event_id')].attendees.push(email);
  console.log(events_list.events);
  res.render('event_details', {title: 'View Event Details', event: events_list.events[req.param('event_id')]});
});

module.exports = router;
