Ext.define('SeaGrant_Proto.view.ListView', {
	extend: 'Ext.Panel',
	requires: ['Ext.form.FieldSet', 'Ext.TabPanel', 'Ext.dataview.List', 'Ext.MessageBox'],
    fullscreen: true,
    xtype: 'ListView',
	alias: 'widget.listview',
	config: {
		layout: {
			type: 'fit'
		},
		items: [
			{
				xtype: 'toolbar',
				title: 'List Page',
				itemId: 'listPageToolbar',
				docked: 'top',
				items: [
					{
						xtype: 'button',
						ui: 'action',
						text: 'back',
						itemId: 'backHomeButton'
					},
					{
						xtype: 'button',
						ui: 'action',
						text: 'Detail',
						itemId: 'detailButton'
					}
				]
			},			
			{
				config: {
					scrollable: {
						direction: 'verticle',
						directionLock: true
					}
				},
				xtype: 'list',
				store: 'Info',
				itemId: 'Lpagelist',
				loadingText: 'Loading Notes ...',
				emptyText: '</pre><div class="\&quot;notes-list-empty-text\&quot;">No notes found.</div><pre>',
				itemTpl: '</pre><div class="list-item-title">{title}</div><div class="list-item-Latlng">{Latlng}</div><pre>'
			},
			{
				xtype: 'SeaGrantMap',
				itemId: 'listmap'
			}			
		],
		listeners: [
			{
				delegate: '#backHomeButton',
				event: 'tap',
				fn: 'onBackButtonTap'
			},
			{
				delegate: '#detailButton',
				event: 'tap',
				fn: 'onDetailButtonTap'
			},
			{
				delegate: '#Lpagelist',
				event: 'itemtap',
				fn: 'onLpagelistDisclose'
			}
		]
	},
	onBackButtonTap: function(){
		console.log('onBackButtonTap');
		this.fireEvent('viewBackHomeCommand', this);
	},
	onDetailButtonTap: function(){
		console.log('onDetailButtonTap');
		this.fireEvent('viewDetailCommand', this);
	},
	onLpagelistDisclose: function(list, record, target, index, evt, options){
		console.log('viewLpageListItemCommand');
		this.fireEvent('viewLpageListItemCommand', this, record, index);
	}
});