enyo.kind({
	name: "moon.CalendarDate",
	kind: "enyo.Button",
	classes: "moon-calendar-date",
	spotlight: true,
	events: {
		ontap: ""
	},
	published: {
		month: undefined,
	}
});

enyo.kind({
	name: "moon.CalendarWeek",
	published: {
		months: [],
		days: [],
	},
	components: [
		{name:"repeater", kind: "enyo.FlyweightRepeater", clientClasses: "moon-calendar-week", onSetupItem: "setupItem", count: 7, components: [
			{name: "item", kind: "moon.CalendarDate"}
		]},
	],
	setupItem: function(inSender, inEvent) {
		var index = inEvent.index;
		this.$.item.setMonth(this.months[index]);
		this.$.item.setContent(this.days[index]);

	},
});
		
enyo.kind({
	name: "moon.Calendar",
	classes: "moon-calendar",
	events: {
		/**
			Fires when the date changes.

			_inEvent.name_ contains the name of this control.
			_inEvent.value_ contains the current Date object (standard JS Date object).
		*/
		onChange: ""
	},
	handlers: {
		ontap: "doTap" //*onChange events coming from consituent controls (hour)
	},
	published: {
		//* Text to be displayed in the _currentValue_ control if no item is currently selected.
		noneText: "",
		/**
			Current locale used for formatting. Can be set after control
			creation, in which case the control will be updated to reflect the
			new value.
		*/
		locale: "en_us",
		/**
			The current Date object. When a Date object is passed to _setValue_,
			the control is updated to reflect the new value. _getValue_ returns
			a Date object.
		*/
		value: new Date(),
		/**
			The maximum number of weeks to display in a screen.
		*/
		maxWeeks: 5,
		months: [],
		days: ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
		dateArray: []
	},
	components: [
		{name: "date", kind: "moon.DatePicker"},
		{kind: 'enyo.Spotlight'},
		{name:"repeater", kind: "enyo.FlyweightRepeater", clientClasses: "moon-calendar-week", onSetupItem: "setupDays", count: 7, components: [
			{name: "day", classes: "moon-calendar-date"}
		]},
	],
	create: function() {
		this.inherited(arguments);
		if (enyo.g11n) {
			this.locale = enyo.g11n.currentLocale().getLocale();
		}
		this.initDefaults();
	//	this.noneTextChanged();
	},
	initDefaults: function() {
		//Attempt to use the g11n lib (ie assume it is loaded)
		if (enyo.g11n) {
			this._tf = new enyo.g11n.Fmts({locale:this.locale});
		}

		this.value = this.value || new Date();
		this.setupCalendar(this._tf ? this._tf.getTimeFieldOrder() : 'hma');
		this.valueChanged();
	},
	/**
		Set days from the first day to the last day.
		Initially, SUN is the first day and SAT is the last day.
	*/
	setupDays: function(inSender, inEvent) {
		var index = inEvent.index;
		this.$.day.setContent(this.days[index]);
	},
	/**
		Set the first week of this month.
		Before the first day of this month, some days from previous month will fill calendar
	*/
	setupFirstWeek: function() {
		var dt = new Date();
		dt.setDate(0);
		var daysOfPrevMonth = dt.getDate(),
			dayOfLastDate = dt.getDay(),
			prevMonth = dt.getMonth();
		var firstDateOfWeek = daysOfPrevMonth - dayOfLastDate;
		if (dayOfLastDate != 0) {
			//var dateArray = [];
			for (var i = firstDateOfWeek; i <= daysOfPrevMonth; i++) {
				this.months.push(prevMonth);
				this.dateArray.push(i);
			}
		}
	},
	/**
		Set the last week of this month.
		After the last day of this month, some days from next month will fill calendar
	*/
	setupLastWeek: function(monthLength) {
		var dt = new Date();
		dt.setMonth(dt.getMonth() + 1);

		var nextMonth = dt.getMonth() + 1;
		var thisDate = dt.getDate();
		var offset = this.maxWeeks * 7 - this.dateArray.length + 1;
		for (var i = 1; i < offset; i++) {
			this.months.push(nextMonth);
			this.dateArray.push(i);
		}		
	},
	setupCalendar: function(ordering) {
		this.setupFirstWeek();
		var thisMonth = this.value.getMonth(),
			monthLength = this.monthLength(this.value.getFullYear(), this.value.getMonth());
		for (var i = 1; i <= monthLength; i++) {
			this.months.push(thisMonth);
			this.dateArray.push(i);
		}

		this.setupLastWeek(monthLength);
		this.fillDate();
	},
	fillDate: function() {
		for (var i = 0; i < this.dateArray.length / 7; i++) {
			var days = [],
				months = [];
			for (var j = 0; j < 7; j++) {
				months.push(this.months[i * 7 + j]);
				days.push(this.dateArray[i * 7 + j]);		
			}
			this.createComponent(
				{kind: "moon.CalendarWeek", days: days, months: months}
			)
		}
	},
	parseDate: function(ordering) {
	},
	updateCalendar: function(inSender, inEvent) {
		//* Avoid onChange events coming from itself
		if (inEvent && inEvent.originator == this) {
			return;
		}
		//* Make empty
		this.months = [];
		this.dateArray = [];

		return true;
	},
	monthLength: function(inYear, inMonth) {
		// determine number of days in a particular month/year
		return 32 - new Date(inYear, inMonth, 32).getDate();
	},
	doTap: function(inSender, inEvent) {
		if (inEvent.originator.kind == "moon.CalendarDate") {
			this.value.setDate(inEvent.originator.content);
		
			var month = inEvent.originator.month;
			if (month != this.value.getMonth() ) {
				this.value.setMonth(month);	
			}
			
			this.$.date.setValue(new Date(this.value.getFullYear(),
								this.value.getMonth(),
								this.value.getDate()));	
		}
		
		return true;
	},
	valueChanged: function(inOld) {

	},
	localeChanged: function() {
		this.refresh();
	},
	refresh: function(){
		this.destroyClientControls();
		this.initDefaults();
		this.render();
	}
});