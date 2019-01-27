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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var MdeToolbarButtonGroup_1 = require("./MdeToolbarButtonGroup");
var MdeToolbarDropdown_1 = require("./MdeToolbarDropdown");
var MdeToolbarButton_1 = require("./MdeToolbarButton");
var classNames = require("classnames");
var MdeToolbar = /** @class */ (function (_super) {
    __extends(MdeToolbar, _super);
    function MdeToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleTabChange = function (tab) {
            var onTabChange = _this.props.onTabChange;
            onTabChange(tab);
        };
        return _this;
    }
    MdeToolbar.prototype.render = function () {
        var _this = this;
        var l18n = this.props.l18n;
        var _a = this.props, buttonContentOptions = _a.buttonContentOptions, children = _a.children, commands = _a.commands, onCommand = _a.onCommand, readOnly = _a.readOnly;
        if ((!commands || commands.length === 0) && !children) {
            return null;
        }
        return (React.createElement("div", { className: "mde-header" },
            React.createElement("div", { className: "mde-tabs" },
                React.createElement("button", { type: "button", className: classNames({ "selected": this.props.tab === "write" }), onClick: function () { return _this.handleTabChange("write"); } }, l18n.write),
                React.createElement("button", { type: "button", className: classNames({ "selected": this.props.tab === "preview" }), onClick: function () { return _this.handleTabChange("preview"); } }, l18n.preview)),
            commands.map(function (commandGroup, i) { return (React.createElement(MdeToolbarButtonGroup_1.MdeToolbarButtonGroup, { key: i }, commandGroup.commands.map(function (c, j) {
                if (c.children) {
                    return (React.createElement(MdeToolbarDropdown_1.MdeToolbarDropdown, { key: j, buttonProps: c.buttonProps, buttonContentOptions: buttonContentOptions, buttonContent: c.buttonContentBuilder(buttonContentOptions), commands: c.children, onCommand: function (cmd) { return onCommand(cmd); }, readOnly: readOnly }));
                }
                return React.createElement(MdeToolbarButton_1.MdeToolbarButton, { key: j, buttonContent: c.buttonContentBuilder(buttonContentOptions), buttonProps: c.buttonProps, onClick: function () { return onCommand(c); }, readOnly: readOnly, buttonComponentClass: c.buttonComponentClass });
            }))); })));
    };
    return MdeToolbar;
}(React.Component));
exports.MdeToolbar = MdeToolbar;
