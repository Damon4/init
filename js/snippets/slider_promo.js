var SLIDER = {};
// SLIDER.init('b-slider__menu-item', 'b-slider__content-item', 'b-slider__menu-item_select');
(function(){
    SLIDER.init = function(CLASS_TRIGGER, CLASS_IMAGE, CLASS_SELECT){
        SLIDER.CLASS_TRIGGER = '.' + CLASS_TRIGGER;
        SLIDER.CLASS_TRIGGER_SELECT = CLASS_SELECT;
        SLIDER.CLASS_IMAGE = '.' + CLASS_IMAGE;
        SLIDER.TIME_LOOP = 700;
        SLIDER.TIME_TIMER = 5000;

        SLIDER.TRIGGERS = $(SLIDER.CLASS_TRIGGER);
        SLIDER.IMAGES = $(SLIDER.CLASS_IMAGE);

        SLIDER.TARGET = '';
        SLIDER.TRIGGER_LAST = SLIDER.TRIGGERS.length-1;
        SLIDER.TRIGGERS.first().addClass(SLIDER.CLASS_TRIGGER_SELECT);
        SLIDER.IMAGES.hide().first().show();

        SLIDER.RESPONSE = function(TARGET){
            SLIDER.IMAGES.fadeOut(SLIDER.TIME_LOOP).eq(TARGET).fadeIn(SLIDER.TIME_LOOP);
            SLIDER.TRIGGERS.removeClass(SLIDER.CLASS_TRIGGER_SELECT).eq(TARGET).addClass(SLIDER.CLASS_TRIGGER_SELECT);
        };

        SLIDER.TRIGGERS.click(function() {
            if ( !$(this).hasClass(SLIDER.CLASS_TRIGGER_SELECT) ) {
                SLIDER.TARGET = $(this).index();
                SLIDER.RESPONSE(SLIDER.TARGET);
                SLIDER.TIMING_RESET();
            }
            return false;
        });

        SLIDER.TIMING_SLIDER = function(){
            SLIDER.TARGET = $(SLIDER.CLASS_TRIGGER+'.'+SLIDER.CLASS_TRIGGER_SELECT).index();
            SLIDER.TARGET === SLIDER.TRIGGER_LAST ? SLIDER.TARGET = 0 : SLIDER.TARGET = SLIDER.TARGET + 1;
            SLIDER.RESPONSE(SLIDER.TARGET);
        };

        SLIDER.TIMING_RUN = setInterval(function() { SLIDER.TIMING_SLIDER(); },SLIDER.TIME_TIMER);
        SLIDER.TIMING_RESET = function() {
            clearInterval(SLIDER.TIMING_RUN);
            SLIDER.TIMING_RUN = setInterval(function() { SLIDER.TIMING_SLIDER(); },SLIDER.TIME_TIMER);
        };
    };
}());