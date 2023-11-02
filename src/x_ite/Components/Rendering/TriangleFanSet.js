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

import Fields                  from "../../Fields.js";
import X3DFieldDefinition      from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray    from "../../Base/FieldDefinitionArray.js";
import X3DComposedGeometryNode from "./X3DComposedGeometryNode.js";
import X3DConstants            from "../../Base/X3DConstants.js";

function TriangleFanSet (executionContext)
{
   X3DComposedGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .TriangleFanSet);

   this .triangleIndex = [ ];
}

Object .assign (Object .setPrototypeOf (TriangleFanSet .prototype, X3DComposedGeometryNode .prototype),
{
   initialize ()
   {
      X3DComposedGeometryNode .prototype .initialize .call (this);

      this ._fanCount .addInterest ("set_fanCount__", this);

      this .set_fanCount__ ();
   },
   set_fanCount__ ()
   {
      // Build coordIndex

      const
         fanCount      = this ._fanCount,
         triangleIndex = this .triangleIndex;

      triangleIndex .length = 0;

      let index = 0;

      for (const vertexCount of fanCount)
      {
         for (let i = 1, length = vertexCount - 1; i < length; ++ i)
         {
            triangleIndex .push (index, index + i, index + i + 1);
         }

         index += vertexCount;
      }
   },
   getPolygonIndex (index)
   {
      return this .triangleIndex [index];
   },
   build ()
   {
      X3DComposedGeometryNode .prototype .build .call (this, 3, this .triangleIndex .length, 3, this .triangleIndex .length);
   },
});

Object .defineProperties (TriangleFanSet,
{
   typeName:
   {
      value: "TriangleFanSet",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Rendering", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "geometry",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze ({ from: "3.0", to: "Infinity" }),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorPerVertex",  new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "normalPerVertex", new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fanCount",        new Fields .MFInt32 ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "attrib",          new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "fogCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "color",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "texCoord",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "normal",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "coord",           new Fields .SFNode ()),
      ]),
      enumerable: true,
   },
});

export default TriangleFanSet;
