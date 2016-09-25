/**
 * @author Anthony Altieri on 8/26/16.
 */

import Vote from './Vote';
import { testVote } from './Vote';
import { testVotes } from './Votes';
import { testQuestion } from './Question';
import { testQuestionList } from './QuestionList';
import { testStudentQuestionList } from './StudentQuestionList';
import { testUser } from './User';

console.log('===========================');
console.log('        BEGIN TESTS        ');
console.log('===========================');

testVote();
testVotes();
testQuestion();
testQuestionList();
testStudentQuestionList();
testUser();

console.log('===========================');
console.log('   ALL TESTS SUCCESSFUL    ');
console.log('===========================');
