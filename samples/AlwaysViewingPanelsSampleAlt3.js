enyo.kind({
	name: "moon.sample.GridListSample",
	kind: "moon.Panels",
	pattern: "activity",
	classes: "moon enyo-fit",
	components: [
		{kind: "moon.Panel", classes:"moon-6h", title:"Menu", components: [
			{kind:"moon.Item", content:"Scroll"},
			{kind:"moon.Item", content:"the"},
			{kind:"moon.Item", content:"Grid List"},
			{kind:"moon.Item", content:"to"},
			{kind:"moon.Item", content:"the"},
			{kind:"moon.Item", content:"Right!"}
		]},
		{kind: "moon.Panel", joinToPrev:true, title:"Grid List", headerComponents: [
			{kind: "moon.Button", content:"Reload", ontap:"reload"},
		], components: [
			{
				name: "gridlist",
				kind: "moon.GridList",
				classes: "enyo-fill",
				onSetupItem: "setupItem",
				toggleSelected: true,
				itemWidth: 200,
				itemHeight: 300,
				itemSpacing: 50,
				components: [
					{name: "somethingElse", kind: "moon.GridListImageItem", ontap:"next"},
				]
			}
		]},
		{kind: "moon.Panel", title:"Grid List 2", headerComponents: [
			{kind: "moon.Button", content:"Reload", ontap:"reload"},
		], components: [
			{
				name: "gridlist2",
				kind: "moon.GridList",
				classes: "enyo-fill",
				onSetupItem: "setupItem2",
				toggleSelected: true,
				itemWidth: 200,
				itemHeight: 300,
				itemSpacing: 50,
				components: [
					{name: "aCompletelyDifferentThing", kind: "moon.GridListImageItem"}
				]
			}
		]}
	],
	published: {
		itemsPerPanel: 2
	},
	create: function () {
		this.inherited(arguments);
		// we set the collection that will fire the binding and add it to the list
		this.$.gridlist.show(this.get("itemsPerPanel"));
		this.$.gridlist2.show(this.get("itemsPerPanel"));
	},
	reload: function() {
		window.location.reload()
	},
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index;
		// console.log(inSender, inEvent);
		this.$.somethingElse.setSource("./assets/default-music.png");
		this.$.somethingElse.setCaption("Item " + i);
		this.$.somethingElse.setSubCaption("Sub Caption");
		this.$.somethingElse.setSelected(this.$.gridlist.isSelected(i));
	},
	setupItem2: function(inSender, inEvent) {
		var i = inEvent.index;
		// console.log(inSender, inEvent);
		this.$.aCompletelyDifferentThing.setSource("./assets/default-music.png");
		this.$.aCompletelyDifferentThing.setCaption("Item " + i);
		this.$.aCompletelyDifferentThing.setSubCaption("Sub Caption");
		this.$.aCompletelyDifferentThing.setSelected(this.$.gridlist.isSelected(i));
	}
});
