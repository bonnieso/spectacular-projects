var Counter = {};

Counter.count = function(text) {
  var numbersMatch = text.match(/[0-9]/g) || { length: 0 };
  var spacesMatch = text.match(/\s/g) || { length: 0 };
  var paragraphsMatch = text.match(/\n/g) || { length: 0 };

  return {
    characters: text.length,
    words: text.split(" ").filter(function(word) {
      return word.length > 0;
    }).length,
    spaces: spacesMatch.length,
    numbers: numbersMatch.length,
    paragraphs: paragraphsMatch.length+1
  };
};

module.exports = Counter;
