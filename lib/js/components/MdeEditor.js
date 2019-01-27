"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var draft_js_1 = require("draft-js");
var DraftUtil_1 = require("../util/DraftUtil");
var MarkdownUtil_1 = require("../util/MarkdownUtil");
var MdeEditor = /** @class */ (function (_super) {
    __extends(MdeEditor, _super);
    function MdeEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleOnChange = function (editorState) {
            var onChange = _this.props.onChange;
            onChange(editorState);
        };
        _this.handleTab = function (event) {
            event.preventDefault();
            var editorState = _this.props.editorState;
            var mdState = DraftUtil_1.getMarkdownStateFromDraftState(editorState);
            mdState = MarkdownUtil_1.addTab(mdState, event.shiftKey);
            var newDraftState = DraftUtil_1.buildNewDraftState(editorState, mdState);
            _this.handleOnChange(newDraftState);
        };
        return _this;
    }
    MdeEditor.prototype.render = function () {
        var _this = this;
        var _a = this.props, editorState = _a.editorState, className = _a.className, readOnly = _a.readOnly, draftEditorProps = _a.draftEditorProps, handleKeyCommand = _a.handleKeyCommand, height = _a.height;
        return (React.createElement("div", { className: "mde-text " + (className || ""), style: { height: height } },
            React.createElement(draft_js_1.Editor, __assign({ ref: function (editor) { return (_this.editorRef = editor); }, stripPastedStyles: true, editorState: editorState, onChange: this.handleOnChange, onTab: this.handleTab, handleKeyCommand: handleKeyCommand, readOnly: readOnly }, draftEditorProps))));
    };
    return MdeEditor;
}(React.Component));
exports.MdeEditor = MdeEditor;
