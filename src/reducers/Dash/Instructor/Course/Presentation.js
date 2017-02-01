/**
 * Created by bharatbatra on 2/1/17.
 */

//Takes a URL added by the user and prepares it for embedding
const prepareUrl = (url) => {

  const EMBED_TEXT = "/embed";

  const EMBED_TAIL = "/embed?start=false&loop=false&delayms=3000";

  const EDIT_TEXT = "/edit";

  let endIndex = url.indexOf(EDIT_TEXT);

  if(endIndex > -1 && endIndex < url.length) {
    url = url.substring(0, endIndex) + EMBED_TAIL;
  } else {
    if(url.indexOf(EMBED_TEXT) === -1) {
      url += EMBED_TAIL;
    }
  }
  return url;
};

const Presentation = (state = {}, action) => {
  switch(action.type) {
    case 'SET_PRESENTATION_URL': {
      return {
        ...state,
        url: prepareUrl(action.url)
      }
    }
    default: {
      return state;
    }
  }
};

export default Presentation;