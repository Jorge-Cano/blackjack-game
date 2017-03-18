console.log('JS is working!');
$(function() {
  $('#playerOneHit').hide();
  $('#playerOneStand').hide();
  var purse=100;


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
    var values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
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
  // reset things
  console.log(purse);
  $('h1').css('color', 'rgba(255,255,255,.2)');
  $('.cardArea').empty();
  $('#playerOneHit').show();
  $('#playerOneStand').show();
  $('#dealButton').css('visibility', 'hidden');;
  $('#purseText').css('color', 'black').css('font-weight', '400');
  $('.newShuffle').css('visibility','hidden');
  handDealer=[];
  handPlayerOne=[];
  //check how much of deck is left
  if(shuffledCards.length<20) {
    deck_of_cards();
    $('.newShuffle').css('visibility','visible');
  };
  //first card for each
    handPlayerOne.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#playerOneCards');
    $('#playerOneCards h3.suit').eq(0).text(handPlayerOne[0].suit);
    $('#playerOneCards h3.value').eq(0).text(handPlayerOne[0].value);
    //change suit color
    if (handPlayerOne[0].suit=='diamonds' || handPlayerOne[0].suit=='hearts') {
      $('#playerOneCards .card').eq(0).css('color', 'red');
    };
    handDealer.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#dealerCards').attr('id', 'dealerFirstCard');
    $('#dealerCards h3.suit').eq(0).text(handDealer[0].suit).hide();
    $('#dealerCards h3.value').eq(0).text(handDealer[0].value).hide();
    $('#dealerFirstCard').eq(0).css('background-image', 'url(img/card-back-red.png)');
    //change suit color
    if (handDealer[0].suit=='diamonds' || handDealer[0].suit=='hearts') {
      $('#dealerCards .card').eq(1).css('color', 'red');
    };


  //second card for each
    handPlayerOne.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#playerOneCards');
    $('#playerOneCards h3.suit').eq(1).text(handPlayerOne[1].suit);
    $('#playerOneCards h3.value').eq(1).text(handPlayerOne[1].value);
    //change suit color
    if (handPlayerOne[1].suit=='diamonds' || handPlayerOne[1].suit=='hearts') {
      $('#playerOneCards .card').eq(1).css('color', 'red');
    };
    handDealer.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#dealerCards');
    $('#dealerCards h3.suit').eq(1).text(handDealer[1].suit);
    $('#dealerCards h3.value').eq(1).text(handDealer[1].value);
    //change suit color
    if (handDealer[1].suit=='diamonds' || handDealer[1].suit=='hearts') {
      $('#dealerCards .card').eq(1).css('color', 'red');
    };

  //check for blackjack
  addPlayerOneTotal();
  addDealerTotal();
  if (handPlayerOneValue===21 && handDealerValue===21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    $('#dealerCards h3.suit').eq(0).show();
    $('#dealerCards h3.value').eq(0).show();
    $('#dealerFirstCard').css('background-image', 'none');
    $('#purseText').text(purse).css('font-weight', '700');
    $('#dealButton').css('visibility', 'visible');;
  } else if (handDealerValue===21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    $('#dealerCards h3.suit').eq(0).show();
    $('#dealerCards h3.value').eq(0).show();
    $('#dealerFirstCard').css('background-image', 'none');
    purse-=10;
    $('#purseText').text(purse).css('color', 'blue').css('font-weight', '700');
    $('#dealButton').css('visibility', 'visible');;
  } else if (handPlayerOneValue===21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    $('h1').css('color', 'red');
    $('#dealerCards h3.suit').eq(0).show();
    $('#dealerCards h3.value').eq(0).show();
    $('#dealerFirstCard').css('background-image', 'none');
    purse+=15;
    $('#purseText').text(purse).css('color', 'red').css('font-weight', '700');
    $('#dealButton').css('visibility', 'visible');;
  }

});




//hit-me, add card to player
$('#playerOneHit').click(function() {
  handPlayerOne.push(shuffledCards[0]);
  shuffledCards.shift();
  $card.clone().css('display','inline-block').appendTo('#playerOneCards');
  $('#playerOneCards h3.suit').eq(handPlayerOne.length-1).text(handPlayerOne[handPlayerOne.length-1].suit);
  $('#playerOneCards h3.value').eq(handPlayerOne.length-1).text(handPlayerOne[handPlayerOne.length-1].value);
  //change suit color
  if (handPlayerOne[handPlayerOne.length-1].suit=='diamonds' || handPlayerOne[handPlayerOne.length-1].suit=='hearts') {
    $('#playerOneCards .card').eq(handPlayerOne.length-1).css('color', 'red');
  };

  //check for bust
  addPlayerOneTotal();
  if (handPlayerOneValue>21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    purse-=10;
    $('#purseText').text(purse).css('color', 'blue').css('font-weight', '700');
    $('#dealButton').css('visibility', 'visible');;
  };

});

//end the game
var handPlayerOneValue=0;
var handDealerValue=0;
$('#playerOneStand').click(function() {
  addPlayerOneTotal();
  $('#playerOneHit').hide();
  $('#playerOneStand').hide();
  $('#dealerFirstCard').css('background-image', 'none');
  $('#dealerCards h3.suit').eq(0).show();
  $('#dealerCards h3.value').eq(0).show();
  $('#dealButton').css('visibility', 'visible');

  //dealer's turn
  addDealerTotal();
  while (handDealerValue<17) {
    addCardDealer();
    addDealerTotal();

  };


//check for the outcome
  addPlayerOneTotal();
  addDealerTotal();
  if (handDealerValue>21) {
    purse+=10;
    $('#purseText').text(purse).css('color', 'red').css('font-weight', '700');
  } else if (handPlayerOneValue==handDealerValue) {
    $('#purseText').text(purse).css('font-weight', '700');
  } else if (handDealerValue>handPlayerOneValue) {
    purse-=10;
    $('#purseText').text(purse).css('color', 'blue').css('font-weight', '700');
  } else if (handDealerValue<handPlayerOneValue) {
    purse+=10;
    $('#purseText').text(purse).css('color', 'red').css('font-weight', '700');
  }
});

//add card to dealer function
function addCardDealer() {
  handDealer.push(shuffledCards[0]);
  shuffledCards.shift();
  $card.clone().css('display','inline-block').appendTo('#dealerCards');
  $('#dealerCards h3.suit').eq(handDealer.length-1).text(handDealer[handDealer.length-1].suit);
  $('#dealerCards h3.value').eq(handDealer.length-1).text(handDealer[handDealer.length-1].value);
  if (handDealer[handDealer.length-1].suit=='diamonds' || handDealer[handDealer.length-1].suit=='hearts') {
    $('#dealerCards .card').eq(handDealer.length-1).css('color', 'red');
  };
};
//adding up Player One
function addPlayerOneTotal() {
  handPlayerOneValue=0;
  var acePresentPlayerOne=false;
  for (var i=0;i<handPlayerOne.length;i++) {
    if (handPlayerOne[i].value=='J' || handPlayerOne[i].value=='Q' || handPlayerOne[i].value=='K') {
      handPlayerOneValue+=10;
    } else if (handPlayerOne[i].value=='A' && 11+handPlayerOneValue>21) {
      handPlayerOneValue+=1;
    } else if (handPlayerOne[i].value=='A') {
      handPlayerOneValue+=11;
      acePresentPlayerOne=true;
    } else {
      handPlayerOneValue+=handPlayerOne[i].value;
    };
  };
  if (acePresentPlayerOne==true && handPlayerOneValue>21) {
    handPlayerOneValue=handPlayerOneValue-10;
  };
};

//Adding up Dealer
function addDealerTotal() {
  var acePresentDealer=false;
  handDealerValue=0;
  for (var i=0; i<handDealer.length;i++) {
    if (handDealer[i].value=='J' || handDealer[i].value=='Q' ||  handDealer[i].value=='K') {
      handDealerValue+=10;
    } else if (handDealer[i].value=='A' && 11+handDealerValue>21) {
      handDealerValue+=1;
    } else if (handDealer[i].value=='A') {
      handDealerValue+=11;
      acePresentDealer=true;
    } else {
      handDealerValue+=handDealer[i].value;
    };
  };
  if (acePresentDealer==true && handDealerValue>21) {
    handDealerValue=handDealerValue-10;
  };
};

//hover over button effects
$('#dealButton').mouseover(function () {
  $('#dealButton').css('background-color', 'rgba(255,255,255,.25)').css('color','rgba(0,129,10,1)');
});
$('#dealButton').mouseleave(function () {
  $('#dealButton').css('background-color', 'rgba(0,129,10,1)').css('color', 'rgba(255,255,255,.25)');
});
$('#playerOneHit').mouseover(function () {
  $('#playerOneHit').css('background-color', 'rgba(255,255,255,.25)').css('color','rgba(0,129,10,1)');
});
$('#playerOneHit').mouseleave(function () {
  $('#playerOneHit').css('background-color', 'rgba(0,129,10,1)').css('color', 'rgba(255,255,255,.25)');
});
$('#playerOneStand').mouseover(function () {
  $('#playerOneStand').css('background-color', 'rgba(255,255,255,.25)').css('color','rgba(0,129,10,1)');
});
$('#playerOneStand').mouseleave(function () {
  $('#playerOneStand').css('background-color', 'rgba(0,129,10,1)').css('color', 'rgba(255,255,255,.25)');
});


















});
