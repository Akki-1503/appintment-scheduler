function timeSlots(body, doctorId) {

    function addMinutes(time, minutes) {
        var date = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
       // console.log('date', date)
        var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
          ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes()) + ':' +
          ((date.getSeconds().toString().length == 1) ? '0' + date.getSeconds() : date.getSeconds());
        return tempTime;
      }
      // console.log('fun-body' , body)
      console.log('time', body.startTime) //2023-09-02T09:00:00.000Z
    
       let stime = body.startTime.slice(11, 19) // '09:00:00'
       let etime  = body.endTime.slice(11, 19)
       
        
      // console.log('stime', stime) 
      // console.log('stime-type', typeof(stime))
    
      var startDate= body.startDate; 
      //var starttime = "09:00:00"; to time 2023-09-02T09:00:00.000Z
      var startTime = stime;
    
      var interval = body.interval;
      var endDate= body.endDate
      var endTime = etime;
      var timeslots = [startTime];
      const timeIntervals = [];
     
      
      while (startTime != endTime) {
      
        startTime = addMinutes(startTime, interval);
        timeslots.push(startTime);  
         }
         for (let i = 0; i < timeslots.length-1; i++) {
                console.log('i', i)
                const startTime = timeslots[i];
                const endTime = timeslots[i + 1];
               // console.log()
                // obj construction
                const timeInterval = {
                    startDate : startDate,
                    startTime:`${startDate}T${startTime}.000Z`,
                    endDate :endDate,
                    endTime: `${endDate}T${endTime}.000Z`,
                    isBooked: false,
                    interval:interval,
                    doctor: doctorId
    
                    //interval: "30"
                  //  docid: Number(new Date())
                  };
                // console.log('timeInterval', timeInterval)
        
               // Push the interval object to the output array
               timeIntervals.push(timeInterval);
            }
     // console.log('timeIntervals', timeIntervals)
     //console.log('timeslots', timeslots);
      return timeIntervals
    }
    
    
    module.exports = timeSlots