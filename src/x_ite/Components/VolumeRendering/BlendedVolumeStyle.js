/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, ScheffelstraÃe 31a, Leipzig, Germany 2011.
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
 * Copyright 2015, 2016 Holger Seelig <holger.seelig@yahoo.de>.
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
 * along with X_ITE.  If not, see <http://www.gnu.org/licenses/gpl.html> for a
 * copy of the GPLv3 License.
 *
 * For Silvio, Joy and Adi.
 *
 ******************************************************************************/


define ([
   "x_ite/Fields",
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/VolumeRendering/X3DComposableVolumeRenderStyleNode",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/DEBUG",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DComposableVolumeRenderStyleNode,
          X3DConstants,
          X3DCast,
          DEBUG)
{
"use strict";

   function BlendedVolumeStyle (executionContext)
   {
      X3DComposableVolumeRenderStyleNode .call (this, executionContext);

      this .addType (X3DConstants .BlendedVolumeStyle);
   }

   BlendedVolumeStyle .prototype = Object .assign (Object .create (X3DComposableVolumeRenderStyleNode .prototype),
   {
      constructor: BlendedVolumeStyle,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",                new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "enabled",                 new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weightConstant1",         new Fields .SFFloat (0.5)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weightConstant2",         new Fields .SFFloat (0.5)),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weightFunction1",         new Fields .SFString ("CONSTANT")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weightFunction2",         new Fields .SFString ("CONSTANT")),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weightTransferFunction1", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "weightTransferFunction2", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "renderStyle",             new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "voxels",                  new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "BlendedVolumeStyle";
      },
      getComponentName: function ()
      {
         return "VolumeRendering";
      },
      getContainerField: function ()
      {
         return "renderStyle";
      },
      initialize: function ()
      {
         X3DComposableVolumeRenderStyleNode .prototype .initialize .call (this);

         var gl = this .getBrowser () .getContext ();

         if (gl .getVersion () < 2)
            return;

         this ._weightTransferFunction1 .addInterest ("set_weightTransferFunction1__", this);
         this ._weightTransferFunction2 .addInterest ("set_weightTransferFunction2__", this);
         this ._renderStyle             .addInterest ("set_renderStyle__",             this);
         this ._voxels                  .addInterest ("set_voxels__",                  this);

         this .set_weightTransferFunction1__ ();
         this .set_weightTransferFunction2__ ();
         this .set_renderStyle__ ();
         this .set_voxels__ ();
      },
      addVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .addVolumeData .call (this, volumeDataNode);

         if (this .renderStyleNode)
            this .renderStyleNode .addVolumeData (volumeDataNode);
      },
      removeVolumeData: function (volumeDataNode)
      {
         X3DComposableVolumeRenderStyleNode .prototype .removeVolumeData .call (this, volumeDataNode);

         if (this .renderStyleNode)
            this .renderStyleNode .removeVolumeData (volumeDataNode);
      },
      set_weightTransferFunction1__: function ()
      {
         this .weightTransferFunction1Node = X3DCast (X3DConstants .X3DTexture2DNode, this ._weightTransferFunction1);
      },
      set_weightTransferFunction2__: function ()
      {
         this .weightTransferFunction2Node = X3DCast (X3DConstants .X3DTexture2DNode, this ._weightTransferFunction2);
      },
      set_renderStyle__: function ()
      {
         if (this .renderStyleNode)
         {
            this .renderStyleNode .removeInterest ("addNodeEvent", this);

            for (const volumeDataNode of this .getVolumeData ())
               this .renderStyleNode .removeVolumeData (volumeDataNode);
         }

         this .renderStyleNode = X3DCast (X3DConstants .X3DComposableVolumeRenderStyleNode, this ._renderStyle);

         if (this .renderStyleNode)
         {
            this .renderStyleNode .addInterest ("addNodeEvent", this);

            for (const volumeDataNode of this .getVolumeData ())
               this .renderStyleNode .addVolumeData (volumeDataNode);
         }
      },
      set_voxels__: function ()
      {
         this .voxelsNode = X3DCast (X3DConstants .X3DTexture3DNode, this ._voxels);
      },
      addShaderFields: function (shaderNode)
      {
         if (! this ._enabled .getValue ())
            return;

         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightConstant1_" + this .getId (), this ._weightConstant1 .copy ());
         shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightConstant2_" + this .getId (), this ._weightConstant2 .copy ());

         if (this .weightTransferFunction1Node)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightTransferFunction1_" + this .getId (), new Fields .SFNode (this .weightTransferFunction1Node));

         if (this .weightTransferFunction2Node)
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "weightTransferFunction2_" + this .getId (), new Fields .SFNode (this .weightTransferFunction2Node));

         if (this .voxelsNode)
         {
            shaderNode .addUserDefinedField (X3DConstants .inputOutput, "voxels_" + this .getId (), new Fields .SFNode (this .voxelsNode));
         }

         this .getBrowser () .getDefaultBlendedVolumeStyle () .addShaderFields (shaderNode);

         if (this .renderStyleNode)
            this .renderStyleNode .addShaderFields (shaderNode);
      },
      getUniformsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         if (! this .voxelsNode)
            return "";

         var string = "";

         string += "\n";
         string += "// BlendedVolumeStyle\n";
         string += "\n";
         string += "uniform float     weightConstant1_" + this .getId () + ";\n";
         string += "uniform float     weightConstant2_" + this .getId () + ";\n";

         if (this .weightTransferFunction1Node)
            string += "uniform sampler2D weightTransferFunction1_" + this .getId () + ";\n";

         if (this .weightTransferFunction2Node)
            string += "uniform sampler2D weightTransferFunction2_" + this .getId () + ";\n";

         string += "uniform sampler3D voxels_" + this .getId () + ";\n";

         var uniformsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getUniformsText ();

         if (this .renderStyleNode)
            uniformsText += this .renderStyleNode .getUniformsText ();

         uniformsText = uniformsText .replace (/x3d_Texture3D\s*\[0\]/g, "voxels_" + this .getId ());

         string += "\n";
         string += uniformsText;

         string += "\n";
         string += "vec4\n";
         string += "getBlendedStyle_" + this .getId () + " (in vec4 originalColor, in vec3 texCoord)\n";
         string += "{\n";

         string += "	vec4 blendColor_" + this .getId () + " = texture (voxels_" + this .getId () + ", texCoord);";

         var functionsText = this .getBrowser () .getDefaultBlendedVolumeStyle () .getFunctionsText ();

         if (this .renderStyleNode)
            functionsText += this .renderStyleNode .getFunctionsText ();

         functionsText = functionsText .replace (/textureColor/g, "blendColor_" + this .getId ());

         string += "\n";
         string += functionsText;

         switch (this ._weightFunction1 .getValue ())
         {
            default: // CONSTANT
            {
               string += "	float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
               break;
            }
            case "ALPHA0":
            {
               string += "	float w1_" + this .getId () + " = originalColor .a;\n";
               break;
            }
            case "ALPHA1":
            {
               string += "	float w1_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA0":
            {
               string += "	float w1_" + this .getId () + " = 1.0 - originalColor .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA1":
            {
               string += "	float w1_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "TABLE":
            {
               if (this .weightTransferFunction1Node)
               {
                  string += "	float w1_" + this .getId () + " = texture (weightTransferFunction1_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
               }
               else
               {
                  // Use default CONSTANT value.
                  string += "	float w1_" + this .getId () + " = weightConstant1_" + this .getId () + ";\n";
               }

               break;
            }
         }

         switch (this ._weightFunction2 .getValue ())
         {
            default: // CONSTANT
            {
               string += "	float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
               break;
            }
            case "ALPHA0":
            {
               string += "	float w2_" + this .getId () + " = originalColor .a;\n";
               break;
            }
            case "ALPHA1":
            {
               string += "	float w2_" + this .getId () + " = blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA0":
            {
               string += "	float w2_" + this .getId () + " = 1.0 - originalColor .a;\n";
               break;
            }
            case "ONE_MINUS_ALPHA1":
            {
               string += "	float w2_" + this .getId () + " = 1.0 - blendColor_ " + this .getId () + " .a;\n";
               break;
            }
            case "TABLE":
            {
               if (this .weightTransferFunction2Node)
               {
                  string += "	float w2_" + this .getId () + " = texture (weightTransferFunction2_" + this .getId () + ", vec2 (originalColor .a, blendColor_" + this .getId () + " .a)) .r;\n";
               }
               else
               {
                  // Use default CONSTANT value.
                  string += "	float w2_" + this .getId () + " = weightConstant2_" + this .getId () + ";\n";
               }

               break;
            }
         }

         string += "\n";
         string += "	return clamp (originalColor * w1_" + this .getId () + " + blendColor_" + this .getId () + " * w2_" + this .getId () + ", 0.0, 1.0);\n";
         string += "}\n";

         return string;
      },
      getFunctionsText: function ()
      {
         if (! this ._enabled .getValue ())
            return "";

         if (! this .voxelsNode)
            return "";

         var string = "";

         string += "\n";
         string += "	// BlendedVolumeStyle\n";
         string += "\n";
         string += "	textureColor = getBlendedStyle_" + this .getId () + " (textureColor, texCoord);\n";

         return string;
      },
   });

   return BlendedVolumeStyle;
});
