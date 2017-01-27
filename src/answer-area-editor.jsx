var React = require('react');
var Editor = require("./editor.jsx");
var InfoTip = require("react-components/js/info-tip.jsx");
var Widgets = require("./widgets.js");

var WidgetsInAnswerAreaEditor = ['Image'];

var AnswerAreaEditor = React.createClass({
    getDefaultProps: function() {
        return {
            type: "multiple",
            options: {},
            calculator: false
        };
    },

    getInitialState: function() {
      return {showSolutionArea: this.props.type === "radio" || this.props.type === "input-number"}
    },

    render: function() {
        var cls;
        if (this.props.type === "multiple") {
            cls = Editor;
        } else {
            cls = Widgets.getEditor(this.props.type);
        }

        var editor = cls(_.extend({
            ref: "editor",
            placeholder: "This answer area is being deprecated. " +
            "Please use the widgets in the question area for your answer.",
            onChange: (newProps, cb) => {
                var options = _.extend({}, this.props.options, newProps);
                this.props.onChange({options: options}, cb);
            }
        }, this.props.options));

        return <div className="perseus-answer-editor">
            <div className="perseus-answer-options">
                {this.state.showSolutionArea && <div className={cls !== Editor ? "perseus-answer-widget" : ""}>
                    {editor}
                </div>}
            </div>
        </div>;
    },

    getEditorInAnswerArea: function() {
        if (this.refs !== undefined) {
            return this.refs.editor;
        } else {
            return undefined;
        } 
    },

    toJSON: function(skipValidation) {
        // Could be just _.pick(this.props, "type", "options"); but validation!
        var editor = this.getEditorInAnswerArea();
        return {
            type: this.props.type,
            options: editor !== undefined ? this.refs.editor.toJSON(skipValidation) : {},
            calculator: this.props.calculator
        };
    }
});

module.exports = AnswerAreaEditor;
