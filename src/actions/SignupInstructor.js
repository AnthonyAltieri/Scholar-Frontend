/**
 * @author Anthony Altieri on 11/18/16.
 */

export const setReferralCode = (referralCode) => ({
  type: 'SET_REFERRAL_CODE',
  referralCode,
});

export const clearReferralCode = (referralCode) => ({
  type: 'CLEAR_REFERRAL_CODE',
});
