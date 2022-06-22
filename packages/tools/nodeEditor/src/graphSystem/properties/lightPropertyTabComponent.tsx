import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import { OptionsLineComponent } from "../../sharedComponents/optionsLineComponent";
import type { LightBlock } from "core/Materials/Node/Blocks/Dual/lightBlock";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { Light } from "core/Lights/light";
import { GlobalState } from "../../globalState";
import { IPropertyComponentProps } from "shared-ui-components/nodeGraphSystem/interfaces/propertyComponentProps";

export class LightPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    render() {
        const scene = (this.props.stateManager.data as GlobalState).nodeMaterial!.getScene();
        const lightOptions = scene.lights.map((l: Light) => {
            return { label: l.name, value: l.name };
        });

        lightOptions.splice(0, 0, { label: "All", value: "" });

        const lightBlock = this.props.data as LightBlock;

        return (
            <div>
                <GeneralPropertyTabComponent stateManager={this.props.stateManager} data={this.props.data} />
                <LineContainerComponent title="PROPERTIES">
                    <OptionsLineComponent
                        label="Light"
                        defaultIfNull={0}
                        noDirectUpdate={true}
                        valuesAreStrings={true}
                        options={lightOptions}
                        target={lightBlock}
                        propertyName="name"
                        onSelect={(name: any) => {
                            if (name === "") {
                                lightBlock.light = null;
                            } else {
                                lightBlock.light = scene.getLightByName(name);
                            }
                            this.forceUpdate();
                            this.props.stateManager.onRebuildRequiredObservable.notifyObservers(true);
                        }}
                    />
                </LineContainerComponent>
            </div>
        );
    }
}
