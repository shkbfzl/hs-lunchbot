var testUser1 = {
  "Name":"cliu",
  "Places": [
      { "Id": 1, "Name": "Gene's Flat Bread" },
      { "Id": 2, "Name": "Elephant and Castle" },
      { "Id": 3, "Name": "Cafe Boston" },
      { "Id": 4, "Name": "Potbelly" },
      { "Id": 5, "Name": "Cosi" }
  ],
  "Choices": [
      { "Id": 1 },
      { "Id": 3 },
      { "Id": 4 }
  ],
  "Banned": [
      { "Id": 2 },
      { "Id": 5 }
  ],
  "History": [
      { "Id": 1, "Date": "2016-09-12" },
      { "Id": 3, "Date": "2016-09-11" }
  ],
  "LastModified": "2016-09-12"
};

module.exports = {
  testUser1:testUser1
};