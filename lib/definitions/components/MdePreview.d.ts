import * as React from "react";
export interface ReactMdePreviewProps {
    className?: string;
    previewRef?: (ref: MdePreview) => void;
    html: string;
    emptyPreviewHtml?: string;
    loading: boolean;
    minHeight: number;
}
export declare class MdePreview extends React.Component<ReactMdePreviewProps> {
    previewRef: HTMLDivElement;
    render(): JSX.Element;
}
//# sourceMappingURL=MdePreview.d.ts.map