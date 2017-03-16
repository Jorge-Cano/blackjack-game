console.log('JS is working!');
$(function() {
  $('#playerOneHit').hide();
  $('#playerOneStand').hide();

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
var wins=0;
var losses=0;
var pushes=0;






//deal the cards
$('#dealButton').click(function() {
  $('.cardArea').empty();
  $('#playerOneHit').show();
  $('#playerOneStand').show();
  handDealer=[];
  handPlayerOne=[];
  //check how much of deck is left
  if(shuffledCards.length<20) {
    deck_of_cards();
  };
  //first card for each
    handPlayerOne.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#playerOneCards');
    $('#playerOneCards h3.suit').eq(0).text(handPlayerOne[0].suit);
    $('#playerOneCards h3.value').eq(0).text(handPlayerOne[0].value);
    handDealer.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#dealerCards').attr('id', 'dealerFirstCard');
    $('#dealerCards h3.suit').eq(0).text(handDealer[0].suit).hide();
    $('#dealerCards h3.value').eq(0).text(handDealer[0].value).hide();
    $('#dealerFirstCard').eq(0).css('background-image', 'url(img/card-back-red.png)');


  //second card for each
    handPlayerOne.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#playerOneCards');
    $('#playerOneCards h3.suit').eq(1).text(handPlayerOne[1].suit);
    $('#playerOneCards h3.value').eq(1).text(handPlayerOne[1].value);
    handDealer.push(shuffledCards[0]);
    shuffledCards.shift();
    $card.clone().css('display','inline-block').appendTo('#dealerCards');
    $('#dealerCards h3.suit').eq(1).text(handDealer[1].suit);
    $('#dealerCards h3.value').eq(1).text(handDealer[1].value);

  //check for blackjack
  addPlayerOneTotal();
  addDealerTotal();
  if (handPlayerOneValue===21 && handDealerValue===21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    pushes +=1;
    $('#pushesText').text(pushes);
  } else if (handDealerValue===21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    losses+=1;
    $('#lossesText').text(losses);
  } else if (handPlayerOneValue===21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    wins+=1;
    $('#winsText').text(wins);
  }

});




//hit-me, add card to player
$('#playerOneHit').click(function() {
  handPlayerOne.push(shuffledCards[0]);
  shuffledCards.shift();
  $card.clone().css('display','inline-block').appendTo('#playerOneCards');
  $('#playerOneCards h3.suit').eq(handPlayerOne.length-1).text(handPlayerOne[handPlayerOne.length-1].suit);
  $('#playerOneCards h3.value').eq(handPlayerOne.length-1).text(handPlayerOne[handPlayerOne.length-1].value);

  //check for bust
  addPlayerOneTotal();
  if (handPlayerOneValue>21) {
    $('#playerOneHit').hide();
    $('#playerOneStand').hide();
    losses+=1;
    $('#lossesText').text(losses);
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
  console.log("Player: "+handPlayerOneValue);

  //dealer's turn
  addDealerTotal();
  if (handDealerValue<17) {
    addCardDealer();
    addDealerTotal();
  };

//check for the outcome
  addPlayerOneTotal();
  addDealerTotal();
  if (handDealerValue>21) {
    wins+=1;
    $('#winsText').text(wins);
  } else if (handPlayerOneValue==handDealerValue) {
    pushes +=1;
    $('#pushesText').text(pushes);
  } else if (handDealerValue>handPlayerOneValue) {
    losses+=1;
    $('#lossesText').text(losses);
  } else if (handDealerValue<handPlayerOneValue) {
    wins+=1;
    $('#winsText').text(wins);
  }




});

//add card to dealer function
function addCardDealer() {
  handDealer.push(shuffledCards[0]);
  shuffledCards.shift();
  $card.clone().css('display','inline-block').appendTo('#dealerCards');
  $('#dealerCards h3.suit').eq(handDealer.length-1).text(handDealer[handDealer.length-1].suit);
  $('#dealerCards h3.value').eq(handDealer.length-1).text(handDealer[handDealer.length-1].value);
};
//adding up Player One
function addPlayerOneTotal() {
  handPlayerOneValue=0;
  var acePresentPlayerOne=false;
  for (var i=0;i<handPlayerOne.length;i++) {
    if (handPlayerOne[i].value=='Jack' || handPlayerOne[i].value=='Queen' || handPlayerOne[i].value=='King') {
      handPlayerOneValue+=10;
    } else if (handPlayerOne[i].value=='Ace' && 11+handPlayerOneValue>21) {
      handPlayerOneValue+=1;
      acePresentPlayerOne=true;
    } else if (handPlayerOne[i].value=='Ace') {
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
    if (handDealer[i].value=='Jack' || handDealer[i].value=='Queen' ||  handDealer[i].value=='King') {
      handDealerValue+=10;
    } else if (handDealer[i].value=='Ace' && 11+handDealerValue>21) {
      handDealerValue+=1;
      acePresentDealer=true;
    } else if (handDealer[i].value=='Ace') {
      handDealerValue+=11;
      acePresentDealer=true;
    } else {
      handDealerValue+=handDealer[i].value;
    };
  };
  if (acePresentDealer==true && handDealerValue>21) {
    handDealerValue=handDealerValue-10;
  };
  console.log("Dealer: "+handDealerValue);
};

$('#dealButton').mouseover(function () {
  $('#dealButton').css('background-color', 'white');
});
$('#dealButton').mouseleave(function () {
  $('#dealButton').css('background-color', 'rgba(0,129,10,1)');
});
$('#playerOneHit').mouseover(function () {
  $('#playerOneHit').css('background-color', 'white');
});
$('#playerOneHit').mouseleave(function () {
  $('#playerOneHit').css('background-color', 'rgba(0,129,10,1)');
});
$('#playerOneStand').mouseover(function () {
  $('#playerOneStand').css('background-color', 'white');
});
$('#playerOneStand').mouseleave(function () {
  $('#playerOneStand').css('background-color', 'rgba(0,129,10,1)');
});


















});
