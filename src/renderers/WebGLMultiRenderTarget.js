import { WebGLRenderTarget } from './WebGLRenderTarget.js';
import { Texture } from './../textures/Texture';

/**
 * @author Matt DesLauriers / @mattdesl
 * @author Takahiro https://github.com/takahirox
 * @author Nicolas Coderre / @ncoder
 */

function WebGLMultiRenderTarget( width, height, optionsArray ) {

    if ( !Array.isArray(optionsArray) ) {
        optionsArray = [optionsArray]
    }

	WebGLRenderTarget.call( this, width, height, optionsArray[0] );

    this.optionsArray = optionsArray;
    this.textures = [this.texture];
    
    // do the other textures
	for ( let i = 1; i < optionsArray.length; i ++ ) {

        let options = optionsArray[i]
        let texture = new Texture( undefined, options.mapping, options.wrapS, options.wrapT, options.magFilter, options.minFilter, options.format, options.type, options.anisotropy, options.encoding );

        texture.image = {};
        texture.image.width = width;
        texture.image.height = height;
        texture.name = options.name;
    
        texture.generateMipmaps = options.generateMipmaps !== undefined ? options.generateMipmaps : false;
        texture.minFilter = options.minFilter !== undefined ? options.minFilter : LinearFilter;
        
		this.textures[ i ] = texture;

	}

}

WebGLMultiRenderTarget.prototype = Object.assign( Object.create( WebGLRenderTarget.prototype ), {

	constructor: WebGLMultiRenderTarget,

	isWebGLMultiRenderTarget: true,

	copy: function ( source ) {

		WebGLRenderTarget.prototype.copy.call( this, source );

		this.textures.length = 0;

		for ( let i = 0, il = source.textures.length; i < il; i ++ ) {

			this.textures[ i ] = source.textures[ i ].clone();

		}

		return this;

	},

    setSize: function ( width, height ) {

        WebGLRenderTarget.prototype.setSize.call( this, width, height );

		if ( this.width !== width || this.height !== height ) {

            // by default resize all textures. (desired?)
            for ( let i = 1; i < this.optionsArray.length; i ++ ) {
                this.texture.image.width = width;
                this.texture.image.height = height;

            }
        }

	}

} );


export { WebGLMultiRenderTarget };
