/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const fs = __webpack_require__(7),
path = __webpack_require__(8),
Vue = __webpack_require__(3),
formats = {
    image: [['jpg','jpeg','png','gif','webp','ico','bmp','jps','mpo'],['tga','psd','iff','pbm','pcx','tif']],
    video: [['mp4','ogg','webm','mpeg','mkv'],['ts','flv','rm','mov','wmv','avi','rmvb']],
    audio: [['mp3','wav','mpeg'],['wma','mid']]
};
__webpack_require__(9)(Vue);
__webpack_require__(10)(Vue);

module.exports = {
    fs,
    Vue,
    rename(oldname, newname, callback){
        fs.access(newname, (err)=>{
            if(!err){
                callback('文件【'+newname+'】'+'已存在!');
            }else{
                fs.rename(oldname, newname, callback);
            }
        });
    },
    copyFile(oldname, newname, callback){
        fs.access(newname, (err)=>{
            if(!err){
                callback('文件【'+newname+'】'+'已存在!');
            }else{
                fs.copyFile(oldname, newname, callback);
            }
        });
    },
    canvasToFile(url, data, dialog){
        fs.writeFile(url, data.replace(/^data:image\/\w+;base64,/, ''), 'base64', (err)=>{
            if(err){
                dialog.show = true;
                dialog.title = '失败！';
                dialog.body = '<p>错误信息：'+err.message+'</p>';
            }else{
                dialog.show = true;
                dialog.title = '成功！';
                dialog.body = '<p>文件输出位置：'+url+'</p>';
            }
        });
    },
    path(p){
        if(typeof p === 'boolean'){
            return path;
        }
        return path.normalize(p);
    },
    type(format){
        let types = ['audio','image','video'],
            i = types.length;
        for(; i--;){
            if(formats[types[i]][0].includes(format) || formats[types[i]][1].includes(format)) return types[i];
        }
    },
    usableType(ext, name){
        return formats[name][0].includes(ext);
    },
    has(url){
        return fs.existsSync(url);
    },
    timemat(time){
        let t;
        if(typeof time === 'string' && /^\d{2}:\d{2}:\d{2}([\.\d]*)$/.test(time)){
            t = time.split(':');
            return (parseInt(t[0]*3600) + parseInt(t[1]*60) + parseFloat(t[2])) * 1000;
        }else if(typeof time === 'number'){
            if(isNaN(time)) return '00:00:00';
            t = time / 1000;
            let h = Math.floor( t/3600 ).toString(),
                m = Math.floor( (t%3600) / 60 ).toString(),
                s = Math.floor( t%60 ).toString();
            return h.padStart(2,0) + ':' + m.padStart(2,0) + ':' + s.padStart(2,0);
        }else{
            return "error time";
        }
    },
    datemat(time){
        let date;
        if(typeof time === 'number'){
            date = new Date(time);
        }else if(typeof time === 'string'){
            return new Date(time).getTime();
        }else{
            date = new Date();
        }
        return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate()
    },
    sizemat(b, flag){
        if(!flag){
            if(b < 1024) return b + ' B';
            let size = b/1024,
                fixed = arguments[1] || 2;
            if(size < 1024){
                return size.toFixed(fixed) + ' KB';
            }else{
                return (size/1024).toFixed(fixed) + ' MB';
            }
        }else{
            if(/^[\d\.]+\s*KB$/.test(b)){
                return parseFloat(b)*1024;
            }else if(/^[\d\.]+\s*MB$/.test(b)){
                return parseFloat(b)*1024*1024;
            }else{
                return parseFloat(b);
            }
        }
    },
    namemat(str,n){
        if(/\d+$/g.test(str)){
            return str.replace(/\d+$/g, function(a){
                return (parseInt('1'+a) + n).toString().slice(1);
            });
        }
        return str + (100 + n).toString().slice(1);
    },
    css(node, name){
        return parseFloat(window.getComputedStyle(node)[name]);
    },
    dialog: new Vue({
        el: '#dialog',
        data: {
            show: false,
            title: '',
            body: '',
            btns: []
        },
        methods: {
            setBtn(){
                this.btns.splice(0, this.btns.length);
                this.btns.push(...arguments);
            },
            dialogFn(e, code){
                this.show = false;
                this.title = '';
                this.body = '';
                this.btns.splice(0, this.btns.length);
                if(typeof this.callback === 'function'){
                    this.callback.call(e.currentTarget, code);
                }
            }
        }
    }),
    menu: new Vue({
        el: '#contextmenu',
        data: {
            show: false,
            x: 0,
            y: 0,
            items: []
        },
        methods: {
            setItem(){
                this.items.splice(0, this.items.length);
                this.items.push(...arguments);
            },
            contextmenuFn(e){
                let target = e.target;
                if(!target.hasAttribute('data-name')) return false;
                this.show = false;
                this.items.splice(0, this.items.length);
                if(typeof this.callback === 'function'){
                    this.callback.call(target, target.dataset.name);
                    this.callback = null;
                    this.x = this.y = 0;
                }
            }
        }
    })
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const cp = __webpack_require__(2),
	utils = __webpack_require__(0);

let appRoot = utils.path(true).dirname(process.execPath),
	ffmpegPath = utils.path(appRoot+'\\ffmpeg\\ffmpeg.exe'),
	checkPath = cp.spawnSync(ffmpegPath,['-version']);
if(checkPath.error){
	appRoot = process.cwd();
	ffmpegPath = utils.path(appRoot+'\\ffmpeg\\ffmpeg.exe');
	checkPath = cp.spawnSync(ffmpegPath, ['-version']);
	if(checkPath.error){
		utils.dialog.show = true;
		utils.dialog.title = '丢失';
		utils.dialog.body = '<p>ffmpeg文件丢失，请确保安装目录下的文件夹ffmpeg/有ffmpeg.exe和ffprobe.exe文件。</p>';
	}
}

module.exports = {
	appRoot: appRoot,
	ffmpegPath: ffmpegPath,
	ffprobePath: utils.path(appRoot+'\\ffmpeg\\ffprobe.exe'),
	audioThumb: utils.path('..\\css\\audio.jpg'),
	logPath: utils.path(appRoot + '\\cache\\log.txt'),
	cacheThumb: utils.path(appRoot + '\\cache\\thumb'),
	output: {
		folder: utils.path(process.env.USERPROFILE+'\\desktop'),
		width: 1280,
		height: 720,
		bitv: 2048,
		bita: 128,
		fps: 25,
		format: {
			image: 'jpg',
			video: 'mp4',
			audio: 'mp3'
		}
	}
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * Vue.js v2.5.1
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define(t):e.Vue=t()}(this,function(){"use strict";function e(e){return void 0===e||null===e}function t(e){return void 0!==e&&null!==e}function n(e){return!0===e}function r(e){return!1===e}function i(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e}function o(e){return null!==e&&"object"==typeof e}function a(e){return"[object Object]"===Ci.call(e)}function s(e){return"[object RegExp]"===Ci.call(e)}function c(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function u(e){return null==e?"":"object"==typeof e?JSON.stringify(e,null,2):String(e)}function l(e){var t=parseFloat(e);return isNaN(t)?e:t}function f(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}function d(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}function p(e,t){return ki.call(e,t)}function v(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}function h(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n}function m(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function y(e,t){for(var n in t)e[n]=t[n];return e}function g(e){for(var t={},n=0;n<e.length;n++)e[n]&&y(t,e[n]);return t}function _(e,t,n){}function b(e,t){if(e===t)return!0;var n=o(e),r=o(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var i=Array.isArray(e),a=Array.isArray(t);if(i&&a)return e.length===t.length&&e.every(function(e,n){return b(e,t[n])});if(i||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return b(e[n],t[n])})}catch(e){return!1}}function $(e,t){for(var n=0;n<e.length;n++)if(b(e[n],t))return n;return-1}function C(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}function w(e){var t=(e+"").charCodeAt(0);return 36===t||95===t}function x(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}function k(e){if(!Ri.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}function A(e,t,n){if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){O(e,r,"errorCaptured hook")}}O(e,t,n)}function O(e,t,n){if(Pi.errorHandler)try{return Pi.errorHandler.call(null,e,t,n)}catch(e){S(e,null,"config.errorHandler")}S(e,t,n)}function S(e,t,n){if(!Bi||"undefined"==typeof console)throw e;console.error(e)}function T(e){return"function"==typeof e&&/native code/.test(e.toString())}function E(e){ro.target&&io.push(ro.target),ro.target=e}function j(){ro.target=io.pop()}function L(e){return new oo(void 0,void 0,void 0,String(e))}function N(e,t){var n=new oo(e.tag,e.data,e.children,e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return n.ns=e.ns,n.isStatic=e.isStatic,n.key=e.key,n.isComment=e.isComment,n.isCloned=!0,t&&e.children&&(n.children=I(e.children)),n}function I(e,t){for(var n=e.length,r=new Array(n),i=0;i<n;i++)r[i]=N(e[i],t);return r}function M(e,t,n){e.__proto__=t}function P(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];x(e,o,t[o])}}function D(e,t){if(o(e)&&!(e instanceof oo)){var n;return p(e,"__ob__")&&e.__ob__ instanceof po?n=e.__ob__:fo.shouldConvert&&!Qi()&&(Array.isArray(e)||a(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new po(e)),t&&n&&n.vmCount++,n}}function R(e,t,n,r,i){var o=new ro,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set,u=!i&&D(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return ro.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&B(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!==t&&r!==r||(c?c.call(e,t):n=t,u=!i&&D(t),o.notify())}})}}function F(e,t,n){if(Array.isArray(e)&&c(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(p(e,t))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(R(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function H(e,t){if(Array.isArray(e)&&c(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||p(e,t)&&(delete e[t],n&&n.dep.notify())}}function B(e){for(var t=void 0,n=0,r=e.length;n<r;n++)(t=e[n])&&t.__ob__&&t.__ob__.dep.depend(),Array.isArray(t)&&B(t)}function U(e,t){if(!t)return e;for(var n,r,i,o=Object.keys(t),s=0;s<o.length;s++)r=e[n=o[s]],i=t[n],p(e,n)?a(r)&&a(i)&&U(r,i):F(e,n,i);return e}function V(e,t,n){return n?e||t?function(){var r="function"==typeof t?t.call(n):t,i="function"==typeof e?e.call(n):e;return r?U(r,i):i}:void 0:t?e?function(){return U("function"==typeof t?t.call(this):t,"function"==typeof e?e.call(this):e)}:t:e}function z(e,t){return t?e?e.concat(t):Array.isArray(t)?t:[t]:e}function K(e,t,n,r){var i=Object.create(e||null);return t?y(i,t):i}function J(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[Oi(i)]={type:null});else if(a(n))for(var s in n)i=n[s],o[Oi(s)]=a(i)?i:{type:i};e.props=o}}function q(e,t){var n=e.inject,r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(a(n))for(var o in n){var s=n[o];r[o]=a(s)?y({from:o},s):{from:s}}}function W(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}function G(e,t,n){function r(r){var i=vo[r]||mo;c[r]=i(e[r],t[r],n,r)}"function"==typeof t&&(t=t.options),J(t,n),q(t,n),W(t);var i=t.extends;if(i&&(e=G(e,i,n)),t.mixins)for(var o=0,a=t.mixins.length;o<a;o++)e=G(e,t.mixins[o],n);var s,c={};for(s in e)r(s);for(s in t)p(e,s)||r(s);return c}function Z(e,t,n,r){if("string"==typeof n){var i=e[t];if(p(i,n))return i[n];var o=Oi(n);if(p(i,o))return i[o];var a=Si(o);if(p(i,a))return i[a];var s=i[n]||i[o]||i[a];return s}}function Y(e,t,n,r){var i=t[e],o=!p(n,e),a=n[e];if(ee(Boolean,i.type)&&(o&&!p(i,"default")?a=!1:ee(String,i.type)||""!==a&&a!==Ei(e)||(a=!0)),void 0===a){a=Q(r,i,e);var s=fo.shouldConvert;fo.shouldConvert=!0,D(a),fo.shouldConvert=s}return a}function Q(e,t,n){if(p(t,"default")){var r=t.default;return e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n]?e._props[n]:"function"==typeof r&&"Function"!==X(t.type)?r.call(e):r}}function X(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function ee(e,t){if(!Array.isArray(t))return X(t)===X(e);for(var n=0,r=t.length;n<r;n++)if(X(t[n])===X(e))return!0;return!1}function te(e){function t(){var e=arguments,n=t.fns;if(!Array.isArray(n))return n.apply(null,arguments);for(var r=n.slice(),i=0;i<r.length;i++)r[i].apply(null,e)}return t.fns=e,t}function ne(t,n,r,i,o){var a,s,c,u;for(a in t)s=t[a],c=n[a],u=yo(a),e(s)||(e(c)?(e(s.fns)&&(s=t[a]=te(s)),r(u.name,s,u.once,u.capture,u.passive)):s!==c&&(c.fns=s,t[a]=c));for(a in n)e(t[a])&&i((u=yo(a)).name,n[a],u.capture)}function re(r,i,o){function a(){o.apply(this,arguments),d(s.fns,a)}var s,c=r[i];e(c)?s=te([a]):t(c.fns)&&n(c.merged)?(s=c).fns.push(a):s=te([c,a]),s.merged=!0,r[i]=s}function ie(n,r,i){var o=r.options.props;if(!e(o)){var a={},s=n.attrs,c=n.props;if(t(s)||t(c))for(var u in o){var l=Ei(u);oe(a,c,u,l,!0)||oe(a,s,u,l,!1)}return a}}function oe(e,n,r,i,o){if(t(n)){if(p(n,r))return e[r]=n[r],o||delete n[r],!0;if(p(n,i))return e[r]=n[i],o||delete n[i],!0}return!1}function ae(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}function se(e){return i(e)?[L(e)]:Array.isArray(e)?ue(e):void 0}function ce(e){return t(e)&&t(e.text)&&r(e.isComment)}function ue(r,o){var a,s,c,u,l=[];for(a=0;a<r.length;a++)e(s=r[a])||"boolean"==typeof s||(u=l[c=l.length-1],Array.isArray(s)?s.length>0&&(ce((s=ue(s,(o||"")+"_"+a))[0])&&ce(u)&&(l[c]=L(u.text+s[0].text),s.shift()),l.push.apply(l,s)):i(s)?ce(u)?l[c]=L(u.text+s):""!==s&&l.push(L(s)):ce(s)&&ce(u)?l[c]=L(u.text+s.text):(n(r._isVList)&&t(s.tag)&&e(s.key)&&t(o)&&(s.key="__vlist"+o+"_"+a+"__"),l.push(s)));return l}function le(e,t){return(e.__esModule||eo&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function fe(e,t,n,r,i){var o=so();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}function de(r,i,a){if(n(r.error)&&t(r.errorComp))return r.errorComp;if(t(r.resolved))return r.resolved;if(n(r.loading)&&t(r.loadingComp))return r.loadingComp;if(!t(r.contexts)){var s=r.contexts=[a],c=!0,u=function(){for(var e=0,t=s.length;e<t;e++)s[e].$forceUpdate()},l=C(function(e){r.resolved=le(e,i),c||u()}),f=C(function(e){t(r.errorComp)&&(r.error=!0,u())}),d=r(l,f);return o(d)&&("function"==typeof d.then?e(r.resolved)&&d.then(l,f):t(d.component)&&"function"==typeof d.component.then&&(d.component.then(l,f),t(d.error)&&(r.errorComp=le(d.error,i)),t(d.loading)&&(r.loadingComp=le(d.loading,i),0===d.delay?r.loading=!0:setTimeout(function(){e(r.resolved)&&e(r.error)&&(r.loading=!0,u())},d.delay||200)),t(d.timeout)&&setTimeout(function(){e(r.resolved)&&f(null)},d.timeout))),c=!1,r.loading?r.loadingComp:r.resolved}r.contexts.push(a)}function pe(e){return e.isComment&&e.asyncFactory}function ve(e){if(Array.isArray(e))for(var n=0;n<e.length;n++){var r=e[n];if(t(r)&&(t(r.componentOptions)||pe(r)))return r}}function he(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&ge(e,t)}function me(e,t,n){n?ho.$once(e,t):ho.$on(e,t)}function ye(e,t){ho.$off(e,t)}function ge(e,t,n){ho=e,ne(t,n||{},me,ye,e)}function _e(e,t){var n={};if(!e)return n;for(var r=[],i=0,o=e.length;i<o;i++){var a=e[i],s=a.data;if(s&&s.attrs&&s.attrs.slot&&delete s.attrs.slot,a.context!==t&&a.functionalContext!==t||!s||null==s.slot)r.push(a);else{var c=a.data.slot,u=n[c]||(n[c]=[]);"template"===a.tag?u.push.apply(u,a.children):u.push(a)}}return r.every(be)||(n.default=r),n}function be(e){return e.isComment||" "===e.text}function $e(e,t){t=t||{};for(var n=0;n<e.length;n++)Array.isArray(e[n])?$e(e[n],t):t[e[n].key]=e[n].fn;return t}function Ce(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}function we(e,t,n){e.$el=t,e.$options.render||(e.$options.render=so),Se(e,"beforeMount");var r;return r=function(){e._update(e._render(),n)},e._watcher=new Ao(e,r,_),n=!1,null==e.$vnode&&(e._isMounted=!0,Se(e,"mounted")),e}function xe(e,t,n,r,i){var o=!!(i||e.$options._renderChildren||r.data.scopedSlots||e.$scopedSlots!==Di);if(e.$options._parentVnode=r,e.$vnode=r,e._vnode&&(e._vnode.parent=r),e.$options._renderChildren=i,e.$attrs=r.data&&r.data.attrs||Di,e.$listeners=n||Di,t&&e.$options.props){fo.shouldConvert=!1;for(var a=e._props,s=e.$options._propKeys||[],c=0;c<s.length;c++){var u=s[c];a[u]=Y(u,e.$options.props,t,e)}fo.shouldConvert=!0,e.$options.propsData=t}if(n){var l=e.$options._parentListeners;e.$options._parentListeners=n,ge(e,n,l)}o&&(e.$slots=_e(i,r.context),e.$forceUpdate())}function ke(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function Ae(e,t){if(t){if(e._directInactive=!1,ke(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Ae(e.$children[n]);Se(e,"activated")}}function Oe(e,t){if(!(t&&(e._directInactive=!0,ke(e))||e._inactive)){e._inactive=!0;for(var n=0;n<e.$children.length;n++)Oe(e.$children[n]);Se(e,"deactivated")}}function Se(e,t){var n=e.$options[t];if(n)for(var r=0,i=n.length;r<i;r++)try{n[r].call(e)}catch(n){A(n,e,t+" hook")}e._hasHookEvent&&e.$emit("hook:"+t)}function Te(){xo=_o.length=bo.length=0,$o={},Co=wo=!1}function Ee(){wo=!0;var e,t;for(_o.sort(function(e,t){return e.id-t.id}),xo=0;xo<_o.length;xo++)t=(e=_o[xo]).id,$o[t]=null,e.run();var n=bo.slice(),r=_o.slice();Te(),Ne(n),je(r),Xi&&Pi.devtools&&Xi.emit("flush")}function je(e){for(var t=e.length;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&Se(r,"updated")}}function Le(e){e._inactive=!1,bo.push(e)}function Ne(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Ae(e[t],!0)}function Ie(e){var t=e.id;if(null==$o[t]){if($o[t]=!0,wo){for(var n=_o.length-1;n>xo&&_o[n].id>e.id;)n--;_o.splice(n+1,0,e)}else _o.push(e);Co||(Co=!0,to(Ee))}}function Me(e){Oo.clear(),Pe(e,Oo)}function Pe(e,t){var n,r,i=Array.isArray(e);if((i||o(e))&&Object.isExtensible(e)){if(e.__ob__){var a=e.__ob__.dep.id;if(t.has(a))return;t.add(a)}if(i)for(n=e.length;n--;)Pe(e[n],t);else for(n=(r=Object.keys(e)).length;n--;)Pe(e[r[n]],t)}}function De(e,t,n){So.get=function(){return this[t][n]},So.set=function(e){this[t][n]=e},Object.defineProperty(e,n,So)}function Re(e){e._watchers=[];var t=e.$options;t.props&&Fe(e,t.props),t.methods&&Ke(e,t.methods),t.data?He(e):D(e._data={},!0),t.computed&&Ue(e,t.computed),t.watch&&t.watch!==qi&&Je(e,t.watch)}function Fe(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[],o=!e.$parent;fo.shouldConvert=o;for(var a in t)!function(o){i.push(o);var a=Y(o,t,n,e);R(r,o,a),o in e||De(e,"_props",o)}(a);fo.shouldConvert=!0}function He(e){var t=e.$options.data;a(t=e._data="function"==typeof t?Be(t,e):t||{})||(t={});for(var n=Object.keys(t),r=e.$options.props,i=n.length;i--;){var o=n[i];r&&p(r,o)||w(o)||De(e,"_data",o)}D(t,!0)}function Be(e,t){try{return e.call(t,t)}catch(e){return A(e,t,"data()"),{}}}function Ue(e,t){var n=e._computedWatchers=Object.create(null),r=Qi();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new Ao(e,a||_,_,To)),i in e||Ve(e,i,o)}}function Ve(e,t,n){var r=!Qi();"function"==typeof n?(So.get=r?ze(t):n,So.set=_):(So.get=n.get?r&&!1!==n.cache?ze(t):n.get:_,So.set=n.set?n.set:_),Object.defineProperty(e,t,So)}function ze(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),ro.target&&t.depend(),t.value}}function Ke(e,t){for(var n in t)e[n]=null==t[n]?_:h(t[n],e)}function Je(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)qe(e,n,r[i]);else qe(e,n,r)}}function qe(e,t,n,r){return a(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}function We(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}function Ge(e){var t=Ze(e.$options.inject,e);t&&(fo.shouldConvert=!1,Object.keys(t).forEach(function(n){R(e,n,t[n])}),fo.shouldConvert=!0)}function Ze(e,t){if(e){for(var n=Object.create(null),r=eo?Reflect.ownKeys(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}):Object.keys(e),i=0;i<r.length;i++){for(var o=r[i],a=e[o].from,s=t;s;){if(s._provided&&a in s._provided){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}return n}}function Ye(e,n){var r,i,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),i=0,a=e.length;i<a;i++)r[i]=n(e[i],i);else if("number"==typeof e)for(r=new Array(e),i=0;i<e;i++)r[i]=n(i+1,i);else if(o(e))for(s=Object.keys(e),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=n(e[c],c,i);return t(r)&&(r._isVList=!0),r}function Qe(e,t,n,r){var i=this.$scopedSlots[e];if(i)return n=n||{},r&&(n=y(y({},r),n)),i(n)||t;var o=this.$slots[e];return o||t}function Xe(e){return Z(this.$options,"filters",e,!0)||Li}function et(e,t,n,r){var i=Pi.keyCodes[t]||n;return i?Array.isArray(i)?-1===i.indexOf(e):i!==e:r?Ei(r)!==t:void 0}function tt(e,t,n,r,i){if(n)if(o(n)){Array.isArray(n)&&(n=g(n));var a;for(var s in n)!function(o){if("class"===o||"style"===o||xi(o))a=e;else{var s=e.attrs&&e.attrs.type;a=r||Pi.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}o in a||(a[o]=n[o],i&&((e.on||(e.on={}))["update:"+o]=function(e){n[o]=e}))}(s)}else;return e}function nt(e,t){var n=this.$options.staticRenderFns,r=n.cached||(n.cached=[]),i=r[e];return i&&!t?Array.isArray(i)?I(i):N(i):(i=r[e]=n[e].call(this._renderProxy,null,this),it(i,"__static__"+e,!1),i)}function rt(e,t,n){return it(e,"__once__"+t+(n?"_"+n:""),!0),e}function it(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&ot(e[r],t+"_"+r,n);else ot(e,t,n)}function ot(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function at(e,t){if(t)if(a(t)){var n=e.on=e.on?y({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function st(e){e._o=rt,e._n=l,e._s=u,e._l=Ye,e._t=Qe,e._q=b,e._i=$,e._m=nt,e._f=Xe,e._k=et,e._b=tt,e._v=L,e._e=so,e._u=$e,e._g=at}function ct(e,t,r,i,o){var a=o.options;this.data=e,this.props=t,this.children=r,this.parent=i,this.listeners=e.on||Di,this.injections=Ze(a.inject,i),this.slots=function(){return _e(r,i)};var s=Object.create(i),c=n(a._compiled),u=!c;c&&(this.$options=a,this.$slots=this.slots(),this.$scopedSlots=e.scopedSlots||Di),a._scopeId?this._c=function(e,t,n,r){var o=mt(s,e,t,n,r,u);return o&&(o.functionalScopeId=a._scopeId,o.functionalContext=i),o}:this._c=function(e,t,n,r){return mt(s,e,t,n,r,u)}}function ut(e,n,r,i,o){var a=e.options,s={},c=a.props;if(t(c))for(var u in c)s[u]=Y(u,c,n||Di);else t(r.attrs)&&lt(s,r.attrs),t(r.props)&&lt(s,r.props);var l=new ct(r,s,o,i,e),f=a.render.call(null,l._c,l);return f instanceof oo&&(f.functionalContext=i,f.functionalOptions=a,r.slot&&((f.data||(f.data={})).slot=r.slot)),f}function lt(e,t){for(var n in t)e[Oi(n)]=t[n]}function ft(r,i,a,s,c){if(!e(r)){var u=a.$options._base;if(o(r)&&(r=u.extend(r)),"function"==typeof r){var l;if(e(r.cid)&&(l=r,void 0===(r=de(l,u,a))))return fe(l,i,a,s,c);i=i||{},$t(r),t(i.model)&&ht(r.options,i);var f=ie(i,r,c);if(n(r.options.functional))return ut(r,f,i,a,s);var d=i.on;if(i.on=i.nativeOn,n(r.options.abstract)){var p=i.slot;i={},p&&(i.slot=p)}pt(i);var v=r.options.name||c;return new oo("vue-component-"+r.cid+(v?"-"+v:""),i,void 0,void 0,void 0,a,{Ctor:r,propsData:f,listeners:d,tag:c,children:s},l)}}}function dt(e,n,r,i){var o=e.componentOptions,a={_isComponent:!0,parent:n,propsData:o.propsData,_componentTag:o.tag,_parentVnode:e,_parentListeners:o.listeners,_renderChildren:o.children,_parentElm:r||null,_refElm:i||null},s=e.data.inlineTemplate;return t(s)&&(a.render=s.render,a.staticRenderFns=s.staticRenderFns),new o.Ctor(a)}function pt(e){e.hook||(e.hook={});for(var t=0;t<jo.length;t++){var n=jo[t],r=e.hook[n],i=Eo[n];e.hook[n]=r?vt(i,r):i}}function vt(e,t){return function(n,r,i,o){e(n,r,i,o),t(n,r,i,o)}}function ht(e,n){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(n.props||(n.props={}))[r]=n.model.value;var o=n.on||(n.on={});t(o[i])?o[i]=[n.model.callback].concat(o[i]):o[i]=n.model.callback}function mt(e,t,r,o,a,s){return(Array.isArray(r)||i(r))&&(a=o,o=r,r=void 0),n(s)&&(a=No),yt(e,t,r,o,a)}function yt(e,n,r,i,o){if(t(r)&&t(r.__ob__))return so();if(t(r)&&t(r.is)&&(n=r.is),!n)return so();Array.isArray(i)&&"function"==typeof i[0]&&((r=r||{}).scopedSlots={default:i[0]},i.length=0),o===No?i=se(i):o===Lo&&(i=ae(i));var a,s;if("string"==typeof n){var c;s=e.$vnode&&e.$vnode.ns||Pi.getTagNamespace(n),a=Pi.isReservedTag(n)?new oo(Pi.parsePlatformTagName(n),r,i,void 0,void 0,e):t(c=Z(e.$options,"components",n))?ft(c,r,e,i,n):new oo(n,r,i,void 0,void 0,e)}else a=ft(n,r,e,i);return t(a)?(s&&gt(a,s),a):so()}function gt(r,i,o){if(r.ns=i,"foreignObject"===r.tag&&(i=void 0,o=!0),t(r.children))for(var a=0,s=r.children.length;a<s;a++){var c=r.children[a];t(c.tag)&&(e(c.ns)||n(o))&&gt(c,i,o)}}function _t(e){e._vnode=null;var t=e.$options,n=e.$vnode=t._parentVnode,r=n&&n.context;e.$slots=_e(t._renderChildren,r),e.$scopedSlots=Di,e._c=function(t,n,r,i){return mt(e,t,n,r,i,!1)},e.$createElement=function(t,n,r,i){return mt(e,t,n,r,i,!0)};var i=n&&n.data;R(e,"$attrs",i&&i.attrs||Di,null,!0),R(e,"$listeners",t._parentListeners||Di,null,!0)}function bt(e,t){var n=e.$options=Object.create(e.constructor.options);n.parent=t.parent,n.propsData=t.propsData,n._parentVnode=t._parentVnode,n._parentListeners=t._parentListeners,n._renderChildren=t._renderChildren,n._componentTag=t._componentTag,n._parentElm=t._parentElm,n._refElm=t._refElm,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}function $t(e){var t=e.options;if(e.super){var n=$t(e.super);if(n!==e.superOptions){e.superOptions=n;var r=Ct(e);r&&y(e.extendOptions,r),(t=e.options=G(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function Ct(e){var t,n=e.options,r=e.extendOptions,i=e.sealedOptions;for(var o in n)n[o]!==i[o]&&(t||(t={}),t[o]=wt(n[o],r[o],i[o]));return t}function wt(e,t,n){if(Array.isArray(e)){var r=[];n=Array.isArray(n)?n:[n],t=Array.isArray(t)?t:[t];for(var i=0;i<e.length;i++)(t.indexOf(e[i])>=0||n.indexOf(e[i])<0)&&r.push(e[i]);return r}return e}function xt(e){this._init(e)}function kt(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=m(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}function At(e){e.mixin=function(e){return this.options=G(this.options,e),this}}function Ot(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=t++,a.options=G(n.options,e),a.super=n,a.options.props&&St(a),a.options.computed&&Tt(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,Ii.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=y({},a.options),i[r]=a,a}}function St(e){var t=e.options.props;for(var n in t)De(e.prototype,"_props",n)}function Tt(e){var t=e.options.computed;for(var n in t)Ve(e.prototype,n,t[n])}function Et(e){Ii.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&a(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}function jt(e){return e&&(e.Ctor.options.name||e.tag)}function Lt(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:!!s(e)&&e.test(t)}function Nt(e,t){var n=e.cache,r=e.keys,i=e._vnode;for(var o in n){var a=n[o];if(a){var s=jt(a.componentOptions);s&&!t(s)&&It(n,o,r,i)}}}function It(e,t,n,r){var i=e[t];i&&i!==r&&i.componentInstance.$destroy(),e[t]=null,d(n,t)}function Mt(e){for(var n=e.data,r=e,i=e;t(i.componentInstance);)(i=i.componentInstance._vnode).data&&(n=Pt(i.data,n));for(;t(r=r.parent);)r.data&&(n=Pt(n,r.data));return Dt(n.staticClass,n.class)}function Pt(e,n){return{staticClass:Rt(e.staticClass,n.staticClass),class:t(e.class)?[e.class,n.class]:n.class}}function Dt(e,n){return t(e)||t(n)?Rt(e,Ft(n)):""}function Rt(e,t){return e?t?e+" "+t:e:t||""}function Ft(e){return Array.isArray(e)?Ht(e):o(e)?Bt(e):"string"==typeof e?e:""}function Ht(e){for(var n,r="",i=0,o=e.length;i<o;i++)t(n=Ft(e[i]))&&""!==n&&(r&&(r+=" "),r+=n);return r}function Bt(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}function Ut(e){return na(e)?"svg":"math"===e?"math":void 0}function Vt(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}function zt(e,t){var n=e.data.ref;if(n){var r=e.context,i=e.componentInstance||e.elm,o=r.$refs;t?Array.isArray(o[n])?d(o[n],i):o[n]===i&&(o[n]=void 0):e.data.refInFor?Array.isArray(o[n])?o[n].indexOf(i)<0&&o[n].push(i):o[n]=[i]:o[n]=i}}function Kt(r,i){return r.key===i.key&&(r.tag===i.tag&&r.isComment===i.isComment&&t(r.data)===t(i.data)&&Jt(r,i)||n(r.isAsyncPlaceholder)&&r.asyncFactory===i.asyncFactory&&e(i.asyncFactory.error))}function Jt(e,n){if("input"!==e.tag)return!0;var r,i=t(r=e.data)&&t(r=r.attrs)&&r.type,o=t(r=n.data)&&t(r=r.attrs)&&r.type;return i===o||oa(i)&&oa(o)}function qt(e,n,r){var i,o,a={};for(i=n;i<=r;++i)t(o=e[i].key)&&(a[o]=i);return a}function Wt(e,t){(e.data.directives||t.data.directives)&&Gt(e,t)}function Gt(e,t){var n,r,i,o=e===ca,a=t===ca,s=Zt(e.data.directives,e.context),c=Zt(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,Qt(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(Qt(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)Qt(u[n],"inserted",t,e)};o?re(t.data.hook||(t.data.hook={}),"insert",f):f()}if(l.length&&re(t.data.hook||(t.data.hook={}),"postpatch",function(){for(var n=0;n<l.length;n++)Qt(l[n],"componentUpdated",t,e)}),!o)for(n in s)c[n]||Qt(s[n],"unbind",e,e,a)}function Zt(e,t){var n=Object.create(null);if(!e)return n;var r,i;for(r=0;r<e.length;r++)(i=e[r]).modifiers||(i.modifiers=fa),n[Yt(i)]=i,i.def=Z(t.$options,"directives",i.name,!0);return n}function Yt(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function Qt(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){A(r,n.context,"directive "+e.name+" "+t+" hook")}}function Xt(n,r){var i=r.componentOptions;if(!(t(i)&&!1===i.Ctor.options.inheritAttrs||e(n.data.attrs)&&e(r.data.attrs))){var o,a,s=r.elm,c=n.data.attrs||{},u=r.data.attrs||{};t(u.__ob__)&&(u=r.data.attrs=y({},u));for(o in u)a=u[o],c[o]!==a&&en(s,o,a);(zi||Ki)&&u.value!==c.value&&en(s,"value",u.value);for(o in c)e(u[o])&&(Yo(o)?s.removeAttributeNS(Zo,Qo(o)):Wo(o)||s.removeAttribute(o))}}function en(e,t,n){Go(t)?Xo(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n)):Wo(t)?e.setAttribute(t,Xo(n)||"false"===n?"false":"true"):Yo(t)?Xo(n)?e.removeAttributeNS(Zo,Qo(t)):e.setAttributeNS(Zo,t,n):Xo(n)?e.removeAttribute(t):e.setAttribute(t,n)}function tn(n,r){var i=r.elm,o=r.data,a=n.data;if(!(e(o.staticClass)&&e(o.class)&&(e(a)||e(a.staticClass)&&e(a.class)))){var s=Mt(r),c=i._transitionClasses;t(c)&&(s=Rt(s,Ft(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}function nn(e){function t(){(a||(a=[])).push(e.slice(v,i).trim()),v=i+1}var n,r,i,o,a,s=!1,c=!1,u=!1,l=!1,f=0,d=0,p=0,v=0;for(i=0;i<e.length;i++)if(r=n,n=e.charCodeAt(i),s)39===n&&92!==r&&(s=!1);else if(c)34===n&&92!==r&&(c=!1);else if(u)96===n&&92!==r&&(u=!1);else if(l)47===n&&92!==r&&(l=!1);else if(124!==n||124===e.charCodeAt(i+1)||124===e.charCodeAt(i-1)||f||d||p){switch(n){case 34:c=!0;break;case 39:s=!0;break;case 96:u=!0;break;case 40:p++;break;case 41:p--;break;case 91:d++;break;case 93:d--;break;case 123:f++;break;case 125:f--}if(47===n){for(var h=i-1,m=void 0;h>=0&&" "===(m=e.charAt(h));h--);m&&ha.test(m)||(l=!0)}}else void 0===o?(v=i+1,o=e.slice(0,i).trim()):t();if(void 0===o?o=e.slice(0,i).trim():0!==v&&t(),a)for(i=0;i<a.length;i++)o=rn(o,a[i]);return o}function rn(e,t){var n=t.indexOf("(");return n<0?'_f("'+t+'")('+e+")":'_f("'+t.slice(0,n)+'")('+e+","+t.slice(n+1)}function on(e){console.error("[Vue compiler]: "+e)}function an(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function sn(e,t,n){(e.props||(e.props=[])).push({name:t,value:n})}function cn(e,t,n){(e.attrs||(e.attrs=[])).push({name:t,value:n})}function un(e,t,n,r,i,o){(e.directives||(e.directives=[])).push({name:t,rawName:n,value:r,arg:i,modifiers:o})}function ln(e,t,n,r,i,o){r&&r.capture&&(delete r.capture,t="!"+t),r&&r.once&&(delete r.once,t="~"+t),r&&r.passive&&(delete r.passive,t="&"+t);var a;r&&r.native?(delete r.native,a=e.nativeEvents||(e.nativeEvents={})):a=e.events||(e.events={});var s={value:n,modifiers:r},c=a[t];Array.isArray(c)?i?c.unshift(s):c.push(s):a[t]=c?i?[s,c]:[c,s]:s}function fn(e,t,n){var r=dn(e,":"+t)||dn(e,"v-bind:"+t);if(null!=r)return nn(r);if(!1!==n){var i=dn(e,t);if(null!=i)return JSON.stringify(i)}}function dn(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function pn(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=vn(t,o);e.model={value:"("+t+")",expression:'"'+t+'"',callback:"function ($$v) {"+a+"}"}}function vn(e,t){var n=hn(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function hn(e){if(Do=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<Do-1)return(Ho=e.lastIndexOf("."))>-1?{exp:e.slice(0,Ho),key:'"'+e.slice(Ho+1)+'"'}:{exp:e,key:null};for(Ro=e,Ho=Bo=Uo=0;!yn();)gn(Fo=mn())?bn(Fo):91===Fo&&_n(Fo);return{exp:e.slice(0,Bo),key:e.slice(Bo+1,Uo)}}function mn(){return Ro.charCodeAt(++Ho)}function yn(){return Ho>=Do}function gn(e){return 34===e||39===e}function _n(e){var t=1;for(Bo=Ho;!yn();)if(e=mn(),gn(e))bn(e);else if(91===e&&t++,93===e&&t--,0===t){Uo=Ho;break}}function bn(e){for(var t=e;!yn()&&(e=mn())!==t;);}function $n(e,t,n){var r=n&&n.number,i=fn(e,"value")||"null",o=fn(e,"true-value")||"true",a=fn(e,"false-value")||"false";sn(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),ln(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+t+"=$$a.concat([$$v]))}else{$$i>-1&&("+t+"=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}}else{"+vn(t,"$$c")+"}",null,!0)}function Cn(e,t,n){var r=n&&n.number,i=fn(e,"value")||"null";sn(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),ln(e,"change",vn(t,i),null,!0)}function wn(e,t,n){var r="var $$selectedVal = "+('Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"})")+";";ln(e,"change",r=r+" "+vn(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),null,!0)}function xn(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?ma:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=vn(t,l);c&&(f="if($event.target.composing)return;"+f),sn(e,"value","("+t+")"),ln(e,u,f,null,!0),(s||a)&&ln(e,"blur","$forceUpdate()")}function kn(e){if(t(e[ma])){var n=Vi?"change":"input";e[n]=[].concat(e[ma],e[n]||[]),delete e[ma]}t(e[ya])&&(e.change=[].concat(e[ya],e.change||[]),delete e[ya])}function An(e,t,n,r,i){if(n){var o=t,a=Vo;t=function(n){null!==(1===arguments.length?o(n):o.apply(null,arguments))&&On(e,t,r,a)}}Vo.addEventListener(e,t,Wi?{capture:r,passive:i}:r)}function On(e,t,n,r){(r||Vo).removeEventListener(e,t,n)}function Sn(t,n){if(!e(t.data.on)||!e(n.data.on)){var r=n.data.on||{},i=t.data.on||{};Vo=n.elm,kn(r),ne(r,i,An,On,n.context)}}function Tn(n,r){if(!e(n.data.domProps)||!e(r.data.domProps)){var i,o,a=r.elm,s=n.data.domProps||{},c=r.data.domProps||{};t(c.__ob__)&&(c=r.data.domProps=y({},c));for(i in s)e(c[i])&&(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i){a._value=o;var u=e(o)?"":String(o);En(a,u)&&(a.value=u)}else a[i]=o}}}function En(e,t){return!e.composing&&("OPTION"===e.tagName||jn(e,t)||Ln(e,t))}function jn(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}function Ln(e,n){var r=e.value,i=e._vModifiers;return t(i)&&i.number?l(r)!==l(n):t(i)&&i.trim?r.trim()!==n.trim():r!==n}function Nn(e){var t=In(e.style);return e.staticStyle?y(e.staticStyle,t):t}function In(e){return Array.isArray(e)?g(e):"string"==typeof e?ba(e):e}function Mn(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode).data&&(n=Nn(i.data))&&y(r,n);(n=Nn(e.data))&&y(r,n);for(var o=e;o=o.parent;)o.data&&(n=Nn(o.data))&&y(r,n);return r}function Pn(n,r){var i=r.data,o=n.data;if(!(e(i.staticStyle)&&e(i.style)&&e(o.staticStyle)&&e(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,d=In(r.data.style)||{};r.data.normalizedStyle=t(d.__ob__)?y({},d):d;var p=Mn(r,!0);for(s in f)e(p[s])&&wa(c,s,"");for(s in p)(a=p[s])!==f[s]&&wa(c,s,null==a?"":a)}}function Dn(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function Rn(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(/\s+/).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?e.setAttribute("class",n):e.removeAttribute("class")}}function Fn(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&y(t,Oa(e.name||"v")),y(t,e),t}return"string"==typeof e?Oa(e):void 0}}function Hn(e){Ma(function(){Ma(e)})}function Bn(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),Dn(e,t))}function Un(e,t){e._transitionClasses&&d(e._transitionClasses,t),Rn(e,t)}function Vn(e,t,n){var r=zn(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===Ta?La:Ia,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}function zn(e,t){var n,r=window.getComputedStyle(e),i=r[ja+"Delay"].split(", "),o=r[ja+"Duration"].split(", "),a=Kn(i,o),s=r[Na+"Delay"].split(", "),c=r[Na+"Duration"].split(", "),u=Kn(s,c),l=0,f=0;return t===Ta?a>0&&(n=Ta,l=a,f=o.length):t===Ea?u>0&&(n=Ea,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?Ta:Ea:null)?n===Ta?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===Ta&&Pa.test(r[ja+"Property"])}}function Kn(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Jn(t)+Jn(e[n])}))}function Jn(e){return 1e3*Number(e.slice(0,-1))}function qn(n,r){var i=n.elm;t(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=Fn(n.data.transition);if(!e(a)&&!t(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,f=a.enterToClass,d=a.enterActiveClass,p=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,x=a.appearCancelled,k=a.duration,A=go,O=go.$vnode;O&&O.parent;)A=(O=O.parent).context;var S=!A._isMounted||!n.isRootInsert;if(!S||$||""===$){var T=S&&p?p:u,E=S&&h?h:d,j=S&&v?v:f,L=S?b||m:m,N=S&&"function"==typeof $?$:y,I=S?w||g:g,M=S?x||_:_,P=l(o(k)?k.enter:k),D=!1!==s&&!zi,R=Zn(N),F=i._enterCb=C(function(){D&&(Un(i,j),Un(i,E)),F.cancelled?(D&&Un(i,T),M&&M(i)):I&&I(i),i._enterCb=null});n.data.show||re(n.data.hook||(n.data.hook={}),"insert",function(){var e=i.parentNode,t=e&&e._pending&&e._pending[n.key];t&&t.tag===n.tag&&t.elm._leaveCb&&t.elm._leaveCb(),N&&N(i,F)}),L&&L(i),D&&(Bn(i,T),Bn(i,E),Hn(function(){Bn(i,j),Un(i,T),F.cancelled||R||(Gn(P)?setTimeout(F,P):Vn(i,c,F))})),n.data.show&&(r&&r(),N&&N(i,F)),D||R||F()}}}function Wn(n,r){function i(){x.cancelled||(n.data.show||((a.parentNode._pending||(a.parentNode._pending={}))[n.key]=n),v&&v(a),b&&(Bn(a,f),Bn(a,p),Hn(function(){Bn(a,d),Un(a,f),x.cancelled||$||(Gn(w)?setTimeout(x,w):Vn(a,u,x))})),h&&h(a,x),b||$||x())}var a=n.elm;t(a._enterCb)&&(a._enterCb.cancelled=!0,a._enterCb());var s=Fn(n.data.transition);if(e(s))return r();if(!t(a._leaveCb)&&1===a.nodeType){var c=s.css,u=s.type,f=s.leaveClass,d=s.leaveToClass,p=s.leaveActiveClass,v=s.beforeLeave,h=s.leave,m=s.afterLeave,y=s.leaveCancelled,g=s.delayLeave,_=s.duration,b=!1!==c&&!zi,$=Zn(h),w=l(o(_)?_.leave:_),x=a._leaveCb=C(function(){a.parentNode&&a.parentNode._pending&&(a.parentNode._pending[n.key]=null),b&&(Un(a,d),Un(a,p)),x.cancelled?(b&&Un(a,f),y&&y(a)):(r(),m&&m(a)),a._leaveCb=null});g?g(i):i()}}function Gn(e){return"number"==typeof e&&!isNaN(e)}function Zn(n){if(e(n))return!1;var r=n.fns;return t(r)?Zn(Array.isArray(r)?r[0]:r):(n._length||n.length)>1}function Yn(e,t){!0!==t.data.show&&qn(t)}function Qn(e,t,n){Xn(e,t,n),(Vi||Ki)&&setTimeout(function(){Xn(e,t,n)},0)}function Xn(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=$(r,tr(a))>-1,a.selected!==o&&(a.selected=o);else if(b(tr(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function er(e,t){return t.every(function(t){return!b(t,e)})}function tr(e){return"_value"in e?e._value:e.value}function nr(e){e.target.composing=!0}function rr(e){e.target.composing&&(e.target.composing=!1,ir(e.target,"input"))}function ir(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function or(e){return!e.componentInstance||e.data&&e.data.transition?e:or(e.componentInstance._vnode)}function ar(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?ar(ve(t.children)):e}function sr(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[Oi(o)]=i[o];return t}function cr(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}function ur(e){for(;e=e.parent;)if(e.data.transition)return!0}function lr(e,t){return t.key===e.key&&t.tag===e.tag}function fr(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function dr(e){e.data.newPos=e.elm.getBoundingClientRect()}function pr(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}function vr(e,t){var n=t?qa(t):Ka;if(n.test(e)){for(var r,i,o=[],a=n.lastIndex=0;r=n.exec(e);){(i=r.index)>a&&o.push(JSON.stringify(e.slice(a,i)));var s=nn(r[1].trim());o.push("_s("+s+")"),a=i+r[0].length}return a<e.length&&o.push(JSON.stringify(e.slice(a))),o.join("+")}}function hr(e,t){var n=t?xs:ws;return e.replace(n,function(e){return Cs[e]})}function mr(e,t){function n(t){l+=t,e=e.substring(t)}function r(e,n,r){var i,s;if(null==n&&(n=l),null==r&&(r=l),e&&(s=e.toLowerCase()),e)for(i=a.length-1;i>=0&&a[i].lowerCasedTag!==s;i--);else i=0;if(i>=0){for(var c=a.length-1;c>=i;c--)t.end&&t.end(a[c].tag,n,r);a.length=i,o=i&&a[i-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,r):"p"===s&&(t.start&&t.start(e,[],!1,n,r),t.end&&t.end(e,n,r))}for(var i,o,a=[],s=t.expectHTML,c=t.isUnaryTag||ji,u=t.canBeLeftOpenTag||ji,l=0;e;){if(i=e,o&&bs(o)){var f=0,d=o.toLowerCase(),p=$s[d]||($s[d]=new RegExp("([\\s\\S]*?)(</"+d+"[^>]*>)","i")),v=e.replace(p,function(e,n,r){return f=r.length,bs(d)||"noscript"===d||(n=n.replace(/<!--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),As(d,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});l+=e.length-v.length,e=v,r(d,l-f,l)}else{var h=e.indexOf("<");if(0===h){if(ss.test(e)){var m=e.indexOf("--\x3e");if(m>=0){t.shouldKeepComment&&t.comment(e.substring(4,m)),n(m+3);continue}}if(cs.test(e)){var y=e.indexOf("]>");if(y>=0){n(y+2);continue}}var g=e.match(as);if(g){n(g[0].length);continue}var _=e.match(os);if(_){var b=l;n(_[0].length),r(_[1],b,l);continue}var $=function(){var t=e.match(rs);if(t){var r={tagName:t[1],attrs:[],start:l};n(t[0].length);for(var i,o;!(i=e.match(is))&&(o=e.match(es));)n(o[0].length),r.attrs.push(o);if(i)return r.unarySlash=i[1],n(i[0].length),r.end=l,r}}();if($){!function(e){var n=e.tagName,i=e.unarySlash;s&&("p"===o&&Xa(n)&&r(o),u(n)&&o===n&&r(n));for(var l=c(n)||!!i,f=e.attrs.length,d=new Array(f),p=0;p<f;p++){var v=e.attrs[p];us&&-1===v[0].indexOf('""')&&(""===v[3]&&delete v[3],""===v[4]&&delete v[4],""===v[5]&&delete v[5]);var h=v[3]||v[4]||v[5]||"";d[p]={name:v[1],value:hr(h,t.shouldDecodeNewlines)}}l||(a.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:d}),o=n),t.start&&t.start(n,d,l,e.start,e.end)}($),As(o,e)&&n(1);continue}}var C=void 0,w=void 0,x=void 0;if(h>=0){for(w=e.slice(h);!(os.test(w)||rs.test(w)||ss.test(w)||cs.test(w)||(x=w.indexOf("<",1))<0);)h+=x,w=e.slice(h);C=e.substring(0,h),n(h)}h<0&&(C=e,e=""),t.chars&&C&&t.chars(C)}if(e===i){t.chars&&t.chars(e);break}}r()}function yr(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:Mr(t),parent:n,children:[]}}function gr(e,t){function n(e){e.pre&&(s=!1),hs(e.tag)&&(c=!1)}ls=t.warn||on,hs=t.isPreTag||ji,ms=t.mustUseProp||ji,ys=t.getTagNamespace||ji,ds=an(t.modules,"transformNode"),ps=an(t.modules,"preTransformNode"),vs=an(t.modules,"postTransformNode"),fs=t.delimiters;var r,i,o=[],a=!1!==t.preserveWhitespace,s=!1,c=!1;return mr(e,{warn:ls,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldKeepComment:t.comments,start:function(e,a,u){var l=i&&i.ns||ys(e);Vi&&"svg"===l&&(a=Rr(a));var f=yr(e,a,i);l&&(f.ns=l),Dr(f)&&!Qi()&&(f.forbidden=!0);for(var d=0;d<ps.length;d++)f=ps[d](f,t)||f;if(s||(_r(f),f.pre&&(s=!0)),hs(f.tag)&&(c=!0),s?br(f):f.processed||(xr(f),kr(f),Tr(f),$r(f,t)),r?o.length||r.if&&(f.elseif||f.else)&&Sr(r,{exp:f.elseif,block:f}):r=f,i&&!f.forbidden)if(f.elseif||f.else)Ar(f,i);else if(f.slotScope){i.plain=!1;var p=f.slotTarget||'"default"';(i.scopedSlots||(i.scopedSlots={}))[p]=f}else i.children.push(f),f.parent=i;u?n(f):(i=f,o.push(f));for(var v=0;v<vs.length;v++)vs[v](f,t)},end:function(){var e=o[o.length-1],t=e.children[e.children.length-1];t&&3===t.type&&" "===t.text&&!c&&e.children.pop(),o.length-=1,i=o[o.length-1],n(e)},chars:function(e){if(i&&(!Vi||"textarea"!==i.tag||i.attrsMap.placeholder!==e)){var t=i.children;if(e=c||e.trim()?Pr(i)?e:Is(e):a&&t.length?" ":""){var n;!s&&" "!==e&&(n=vr(e,fs))?t.push({type:2,expression:n,text:e}):" "===e&&t.length&&" "===t[t.length-1].text||t.push({type:3,text:e})}}},comment:function(e){i.children.push({type:3,text:e,isComment:!0})}}),r}function _r(e){null!=dn(e,"v-pre")&&(e.pre=!0)}function br(e){var t=e.attrsList.length;if(t)for(var n=e.attrs=new Array(t),r=0;r<t;r++)n[r]={name:e.attrsList[r].name,value:JSON.stringify(e.attrsList[r].value)};else e.pre||(e.plain=!0)}function $r(e,t){Cr(e),e.plain=!e.key&&!e.attrsList.length,wr(e),Er(e),jr(e);for(var n=0;n<ds.length;n++)e=ds[n](e,t)||e;Lr(e)}function Cr(e){var t=fn(e,"key");t&&(e.key=t)}function wr(e){var t=fn(e,"ref");t&&(e.ref=t,e.refInFor=Nr(e))}function xr(e){var t;if(t=dn(e,"v-for")){var n=t.match(Ts);if(!n)return;e.for=n[2].trim();var r=n[1].trim(),i=r.match(Es);i?(e.alias=i[1].trim(),e.iterator1=i[2].trim(),i[3]&&(e.iterator2=i[3].trim())):e.alias=r}}function kr(e){var t=dn(e,"v-if");if(t)e.if=t,Sr(e,{exp:t,block:e});else{null!=dn(e,"v-else")&&(e.else=!0);var n=dn(e,"v-else-if");n&&(e.elseif=n)}}function Ar(e,t){var n=Or(t.children);n&&n.if&&Sr(n,{exp:e.elseif,block:e})}function Or(e){for(var t=e.length;t--;){if(1===e[t].type)return e[t];e.pop()}}function Sr(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function Tr(e){null!=dn(e,"v-once")&&(e.once=!0)}function Er(e){if("slot"===e.tag)e.slotName=fn(e,"name");else{var t;"template"===e.tag?(t=dn(e,"scope"),e.slotScope=t||dn(e,"slot-scope")):(t=dn(e,"slot-scope"))&&(e.slotScope=t);var n=fn(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,e.slotScope||cn(e,"slot",n))}}function jr(e){var t;(t=fn(e,"is"))&&(e.component=t),null!=dn(e,"inline-template")&&(e.inlineTemplate=!0)}function Lr(e){var t,n,r,i,o,a,s,c=e.attrsList;for(t=0,n=c.length;t<n;t++)if(r=i=c[t].name,o=c[t].value,Ss.test(r))if(e.hasBindings=!0,(a=Ir(r))&&(r=r.replace(Ns,"")),Ls.test(r))r=r.replace(Ls,""),o=nn(o),s=!1,a&&(a.prop&&(s=!0,"innerHtml"===(r=Oi(r))&&(r="innerHTML")),a.camel&&(r=Oi(r)),a.sync&&ln(e,"update:"+Oi(r),vn(o,"$event"))),s||!e.component&&ms(e.tag,e.attrsMap.type,r)?sn(e,r,o):cn(e,r,o);else if(Os.test(r))ln(e,r=r.replace(Os,""),o,a,!1,ls);else{var u=(r=r.replace(Ss,"")).match(js),l=u&&u[1];l&&(r=r.slice(0,-(l.length+1))),un(e,r,i,o,l,a)}else cn(e,r,JSON.stringify(o))}function Nr(e){for(var t=e;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}function Ir(e){var t=e.match(Ns);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function Mr(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}function Pr(e){return"script"===e.tag||"style"===e.tag}function Dr(e){return"style"===e.tag||"script"===e.tag&&(!e.attrsMap.type||"text/javascript"===e.attrsMap.type)}function Rr(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];Ms.test(r.name)||(r.name=r.name.replace(Ps,""),t.push(r))}return t}function Fr(e){return yr(e.tag,e.attrsList.slice(),e.parent)}function Hr(e,t,n){e.attrsMap[t]=n,e.attrsList.push({name:t,value:n})}function Br(e,t){e&&(gs=Fs(t.staticKeys||""),_s=t.isReservedTag||ji,Ur(e),Vr(e,!1))}function Ur(e){if(e.static=zr(e),1===e.type){if(!_s(e.tag)&&"slot"!==e.tag&&null==e.attrsMap["inline-template"])return;for(var t=0,n=e.children.length;t<n;t++){var r=e.children[t];Ur(r),r.static||(e.static=!1)}if(e.ifConditions)for(var i=1,o=e.ifConditions.length;i<o;i++){var a=e.ifConditions[i].block;Ur(a),a.static||(e.static=!1)}}}function Vr(e,t){if(1===e.type){if((e.static||e.once)&&(e.staticInFor=t),e.static&&e.children.length&&(1!==e.children.length||3!==e.children[0].type))return void(e.staticRoot=!0);if(e.staticRoot=!1,e.children)for(var n=0,r=e.children.length;n<r;n++)Vr(e.children[n],t||!!e.for);if(e.ifConditions)for(var i=1,o=e.ifConditions.length;i<o;i++)Vr(e.ifConditions[i].block,t)}}function zr(e){return 2!==e.type&&(3===e.type||!(!e.pre&&(e.hasBindings||e.if||e.for||wi(e.tag)||!_s(e.tag)||Kr(e)||!Object.keys(e).every(gs))))}function Kr(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}function Jr(e,t,n){var r=t?"nativeOn:{":"on:{";for(var i in e){var o=e[i];r+='"'+i+'":'+qr(i,o)+","}return r.slice(0,-1)+"}"}function qr(e,t){if(!t)return"function(){}";if(Array.isArray(t))return"["+t.map(function(t){return qr(e,t)}).join(",")+"]";var n=Bs.test(t.value),r=Hs.test(t.value);if(t.modifiers){var i="",o="",a=[];for(var s in t.modifiers)if(zs[s])o+=zs[s],Us[s]&&a.push(s);else if("exact"===s){var c=t.modifiers;o+=Vs(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=Wr(a)),o&&(i+=o),"function($event){"+i+(n?t.value+"($event)":r?"("+t.value+")($event)":t.value)+"}"}return n||r?t.value:"function($event){"+t.value+"}"}function Wr(e){return"if(!('button' in $event)&&"+e.map(Gr).join("&&")+")return null;"}function Gr(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=Us[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key)"}function Zr(e,t){var n=new Js(t);return{render:"with(this){return "+(e?Yr(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function Yr(e,t){if(e.staticRoot&&!e.staticProcessed)return Qr(e,t);if(e.once&&!e.onceProcessed)return Xr(e,t);if(e.for&&!e.forProcessed)return ni(e,t);if(e.if&&!e.ifProcessed)return ei(e,t);if("template"!==e.tag||e.slotTarget){if("slot"===e.tag)return hi(e,t);var n;if(e.component)n=mi(e.component,e,t);else{var r=e.plain?void 0:ri(e,t),i=e.inlineTemplate?null:ui(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return ui(e,t)||"void 0"}function Qr(e,t){return e.staticProcessed=!0,t.staticRenderFns.push("with(this){return "+Yr(e,t)+"}"),"_m("+(t.staticRenderFns.length-1)+(e.staticInFor?",true":"")+")"}function Xr(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return ei(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+Yr(e,t)+","+t.onceId+++","+n+")":Yr(e,t)}return Qr(e,t)}function ei(e,t,n,r){return e.ifProcessed=!0,ti(e.ifConditions.slice(),t,n,r)}function ti(e,t,n,r){function i(e){return n?n(e,t):e.once?Xr(e,t):Yr(e,t)}if(!e.length)return r||"_e()";var o=e.shift();return o.exp?"("+o.exp+")?"+i(o.block)+":"+ti(e,t,n,r):""+i(o.block)}function ni(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||Yr)(e,t)+"})"}function ri(e,t){var n="{",r=ii(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:{"+yi(e.attrs)+"},"),e.props&&(n+="domProps:{"+yi(e.props)+"},"),e.events&&(n+=Jr(e.events,!1,t.warn)+","),e.nativeEvents&&(n+=Jr(e.nativeEvents,!0,t.warn)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=ai(e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=oi(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function ii(e,t){var n=e.directives;if(n){var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?',arg:"'+o.arg+'"':"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}return c?s.slice(0,-1)+"]":void 0}}function oi(e,t){var n=e.children[0];if(1===n.type){var r=Zr(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}function ai(e,t){return"scopedSlots:_u(["+Object.keys(e).map(function(n){return si(n,e[n],t)}).join(",")+"])"}function si(e,t,n){return t.for&&!t.forProcessed?ci(e,t,n):"{key:"+e+",fn:"+("function("+String(t.slotScope)+"){return "+("template"===t.tag?t.if?t.if+"?"+(ui(t,n)||"undefined")+":undefined":ui(t,n)||"undefined":Yr(t,n))+"}")+"}"}function ci(e,t,n){var r=t.for,i=t.alias,o=t.iterator1?","+t.iterator1:"",a=t.iterator2?","+t.iterator2:"";return t.forProcessed=!0,"_l(("+r+"),function("+i+o+a+"){return "+si(e,t,n)+"})"}function ui(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag)return(r||Yr)(a,t);var s=n?li(o,t.maybeComponent):0,c=i||di;return"["+o.map(function(e){return c(e,t)}).join(",")+"]"+(s?","+s:"")}}function li(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(fi(i)||i.ifConditions&&i.ifConditions.some(function(e){return fi(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}function fi(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function di(e,t){return 1===e.type?Yr(e,t):3===e.type&&e.isComment?vi(e):pi(e)}function pi(e){return"_v("+(2===e.type?e.expression:gi(JSON.stringify(e.text)))+")"}function vi(e){return"_e("+JSON.stringify(e.text)+")"}function hi(e,t){var n=e.slotName||'"default"',r=ui(e,t),i="_t("+n+(r?","+r:""),o=e.attrs&&"{"+e.attrs.map(function(e){return Oi(e.name)+":"+e.value}).join(",")+"}",a=e.attrsMap["v-bind"];return!o&&!a||r||(i+=",null"),o&&(i+=","+o),a&&(i+=(o?"":",null")+","+a),i+")"}function mi(e,t,n){var r=t.inlineTemplate?null:ui(t,n,!0);return"_c("+e+","+ri(t,n)+(r?","+r:"")+")"}function yi(e){for(var t="",n=0;n<e.length;n++){var r=e[n];t+='"'+r.name+'":'+gi(r.value)+","}return t.slice(0,-1)}function gi(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}function _i(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),_}}function bi(e){var t=Object.create(null);return function(n,r,i){delete(r=y({},r)).warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=_i(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return _i(e,c)}),t[o]=s}}function $i(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}var Ci=Object.prototype.toString,wi=f("slot,component",!0),xi=f("key,ref,slot,slot-scope,is"),ki=Object.prototype.hasOwnProperty,Ai=/-(\w)/g,Oi=v(function(e){return e.replace(Ai,function(e,t){return t?t.toUpperCase():""})}),Si=v(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),Ti=/\B([A-Z])/g,Ei=v(function(e){return e.replace(Ti,"-$1").toLowerCase()}),ji=function(e,t,n){return!1},Li=function(e){return e},Ni="data-server-rendered",Ii=["component","directive","filter"],Mi=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured"],Pi={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:ji,isReservedAttr:ji,isUnknownElement:ji,getTagNamespace:_,parsePlatformTagName:Li,mustUseProp:ji,_lifecycleHooks:Mi},Di=Object.freeze({}),Ri=/[^\w.$]/,Fi=_,Hi="__proto__"in{},Bi="undefined"!=typeof window,Ui=Bi&&window.navigator.userAgent.toLowerCase(),Vi=Ui&&/msie|trident/.test(Ui),zi=Ui&&Ui.indexOf("msie 9.0")>0,Ki=Ui&&Ui.indexOf("edge/")>0,Ji=Ui&&Ui.indexOf("android")>0,qi=(Ui&&/iphone|ipad|ipod|ios/.test(Ui),Ui&&/chrome\/\d+/.test(Ui),{}.watch),Wi=!1;if(Bi)try{var Gi={};Object.defineProperty(Gi,"passive",{get:function(){Wi=!0}}),window.addEventListener("test-passive",null,Gi)}catch(e){}var Zi,Yi,Qi=function(){return void 0===Zi&&(Zi=!Bi&&"undefined"!=typeof global&&"server"===global.process.env.VUE_ENV),Zi},Xi=Bi&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__,eo="undefined"!=typeof Symbol&&T(Symbol)&&"undefined"!=typeof Reflect&&T(Reflect.ownKeys),to=function(){function e(){r=!1;var e=n.slice(0);n.length=0;for(var t=0;t<e.length;t++)e[t]()}var t,n=[],r=!1;if("undefined"!=typeof setImmediate&&T(setImmediate))t=function(){setImmediate(e)};else if("undefined"==typeof MessageChannel||!T(MessageChannel)&&"[object MessageChannelConstructor]"!==MessageChannel.toString())if("undefined"!=typeof Promise&&T(Promise)){var i=Promise.resolve();t=function(){i.then(e)}}else t=function(){setTimeout(e,0)};else{var o=new MessageChannel,a=o.port2;o.port1.onmessage=e,t=function(){a.postMessage(1)}}return function(e,i){var o;if(n.push(function(){if(e)try{e.call(i)}catch(e){A(e,i,"nextTick")}else o&&o(i)}),r||(r=!0,t()),!e&&"undefined"!=typeof Promise)return new Promise(function(e,t){o=e})}}();Yi="undefined"!=typeof Set&&T(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var no=0,ro=function(){this.id=no++,this.subs=[]};ro.prototype.addSub=function(e){this.subs.push(e)},ro.prototype.removeSub=function(e){d(this.subs,e)},ro.prototype.depend=function(){ro.target&&ro.target.addDep(this)},ro.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},ro.target=null;var io=[],oo=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.functionalContext=void 0,this.functionalOptions=void 0,this.functionalScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},ao={child:{configurable:!0}};ao.child.get=function(){return this.componentInstance},Object.defineProperties(oo.prototype,ao);var so=function(e){void 0===e&&(e="");var t=new oo;return t.text=e,t.isComment=!0,t},co=Array.prototype,uo=Object.create(co);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=co[e];x(uo,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var lo=Object.getOwnPropertyNames(uo),fo={shouldConvert:!0},po=function(e){this.value=e,this.dep=new ro,this.vmCount=0,x(e,"__ob__",this),Array.isArray(e)?((Hi?M:P)(e,uo,lo),this.observeArray(e)):this.walk(e)};po.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)R(e,t[n],e[t[n]])},po.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)D(e[t])};var vo=Pi.optionMergeStrategies;vo.data=function(e,t,n){return n?V(e,t,n):t&&"function"!=typeof t?e:V.call(this,e,t)},Mi.forEach(function(e){vo[e]=z}),Ii.forEach(function(e){vo[e+"s"]=K}),vo.watch=function(e,t,n,r){if(e===qi&&(e=void 0),t===qi&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};y(i,e);for(var o in t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},vo.props=vo.methods=vo.inject=vo.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return y(i,e),t&&y(i,t),i},vo.provide=V;var ho,mo=function(e,t){return void 0===t?e:t},yo=v(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return e=r?e.slice(1):e,{name:e,once:n,capture:r,passive:t}}),go=null,_o=[],bo=[],$o={},Co=!1,wo=!1,xo=0,ko=0,Ao=function(e,t,n,r){this.vm=e,e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++ko,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new Yi,this.newDepIds=new Yi,this.expression="","function"==typeof t?this.getter=t:(this.getter=k(t),this.getter||(this.getter=function(){})),this.value=this.lazy?void 0:this.get()};Ao.prototype.get=function(){E(this);var e,t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;A(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&Me(e),j(),this.cleanupDeps()}return e},Ao.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},Ao.prototype.cleanupDeps=function(){for(var e=this,t=this.deps.length;t--;){var n=e.deps[t];e.newDepIds.has(n.id)||n.removeSub(e)}var r=this.depIds;this.depIds=this.newDepIds,this.newDepIds=r,this.newDepIds.clear(),r=this.deps,this.deps=this.newDeps,this.newDeps=r,this.newDeps.length=0},Ao.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Ie(this)},Ao.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){A(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},Ao.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Ao.prototype.depend=function(){for(var e=this,t=this.deps.length;t--;)e.deps[t].depend()},Ao.prototype.teardown=function(){var e=this;if(this.active){this.vm._isBeingDestroyed||d(this.vm._watchers,this);for(var t=this.deps.length;t--;)e.deps[t].removeSub(e);this.active=!1}};var Oo=new Yi,So={enumerable:!0,configurable:!0,get:_,set:_},To={lazy:!0};st(ct.prototype);var Eo={init:function(e,t,n,r){if(!e.componentInstance||e.componentInstance._isDestroyed)(e.componentInstance=dt(e,go,n,r)).$mount(t?e.elm:void 0,t);else if(e.data.keepAlive){var i=e;Eo.prepatch(i,i)}},prepatch:function(e,t){var n=t.componentOptions;xe(t.componentInstance=e.componentInstance,n.propsData,n.listeners,t,n.children)},insert:function(e){var t=e.context,n=e.componentInstance;n._isMounted||(n._isMounted=!0,Se(n,"mounted")),e.data.keepAlive&&(t._isMounted?Le(n):Ae(n,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?Oe(t,!0):t.$destroy())}},jo=Object.keys(Eo),Lo=1,No=2,Io=0;!function(e){e.prototype._init=function(e){var t=this;t._uid=Io++,t._isVue=!0,e&&e._isComponent?bt(t,e):t.$options=G($t(t.constructor),e||{},t),t._renderProxy=t,t._self=t,Ce(t),he(t),_t(t),Se(t,"beforeCreate"),Ge(t),Re(t),We(t),Se(t,"created"),t.$options.el&&t.$mount(t.$options.el)}}(xt),function(e){var t={};t.get=function(){return this._data};var n={};n.get=function(){return this._props},Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=F,e.prototype.$delete=H,e.prototype.$watch=function(e,t,n){var r=this;if(a(t))return qe(r,e,t,n);(n=n||{}).user=!0;var i=new Ao(r,e,t,n);return n.immediate&&t.call(r,i.value),function(){i.teardown()}}}(xt),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this,i=this;if(Array.isArray(e))for(var o=0,a=e.length;o<a;o++)r.$on(e[o],n);else(i._events[e]||(i._events[e]=[])).push(n),t.test(e)&&(i._hasHookEvent=!0);return i},e.prototype.$once=function(e,t){function n(){r.$off(e,n),t.apply(r,arguments)}var r=this;return n.fn=t,r.$on(e,n),r},e.prototype.$off=function(e,t){var n=this,r=this;if(!arguments.length)return r._events=Object.create(null),r;if(Array.isArray(e)){for(var i=0,o=e.length;i<o;i++)n.$off(e[i],t);return r}var a=r._events[e];if(!a)return r;if(1===arguments.length)return r._events[e]=null,r;if(t)for(var s,c=a.length;c--;)if((s=a[c])===t||s.fn===t){a.splice(c,1);break}return r},e.prototype.$emit=function(e){var t=this,n=t._events[e];if(n){n=n.length>1?m(n):n;for(var r=m(arguments,1),i=0,o=n.length;i<o;i++)try{n[i].apply(t,r)}catch(n){A(n,t,'event handler for "'+e+'"')}}return t}}(xt),function(e){e.prototype._update=function(e,t){var n=this;n._isMounted&&Se(n,"beforeUpdate");var r=n.$el,i=n._vnode,o=go;go=n,n._vnode=e,i?n.$el=n.__patch__(i,e):(n.$el=n.__patch__(n.$el,e,t,!1,n.$options._parentElm,n.$options._refElm),n.$options._parentElm=n.$options._refElm=null),go=o,r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){var e=this;e._watcher&&e._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Se(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||d(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Se(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(xt),function(e){st(e.prototype),e.prototype.$nextTick=function(e){return to(e,this)},e.prototype._render=function(){var e=this,t=e.$options,n=t.render,r=t._parentVnode;if(e._isMounted)for(var i in e.$slots){var o=e.$slots[i];o._rendered&&(e.$slots[i]=I(o,!0))}e.$scopedSlots=r&&r.data.scopedSlots||Di,e.$vnode=r;var a;try{a=n.call(e._renderProxy,e.$createElement)}catch(t){A(t,e,"render"),a=e._vnode}return a instanceof oo||(a=so()),a.parent=r,a}}(xt);var Mo=[String,RegExp,Array],Po={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Mo,exclude:Mo,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){var e=this;for(var t in e.cache)It(e.cache,t,e.keys)},watch:{include:function(e){Nt(this,function(t){return Lt(e,t)})},exclude:function(e){Nt(this,function(t){return!Lt(e,t)})}},render:function(){var e=ve(this.$slots.default),t=e&&e.componentOptions;if(t){var n=jt(t);if(n&&(this.include&&!Lt(this.include,n)||this.exclude&&Lt(this.exclude,n)))return e;var r=this,i=r.cache,o=r.keys,a=null==e.key?t.Ctor.cid+(t.tag?"::"+t.tag:""):e.key;i[a]?(e.componentInstance=i[a].componentInstance,d(o,a),o.push(a)):(i[a]=e,o.push(a),this.max&&o.length>parseInt(this.max)&&It(i,o[0],o,this._vnode)),e.data.keepAlive=!0}return e}}};!function(e){var t={};t.get=function(){return Pi},Object.defineProperty(e,"config",t),e.util={warn:Fi,extend:y,mergeOptions:G,defineReactive:R},e.set=F,e.delete=H,e.nextTick=to,e.options=Object.create(null),Ii.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,y(e.options.components,Po),kt(e),At(e),Ot(e),Et(e)}(xt),Object.defineProperty(xt.prototype,"$isServer",{get:Qi}),Object.defineProperty(xt.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),xt.version="2.5.1";var Do,Ro,Fo,Ho,Bo,Uo,Vo,zo,Ko=f("style,class"),Jo=f("input,textarea,option,select,progress"),qo=function(e,t,n){return"value"===n&&Jo(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},Wo=f("contenteditable,draggable,spellcheck"),Go=f("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),Zo="http://www.w3.org/1999/xlink",Yo=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},Qo=function(e){return Yo(e)?e.slice(6,e.length):""},Xo=function(e){return null==e||!1===e},ea={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},ta=f("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),na=f("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),ra=function(e){return ta(e)||na(e)},ia=Object.create(null),oa=f("text,number,password,search,email,tel,url"),aa=Object.freeze({createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(ea[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setAttribute:function(e,t,n){e.setAttribute(t,n)}}),sa={create:function(e,t){zt(t)},update:function(e,t){e.data.ref!==t.data.ref&&(zt(e,!0),zt(t))},destroy:function(e){zt(e,!0)}},ca=new oo("",{},[]),ua=["create","activate","update","remove","destroy"],la={create:Wt,update:Wt,destroy:function(e){Wt(e,ca)}},fa=Object.create(null),da=[sa,la],pa={create:Xt,update:Xt},va={create:tn,update:tn},ha=/[\w).+\-_$\]]/,ma="__r",ya="__c",ga={create:Sn,update:Sn},_a={create:Tn,update:Tn},ba=v(function(e){var t={},n=/;(?![^(]*\))/g,r=/:(.+)/;return e.split(n).forEach(function(e){if(e){var n=e.split(r);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}),$a=/^--/,Ca=/\s*!important$/,wa=function(e,t,n){if($a.test(t))e.style.setProperty(t,n);else if(Ca.test(n))e.style.setProperty(t,n.replace(Ca,""),"important");else{var r=ka(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},xa=["Webkit","Moz","ms"],ka=v(function(e){if(zo=zo||document.createElement("div").style,"filter"!==(e=Oi(e))&&e in zo)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<xa.length;n++){var r=xa[n]+t;if(r in zo)return r}}),Aa={create:Pn,update:Pn},Oa=v(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),Sa=Bi&&!zi,Ta="transition",Ea="animation",ja="transition",La="transitionend",Na="animation",Ia="animationend";Sa&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(ja="WebkitTransition",La="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Na="WebkitAnimation",Ia="webkitAnimationEnd"));var Ma=Bi?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()},Pa=/\b(transform|all)(,|$)/,Da=function(r){function o(e){return new oo(j.tagName(e).toLowerCase(),{},[],void 0,e)}function a(e,t){function n(){0==--n.listeners&&s(e)}return n.listeners=t,n}function s(e){var n=j.parentNode(e);t(n)&&j.removeChild(n,e)}function c(e,r,i,o,a){if(e.isRootInsert=!a,!u(e,r,i,o)){var s=e.data,c=e.children,l=e.tag;t(l)?(e.elm=e.ns?j.createElementNS(e.ns,l):j.createElement(l,e),y(e),v(e,c,r),t(s)&&m(e,r),p(i,e.elm,o)):n(e.isComment)?(e.elm=j.createComment(e.text),p(i,e.elm,o)):(e.elm=j.createTextNode(e.text),p(i,e.elm,o))}}function u(e,r,i,o){var a=e.data;if(t(a)){var s=t(e.componentInstance)&&a.keepAlive;if(t(a=a.hook)&&t(a=a.init)&&a(e,!1,i,o),t(e.componentInstance))return l(e,r),n(s)&&d(e,r,i,o),!0}}function l(e,n){t(e.data.pendingInsert)&&(n.push.apply(n,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,h(e)?(m(e,n),y(e)):(zt(e),n.push(e))}function d(e,n,r,i){for(var o,a=e;a.componentInstance;)if(a=a.componentInstance._vnode,t(o=a.data)&&t(o=o.transition)){for(o=0;o<T.activate.length;++o)T.activate[o](ca,a);n.push(a);break}p(r,e.elm,i)}function p(e,n,r){t(e)&&(t(r)?r.parentNode===e&&j.insertBefore(e,n,r):j.appendChild(e,n))}function v(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)c(t[r],n,e.elm,null,!0);else i(e.text)&&j.appendChild(e.elm,j.createTextNode(e.text))}function h(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return t(e.tag)}function m(e,n){for(var r=0;r<T.create.length;++r)T.create[r](ca,e);t(O=e.data.hook)&&(t(O.create)&&O.create(ca,e),t(O.insert)&&n.push(e))}function y(e){var n;if(t(n=e.functionalScopeId))j.setAttribute(e.elm,n,"");else for(var r=e;r;)t(n=r.context)&&t(n=n.$options._scopeId)&&j.setAttribute(e.elm,n,""),r=r.parent;t(n=go)&&n!==e.context&&n!==e.functionalContext&&t(n=n.$options._scopeId)&&j.setAttribute(e.elm,n,"")}function g(e,t,n,r,i,o){for(;r<=i;++r)c(n[r],o,e,t)}function _(e){var n,r,i=e.data;if(t(i))for(t(n=i.hook)&&t(n=n.destroy)&&n(e),n=0;n<T.destroy.length;++n)T.destroy[n](e);if(t(n=e.children))for(r=0;r<e.children.length;++r)_(e.children[r])}function b(e,n,r,i){for(;r<=i;++r){var o=n[r];t(o)&&(t(o.tag)?($(o),_(o)):s(o.elm))}}function $(e,n){if(t(n)||t(e.data)){var r,i=T.remove.length+1;for(t(n)?n.listeners+=i:n=a(e.elm,i),t(r=e.componentInstance)&&t(r=r._vnode)&&t(r.data)&&$(r,n),r=0;r<T.remove.length;++r)T.remove[r](e,n);t(r=e.data.hook)&&t(r=r.remove)?r(e,n):n()}else s(e.elm)}function C(n,r,i,o,a){for(var s,u,l,f=0,d=0,p=r.length-1,v=r[0],h=r[p],m=i.length-1,y=i[0],_=i[m],$=!a;f<=p&&d<=m;)e(v)?v=r[++f]:e(h)?h=r[--p]:Kt(v,y)?(x(v,y,o),v=r[++f],y=i[++d]):Kt(h,_)?(x(h,_,o),h=r[--p],_=i[--m]):Kt(v,_)?(x(v,_,o),$&&j.insertBefore(n,v.elm,j.nextSibling(h.elm)),v=r[++f],_=i[--m]):Kt(h,y)?(x(h,y,o),$&&j.insertBefore(n,h.elm,v.elm),h=r[--p],y=i[++d]):(e(s)&&(s=qt(r,f,p)),e(u=t(y.key)?s[y.key]:w(y,r,f,p))?c(y,o,n,v.elm):Kt(l=r[u],y)?(x(l,y,o),r[u]=void 0,$&&j.insertBefore(n,l.elm,v.elm)):c(y,o,n,v.elm),y=i[++d]);f>p?g(n,e(i[m+1])?null:i[m+1].elm,i,d,m,o):d>m&&b(n,r,f,p)}function w(e,n,r,i){for(var o=r;o<i;o++){var a=n[o];if(t(a)&&Kt(e,a))return o}}function x(r,i,o,a){if(r!==i){var s=i.elm=r.elm;if(n(r.isAsyncPlaceholder))t(i.asyncFactory.resolved)?A(r.elm,i,o):i.isAsyncPlaceholder=!0;else if(n(i.isStatic)&&n(r.isStatic)&&i.key===r.key&&(n(i.isCloned)||n(i.isOnce)))i.componentInstance=r.componentInstance;else{var c,u=i.data;t(u)&&t(c=u.hook)&&t(c=c.prepatch)&&c(r,i);var l=r.children,f=i.children;if(t(u)&&h(i)){for(c=0;c<T.update.length;++c)T.update[c](r,i);t(c=u.hook)&&t(c=c.update)&&c(r,i)}e(i.text)?t(l)&&t(f)?l!==f&&C(s,l,f,o,a):t(f)?(t(r.text)&&j.setTextContent(s,""),g(s,null,f,0,f.length-1,o)):t(l)?b(s,l,0,l.length-1):t(r.text)&&j.setTextContent(s,""):r.text!==i.text&&j.setTextContent(s,i.text),t(u)&&t(c=u.hook)&&t(c=c.postpatch)&&c(r,i)}}}function k(e,r,i){if(n(i)&&t(e.parent))e.parent.data.pendingInsert=r;else for(var o=0;o<r.length;++o)r[o].data.hook.insert(r[o])}function A(e,r,i){if(n(r.isComment)&&t(r.asyncFactory))return r.elm=e,r.isAsyncPlaceholder=!0,!0;r.elm=e;var o=r.tag,a=r.data,s=r.children;if(t(a)&&(t(O=a.hook)&&t(O=O.init)&&O(r,!0),t(O=r.componentInstance)))return l(r,i),!0;if(t(o)){if(t(s))if(e.hasChildNodes())if(t(O=a)&&t(O=O.domProps)&&t(O=O.innerHTML)){if(O!==e.innerHTML)return!1}else{for(var c=!0,u=e.firstChild,f=0;f<s.length;f++){if(!u||!A(u,s[f],i)){c=!1;break}u=u.nextSibling}if(!c||u)return!1}else v(r,s,i);if(t(a))for(var d in a)if(!L(d)){m(r,i);break}}else e.data!==r.text&&(e.data=r.text);return!0}var O,S,T={},E=r.modules,j=r.nodeOps;for(O=0;O<ua.length;++O)for(T[ua[O]]=[],S=0;S<E.length;++S)t(E[S][ua[O]])&&T[ua[O]].push(E[S][ua[O]]);var L=f("attrs,style,class,staticClass,staticStyle,key");return function(r,i,a,s,u,l){if(!e(i)){var f=!1,d=[];if(e(r))f=!0,c(i,d,u,l);else{var p=t(r.nodeType);if(!p&&Kt(r,i))x(r,i,d,s);else{if(p){if(1===r.nodeType&&r.hasAttribute(Ni)&&(r.removeAttribute(Ni),a=!0),n(a)&&A(r,i,d))return k(i,d,!0),r;r=o(r)}var v=r.elm,m=j.parentNode(v);if(c(i,d,v._leaveCb?null:m,j.nextSibling(v)),t(i.parent))for(var y=i.parent,g=h(i);y;){for(var $=0;$<T.destroy.length;++$)T.destroy[$](y);if(y.elm=i.elm,g){for(var C=0;C<T.create.length;++C)T.create[C](ca,y);var w=y.data.hook.insert;if(w.merged)for(var O=1;O<w.fns.length;O++)w.fns[O]()}else zt(y);y=y.parent}t(m)?b(m,[r],0,0):t(r.tag)&&_(r)}}return k(i,d,f),i.elm}t(r)&&_(r)}}({nodeOps:aa,modules:[pa,va,ga,_a,Aa,Bi?{create:Yn,activate:Yn,remove:function(e,t){!0!==e.data.show?Wn(e,t):t()}}:{}].concat(da)});zi&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&ir(e,"input")});var Ra={model:{inserted:function(e,t,n){"select"===n.tag?(Qn(e,t,n.context),e._vOptions=[].map.call(e.options,tr)):("textarea"===n.tag||oa(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("change",rr),Ji||(e.addEventListener("compositionstart",nr),e.addEventListener("compositionend",rr)),zi&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){Qn(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,tr);i.some(function(e,t){return!b(e,r[t])})&&(e.multiple?t.value.some(function(e){return er(e,i)}):t.value!==t.oldValue&&er(t.value,i))&&ir(e,"change")}}},show:{bind:function(e,t,n){var r=t.value,i=(n=or(n)).data&&n.data.transition,o=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;r&&i?(n.data.show=!0,qn(n,function(){e.style.display=o})):e.style.display=r?o:"none"},update:function(e,t,n){var r=t.value;r!==t.oldValue&&((n=or(n)).data&&n.data.transition?(n.data.show=!0,r?qn(n,function(){e.style.display=e.__vOriginalDisplay}):Wn(n,function(){e.style.display="none"})):e.style.display=r?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,r,i){i||(e.style.display=e.__vOriginalDisplay)}}},Fa={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]},Ha={name:"transition",props:Fa,abstract:!0,render:function(e){var t=this,n=this.$options._renderChildren;if(n&&(n=n.filter(function(e){return e.tag||pe(e)})).length){var r=this.mode,o=n[0];if(ur(this.$vnode))return o;var a=ar(o);if(!a)return o;if(this._leaving)return cr(e,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=sr(this),u=this._vnode,l=ar(u);if(a.data.directives&&a.data.directives.some(function(e){return"show"===e.name})&&(a.data.show=!0),l&&l.data&&!lr(a,l)&&!pe(l)){var f=l.data.transition=y({},c);if("out-in"===r)return this._leaving=!0,re(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),cr(e,o);if("in-out"===r){if(pe(a))return u;var d,p=function(){d()};re(c,"afterEnter",p),re(c,"enterCancelled",p),re(f,"delayLeave",function(e){d=e})}}return o}}},Ba=y({tag:String,moveClass:String},Fa);delete Ba.mode;var Ua={Transition:Ha,TransitionGroup:{props:Ba,render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=sr(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var d=r[f];d.data.transition=a,d.data.pos=d.elm.getBoundingClientRect(),n[d.key]?u.push(d):l.push(d)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},beforeUpdate:function(){this.__patch__(this._vnode,this.kept,!1,!0),this._vnode=this.kept},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(fr),e.forEach(dr),e.forEach(pr),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Bn(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(La,n._moveCb=function e(r){r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(La,e),n._moveCb=null,Un(n,t))})}}))},methods:{hasMove:function(e,t){if(!Sa)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){Rn(n,e)}),Dn(n,t),n.style.display="none",this.$el.appendChild(n);var r=zn(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};xt.config.mustUseProp=qo,xt.config.isReservedTag=ra,xt.config.isReservedAttr=Ko,xt.config.getTagNamespace=Ut,xt.config.isUnknownElement=function(e){if(!Bi)return!0;if(ra(e))return!1;if(e=e.toLowerCase(),null!=ia[e])return ia[e];var t=document.createElement(e);return e.indexOf("-")>-1?ia[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:ia[e]=/HTMLUnknownElement/.test(t.toString())},y(xt.options.directives,Ra),y(xt.options.components,Ua),xt.prototype.__patch__=Bi?Da:_,xt.prototype.$mount=function(e,t){return e=e&&Bi?Vt(e):void 0,we(this,e,t)},xt.nextTick(function(){Pi.devtools&&Xi&&Xi.emit("init",xt)},0);var Va,za=!!Bi&&function(e,t){var n=document.createElement("div");return n.innerHTML='<div a="'+e+'"/>',n.innerHTML.indexOf(t)>0}("\n","&#10;"),Ka=/\{\{((?:.|\n)+?)\}\}/g,Ja=/[-.*+?^${}()|[\]\/\\]/g,qa=v(function(e){var t=e[0].replace(Ja,"\\$&"),n=e[1].replace(Ja,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")}),Wa={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=dn(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=fn(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}},Ga={staticKeys:["staticStyle"],transformNode:function(e,t){var n=dn(e,"style");n&&(e.staticStyle=JSON.stringify(ba(n)));var r=fn(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},Za={decode:function(e){return Va=Va||document.createElement("div"),Va.innerHTML=e,Va.textContent}},Ya=f("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),Qa=f("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),Xa=f("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),es=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,ts="[a-zA-Z_][\\w\\-\\.]*",ns="((?:"+ts+"\\:)?"+ts+")",rs=new RegExp("^<"+ns),is=/^\s*(\/?)>/,os=new RegExp("^<\\/"+ns+"[^>]*>"),as=/^<!DOCTYPE [^>]+>/i,ss=/^<!--/,cs=/^<!\[/,us=!1;"x".replace(/x(.)?/g,function(e,t){us=""===t});var ls,fs,ds,ps,vs,hs,ms,ys,gs,_s,bs=f("script,style,textarea",!0),$s={},Cs={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n"},ws=/&(?:lt|gt|quot|amp);/g,xs=/&(?:lt|gt|quot|amp|#10);/g,ks=f("pre,textarea",!0),As=function(e,t){return e&&ks(e)&&"\n"===t[0]},Os=/^@|^v-on:/,Ss=/^v-|^@|^:/,Ts=/(.*?)\s+(?:in|of)\s+(.*)/,Es=/\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/,js=/:(.*)$/,Ls=/^:|^v-bind:/,Ns=/\.[^.]+/g,Is=v(Za.decode),Ms=/^xmlns:NS\d+/,Ps=/^NS\d+:/,Ds=[Wa,Ga,{preTransformNode:function(e,t){if("input"===e.tag){var n=e.attrsMap;if(n["v-model"]&&(n["v-bind:type"]||n[":type"])){var r=fn(e,"type"),i=dn(e,"v-if",!0),o=i?"&&("+i+")":"",a=Fr(e);xr(a),Hr(a,"type","checkbox"),$r(a,t),a.processed=!0,a.if="("+r+")==='checkbox'"+o,Sr(a,{exp:a.if,block:a});var s=Fr(e);dn(s,"v-for",!0),Hr(s,"type","radio"),$r(s,t),Sr(a,{exp:"("+r+")==='radio'"+o,block:s});var c=Fr(e);return dn(c,"v-for",!0),Hr(c,":type",r),$r(c,t),Sr(a,{exp:i,block:c}),a}}}}],Rs={expectHTML:!0,modules:Ds,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return pn(e,r,i),!1;if("select"===o)wn(e,r,i);else if("input"===o&&"checkbox"===a)$n(e,r,i);else if("input"===o&&"radio"===a)Cn(e,r,i);else if("input"===o||"textarea"===o)xn(e,r,i);else if(!Pi.isReservedTag(o))return pn(e,r,i),!1;return!0},text:function(e,t){t.value&&sn(e,"textContent","_s("+t.value+")")},html:function(e,t){t.value&&sn(e,"innerHTML","_s("+t.value+")")}},isPreTag:function(e){return"pre"===e},isUnaryTag:Ya,mustUseProp:qo,canBeLeftOpenTag:Qa,isReservedTag:ra,getTagNamespace:Ut,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(Ds)},Fs=v(function(e){return f("type,tag,attrsList,attrsMap,plain,parent,children,attrs"+(e?","+e:""))}),Hs=/^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/,Bs=/^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/,Us={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},Vs=function(e){return"if("+e+")return null;"},zs={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:Vs("$event.target !== $event.currentTarget"),ctrl:Vs("!$event.ctrlKey"),shift:Vs("!$event.shiftKey"),alt:Vs("!$event.altKey"),meta:Vs("!$event.metaKey"),left:Vs("'button' in $event && $event.button !== 0"),middle:Vs("'button' in $event && $event.button !== 1"),right:Vs("'button' in $event && $event.button !== 2")},Ks={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}},cloak:_},Js=function(e){this.options=e,this.warn=e.warn||on,this.transforms=an(e.modules,"transformCode"),this.dataGenFns=an(e.modules,"genData"),this.directives=y(y({},Ks),e.directives);var t=e.isReservedTag||ji;this.maybeComponent=function(e){return!t(e.tag)},this.onceId=0,this.staticRenderFns=[]},qs=(new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b"),new RegExp("\\b"+"delete,typeof,void".split(",").join("\\s*\\([^\\)]*\\)|\\b")+"\\s*\\([^\\)]*\\)"),function(e){return function(t){function n(n,r){var i=Object.create(t),o=[],a=[];if(i.warn=function(e,t){(t?a:o).push(e)},r){r.modules&&(i.modules=(t.modules||[]).concat(r.modules)),r.directives&&(i.directives=y(Object.create(t.directives),r.directives));for(var s in r)"modules"!==s&&"directives"!==s&&(i[s]=r[s])}var c=e(n,i);return c.errors=o,c.tips=a,c}return{compile:n,compileToFunctions:bi(n)}}}(function(e,t){var n=gr(e.trim(),t);Br(n,t);var r=Zr(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}})(Rs).compileToFunctions),Ws=v(function(e){var t=Vt(e);return t&&t.innerHTML}),Gs=xt.prototype.$mount;return xt.prototype.$mount=function(e,t){if((e=e&&Vt(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=Ws(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=$i(e));if(r){var i=qs(r,{shouldDecodeNewlines:za,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return Gs.call(this,e,t)},xt.compile=qs,xt});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const win = nw.Window.get(),
    version = __webpack_require__(5),
    config = __webpack_require__(1),
    Media = __webpack_require__(11),
    utils = __webpack_require__(0),
    capture = __webpack_require__(12),
    Vue = __webpack_require__(3),
    shortcut = __webpack_require__(13),
    crypto = __webpack_require__(14),

    inputEl = document.createElement('input'),
    outputEl = document.createElement('input'),
    logoInput = document.createElement('input'),
    canvas = document.createElement('canvas');


win.maximize();
win.show();

function listItems(files){
    let i = 0,
        item,
        hex,
        key;
    if(files.length){
        recycle(files[0]);
        function recycle(file){
            item = {
                path: file.path,
                thumb: '',
                canplay: false,
                playing: 0,
                progress: 0,
                lock: vue.toolbar.toggle.lock,
                alpha: vue.toolbar.toggle.alpha,
                type: '',
                series: false,
                logo: '',
                logoX: 1,
                logoY: 2,
                logoScale: 0,
                logoSize: 12,
                logoStart: 0,
                logoEnd: 0,

                duration: 0,
                startTime: 0,
                endTime: 0,
                currentTime: 0,
                coverTime: 0,
                cover: false,
                coverWidth: 480,

                name: file.name,
                toname: '',

                bitv: 0,
                bita: 0,

                size: (parseInt(file.size) || 0),
                quality: 0,

                scale: 0,
                width: 0,
                towidth: 0,
                height: 0,
                toheight: 0,

                format: '',
                toformat: '',

                fps: 0,
                tofps: 0,

                split: false,
                achannel: '',
                aclayout: 0,
                vchannel: ''
            };

            hex = crypto.createHash('md5');
            hex.update(file.path);
            key = hex.digest('base64');
            vue.$set(vue.items, key, item);

            Media.info({
                input: file.path,
                success: (json)=>{
                    item.thumb = json.thumb;
                    item.type = json.type;

                    item.duration = json.duration;

                    item.bitv = json.bitv || json.bit;
                    item.bita = json.bita;

                    item.scale = (json.height / json.width) || vue.viewScale;
                    item.width = json.width;
                    item.height = json.height;

                    item.format = json.ext;
                    item.canplay = (/(mp4|mp3|ogg|mpeg|mkv|wav|webm)/i.test(json.ext));
                    item.fps = json.fps;

                    item.achannel = json.achannel;
                    item.aclayout = json.aclayout;
                    item.vchannel = json.vchannel;

                    vue.reItem(item);

                    i++;
                    if(files[i]) recycle(files[i]);
                },
                fail: (err)=>{
                    utils.dialog.show = true;
                    utils.dialog.body = `<p>文件：“${file.name}”可能不支持！是否保留以尝试转码？</p>
                    <details class="dialog-details">
                        <summary>详细错误</summary>
                        <p>${err}</p>
                    </details>`;
                    utils.dialog.setBtn('是','否');
                    utils.dialog.callback = function(code){
                        
                        if(code === 1){
                            window.URL.revokeObjectURL(vue.items[key].thumb);
                            vue.$delete(vue.items, key);
                        }
                        i++;
                        if(files[i]) recycle(files[i]);
                    };
                }
            });
        }
    }
}

shortcut({inputEl, outputEl, listItems});

const vue = new Vue({
	el: '#app',
	data: {
        app: Object.freeze(nw.App.manifest),
		output: config.output.folder,
        items: {},
        viewWidth: screen.availWidth * .19,
        viewScale: .5625,
        isStarted: false,
		winToggle: true,
        batchParams: {
            speed: 'slow',
            nameAll: nw.App.manifest.name,
            widthLimit: config.output.width,
            heightLimit: config.output.height,
            sizeLimit: 0,
            logo: ''
        },
        toolbar: {
            drop: 0,
            toggle: {
                lock: 1,
                alpha: 1
            },
            x: 0,
            y: 0
        },
        active: {
            mainSubmenu: ''
        },
        capParams: {
            mode: 0,
            bitv: config.output.bitv,
            bita: config.output.bita,
            widthLimit: config.output.width,
            width: screen.width,
            height: screen.height,
            x: 0,
            y: 0,
            fps: config.output.fps,
            audioDevices: [],
            audioDevice: ''
        },
        sprite: {
            preview: false,
            align: 1,
            items: [],
            listCss: '',
            itemCss: '',
            imgCss: ''
        },
        framestep: 2
	},
    created(){
        inputEl.type = outputEl.type = logoInput.type = 'file';
        inputEl.multiple = true;
        outputEl.nwdirectory = true;

        inputEl.addEventListener('change', (e)=>{
            vue.toolbar.drop = 'chosefile';
            listItems(inputEl.files);
        });
        inputEl.addEventListener('cancel', ()=>{
            vue.toolbar.drop = '';
        });

        outputEl.addEventListener('change', ()=>{
            vue.toolbar.drop = 'chosedir';
            vue.output = outputEl.files[0].path || '';
        });
        outputEl.addEventListener('cancel', ()=>{
            vue.toolbar.drop = '';
        });

        logoInput.addEventListener('change', ()=>{
            if(/^image\/[\w-]+$/i.test(logoInput.files[0].type)){
                let activeIndex = logoInput.dataset.activeIndex,
                    logoPath = logoInput.files[0].path,
                    img = new Image();
                img.onload = ()=>{
                    if(activeIndex === 'all'){
                        vue.batchParams.logo = logoPath;
                        for(let key in vue.items){
                            if(vue.items[key].lock){
                                vue.items[key].logo = logoPath;
                                vue.items[key].logoScale = img.height / img.width;
                            }
                        }
                    }else{
                        vue.items[activeIndex].logo = logoPath;
                        vue.items[activeIndex].logoScale = img.height / img.width;
                    }
                    img.onload = null;
                    img = null;
                };
                img.src = logoPath;
            }
        });
    },
	methods: {
        getThumb(item){
            if(!item) return;
            Media.thumb({
                input: item.path,
                time: item.currentTime,
                success(src){
                    item.thumb = src;
                },
                fail(){
                    utils.dialog.show = true;
                    utils.dialog.title = '错误！';
                    utils.dialog.body = '<p>微调发生错误！</p>';
                }
            });
        },
        reItem(item){
            let tobitv = item.bitv <= config.output.bitv ? item.bitv : config.output.bitv;
                tobita = item.bita <= config.output.bita ? item.bita : config.output.bita,
                quality = (tobitv+tobita)/(item.bitv+item.bita)*100;

            item.quality = quality ? quality.toFixed(2) : 100;
            item.toname = vue.batchParams.nameAll+'_'+item.name.slice(0, -item.format.length-1);
            item.toformat = item.type !== 'image' || !/(jpg|png|gif|jpeg|ico|webp|bmp)/i.test(item.format) ?  config.output.format[item.type] : item.format;
            item.startTime = 0;
            item.endTime = item.duration;
            item.cover = false;
            item.coverTime = 0;
            item.towidth = item.width > config.output.width ? config.output.width : item.width;
            item.toheight = parseInt(item.towidth * item.scale);
            item.tofps = item.fps;
            item.totype = utils.type(item.toformat);
            item.logoStart = 0;
            item.logoEnd = item.duration;
        },
        zoomItemFn(e){
            vue.viewWidth = win.width * parseFloat(e.currentTarget.value);
        },
        //event function
        titlebarFn(name){
            switch(name){
                case 'min':
                {
                    win.minimize();
                }
                break;
                case 'toggle':
                {
                    let w = screen.width * .8,
                        h = Math.round(w * .5625),
                        x = (screen.width - w) / 2,
                        y = (screen.height - h) / 2;
                    if(vue.winToggle = !vue.winToggle){
                        win.maximize();
                    }else{
                        win.moveTo(x, y);
                        win.resizeTo(w, h);
                    }
                }
                break;
                case 'close':
                {
                    win.close(true);
                }
            }
        },
        toolbarFn(e){
            let target = e.currentTarget,
                name = target.name,
                command,
                item,
                key;

            if(vue.toolbar.drop === name){
                vue.toolbar.drop = '';
            }else{
                vue.toolbar.drop = name;
                vue.toolbar.x = e.x;
                vue.toolbar.y = e.y+30;
            }

            switch(name){
                case 'chosefile': inputEl.value = ''; inputEl.click(); break;
                case 'chosedir': outputEl.click(); break;
                case 'pdf2pic':
                    nw.Window.open('plugins/pdf2pic/pdf2pic.html',{
                        id: 'pdf2pic',
                        position: 'center',
                        new_instance: false,
                        focus: true,
                        frame: false,
                        width: win.width*.8,
                        height: win.height*.8
                    });
                break;
                case 'concat':
                    command = [];
                    for(key in vue.items){
                        item = vue.items[key];
                        if(item.lock){
                            if(item.type !== 'video'){
                                utils.dialog.show = true;
                                utils.dialog.body = '拼接失败！文件“'+item.path+'”不是视频，无法拼接。';
                            }else{
                                command.push('-i', item.path);
                            }
                        }
                    }
                    console.log(command);
                    break;
                case 'mix':

                    break;
                case 'firstAid':
                    utils.dialog.show = true;
                    utils.dialog.title = '严重提示！';
                    utils.dialog.body = '<p>为了避免失误操作，必须谨慎选择是否真的启用急救，不到万不得已，请不要轻易启用！当然，它也可以强制中止正在处理的程序。</p>';
                    utils.dialog.setBtn('启用','关闭');
                    utils.dialog.callback = function(code){

                        if(code === 0){
                            Media.killAll();
                        }
                        target.classList.remove('active-1');
                    };
                    break;
                case 'helpBook':
                    nw.Shell.openExternal(vue.app.documentation);
                    break;
            }
        },
        convertFn(e){
            let total, cammand, keys, len, i, target, options;

            target = e.currentTarget;
            target.dataset.stopAll = 0;
            if(Media.ffmpeg !== null){
                utils.dialog.show = true;
                utils.dialog.title = '<i class="icon icon-question"></i>';
                utils.dialog.body = '<p>文件正在处理，如果中止，不能确保已输出的部分是正常的，是否中止？</p>';
                utils.dialog.setBtn('中止当前','中止全部','取消');
                utils.dialog.callback = function(code){

                    if(code === 0 || code === 1){
                        Media.end('主动中止，' + this.innerText);
                        vue.isStarted = false;
                        target.dataset.stopAll = code;
                    }
                };
                return false;
            }

            keys = Object.keys(vue.items);
            len = keys.length;
            i = 0;

            if(len){
                recycle(vue.items[ keys[i] ]);
            }else{
                utils.dialog.show = true;
                utils.dialog.title = '哦嚯！';
                utils.dialog.body = '<p>哦嚯！没有输入任何文件。</p>';
            }

            function recycle(item){
                cammand = Media.cammand(item, vue.output);
                total = item.endTime - item.startTime;
                options = {
                    cammand: cammand.cmd,
                    progress(t){
                        if(total){
                            item.progress = Math.round((t/total)*100);
                        }else{
                            item.progress = 50;
                        }
                        win.setProgressBar((i/len) + (1/len) * (item.progress/100));
                    },
                    complete(code, msg){
                        vue.isStarted = false;
                        //防止在处理过程中进行删除操作的情况
                        keys = Object.keys(vue.items);
                        len = keys.length;
                        if(code === 0){
                            item.progress = 100;
                            i++;
                            if(keys[i] && target.dataset.stopAll != 1){
                                recycle(vue.items[ keys[i] ]);
                            }else{
                                msg = msg || '全部完成';
                                win.setProgressBar(-1);
                                utils.dialog.show = true;
                                utils.dialog.title = '<i class="icon icon-grin2" style="color:#f5b018;"></i> 完成！';
                                utils.dialog.body = `<p>${msg}！接下来选择如何处理已完成？</p>`;
                                utils.dialog.setBtn('移除','保留');
                                utils.dialog.callback = function(code){
                                    
                                    for(let key in vue.items){
                                        if(code === 0 && vue.items[key].progress){
                                            window.URL.revokeObjectURL(vue.items[key].thumb);
                                            vue.$delete(vue.items, key);
                                        }else{
                                            vue.items[key].progress = 0;
                                        }
                                    }
                                }
                            }
                        }else{
                            win.setProgressBar(-1);
                            utils.dialog.show = true;
                            utils.dialog.title = '失败！';
                            utils.dialog.body = '<p>失败原因：'+msg+'</p>';
                            item.progress = 0;
                        }
                    }
                };

                item.progress = 0;
                vue.isStarted = true;

                if(cammand.error){
                    utils.dialog.show = true;
                    utils.dialog.body = cammand.error.message;
                    if(cammand.error.code === 1){
                        utils.dialog.title = '错误！';
                    }else if(cammand.error.code === 2){
                        utils.dialog.title = '文件已存在！';
                        utils.dialog.setBtn('覆盖','否');
                        utils.dialog.callback = (c)=>{
                            if(c===0) Media.convert(options);
                            else vue.isStarted = false;
                        }
                    }
                }else{
                    Media.convert(options);
                }
            }
        },
        spriteFn(code){
            if(typeof code !== 'string'){
                vue.toolbar.drop = '';
                if(code === -1 || !Object.keys(vue.items).length) return;
                let spriteList = document.getElementById('sprite-list'),
                    items = spriteList.querySelectorAll('.sprite-item'),
                    len = items.length,
                    i = 0,
                    x = 0, y = 0, w = 0, h = 0,
                    item, img, ctx;

                canvas.width = spriteList.offsetWidth;
                canvas.height = spriteList.offsetHeight;
                ctx = canvas.getContext('2d');

                for(; i < len;  i++){
                    item = items[i];
                    img = item.querySelector('img');
                    x = item.offsetLeft + img.offsetLeft + utils.css(img,'borderLeftWidth') + utils.css(img,'paddingLeft');
                    y = item.offsetTop + img.offsetTop + utils.css(img,'borderTopWidth') + utils.css(img,'paddingTop');
                    w = img.offsetWidth - utils.css(img,'borderLeftWidth') - utils.css(img,'borderRightWidth') - utils.css(img,'paddingLeft') - utils.css(img,'paddingRight');
                    h = img.offsetHeight - utils.css(img,'borderTopWidth') - utils.css(img,'borderBottomWidth') - utils.css(img,'paddingTop') - utils.css(img,'paddingBottom');
                    ctx.drawImage(img, x, y, w, h);
                }

                utils.canvasToFile(vue.output+'\\sprite.png', canvas.toDataURL('image/png'), utils.dialog);
            }else if(code === 'align'){
                alignFn( parseInt(arguments[1].target.value) );
            }else if(code == 'matrix'){
                vue.sprite.align = parseInt(arguments[1].target.value);
                alignFn( parseInt(vue.$refs.spriteAlign.value) );
            }
            function alignFn(val){
                if(vue.sprite.align == 1){
                    vue.sprite.listCss = '';
                    switch(val){
                        case 2: vue.sprite.itemCss = 'vertical-align: middle;'; break;
                        case 3: vue.sprite.itemCss = 'vertical-align: bottom;'; break;
                        default: vue.sprite.itemCss = 'vertical-align: top;';
                    }
                }else if(vue.sprite.align == 2){
                    vue.sprite.itemCss = '';
                    switch(val){
                        case 2:
                            vue.sprite.listCss = 'white-space: normal;text-align: center;';
                        break;
                        case 3:
                            vue.sprite.listCss = 'white-space: normal;text-align: right;';
                        break;
                        case 4:
                            vue.sprite.listCss = 'white-space: normal;';
                            vue.sprite.itemCss = 'width: 100%;';
                            vue.sprite.imgCss = 'width: 100%;';
                        break;
                        default:
                            vue.sprite.listCss = 'white-space: normal;text-align: left;';
                    }
                }
            }
        },
        batchParamsFn(e,name){
            let target = e.target,
                val = parseInt(target.value) || 0;
            switch(name){
                case 'widthLimit':
                {
                    target.value = val > config.output.width ? config.output.width : val;
                }
                break;
                case 'heightLimit':
                {
                    target.value = val > config.output.height ? config.output.height : val;
                }
                break;
                case 'logo':
                {
                    if(arguments[2] === 'del'){
                        vue.batchParams.logo = '';
                        for(let key in vue.items){
                            if(vue.items[key].lock) vue.items[key].logo = '';
                        }
                    }else{
                        logoInput.dataset.activeIndex = 'all';
                        logoInput.value = '';
                        logoInput.click();
                    }
                }
                break;
                case 0:
                {
                    let sizeLimit = parseFloat(vue.$refs.sizeLimitEl.value) || 0,
                        wl = parseInt(vue.$refs.widthLimitEl.value) || 0,
                        hl = parseInt(vue.$refs.heightLimitEl.value) || 0,
                        scale = hl / wl,
                        quality,
                        item,
                        key,
                        n = 0;

                    if(wl) vue.batchParams.widthLimit = wl;
                    if(hl) vue.batchParams.heightLimit = hl;
                    if(sizeLimit) vue.batchParams.sizeLimit = sizeLimit*1024*1024;

                    for( key in vue.items){
                        item = vue.items[key];
                        if(item.lock){
                            if(item.scale > scale){
                                item.toheight = hl;
                                item.towidth = hl / item.scale;
                            }else{
                                item.towidth = wl;
                                item.toheight = wl * item.scale;
                            }
                            quality = (vue.batchParams.sizeLimit / item.size * 100).toFixed(2);
                            if(sizeLimit && vue.batchParams.sizeLimit < item.size){
                                item.quality = quality;
                            }else{
                                item.quality = 100;
                            }
                            item.toname = utils.namemat(vue.batchParams.nameAll, ++n);
                        }
                    }
                    vue.toolbar.drop = '';
                }
                break;
                case 1:
                {
                    for( key in vue.items) vue.reItem(vue.items[key]);
                    vue.toolbar.drop = '';
                }
                break;
                default:
                    vue.toolbar.drop = '';
            }
        },
        logoFn(e, name, index){
            let val = parseFloat(e.currentTarget.value);
            if(index){
                calc(vue.items[index]);
            }else{
                for(let key in vue.items) calc(vue.items[key]);
            }
            /*位置推算：
                目的：要求出logo高度与item(图/视频)的高度比(设为：Hs);
                已知：logo宽度与item宽度比item.logoSize(设为：A); logo宽高比item.logoScale(设为：B); item宽高比item.scale(设为：C);
                设： item宽、高分别为 W1、 H1，logo宽高分别为 W2、H2;
                求：Hs，即(H2/H1)。
                解：
                    因: A = W2/W1; B = H2/W2; C = H1/W1;
                    故: H1 = W1*C; H2 = W2*B;
                    推导: Hs = H2/H1
                        = (W2*B) / (W1*C)
                        = (W2/W1) * (B/C)
                        = A * (B/C);
                套入：Hs = item.logoSize * (item.logoScale / item.scale);
            */
            function calc(item){
                switch(name){
                    case 'size':
                        item.logoSize = val;
                        break;
                    case 'left':
                        item.logoX = (100-item.logoSize) * (val/100);
                        break;
                    case 'top':
                        item.logoY = (100 - item.logoSize * (item.logoScale / item.scale)) * (val /100);
                        break;
                }
            }

        },
        nameAllFn(code){
            if(code === -1) return;

            let output, n;
            n = 0;
            i = 0;
            k = Object.keys(vue.items)[0];
            item = vue.items[k];
            
            if(item){
                recycle(item)
            }else{
                utils.dialog.show = true;
                utils.dialog.body = '<p>没有输入任何文件！</p>';
            }
            function recycle(item){
                k = Object.keys(vue.items)[++n];
                if(item.lock){
                    i++;
                    output = vue.output +'\\'+ utils.namemat(vue.batchParams.nameAll, i) +'.'+ item.format;
                    if(code === 1){
                        Media.rename(item.path, output, oneComplete);
                    }else if(code === 2){
                        Media.copyFile(item.path, output, oneComplete);
                    }
                }
            }
            function oneComplete(err){
                item = vue.items[k];
                if(err){
                    utils.dialog.show = true;
                    utils.dialog.title = '错误！';
                    utils.dialog.body = `<p>有文件重命名失败！</p>
                    <details class="dialog-details">
                        <summary>详细错误</summary>
                        <p>${err.toString()}</p>
                    </details>`;
                    utils.dialog.setBtn('继续','退出');
                    utils.dialog.callback = function(c){
                        
                        if(c === 0){
                            if(item){
                                recycle(item);
                            }else{
                                allComplete();
                            }
                        }
                    }
                }else{
                    if(item){
                        recycle(item);
                    }else{
                        allComplete();
                    }
                }
            }
            function allComplete(){
                utils.dialog.show = true;
                utils.dialog.title = '结束！';
                utils.dialog.body = '<p>输出目录：'+vue.output+', 可前往查看序列化重命名结果。</p>';
            }
        },
        captureFn(e,code){
            let params = vue.capParams,
                output;
            switch(code){
                case 1:
                {
                    params.mode = parseInt(e.target.value);
                }
                break;
                case 2:
                {
                    capture.audioDevices((err, list)=>{
                        if(err){
                            utils.dialog.show = true;
                            utils.dialog.title = '失败！';
                            utils.dialog.body = '<p>'+err+'</p>';
                        }else{
                            let i = 0, len, devices = params.audioDevices;
                            len = list.length;
                            devices.splice(0, devices.length);
                            for(; i<len; i++){
                                if(i%2 === 0){
                                    devices.push(list[i]);
                                }
                            }
                            params.audioDevice = devices[0];
                        }
                    });
                }
                break;
                case 3:
                {
                    capture.setArea(640, 360, (x, y, w, h)=>{
                        params.x = x;
                        params.y = y;
                        params.width = w;
                        params.height = h;
                        start();
                    });
                }
                break;
                case 0: start(); break;
            }
            function start(){
                if(params.mode !== 4 && params.fps > 60){
                    utils.dialog.show = true;
                    utils.dialog.body = '<p>帧速率不能超过 60</p>';
                    return;
                }
                if(params.mode !== 2 && params.mode !== 3 && !params.audioDevice){
                    utils.dialog.show = true;
                    utils.dialog.body = '<p>无可用于录制音频的设备，请检测设备或查看帮助文档。</p>';
                    return;
                }
                output = vue.output + '\\'+vue.batchParams.nameAll;
                if(params.mode === 4){
                    output += '.mp3';
                }else{
                    output += '.mp4';
                }

                // capture.progress = (time)=>{}

                capture.complete = (err)=>{
                    utils.dialog.show = true;
                    if(err){
                        utils.dialog.title = '失败！';
                        utils.dialog.body = `<p>错误码：${err.code}</p>
                        <details class="dialog-details">
                            <summary>详细错误</summary>
                            <p>${err.message}</p>
                        </details>`;
                    }else{
                        utils.dialog.title = '完成！';
                        utils.dialog.body = '<p>输出位置：'+output+'</p>';
                    }
                }
                capture.start(output, vue.capParams);
            }
            if(code === 0 || code === -1){
                vue.toolbar.drop = '';
            }
        },
        videoFn(e, index, type){
            let item = vue.items[index],
                video = vue.$refs['id'+index][0];
            if(!item) return;
            switch(type){
                case 'timeupdate':
                    item.currentTime = video.currentTime;
                    break;
                case 'play':
                    item.playing = true;
                    break;
                case 'pause':
                    item.playing = false;
                    break;
                default:
                    if(!item.canplay) return;
                    video.currentTime = item.currentTime;
                    if(video.paused){
                        video.play();
                    }else{
                        video.pause();
                    }
            }
        },
        itemFn(e, index, str){
            let item = vue.items[index],
                target = e.target,
                step;

            switch(str){
                case 'del':
                {
                    window.URL.revokeObjectURL(vue.items[index].thumb);
                    vue.$delete(vue.items, index);
                }
                break;
                case 'delAll':
                {
                    for(let key in vue.items){
                        window.URL.revokeObjectURL(vue.items[key].thumb);
                        vue.$delete(vue.items, key);
                    }
                }
                break;
                case 'lock': item.lock = !item.lock; break;
                case 'lockAll': 
                {
                    vue.toolbar.toggle.lock = !vue.toolbar.toggle.lock;
                    for(let key in vue.items){
                        vue.items[key].lock = vue.toolbar.toggle.lock;
                    }
                }
                break;
                case 'alpha': item.alpha = !item.alpha; break;
                case 'alphaAll':
                {
                    vue.toolbar.toggle.alpha = !vue.toolbar.toggle.alpha;
                    for(let key in vue.items){
                        vue.items[key].alpha = vue.toolbar.toggle.alpha;
                    }
                }
                break;
                case 'reset': vue.reItem(item); break;
                case 'currentTime':
                {
                    vue.$refs['id'+index][0].pause();
                    item.currentTime = parseFloat(target.value);
                }
                break;
                case 'timeSlide':
                {
                    if(item.canplay){
                        vue.$refs['id'+index][0].currentTime = item.currentTime;
                    }else if(item.type === 'video'){
                        vue.getThumb(item);
                    }
                }
                break;
                case 'prevFrame':
                {
                    step = (1/item.fps)*vue.framestep;
                    if(item.currentTime > step){
                        item.currentTime -= step;
                    }else{
                        item.currentTime = 0;
                    }
                    if(item.canplay){
                        let video = vue.$refs['id'+index][0];
                        video.pause();
                        video.currentTime = item.currentTime;
                    }else if(item.type === 'video'){
                        vue.getThumb(item);
                    }
                }
                break;
                case 'nextFrame':
                {
                    step = (1/item.fps)*vue.framestep;
                    if(item.currentTime < item.duration - step){
                        item.currentTime += step;
                    }else{
                        item.currentTime = item.duration;
                    }
                    if(item.canplay){
                        let video = vue.$refs['id'+index][0];
                        video.pause();
                        video.currentTime = item.currentTime;
                    }else if(item.type === 'video'){
                        vue.getThumb(item);
                    }
                }
                break;
                case 'setstart':
                {
                    item.startTime = item.currentTime;
                    if(item.startTime > item.endTime){
                        item.endTime = item.startTime;
                    }
                }
                break;
                case 'setend':
                {
                    if(item.currentTime < item.startTime){
                        item.startTime = item.currentTime;
                    }
                    item.endTime = item.currentTime;
                }
                break;
                case 'setcover':
                {
                    if(item.currentTime < item.startTime || item.currentTime > item.endTime ){
                        utils.dialog.show = true;
                        utils.dialog.title = '注意';
                        utils.dialog.body = '<p>取预览图的位置必须是在截取时间'+utils.timemat(item.startTime*1000)+'到'+utils.timemat(item.endTime*1000)+'</p>';
                        utils.dialog.callback = ()=>{
                            
                            item.coverTime = item.currentTime > item.startTime ? item.endTime : item.startTime;
                            item.currentTime = item.coverTime;
                            if(item.canplay){
                                vue.$refs['id'+index][0].currentTime = item.currentTime;
                            }else if(item.type === 'video'){
                                vue.getThumb(item);
                            }
                        }
                    }else{
                        item.coverTime = item.currentTime;
                    }
                }
                break;
                case 'toformat':
                {
                    item.toformat = target.value;
                    item.totype = utils.type(item.toformat);
                }
                break;
                case 'towidth':
                {
                    item.towidth = parseInt(target.value) || 0;
                    item.toheight = Math.round(item.towidth * item.scale);
                }
                break;
                case 'toheight':
                {
                    item.toheight = parseInt(target.value) || 0;
                    item.towidth = Math.round(item.toheight / item.scale);
                }
                break;
                case 'logo':
                {
                    logoInput.dataset.activeIndex = index;
                    switch (e.target.dataset.name){
                        case 'add':
                            logoInput.value = '';
                            logoInput.click();
                            break;
                        case 'del':
                            item.logo = '';
                            break;
                        case 'start':
                            item.logoStart = item.currentTime;
                            if(item.logoEnd < item.logoStart) item.logoEnd = item.logoStart;
                            break;
                        case 'end':
                            item.logoEnd = item.currentTime;
                            if(item.logoEnd < item.logoStart) item.logoStart = item.logoEnd;
                            break;
                        case 'lt':
                            item.logoX = 1;
                            item.logoY = 2;
                            break;
                        case 'rt':
                            item.logoX = 99 - item.logoSize;
                            item.logoY = 2;
                            break;
                        case 'ct':
                            item.logoX = (99 - item.logoSize)/2;
                            item.logoY = (98 - item.logoSize * (item.logoScale / item.scale))/2;
                            break;
                        case 'lb':
                            item.logoX = 1;
                            item.logoY = 98 - item.logoSize * (item.logoScale / item.scale);
                            break;
                        case 'rb':
                            item.logoX = 99 - item.logoSize;
                            item.logoY = 98 - item.logoSize * (item.logoScale / item.scale);
                            break;
                    }
                }
            }
        }
    },
    filters: {
        timemat(t){
            return utils.timemat(t*1000);
        },
        sizemat: utils.sizemat,
        mathRound(val){
            return Math.round(val);
        },
        viewNamemat(val){
            let html = '', i = 1;
            for(; i<4; i++){
                html += utils.namemat(val, i)+'.mp4 、 ';
            }
            html += '...'
            return html;
        }
    }
});

document.title = vue.app.window.title;
//check update
version(vue.app.documentation, vue.app.version, utils.dialog);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const https = __webpack_require__(6),
	utils = __webpack_require__(0),
	aEl = document.createElement('a');
module.exports = (url, version)=>{
	https.get(url, (res)=>{
		res.on('data', (data)=>{
			let match = /data-version=\"([^\"]*?)\"\s+data-loadurl=\"([^\"]*?)\"/i.exec(data.toString());
			if(match && match[1] && match[1] !== version){
				utils.dialog.show = true;
				utils.dialog.title = '版本更新';
				utils.dialog.body = '<p>有新版本，更新到：v'+match[1]+'。更新详情请查看【帮助文档】</p>';
				utils.dialog.setBtn('下载更新','暂不');
				utils.dialog.callback = function(code){
					if(code === 0){
						aEl.href = match[2];
						aEl.download = match[2].slice(match[2].lastIndexOf('/')+1);
						aEl.click();
					}
				}
			}
		});
	});
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 9 */
/***/ (function(module, exports) {


module.exports = (Vue)=>{
    //拖拽指令
    Vue.directive('drag',{
        bind(el){
            let drag = el.querySelectorAll('[data-drag]'),
                len = drag.length,
                style = window.getComputedStyle,
                i = 0,
                start_x = 0, start_y = 0, cur_x = 0, cur_y = 0, matrix;

            if(len)
                for(; i<len; i++) drag[i].addEventListener('mousedown', downFn);
            else
                el.addEventListener('mousedown', downFn);

            function downFn(e){
                matrix = style(el)['transform'].split(',');
                start_x = e.x;
                start_y = e.y;
                cur_x = parseInt(style(el)['left']) || 0;
                cur_y = parseInt(style(el)['top']) || 0;
                el.style.transition = 'none';
                document.addEventListener('mousemove', moveFn);
                document.addEventListener('mouseup', upFn);
            }
            function moveFn(e){
                el.style.left = (e.x-start_x+cur_x)+'px';
                el.style.top = (e.y-start_y+cur_y)+'px';
            }
            function upFn(){
                el.style.cssText = el.style.cssText.replace(/\s*transition:\s*none[;]?/i,'');
                document.removeEventListener('mousemove', moveFn);
                document.removeEventListener('mouseup', upFn);
            }
        }
    });
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {


module.exports = (Vue)=>{
    //menu tree
    Vue.component('menu-tree',{
        name: 'menu-tree',
        template: `
        <ul class="tree">
            <li class="tree-item" v-for="item in items">
                <div class="tree-item-name" v-html="item.html" :data-name="item.name"></div>
                <menu-tree v-if="item.items" :items="item.items"></menu-tree>
            </li>
        </ul>`,
        props: ['items']
    });
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const childprocess = __webpack_require__(2),
config = __webpack_require__(1),
utils = __webpack_require__(0);

//用于暂存单帧base64数据的临时文件，即预览图数据来源。
let THUMB_TEMP_FILE = 'rmedia.temp';
utils.fs.writeFileSync(THUMB_TEMP_FILE,'');

nw.process.on('exit',()=>{
    utils.fs.unlinkSync(THUMB_TEMP_FILE);
});

module.exports = {
    ffmpeg: null,
    metadata(url,success,fail){
        let ext = url.slice(url.lastIndexOf('.')+1).toLowerCase(),
            json = {
                duration: 0,
                bit: 0,
                bitv: 0,
                bita: 0,
                width: 0,
                height: 0,
                fps: 0,
                ext: ext,
                type: null,
                vchannel: '',
                achannel: '',
                aclayout: 0
            },
            status = true,

            ffmpeg = childprocess.exec(config.ffmpegPath+' -hide_banner -i "'+url+'" -vframes 1 -f null -', (err,stdout, stderr)=>{
            let lines = stderr.split(/\n/), i = 0, len = lines.length, line, match;
            for(; i < len; i++){
                line = lines[i].trim();
                if(/(^stream\s*mapping)|(^output)/i.test(line)) break;
                if( match = /^duration\s*:\s*([\s\S]*?)\s*,[\s\S]*?bitrate\s*:\s*([\d\.]+)\s*kb\/s$/i.exec( line ) ){
                    let times = match[1].toString().split(':');
                    json.duration = parseInt(times[0])*3600 + parseInt(times[1])*60 + parseFloat(times[2]);
                    json.bit = parseFloat(match[2]);
                }
                else if(match = /^stream\s+#(\d+:\d+)[\s\S]*?video\s*:\s*([\s\S]*?)$/i.exec( line )){
                    let size, fps, bitv;
                    json.vchannel = match[1];
                    if( size = /,\s*(\d+)x(\d+)/i.exec(match[2]) ){
                        json.width = parseFloat(size[1]);
                        json.height = parseFloat(size[2]);
                    }
                    if( fps = /,\s*([\d\.]+)\s*fps\s*,/i.exec(match[2]) ){
                        json.fps = parseFloat(fps[1]);
                    }
                    if( bitv = /,\s*([\d\.]+)\s*kb\/s/i.exec(match[2]) ){
                        json.bitv = parseFloat(bitv[1]);
                    }
                }
                else if(match = /^stream\s+#(\d+:\d+)[\s\S]*?audio\s*:\s*([\s\S]*?)$/i.exec( line ) ){
                    let aclayout, bita;
                    json.achannel = match[1];
                    if(aclayout = /stereo|mono/i.exec(match[2]) ){
                        json.aclayout = aclayout[0] == 'stereo' ? 2 : 1;
                    }
                    if(bita = /,\s*([\d\.]+)\s*kb\/s/i.exec(match[2]) ){
                        json.bita = parseFloat(bita[1]);
                    }
                }
            }

            if(json.width > 0 && json.height > 0){
                if(json.fps === 0 || json.ext === 'gif'){
                    json.type = 'image';
                    json.duration = 0;
                }else{
                    json.type = 'video'; 
                }
            }else if(json.bita > 0){
                json.type = 'audio';
            }

            if(json.bit <= 0){
                json.bit = json.bita + json.bitv;
            }
        }).once('close',(a,b)=>{
            if(a === 0){
                if(success) success(json);
            }else{
                if(status && fail){
                    status = false;
                    fail(a,b);
                }
            }
        }).once('error', (err)=>{
            try{
                ffmpeg.kill();
            }catch(e){}
            if(status && fail){
                status = false;
                fail(err);
            }
        });
    },
    thumb(o){
        let wmax = o.widthLimit || 480,
            w = o.width || wmax,
            h = o.height || wmax*.5625,
            format = o.format === 'jpg' ? 'image2' : (o.format === 'gif' ? 'gif': 'apng'),
            status = true,
            ffmpeg,
            thumb;
        if(w > wmax){
            h = Math.round((o.height/o.width)*wmax);
            w = Math.round(wmax);
        }
        if(h%2 !== 0) h--;
        if(w%2 !== 0) w--;

        ffmpeg = childprocess.exec(config.ffmpegPath+(o.time ? ' -ss '+o.time: '')+' -i "'+o.input+'" -vframes 1 -s '+w+'x'+h+' -y  -f '+format+' "'+THUMB_TEMP_FILE+'"',(err,stdout,stderr)=>{
            if(!err){
                thumb = window.URL.createObjectURL(new Blob([utils.fs.readFileSync(THUMB_TEMP_FILE)], {type:'image/'+o.format}));
            }else{
                if(status && o.fail){
                    status = false;
                    o.fail(err);
                }
            }
        }).once('close', (a,b)=>{
            if(a === 0){
                o.success(thumb);
            }else{
                if(status && o.fail){
                    status = false;
                    o.fail(a,b);
                }
            }
        }).once('error', (e)=>{
            try{
                ffmpeg.kill();
            }catch(e){}
            if(status && o.fail){
                status = false;
                o.fail(e);
            }
        });
    },
    info(o){
        let self = this;
        if(!o.input) {
            utils.dialog.show = true;
            utils.dialog.title = '地址错误：';
            utils.dialog.body = '<p>无效媒体文件地址!</p>';
            return;
        }
        if(!o.success) return;
        self.metadata(o.input,(json)=>{
            json.thumb = '';
            if(json.type === 'audio'){
                json.thumb = config.audioThumb;
                o.success(json);
            }else{
                if(utils.usableType(json.ext,'image')){
                    json.thumb = o.input;
                    o.success(json);
                }else{
                    self.thumb({
                        widthLimit: o.widthLimit,
                        format: o.format,
                        input: o.input,
                        width: json.width,
                        height: json.height,
                        success(thumb){
                            json.thumb = thumb;
                            o.success(json);
                        },
                        fail(a,b){
                            o.fail(a,b);
                        }
                    });
                }
            }
        }, o.fail);
    },
    killAll(fn){
        if(this.ffmpeg) this.ffmpeg.signalCode = '强制退出所有';
        childprocess.exec('TASKKILL /F /IM ffmpeg.exe', (err,stdout, stderr)=>{
            if(fn) fn(stderr.toString());
        });
    },
    end(signalCode){
        if(this.ffmpeg){
            this.ffmpeg.stdin.write('q\n');
            this.ffmpeg.signalCode = signalCode;
        }
    },
    cammand(item, outFolder){
        let bita, bitv, w, h, total, outPath, result, exists;

        bita = item.bita < config.output.bita ? item.bita : config.output.bita;
        bitv = Math.round(item.quality*(item.bitv+item.bita)/100 - bita);
        w = Math.round(item.towidth);
        h = Math.round(item.toheight);
        total = item.endTime - item.startTime;
        outPath = utils.path(outFolder + '\\' + item.toname);
        result = {
            error: null,
            cmd: []
        };
        exists = [];

        //时间
        if(item.startTime > 0) result.cmd.push('-ss', item.startTime);
        if(total > 0 && item.endTime !== item.duration) result.cmd.push('-t', total);

        //输入
        if(item.type === 'image' && item.series){
            if(item.totype === 'image' && item.toformat !== 'gif'){
                result.error = new Error(`在文件“${item.path}”选中了序列图，所以输出格式必须是视频或gif。请选好后再继续？`);
                result.error.code = 1;
                return result;
            }
            let reg = new RegExp('(\\d+)\\.'+item.format+'$','i'),
                match = reg.exec(item.path);
            if(match && match[1]){
                result.cmd.push('-r', 25, '-i', item.path.replace(reg, function($0,$1){
                    return '%0'+$1.length+'d.'+item.format;
                }));
            }else{
                result.error = new Error(`<p>选中了序列图，但输入的文件“${item.path}”不符合！</p>
                <p>序列图名称必须是有规律、等长度、末尾带序列化数字的名称。</p>
                <p>如：001.png、002.png、003.png... 或 img01.png、img02.png、img03.png...</p>
                <p>然后只需要选择第一张图片即可</p>`);
                result.error.code = 1;
                return result;
            }
        }else{
            result.cmd.push('-i', item.path);
        }

        //1.判断输入文件是否存在，有中途被转移或删除的情况
        if(!utils.has(item.path)){
            result.error = new Error('输入文件“'+item.path+'”不存在，可能文件路径被更改或文件被删除。');
            result.error.code = 1;
            return result;
        }

        //如果输出音频
        if(item.totype === 'audio'){
            if(item.achannel){
                if(bita) result.cmd.push('-ab', bita+'k');
                if(item.split && item.aclayout > 1){
                    //2.判断如果文件已存在，把已存在的暂存到exists中，方便枚举到error中，外部可用以提示是否覆盖。以下同里
                    if(utils.has(outPath+'_left.mp3')) exists.push('_left.mp3');
                    if(utils.has(outPath+'_right.mp3')) exists.push('_right.mp3');

                    result.cmd.push('-map_channel', item.achannel.replace(':','.')+'.0', outPath+'_left.mp3', '-map_channel', item.achannel.replace(':','.')+'.1', outPath+'_right.mp3');
                    return result;
                }
                if(item.type !== 'audio') result.cmd.push('-vn');
                //2...
                if(utils.has(outPath+'.'+item.toformat)) exists.push('.'+item.toformat);

                result.cmd.push(outPath+'.'+item.toformat);
                return result;
            }
            result.error = new Error(`输入的文件“${item.path}”无音频数据或者无法解析音频数据。`);
            result.error.code = 1;
            return result;
        }

        //尺寸
        if(w>0 && h>0){
            if(w%2 !== 0) w--;
            if(h%2 !== 0) h--;

            let filters = '[0:v]scale='+w+':'+h;
            //如果有水印
            if(item.logo && !item.series){
                //1...
                if(!utils.has(item.logo)){
                    result.error = new Error('输入文件“'+item.path+'”不存在，可能文件路径被更改或文件被删除。');
                    result.error.code = 1;
                    return result;
                }

                result.cmd.push('-i', item.logo);

                let lw = Math.round(item.logoSize/100 * w),
                    lh = Math.round(lw * item.logoScale),
                    lt = Math.round(item.logoY/100 * h),
                    ll = Math.round(item.logoX/100 * w),
                    st = item.logoEnd>item.logoStart ? item.logoStart-item.startTime : 0,
                    et = item.logoEnd>item.logoStart ? item.logoEnd-item.startTime : 0;
                if(st > 0) ll = 'if(gte(t,'+Math.round(st)+'),'+ll+',NAN)';
                if(st > 0 && et > 0) lt = 'if(lte(t,'+Math.round(et)+'),'+lt+',NAN)';
                filters += '[media];[1:v]scale='+lw+':'+lh+'[logo];[media][logo]overlay=\''+ll+'\':\''+lt+'\'';
            }
            result.cmd.push('-filter_complex', filters);
        }

        //如果输出视频
        if(item.totype === 'video'){
            if(item.type === 'video'){
                if(bitv) result.cmd.push('-vb', bitv+'k');
            }
            if(item.type !== 'image'){
                if(bita) result.cmd.push('-ab', bita+'k');
            }
            if(item.type !== 'audio') result.cmd.push('-pix_fmt', 'yuv420p');

            if(item.split){
                if(item.vchannel) result.cmd.push('-map', item.vchannel);

                result.cmd.push(outPath+'.'+item.toformat);

                if(item.achannel){
                    if(item.aclayout > 1){
                        //2...
                        if(utils.has(outPath+'_left.mp3')) exists.push('_left.mp3');
                        if(utils.has(outPath+'_right.mp3')) exists.push('_right.mp3');
                        result.cmd.push('-map_channel', item.achannel.replace(':','.')+'.0', outPath+'_left.mp3', '-map_channel', item.achannel.replace(':','.')+'.1', outPath+'_right.mp3');
                    }else{
                        //2...
                        if(utils.has(outPath+'.'+item.toformat)) exists.push('.mp3');
                        result.cmd.push('-map', item.achannel, outPath+'.mp3');
                    }
                }
            }else{
                //2...
                if(utils.has(outPath+'.'+item.toformat)) exists.push('.'+item.toformat);
                result.cmd.push(outPath +'.'+ item.toformat);
            }
        }
        
        //如果输出图片
        if(item.totype === 'image'){
            //2...
            if(utils.has(outPath+'.'+item.toformat)) exists.push('.'+item.toformat);
            result.cmd.push(outPath +'.'+ item.toformat);
        }

        //如果有预览图
        if(item.cover && !item.series){
            w = item.coverWidth;
            h = Math.round(w * item.scale);
            if(w%2 !== 0) w--;
            if(h%2 !== 0) h--;

            result.cmd.push('-map', item.vchannel);
            if(item.coverTime > 0) result.cmd.push('-ss', item.coverTime - item.startTime);
            if(item.duration > 0) result.cmd.push('-vframes', 1);
            //2...
            if(utils.has(outPath+'.'+item.toformat)) exists.push('_thumb.jpg');
            result.cmd.push('-s', w+'x'+h, outPath+'_thumb.jpg');
        }

        //如果文件已存在，枚举所有
        if(exists.length){
            let i = 0, len = exists.length, msg = '<p><b>输出的以下文件已存在：</b></p><ol>';
            for(; i<len; i++){
                msg += `<li>${outPath+exists[i]}</li>`;
            }
            msg += '</ol>';
            result.error = new Error(msg);
            result.error.code = 2;
        }
        exists = null;
        return result;
    },
    convert(o){
        let self = this,
            line,
            ffmpeg;

        if(!o.cammand) return;
        if(!o.cammand.length) return;

        o.cammand.unshift('-hide_banner','-y');

        ffmpeg = childprocess.spawn(config.ffmpegPath, o.cammand);
        ffmpeg.stderr.on('data', (stderr)=>{
            line = stderr.toString().trim();
            if(o.progress){
                line = /time=\s*([\d\:\.]+)?/.exec(line);
                if(line) o.progress( utils.timemat(line[1]) / 1000 );
            }
        });
        ffmpeg.once('close', (a, b)=>{
            self.ffmpeg = null;
            if(o.complete) o.complete(a, b);
        });
        ffmpeg.once('error', (err)=>{
            self.ffmpeg = null;
            if(o.complete) o.complete(2, '启动失败 '+err);
        });
        self.ffmpeg = ffmpeg;
    }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const win = nw.Window.get(),
config = __webpack_require__(1),
{spawn} = __webpack_require__(2),
utils = __webpack_require__(0);

const capture = {
	ffmpeg: null,
	audioDevices(fn){
		if(typeof fn === 'function'){
			let lines, line, list, ffmpeg, error = null;

			list = [];

			ffmpeg = spawn(config.ffmpegPath, ['-hide_banner','-list_devices','true','-f','dshow','-i','dummy']);
			ffmpeg.stderr.on('data', (stderr)=>{
				lines += stderr.toString();
			});
			ffmpeg.once('exit', (a,b)=>{
				lines = lines.split(/\n+/);
				while(line = lines[0]){
					lines.splice(0,1);
					if(/DirectShow\s+audio\s+devices/i.test(line)) break;
				}
				while(line = lines[0]){
					lines.splice(0,1);
					if(/\[dshow[^\]]*?\]/i.test(line)){
						list.push( line.slice(line.indexOf('\"')+1, line.lastIndexOf('\"')) );
					}
				}
				if(!list.length){
					error = new Error('获取录音设备失败，当前计算机没有可用的录音设备或者未开启，请查看帮助文档。');
				}
				fn(error, list);
			});
			ffmpeg.once('error',(err)=>{
				if(!error) fn(err, list);
			});
			this.ffmpeg = ffmpeg;
		}
	},
	areaWin: null,
	setArea(initWidth, initHeight, fn){
		if(typeof fn !== 'function' || capture.areaWin !== null) return false;
		nw.Window.open('html/capture.html',{
			id: 'capture',
		    position: 'center',
		    transparent: true,
		    new_instance: false,
		    frame: false,
		    focus: true,
		    width: initWidth,
		    height: initHeight,
		    always_on_top: true
		}, (childWin)=>{
			capture.areaWin = childWin;
			let childDoc = childWin.window.document;
			let onEnter = (e)=>{
				//on Enter
				if(e.keyCode === 13){
					childDoc.removeEventListener('keyup',onEnter);
					fn(childWin.x, childWin.y, childWin.width, childWin.height);
					childWin.close();
					capture.areaWin = null;
				}
				//on Esc
				else if(e.keyCode === 27){
					childDoc.removeEventListener('keyup',onEnter);
					childWin.close();
					capture.areaWin = null;
					win.show();
				}
			}
			childDoc.addEventListener('keyup', onEnter);
			win.hide();
		});
	},
	progress: null,
	complete: null,
	shortcut: new nw.Shortcut({  
	    key: 'F2',
	    active : function(){
	        if(!capture.ffmpeg) return;
	        capture.end();
	        capture.back();
	    },  
	    failed : function(err){
	        if(!/Unable\s+to\s+unregister\s+the\s+hotkey/i.test(err.message)){
		        capture.end();
		        capture.back();
	        	utils.dialog.show = true;
	        	utils.dialog.body = '<p>无法使用F2停止录制，因为快捷与其他软件冲突。</p>';
	        }
	    }  
	}),
	go(){
		win.moveTo(-screen.width-50, 0);
		nw.App.registerGlobalHotKey(this.shortcut);
	},
	back(){
		win.focus();
		win.maximize();
		nw.App.unregisterGlobalHotKey(this.shortcut);
	},
	end(){
		if(this.ffmpeg){
			this.ffmpeg.stdin.end('q\n');
			this.ffmpeg = null;
		}
	},
	start(output, o){
		let ffmpeg, cammand, line, log, error, isComplete, sw, sh, w, h, scale, rw, rh;
		//删除日志文件
		try{
			utils.fs.unlinkSync(config.logPath);
		}catch(err){}
		error = null;
		isComplete = false;
		sw = screen.width;
		sh = screen.height;
		//如果是全屏
		if(o.mode === 0 || o.mode === 2) scale = sh / sw;
		//如果有视频
		if(o.mode !== 4){
			cammand = ['-hide_banner', '-r', o.fps, '-f','gdigrab', '-i', 'desktop', '-rtbufsize', '2048M', '-vcodec', 'libx264', '-b:v', o.bitv+'k', '-pix_fmt', 'yuv420p', '-profile:v', 'high','-y', output];
		}
		//如果有音频
		if(o.mode === 0 || o.mode === 1){
			cammand.splice(9, 0, '-f','dshow','-i','audio='+o.audioDevice, '-acodec', 'aac', '-b:a', o.bita+'k');
		}
		//如果不是全屏
		if(o.mode === 1 || o.mode === 3){
			w = o.width;
			h = o.height;
			scale = h / w;
			//不能超出屏幕
			if((w + o.x) > sw) w = sw - o.x;
			if((h + o.y) > sh) h = sh - o.y;
			//不能为单数
			if(w % 2 !== 0) w--;
			if(h % 2 !== 0) h--;

			cammand.splice(3, 0, '-offset_x', o.x,'-offset_y', o.y,'-video_size', w+'x'+h);
		}
		//缩放匹配宽度上限
		if(scale){
			rw = o.widthLimit;
			rh = Math.round(rw * scale);
			if(rw % 2 !== 0) rw--;
			if(rh % 2 !== 0) rh--;
			cammand.splice(cammand.length - 2, 0, '-s', rw+'x'+rh);
		}
		//如果只有音频
		if(o.mode === 4){
			cammand = ['-hide_banner', '-f', 'dshow', '-i', 'audio='+o.audioDevice, '-b:a', o.bita+'k', '-y', output];
		}
		checkOutput();
		function checkOutput(){
			utils.fs.access(output, (err)=>{
				if(!err){
					win.show();
					utils.dialog.show = true;
					utils.dialog.body = `<p>输出的文件：${output}已存在或不可访问，是否覆盖？</p>`;
					utils.dialog.setBtn('覆盖','重试','取消');
					utils.dialog.callback = function(code){
						
						if(code === 0){
							begin();
						}else if(code === 1){
							checkOutput();
						}
					}
				}else{
					begin();
				}
			});
		}
		function begin(){
			log = utils.fs.createWriteStream(config.logPath, {  
				flags: 'a',  
				encoding: 'utf-8',  
				mode: '0666'
			});

			capture.go();
			ffmpeg = spawn(config.ffmpegPath, cammand);
			ffmpeg.stderr.on('data', (stderr)=>{
				line = stderr.toString();
				if(typeof capture.progress === 'function' && (line = /time=\s*([\d\:\.]*?)\s+/i.exec(line)) ){
					capture.progress(line[1]);
				}
				log.write('<p>'+stderr.toString()+'</p>');
			});
			ffmpeg.once('close', (a, b)=>{
				if(a !== 0){
					error = new Error('<p>录制失败：</p><p>'+utils.fs.readFileSync(config.logPath,'utf-8')+'</p>');
					error.code = 1;
				}
				complete();
			});
			ffmpeg.once('error', ()=>{
				if(!error){
					error = new Error('<p>启动失败：</p><p>'+utils.fs.readFileSync(config.logPath,'utf-8')+'</p>');
					error.code = 2;
				}
				complete();
			});
			capture.ffmpeg = ffmpeg;
		}
		function complete(){
			capture.back();
			if(!isComplete && (typeof capture.complete === 'function')){
				capture.complete(error);
				isComplete = true;
			}
			log.end();
		}
	}
}

module.exports = capture;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = (o)=>{
	let docListener = document.addEventListener;
	docListener('keyup',function(e){
		if(e.ctrlKey){
			if(e.key == 'o'){
				o.inputEl.value = '';
				o.inputEl.click();
			}else if(e.key == 's'){
				o.inputEl.value = '';
				o.outputEl.click();
			}
		}
	});
	docListener('dragover', function(e){
		e.preventDefault();
	});
	docListener('drop', function(e){
		o.listItems(e.dataTransfer.files);
		e.preventDefault();
	});
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ })
/******/ ]);