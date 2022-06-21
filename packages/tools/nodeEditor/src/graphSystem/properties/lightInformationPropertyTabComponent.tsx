import * as React from "react";
import { LineContainerComponent } from "../../sharedComponents/lineContainerComponent";
import { OptionsLineComponent } from "../../sharedComponents/optionsLineComponent";
import type { IPropertyComponentProps } from "../../../../../dev/sharedUiComponents/src/nodeGraphSystem/interfaces/propertyComponentProps";
import type { LightInformationBlock } from "core/Materials/Node/Blocks/Vertex/lightInformationBlock";
import { GeneralPropertyTabComponent } from "./genericNodePropertyComponent";
import { Light } from "core/Lights/light";

export class LightInformationPropertyTabComponent extends React.Component<IPropertyComponentProps> {
    render() {
        const scene = this.props.globalState.nodeMaterial!.getScene();
        const lightOptions = scene.lights.map((l:Light) => {
            return { label: l.name, value: l.name };
        });

        const lightInformationBlock = this.props.data as LightInformationBlock;

        return (
            <div>
                <GeneralPropertyTabComponent stateManager={this.props.globalState} globalState={this.props.globalState} data={this.props.data} />
                <LineContainerComponent title="PROPERTIES">
                    <OptionsLineComponent
                        label="Light"
                        noDirectUpdate={true}
                        valuesAreStrings={true}
                        options={lightOptions}
                        target={lightInformationBlock}
                        propertyName="name"
                        getSelection={(target) => target.light.name}
                        onSelect={(name: any) => {
                            lightInformationBlock.light = scene.getLightByName(name);
                            this.forceUpdate();
                            this.props.globalState.onRebuildRequiredObservable.notifyObservers(true);
                        }}
                    />
                </LineContainerComponent>
            </div>
        );
    }
}
