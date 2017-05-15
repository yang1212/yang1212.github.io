$(document).ready(function() {
    function a() {
        var a = $(window).width(),
            d = (768 - a) / 768 + 1;
        fmhPara = 641 > $(".feature-mi").height() || 641 > $(".feature-ai").height() || 641 > $(".feature-bi").height() ? 0 : 1;
        768 > a ? ($(".mi-headline-bg").css("height", $(".feature-mi").height() + 28 * d + "px"), $(".ai-headline-bg").css("height", $(".feature-ai").height() + 28 * d + "px"), $(".bi-headline-bg").css("height", $(".feature-bi").height() + 28 * d + "px"), $(".ee-headline-bg").css("height", $(".feature-ee").height() + parseInt($(".feature-ee").css("padding-top")) + 20 * d + "px")) : ($(".mi-headline-bg").removeAttr("style"), $(".ai-headline-bg").removeAttr("style"), $(".bi-headline-bg").removeAttr("style"), $(".ee-headline-bg").removeAttr("style"))
    }
    setTimeout(function() {
        a()
    }, 100);
    $(window).resize(function() {
        a()
    })
});
(function(a, c) {
    "function" == typeof define && "object" == typeof define.amd ? define([], function() {
        return c(a)
    }) : a.SineWaves = c(a)
})(this, function() {
    function a(b) {
        if (this.options = e.defaults(this.options, b), this.el = this.options.el, delete this.options.el, !this.el) throw "No Canvas Selected";
        if (this.ctx = this.el.getContext("2d"), this.waves = this.options.waves, delete this.options.waves, !this.waves || !this.waves.length) throw "No waves specified";
        this.dpr = window.devicePixelRatio || 1;
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
        this.setupUserFunctions();
        this.easeFn = e.getFn(m, this.options.ease, "linear");
        this.rotation = e.degreesToRadians(this.options.rotate);
        e.isType(this.options.running, "boolean") && (this.running = this.options.running);
        this.setupWaveFns();
        this.loop()
    }
    Function.prototype.bind || (Function.prototype.bind = function(b) {
        if ("function" != typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var l = Array.prototype.slice.call(arguments, 1),
            a = this,
            c = function() {},
            e = function() {
                return a.apply(this instanceof c && b ? this : b, l.concat(Array.prototype.slice.call(arguments)))
            };
        return c.prototype = this.prototype, e.prototype = new c, e
    });
    for (var c = ["ms", "moz", "webkit", "o"], d = 0; d < c.length && !window.requestAnimationFrame; ++d) window.requestAnimationFrame = window[c[d] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[c[d] + "CancelAnimationFrame"] || window[c[d] + "CancelRequestAnimationFrame"];
    if (!window.requestAnimationFrame) {
        var f = 0;
        window.requestAnimationFrame = function(b) {
            var l = (new Date).getTime(),
                a = Math.max(0, 16 - (l - f)),
                c = window.setTimeout(function() {
                    b(l + a)
                }, a);
            return f = l + a, c
        }
    }
    window.cancelAnimationFrame || (window.cancelAnimationFrame = function(b) {
        clearTimeout(b)
    });
    var h = Math.PI / 180,
        g = 2 * Math.PI,
        p = Math.PI / 2,
        e = {},
        n = e.isType = function(b, a) {
            return {}.toString.call(b).toLowerCase() === "[object " + a.toLowerCase() + "]"
        },
        q = e.isFunction = function(b) {
            return n(b, "function")
        },
        r = e.isString = function(b) {
            return n(b, "string")
        },
        t = (e.isNumber = function(b) {
            return n(b, "number")
        }, e.shallowClone = function(b) {
            var a = {},
                c;
            for (c in b) b.hasOwnProperty(c) && (a[c] = b[c]);
            return a
        }),
        m = (e.defaults = function(b, a) {
            n(a, "object") || (a = {});
            b = t(b);
            for (var l in a) a.hasOwnProperty(l) && (b[l] = a[l]);
            return b
        }, e.degreesToRadians = function(b) {
            if (!n(b, "number")) throw new TypeError("Degrees is not a number");
            return b * h
        }, e.getFn = function(b, a, c) {
            return q(a) ? a : r(a) && q(b[a.toLowerCase()]) ? b[a.toLowerCase()] : b[c]
        }, {});
    m.linear = function(b, a) {
        return a
    };
    m.sinein = function(b, a) {
        return a * (Math.sin(b * Math.PI - p) + 1) * .5
    };
    m.sineout = function(b, a) {
        return a * (Math.sin(b * Math.PI + p) + 1) * .5
    };
    m.sineinout = function(b, a) {
        return a * (Math.sin(b * g - p) + 1) * .5
    };
    var k = {
        sine: function(b) {
            return Math.sin(b)
        }
    };
    k.sin = k.sine;
    k.sign = function(b) {
        return b = +b, 0 === b || isNaN(b) ? b : 0 < b ? 1 : -1
    };
    k.square = function(b) {
        return k.sign(Math.sin(b * g))
    };
    k.sawtooth = function(b) {
        return 2 * (b - Math.floor(b + .5))
    };
    k.triangle = function(b) {
        return Math.abs(k.sawtooth(b))
    };
    a.prototype.options = {
        speed: 10,
        rotate: 0,
        ease: "Linear",
        wavesWidth: "95%"
    };
    a.prototype.setupWaveFns = function() {
        for (var b = -1, a = this.waves.length; ++b < a;) this.waves[b].waveFn = e.getFn(k, this.waves[b].type, "sine")
    };
    a.prototype.setupUserFunctions = function() {
        e.isFunction(this.options.resizeEvent) && (this.options.resizeEvent.call(this), window.addEventListener("resize", this.options.resizeEvent.bind(this)));
        e.isFunction(this.options.initialize) && this.options.initialize.call(this)
    };
    var u = {
        timeModifier: 1,
        amplitude: 50,
        wavelength: 50,
        segmentLength: 10,
        lineWidth: 1,
        strokeStyle: "rgba(255, 255, 255, 0.2)",
        type: "Sine"
    };
    return a.prototype.getDimension = function(b) {
        return e.isNumber(this.options[b]) ? this.options[b] : e.isFunction(this.options[b]) ? this.options[b].call(this, this.el) : "width" === b ? this.el.clientWidth : "height" === b ? this.el.clientHeight : void 0
    }, a.prototype.updateDimensions = function() {
        var b = this.getDimension("width"),
            a = this.getDimension("height");
        this.width = this.el.width = b * this.dpr;
        this.height = this.el.height = a * this.dpr;
        this.el.style.width = b + "px";
        this.el.style.height = a + "px";
        b = this.options.wavesWidth;
        a = this.width;
        this.waveWidth = e.isType(b, "number") ? b : (b = b.toString(), -1 < b.indexOf("%") ? (b = parseFloat(b), 1 < b && (b /= 100), a * b) : -1 < b.indexOf("px") ? parseInt(b, 10) : void 0);
        this.waveLeft = (this.width - this.waveWidth) / 2;
        this.yAxis = this.height / 2
    }, a.prototype.clear = function() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }, a.prototype.time = 0, a.prototype.update = function(b) {
        this.time -= .007;
        "undefined" == typeof b && (b = this.time);
        var a = -1,
            c = this.waves.length;
        this.clear();
        this.ctx.save();
        for (0 < this.rotation && (this.ctx.translate(this.width / 2, this.height / 2), this.ctx.rotate(this.rotation), this.ctx.translate(-this.width / 2, -this.height / 2)); ++a < c;) this.drawWave(b * (this.waves[a].timeModifier || 1), this.waves[a]);
        this.ctx.restore()
    }, a.prototype.getPoint = function(b, a, c) {
        b = b * this.options.speed + (-this.yAxis + a) / c.wavelength;
        var e = c.waveFn.call(this, b, k);
        c = this.easeFn.call(this, a / this.waveWidth, c.amplitude);
        return b = a + this.waveLeft, e = c * e + this.yAxis, {
            x: b,
            y: e
        }
    }, a.prototype.drawWave = function(b, a) {
        a = e.defaults(u, a);
        this.ctx.lineWidth = a.lineWidth * this.dpr;
        this.ctx.strokeStyle = a.strokeStyle;
        this.ctx.lineCap = "butt";
        this.ctx.lineJoin = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.yAxis);
        this.ctx.lineTo(this.waveLeft, this.yAxis);
        var c, d;
        for (c = 0; c < this.waveWidth; c += a.segmentLength) d = this.getPoint(b, c, a), this.ctx.lineTo(d.x, d.y);
        this.ctx.lineTo(this.width, this.yAxis);
        this.ctx.stroke()
    }, a.prototype.running = !0, a.prototype.loop = function() {
        !0 === this.running && this.update();
        window.requestAnimationFrame(this.loop.bind(this))
    }, a.prototype.Waves = k, a.prototype.Ease = m, a
});
$(function() {
    var a = new SineWaves({
            el: document.getElementById("waves"),
            speed: 8,
            width: function() {
                return 768 > $(document).width() ? 3 * $("#waves").parent().width() : 1.4 * $("#waves").parent().width()
            },
            height: function() {
                return $("#waves").parent().height()
            },
            wavesWidth: "100%",
            ease: "SineInOut",
            waves: [{
                timeModifier: .5,
                lineWidth: 2,
                amplitude: 150,
                wavelength: 200,
                segmentLength: 1
            }, {
                timeModifier: .5,
                lineWidth: 2,
                amplitude: 100,
                wavelength: 150,
                segmentLength: 1
            }, {
                timeModifier: .5,
                lineWidth: 2,
                amplitude: 50,
                wavelength: 80,
                segmentLength: 1
            }],
            initialize: function() {},
            resizeEvent: function() {
                var a = this.ctx.createLinearGradient(0, 0, this.width, 0);
                a.addColorStop(0, "rgba(255, 255, 255, 0)");
                a.addColorStop(.5, "rgba(255, 255, 255, 0.2)");
                a.addColorStop(1, "rgba(255, 255, 255, 0)");
                for (var c = -1, d = this.waves.length; ++c < d;) this.waves[c].strokeStyle = a
            }
        }),
        c = $("#waves"),
        d = $(document).scrollTop(),
        f = $(document).scrollTop() + $(window).height(),
        h = c.offset().top + c.height(),
        g = c.offset().top;
    (d > h || g > f) && (a.running = !1, a.update());
    $(window).bind("scroll", function() {
        d = $(document).scrollTop();
        f = $(document).scrollTop() + $(window).height();
        h = c.offset().top + c.height();
        g = c.offset().top;
        d > h || g > f ? (a.running = !1, a.update()) : (a.running = !0, a.update())
    })
});
$(function() {
    var a = new SineWaves({
            el: document.getElementById("waves21"),
            speed: 8,
            width: function() {
                return 768 > $(document).width() ? 3 * $("#waves").parent().width() : 1.4 * $("#waves").parent().width()
            },
            height: function() {
                return $("#waves").parent().height()
            },
            wavesWidth: "100%",
            ease: "SineInOut",
            waves: [{
                timeModifier: .5,
                lineWidth: 2,
                amplitude: 160,
                wavelength: 150,
                segmentLength: 1
            }, {
                timeModifier: .6,
                lineWidth: 2,
                amplitude: 100,
                wavelength: 100,
                segmentLength: 1
            }],
            initialize: function() {},
            resizeEvent: function() {
                var a = this.ctx.createLinearGradient(0, 0, this.width, 0);
                a.addColorStop(0, "rgba(255, 255, 5, 0)");
                a.addColorStop(.9, "rgba(255, 255, 5, 0.9)");
                a.addColorStop(1, "rgba(255, 255, 255, 0)");
                for (var c = -1, d = this.waves.length; ++c < d;) this.waves[c].strokeStyle = a
            }
        }),
        c = $("#waves21"),
        d = $(document).scrollTop(),
        f = $(document).scrollTop() + $(window).height(),
        h = c.offset().top + c.height(),
        g = c.offset().top;
    (d > h || g > f) && (a.running = !1, a.update());
    $(window).bind("scroll", function() {
        d = $(document).scrollTop();
        f = $(document).scrollTop() + $(window).height();
        h = c.offset().top + c.height();
        g = c.offset().top;
        d > h || g > f ? (a.running = !1, a.update()) : (a.running = !0, a.update())
    })
});
$(function() {
    var a = new SineWaves({
            el: document.getElementById("waves2"),
            speed: 8,
            width: function() {
                return 768 > $(document).width() ? 3 * $("#waves2").parent().width() : 1.4 * $("#waves2").parent().width()
            },
            height: function() {
                return $("#waves2").parent().height()
            },
            wavesWidth: "100%",
            ease: "SineInOut",
            waves: [{
                timeModifier: .5,
                lineWidth: 2,
                amplitude: 100,
                wavelength: 150,
                segmentLength: 1
            }, {
                timeModifier: .5,
                lineWidth: 2,
                amplitude: 50,
                wavelength: 80,
                segmentLength: 1
            }],
            initialize: function() {},
            resizeEvent: function() {
                var a = this.ctx.createLinearGradient(0, 0, this.width, 0);
                a.addColorStop(0, "rgba(255, 255, 255, 0)");
                a.addColorStop(.5, "rgba(255, 255, 255, 0.2)");
                a.addColorStop(1, "rgba(255, 255, 255, 0)");
                for (var c = -1, d = this.waves.length; ++c < d;) this.waves[c].strokeStyle = a
            }
        }),
        c = $("#waves2"),
        d = $(document).scrollTop(),
        f = $(document).scrollTop() + $(window).height(),
        h = c.offset().top + c.height(),
        g = c.offset().top;
    (d > h || g > f) && (a.running = !1, a.update());
    $(window).bind("scroll", function() {
        d = $(document).scrollTop();
        f = $(document).scrollTop() + $(window).height();
        h = c.offset().top + c.height();
        g = c.offset().top;
        d > h || g > f ? (a.running = !1, a.update()) : (a.running = !0, a.update())
    })
});