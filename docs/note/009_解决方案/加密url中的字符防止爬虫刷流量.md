---
slug: /note/encrypt-characters-in-url-to-prevent-spiders-from-scraping-traffic
title: 加密url中的字符防止爬虫刷流量
---
```
<script>
  (function(_0x56975a,_0x417849){var _0x137845=_0xef1f,_0x3f79c8=_0x56975a();while(!![]){try{var _0x4d4dcd=-parseInt(_0x137845(0x1ec))/0x1*(-parseInt(_0x137845(0x1ee))/0x2)+parseInt(_0x137845(0x1e8))/0x3+-parseInt(_0x137845(0x1f1))/0x4+parseInt(_0x137845(0x1ed))/0x5*(-parseInt(_0x137845(0x1ef))/0x6)+parseInt(_0x137845(0x1eb))/0x7+parseInt(_0x137845(0x1e9))/0x8+-parseInt(_0x137845(0x1f0))/0x9;if(_0x4d4dcd===_0x417849)break;else _0x3f79c8['push'](_0x3f79c8['shift']());}catch(_0x325f7a){_0x3f79c8['push'](_0x3f79c8['shift']());}}}(_0x162b,0x6f9ee));function _de(_0x530724){var _0x54d99d=_0xef1f,_0x3ce235='';for(var _0x5d07f7=0x0;_0x5d07f7<_0x530724[_0x54d99d(0x1f2)];_0x5d07f7++){var _0x4bb4f1=_0x530724[_0x54d99d(0x1ea)](_0x5d07f7)-0x1;_0x3ce235+=String[_0x54d99d(0x1f3)](_0x4bb4f1);}return _0x3ce235;}function _0xef1f(_0x6ab01,_0x5317aa){var _0x162bf4=_0x162b();return _0xef1f=function(_0xef1f08,_0xe89886){_0xef1f08=_0xef1f08-0x1e8;var _0x44e8df=_0x162bf4[_0xef1f08];return _0x44e8df;},_0xef1f(_0x6ab01,_0x5317aa);}const bu=['i', 'u', 'u', 'q', 't', ';','0', '0', 'd', 'e', 'o', '.', 's', 'f', 'm', 'f', 'b', 't', 'f', '/', 'n', 'p', 'e', 'b', 'p', '/', 'd', 'd'];function _0x162b(){var _0x2a7ca8=['charCodeAt','827869KigCXq','99Wpvpvm','5cZxpps','7798DZxNjL','722934dOIbse','8177301BWkuwl','288360HCDjNN','length','fromCharCode','900834qFhRVM','6030560qjJAxg'];_0x162b=function(){return _0x2a7ca8;};return _0x162b();}

function encode(str) {
  return str.split('').map(char => 
      String.fromCharCode(char.charCodeAt(0) + 1)
  );
}
const url = 'https://cdn-release.modao.cc'
const code = encode(url)
console.log(code)
console.log(_de(code.join('')) === url)
</script>
```

