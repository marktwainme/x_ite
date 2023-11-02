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

import Fields                 from "../../Fields.js";
import X3DFieldDefinition     from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray   from "../../Base/FieldDefinitionArray.js";
import X3DChaserNode          from "./X3DChaserNode.js";
import X3DArrayChaserTemplate from "../../Browser/Followers/X3DArrayChaserTemplate.js";
import X3DConstants           from "../../Base/X3DConstants.js";
import Vector3                from "../../../standard/Math/Numbers/Vector3.js";

var X3DArrayChaserObject = X3DArrayChaserTemplate (X3DChaserNode);

function CoordinateChaser (executionContext)
{
   X3DChaserNode        .call (this, executionContext);
   X3DArrayChaserObject .call (this, executionContext);

   this .addType (X3DConstants .CoordinateChaser);
}

Object .assign (Object .setPrototypeOf (CoordinateChaser .prototype, X3DChaserNode .prototype),
   X3DArrayChaserObject .prototype,
{
   getVector ()
   {
      return new Vector3 (0, 0, 0);
   },
});

Object .defineProperties (CoordinateChaser,
{
   typeName:
   {
      value: "CoordinateChaser",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Followers", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "children",
      enumerable: true,
   },
   specificationRange:
   {
      value: Object .freeze (["3.3", "Infinity"]),
      enumerable: true,
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_value",          new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOnly,      "set_destination",    new Fields .MFVec3f ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialValue",       new Fields .MFVec3f (new Vector3 (0, 0, 0))),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "initialDestination", new Fields .MFVec3f (new Vector3 (0, 0, 0))),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "duration",           new Fields .SFTime (1)),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",           new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "value_changed",      new Fields .MFVec3f ()),
      ]),
      enumerable: true,
   },
});

export default CoordinateChaser;
