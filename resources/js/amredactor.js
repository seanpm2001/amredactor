if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.amredactor = function() {
    return {
        /**
         * Undo, redo, source
         */
        addDefaultButtons: function() {
            var self = this,
                buttonRedo = this.button.addFirst('redo', 'Redo'),
                buttonUndo = this.button.addFirst('undo', 'Undo');

            this.button.addCallback( buttonRedo, this.buffer.redo );
            this.button.addCallback( buttonUndo, this.buffer.undo );

            if( self.amredactor.isAdmin() ) {
                var buttonHtml = this.button.addFirst('html', 'HTML');
                this.button.addCallback( buttonHtml, this.code.toggle );
            }
        },

        /**
         * Add styles dropdown
         */
        addStylesButton: function( classes ) {
            var self = this,
                dropdown = {},
                button = this.button.addBefore('bold', 'customstyles', 'Styles');

            jQuery.each(classes, function(ind, item) {
                dropdown[item.class] = { title: item.label, func: function() { self.amredactor.setStyle(item.class); }};
            });

            dropdown.remove = { title: 'Wis opmaak', func: self.amredactor.removeStyles };

            this.button.addDropdown(button, dropdown);
        },

        /**
         * Check if you are a admin. Used with the source button
         */
        isAdmin: function() {
            return $('#nav-settings').length
        },

        /**
         * Remove formatted styles
         */
        removeStyles: function() {
            this.inline.removeFormat();
        },

        /**
         * Add styles
         */
        setStyle: function(className) {
            this.inline.format('span', 'class', className);
        },

        /**
         * Init
         */
        init: function() {
            var self = this;

            self.amredactor.addDefaultButtons();

            /**
             * 'amredactorClasses' is set from the config of the plugin
             */
            if( Object.keys(window.amredactorClasses).length > 0 ) {
                self.amredactor.addStylesButton( window.amredactorClasses );
            }
        }
    }
};
