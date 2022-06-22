import * as React from "react";
import type { GlobalState } from "../../../globalState";
import { Vector3LineComponent } from "../../../sharedComponents/vector3LineComponent";
import type { InputBlock } from "core/Materials/Node/Blocks/Input/inputBlock";

interface IVector3PropertyTabComponentProps {
    globalState: GlobalState;
    inputBlock: InputBlock;
}

export class Vector3PropertyTabComponent extends React.Component<IVector3PropertyTabComponentProps> {
    render() {
        return (
            <Vector3LineComponent
                globalState={this.props.globalState}
                label="Value"
                target={this.props.inputBlock}
                propertyName="value"
                onChange={() => {
                    this.props.globalState.stateManager.onUpdateRequiredObservable.notifyObservers(this.props.inputBlock);
                }}
            ></Vector3LineComponent>
        );
    }
}
