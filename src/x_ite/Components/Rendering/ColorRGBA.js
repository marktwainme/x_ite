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
import X3DColorNode         from "./X3DColorNode.js";
import X3DConstants         from "../../Base/X3DConstants.js";

function ColorRGBA (executionContext)
{
   X3DColorNode .call (this, executionContext);

   this .addType (X3DConstants .ColorRGBA);

   this .setTransparent (true);
}

ColorRGBA .prototype = Object .assign (Object .create (X3DColorNode .prototype),
{
   constructor: ColorRGBA,
   getSpecificationRange: function ()
   {
      return ["3.0", "Infinity"];
   },
   initialize: function ()
   {
      X3DColorNode .prototype .initialize .call (this);

      this ._color .addInterest ("set_color__", this);

      this .set_color__ ();
   },
   set_color__: function ()
   {
      this .color  = this ._color .getValue ();
      this .length = this ._color .length;
   },
   addColor: function (index, array)
   {
      if (index >= 0 && index < this .length)
      {
         const color = this .color;

         index *= 4;

         array .push (color [index], color [index + 1], color [index + 2], color [index + 3]);
      }
      else if (this .length)
      {
         const color = this .color;

         index = (this .length - 1) * 4;

         array .push (color [index], color [index + 1], color [index + 2], color [index + 3]);
      }
      else
      {
         array .push (1, 1, 1, 1);
      }
   },
   addColors: function (array, min)
   {
      if (this .length)
      {
         const color = this .color;

         for (var index = 0, length = Math .min (min, this .length) * 4; index < length; index += 4)
            array .push (color [index], color [index + 1], color [index + 2], color [index + 3]);

         if (this .length < min)
         {
            var index = (this .length - 1) * 4;

            const
               r = color [index],
               g = color [index + 1],
               b = color [index + 2],
               a = color [index + 2];

            for (var index = length, length = min * 4; index < length; index += 4)
               array .push (r, g, b, a);
         }
      }
      else
      {
         for (let index = 0; index < min; ++ index)
            array .push (1, 1, 1, 1);
      }

      return array;
   },
});

Object .defineProperties (ColorRGBA,
{
   typeName:
   {
      value: "ColorRGBA",
   },
   componentName:
   {
      value: "Rendering",
   },
   containerField:
   {
      value: "color",
   },
   specificationRange:
   {
      value: Object .freeze (["3.0", "Infinity"]),
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "color",    new Fields .MFColorRGBA ()),
      ]),
   },
});

export default ColorRGBA;
