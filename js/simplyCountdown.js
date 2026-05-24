/*!
 * simply-countdown (fixed version)
 * Date : 2026 fix for wedding countdown
 */

(function (exports) {
    'use strict';

    var extend, createElements, createCountdownElt, simplyCountdown;

    extend = function (out) {
        var i, obj, key;
        out = out || {};

        for (i = 1; i < arguments.length; i += 1) {
            obj = arguments[i];

            if (obj) {
                for (key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        if (typeof obj[key] === 'object') {
                            extend(out[key], obj[key]);
                        } else {
                            out[key] = obj[key];
                        }
                    }
                }
            }
        }

        return out;
    };

    createCountdownElt = function (countdown, parameters, typeClass) {
        var sectionTag = document.createElement('div');
        var amountTag = document.createElement('span');
        var wordTag = document.createElement('span');
        var inner = document.createElement('div');

        inner.appendChild(amountTag);
        inner.appendChild(wordTag);
        sectionTag.appendChild(inner);

        sectionTag.classList.add(parameters.sectionClass);
        sectionTag.classList.add(typeClass);
        amountTag.classList.add(parameters.amountClass);
        wordTag.classList.add(parameters.wordClass);

        countdown.appendChild(sectionTag);

        return {
            full: sectionTag,
            amount: amountTag,
            word: wordTag
        };
    };

    createElements = function (parameters, countdown) {
        return {
            days: createCountdownElt(countdown, parameters, 'simply-days-section'),
            hours: createCountdownElt(countdown, parameters, 'simply-hours-section'),
            minutes: createCountdownElt(countdown, parameters, 'simply-minutes-section'),
            seconds: createCountdownElt(countdown, parameters, 'simply-seconds-section')
        };
    };

    simplyCountdown = function (elt, args) {

        var parameters = extend({
            year: 2026,
            month: 7,
            day: 5,
            hours: 17,
            minutes: 30,
            seconds: 0,

            words: {
                year: 'năm',
                month: 'tháng',
                days: 'ngày',
                hours: 'giờ',
                minutes: 'phút',
                seconds: 'giây'
            },

            enableUtc: false,
            plural: true,
            inline: false,
            refresh: 1000,
            inlineClass: 'simply-countdown-inline',
            sectionClass: 'simply-section',
            amountClass: 'simply-amount',
            wordClass: 'simply-word',
            zeroPad: false,
            onEnd: function () {}
        }, args);

        var cd = document.querySelectorAll(elt);
        var targetDate = new Date(
            parameters.year,
            parameters.month - 1,
            parameters.day,
            parameters.hours,
            parameters.minutes,
            parameters.seconds
        );

        Array.prototype.forEach.call(cd, function (countdown) {

            var full = createElements(parameters, countdown);
            var interval;

            function refresh() {
                var now = new Date();
                var secondsLeft = (targetDate.getTime() - now.getTime()) / 1000;

                var days, hours, minutes, seconds;

                if (secondsLeft <= 0) {
                    days = hours = minutes = seconds = 0;
                    clearInterval(interval);
                    parameters.onEnd();
                } else {
                    days = Math.floor(secondsLeft / 86400);
                    secondsLeft %= 86400;

                    hours = Math.floor(secondsLeft / 3600);
                    secondsLeft %= 3600;

                    minutes = Math.floor(secondsLeft / 60);
                    seconds = Math.floor(secondsLeft % 60);
                }

                full.days.amount.textContent = days;
                full.hours.amount.textContent = hours;
                full.minutes.amount.textContent = minutes;
                full.seconds.amount.textContent = seconds;

                full.days.word.textContent = parameters.words.days;
                full.hours.word.textContent = parameters.words.hours;
                full.minutes.word.textContent = parameters.words.minutes;
                full.seconds.word.textContent = parameters.words.seconds;
            }

            refresh();
            interval = setInterval(refresh, parameters.refresh);
        });
    };

    exports.simplyCountdown = simplyCountdown;

}(window));


if (window.jQuery) {
    (function ($, simplyCountdown) {
        $.fn.simplyCountdown = function (options) {
            simplyCountdown(this.selector, options);
        };
    }(jQuery, simplyCountdown));
}