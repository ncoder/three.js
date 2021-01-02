import { Texture } from 'three/src/textures/Texture';
import {
    WebGLRenderTarget,
    WebGLRenderTargetOptions,
} from './WebGLRenderTarget';

export interface WebGLMultiRenderTargetOptions extends WebGLRenderTargetOptions {
    name?: string // optional name for debugging
}

export class WebGLMultiRenderTarget extends WebGLRenderTarget {

    // pass one option struct per texture.
    constructor(
        width: number,
        height: number,
        optionsArray: WebGLMultiRenderTargetOptions[] 
    );

    readonly isWebGLMultiRenderTarget: true;

    // this.textures[0] is the same as this.texture
    textures: Texture[]

}
