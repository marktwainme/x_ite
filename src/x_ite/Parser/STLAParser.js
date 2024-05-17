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

import X3DParser   from "./X3DParser.js";
import Expressions from "./Expressions.js";
import Color3      from "../../standard/Math/Numbers/Color3.js";

// http://paulbourke.net/dataformats/stl/
// https://people.sc.fsu.edu/~jburkardt/data/obj/obj.html

/*
 *  Grammar
 */

// Lexical elements
const Grammar = Expressions ({
   // General
   whitespaces: /[\x20\n\t\r]+/gy,
   whitespacesNoLineTerminator: /[\x20\t]+/gy,
   comment: /;.*?(?=[\n\r]|$)/gy,
   untilEndOfLine: /[^\r\n]+/gy,

   // Keywords
   solid: /solid/gy,
   facet: /facet/gy,
   normal: /normal/gy,
   outer: /outer/gy,
   loop: /loop/gy,
   vertex: /vertex/gy,
   endloop: /endloop/gy,
   endfacet: /endfacet/gy,
   endsolid: /endsolid/gy,

   // Values
   name: /\w+/gy,
   double: /[+-]?(?:(?:(?:\d*\.\d+)|(?:\d+(?:\.)?))(?:[eE][+-]?\d+)?)/gy,
   constants: /([+-])((?:NAN|INF|INFINITY))/igy,
});

/*
 * Parser
 */

function STLAParser (scene)
{
   X3DParser .call (this, scene);

   // Globals

   this .vector = [ ];
   this .point  = [ ];
}

Object .assign (Object .setPrototypeOf (STLAParser .prototype, X3DParser .prototype),
{
   CONSTANTS: new Map ([
      ["NAN", NaN],
      ["INF", Infinity],
      ["INFINITY", Infinity],
   ]),
   getEncoding ()
   {
      return "STRING";
   },
   setInput (string)
   {
      this .input = string;
   },
   isValid ()
   {
      if (!(typeof this .input === "string"))
         return false;

      return !! this .input .match (/^(?:[\x20\n\t\r]+|;.*?[\r\n])*\b(?:solid)\b/);
   },
   parseIntoScene (resolve, reject)
   {
      this .stl ()
         .then (resolve)
         .catch (reject);
   },
   async stl ()
   {
      // Set profile and components.

      const
         browser = this .getBrowser (),
         scene   = this .getScene ();

      scene .setEncoding ("STL");
      scene .setProfile (browser .getProfile ("Interchange"));

      await this .loadComponents ();

      // Create nodes.

      this .material   = scene .createNode ("Material");
      this .appearance = scene .createNode ("Appearance");

      this .material .diffuseColor = Color3 .White;
      this .appearance .material   = this .material;

      // Parse scene.

      this .statements ();

      return this .getScene ();
   },
   comments ()
   {
      while (this .comment ())
         ;
   },
   comment ()
   {
      this .whitespaces ();

      if (Grammar .comment .parse (this))
         return true;

      return false;
   },
   whitespaces ()
   {
      Grammar .whitespaces .parse (this);
   },
   whitespacesNoLineTerminator ()
   {
      Grammar .whitespacesNoLineTerminator .parse (this);
   },
   statements ()
   {
      while (this .solid ())
         ;
   },
   solid ()
   {
      this .comments ();

      if (Grammar .solid .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         const
            scene      = this .getExecutionContext (),
            shape      = scene .createNode ("Shape"),
            geometry   = scene .createNode ("TriangleSet"),
            normal     = scene .createNode ("Normal"),
            coordinate = scene .createNode ("Coordinate"),
            name       = this .sanitizeName (Grammar .name .parse (this) ? this .result [0] : "");

         Grammar .untilEndOfLine .parse (this);

         this .facets ();

         shape .appearance         = this .appearance;
         shape .geometry           = geometry;
         geometry .normalPerVertex = false;
         geometry .normal          = normal;
         geometry .coord           = coordinate;
         normal .vector            = this .vector;
         coordinate .point         = this .point;

         if (name)
         {
            scene .addNamedNode (scene .getUniqueName (name), shape);
            scene .addExportedNode (scene .getUniqueExportName (name), shape);
         }

         scene .getRootNodes () .push (shape);

         this .comments ();

         if (Grammar .endsolid .parse (this))
            return true;

         throw new Error ("Expected 'endsolid' statement.");
      }

      return false;
   },
   facets ()
   {
      this .vector .length = 0;
      this .point  .length = 0;

      while (this .facet ())
         ;
   },
   facet ()
   {
      this .comments ()

      if (Grammar .facet .parse (this))
      {
         if (this .normal ())
         {
            if (this .loop ())
            {
               this .comments ();

               if (Grammar .endfacet .parse (this))
                  return true;

               throw new Error ("Expected 'endfacet' statement.");
            }
         }
      }

      return false;
   },
   normal ()
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .normal .parse (this))
      {
         if (this .double ())
         {
            this .vector .push (this .value);

            if (this .double ())
            {
               this .vector .push (this .value);

               if (this .double ())
               {
                  this .vector .push (this .value);

                  return true;
               }

               throw new Error ("Expected a double.");
            }

            throw new Error ("Expected a double.");
         }

         throw new Error ("Expected a double.");
      }

      throw new Error ("Expected 'normal' statement.");
   },
   loop ()
   {
      this .comments ();

      if (Grammar .outer .parse (this))
      {
         this .whitespacesNoLineTerminator ();

         if (Grammar .loop .parse (this))
         {
            if (this .vertex ())
            {
               if (this .vertex ())
               {
                  if (this .vertex ())
                  {
                     this .comments ();

                     if (Grammar .endloop .parse (this))
                        return true;

                     throw new Error ("Expected 'endloop' statement.");
                  }
               }
            }
         }

         throw new Error ("Expected 'loop' statement.");
      }

      throw new Error ("Expected 'outer' statement.");
   },
   vertex ()
   {
      this .comments ();

      if (Grammar .vertex .parse (this))
      {
         if (this .double ())
         {
            this .point .push (this .value);

            if (this .double ())
            {
               this .point .push (this .value);

               if (this .double ())
               {
                  this .point .push (this .value);

                  return true;
               }

               throw new Error ("Expected a double.");
            }

            throw new Error ("Expected a double.");
         }

         throw new Error ("Expected a double.");
      }

      throw new Error ("Expected 'vertex' statement.");
   },
   double ()
   {
      this .whitespacesNoLineTerminator ();

      if (Grammar .double .parse (this))
      {
         this .value = parseFloat (this .result [0]);

         return true;
      }

      if (Grammar .constants .parse (this))
      {
         this .value = this .CONSTANTS .get (this .result [2] .toUpperCase ());

         if (this .result [1] === "-")
            this .value = - this .value;

         return true;
      }

      return false;
   },
});

export default STLAParser;
