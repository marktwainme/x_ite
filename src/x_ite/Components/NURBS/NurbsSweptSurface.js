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

import Fields                    from "../../Fields.js";
import X3DFieldDefinition        from "../../Base/X3DFieldDefinition.js";
import FieldDefinitionArray      from "../../Base/FieldDefinitionArray.js";
import Extrusion                 from "../Geometry3D/Extrusion.js";
import X3DParametricGeometryNode from "./X3DParametricGeometryNode.js";
import X3DConstants              from "../../Base/X3DConstants.js";
import X3DCast                   from "../../Base/X3DCast.js";

function NurbsSweptSurface (executionContext)
{
   X3DParametricGeometryNode .call (this, executionContext);

   this .addType (X3DConstants .NurbsSweptSurface);

   this .extrusion = new Extrusion (executionContext);
}

NurbsSweptSurface .prototype = Object .assign (Object .create (X3DParametricGeometryNode .prototype),
{
   constructor: NurbsSweptSurface,
   initialize: function ()
   {
      X3DParametricGeometryNode .prototype .initialize .call (this);

      this ._crossSectionCurve .addInterest ("set_crossSectionCurve__", this);
      this ._trajectoryCurve   .addInterest ("set_trajectoryCurve__",   this);

      const extrusion = this .extrusion;

      extrusion ._beginCap     = false;
      extrusion ._endCap       = false;
      extrusion ._solid        = true;
      extrusion ._ccw          = true;
      extrusion ._convex       = true;
      extrusion ._creaseAngle  = Math .PI;

      extrusion .setup ();

      extrusion ._crossSection .setTainted (true);
      extrusion ._spine        .setTainted (true);

      this .set_crossSectionCurve__ ();
      this .set_trajectoryCurve__ ();
   },
   set_crossSectionCurve__: function ()
   {
      if (this .crossSectionCurveNode)
         this .crossSectionCurveNode .removeInterest ("requestRebuild", this);

      this .crossSectionCurveNode = X3DCast (X3DConstants .X3DNurbsControlCurveNode, this ._crossSectionCurve);

      if (this .crossSectionCurveNode)
         this .crossSectionCurveNode .addInterest ("requestRebuild", this);
   },
   set_trajectoryCurve__: function ()
   {
      if (this .trajectoryCurveNode)
         this .trajectoryCurveNode ._rebuild .removeInterest ("requestRebuild", this);

      this .trajectoryCurveNode = X3DCast (X3DConstants .NurbsCurve, this ._trajectoryCurve);

      if (this .trajectoryCurveNode)
         this .trajectoryCurveNode ._rebuild .addInterest ("requestRebuild", this);
   },
   build: function ()
   {
      if (! this .crossSectionCurveNode)
         return;

      if (! this .trajectoryCurveNode)
         return;

      const extrusion = this .extrusion;

      extrusion ._crossSection = this .crossSectionCurveNode .tessellate (0);
      extrusion ._spine        = this .trajectoryCurveNode   .tessellate (0);

      extrusion .rebuild ();

      this .getColors ()    .assign (extrusion .getColors ());
      this .getTexCoords () .assign (extrusion .getTexCoords ());
      this .getNormals ()   .assign (extrusion .getNormals ());
      this .getVertices ()  .assign (extrusion .getVertices ());

      this .getMultiTexCoords () .push (this .getTexCoords ());

      if (! this ._ccw .getValue ())
      {
         const normals = this .getNormals ();

         for (let i = 0, length = normals .length; i < length; ++ i)
            normals [i] = -normals [i];
      }

      this .setSolid (this ._solid .getValue ());
      this .setCCW (this ._ccw .getValue ());
   },
});

Object .defineProperties (NurbsSweptSurface,
{
   typeName:
   {
      value: "NurbsSweptSurface",
   },
   componentName:
   {
      value: "NURBS",
   },
   containerField:
   {
      value: "geometry",
   },
   specificationRange:
   {
      value: Object .freeze (["3.0", "Infinity"]),
   },
   fieldDefinitions:
   {
      value: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "solid",             new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "ccw",               new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "crossSectionCurve", new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "trajectoryCurve",   new Fields .SFNode ()),
      ]),
   },
});

export default NurbsSweptSurface;
