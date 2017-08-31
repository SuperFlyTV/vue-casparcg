import casparcgCss from './casparcg.css'

export default {
    globalFunctions: {
        play: function (){
        },
        stop: function () {
        },
        next: function () {
        },
        update: function () {
        },
        invoke: function () {
            return ''
        },
        description: function () {
            return ''
        },
        template_host_info: function () {
            return ''
        }
    },
    onIframeMessage: function(message){
        if(message.data.functionName){
            var functionName = message.data.functionName
            delete message.data.functionName
            if(global.hasOwnProperty(functionName) && typeof global[functionName] === 'function') {
                global[functionName].call(global, message.data)
            }
        }
    },
    casparComponent: {
        created: function () {
            this.inAnimation = new TimelineMax()
            this.ouAnimation = new TimelineMax()
            this.inAnimationContent = new TimelineMax()
            this.ouAnimationContent = new TimelineMax()
        },
        props: [
            'isPreview'
        ],
        methods: {
            beforeEnter: function (el) {},
            enter: function (el, done) { done() },
            afterEnter: function (el) {},
            enterCancelled: function (el) { this.inAnimation.pause() },
            beforeLeave: function (el) {},
            leave: function (el, done) { done() },
            afterLeave: function (el) {},
            leaveCancelled: function (el) { this.outAnimation.pause() }
        }
    },
    css: casparcgCss,
    install: function(Vue, otptions) {
        global.play = Vue.play = this.globalFunctions.play
        global.stop = Vue.stop = this.globalFunctions.stop
        global.next = Vue.next = this.globalFunctions.next
        global.update = Vue.update = this.globalFunctions.update
        global.invoke = Vue.invoke = this.globalFunctions.invoke
        global.description = Vue.description = this.globalFunctions.description
        global.template_host_info = Vue.template_host_info = this.globalFunctions.template_host_info
        window.onmessage = this.onIframeMessage
    }
}