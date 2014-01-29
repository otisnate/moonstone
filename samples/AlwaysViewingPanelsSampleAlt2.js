enyo.kind({
	name: "moon.sample.GridListSample",
	kind: "moon.Panels",
	pattern: "activity",
	classes: "moon enyo-fit",
	index: 1,
	components: [
		{kind: "moon.Panel", classes:"moon-6h", title:"Menu", components: [
			{kind:"moon.Item", content:"Items-Per-Page:"},
			{kind: "moon.InputDecorator", components: [
				{kind: "moon.Input", name: "ippInput", placeholder: "Enter Items-Per-Page", dismissOnEnter:true, onchange:"handleChange"}
			]},
			{kind: "moon.Button", content:"Flipout!", ontap:"startFlippingOut"},
			// {kind:"moon.Item", content:"the"},
			// {kind:"moon.Item", content:"Grid List"},
			// {kind:"moon.Item", content:"to"},
			// {kind:"moon.Item", content:"the"},
			// {kind:"moon.Input", content:"Right!"}
		]},
		{kind: "moon.Panel", joinToPrev:true, title:"Grid List", headerComponents: [
			{kind: "moon.Button", content:"Reload", ontap:"reload"},
		], components: [
			{
				name: "flatHtmlHolder1",
				classes: "enyo-fittable-rows-layout moon-panel-body enyo-stretch",
				style: "height: 300px",
				allowHtml: true,
				// content: this.flatHtml()
			}
		]},
		{kind: "moon.Panel", title:"Grid List 2", headerComponents: [
			{kind: "moon.Button", content:"Reload", ontap:"reload"},
		], components: [
			{
				name: "flatHtmlHolder2",
				classes: "enyo-fittable-rows-layout moon-panel-body enyo-stretch",
				style: "height: 300px",
				allowHtml: true,
				// content: this.flatHtml()
			}
		]}
	],
	published: {
		itemsPerPanel: 2,
		flipPanelsContinuously: false,
		panelFlipsMax: 10,
		panelFlipsCount: 0
	},
	handlers: {
		// onPostTransitionComplete:	"customTransitionFinish"
		onTransitionFinish:	"customTransitionFinish"
	},
	customTransitionFinish: function(inSender, inEvent) {
		if (this.get("flipPanelsContinuously") && this.get("panelFlipsCount") < this.get("panelFlipsMax")) {
			if (inEvent.toIndex < inEvent.fromIndex) {
				console.log("We went back to previous panel", this.get("panelFlipsCount"));
				this.set("panelFlipsCount", this.get("panelFlipsCount") + 1);
				// this.finishTransition(true);
				this.next();
				// var self = this;
				// window.setTimeout( function() {self.next()}, 200 );
			}
			else if (inEvent.toIndex > inEvent.fromIndex) {
				console.log("We went ahead to next panel", this.get("panelFlipsCount"));
				this.set("panelFlipsCount", this.get("panelFlipsCount") + 1);
				// this.finishTransition(true);
				this.previous();
				// var self = this;
				// window.setTimeout( function() {self.previous()}, 200 );
			}
			else {
				// console.log("We reloaded the same panel at index: %s;", inEvent.toIndex);
			}
		}
		else if (this.get("flipPanelsContinuously")) {
			this.set("flipPanelsContinuously", false);
		}
		// this.finishTransition(true);
	},
	startFlippingOut: function() {
		this.set("panelFlipsCount", 0);
		this.set("flipPanelsContinuously", true);


		// this.setIndex(1);

		// var self = this;
		// window.setTimeout( function() { self.next() }, 1000);

		this.next();
		
		
		// var self = this,
		// 	timer = 0;
		// for (var i = 0; i < (this.get("panelFlipsMax")/2); i++) {
		// 	window.setTimeout( function(index,timing) {console.log("next",index,timing); self.next()}, timer, i,timer );
		// 	timer+= 400 + 500;
		// 	window.setTimeout( function(index,timing) {console.log("previous",index,timing); self.previous()}, timer, i,timer );
		// 	timer+= 500 + 500;
		// };
	},
	create: function () {
		this.inherited(arguments);
		// we set the collection that will fire the binding and add it to the list
		this.$.ippInput.set("value", this.get("itemsPerPanel"));
		this.itemsPerPanelChanged();
	},
	// handleInput: function(inSender, inEvent) {
	// 	this.set("itemsPerPanel", inSender.getValue());
	// },
	handleChange: function(inSender, inEvent) {
		this.set("itemsPerPanel", inSender.getValue());
	},
	reload: function() {
		window.location.reload()
	},
	itemsPerPanelChanged: function() {
		this.generateStaticDom();
	},
	generateStaticDom: function() {
		this.$.flatHtmlHolder1.set("content", this.flatHtml());
		this.$.flatHtmlHolder2.set("content", this.flatHtml());
	},
	flatHtml: function() {
		var strItems = "";
		for (var i = 0; i < this.get("itemsPerPanel"); i++) {
			strItems+= '<div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="0">                     <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">                        <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">                        <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item '+ i +'</div>                        <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>                     </div>                  </div>';
		};
		return '<div class="enyo-touch-strategy-container enyo-scroller enyo-list enyo-gridlist moon-gridlist enyo-fill" id="gridListSample_gridlist2">   <div style="display: none;" class="enyo-gridlist-dummy" id="gridListSample_gridlist2__dummy_"></div>   <div class="enyo-list-reorder-container" id="gridListSample_gridlist2_reorderContainer"></div>   <div class="moon-scroller-client-wrapper enyo-scrollee-fit v-scroll-enabled" id="gridListSample_gridlist2_strategy_clientContainer">      <div class="moon-scroller-viewport" id="gridListSample_gridlist2_strategy_viewport">         <div style="min-height: 100%; -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1);" class="enyo-touch-scroller matrix-scroll-client matrix3dsurface" id="gridListSample_gridlist2_strategy_client">            <div style="height: 8950px;" class="enyo-list-port enyo-border-box vertical" id="gridListSample_gridlist2_port">               <div class="enyo-list-holdingarea" id="gridListSample_gridlist2_holdingarea"></div>               <div class="enyo-list-page vertical" id="gridListSample_gridlist2_page0" style="top: 0px;">                  '+ strItems +'               </div>               <div class="enyo-list-page vertical" id="gridListSample_gridlist2_page1" style="top: 1078px;">               </div>               <div class="enyo-list-placeholder" id="gridListSample_gridlist2_placeholder"></div>               <div style="position: absolute; display: block; top: -1000px; left: 0;" id="gridListSample_gridlist2_swipeableComponents"></div>            </div>         </div>      </div>   </div>   <div class="moon-scroller-v-column v-scroll-enabled visible" id="gridListSample_gridlist2_strategy_vColumn">      <div class="moon-icon moon-icon-button moon-paging-button no-background small top moon-icon-arrowlargeup hover disabled" id="gridListSample_gridlist2_strategy_pageUpControl">         <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageUpControl_tapArea"></div>      </div>      <div class="moon-scroller-thumb-container moon-scroller-vthumb-container" id="gridListSample_gridlist2_strategy_vthumbContainer">         <div style="-webkit-transform: translateZ(0px) matrix3d(1, 0, 0, 0, 0, 3.1595092024539877, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1);" class="enyo-thumb moon-thumb matrix3dsurface moon-scroller-vthumb enyo-vthumb hidden" id="gridListSample_gridlist2_strategy_vthumb"></div>      </div>      <div class="moon-icon moon-icon-button moon-paging-button no-background small bottom moon-icon-arrowlargedown hover" id="gridListSample_gridlist2_strategy_pageDownControl">         <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageDownControl_tapArea"></div>      </div>   </div>   <div class="moon-scroller-h-column v-scroll-enabled visible" id="gridListSample_gridlist2_strategy_hColumn">      <div class="moon-icon moon-icon-button moon-paging-button no-background small left moon-icon-arrowlargeleft disabled hover" id="gridListSample_gridlist2_strategy_pageLeftControl">         <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageLeftControl_tapArea"></div>      </div>      <div class="moon-scroller-thumb-container moon-scroller-hthumb-container" id="gridListSample_gridlist2_strategy_hthumbContainer">         <div style="-webkit-transform: translateZ(0) ;" class="enyo-thumb moon-thumb matrix3dsurface moon-scroller-hthumb hidden enyo-hthumb" id="gridListSample_gridlist2_strategy_hthumb"></div>      </div>      <div class="moon-icon moon-icon-button moon-paging-button no-background small right moon-icon-arrowlargeright disabled hover" id="gridListSample_gridlist2_strategy_pageRightControl">         <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageRightControl_tapArea"></div>      </div>   </div></div>';
	},
// 	flatHtml2: function() {
// 		return '<div class="enyo-touch-strategy-container enyo-scroller enyo-list enyo-gridlist moon-gridlist enyo-fill" id="gridListSample_gridlist2">
//    <div style="display: none;" class="enyo-gridlist-dummy" id="gridListSample_gridlist2__dummy_"></div>
//    <div class="enyo-list-reorder-container" id="gridListSample_gridlist2_reorderContainer"></div>
//    <div class="moon-scroller-client-wrapper enyo-scrollee-fit v-scroll-enabled" id="gridListSample_gridlist2_strategy_clientContainer">
//       <div class="moon-scroller-viewport" id="gridListSample_gridlist2_strategy_viewport">
//          <div style="min-height: 100%; -webkit-transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1);" class="enyo-touch-scroller matrix-scroll-client matrix3dsurface" id="gridListSample_gridlist2_strategy_client">
//             <div style="height: 8950px;" class="enyo-list-port enyo-border-box vertical" id="gridListSample_gridlist2_port">
//                <div class="enyo-list-holdingarea" id="gridListSample_gridlist2_holdingarea"></div>
//                <div class="enyo-list-page vertical" id="gridListSample_gridlist2_page0" style="top: 0px;">
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="0">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 0</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="1">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 1</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="2">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 2</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="3">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 3</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="4">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 4</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="5">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 5</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="6">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 6</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="7">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 7</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="8">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 8</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="9">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 9</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="10">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 10</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="11">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 11</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                </div>
//                <div class="enyo-list-page vertical" id="gridListSample_gridlist2_page1" style="top: 1078px;">
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="12">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 12</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="13">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 13</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="14">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 14</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="15">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 15</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="16">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 16</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="17">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 17</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="18">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 18</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="19">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 19</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="20">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 20</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="21">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 21</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="22">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 22</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                   <div style="width: 18.667679837892603%; height: 276.375px; margin-top: 50px; margin-left: 50px; margin-right: 0px;" id="gridListSample_gridlist2_generator_client" class="enyo-gridlist-row" data-enyo-index="23">
//                      <div class="enyo-gridlist-imageitem moon-gridlist-item moon-gridlist-imageitem" id="gridListSample_aCompletelyDifferentThing">
//                         <img draggable="false" id="gridListSample_aCompletelyDifferentThing_image" src="./assets/default-music.png">
//                         <div class="moon-marquee caption" id="gridListSample_aCompletelyDifferentThing_caption">Item 23</div>
//                         <div class="moon-marquee sub-caption" id="gridListSample_aCompletelyDifferentThing_subCaption">Sub Caption</div>
//                      </div>
//                   </div>
//                </div>
//                <div class="enyo-list-placeholder" id="gridListSample_gridlist2_placeholder"></div>
//                <div style="position: absolute; display: block; top: -1000px; left: 0;" id="gridListSample_gridlist2_swipeableComponents"></div>
//             </div>
//          </div>
//       </div>
//    </div>
//    <div class="moon-scroller-v-column v-scroll-enabled visible" id="gridListSample_gridlist2_strategy_vColumn">
//       <div class="moon-icon moon-icon-button moon-paging-button no-background small top moon-icon-arrowlargeup hover disabled" id="gridListSample_gridlist2_strategy_pageUpControl">
//          <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageUpControl_tapArea"></div>
//       </div>
//       <div class="moon-scroller-thumb-container moon-scroller-vthumb-container" id="gridListSample_gridlist2_strategy_vthumbContainer">
//          <div style="-webkit-transform: translateZ(0px) matrix3d(1, 0, 0, 0, 0, 3.1595092024539877, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1);" class="enyo-thumb moon-thumb matrix3dsurface moon-scroller-vthumb enyo-vthumb hidden" id="gridListSample_gridlist2_strategy_vthumb"></div>
//       </div>
//       <div class="moon-icon moon-icon-button moon-paging-button no-background small bottom moon-icon-arrowlargedown hover" id="gridListSample_gridlist2_strategy_pageDownControl">
//          <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageDownControl_tapArea"></div>
//       </div>
//    </div>
//    <div class="moon-scroller-h-column v-scroll-enabled visible" id="gridListSample_gridlist2_strategy_hColumn">
//       <div class="moon-icon moon-icon-button moon-paging-button no-background small left moon-icon-arrowlargeleft disabled hover" id="gridListSample_gridlist2_strategy_pageLeftControl">
//          <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageLeftControl_tapArea"></div>
//       </div>
//       <div class="moon-scroller-thumb-container moon-scroller-hthumb-container" id="gridListSample_gridlist2_strategy_hthumbContainer">
//          <div style="-webkit-transform: translateZ(0) ;" class="enyo-thumb moon-thumb matrix3dsurface moon-scroller-hthumb hidden enyo-hthumb" id="gridListSample_gridlist2_strategy_hthumb"></div>
//       </div>
//       <div class="moon-icon moon-icon-button moon-paging-button no-background small right moon-icon-arrowlargeright disabled hover" id="gridListSample_gridlist2_strategy_pageRightControl">
//          <div class="small-icon-tap-area" id="gridListSample_gridlist2_strategy_pageRightControl_tapArea"></div>
//       </div>
//    </div>
// </div>';
// 	}
});
