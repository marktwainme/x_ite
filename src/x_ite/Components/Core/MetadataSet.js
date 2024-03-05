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
import X3DNode              from "./X3DNode.js";
import X3DMetadataObject    from "./X3DMetadataObject.js";
import X3DConstants         from "../../Base/X3DConstants.js";
import LATEST_VERSION       from "../../LATEST_VERSION.js";

function MetadataSet (executionContext)
{
   X3DNode           .call (this, executionContext);
   X3DMetadataObject .call (this, executionContext);

   this .addType (X3DConstants .MetadataSet);
}

Object .assign (Object .setPrototypeOf (MetadataSet .prototype, X3DNode .prototype),
   X3DMetadataObject .prototype,
{
   initialize ()
   {
      X3DNode           .prototype .initialize .call (this);
      X3DMetadataObject .prototype .initialize .call (this);
   },
   getContainerField (specificationVersion = LATEST_VERSION)
   {
      if (specificationVersion <= 3.3)
         return "metadata";

      return X3DNode .prototype .getContainerField .call (this);
   },
   setValue (name, value)
   {
      switch (typeof value)
      {
         case "boolean":
         {
            this .getMetadataNode ("MetadataBoolean", name, true) .value = [value];
            return;
         }
         case "number":
         {
            this .getMetadataNode ("MetadataDouble", name, true) .value = [value];
            return;
         }
         case "string":
         {
            this .getMetadataNode ("MetadataString", name, true) .value = [value];
            return;
         }
         case "object":
         {
            return;
         }
      }
   },
   removeValue (name)
   {
      const index = this ._value .findIndex (node => node .name === name);

      if (index < 0)
         return;

      this ._value .splice (index, 1);
   },
   getMetadataNode (typeName, name, create = false)
   {
      let metadata = this ._value .find (node => node .name === name);

      if (metadata ?.getNodeTypeName () === typeName)
         return metadata;

      if (!create)
         return null;

      if (metadata)
         this .removeValue (name);

      metadata = this .getExecutionContext () .createNode (typeName);

      metadata .reference = "";
      metadata .name      = name;

      this ._value .push (metadata);

      return metadata;
   },
   dispose ()
   {
      X3DMetadataObject .prototype .dispose .call (this);
      X3DNode           .prototype .dispose .call (this);
   },
});

Object .defineProperties (MetadataSet,
{
   typeName:
   {
      value: "MetadataSet",
      enumerable: true,
   },
   componentInfo:
   {
      value: Object .freeze ({ name: "Core", level: 1 }),
      enumerable: true,
   },
   containerField:
   {
      value: "value",
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
         new X3DFieldDefinition (X3DConstants .inputOutput, "metadata",  new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "name",      new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "reference", new Fields .SFString ()),
         new X3DFieldDefinition (X3DConstants .inputOutput, "value",     new Fields .MFNode ()),
      ]),
      enumerable: true,
   },
});

export default MetadataSet;
