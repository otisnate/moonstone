enyo.kind({
	name: "LiveMenu.PanelEx",
	kind: "moon.Panel",
	title: "Second Panel aaa bbb ccc",
	headerOptions: {
		kind: "moon.Header",
		marqueeOnRender: false,
		// inputModeChanged: function() {
		// 	this.$.title.canGenerate = !this.inputMode;
		// 	this.$.title.setShowing(!this.inputMode);
		// 	this.$.inputDecorator.canGenerate = this.inputMode;
		// 	this.$.inputDecorator.setShowing(this.inputMode);

		// 	if (!this.inputMode) {
		// 		if (!this.$.title.hasNode()) {
		// 			this.$.title.render();
		// 		}
		// 		else {
		// 			// Reset marquees when coming back to static text
		// 			this.stopMarquee();
		// 			this.startMarquee();
		// 		}
		// 	}
		// 	if (this.inputMode && !this.$.inputDecorator.hasNode()) {
		// 		this.$.inputDecorator.render();
		// 	}
		// 	this.addRemoveClass("moon-input-header", this.inputMode);
		// }
	},
	components: [
		{kind: "moon.Item", content: "Item One"},
		{kind: "moon.Item", content: "Item Two"},
		{
			name: "gridList", fit: true, spacing: 20, minWidth: 180, minHeight: 270,
			kind: "moon.DataGridList",
			controlsPerPage: 10,
			components: [{
				kind: "moon.GridListImageItem",
				bindings: [
					{from: ".model.text", to: ".caption"},
					{from: ".model.subText", to: ".subCaption"},
					{from: ".model.url", to: ".source"}
				]
			}]
		}
	],
	bindings: [
		{from: ".collection", to: ".$.gridList.collection"}
	],
	create: function () {
		this.inherited(arguments);
		this.set("collection", new enyo.Collection(this.generateRecords()));
	},
	rendered: function() {
		this.inherited(arguments);
		// this.set("collection", new enyo.Collection(this.generateRecords()));
	},
	transitionFinished: function(inInfo) {
		this.inherited(arguments);

		// if(!this.flag) {
		// 	this.set("collection", new enyo.Collection(this.generateRecords()));
		// 	console.log("transitionFinished", this);
		// 	this.$.header.startMarquee();
		// 	this.flag = true;
		// }
	},
	generateRecords: function () {
		var records = [],
			idx     = this.index || 0;
		for (; records.length < 100; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			var subTitle = (idx % 8 === 0) ? "Lorem ipsum dolor sit amet" : "Subtitle";
			records.push({
				text: "Item " + idx + title,
				subText: subTitle,
				url: "http://placehold.it/300x300/" + Math.floor(Math.random()*0x1000000).toString(16) + "/ffffff&text=Image " + idx
			});
		}
		return records;
	}
});


enyo.kind({
	name: "LiveMenu.Main",
	kind: "moon.Panels",
	components: [
		{
			title: "First Panel", titleBelow:"Sub-title", subTitleBelow:"Sub-sub title", classes: "moon-7h",
			components: [
				{kind: "moon.Item", content: "Item One", ontap: "nextHandler"},
				{kind: "moon.Item", content: "Item Two", ontap: "nextHandler"},
				{kind: "moon.Item", content: "Item Three", ontap: "nextHandler"},
				{kind: "moon.Item", content: "Item Four", ontap: "nextHandler"},
				{kind: "moon.Item", content: "Item Five", ontap: "nextHandler"}
			]
		}
	],
	nextHandler: function(inSender, inEvent) {
		var oPanel = this.createComponent({
				name:"panel_2",
				kind: "LiveMenu.PanelEx"
			});
		// oPanel.getHeader().marqueeOnRender = false;
		oPanel.render();
		this.resized();
		this.setIndex(1);

		return true;
	}
});

enyo.kind({
    name: "moon.sample.AlwaysViewingPanelsSample",
    classes: "moon enyo-fit enyo-unselectable",
    components: [
        {name: "panels", kind: "LiveMenu.Main", pattern: "alwaysviewing", classes: "enyo-fit", useHandle: false}
	]
});