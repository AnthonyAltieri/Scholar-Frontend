/**
 * Created by bharatbatra on 2/1/17.
 */

const createWebNotification = (content) => {

    if (!("Notification" in window)) {
      return false;
    }

    //Let's check whether notification permissions have already been granted 
    else if (Notification.permission === "granted") {   // If it's okay let's create a notification 
      var notification = new Notification(content);
      return true; //success
    }

    // Otherwise, we need to ask the user for permission else
    if (Notification.permission !== 'denied') { 
      Notification.requestPermission(function (permission) {     // If the user accepts, let's create a notification 
          if (permission === "granted") { 
            var notification = new Notification(content); 
            return true;
          } 
      }); 
    }
    else {
      return false;//error
    }
};



export default createWebNotification;



