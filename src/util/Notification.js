/**
 * Created by bharatbatra on 2/1/17.
 */

const createWebNotification = (content) => {

  console.log("CREATE NOTIFICATION FOR : " + content);
    if (!("Notification" in window)) {
      console.log("Mark1");
      return false;
    }

    //Let's check whether notification permissions have already been granted 
    else if (Notification.permission === "granted") {   // If it's okay let's create a notification 
      var notification = new Notification(content);
     setTimeout( () => notification.close(), 3000);
      console.log("Mark2");
      return true; //success
    }
    else if (Notification.permission !== 'denied') { 
      Notification.requestPermission(function (permission) {     // If the user accepts, let's create a notification 
          if (permission === "granted") { 
            var notification = new Notification(content);
            setTimeout( () => notification.close(), 3000);
            console.log("Mark3");
            return true;
          } 
      }); 
    }
    else {
      console.log("Mark4");
      return false;//error
    }
};



export default createWebNotification;



