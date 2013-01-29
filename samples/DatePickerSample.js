enyo.kind({
	name: "moon.sample.DatePickerSample",
	style: "margin:20px;",
	classes: "moon enyo-unselectable",
	fit: true,
	handlers: {
		onChange: "changed"
	},
	components: [
		{kind: "moon.ExpandablePicker", noneText: "No Language Selected", autoCollapse: true, content: $L("Choose Locale"), classes: "moon-expandable-picker-wrapper", onChange:"pickerHandler", components: [
			{content: 'en_us', active:true},
			{content: 'en_ca'},
			{content: 'en_ie'},
			{content: 'en_gb'},
			{content: 'en_mx'},
			{content: 'de_de'},
			{content: 'fr_fr'},
			{content: 'fr_ca'},
			{content: 'it_it'},
			{content: 'es_es'},
			{content: 'es_mx'},
			{content: 'es_us'}																																																								
		]},	
		{kind: "enyo.Spotlight"},
		{kind: "moon.DatePicker", noneText: "Pick a Date", content: "Date", classes: "moon-date-picker-wrapper"},
		{name:"date", style:"font-size:0.35em;font-family:PreludeWGL Light"}
		/*
		{kind:"moon.IntegerPicker", name:"picker2", onChange:"changed", min:5, max:50},
		{kind:"moon.VerticalPicker", name:"picker0", onChange:"changed", components: [
			{content:"a"},
			{content:"b"},
			{content:"c"},
			{content:"d"},
			{content:"e"},
			{content:"f"}			
		]}
		*/
	],
	pickerHandler: function(inSender, inEvent){
		if (enyo.g11n) {
			this.$.datePicker.setLocale(inEvent.selected.content);
		}
		return true;
	},
	changed: function(inSender, inEvent) {
		if (this.$.date){
			this.$.date.setContent(inEvent.name + " changed to " + inEvent.value.toDateString());			
		}
	}
});