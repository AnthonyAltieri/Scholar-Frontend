/**
 * Created by bharatbatra on 12/14/16.
 */
import { post } from './Ajax';

const routes = {
  'GET_ACTIVE': '/api/alert/get/active',
  'CREATE': '/api/alert/create',
};

export async function getActiveAlerts(courseSessionId){
  try {
    return await post( routes.GET_ACTIVE, { courseSessionId } );
  }
  catch (e) {
    console.error("[ERROR] in api/Alert > getActiveAlerts : " + e);
  }
}