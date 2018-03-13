!function(e){function n(r){if(t[r])return t[r].exports;var o=t[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var t={};return n.m=e,n.c=t,n.p="",n(0)}([function(e,n,t){e.exports=t(1)},function(e,n,t){"use strict";function r(){c=s.getElapsedTime(),l=window.innerWidth,f=window.innerHeight,g.update(),m.render(),m.passes[1].uniforms.time.value=c,requestAnimationFrame(r)}var o=t(12),i=t(5),a=t(3),s=new THREE.Clock,c=(new THREE.TextureLoader,0),l=window.innerWidth,f=window.innerHeight,v={renderer:new THREE.WebGLRenderer,scene:new THREE.Scene,camera:new THREE.PerspectiveCamera(60,l/f,.1,1e3)},d=document.getElementsByTagName("body")[0];v.renderer.setClearColor(new THREE.Color(16777215),1),v.renderer.setPixelRatio(window.devicePixelRatio||1),d.appendChild(v.renderer.domElement),v.renderer.setSize(l,f);var u=o({noiseAlpha:.1,colors:["#000000","#000000"]});v.scene.add(u);var x=new THREE.AmbientLight(16777215,1);v.scene.add(x);var p=new THREE.DirectionalLight(16777215,1);v.scene.add(p),v.camera.position.z=1.5;var g=new i,h=new a(v),m=h.getComposer();r(),window.addEventListener("resize",function(){l=window.innerWidth,f=window.innerHeight,v.renderer.setSize(l,f),v.camera.aspect=l/f,v.camera.updateProjectionMatrix(),h.update(new THREE.Vector2(l,f))},!1)},function(e,n,t){"use strict";function r(e,n){var t=n.uuid;if(e[t])throw new Error("This material already has HMR set.");e[t]=n;var o=n.dispose;n.dispose=function(){return e[t]&&delete e[t],o.call(n)};var i=n.clone;n.clone=function(){var t=i.call(n);return r(e,t),t}}var o=t(4);e.exports.cache=function(e){var n;return o.__hmrShaderCache?n=o.__hmrShaderCache:(n={},Object.defineProperty(o,"__hmrShaderCache",{configurable:!0,enumerable:!1,writable:!1,value:n})),n[e]||(n[e]={}),n[e]},e.exports.enable=r,e.exports.update=function(e,n){console.log("[ThreeJS]","Patching shaders"),Object.keys(e).forEach(function(t){var r=e[t];r&&(r.setValues(n),r.needsUpdate=!0)})}},function(e,n,t){(function(n){"use strict";function r(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var o=function(){function e(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(n,t,r){return t&&e(n.prototype,t),r&&e(n,r),n}}(),i=t(2),a=(i.cache(n),t(7)(THREE)),s="#define GLSLIFY 1\nvarying vec2 vUv;\n\nvoid main() {\n    vUv = uv;\n    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",c='#ifdef GL_ES\nprecision highp float;\n#define GLSLIFY 1\n#endif\n//\n// GLSL textureless classic 2D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute(vec4 x)\n{\n  return mod289(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute(permute(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy = abs(gx) - 0.5 ;\n  vec4 tx = floor(gx + 0.5);\n  gx = gx - tx;\n\n  vec2 g00 = vec2(gx.x,gy.x);\n  vec2 g10 = vec2(gx.y,gy.y);\n  vec2 g01 = vec2(gx.z,gy.z);\n  vec2 g11 = vec2(gx.w,gy.w);\n\n  vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\nuniform float time;\nuniform vec2 resolution;\nuniform sampler2D tDiffuse;\nvarying vec2 vUv;\n\nvec3 hsv(float h, float s, float v){\n    vec4 t = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n    vec3 p = abs(fract(vec3(h) + t.xyz) * 6.0 - vec3(t.w));\n    return v * mix(vec3(t.x), clamp(p - vec3(t.x), 0.0, 1.0), s);\n}\n\nfloat orb(float light, vec2 p, vec2 translate){\n\tvec2 v = p - translate;\n\tfloat c = light / length(v);\n    return pow(c,2.0);\n}\n\nvoid main(){\n    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);\n    float t = time*0.5;\n    float o1 = orb(0.1, p, vec2(cos(t * 2.0) * 0.7, sin(t * 1.2) * 0.3));\n    float o2 = orb(0.1, p, vec2(cos(t * 1.5) * 1.2, sin(t * 1.5) * 0.5));\n    float o3 = orb(0.1, p, vec2(cos(t * 1.8) * 0.8, sin(t * 1.8) * 1.0));\n    float o4 = orb(0.2, p, vec2(cos(t * 1.2) * 0.7, sin(t * 1.2) * 0.0));\n    float o5 = orb(0.15, p, vec2(cos(t * 1.1) * 0.1, sin(t * 1.4) * 0.3));\n    float o6 = orb(0.17, p, vec2(cos(t * 1.4) * 0.3, sin(t * 1.1) * 1.0));\n    float o7 = orb(0.15, p, vec2(cos(t * 1.7) * 1.3, sin(t * 1.2) * 0.2));\n    float o8 = orb(0.2, p, vec2(cos(t * 1.1) * 0.1, sin(t * 1.1) * 0.1));\n    float o9 = orb(0.05, p, vec2(cos(t * 1.5) * 0.1, sin(t * 1.5) * 1.0));\n    float o10 = orb(0.1, p, vec2(cos(t * 1.5) * 1.4, sin(t * 1.5) * 0.1));\n    float o11 = orb(0.1, p, vec2(cos(t * 0.1) * 0.5, sin(t * 1.2) * 0.8));\n    float o12 = orb(0.2, p, vec2(cos(t * 1.1) * 1.3, sin(t * 1.1) * 0.5));\n    float o13 = orb(0.25, p, vec2(cos(t * 2.2) * 0.1, sin(t * 0.3) * 0.7));\n    float o14 = orb(0.15, p, vec2(cos(t * 0.6) * 1.2, sin(t * 1.8) * 0.5));\n    float o15 = orb(0.27, p, vec2(cos(t * 1.7) * 0.5, sin(t * 1.5) * 1.0));\n    float o16 = orb(0.05, p, vec2(cos(t * 1.2) * 0.4, sin(t * 0.5) * 0.9));\n    float o17 = orb(0.2, p, vec2(cos(t * 1.1) * 1.4, sin(t * 0.2) * 0.1));\n    float o18 = orb(0.05, p, vec2(cos(t * 1.5) * 1.1, sin(t * 1.7) * 0.2));\n\n    \n\tvec3 destColor = vec3(0.0);\n    destColor += o1 ;\n    destColor += o2 ;\n    destColor += o3 ;\n    destColor += o4 ;\n    destColor += o5 ;\n    destColor += o6 ;\n    destColor += o7 ;\n    destColor += o8 ;\n    destColor += o9 ;\n    destColor += o10 ;\n    destColor += o11 ;\n    destColor += o12 ;\n    destColor += o13 ;\n    destColor += o14 ;\n    destColor += o15 ;\n    destColor += o16 ;\n    destColor += o17 ;\n    destColor += o18  ;\n    destColor = vec3(pow(destColor.r,5.0),pow(destColor.g,5.0),pow(destColor.b,5.0));\n\n    float scanLine =abs(sin(p.y * 400.0)) * 0.1;\n    vec3 color = hsv(sin(t*0.05),1.0,1.0);\n    destColor = destColor * color;\n\n   gl_FragColor = vec4(vec3(destColor) + scanLine , 1.0);\n}',l=window.innerWidth,f=window.innerHeight,v=void 0,d=window.devicePixelRatio;e.exports=function(){function e(n){r(this,e),v=new a(n.renderer),v.addPass(new a.RenderPass(n.scene,n.camera));var t={uniforms:{tDiffuse:{type:"t",value:null},resolution:{type:"v2",value:new THREE.Vector2(l*d,f*d)},time:{type:"f",value:0}},vertexShader:s,fragmentShader:c},o=new a.ShaderPass(t);o.renderToScreen=!0,v.addPass(o)}return o(e,[{key:"getComposer",value:function(){return v}},{key:"update",value:function(e){}}]),e}()}).call(n,"src/js/posteffect.js")},function(e,n){(function(n){var t;t="undefined"!=typeof window?window:"undefined"!=typeof n?n:"undefined"!=typeof self?self:{},e.exports=t}).call(n,function(){return this}())},function(e,n,t){!function(n,t){e.exports=t()}(this,function(){var e=function(){function n(e){return o.appendChild(e.dom),e}function t(e){for(var n=0;n<o.children.length;n++)o.children[n].style.display=n===e?"block":"none";r=e}var r=0,o=document.createElement("div");o.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",o.addEventListener("click",function(e){e.preventDefault(),t(++r%o.children.length)},!1);var i=(performance||Date).now(),a=i,s=0,c=n(new e.Panel("FPS","#0ff","#002")),l=n(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var f=n(new e.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:o,addPanel:n,showPanel:t,begin:function(){i=(performance||Date).now()},end:function(){s++;var e=(performance||Date).now();if(l.update(e-i,200),e>a+1e3&&(c.update(1e3*s/(e-a),100),a=e,s=0,f)){var n=performance.memory;f.update(n.usedJSHeapSize/1048576,n.jsHeapSizeLimit/1048576)}return e},update:function(){i=this.end()},domElement:o,setMode:t}};return e.Panel=function(e,n,t){var r=1/0,o=0,i=Math.round,a=i(window.devicePixelRatio||1),s=80*a,c=48*a,l=3*a,f=2*a,v=3*a,d=15*a,u=74*a,x=30*a,p=document.createElement("canvas");p.width=s,p.height=c,p.style.cssText="width:80px;height:48px";var g=p.getContext("2d");return g.font="bold "+9*a+"px Helvetica,Arial,sans-serif",g.textBaseline="top",g.fillStyle=t,g.fillRect(0,0,s,c),g.fillStyle=n,g.fillText(e,l,f),g.fillRect(v,d,u,x),g.fillStyle=t,g.globalAlpha=.9,g.fillRect(v,d,u,x),{dom:p,update:function(c,h){r=Math.min(r,c),o=Math.max(o,c),g.fillStyle=t,g.globalAlpha=1,g.fillRect(0,0,s,d),g.fillStyle=n,g.fillText(i(c)+" "+e+" ("+i(r)+"-"+i(o)+")",l,f),g.drawImage(p,v+a,d,u-a,x,v,d,u-a,x),g.fillRect(v+u-a,d,a,x),g.fillStyle=t,g.globalAlpha=.9,g.fillRect(v+u-a,d,a,i((1-c/h)*x))}}},e})},function(e,n){e.exports={uniforms:{tDiffuse:{type:"t",value:null},opacity:{type:"f",value:1}},vertexShader:["varying vec2 vUv;","void main() {","vUv = uv;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform float opacity;","uniform sampler2D tDiffuse;","varying vec2 vUv;","void main() {","vec4 texel = texture2D( tDiffuse, vUv );","gl_FragColor = opacity * texel;","}"].join("\n")}},function(e,n,t){e.exports=function(e){function n(n,t){if(this.renderer=n,void 0===t){var i=window.innerWidth||1,a=window.innerHeight||1,s={minFilter:e.LinearFilter,magFilter:e.LinearFilter,format:e.RGBFormat,stencilBuffer:!1};t=new e.WebGLRenderTarget(i,a,s)}this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.passes=[],this.copyPass=new o(r)}var r=n.CopyShader=t(6),o=(n.RenderPass=t(10)(e),n.ShaderPass=t(11)(e,n)),i=n.MaskPass=t(9)(e),a=n.ClearMaskPass=t(8)(e);return n.prototype={swapBuffers:function(){var e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e},addPass:function(e){this.passes.push(e)},insertPass:function(e,n){this.passes.splice(n,0,e)},render:function(e){this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2;var n,t,r=!1,o=this.passes.length;for(t=0;t<o;t++)if(n=this.passes[t],n.enabled){if(n.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),n.needsSwap){if(r){var s=this.renderer.context;s.stencilFunc(s.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),s.stencilFunc(s.EQUAL,1,4294967295)}this.swapBuffers()}n instanceof i?r=!0:n instanceof a&&(r=!1)}},reset:function(e){void 0===e&&(e=this.renderTarget1.clone(),e.width=window.innerWidth,e.height=window.innerHeight),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2},setSize:function(e,n){var t=this.renderTarget1.clone();t.width=e,t.height=n,this.reset(t)}},n.camera=new e.OrthographicCamera(-1,1,1,-1,0,1),n.quad=new e.Mesh(new e.PlaneGeometry(2,2),null),n.scene=new e.Scene,n.scene.add(n.quad),n}},function(e,n){e.exports=function(e){function n(){return this instanceof n?void(this.enabled=!0):new n(scene,camera)}return n.prototype={render:function(e,n,t,r){var o=e.context;o.disable(o.STENCIL_TEST)}},n}},function(e,n){e.exports=function(e){function n(e,t){return this instanceof n?(this.scene=e,this.camera=t,this.enabled=!0,this.clear=!0,this.needsSwap=!1,void(this.inverse=!1)):new n(e,t)}return n.prototype={render:function(e,n,t,r){var o=e.context;o.colorMask(!1,!1,!1,!1),o.depthMask(!1);var i,a;this.inverse?(i=0,a=1):(i=1,a=0),o.enable(o.STENCIL_TEST),o.stencilOp(o.REPLACE,o.REPLACE,o.REPLACE),o.stencilFunc(o.ALWAYS,i,4294967295),o.clearStencil(a),e.render(this.scene,this.camera,t,this.clear),e.render(this.scene,this.camera,n,this.clear),o.colorMask(!0,!0,!0,!0),o.depthMask(!0),o.stencilFunc(o.EQUAL,1,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP)}},n}},function(e,n){e.exports=function(e){function n(t,r,o,i,a){return this instanceof n?(this.scene=t,this.camera=r,this.overrideMaterial=o,this.clearColor=i,this.clearAlpha=void 0!==a?a:1,this.oldClearColor=new e.Color,this.oldClearAlpha=1,this.enabled=!0,this.clear=!0,void(this.needsSwap=!1)):new n(t,r,o,i,a)}return n.prototype={render:function(e,n,t,r){this.scene.overrideMaterial=this.overrideMaterial,this.clearColor&&(this.oldClearColor.copy(e.getClearColor()),this.oldClearAlpha=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),e.render(this.scene,this.camera,t,this.clear),this.clearColor&&e.setClearColor(this.oldClearColor,this.oldClearAlpha),this.scene.overrideMaterial=null}},n}},function(e,n){e.exports=function(e,n){function t(n,r){return this instanceof t?(this.textureID=void 0!==r?r:"tDiffuse",this.uniforms=e.UniformsUtils.clone(n.uniforms),this.material=new e.ShaderMaterial({uniforms:this.uniforms,vertexShader:n.vertexShader,fragmentShader:n.fragmentShader}),this.renderToScreen=!1,this.enabled=!0,this.needsSwap=!0,void(this.clear=!1)):new t(n,r)}return t.prototype={render:function(e,t,r,o){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r),n.quad.material=this.material,this.renderToScreen?e.render(n.scene,n.camera):e.render(n.scene,n.camera,t,this.clear)}},t}},function(e,n){function t(e){function n(e){if(e=e||{},Array.isArray(e.colors)){var n=e.colors.map(function(e){return"string"==typeof e||"number"==typeof e?new THREE.Color(e):e});a.uniforms.color1.value.copy(n[0]),a.uniforms.color2.value.copy(n[1])}if("number"==typeof e.aspect&&(a.uniforms.aspect.value=e.aspect),"number"==typeof e.grainScale&&(a.uniforms.grainScale.value=e.grainScale),"number"==typeof e.grainTime&&(a.uniforms.grainTime.value=e.grainTime),e.smooth){var r=t(e.smooth,THREE.Vector2);a.uniforms.smooth.value.copy(r)}if(e.offset){var o=t(e.offset,THREE.Vector2);a.uniforms.offset.value.copy(o)}if("number"==typeof e.noiseAlpha&&(a.uniforms.noiseAlpha.value=e.noiseAlpha),"undefined"!=typeof e.scale){var i=e.scale;"number"==typeof i&&(i=[i,i]),i=t(i,THREE.Vector2),a.uniforms.scale.value.copy(i)}"undefined"!=typeof e.aspectCorrection&&(a.uniforms.aspectCorrection.value=Boolean(e.aspectCorrection))}function t(e,n){return Array.isArray(e)?(new n).fromArray(e):e}e=e||{};var i=e.geometry||new THREE.PlaneGeometry(2,2,1),a=new THREE.RawShaderMaterial({vertexShader:r,fragmentShader:o,side:THREE.DoubleSide,uniforms:{aspectCorrection:{type:"i",value:!1},aspect:{type:"f",value:1},grainScale:{type:"f",value:.005},grainTime:{type:"f",value:0},noiseAlpha:{type:"f",value:.25},offset:{type:"v2",value:new THREE.Vector2(0,0)},scale:{type:"v2",value:new THREE.Vector2(1,1)},smooth:{type:"v2",value:new THREE.Vector2(0,1)},color1:{type:"c",value:new THREE.Color("#fff")},color2:{type:"c",value:new THREE.Color("#283844")}},depthTest:!1}),s=new THREE.Mesh(i,a);return s.frustumCulled=!1,s.style=n,e&&s.style(e),s}var r="#define GLSLIFY 1\nattribute vec3 position;\nuniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nvarying vec2 vUv;\nvoid main() {\n  gl_Position = vec4(position, 1.0);\n  vUv = vec2(position.x, position.y) * 0.5 + 0.5;\n}",o='precision mediump float;\n#define GLSLIFY 1\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1604150559(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1604150559(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1604150559(vec4 x)\n{\n  return mod289_1604150559(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1604150559(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade_1604150559(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise_1604150559(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289_1604150559(Pi0);\n  Pi1 = mod289_1604150559(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_1604150559(permute_1604150559(ix) + iy);\n  vec4 ixy0 = permute_1604150559(ixy + iz0);\n  vec4 ixy1 = permute_1604150559(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_1604150559(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_1604150559(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade_1604150559(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1117569599(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1117569599(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1117569599(vec4 x) {\n     return mod289_1117569599(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1117569599(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1117569599(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1117569599 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1117569599 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1117569599;\n  vec3 i1 = min( g_1117569599.xyz, l.zxy );\n  vec3 i2 = max( g_1117569599.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1117569599.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1117569599(i);\n  vec4 p = permute_1117569599( permute_1117569599( permute_1117569599(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1117569599.wyz - D_1117569599.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1117569599 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1117569599 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1117569599.xy,h.z);\n  vec3 p3 = vec3(a1_1117569599.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1117569599(vec4(dot(p0_1117569599,p0_1117569599), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1117569599 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1117569599,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\nfloat grain_2281831123(vec2 texCoord, vec2 resolution, float frame, float multiplier) {\n    vec2 mult = texCoord * resolution;\n    float offset = snoise_1117569599(vec3(mult / multiplier, frame));\n    float n1 = pnoise_1604150559(vec3(mult, offset), vec3(1.0/texCoord * resolution, 1.0));\n    return n1 / 2.0 + 0.5;\n}\n\nfloat grain_2281831123(vec2 texCoord, vec2 resolution, float frame) {\n    return grain_2281831123(texCoord, resolution, frame, 2.5);\n}\n\nfloat grain_2281831123(vec2 texCoord, vec2 resolution) {\n    return grain_2281831123(texCoord, resolution, 0.0);\n}\n\nvec3 blendSoftLight_1540259130(vec3 base, vec3 blend) {\n    return mix(\n        sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend), \n        2.0 * base * blend + base * base * (1.0 - 2.0 * blend), \n        step(base, vec3(0.5))\n    );\n}\n\n// Using conditionals\n// vec3 blendSoftLight(vec3 base, vec3 blend) {\n//     return vec3(\n//         ((blend.r < 0.5) ? (2.0 * base.r * blend.r + base.r * base.r * (1.0 - 2.0 * blend.r)) : (sqrt(base.r) * (2.0 * blend.r - 1.0) + 2.0 * base.r * (1.0 - blend.r))),\n//         ((blend.g < 0.5) ? (2.0 * base.g * blend.g + base.g * base.g * (1.0 - 2.0 * blend.g)) : (sqrt(base.g) * (2.0 * blend.g - 1.0) + 2.0 * base.g * (1.0 - blend.g))),\n//         ((blend.b < 0.5) ? (2.0 * base.b * blend.b + base.b * base.b * (1.0 - 2.0 * blend.b)) : (sqrt(base.b) * (2.0 * blend.b - 1.0) + 2.0 * base.b * (1.0 - blend.b)))\n//     );\n// }\n\nuniform vec3 color1;\nuniform vec3 color2;\nuniform float aspect;\nuniform vec2 offset;\nuniform vec2 scale;\nuniform float noiseAlpha;\nuniform bool aspectCorrection;\nuniform float grainScale;\nuniform float grainTime;\nuniform vec2 smooth;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec2 q = vec2(vUv - 0.5);\n  if (aspectCorrection) {\n    q.x *= aspect;\n  }\n  q /= scale;\n  q -= offset;\n  float dst = length(q);\n  dst = smoothstep(smooth.x, smooth.y, dst);\n  vec3 color = mix(color1, color2, dst);\n  \n  if (noiseAlpha > 0.0 && grainScale > 0.0) {\n    float gSize = 1.0 / grainScale;\n    float g = grain_2281831123(vUv, vec2(gSize * aspect, gSize), grainTime);\n    vec3 noiseColor = blendSoftLight_1540259130(color, vec3(g));\n    gl_FragColor.rgb = mix(color, noiseColor, noiseAlpha);\n  } else {\n    gl_FragColor.rgb = color;\n  }\n  gl_FragColor.a = 1.0;\n}';e.exports=t}]);