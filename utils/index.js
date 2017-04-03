var slugify = require('slugify');

function ucwords(input){
    return input.replace(/\b\w/g, l => l.toUpperCase());
}

module.exports = {
  ucwords: ucwords,
  slugify: function(input){
    var pattern = /( ){2,}/g;
    input = input.trim().replace(pattern,' ');
    return slugify(input,'_').toLowerCase();
  },
  className: function(input){
    return ucwords(input).split(' ').join('');
  }
};
