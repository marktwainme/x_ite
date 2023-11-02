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

import X3DConstants     from "../../Base/X3DConstants.js";
import GeospatialObject from "../../Browser/Geospatial/GeospatialObject.js";
import X3DCast          from "../../Base/X3DCast.js";
import Vector3          from "../../../standard/Math/Numbers/Vector3.js";
import Matrix4          from "../../../standard/Math/Numbers/Matrix4.js";

const
   vector = new Vector3 (0, 0, 0),
   result = new Vector3 (0, 0, 0),
   t      = new Vector3 (0, 0, 0),
   x      = new Vector3 (0, 0, 0),
   y      = new Vector3 (0, 0, 0),
   z      = new Vector3 (0, 0, 0);

function X3DGeospatialObject (executionContext)
{
   this .addType (X3DConstants .X3DGeospatialObject);

   this .radians         = false;
   this .origin          = new Vector3 (0, 0, 0);
   this .originMatrix    = new Matrix4 ();
   this .invOriginMatrix = new Matrix4 ();
}

Object .assign (X3DGeospatialObject .prototype,
{
   initialize ()
   {
      this ._geoSystem .addInterest ("set_geoSystem__", this);
      this ._geoOrigin .addInterest ("set_geoOrigin__", this);

      this .set_geoSystem__ ();
      this .set_geoOrigin__ ();
   },
   set_geoSystem__ ()
   {
      this .coordinateSystem = GeospatialObject .getCoordinateSystem (this ._geoSystem);
      this .referenceFrame   = GeospatialObject .getReferenceFrame   (this ._geoSystem, this .radians);
      this .elevationFrame   = GeospatialObject .getElevationFrame   (this ._geoSystem, this .radians);
      this .standardOrder    = GeospatialObject .isStandardOrder     (this ._geoSystem);
   },
   set_geoOrigin__ ()
   {
      if (this .geoOriginNode)
      {
         this .geoOriginNode .removeInterest ("set_origin__",    this);
         this .geoOriginNode .removeInterest ("set_rotateYUp__", this);
         this .geoOriginNode .removeInterest ("addNodeEvent",    this);
      }

      this .geoOriginNode = X3DCast (X3DConstants .GeoOrigin, this ._geoOrigin);

      if (this .geoOriginNode)
      {
         this .geoOriginNode .addInterest ("set_origin__",    this);
         this .geoOriginNode .addInterest ("set_rotateYUp__", this);
         this .geoOriginNode .addInterest ("addNodeEvent",    this);
      }

      this .set_origin__ ();
      this .set_rotateYUp__ ();
   },
   set_origin__ ()
   {
      if (this .geoOriginNode)
         this .geoOriginNode .getOrigin (this .origin);
      else
         this .origin .set (0, 0, 0);

      this .set_originMatrix__ ();
   },
   set_originMatrix__ ()
   {
      if (this .geoOriginNode)
      {
         // Position
         var t = this .origin;

         // Let's work out the orientation at that location in order
         // to maintain a view where +Y is in the direction of gravitional
         // up for that region of the planet's surface. This will be the
         // value of the rotation matrix for the transform.

         this .elevationFrame .normal (t, y);

         x .set (0, 0, 1) .cross (y);

         // Handle pole cases.
         if (x .equals (Vector3 .Zero))
            x .set (1, 0, 0);

         z .assign (x) .cross (y);

         x .normalize ();
         z .normalize ();

         this .originMatrix .set (x .x, x .y, x .z, 0,
                                    y .x, y .y, y .z, 0,
                                    z .x, z .y, z .z, 0,
                                    t .x, t .y, t .z, 1);

         this .invOriginMatrix .assign (this .originMatrix) .inverse ();
      }
   },
   set_rotateYUp__ ()
   {
      if (this .geoOriginNode && this .geoOriginNode ._rotateYUp .getValue ())
      {
         this .getCoord          = getCoordRotateYUp;
         this .getGeoCoord       = getGeoCoordRotateYUp;
         this .getGeoUpVector    = getGeoUpVectorRotateYUp;
         this .getLocationMatrix = getLocationMatrixRotateYUp;
      }
      else
      {
         delete this .getCoord;
         delete this .getGeoCoord;
         delete this .getGeoUpVector;
         delete this .getLocationMatrix;
      }
   },
   getReferenceFrame ()
   {
      return this .referenceFrame;
   },
   getStandardOrder ()
   {
      return this .standardOrder;
   },
   getCoord (geoPoint, result)
   {
      return this .referenceFrame .convert (geoPoint, result) .subtract (this .origin);
   },
   getGeoCoord (point, result)
   {
      return this .referenceFrame .apply (vector .assign (point) .add (this .origin), result);
   },
   getGeoElevation (point)
   {
      return this .getGeoCoord (point, result) .z;
   },
   getGeoUpVector (point, result)
   {
      return this .elevationFrame .normal (vector .assign (point) .add (this .origin), result);
   },
   getLocationMatrix (geoPoint, result)
   {
      var
         origin         = this .origin,
         locationMatrix = getStandardLocationMatrix .call (this, geoPoint, result);

      // translateRight (-origin)
      locationMatrix [12] -= origin .x;
      locationMatrix [13] -= origin .y;
      locationMatrix [14] -= origin .z;

      return locationMatrix;
   },
   dispose () { },
});

function getCoordRotateYUp (geoPoint, result)
{
   return this .invOriginMatrix .multVecMatrix (this .referenceFrame .convert (geoPoint, result));
}

function getGeoCoordRotateYUp (point, result)
{
   return this .referenceFrame .apply (this .originMatrix .multVecMatrix (vector .assign (point)), result);
}

function getGeoUpVectorRotateYUp (point, result)
{
   return this .invOriginMatrix .multDirMatrix (this .elevationFrame .normal (this .originMatrix .multVecMatrix (vector .assign (point)), result));
}

function getLocationMatrixRotateYUp (geoPoint, result)
{
   return getStandardLocationMatrix .call (this, geoPoint, result) .multRight (this .invOriginMatrix);
}

function getStandardLocationMatrix (geoPoint, result)
{
   // Position
   this .referenceFrame .convert (geoPoint, t);

   // Let's work out the orientation at that location in order
   // to maintain a view where +Y is in the direction of gravitional
   // up for that region of the planet's surface. This will be the
   // value of the rotation matrix for the transform.

   this .elevationFrame .normal (t, y);

   x .set (0, 0, 1) .cross (y);

   // Handle pole cases.
   if (x .equals (Vector3 .Zero))
      x .set (1, 0, 0);

   z .assign (x) .cross (y);

   x .normalize ();
   z .normalize ();

   return result .set (x .x, x .y, x .z, 0,
                       y .x, y .y, y .z, 0,
                       z .x, z .y, z .z, 0,
                       t .x, t .y, t .z, 1);
}

Object .defineProperties (X3DGeospatialObject,
{
   typeName:
   {
      value: "X3DGeospatialObject",
      enumerable: true,
   },
   componentName:
   {
      value: "Geospatial",
      enumerable: true,
   },
});

export default X3DGeospatialObject;
