import { Texture } from 'three/src/textures/Texture';
import {
    WebGLRenderTarget,
    WebGLRenderTargetOptions,
} from './WebGLRenderTarget';

export class WebGLMultiRenderTarget extends WebGLRenderTarget {

    constructor(
        width: number,
        height: number,
        numAttachements: number,
        options?: WebGLRenderTargetOptions
    );

    readonly isWebGLMultiRenderTarget: true;

    setNumAttachments(n: number): void;

    textures: Texture[]

}
