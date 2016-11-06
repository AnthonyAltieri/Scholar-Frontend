/**
 * @author Anthony Altieri on 10/13/16.
 */


export const retrievedMostVoted = (mostVoted) => ({
  type: 'RETRIEVED_MOST_VOTED',
  mostVoted,
});

export const retrievedMostRecent = (mostRecent) => ({
  type: 'RETRIEVED_MOST_RECENT',
  mostRecent,
});