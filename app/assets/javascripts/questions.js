var voteDown = function() {
  $( ".vote_down" ).click(function( event ) {
      event.preventDefault();

      $(this).find('img').removeClass("down_inactive").addClass("down_active");
      $(this).parent().find('img').first().removeClass("up_active").addClass("up_inactive");

      var questionId = $(this).attr( "data_question" );
      var answerId = $(this).attr( "id" );
      var data = { answer_id: answerId, like: 'false', question_id: questionId };
          $.get( '/vote', data, function( response ) {
            $('.count-' + response.answer_id).html('LIKES: ' + response.count);
          });
  });
};

var voteUp = function() {
  $( ".vote_up" ).click(function( event ) {
        event.preventDefault();

        $(this).find('img').removeClass("up_inactive").addClass("up_active");
        $(this).next().find('img').removeClass("down_active").addClass("down_inactive");

        var questionId = $(this).attr( "data_question" );
        var answerId = $(this).attr( "id" );
        var data = { answer_id: answerId, like: 'true', question_id: questionId };
            $.get( '/vote', data, function( response ) {
              $('.count-' + response.answer_id).html('LIKES: ' + response.count);
        });
  });
};

var askQuestion = function() {
  $('h3.ask-question').on("click", function(event){
        event.preventDefault();
        $.get("/questions/new", function(data) {
            $('h3.ask-question').hide();
            $('form.search').before(data);
        });
    });
};

var newAnswer = function() {
  $('form#new_answer').submit(function(event){
        event.preventDefault();
        var formContent = $('textarea#answer_content').val();
        $('textarea#answer_content').val("")
        var data = { answer : { content : formContent } }
        var formUrl = $('form#new_answer').attr('action');
        $.post(formUrl, data, function(success){
            $('ul.answers').prepend(success);
        }, "html");
    });
}

var userVotes = function(){
    var voteArray = $('.vote_info');
    $.each(voteArray, function(){
        if ( $(this).data('like') === true ) {
            $(this).find('a:first img').removeClass('up_inactive').addClass('up_active');
        }
        else if ( $(this).data('like') === false ) {
            $(this).find('a:nth-child(2) img').removeClass('down_inactive').addClass('down_active');
        }
    });
}

$(document).ready(voteDown);
$(document).ready(voteUp);
$(document).ready(askQuestion);
$(document).ready(newAnswer);
$(document).ready(userVotes);

$(document).on('page:load', voteDown);
$(document).on('page:load', voteUp);
$(document).on('page:load', askQuestion);
$(document).on('page:load', newAnswer);
$(document).on("page:load", userVotes);





