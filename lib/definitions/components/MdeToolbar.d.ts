import * as React from "react";
import { Command, ButtonContentOptions, CommandGroup } from "../types";
import { Tab } from "../types/Tab";
import { L18n } from "..";
export interface MdeToolbarProps {
    buttonContentOptions: ButtonContentOptions;
    commands: CommandGroup[];
    onCommand: (command: Command) => void;
    onTabChange: (tab: Tab) => void;
    readOnly: boolean;
    tab: Tab;
    l18n: L18n;
}
export declare class MdeToolbar extends React.Component<MdeToolbarProps> {
    handleTabChange: (tab: Tab) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=MdeToolbar.d.ts.map