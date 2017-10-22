var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/events', function(req, res, next) {
  var search = req.query.search;
  console.log(search);
  var events = {events: []}
  if (typeof search != undefined) {
    for (var i=0; i<=events_list.events.length-1;i++){
      if (events_list.events[i].title.search(search) != -1){
      	events.events.push(events_list.events[i]);
      }
    }
    res.send(events);
    return;
  }
    res.send(events_list);
});


module.exports = router;
