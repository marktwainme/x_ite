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

import X3DBaseNode          from "../Base/X3DBaseNode.js";
import X3DPrototypeInstance from "../Components/Core/X3DPrototypeInstance.js";

function BindableList (executionContext, defaultNode)
{
   X3DBaseNode .call (this, executionContext);

   this .updateTime     = 0;
   this .nodes          = [ defaultNode ];
   this .collectedNodes = [ defaultNode ];
   this .changedNodes   = [ ];
   this .removedNodes   = [ ];
}

BindableList .prototype = Object .assign (Object .create (X3DBaseNode .prototype),
{
   constructor: BindableList,
   getTypeName: function ()
   {
      return "BindableList";
   },
   get: function ()
   {
      return this .nodes;
   },
   getBound: function (name)
   {
      const length = this .nodes .length;

      if (length === 1)
         return this .nodes [0]; // Return default viewpoint.

      const enableInlineBindables = false;

      if (name)
      {
         // Return first viewpoint with @name.

         for (let i = 1; i < length; ++ i)
         {
            const
               node  = this .nodes [i],
               scene = node .getExecutionContext () .getOuterNode () ?.getScene () ?? node .getScene ();

            if (!enableInlineBindables && !scene .isMainScene ())
               continue;

            if (node .getName () == name)
               return node;
         }
      }

      // Return first bound viewpoint in scene.

      for (let i = 1; i < length; ++ i)
      {
         const
            node  = this .nodes [i],
            scene = node .getExecutionContext () .getOuterNode () ?.getScene () ?? node .getScene ();

         if (!enableInlineBindables && !scene .isMainScene ())
            continue;

         if (node ._isBound .getValue ())
            return node;
      }

      // Return first viewpoint in scene.

      for (let i = 1; i < length; ++ i)
      {
         const
            node  = this .nodes [i],
            scene = node .getExecutionContext () .getOuterNode () ?.getScene () ?? node .getScene ();

         if (!enableInlineBindables && !scene .isMainScene ())
            continue;

         return node;
      }

      return this .nodes [0]; // Return default viewpoint.
   },
   push: function (node)
   {
      return this .collectedNodes .push (node);
   },
   update: function (layerNode, stack)
   {
      const
         collectedNodes = this .collectedNodes,
         changedNodes   = this .changedNodes,
         removedNodes   = this .removedNodes;

      for (const node of collectedNodes)
      {
         if (node ._set_bind .getModificationTime () > this .updateTime)
            changedNodes .push (node);
      }

      if (!equals (collectedNodes, this .nodes))
      {
         // Unbind nodes not in current list (collectedNodes);

         for (const node of this .nodes)
         {
            if (collectedNodes .indexOf (node) === -1)
               removedNodes .push (node);
         }

         // Swap nodes.

         const tmp = this .nodes;

         this .nodes          = collectedNodes;
         this .collectedNodes = tmp;
      }

      // Clear collected nodes.

      this .collectedNodes .length = 1;

      // Update stack.

      stack .update (layerNode, removedNodes, changedNodes)

      changedNodes .length = 0;
      removedNodes .length = 0;

      // Advance updateTime time.

      this .updateTime = Date .now ();
   },
});

for (const key of Reflect .ownKeys (BindableList .prototype))
   Object .defineProperty (BindableList .prototype, key, { enumerable: false });

// Compares two nodess.

function equals (lhs, rhs)
{
   if (lhs .length !== rhs .length)
      return false;

   for (let i = 0; i < lhs .length; ++ i)
   {
      if (lhs [i] !== rhs [i])
         return false
   }

   return true;
}

export default BindableList;
