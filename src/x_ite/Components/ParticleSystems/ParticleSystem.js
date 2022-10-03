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
   "x_ite/Base/X3DFieldDefinition",
   "x_ite/Base/FieldDefinitionArray",
   "x_ite/Components/Shape/X3DShapeNode",
   "x_ite/Browser/ParticleSystems/GeometryTypes",
   "x_ite/Rendering/TraverseType",
   "x_ite/Base/X3DConstants",
   "x_ite/Base/X3DCast",
   "x_ite/Browser/Shape/AlphaMode",
   "standard/Math/Numbers/Vector3",
   "standard/Math/Numbers/Matrix4",
   "standard/Math/Numbers/Matrix3",
   "standard/Math/Utility/BVH",
],
function (Fields,
          X3DFieldDefinition,
          FieldDefinitionArray,
          X3DShapeNode,
          GeometryTypes,
          TraverseType,
          X3DConstants,
          X3DCast,
          AlphaMode,
          Vector3,
          Matrix4,
          Matrix3,
          BVH)
{
"use strict";

   const PointGeometry = new Float32Array ([0, 0, 0, 1]);

   const LineGeometry = new Float32Array ([
      // TexCoords
      0, 0, 0, 1,
      1, 0, 0, 1,
      // Vertices
      0, 0, -0.5, 1,
      0, 0,  0.5, 1,
   ]);

   // p4 ------ p3
   // |       / |
   // |     /   |
   // |   /     |
   // | /       |
   // p1 ------ p2

   const QuadGeometry = new Float32Array ([
      // TexCoords
      0, 0, 0, 1,
      1, 0, 0, 1,
      1, 1, 0, 1,
      0, 0, 0, 1,
      1, 1, 0, 1,
      0, 1, 0, 1,
      // Normal
      0, 0, 1,
      // Vertices
      -0.5, -0.5, 0, 1,
       0.5, -0.5, 0, 1,
       0.5,  0.5, 0, 1,
      -0.5, -0.5, 0, 1,
       0.5,  0.5, 0, 1,
      -0.5,  0.5, 0, 1,
   ]);

   function ParticleSystem (executionContext)
   {
      X3DShapeNode .call (this, executionContext);

      this .addType (X3DConstants .ParticleSystem);

      this ._particleSize .setUnit ("length");

      this .maxParticles             = 0;
      this .numParticles             = 0;
      this .forcePhysicsModelNodes   = [ ];
      this .forces                   = new Float32Array (4);
      this .boundedPhysicsModelNodes = [ ];
      this .boundedNormals           = [ ];
      this .boundedVertices          = [ ];
      this .colorRamp                = new Float32Array ();
      this .texCoordRamp             = new Float32Array ();
      this .geometryContext          = { };
      this .creationTime             = 0;
      this .pauseTime                = 0;
      this .deltaTime                = 0;
      this .particleStride           = Float32Array .BYTES_PER_ELEMENT * 7 * 4; // 7 x vec4
      this .particleOffsets          = Array .from ({length: 7}, (_, i) => Float32Array .BYTES_PER_ELEMENT * 4 * i); // i x vec4
      this .particleOffset           = this .particleOffsets [0];
      this .colorOffset              = this .particleOffsets [1];
      this .matrixOffset             = this .particleOffsets [3];
      this .texCoordOffset           = 0;
   }

   ParticleSystem .prototype = Object .assign (Object .create (X3DShapeNode .prototype),
   {
      constructor: ParticleSystem,
      [Symbol .for ("X_ITE.X3DBaseNode.fieldDefinitions")]: new FieldDefinitionArray ([
         new X3DFieldDefinition (X3DConstants .inputOutput,    "metadata",          new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "enabled",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "createParticles",   new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "geometryType",      new Fields .SFString ("QUAD")),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "maxParticles",      new Fields .SFInt32 (200)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "particleLifetime",  new Fields .SFFloat (5)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "lifetimeVariation", new Fields .SFFloat (0.25)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "particleSize",      new Fields .SFVec2f (0.02, 0.02)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "emitter",           new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "physics",           new Fields .MFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorKey",          new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "colorRamp",         new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordKey",       new Fields .MFFloat ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "texCoordRamp",      new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .outputOnly,     "isActive",          new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "visible",           new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "castShadow",        new Fields .SFBool (true)),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "bboxDisplay",       new Fields .SFBool ()),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxSize",          new Fields .SFVec3f (-1, -1, -1)),
         new X3DFieldDefinition (X3DConstants .initializeOnly, "bboxCenter",        new Fields .SFVec3f ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "appearance",        new Fields .SFNode ()),
         new X3DFieldDefinition (X3DConstants .inputOutput,    "geometry",          new Fields .SFNode ()),
      ]),
      getTypeName: function ()
      {
         return "ParticleSystem";
      },
      getComponentName: function ()
      {
         return "ParticleSystems";
      },
      getContainerField: function ()
      {
         return "children";
      },
      initialize: function ()
      {
         X3DShapeNode .prototype .initialize .call (this);

         const browser = this .getBrowser ();

         if (browser .getContext () .getVersion () < 2)
            return;

         this .isLive () .addInterest ("set_live__", this);

         browser .getBrowserOptions () ._Shading .addInterest ("set_shader__", this);

         this ._enabled           .addInterest ("set_enabled__",           this);
         this ._createParticles   .addInterest ("set_createParticles__",   this);
         this ._geometryType      .addInterest ("set_geometryType__",      this);
         this ._geometryType      .addInterest ("set_texCoord__",          this);
         this ._maxParticles      .addInterest ("set_enabled__",           this);
         this ._particleLifetime  .addInterest ("set_particleLifetime__",  this);
         this ._lifetimeVariation .addInterest ("set_lifetimeVariation__", this);
         this ._emitter           .addInterest ("set_emitter__",           this);
         this ._physics           .addInterest ("set_physics__",           this);
         this ._colorKey          .addInterest ("set_color__",             this);
         this ._colorRamp         .addInterest ("set_colorRamp__",         this);
         this ._texCoordKey       .addInterest ("set_texCoord__",          this);
         this ._texCoordRamp      .addInterest ("set_texCoordRamp__",      this);

         // Create particles stuff.

         this .inputParticles  = this .createBuffer (true);
         this .outputParticles = this .createBuffer (true);

         // Create forces stuff.

         this .forcesTexture       = this .createTexture ();
         this .boundedTexture      = this .createTexture ();
         this .colorRampTexture    = this .createTexture ();
         this .texCoordRampTexture = this .createTexture ();

         // Create GL stuff.

         this .geometryBuffer  = this .createBuffer ();
         this .texCoordBuffers = new Array (browser .getMaxTextures ()) .fill (this .geometryBuffer);

         // Geometry context

         this .geometryContext .fogCoords                = false;
         this .geometryContext .textureCoordinateNode    = browser .getDefaultTextureCoordinate ();
         this .geometryContext .textureCoordinateMapping = new Map ();

         // Init fields.
         // Call order is very important at startup.

         this .set_emitter__ ();
         this .set_enabled__ ();
         this .set_geometryType__ ();
         this .set_createParticles__ ();
         this .set_particleLifetime__ ();
         this .set_lifetimeVariation__ ();
         this .set_physics__ ();
         this .set_colorRamp__ ();
         this .set_texCoordRamp__ ();
      },
      set_bbox__: function ()
      {
         if (this ._bboxSize .getValue () .equals (this .getDefaultBBoxSize ()))
            this .bbox .set ();
         else
            this .bbox .set (this ._bboxSize .getValue (), this ._bboxCenter .getValue ());

         this .bboxSize   .assign (this .bbox .size);
         this .bboxCenter .assign (this .bbox .center);
      },
      set_transparent__: function ()
      {
         if (this .getAppearance () .getAlphaMode () === AlphaMode .AUTO)
         {
            switch (this .geometryType)
            {
               case GeometryTypes .POINT:
               {
                  this .setTransparent (true);
                  break;
               }
               default:
               {
                  this .setTransparent (this .getAppearance () .getTransparent () ||
                                        (this .colorRampNode && this .colorRampNode .getTransparent ()) ||
                                        (this .geometryType === GeometryTypes .GEOMETRY && this .geometryNode && this .geometryNode .getTransparent ()));
                  break;
               }
            }
         }
         else
         {
            this .setTransparent (this .getAppearance () .getTransparent ());
         }
      },
      set_live__: function ()
      {
         if (this .isLive () .getValue ())
         {
            if (this ._isActive .getValue () && this ._maxParticles .getValue ())
            {
               this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

               if (this .pauseTime)
               {
                  this .creationTime += performance .now () / 1000 - this .pauseTime;
                  this .pauseTime     = 0;
               }
            }
         }
         else
         {
            if (this ._isActive .getValue () && this ._maxParticles .getValue ())
            {
               this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);

               if (this .pauseTime === 0)
                  this .pauseTime = performance .now () / 1000;
            }
         }
      },
      set_enabled__: function ()
      {
         if (this ._enabled .getValue () && this ._maxParticles .getValue ())
         {
            if (!this ._isActive .getValue ())
            {
               if (this .isLive () .getValue ())
               {
                  this .getBrowser () .sensorEvents () .addInterest ("animateParticles", this);

                  this .pauseTime = 0;
               }
               else
                  this .pauseTime = performance .now () / 1000;

               this ._isActive = true;

               delete this .traverse;
            }
         }
         else
         {
            if (this ._isActive .getValue ())
            {
               if (this .isLive () .getValue ())
               {
                  this .getBrowser () .sensorEvents () .removeInterest ("animateParticles", this);
               }

               this ._isActive = false;

               this .numParticles = 0;
               this .traverse     = Function .prototype;
            }
         }

         this .set_maxParticles__ ();
      },
      set_createParticles__: function ()
      {
         this .createParticles = this ._createParticles .getValue ();
      },
      set_geometryType__: function ()
      {
         const
            browser = this .getBrowser (),
            gl      = browser .getContext ();

         // Set geometryType.

         this .geometryType = GeometryTypes .hasOwnProperty (this ._geometryType .getValue ())
            ? GeometryTypes [this ._geometryType .getValue ()]
            : GeometryTypes .QUAD;

         // Create buffers.

         switch (this .geometryType)
         {
            case GeometryTypes .POINT:
            {
               this .geometryContext .geometryType = 0;

               this .texCoordCount = 0;
               this .vertexCount   = 1;
               this .hasNormals    = false;
               this .testWireframe = false;
               this .primitiveMode = gl .POINTS;

               this .verticesOffset = 0;

               gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, PointGeometry, gl .DYNAMIC_DRAW);

               break;
            }
            case GeometryTypes .LINE:
            {
               this .geometryContext .geometryType = 1;

               this .texCoordCount = 2;
               this .vertexCount   = 2;
               this .hasNormals    = false;
               this .testWireframe = false;
               this .primitiveMode = gl .LINES;

               this .texCoordsOffset = 0;
               this .verticesOffset  = Float32Array .BYTES_PER_ELEMENT * 8;

               gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, LineGeometry, gl .DYNAMIC_DRAW);

               break;
            }
            case GeometryTypes .TRIANGLE:
            case GeometryTypes .QUAD:
            case GeometryTypes .SPRITE:
            {
               this .geometryContext .geometryType = 2;

               this .texCoordCount = 4;
               this .vertexCount   = 6;
               this .hasNormals    = true;
               this .testWireframe = true;
               this .primitiveMode = gl .TRIANGLES;

               this .texCoordsOffset = 0;
               this .normalOffset    = Float32Array .BYTES_PER_ELEMENT * 24;
               this .verticesOffset  = Float32Array .BYTES_PER_ELEMENT * 27;

               gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
               gl .bufferData (gl .ARRAY_BUFFER, QuadGeometry, gl .DYNAMIC_DRAW);

               break;
            }
            case GeometryTypes .GEOMETRY:
            {
               this .texCoordCount = 0;
               this .vertexCount   = 0;

               break;
            }
         }

         this .set_shader__ ();
         this .set_transparent__ ();
      },
      set_shader__: function ()
      {
         switch (this .geometryType)
         {
            case GeometryTypes .POINT:
            {
               this .shaderNode = this .getBrowser () .getPointShader ();
               break;
            }
            case GeometryTypes .LINE:
            {
               this .shaderNode = this .getBrowser () .getLineShader ();
               break;
            }
            default:
            {
               this .shaderNode = null;
               break;
            }
         }
      },
      set_maxParticles__: function ()
      {
         const
            lastNumParticles = this .numParticles,
            maxParticles     = Math .max (0, this ._maxParticles .getValue ());

         this .maxParticles = maxParticles;
         this .numParticles = Math .min (lastNumParticles, maxParticles);

         if (!this .emitterNode .isExplosive ())
            this .creationTime = performance .now () / 1000;

         this .resizeBuffers (lastNumParticles);
      },
      set_particleLifetime__: function ()
      {
         this .particleLifetime = this ._particleLifetime .getValue ();
      },
      set_lifetimeVariation__: function ()
      {
         this .lifetimeVariation = this ._lifetimeVariation .getValue ();
      },
      set_emitter__: function ()
      {
         this .emitterNode = X3DCast (X3DConstants .X3DParticleEmitterNode, this ._emitter);

         if (!this .emitterNode)
            this .emitterNode = this .getBrowser () .getDefaultEmitter ();

         this .createParticles = this ._createParticles .getValue ();
      },
      set_physics__: function ()
      {
         const
            physics                  = this ._physics .getValue (),
            forcePhysicsModelNodes   = this .forcePhysicsModelNodes,
            boundedPhysicsModelNodes = this .boundedPhysicsModelNodes;

         for (let i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
            boundedPhysicsModelNodes [i] .removeInterest ("set_boundedPhysics__", this);

         forcePhysicsModelNodes   .length = 0;
         boundedPhysicsModelNodes .length = 0;

         for (let i = 0, length = physics .length; i < length; ++ i)
         {
            try
            {
               const
                  innerNode = physics [i] .getValue () .getInnerNode (),
                  type      = innerNode .getType ();

               for (let t = type .length - 1; t >= 0; -- t)
               {
                  switch (type [t])
                  {
                     case X3DConstants .ForcePhysicsModel:
                     case X3DConstants .WindPhysicsModel:
                     {
                        forcePhysicsModelNodes .push (innerNode);
                        break;
                     }
                     case X3DConstants .BoundedPhysicsModel:
                     {
                        innerNode .addInterest ("set_boundedPhysics__", this);
                        boundedPhysicsModelNodes .push (innerNode);
                        break;
                     }
                     default:
                        continue;
                  }

                  break;
               }
            }
            catch (error)
            { }
         }

         this .set_boundedPhysics__ ();
      },
      set_boundedPhysics__: function ()
      {
         const
            gl                       = this .getBrowser () .getContext (),
            boundedPhysicsModelNodes = this .boundedPhysicsModelNodes,
            boundedNormals           = this .boundedNormals,
            boundedVertices          = this .boundedVertices;

         boundedNormals  .length = 0;
         boundedVertices .length = 0;

         for (let i = 0, length = boundedPhysicsModelNodes .length; i < length; ++ i)
         {
            boundedPhysicsModelNodes [i] .addGeometry (boundedNormals, boundedVertices);
         }

         // Texture

         const
            boundedHierarchy       = new BVH (boundedVertices, boundedNormals) .toArray ([ ]),
            numBoundedVertices     = boundedVertices .length / 4,
            numBoundedNormals      = boundedNormals .length / 3,
            boundedHierarchyLength = boundedHierarchy .length / 4,
            boundedArraySize       = Math .ceil (Math .sqrt (numBoundedVertices + numBoundedNormals + boundedHierarchyLength)),
            boundedArray           = new Float32Array (boundedArraySize * boundedArraySize * 4);

         this .boundedVerticesIndex  = 0;
         this .boundedNormalsIndex   = numBoundedVertices;
         this .boundedHierarchyIndex = this .boundedNormalsIndex + numBoundedNormals;
         this .boundedHierarchyRoot  = this .boundedHierarchyIndex + boundedHierarchyLength - 1;

         boundedArray .set (boundedVertices);

         for (let s = this .boundedNormalsIndex * 4, n = 0, l = boundedNormals .length; n < l; s += 4, n += 3)
         {
            boundedArray [s + 0] = boundedNormals [n + 0];
            boundedArray [s + 1] = boundedNormals [n + 1];
            boundedArray [s + 2] = boundedNormals [n + 2];
         }

         boundedArray .set (boundedHierarchy, this .boundedHierarchyIndex * 4);

         if (boundedArraySize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .boundedTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, boundedArraySize, boundedArraySize, 0, gl .RGBA, gl .FLOAT, boundedArray);
         }
       },
      set_colorRamp__: function ()
      {
         if (this .colorRampNode)
            this .colorRampNode .removeInterest ("set_color__", this);

         this .colorRampNode = X3DCast (X3DConstants .X3DColorNode, this ._colorRamp);

         if (this .colorRampNode)
            this .colorRampNode .addInterest ("set_color__", this);

         this .set_color__ ();
         this .set_transparent__ ();
      },
      set_color__: function ()
      {
         const
            gl           = this .getBrowser () .getContext (),
            colorKey     = this ._colorKey,
            numColors    = colorKey .length,
            textureSize  = Math .ceil (Math .sqrt (numColors * 2));

         let colorRamp = this .colorRamp;

         if (textureSize * textureSize * 4 > colorRamp .length)
            colorRamp = this .colorRamp = new Float32Array (textureSize * textureSize * 4);

         for (let i = 0; i < numColors; ++ i)
            colorRamp [i * 4] = colorKey [i];

         if (this .colorRampNode)
            colorRamp .set (this .colorRampNode .addColors ([ ], numColors) .slice (0, numColors * 4), numColors * 4);
         else
            colorRamp .fill (1, numColors * 4);

         if (textureSize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .colorRampTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, colorRamp);
        }

         this .numColors                      = numColors;
         this .geometryContext .colorMaterial = !! (numColors && this .colorRampNode);
      },
      set_texCoordRamp__: function ()
      {
         if (this .texCoordRampNode)
            this .texCoordRampNode .removeInterest ("set_texCoord__", this);

         this .texCoordRampNode = X3DCast (X3DConstants .X3DTextureCoordinateNode, this ._texCoordRamp);

         if (this .texCoordRampNode)
            this .texCoordRampNode .addInterest ("set_texCoord__", this);

         this .set_texCoord__ ();
      },
      set_texCoord__: function ()
      {
         const
            gl           = this .getBrowser () .getContext (),
            texCoordKey  = this ._texCoordKey,
            numTexCoords = texCoordKey .length,
            textureSize  = Math .ceil (Math .sqrt (numTexCoords + numTexCoords * this .texCoordCount));

         let texCoordRamp = this .texCoordRamp;

         if (textureSize * textureSize * 4 > texCoordRamp .length)
            texCoordRamp = this .texCoordRamp = new Float32Array (textureSize * textureSize * 4);
         else
            texCoordRamp .fill (0);

         for (let i = 0; i < numTexCoords; ++ i)
            texCoordRamp [i * 4] = texCoordKey [i];

         if (this .texCoordRampNode)
            texCoordRamp .set (this .texCoordRampNode .getTexCoord ([ ]) .slice (0, numTexCoords * this .texCoordCount * 4), numTexCoords * 4);

         if (textureSize)
         {
            gl .bindTexture (gl .TEXTURE_2D, this .texCoordRampTexture);
            gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, textureSize, textureSize, 0, gl .RGBA, gl .FLOAT, texCoordRamp);
         }

         this .numTexCoords = this .texCoordRampNode ? numTexCoords : 0;
      },
      createTexture: function ()
      {
         const
            gl      = this .getBrowser () .getContext (),
            texture = gl .createTexture ();

         gl .bindTexture (gl .TEXTURE_2D, texture);

         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_S,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_WRAP_T,     gl .CLAMP_TO_EDGE);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MAG_FILTER, gl .NEAREST);
         gl .texParameteri (gl .TEXTURE_2D, gl .TEXTURE_MIN_FILTER, gl .NEAREST);

         gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, 1, 1, 0, gl .RGBA, gl .FLOAT, new Float32Array (4));

         return texture;
      },
      createBuffer: function (read = false)
      {
         const
            gl     = this .getBrowser () .getContext (),
            buffer = gl .createBuffer ();

         gl .bindBuffer (gl .ARRAY_BUFFER, buffer);
         gl .bufferData (gl .ARRAY_BUFFER, new Uint32Array (), read ? gl .DYNAMIC_READ : gl .DYNAMIC_DRAW);

         return buffer;
      },
      resizeBuffers: function (lastNumParticles)
      {
         const
            gl             = this .getBrowser () .getContext (),
            maxParticles   = this .maxParticles,
            particleStride = this .particleStride,
            inputData      = new Uint8Array (lastNumParticles * particleStride);

         const outputData = lastNumParticles < maxParticles
            ? new Uint8Array (maxParticles * particleStride)
            : inputData;

         // Resize output buffer.

         gl .bindBuffer (gl .ARRAY_BUFFER, this .outputParticles);
         gl .getBufferSubData (gl .ARRAY_BUFFER, 0, inputData);

         if (lastNumParticles < maxParticles)
            outputData .set (inputData);

         gl .bufferData (gl .ARRAY_BUFFER, outputData, gl .DYNAMIC_DRAW, 0, maxParticles * particleStride);

         // Resize input buffer.

         gl .bindBuffer (gl .ARRAY_BUFFER, this .inputParticles);
         gl .bufferData (gl .ARRAY_BUFFER, outputData, gl .DYNAMIC_DRAW, 0, maxParticles * particleStride);
      },
      animateParticles: function ()
      {
         const
            browser     = this .getBrowser (),
            gl          = browser .getContext (),
            emitterNode = this .emitterNode;

         // Determine delta time

         const
            DELAY = 15, // Delay in frames when dt fully applies.
            dt    = 1 / Math .max (10, this .getBrowser () .getCurrentFrameRate ());

         // let deltaTime is only for the emitter, this.deltaTime is for the forces.
         let deltaTime = this .deltaTime = ((DELAY - 1) * this .deltaTime + dt) / DELAY; // Moving average about DELAY frames.

         // Determine numParticles

         if (emitterNode .isExplosive ())
         {
            const
               now              = performance .now () / 1000,
               particleLifetime = this .particleLifetime + this .particleLifetime * this .lifetimeVariation;

            if (this .numParticles === 0 || now - this .creationTime > particleLifetime)
            {
               this .creationTime    = now;
               this .numParticles    = this .maxParticles;
               this .createParticles = this ._createParticles .getValue ();

               deltaTime = Number .POSITIVE_INFINITY;
            }
            else
               this .createParticles = false;
         }
         else
         {
            if (this .numParticles < this .maxParticles)
            {
               const
                  now          = performance .now () / 1000,
                  newParticles = Math .max (0, Math .floor ((now - this .creationTime) * this .maxParticles / this .particleLifetime));

               if (newParticles)
                  this .creationTime = now;

               this .numParticles = Math .floor (Math .min (this .maxParticles, this .numParticles + newParticles));
            }
         }

         // Apply forces.

         if (emitterNode .getMass ())
         {
            const forcePhysicsModelNodes = this .forcePhysicsModelNodes;

            let
               numForces  = forcePhysicsModelNodes .length,
               forces     = this .forces,
               timeByMass = deltaTime / emitterNode .getMass ();

            // Collect forces in velocities and collect turbulences.

            if (numForces * 4 > forces .length)
               forces = this .forces = new Float32Array (numForces * 4);

            let disabledForces = 0;

            for (let i = 0; i < numForces; ++ i)
            {
               disabledForces += !forcePhysicsModelNodes [i] .addForce (i - disabledForces, emitterNode, timeByMass, forces);
            }

            this .numForces = numForces -= disabledForces;

            if (numForces)
            {
               gl .bindTexture (gl .TEXTURE_2D, this .forcesTexture);
               gl .texImage2D (gl .TEXTURE_2D, 0, gl .RGBA32F, numForces, 1, 0, gl .RGBA, gl .FLOAT, forces);
            }
         }
         else
         {
            this .numForces = 0;
         }

         // Swap buffers.

         const inputParticles  = this .outputParticles;
         this .outputParticles = this .inputParticles;
         this .inputParticles  = inputParticles;

         // Determine particle position, velocity and colors.

         emitterNode .animate (this, deltaTime);

         browser .addBrowserEvent ();
      },
      updateSprite: (function ()
      {
         const data = new Float32Array (QuadGeometry);

         const quad = [
            new Vector3 (-0.5, -0.5, 0),
            new Vector3 ( 0.5, -0.5, 0),
            new Vector3 ( 0.5,  0.5, 0),
            new Vector3 (-0.5, -0.5, 0),
            new Vector3 ( 0.5,  0.5, 0),
            new Vector3 (-0.5,  0.5, 0),
         ];

         const
            vertex = new Vector3 (0, 0, 0),
            size   = new Vector3 (0, 0, 0);

         return function (gl, rotation)
         {
            // Normal

            for (let i = 0; i < 3; ++ i)
               data [24 + i] = rotation [i + 6];

            // Vertices

            size .set (this ._particleSize .x, this ._particleSize .y, 1);

            for (let i = 0; i < 6; ++ i)
               data .set (rotation .multVecMatrix (vertex .assign (quad [i]) .multVec (size)), 27 + i * 4);

            gl .bindBuffer (gl .ARRAY_BUFFER, this .geometryBuffer);
            gl .bufferData (gl .ARRAY_BUFFER, data, gl .DYNAMIC_DRAW);
         };
      })(),
      intersectsBox: function (box, clipPlanes)
      { },
      traverse: function (type, renderObject)
      {
         if (this .numParticles === 0)
            return;

         switch (type)
         {
            case TraverseType .POINTER:
            case TraverseType .PICKING:
            case TraverseType .COLLISION:
            {
               break;
            }
            case TraverseType .SHADOW:
            {
               if (this ._castShadow .getValue ())
                  renderObject .addDepthShape (this);

               break;
            }
            case TraverseType .DISPLAY:
            {
               if (renderObject .addDisplayShape (this))
                  this .getAppearance () .traverse (type, renderObject); // Currently used for GeneratedCubeMapTexture.

               break;
            }
         }

         if (this .geometryType === GeometryTypes .GEOMETRY)
         {
            if (this .getGeometry ())
               this .getGeometry () .traverse (type, renderObject); // Currently used for ScreenText.
         }
      },
      depth: function (gl, context, shaderNode)
      {
         // Display geometry.

         switch (this .geometryType)
         {
            case GeometryTypes .GEOMETRY:
            {
               const geometryNode = this .getGeometry ();

               if (geometryNode)
                  geometryNode .displayParticlesDepth (gl, context, shaderNode, this);

               break;
            }
            case GeometryTypes .SPRITE:
            {
               this .updateSprite (gl, this .getScreenAlignedRotation (context .modelViewMatrix));
               // [fall trough]
            }
            default:
            {
               const
                  outputParticles = this .outputParticles,
                  particleStride  = this .particleStride;

               shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, this .particleOffset, 1);
               shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, this .matrixOffset,   1);

               shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, this .verticesOffset);

               gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, this .numParticles);

               shaderNode .disable (gl);
               shaderNode .enable (gl);

               break;
            }
         }
      },
      display: function (gl, context)
      {
         try
         {
            // Display geometry.

            switch (this .geometryType)
            {
               case GeometryTypes .GEOMETRY:
               {
                  const geometryNode = this .getGeometry ();

                  if (geometryNode)
                     geometryNode .displayParticles (gl, context, this);

                  break;
               }
               case GeometryTypes .SPRITE:
               {
                  this .updateSprite (gl, this .getScreenAlignedRotation (context .modelViewMatrix));
                  // [fall trough]
               }
               case GeometryTypes .QUAD:
               case GeometryTypes .TRIANGLE:
               {
                  const positiveScale = Matrix4 .prototype .determinant3 .call (context .modelViewMatrix) > 0;

                  gl .frontFace (positiveScale ? gl .CCW : gl .CW);
                  gl .enable (gl .CULL_FACE);
                  gl .cullFace (gl .BACK);

                  // [fall trough]
               }
               default:
               {
                  const
                     appearanceNode = this .getAppearance (),
                     shaderNode     = appearanceNode .shaderNode || this .shaderNode || appearanceNode .materialNode .getShader (context .browser, context .shadow);

                  // Setup shader.

                  if (shaderNode .getValid ())
                  {
                     context .geometryContext = this .geometryContext;

                     const blendModeNode = appearanceNode .blendModeNode;

                     if (blendModeNode)
                        blendModeNode .enable (gl);

                     shaderNode .enable (gl);
                     shaderNode .setLocalUniforms (gl, context);

                     // Setup vertex attributes.

                     const
                        outputParticles = this .outputParticles,
                        particleStride  = this .particleStride;

                     shaderNode .enableParticleAttribute       (gl, outputParticles, particleStride, this .particleOffset, 1);
                     shaderNode .enableParticleMatrixAttribute (gl, outputParticles, particleStride, this .matrixOffset,   1);

                     if (this .geometryContext .colorMaterial)
                     {
                        shaderNode .enableColorAttribute (gl, outputParticles, particleStride, this .colorOffset);
                        shaderNode .colorAttributeDivisor (gl, 1);
                     }

                     if (this .texCoordCount)
                     {
                        shaderNode .enableTexCoordAttribute (gl, this .texCoordBuffers, 0, this .texCoordOffset);

                        if (this .numTexCoords)
                        {
                           const textureUnit = context .browser .getTexture2DUnit ();

                           gl .activeTexture (gl .TEXTURE0 + textureUnit);
                           gl .bindTexture (gl .TEXTURE_2D, this .texCoordRampTexture);
                           gl .uniform1i (shaderNode .x3d_TexCoordRamp, textureUnit);
                        }
                     }

                     if (this .hasNormals)
                     {
                        shaderNode .enableNormalAttribute (gl, this .geometryBuffer, 0, this .normalOffset);
                        shaderNode .normalAttributeDivisor (gl, this .numParticles);
                     }

                     shaderNode .enableVertexAttribute (gl, this .geometryBuffer, 0, this .verticesOffset);

                     if (shaderNode .wireframe && this .testWireframe)
                     {
                        // Wireframes are always solid so only one drawing call is needed.

                        for (let i = 0, length = this .numParticles * this .vertexCount; i < length; i += 3)
                           gl .drawArrays (shaderNode .primitiveMode, i, 3);
                     }
                     else
                     {
                        gl .drawArraysInstanced (this .primitiveMode, 0, this .vertexCount, this .numParticles);
                     }

                     shaderNode .disable (gl);

                     if (blendModeNode)
                        blendModeNode .disable (gl);

                     delete context .geometryContext;
                  }

                  break;
               }
            }
         }
         catch (error)
         {
            // Catch error from setLocalUniforms.
            console .error (error);
         }
      },
      getScreenAlignedRotation: (function ()
      {
         const
            invModelViewMatrix = new Matrix4 (),
            billboardToScreen  = new Vector3 (0, 0, 0),
            viewerYAxis        = new Vector3 (0, 0, 0),
            y                  = new Vector3 (0, 0, 0),
            rotation           = new Matrix3 (9);

         return function (modelViewMatrix)
         {
            invModelViewMatrix .assign (modelViewMatrix) .inverse ();
            invModelViewMatrix .multDirMatrix (billboardToScreen .assign (Vector3 .zAxis));
            invModelViewMatrix .multDirMatrix (viewerYAxis .assign (Vector3 .yAxis));

            const x = viewerYAxis .cross (billboardToScreen);
            y .assign (billboardToScreen) .cross (x);
            const z = billboardToScreen;

            // Compose rotation matrix.

            x .normalize ();
            y .normalize ();
            z .normalize ();

            rotation .set (x .x, x .y, x .z,
                           y .x, y .y, y .z,
                           z .x, z .y, z .z);

            return rotation;
         };
      })(),
   });

   return ParticleSystem;
});
