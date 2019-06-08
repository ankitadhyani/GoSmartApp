import axios from 'axios';

// set up functions for talking to our backend


// getScrapedJobsByLoc
export const getScrapedJobsByLoc = (location) => {
  return axios.get( `/api/scrape/${location}` )
}


// export all functions so if someone needs to import all they can
export default {
    getScrapedJobsByLoc
}


