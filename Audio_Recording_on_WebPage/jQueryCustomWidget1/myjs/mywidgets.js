
		$.widget("custom.myformular", {
            // default options
            options: {
                fileid :  0,
                url    : 'URL'
            },
            _create: function () {
            	var that = this;
            	
            	fileid = this.options.fileid;
            	$(this.element).append ("<b>Appended text</b>");
            	
            	var r=$('<input/>').attr({
                    type:  "button",
                    id:    "field",
                    value: fileid
                });
            	r.click (function () {
            		alert(that.options.fileid);
            		that.options.fileid ++;
            		r.attr('value', that.options.fileid);
            		}
            	)
                $(this.element).append(r);
            	
            },
		});


        $.widget("custom.mywidget", {
            // default options
            options: {
                myvalue: 0,
                letter : 'NIX'
            },
            _create: function () {
            	
            	
            	avalue = this.options.letter + this.options.myvalue.toString();
            	
                $(this.element).val(avalue);
                $(this.element).addClass("my-widget-input")
                
                this._on(this.element, {
                    "focus": function (event) {
                        // console.log({ event });
                        var input_position = $(event.target).offset();
                        var targetHeight = $(event.target).height() + 6;
                        var targetWidth = ($(event.target).width() - 2);

                        this._generateHtml();
                        // console.log({ input_position });
                        $("#my-widget").css({ //widget move
                            'top': (input_position.top + targetHeight) + 'px',
                            'left': (input_position.left) + 'px'
                        });
                        $("#my-widget").fadeIn();

                        $("#my-widget .my-widget-value").html(this.options.myvalue);
                    }
                });

                $(document).on("mousedown", this._hideWidget);

            },
            _generateHtml: function () {
                $("#my-widget").remove();
                $("body").append('<div id="my-widget">' +
                    '<button type="button" class="btn btn-info my-widget-minus">-</button>' +
                    '<p class="my-widget-value"></p>' +
                    '<button type="button" class="btn btn-info my-widget-plus">+</button>' +
                    '</div>'
                	);

                var that = this;
                // $("#my-widget .my-widget-plus").off("click");
                // $("#my-widget .my-widget-minus").off("click");

                $("#my-widget .my-widget-plus").on("click", function () {
                    that.options.myvalue++;
                    avalue = that.options.letter + that.options.myvalue.toString();
                    
                    $(that.element).val(avalue +'+');
                 // the control with +/-
                    $("#my-widget .my-widget-value").html(avalue);
                });

                $("#my-widget .my-widget-minus").on("click", function () {
                    that.options.myvalue--;
                    avalue = that.options.letter + that.options.myvalue.toString();
                    
                    $(that.element).val(avalue + '-');
                    // the control with +/-
                    $("#my-widget .my-widget-value").html(avalue);
                });
            },
            _hideWidget: function () {
                var $target = $(event.target);
                if (!$target.closest("#my-widget").length && !$target.hasClass("my-widget-input")) {
                    $("#my-widget").fadeOut();
                }
            },
            _setOption: function (key, value) {
                if (key === "value") {
                    value = this._constrain(value);
                }
                this._super(key, value);
            },
            _setOptions: function (options) {
                this._super(options);
                // this.refresh();
            },
        });