Ext.define('SeaGrant_Proto.view.Specific', {
	extend: 'Ext.form.Panel',
    fullscreen: true,
    xtype: 'Specific',
	alias: 'widget.specific',
	config: {
		items: [
			{
				xtype: 'toolbar',
				// title: 'Specific Page',
				itemId: 'specificPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
						itemId: 'backInfoButton'
					}
				]
			}
			
		],
		listeners: [
			{
				delegate: '#backInfoButton',
				event: 'tap',
				fn: 'onBackButtonTap'
			}
		]
	},
	onBackButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackInfoCommand', this);
	}
});