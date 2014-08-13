/*

Siesta 2.0.8
Copyright(c) 2009-2014 Bryntum AB
http://bryntum.com/contact
http://bryntum.com/products/siesta/license

*/
/**
@class Siesta.Role.CanStyleOutput
@private

A role, providing output coloring functionality

*/
Role('Siesta.Role.CanStyleOutput', {
    
    has         : {
        /**
         * @cfg {Boolean} disableColoring When set to `true` will disable the colors in the console output in automation launchers / NodeJS launcher
         */
        disableColoring : false,
        
        style               : {
            is          : 'rwc',
            lazy        : 'this.buildStyle'
        },
        
        styles              : { 
            init    : {
                'bold'      : [1, 22],
                'italic'    : [3, 23],
                'underline' : [4, 24],
                
                'black '    : [30, 39],
                'yellow'    : [33, 39],
                'cyan'      : [36, 39],
                'white'     : [37, 39],
                'green'     : [32, 39],
                'red'       : [31, 39],
                'grey'      : [90, 39],
                'blue'      : [34, 39],
                'magenta'   : [35, 39],
                
                'bgblack '  : [40, 49],
                'bgyellow'  : [43, 49],
                'bgcyan'    : [46, 49],
                'bgwhite'   : [47, 49],
                'bggreen'   : [42, 49],
                'bgred'     : [41, 49],
                'bggrey'    : [100, 49],
                'bgblue'    : [44, 49],
                'bgmagenta' : [45, 49],
                
                'inverse'   : [7, 27]
            }
        }
    },
    
    
    methods : {
        
        buildStyle : function () {
            var me          = this
            var style       = {}
            
            Joose.O.each(this.styles, function (value, name) {
                
                style[ name ] = function (text) { return me.styled(text, name) }
            })
            
            return style
        },
        
        
        styled : function (text, style) {
            if (this.disableColoring) return text
            
            var styles = this.styles
            
            return '\033[' + styles[ style ][ 0 ] + 'm' + text + '\033[' + styles[ style ][ 1 ] + 'm'
        }
    }
})
