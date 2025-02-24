'use strict';Object.defineProperty(exports,'__esModule',{value:true});var vuedarkmode=require('@growthbunker/vuedarkmode'),timeago_js=require('timeago.js');/**************************************************************************
 * MIXINS > THEME
 * @docs https://vuejs.org/v2/guide/mixins.html
 ***************************************************************************/

var ThemeMixin = {
  props: {
    theme: {
      type: String,
      default: null,
      validator: function validator(x) {
        return ["dark", "light"].includes(x)
      }
    }
  },

  computed: {
    computedTheme: function computedTheme() {
      if (this.theme) {
        return this.theme
      }

      return this.$gb.vuetimeline.theme
    }
  }
};//

var script = {
  components: {
    BaseBadge: vuedarkmode.BaseBadge,
    BaseNumber: vuedarkmode.BaseNumber
  },

  mixins: [ThemeMixin],

  props: {
    animation: {
      type: Boolean,
      default: true
    },
    animationContainer: {
      type: String,
      default: null
    },
    animationDuration: {
      type: Number,
      default: 1500
    },
    category: {
      type: String,
      default: null
    },
    color: {
      type: String,
      default: "blue",
      validator: function validator(x) {
        return ["black", "blue", "green", "orange", "purple", "red", "turquoise", "white"].includes(
          x
        )
      }
    },
    date: {
      type: Date,
      required: true
    },
    description: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      required: true
    },
    isLast: {
      type: Boolean,
      default: false
    },
    thumbnail: {
      type: String,
      default: null
    },
    title: {
      type: String,
      required: true
    }
  },

  computed: {
    ago: function ago() {
      return timeago_js.format(this.date)
    }
  },

  mounted: function mounted() {
    if (this.animation) {
      var ScrollReveal = require("scrollreveal").default;

      ScrollReveal().reveal(this.$el, {
        container: this.animationContainer,
        duration: this.animationDuration
      });
    }
  },

  methods: {
    // --> EVENT LISTENERS <--

    onContentClick: function onContentClick(event) {
      this.$emit("click", event);
    },

    onThumbnailClick: function onThumbnailClick(event) {
      this.$emit("click:thumbnail", event);
    },

    onTitleClick: function onTitleClick(event) {
      this.$emit("click:title", event);
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}function createInjectorSSR(context) {
    if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
    }
    if (!context)
        { return function () { }; }
    if (!('styles' in context)) {
        context._styles = context._styles || {};
        Object.defineProperty(context, 'styles', {
            enumerable: true,
            get: function () { return context._renderStyles(context._styles); }
        });
        context._renderStyles = context._renderStyles || renderStyles;
    }
    return function (id, style) { return addStyle(id, style, context); };
}
function addStyle(id, css, context) {
    var group =  css.media || 'default' ;
    var style = context._styles[group] || (context._styles[group] = { ids: [], css: '' });
    if (!style.ids.includes(id)) {
        style.media = css.media;
        style.ids.push(id);
        var code = css.source;
        style.css += code + '\n';
    }
}
function renderStyles(styles) {
    var css = '';
    for (var key in styles) {
        var style = styles[key];
        css +=
            '<style data-vue-ssr-id="' +
                Array.from(style.ids).join(' ') +
                '"' +
                (style.media ? ' media="' + style.media + '"' : '') +
                '>' +
                style.css +
                '</style>';
    }
    return css;
}/* script */
var __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{class:[
    "gb-vue-timeline-update",
    "gb-vue-timeline-update--" + _vm.computedTheme,
    "js-vue-timeline-update",
    {
      "gb-vue-timeline-update--is-last": _vm.isLast
    }
  ]},[_vm._ssrNode("<div class=\"gb-vue-timeline-update__left\"><span class=\"gb-vue-timeline-update__ago\">"+_vm._ssrEscape(_vm._s(_vm.ago))+"</span></div>"),_vm._ssrNode("<div class=\"gb-vue-timeline-update__center\">","</div>",[_c('base-number',{staticClass:"gb-vue-timeline-update__bullet",attrs:{"color":_vm.color,"icon":_vm.icon,"theme":_vm.computedTheme,"icon-size":"16px","size":"small"}}),_vm._ssrNode("<span class=\"gb-vue-timeline-update__line\"></span>")],2),_vm._ssrNode("<div"+(_vm._ssrClass(null,[
      "gb-vue-timeline-update__right",
      {
        "gb-vue-timeline-update__right--clickable": _vm.$listeners.click
      }
    ]))+">","</div>",[_vm._ssrNode("<div class=\"gb-vue-timeline-update__information\">","</div>",[_vm._ssrNode("<div class=\"gb-vue-timeline-update__meta\">","</div>",[(_vm.category)?_c('base-badge',{staticClass:"gb-vue-timeline-update__category",attrs:{"color":_vm.color,"filled":true,"theme":_vm.computedTheme,"size":"small"}},[_vm._v(_vm._s(_vm.category))]):_vm._e(),_vm._ssrNode("<span class=\"gb-vue-timeline-update__ago\">"+_vm._ssrEscape(_vm._s(_vm.ago))+"</span>")],2),_vm._ssrNode("<h2"+(_vm._ssrClass(null,[
          "gb-vue-timeline-update__title",
          {
            "gb-vue-timeline-update__title--clickable": _vm.$listeners["click:title"]
          }
        ]))+">"+(_vm._s(_vm.title))+"</h2>")],2),_vm._ssrNode(((_vm.thumbnail)?("<img"+(_vm._ssrAttr("src",_vm.thumbnail))+(_vm._ssrClass(null,[
        "gb-vue-timeline-update__thumbnail",
        {
          "gb-vue-timeline-update__thumbnail--clickable": _vm.$listeners["click:thumbnail"]
        }
      ]))+">"):"<!---->")+((_vm.description)?("<p class=\"gb-vue-timeline-update__description\">"+(_vm._s(_vm.description))+"</p>"):"<!---->")),(_vm.$slots.default)?_vm._ssrNode("<div class=\"gb-vue-timeline-update__slot\">","</div>",[_vm._t("default")],2):_vm._e()],2)],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  var __vue_inject_styles__ = function (inject) {
    if (!inject) { return }
    inject("data-v-29e320da_0", { source: "@charset \"UTF-8\";.gb-vue-timeline-update{display:flex;overflow:hidden;text-align:left;font-family:Heebo,\"Helvetica Neue\",Source Sans Pro,Helvetica,Arial,sans-serif}.gb-vue-timeline-update a{text-decoration:underline}.gb-vue-timeline-update .gb-vue-timeline-update__left .gb-vue-timeline-update__ago,.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__ago{font-size:14px;user-select:none}.gb-vue-timeline-update .gb-vue-timeline-update__left{display:none}.gb-vue-timeline-update .gb-vue-timeline-update__center{position:relative;flex:0 0 auto;margin-right:30px;margin-left:16px}.gb-vue-timeline-update .gb-vue-timeline-update__center .gb-vue-timeline-update__bullet{position:absolute;top:0;left:50%;transform:translateX(-50%)}.gb-vue-timeline-update .gb-vue-timeline-update__center .gb-vue-timeline-update__line{display:inline-block;margin-top:32px;width:1px;height:100%}.gb-vue-timeline-update .gb-vue-timeline-update__right{flex:1;padding-bottom:40px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__description,.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__title{font-size:16px;line-height:26px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information{display:flex;flex-direction:column;margin-top:4px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__meta{display:flex;align-items:center;margin-bottom:10px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__meta .gb-vue-timeline-update__category{align-self:flex-start;flex:0 0 auto;margin-right:10px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__meta .gb-vue-timeline-update__ago{line-height:24px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__title{flex:1;margin:0 0 4px;text-transform:uppercase;font-weight:700}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__title--clickable{cursor:pointer}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__description{margin:0}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__thumbnail{box-sizing:border-box;margin:6px 0 12px;max-width:100%;border-width:1px;border-style:solid;border-radius:6px;transition:all 250ms linear;user-select:none}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__thumbnail--clickable{cursor:pointer}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__slot{margin-top:20px}.gb-vue-timeline-update .gb-vue-timeline-update__right--clickable{cursor:pointer}.gb-vue-timeline-update--is-last .gb-vue-timeline-update__right{padding-bottom:20px}.gb-vue-timeline-update--dark{color:#fff}.gb-vue-timeline-update--dark a{color:#fff}.gb-vue-timeline-update--dark .gb-vue-timeline-update__left .gb-vue-timeline-update__ago,.gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__ago{color:#a9c7df}.gb-vue-timeline-update--dark .gb-vue-timeline-update__center .gb-vue-timeline-update__bullet{box-shadow:0 1px 5px 0 #18191a}.gb-vue-timeline-update--dark .gb-vue-timeline-update__center .gb-vue-timeline-update__line{background-color:#313d4f}.gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__meta .gb-vue-timeline-update__category{box-shadow:0 1px 5px 0 #18191a}.gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__thumbnail{border-color:#fff;box-shadow:0 1px 5px 0 #18191a}.gb-vue-timeline-update--dark .gb-vue-timeline-update__right .gb-vue-timeline-update__description{color:#a9c7df}.gb-vue-timeline-update--dark.gb-vue-timeline-update--is-last .gb-vue-timeline-update__center .gb-vue-timeline-update__line{background:linear-gradient(#313d4f 50%,rgba(49,61,79,0))}.gb-vue-timeline-update--light{color:#2c405a}.gb-vue-timeline-update--light a{color:#2c405a}.gb-vue-timeline-update--light .gb-vue-timeline-update__left .gb-vue-timeline-update__ago,.gb-vue-timeline-update--light .gb-vue-timeline-update__right .gb-vue-timeline-update__ago{color:#556c8d}.gb-vue-timeline-update--light .gb-vue-timeline-update__center .gb-vue-timeline-update__bullet{box-shadow:0 1px 5px 0 #eaf6ff}.gb-vue-timeline-update--light .gb-vue-timeline-update__center .gb-vue-timeline-update__line{background-color:#c5d9e8}.gb-vue-timeline-update--light .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__meta .gb-vue-timeline-update__category{box-shadow:0 1px 5px 0 #eaf6ff}.gb-vue-timeline-update--light .gb-vue-timeline-update__right .gb-vue-timeline-update__thumbnail{border-color:#3f536e;box-shadow:0 1px 5px 0 #eaf6ff}.gb-vue-timeline-update--light .gb-vue-timeline-update__right .gb-vue-timeline-update__description{color:#556c8d}.gb-vue-timeline-update--light.gb-vue-timeline-update--is-last .gb-vue-timeline-update__center .gb-vue-timeline-update__line{background:linear-gradient(#c5d9e8 50%,rgba(197,217,232,0))}@media (min-width:48em){.gb-vue-timeline-update .gb-vue-timeline-update__left{display:block;flex:0 0 auto;width:120px;text-align:right}.gb-vue-timeline-update .gb-vue-timeline-update__left .gb-vue-timeline-update__ago{display:inline-block;line-height:32px}.gb-vue-timeline-update .gb-vue-timeline-update__center{margin-right:40px;margin-left:40px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__description,.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__title{font-size:18px;line-height:28px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information{flex-direction:row}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__meta .gb-vue-timeline-update__ago{display:none}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__information .gb-vue-timeline-update__title{margin-bottom:8px}.gb-vue-timeline-update .gb-vue-timeline-update__right .gb-vue-timeline-update__thumbnail{margin:8px 0 16px}}", map: undefined, media: undefined });

  };
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = "data-v-29e320da";
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject shadow dom */
  

  
  var __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    createInjectorSSR,
    undefined
  );/**************************************************************************
 * IMPORTS
 ***************************************************************************/

/**************************************************************************
 * ENVIRONMENT CONFIGURATIONS
 ***************************************************************************/

// install function executed by Vue.use()
function install(Vue, options) {
  if (install.installed) {
    return
  } else {
    install.installed = true;
  }

  // Declare the component
  Vue.component("vue-timeline-update", __vue_component__);

  // Configure the theme to use (dark will always be the default theme)
  if (!Vue.prototype.$gb) {
    Vue.prototype.$gb = {};
  }

  Vue.prototype.$gb.vuetimeline = {};
  Vue.prototype.$gb.vuetimeline.theme = (options || {}).theme || "dark";
}

// Create module definition for Vue.use()
var plugin = {
  install: install
};

// To auto-install when vue is found
/* global window global */
var GlobalVue = null;

if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}exports.default=plugin;