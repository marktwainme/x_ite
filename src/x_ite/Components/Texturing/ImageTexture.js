/*******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011 - 2022.
 *
 * All rights reserved. Holger Seelig <holger.seelig@yahoo.de>.
 *
 * The copyright notice above does not evidence any actual of intended
 * publication of such source code, and is an unpublished work by create3000.
 * This material contains CONFIDENTIAL INFORMATION that is the property of
 * create3000.
 *
 * No permission is granted to copy, distribute, or create derivative works from
 * the contents of this software, in whole or in part, without the prior written
 * permission of create3000.
 *
 * NON-MILITARY USE ONLY
 *
 * All create3000 software are effectively free software with a non-military use
 * restriction. It is free. Well commented source is provided. You may reuse the
 * source in any way you please with the exception anything that uses it must be
 * marked to indicate is contains 'non-military use only' components.
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright 2011 - 2022, Holger Seelig <holger.seelig@yahoo.de>.
 *
 * This file is part of the X_ITE Project.
 *
 * X_ITE is free software: you can redistribute it and/or modify it under the
 * terms of the GNU General Public License version 3 only, as published by the
 * Free Software Foundation.
 *
 * X_ITE is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU General Public License version 3 for more
 * details (a copy is included in the LICENSE file that accompanied this code).
 *
 * You should have received a copy of the GNU General Public License version 3
 * along with X_ITE.  If not, see <https://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/

import Fields               from "../../Fields.js";
import X3DFieldDefinition   from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray from "../../Base/FieldDefinitionArray.js";
import X3DTexture2DNode     from "./X3DTexture2DNode.js";
import X3DUrlObject         from "../Networking/X3DUrlObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import Algorithm            from "../../../standard/Math/Algorithm.js";
import DEVELOPMENT          from "../../DEVELOPMENT.js";

function ImageTexture (executionContext)
{
   X3DTexture2DNode .call (this, executionContext);
   X3DUrlObject     .call (this, executionContext);

   this .addType (X3DConstants .ImageTexture);

   this .image    = $("<img></img>");
   this .urlStack = new Fields .MFString ();

   this .getMatrix () .set ([1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1]); // flipY
}

Object .assign (Object .setPrototypeOf (ImageTexture .prototype, X3DTexture2DNode .prototype),
   X3DUrlObject .prototype,
{
   initialize ()
   {
      X3DTexture2DNode .prototype .initialize .call (this);
      X3DUrlObject     .prototype .initialize .call (this);

      this ._colorSpaceConversion .addInterest ("loadNow", this);

      this .image .on ("load",        this .setImage .bind (this));
      this .image .on ("abort error", this .setError .bind (this));
      this .image .prop ("crossOrigin", "Anonymous");

      this .requestImmediateLoad () .catch (Function .prototype);
   },
   getElement ()
   {
      return this .image [0];
   },
   unloadData ()
   {
      this .clearTexture ();
   },
   loadData ()
   {
      this .urlStack .setValue (this ._url);
      this .loadNext ();
   },
   loadNext ()
   {
      if (this .urlStack .length === 0)
      {
         this .clearTexture ();
         this .setLoadState (X3DConstants .FAILED_STATE);
         return;
      }

      // Get URL.

      this .URL = new URL (this .urlStack .shift (), this .getExecutionContext () .getBaseURL ());

      if (this .URL .protocol !== "data:")
      {
         if (!this .getCache ())
            this .URL .searchParams .set ("_", Date .now ());
      }

      if (this .URL .pathname .match (/\.ktx2?$/))
      {
         this .getBrowser () .getKTXDecoder ()
            .then (decoder => decoder .loadKtxFromUri (this .URL))
            .then (texture => this .setKTXTexture (texture))
            .catch (error => this .setError ({ type: error .message }));
      }
      else
      {
         this .image .attr ("src", this .URL .href);
      }
   },
   setError (event)
   {
      if (this .URL .protocol !== "data:")
         console .warn (`Error loading image '${decodeURI (this .URL .href)}'`, event .type);

      this .loadNext ();
   },
   async setKTXTexture (texture)
   {
      if (DEVELOPMENT)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image texture '${decodeURI (this .URL .href)}'`);
      }

      try
      {
         const gl = this .getBrowser () .getContext ();

         if (texture ?.target === this .getTarget ())
         {
            this .setTexture (texture);
            this .setTransparent (false);
            this .setHasMipMaps (texture .levels > 1);
            this .setWidth (texture .baseWidth);
            this .setHeight (texture .baseHeight);

            this .setLoadState (X3DConstants .COMPLETE_STATE);
         }
         else
         {
            this .setError ({ type: "Invalid KTX texture target, must be 'TEXTURE_2D'." });
         }
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   async setImage ()
   {
      if (DEVELOPMENT)
      {
         if (this .URL .protocol !== "data:")
            console .info (`Done loading image texture '${decodeURI (this .URL .href)}'`);
      }

      try
      {
         const
            gl    = this .getBrowser () .getContext (),
            image = this .image [0];

         // https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap
         // createImageBitmap

         if (gl .getVersion () === 1 && !(Algorithm .isPowerOfTwo (image .width) && Algorithm .isPowerOfTwo (image .height)))
         {
            const
               canvas = document .createElement ("canvas"),
               cx     = canvas .getContext ("2d", { willReadFrequently: true }),
               width  = Algorithm .nextPowerOfTwo (image .width),
               height = Algorithm .nextPowerOfTwo (image .height);

            // Scale image to next power of two if needed.

            canvas .width  = width;
            canvas .height = height;

            cx .clearRect (0, 0, width, height);
            cx .drawImage (image, 0, 0, image .width, image .height, 0, 0, width, height);

            // Determine image alpha.

            const
               data        = cx .getImageData (0, 0, width, height) .data,
               transparent = this .isImageTransparent (data);

            // Upload image to GPU.

            this .setTextureFromData (width, height, transparent, data);
            this .setLoadState (X3DConstants .COMPLETE_STATE);
         }
         else
         {
            const
               data        = await this .getImageData (image, this ._colorSpaceConversion .getValue ()),
               transparent = this .isImageTransparent (data),
               width       = image .width,
               height      = image .height;

            // Upload image to GPU.

            this .setTextureFromData (width, height, transparent, data);
            this .setLoadState (X3DConstants .COMPLETE_STATE);
         }
      }
      catch (error)
      {
         // Catch security error from cross origin requests.
         this .setError ({ type: error .message });
      }
   },
   async getImageData (image, colorSpaceConversion = true)
   {
      const
         gl      = this .getBrowser () .getContext (),
         texture = gl .createTexture ();

      gl .bindTexture (gl .TEXTURE_2D, texture);
      gl .pixelStorei (gl .UNPACK_COLORSPACE_CONVERSION_WEBGL, colorSpaceConversion ? gl .BROWSER_DEFAULT_WEBGL : gl .NONE);
      gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA, gl .RGBA, gl .UNSIGNED_BYTE, image);
      gl .pixelStorei (gl .UNPACK_COLORSPACE_CONVERSION_WEBGL, gl .BROWSER_DEFAULT_WEBGL);

      const data = await this .getTextureData (texture, image .width, image .height);

      gl .deleteTexture (texture);

      return data;
   },
   async getTextureData (texture, width, height)
   {
      const
         gl          = this .getBrowser () .getContext (),
         framebuffer = gl .createFramebuffer (),
         data        = new Uint8Array (width * height * 4);

      gl .bindFramebuffer (gl .FRAMEBUFFER, framebuffer);
      gl .framebufferTexture2D (gl .FRAMEBUFFER, gl .COLOR_ATTACHMENT0, gl .TEXTURE_2D, texture, 0);
      await gl .readPixelsAsync (0, 0, width, height, gl .RGBA, gl .UNSIGNED_BYTE, data);
      gl .deleteFramebuffer (framebuffer);

      return data;
   },
   dispose ()
   {
      X3DUrlObject     .prototype .dispose .call (this);
      X3DTexture2DNode .prototype .dispose .call (this);
   },
});

Object .defineProperties (ImageTexture,
{
   typeName:
   {
      value: "ImageTexture",
      enumerable: true,
   },
   componentName:
   {
      value: "Texturing",
      enumerable: true,
   },
   containerField:
   {
      value: "texture",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["2.0", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "description",          new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "load",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "url",                  new Fields .MFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefresh",          new Fields .SFTime ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "autoRefreshTimeLimit", new Fields .SFTime (3600)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorSpaceConversion", new Fields .SFBool (true)), // experimental
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatS",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "repeatT",              new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "textureProperties",    new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default ImageTexture;
