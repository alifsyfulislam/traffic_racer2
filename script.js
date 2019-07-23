var play = $('#play_now');
var container = $('#container');
var container2 = $('#container_2');
var arwL = $('.left_move');
var arwR = $('.right_move');
var anim_id;
    
var car = $('#car');
var car_1 = $('#car_1');
var car_2 = $('#car_2');
var car_3 = $('#car_3');
var line_1 = $('#line_1');
var line_2 = $('#line_2');
var line_3 = $('#line_3');
var restart_div = $('.restart');
var restart_btn = $('.restart_icon');
var score = $('#score');

var container_left = parseInt(container.css('left'));
var container_width = parseInt(container.width());
var container_height = parseInt(container.height());
var car_width = parseInt(car.width());
var car_height = parseInt(car.height());

var game_over = false;
var score_counter = 1;

var speed = 2;
var line_speed = 5;

var move_right = false;
var move_left = false;
var move_up = false;
var move_down = false;

container2.hide();
arwR.hide();
arwL.hide();

play.click(gameRule);



function gameRule() {
    play.hide();
    arwR.show();
    arwL.show();
    anim_id = requestAnimationFrame(repeat);
    function repeat() {
        if (collision(car, car_1) || collision(car, car_2) || collision(car, car_3)) {
            stop_the_game();
            return;
        }
        score_counter++;

        if (score_counter % 20 == 0) {
            score.text(parseInt(score.text()) + 1);
        }
        if (score_counter % 500 == 0) {
            speed++;
            line_speed++;
        }

        car_down(car_1);
        car_down(car_2);
        car_down(car_3);

        line_down(line_1);
        line_down(line_2);
        line_down(line_3);
        anim_id = requestAnimationFrame(repeat);
    }
    function car_down(car) {
        var car_current_top = parseInt(car.css('top'));
        if (car_current_top > container_height) {
            car_current_top = -200;
            var car_left = parseInt(Math.random() * (container_width - car_width));
            car.css('left', car_left);
        }
        car.css('top', car_current_top + speed);
    }

    function line_down(line) {
        var line_current_top = parseInt(line.css('top'));
        if (line_current_top > container_height) {
            line_current_top = -300;
        }
        line.css('top', line_current_top + line_speed);
    }
    function stop_the_game() {
        game_over = true;
        cancelAnimationFrame(anim_id);
        cancelAnimationFrame(move_right);
        cancelAnimationFrame(move_left);
        cancelAnimationFrame(move_up);
        cancelAnimationFrame(move_down);
        container.hide();
        container2.show();
        restart_div.slideDown();
        restart_btn.focus();
    }
    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;
        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
        return true;
    }
}



arwL.click(left);
arwR.click(right);
function left() {
    if (game_over === false && parseInt(car.css('left')) > 30) {
        car.css('left', parseInt(car.css('left')) - 35);
    }
}

function right() {
    if (game_over === false && parseInt(car.css('left')) <= (container_width-30) - car_width) {
        car.css('left', parseInt(car.css('left')) + 35);
    }
}



restart_btn.click(function() {
    score_counter = 1;
    speed =2;
    score.text(0);
    container2.hide();
    container.show();
    car_1.css('left', 60 + "%");
    car_1.css('top', -100 + "px");
    car_2.css('left', 40 + "%");
    car_2.css('top', -200 + "px");
    car_3.css('left', 50 + "%");
    car_3.css('top', -350 + "px");
    game_over=false;
    gameRule();
    arwL.click(left);
    arwR.click(right);
});
