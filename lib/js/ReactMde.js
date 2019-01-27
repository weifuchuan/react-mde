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
var commands_1 = require("./commands");
var draft_js_1 = require("draft-js");
var DraftUtil_1 = require("./util/DraftUtil");
var components_1 = require("./components");
var classNames = require("classnames");
var CommandUtils_1 = require("./util/CommandUtils");
var react_mde_en_1 = require("./l18n/react-mde.en");
var ReactMde = /** @class */ (function (_super) {
    __extends(ReactMde, _super);
    function ReactMde(props) {
        var _this = _super.call(this, props) || this;
        // resizeYStart will be null when it is not resizing
        _this.gripDrag = null;
        _this.rebuildCache = function (value) {
            _this.cachedValue = value;
            _this.cachedDraftState = value
                ? draft_js_1.EditorState.createWithContent(draft_js_1.ContentState.createFromText(value))
                : draft_js_1.EditorState.createEmpty();
        };
        _this.handleTextChange = function (editorState) {
            var onChange = _this.props.onChange;
            _this.cachedValue = DraftUtil_1.getPlainText(editorState);
            _this.cachedDraftState = editorState;
            onChange(_this.cachedValue);
        };
        _this.handleGripMouseDown = function (event) {
            _this.gripDrag = {
                originalHeight: _this.state.editorHeight,
                originalDragY: event.clientY
            };
        };
        _this.handleGripMouseUp = function () {
            _this.gripDrag = null;
        };
        _this.handleGripMouseMove = function (event) {
            if (_this.gripDrag !== null) {
                var newHeight = _this.gripDrag.originalHeight + event.clientY - _this.gripDrag.originalDragY;
                if (newHeight >= _this.props.minEditorHeight && newHeight <= _this.props.maxEditorHeight) {
                    _this.setState(__assign({}, _this.state, { editorHeight: _this.gripDrag.originalHeight + (event.clientY - _this.gripDrag.originalDragY) }));
                }
            }
        };
        _this.handleTabChange = function (newTab) {
            // TODO: Prevent tab change if the preview is being loaded. The reason
            // is that, if the keeps changing text and tabs, depending on the time
            // the preview promises take to settle, there might be a race condition.
            _this.setState({
                currentTab: newTab,
                // previewHtml is always set to null. If the user has clicked the
                // preview tab, previewHtml will be set as soon as the promise resolves
                previewHtml: null,
                previewLoading: newTab === "preview"
            });
            if (newTab === "preview") {
                // fire preview load
                var generateMarkdownPreview = _this.props.generateMarkdownPreview;
                generateMarkdownPreview(_this.cachedValue).then(function (previewHtml) {
                    _this.setState({
                        // the current tab will be preview because changing tabs during preview
                        // load should be prevented
                        currentTab: "preview",
                        // previewHtml is always set to null. If the user has clicked the
                        // preview tab, previewHtml will be set as soon as the promise resolves
                        previewHtml: previewHtml,
                        previewLoading: false
                    });
                });
            }
        };
        _this.handleCommand = function (command) {
            if (!command.execute)
                return;
            var newEditorState = command.execute(_this.cachedDraftState);
            _this.handleTextChange(newEditorState);
        };
        _this.handleKeyCommand = function (command) {
            if (_this.keyCommandMap[command]) {
                _this.handleCommand(_this.keyCommandMap[command]);
                return "handled";
            }
            return "not-handled";
        };
        _this.rebuildCache(props.value);
        _this.state = {
            currentTab: "write",
            previewLoading: false,
            editorHeight: props.minEditorHeight
        };
        _this.keyCommandMap = {};
        var commands = _this.props.commands;
        _this.keyCommandMap = CommandUtils_1.extractCommandMap(commands);
        return _this;
    }
    ReactMde.prototype.componentDidMount = function () {
        document.addEventListener("mousemove", this.handleGripMouseMove);
        document.addEventListener("mouseup", this.handleGripMouseUp);
    };
    ReactMde.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.value !== this.props.value) {
            this.rebuildCache(this.props.value);
        }
    };
    ReactMde.prototype.render = function () {
        var _this = this;
        var _a = this.props, buttonContentOptions = _a.buttonContentOptions, commands = _a.commands, className = _a.className, emptyPreviewHtml = _a.emptyPreviewHtml, readOnly = _a.readOnly, draftEditorProps = _a.draftEditorProps, l18n = _a.l18n, minPreviewHeight = _a.minPreviewHeight;
        return (React.createElement("div", { className: classNames("react-mde", "react-mde-tabbed-layout", className) },
            React.createElement(components_1.MdeToolbar, { buttonContentOptions: buttonContentOptions, commands: commands, onCommand: this.handleCommand, onTabChange: this.handleTabChange, tab: this.state.currentTab, readOnly: readOnly, l18n: l18n }),
            this.state.currentTab === "write" ?
                React.createElement(React.Fragment, null,
                    React.createElement(components_1.MdeEditor, { editorRef: function (c) { return _this.editorRef = c; }, onChange: this.handleTextChange, editorState: this.cachedDraftState, readOnly: readOnly, draftEditorProps: draftEditorProps, handleKeyCommand: this.handleKeyCommand, height: this.state.editorHeight }),
                    React.createElement("div", { className: "grip", onMouseDown: this.handleGripMouseDown },
                        React.createElement("svg", { "aria-hidden": "true", "data-prefix": "far", "data-icon": "ellipsis-h", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512", className: "icon" },
                            React.createElement("path", { fill: "currentColor", d: "M304 256c0 26.5-21.5 48-48 48s-48-21.5-48-48 21.5-48 48-48 48 21.5 48 48zm120-48c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zm-336 0c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48z", className: "" }))))
                :
                    React.createElement(components_1.MdePreview, { previewRef: function (c) { return _this.previewRef = c; }, html: this.state.previewHtml, loading: this.state.previewLoading, emptyPreviewHtml: emptyPreviewHtml, minHeight: minPreviewHeight })));
    };
    ReactMde.defaultProps = {
        commands: commands_1.getDefaultCommands(),
        buttonContentOptions: {
            iconProvider: function (name) { return React.createElement(components_1.MdeFontAwesomeIcon, { icon: name }); }
        },
        emptyPreviewHtml: "<p>&nbsp;</p>",
        readOnly: false,
        l18n: react_mde_en_1.enL18n,
        minEditorHeight: 200,
        maxEditorHeight: 500,
        minPreviewHeight: 200
    };
    return ReactMde;
}(React.Component));
exports.ReactMde = ReactMde;
