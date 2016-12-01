/**
 * @author Anthony Altieri on 11/8/16.
 */

export const Schools = [
  'University of California-San Diego',
  'University of California-Berkeley',
  'University of California-Davis',
  'University of California-Irvine',
  'University of California-Santa Barbara',
  'San Jose State University'
];

export const isValidSchool = (school) => {
  return !!Schools
    .filter(s => school.toLowerCase() === s.toLowerCase())[0];
};