console.log('JS is working!');
$(function() {


// Fisher-Yates Shuffle
// http://stackoverflow.com/a/6274398
  function shuffle(array) {
      var counter = array.length, temp, index;
      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          index = Math.floor(Math.random() * counter);

          // Decrease counter by 1
          counter--;

          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      };

      return array;
  };

  var cards = []; // deck
  var shuffledCards = []; // deck shuffled
//make shuffled deck of cards
  function deck_of_cards() {
    var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
    var suits = ['hearts', 'diamonds', 'clubs', 'spades'];

    for (var i=0; i<suits.length; i++) {
      for(var j=0; j<values.length;j++) {
        var deck = {};
        deck.suit= suits[i];
        deck.value=values[j];
        cards.push(deck);
      };
    };
  shuffledCards=shuffle(cards);
  };
  deck_of_cards();

var handDealer=[];
var handPlayerOne=[];
var $card=$('#deckCard');

//deal the cards
$('#dealButton').click(function() {
  $('.cardArea').empty();
  handDealer=[];
  handPlayerOne=[];
  //check how much of deck is left
  if(shuffledCards.length<20) {
    deck_of_cards();
  };
  for (var i=0;i<2;i++) {
    handPlayerOne.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#playerOneCards');
    $('#playerOneCards h3.suit').eq(i).text(handPlayerOne[i].suit);
    $('#playerOneCards h3.value').eq(i).text(handPlayerOne[i].value);
    // if (handPlayerOne.length===2) {
    //   $('#playerOneCards div.card').eq(1).css('z-index', '1').css('left','-3em');
    // };
    handDealer.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#dealerCards');
    $('#dealerCards h3.suit').eq(i).text(handDealer[i].suit);
    $('#dealerCards h3.value').eq(i).text(handDealer[i].value);
    // if (handDealer.length===2) {
    //   $('#dealerCards div.card').eq(1).css('z-index', '1').css('left','-3em');
    // };
  };
});




//hit-me, add card to player
$('#playerOneHit').click(function() {
  handPlayerOne.push(shuffledCards[0]);
  $card.clone().css('display','inline-block').appendTo('#playerOneCards');
  $('#playerOneCards h3.suit').eq(handPlayerOne.length-1).text(handPlayerOne[handPlayerOne.length-1].suit);
  $('#playerOneCards h3.value').eq(handPlayerOne.length-1).text(handPlayerOne[handPlayerOne.length-1].value);
});



























});
