import type { NodeMaterial } from "core/Materials/Node/nodeMaterial";
import type { Nullable } from "core/types";
import { Observable } from "core/Misc/observable";
import type { LogEntry } from "./components/log/logComponent";
import type { NodeMaterialBlock } from "core/Materials/Node/nodeMaterialBlock";
import { PreviewType } from "./components/preview/previewType";
import { DataStorage } from "core/Misc/dataStorage";
import { Color4 } from "core/Maths/math.color";
import type { GraphNode } from "./diagram/graphNode";
import type { Vector2 } from "core/Maths/math.vector";
import type { NodePort } from "./diagram/nodePort";
import type { NodeLink } from "../../../dev/sharedUiComponents/src/nodeGraphSystem/nodeLink";
import type { GraphFrame } from "./diagram/graphFrame";
import type { FrameNodePort } from "../../../dev/sharedUiComponents/src/nodeGraphSystem/frameNodePort";
import type { FramePortData } from "./diagram/graphCanvas";
import { NodeMaterialModes } from "core/Materials/Node/Enums/nodeMaterialModes";
import { ParticleSystem } from "core/Particles/particleSystem";
import { ISelectionChangedOptions } from "../../../dev/sharedUiComponents/src/nodeGraphSystem/interfaces/selectionChangedOptions";
import { StateManager } from "../../../dev/sharedUiComponents/src/nodeGraphSystem/stateManager";
import { registerElbowSupport } from "./graphSystem/registerElbowSupport";

export class GlobalState {
    nodeMaterial: NodeMaterial;
    hostElement: HTMLElement;
    hostDocument: HTMLDocument;
    hostWindow: Window;
    stateManager: StateManager;
    onBuiltObservable = new Observable<void>();
    onResetRequiredObservable = new Observable<void>();
    onZoomToFitRequiredObservable = new Observable<void>();
    onReOrganizedRequiredObservable = new Observable<void>();
    onLogRequiredObservable = new Observable<LogEntry>();
    onErrorMessageDialogRequiredObservable = new Observable<string>();
    onIsLoadingChanged = new Observable<boolean>();
    onPreviewCommandActivated = new Observable<boolean>();
    onLightUpdated = new Observable<void>();
    onPreviewBackgroundChanged = new Observable<void>();
    onBackFaceCullingChanged = new Observable<void>();
    onDepthPrePassChanged = new Observable<void>();
    onAnimationCommandActivated = new Observable<void>();
    onImportFrameObservable = new Observable<any>();
    onPopupClosedObservable = new Observable<void>();
    onGetNodeFromBlock: (block: NodeMaterialBlock) => GraphNode;
    onGridSizeChanged = new Observable<void>();
    onExposePortOnFrameObservable = new Observable<GraphNode>();
    previewType: PreviewType;
    previewFile: File;
    particleSystemBlendMode = ParticleSystem.BLENDMODE_ONEONE;
    listOfCustomPreviewFiles: File[] = [];
    rotatePreview: boolean;
    backgroundColor: Color4;
    backFaceCulling: boolean;
    depthPrePass: boolean;
    blockKeyboardEvents = false;
    hemisphericLight: boolean;
    directionalLight0: boolean;
    directionalLight1: boolean;
    controlCamera: boolean;
    storeEditorData: (serializationObject: any, frame?: Nullable<GraphFrame>) => void;
    _mode: NodeMaterialModes;

    /** Gets the mode */
    public get mode(): NodeMaterialModes {
        return this._mode;
    }

    /** Sets the mode */
    public set mode(m: NodeMaterialModes) {
        DataStorage.WriteNumber("Mode", m);
        this._mode = m;
        this.onPreviewCommandActivated.notifyObservers(true);
    }

    customSave?: { label: string; action: (data: string) => Promise<void> };

    public constructor() {
        this.previewType = DataStorage.ReadNumber("PreviewType", PreviewType.Box);
        this.backFaceCulling = DataStorage.ReadBoolean("BackFaceCulling", true);
        this.depthPrePass = DataStorage.ReadBoolean("DepthPrePass", false);
        this.hemisphericLight = DataStorage.ReadBoolean("HemisphericLight", true);
        this.directionalLight0 = DataStorage.ReadBoolean("DirectionalLight0", false);
        this.directionalLight1 = DataStorage.ReadBoolean("DirectionalLight1", false);
        this.controlCamera = DataStorage.ReadBoolean("ControlCamera", true);
        this._mode = DataStorage.ReadNumber("Mode", NodeMaterialModes.Material);
        this.stateManager = new StateManager();

        registerElbowSupport(this.stateManager);

        const r = DataStorage.ReadNumber("BackgroundColorR", 0.12549019607843137);
        const g = DataStorage.ReadNumber("BackgroundColorG", 0.09803921568627451);
        const b = DataStorage.ReadNumber("BackgroundColorB", 0.25098039215686274);
        this.backgroundColor = new Color4(r, g, b, 1.0);
    }
}
