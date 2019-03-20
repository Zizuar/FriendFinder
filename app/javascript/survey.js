// const modal = $("#MyModal").modal();
$( document ).ready(function() {
    newSurvey();
    $('#submitButton').on('click', submit);
});

var queryList = masterQuery();

var choices = masterSelect();

function masterQuery() {
  return [
    `My idea of a great Saturday night is out at the club with a hot dance partner.`,
    `More often than not I find myself drawn to a small tight circle of friends.`,
    `Large groups of new people tend to cause high anxiety for me.`,
    `I would much rather cuddle up with a friend and watch a movie.`,
    `I tend to shun the center of attention in my crowd.`,
    `I need a new group of friends to keep things fresh and exciting.`,
    `Give me a good outside activity over just sitting idly in a circle.`,
    `I shy away from sharing my feelings so I do not upset others.`,
    `My loyalty can not be challenged by even the most distant buddy.`,
    `I will be liked by everyone no matter what I must do to get their approval.`
  ];
}

function masterSelect() {
  return [
    '1 (Uhh.. NO!)',
    '2 (Not really..)',
    '3 (Meh :-/)',
    '4 (Sorta - Kinda - Maybe?)',
    '5 (Like TOTALLY!!)'
  ];
}

function newSurvey() {
  for (var i = 0; i < queryList.length; i++) {
    var question = $('<div>').attr('id', 'questions' + i);
    question.append($('<h4>').html('Question ' + (i + 1)));
    question.append($('<p>').html(queryList[i]));
    var choices = newScores();
    choices.attr('id', 'choices' + i);
    question.append(choices);
    question.append($('<br>'));
    question.append($('<br>'));
    $( "#queryList" ).append(question);
  }
}

function newScores() {
  var select = $('<select>');
  for (var i = 0; i < choices.length; i++) {
    select.append($('<option>').val(i+1).text(choices[i]));
  }
  return select;
}

function submit() {
  event.preventDefault();
  var scores = [];
  answerLift();
  var postData = dataPrep();
  $.post("/api/friends", postData,
  function(data, status){
    $('#bffName').text(data.name);
    $('#bffPhoto').attr('src', data.photo);
  });

  function dataPrep() {
    return {
      scores: JSON.stringify(answers),
      name: $('#name').val(),
      photo: $('#photo').val()
    };
  }

  function answerLift() {
    for (var i = 0; i < queryList.length; i++) {
      var answerList = '#choice' + i;
      var answer = $(answerList).val();
      scores.push(answer);
    }
  }
}