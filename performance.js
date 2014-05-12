(function (root) {

    'use strict';

    function Performance(typeMarker, moreParams) {
        window.performance = window.performance || window.msPerformance || window.webkitPerformance || {};

        this.navigation = performance.navigation || false;
        this.timing = performance.timing || {};
        this.delta = {};
        this.markerParams = '?';
        this.listPerf = ['domLoading', 'domInteractive', 'domContentLoadedEventStart', 'domContentLoadedEventEnd', 'domComplete', 'redirectStart', 'redirectEnd', 'fetchStart', 'domainLookupStart', 'domainLookupEnd', 'connectStart', 'connectEnd', 'requestStart', 'responseStart', 'responseEnd', 'loadEventStart', 'loadEventEnd', 'unloadEventStart', 'unloadEventEnd'];

        this.typeMarker = (typeMarker === 'console') ? 'console' : 'marker';

        this.moreParams = '';
        if (typeof(moreParams) === 'object') {
            for (var prop in moreParams) {
                if (moreParams.hasOwnProperty(prop)) {
                    this.moreParams += '&' + prop + '=' + encodeURIComponent(moreParams[prop])
                }
            }
        }

        return this;
    }

    Performance.prototype.getType = function () {
        var NAV_TYPE = ['navigate', 'reload', 'history'];
        this.typeNavigation = NAV_TYPE[this.navigation.type];

        return this;
    };

    Performance.prototype.getDelta = function (str, begin, end) {
        if (!begin || !end) {
            this.delta[str] = 0;
        }
        else {
            this.delta[str] = end - begin;
        }

        return this;
    };

    Performance.prototype.printLog = function (logStr) {
        if (this.typeMarker === 'console' && typeof(console) === 'object') {
            console.log(logStr);
        }
        else if (this.typeMarker === 'marker') {
            this.markerParams += logStr + '&';
        }

        return this;
    };

    Performance.prototype.run = function () {
        if (!this.navigation) {
            // no navigation === no JS API
            return;
        }

        this.getType();
        this.printLog('navigation=' + this.typeNavigation);

        var listPerfLength = this.listPerf.length;

        for (var i = 0; i < listPerfLength; i++) {
            var arrayKey = this.listPerf[i];
            var timingCompare = this.timing[arrayKey] || 0;
            this.getDelta(arrayKey, this.timing['navigationStart'], timingCompare);
            this.printLog(arrayKey + '=' + this.delta[arrayKey]);
        }

        if (this.typeMarker === 'marker') {
            var marker = document.createElement('img');
            marker.src = 'marker.html' + this.markerParams + this.moreParams;
            document.body.appendChild(marker);
        }

        return this;
    };

    if (typeof(define) === 'function' && define.amd) {
        // AMD support
        define(function () {
            return Performance;
        });
    } else if (typeof window === 'object') {
        // If no AMD and we are in the browser, attach to window
        window.Performance = Performance;
    }

}(this));
