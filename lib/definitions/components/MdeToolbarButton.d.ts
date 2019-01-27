import * as React from "react";
export interface MdeToolbarButtonProps {
    buttonComponentClass?: React.ComponentClass | string;
    buttonProps: any;
    buttonContent: React.ReactNode;
    onClick: React.MouseEventHandler<any>;
    readOnly: boolean;
}
export declare const MdeToolbarButton: React.SFC<MdeToolbarButtonProps>;
//# sourceMappingURL=MdeToolbarButton.d.ts.map