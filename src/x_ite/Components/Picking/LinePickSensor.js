/* -*- Mode: JavaScript; coding: utf-8; tab-width: 3; indent-tabs-mode: tab; c-basic-offset: 3 -*-
 *******************************************************************************
 *
 * DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS FILE HEADER.
 *
 * Copyright create3000, Scheffelstraße 31a, Leipzig, Germany 2011.
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
	"x_ite/Basic/X3DFieldDefinition",
	"x_ite/Basic/FieldDefinitionArray",
	"x_ite/Components/Picking/X3DPickSensorNode",
	"x_ite/Bits/X3DConstants",
	"x_ite/Browser/Picking/IntersectionType",
	"x_ite/Browser/Picking/SortOrder",
	"standard/Math/Numbers/Vector3",
	"standard/Math/Numbers/Matrix4",
	"standard/Math/Geometry/Box3",
	"standard/Math/Geometry/Line3",
	"standard/Math/Algorithms/QuickSort",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DPickSensorNode, 
          X3DConstants,
          IntersectionType,
          SortOrder,
          Vector3,
          Matrix4,
          Box3,
          Line3,
          QuickSort)
{
"use strict";

	function LinePickSensor (executionContext)
	{
		X3DPickSensorNode .call (this, executionContext);

		this .addType (X3DConstants .LinePickSensor);

		this .pickingGeometryNode = null;
	}

	LinePickSensor .prototype = Object .assign (Object .create (X3DPickSensorNode .prototype),
	{
		constructor: LinePickSensor,
		fieldDefinitions: new FieldDefinitionArray ([
			new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",                new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",                 new Fields .SFBool (true)),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "objectType",              new Fields .MFString ("ALL")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "intersectionType",        new Fields .SFString ("BOUNDS")),
			new X3DFieldDefinition (X3DConstants .initializeOnly, "sortOrder",               new Fields .SFString ("CLOSEST")),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",                new Fields .SFBool ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedTextureCoordinate", new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedNormal",            new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedPoint",             new Fields .MFVec3f ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "pickingGeometry",         new Fields .SFNode ()),
			new X3DFieldDefinition (X3DConstants .inputOutput,    "pickTarget",              new Fields .MFNode ()),
			new X3DFieldDefinition (X3DConstants .outputOnly,     "pickedGeometry",          new Fields .MFNode ()),
		]),
		getTypeName: function ()
		{
			return "LinePickSensor";
		},
		getComponentName: function ()
		{
			return "Picking";
		},
		getContainerField: function ()
		{
			return "children";
		},
		initialize: function ()
		{
			X3DPickSensorNode .prototype .initialize .call (this);
			
			this .pickingGeometry_ .addInterest ("set_pickingGeometry__", this);

			this .set_pickingGeometry__ ();
		},
		set_pickingGeometry__: function ()
		{
			this .pickingGeometryNode = null;

			try
			{
				var
					node = this .pickingGeometry_ .getValue () .getInnerNode (),
					type = node .getType ();

				for (var t = type .length - 1; t >= 0; -- t)
				{
					switch (type [t])
					{
						case X3DConstants .IndexedLineSet:
						case X3DConstants .LineSet:
						{
							this .pickingGeometryNode = node;
							break;
						}
						default:
							continue;
					}
				}
			}
			catch (error)
			{ }
		},
		process: (function ()
		{
			var
				pickingBBox             = new Box3 (),
				targetBBox              = new Box3 (),
				pickingCenter           = new Vector3 (0, 0, 0),
				targetCenter            = new Vector3 (0, 0, 0),
				matrix                  = new Matrix4 (),
				point1                  = new Vector3 (0, 0, 0),
				point2                  = new Vector3 (0, 0, 0),
				line                    = new Line3 (Vector3 .Zero, Vector3 .zAxis),
				a                       = new Vector3 (0, 0, 0),
				b                       = new Vector3 (0, 0, 0),
				clipPlanes              = [ ],
				pickedIntersections     = [ ],
				intersections           = [ ],
				point                   = new Vector3 (0, 0, 0),
				texCoord                = new Vector3 (0, 0, 0),
				pickedTextureCoordinate = new Fields .MFVec3f (),
				pickedNormal            = new Fields .MFVec3f (),
				pickedPoint             = new Fields .MFVec3f ();

			function compareDistance (lhs, rhs) { return lhs .distance < rhs .distance; }

			var intersectionSorter = new QuickSort (pickedIntersections, compareDistance);

			return function ()
			{
				if (this .pickingGeometryNode)
				{
					var
						modelMatrices = this .getModelMatrices (),
						targets       = this .getTargets ();
		
					switch (this .getIntersectionType ())
					{
						case IntersectionType .BOUNDS:
						{
							// Intersect bboxes.
	
							for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
							{
								var modelMatrix = modelMatrices [m];

								pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);
				
								for (var t = 0, tLength = targets .size; t < tLength; ++ t)
								{
									var target = targets [t];

									targetBBox .assign (target .geometryNode .getBBox ()) .multRight (target .modelMatrix);
	
									if (pickingBBox .intersectsBox (targetBBox))
									{
										pickingCenter .assign (pickingBBox .center);
										targetCenter  .assign (targetBBox .center);

										target .intersected = true;
										target .distance    = pickingCenter .distance (targetCenter);
									}
								}
							}
		
							// Send events.
	
							var
								pickedGeometries = this .getPickedGeometries (),
								active           = Boolean (pickedGeometries .length);

							pickedGeometries .remove (0, pickedGeometries .length, null);

							if (active !== this .isActive_ .getValue ())
								this .isActive_ = active;
	
							if (! this .pickedGeometry_ .equals (pickedGeometries))
								this .pickedGeometry_ = pickedGeometries;
	
							break;
						}
						case IntersectionType .GEOMETRY:
						{
							// Intersect geometry.

							pickedIntersections .length = 0;
		
							for (var m = 0, mLength = modelMatrices .length; m < mLength; ++ m)
							{
								var modelMatrix = modelMatrices [m];

								pickingBBox .assign (this .pickingGeometryNode .getBBox ()) .multRight (modelMatrix);
				
								for (var t = 0, tLength = targets .size; t < tLength; ++ t)
								{
									try
									{
										var
											target           = targets [t],
											geometryNode     = target .geometryNode,
											vertices         = this .pickingGeometryNode .getVertices (),
											numIntersections = pickedIntersections .length;
	
										targetBBox .assign (geometryNode .getBBox ()) .multRight (target .modelMatrix);
										matrix .assign (target .modelMatrix) .inverse () .multLeft (modelMatrix);
	
										for (var v = 0, vLength = vertices .length; v < vLength; v += 8)
										{
											matrix .multVecMatrix (point1 .set (vertices [v + 0], vertices [v + 1], vertices [v + 2]));
											matrix .multVecMatrix (point2 .set (vertices [v + 4], vertices [v + 5], vertices [v + 6]));
											line .setPoints (point1, point2);
	
											intersections .length = 0;
	
											if (geometryNode .intersectsLine (line, clipPlanes, target .modelMatrix, intersections))
											{
												for (var i = 0, iLength = intersections .length; i < iLength; ++ i)
												{
													// Test if intersection.point is between point1 and point2.
	
													var intersection = intersections [i];
	
													a .assign (intersection .point) .subtract (point1);
													b .assign (intersection .point) .subtract (point2);
	
													var
														c = a .add (b) .abs (),
														s = point1 .distance (point2);
	
													if (c <= s)
														pickedIntersections .push (intersection);
												}
											}
										}
	
										if (numIntersections !== pickedIntersections .length)
										{
											pickingCenter .assign (pickingBBox .center);
											targetCenter  .assign (targetBBox .center);
	
											target .intersected = true;
											target .distance    = pickingCenter .distance (targetCenter);

											for (var i = numIntersections, iLength = pickedIntersections .length; i < iLength; ++ i)
											{
												var intersection = pickedIntersections [i];

												intersection .distance = targetCenter .distance (modelMatrix .multVecMatrix (point .assign (intersection .point)));
											}
										}
									}
									catch (error)
									{
										// Catch inverse.
										console .log (error);
									}
								}
							}
		
							// Send events.
	
							var
								pickedGeometries = this .getPickedGeometries (),
								active           = Boolean (pickedGeometries .length);

							pickedGeometries .remove (0, pickedGeometries .length, null);

							if (active !== this .isActive_ .getValue ())
								this .isActive_ = active;
	
							if (! this .pickedGeometry_ .equals (pickedGeometries))
								this .pickedGeometry_ = pickedGeometries;

							var
								sorted           = false,
								numIntersections = pickedIntersections .length;

							switch (this .sortOrder)
							{
								case SortOrder .ANY:
								{
									numIntersections = Math .min (numIntersections, 1);
									break;
								}
								case SortOrder .CLOSEST:
								{
									sorted           = true;
									numIntersections = Math .min (numIntersections, 1);
									break;
								}
								case SortOrder .ALL:
								{
									break;
								}
								case SortOrder .ALL_SORTED:
								{
									sorted = true;
									break;
								}
							}

							if (sorted)
								intersectionSorter .sort (0, pickedIntersections .length);

							for (var i = 0; i < numIntersections; ++ i)
							{
								var
									intersection = pickedIntersections [i],
									t            = intersection .texCoord;

								texCoord .set (t .x, t .y, t .z);

								pickedTextureCoordinate [i] = texCoord;
								pickedNormal [i]            = intersection .normal;
								pickedPoint [i]             = intersection .point;
							}

							pickedTextureCoordinate .length = numIntersections;
							pickedNormal            .length = numIntersections;
							pickedPoint             .length = numIntersections;

							if (! this .pickedTextureCoordinate_ .equals (pickedTextureCoordinate))
								this .pickedTextureCoordinate_ = pickedTextureCoordinate;

							if (! this .pickedNormal_ .equals (pickedNormal))
								this .pickedNormal_ = pickedNormal;

							if (! this .pickedPoint_ .equals (pickedPoint))
								this .pickedPoint_ = pickedPoint;

							break;
						}
					}
				}

				X3DPickSensorNode .prototype .process .call (this);
			};
		})(),
	});

	return LinePickSensor;
});


