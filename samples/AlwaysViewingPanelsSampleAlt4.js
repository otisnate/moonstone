enyo.kind({
	name: "moon.sample.DataGridListSample",
	kind: "moon.Panels",
	pattern: "activity",
	classes: "moon enyo-fit",
	components: [
		{kind: "moon.Panel", classes:"moon-6h", title:"Menu", components: [
			{kind:"moon.Item", content:"Scroll"},
			{kind:"moon.Item", content:"the"},
			{kind:"moon.Item", content:"Data Grid List"},
			{kind:"moon.Item", content:"to"},
			{kind:"moon.Item", content:"the"},
			{kind:"moon.Item", content:"Right!"}
		]},
		{kind: "moon.Panel", joinToPrev:true, title:"Data Grid List", headerComponents: [
			// {kind: "moon.ToggleButton", content:"Selection", name:"selectionToggle"},
			// {kind: "moon.ToggleButton", content:"MultiSelect", name:"multiSelectToggle"},
			// {kind: "moon.Button", content:"Refresh", ontap:"refreshItems"},
			{kind: "moon.Button", content:"Reload", ontap:"reload"},
			// {kind: "moon.ContextualPopupDecorator", components: [
			// 	{kind: "moon.ContextualPopupButton", content:"Popup List"},
			// 	{kind: "moon.ContextualPopup", classes:"moon-6h moon-8v", components: [
			// 		{kind:"moon.DataList", components: [
			// 			{kind:"moon.CheckboxItem", bindings: [
			// 				{from:".model.text", to:".content"}
			// 			]}
			// 		]}
			// 	]}
			// ]}
		], components: [
			{name: "gridList", renderDelay: 0, fit: true, spacing: 20, minWidth: 180, minHeight: 270, kind: "moon.DataGridList", components: [
				{ kind: "moon.sample.GridSampleItem", ontap:"next"}
			]}
		]},
		{kind: "moon.Panel", title:"Data Grid List", headerComponents: [
			// {kind: "moon.ToggleButton", content:"Selection", name:"selectionToggle2"},
			// {kind: "moon.ToggleButton", content:"MultiSelect", name:"multiSelectToggle2"},
			// {kind: "moon.Button", content:"Refresh", ontap:"refreshItems"},
			{kind: "moon.Button", content:"Reload", ontap:"reload"},
			// {kind: "moon.ContextualPopupDecorator", components: [
			// 	{kind: "moon.ContextualPopupButton", content:"Popup List"},
			// 	{kind: "moon.ContextualPopup", classes:"moon-6h moon-8v", components: [
			// 		{kind:"moon.DataList", components: [
			// 			{kind:"moon.CheckboxItem", bindings: [
			// 				{from:".model.text", to:".content"}
			// 			]}
			// 		]}
			// 	]}
			// ]}
		], components: [
			{name: "gridList2", renderDelay: 0, fit: true, spacing: 20, minWidth: 180, minHeight: 270, kind: "moon.DataGridList", components: [
				{ kind: "moon.sample.GridSampleItem" }
			]}
		]}
	],
	bindings: [
		{from: ".collection", to: ".$.gridList2.collection"},
		{from: ".collection", to: ".$.gridList.collection"},
		{from: ".$.selectionToggle.value", to:".$.gridList.selection"},
		{from: ".$.multiSelectToggle.value", to:".$.gridList.multipleSelection"},
		{from: ".$.selectionToggle2.value", to:".$.gridList2.selection"},
		{from: ".$.multiSelectToggle2.value", to:".$.gridList2.multipleSelection"}
	],
	create: function () {
		this.inherited(arguments);
		// we set the collection that will fire the binding and add it to the list
		this.set("collection", new enyo.Collection(this.generateRecords()));
	},
	reload: function() {
		window.location.reload()
	},
	generateRecords: function () {
		var records = [],
			idx     = this.index || 0;
		for (; records.length < 36; ++idx) {
			var title = (idx % 8 === 0) ? " with long title" : "";
			var subTitle = (idx % 8 === 0) ? "Lorem ipsum dolor sit amet" : "Subtitle";
			records.push({
				text: "Item " + idx + title,
				subText: subTitle,
				//url: "http://placehold.it/300x300/" + Math.floor(Math.random()*0x1000000).toString(16) + "/ffffff&text=Image " + idx
				url:"./assets/default-music.png"
			});
		}
		// update our internal index so it will always generate unique values
		//this.index = idx;
		return records;
	},
	refreshItems: function () {
		// we fetch our collection reference
		var collection = this.get("collection");
		// we now remove all of the current records from the collection
		collection.removeAll();
		// and we insert all new records that will update the list
		collection.add(this.generateRecords());
	}
});

enyo.kind({
	name: "moon.sample.GridSampleItem",
	kind: "moon.GridListImageItem",
	mixins: ["moon.SelectionOverlaySupport"],
	selectionOverlayVerticalOffset: 35,
	subCaption: "Sub Caption",
	bindings: [
		{from: ".model.text", to: ".caption"},
		{from: ".model.subText", to: ".subCaption"},
		{from: ".model.url", to: ".source"}
	]
});