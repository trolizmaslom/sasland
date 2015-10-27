function drawSvg(){

    $('.svg_item').each(function(){
        var itemSvg = $(this)
        var circle = itemSvg.find('.svg_circle');
        var svgText = itemSvg.find('.svgText');
        var maxValue = itemSvg.data('value');

        var interval = 30;
        var angle = 0;
        var angle_increment = 10;
        var max_angle = (maxValue*360/100);

        var timerId = setInterval(function () {;
            circle.attr("stroke-dasharray", angle + ", 20000");
            svgText.text((angle/360*100).toFixed(1) + '%');

            angle += angle_increment;
            if (angle > max_angle) {
                circle.attr("stroke-dasharray", max_angle + ", 20000");
                svgText.text((max_angle/360*100).toFixed(1) + '%');
                clearInterval(timerId);
            }

        }, interval);
    });
}

$(window).load(function() {
    drawSvg();
});
