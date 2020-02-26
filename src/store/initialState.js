const electron = window.require('electron');
const fs = electron.remote.require('fs');

const rawdata = fs.readFileSync('./data/QnA.json'); //@TODO: add error handling and file lookup
const { topics, cards } = JSON.parse(rawdata);

export default {
  state: true,
  filter: '',
  cards,
  topics,
  currentTopicIdx: 0,
  currentCardIdx: 0,
  activeForm: '',
  topicsChanged: false,
};
