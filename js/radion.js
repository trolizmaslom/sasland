function drawSvg(){
    var user = detect.parse(navigator.userAgent);
    console.log(user.browser.family == "IE");

        $('.svg_item').each(function(){
            var itemSvg = $(this),
                circle = itemSvg.find('.svg_circle'),
                svgText = itemSvg.find('.svgText'),
                maxValue = itemSvg.data('value'),
                radius = $(this).find('.svg_circle').attr('r'),
                interval = 15,
                angle = 0,
                angle_increment = 10,
                max_angle_R = parseInt((maxValue*(2*Math.PI*radius)/100)),
                zero = 0;

            if(!((maxValue ^ 0) === maxValue)){
                zero = 1;
            }
            itemSvg.addClass("show-block");
            if(!(user.browser.family == "IE")){
                var timerId = setInterval(function () {;
                    circle.attr("stroke-dasharray", angle + ", 20000");
                    svgText.text((angle/(2*Math.PI*radius)*100).toFixed(zero));

                    angle += angle_increment;
                    if (angle > max_angle_R ) {
                        circle.attr("stroke-dasharray", max_angle_R + ", 20000");
                        svgText.text((max_angle_R/(2*Math.PI*radius)*100).toFixed(zero));
                        clearInterval(timerId);
                    }

                }, interval);
            }else{
                circle.attr("stroke-dasharray", max_angle_R + ", 20000");
                svgText.text((max_angle_R/(2*Math.PI*radius)*100).toFixed(zero));
            }
        });
    }


$(window).load(function() {
    drawSvg();
});
